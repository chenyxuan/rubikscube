import * as THREE from "three"
import Cubelet from "./cubelet";
import { GroupTable } from "./group";
import { twister } from "./twister";
import { cubelet_face_attrs, cubelet_lambers, cubelet_sticker, cube_config } from "./utils";
import { Face } from "./utils_internal";

export default class Cube extends THREE.Group {
  dirty: boolean;
  locks: Map<string, Set<number>>;
  cubelets: Cubelet[] = [];
  table: GroupTable;
  callbacks: (() => void)[] = [];

  constructor() {
    super();

    for (let i = 0; i < 27; i++) {
      const cubelet = new Cubelet(i);
      this.cubelets.push(cubelet);
      this.add(cubelet);
    }

    this.locks = new Map();
    this.locks.set("x", new Set());
    this.locks.set("y", new Set());
    this.locks.set("z", new Set());
    this.locks.set("a", new Set());

    this.table = new GroupTable(this);

    this.matrixAutoUpdate = false;
    this.updateMatrix();

    this.dirty = true;
  }

  callback(): void {
    for (const lock of this.locks.values()) {
      if (lock.size > 0) {
        return;
      }
    }
    for (const callback of this.callbacks) {
      callback();
    }
  }

  lock(axis: string, layer: number): boolean {
    if (this.locks.get("a")?.has(1)) {
      return false;
    }
    const axis_lockset = this.locks.get(axis);
    if (axis_lockset === undefined) {
      return false;
    }
    for (const lockset of this.locks.values()) {
      if (lockset != axis_lockset && lockset.size > 0) {
        return false;
      }
    }
    axis_lockset.add(layer);
    return true;
  }

  unlock(axis: string, layer: number): void {
    const axis_lockset = this.locks.get(axis);
    axis_lockset?.delete(layer);
  }

  random3(): number {
    return Math.min(Math.max(Math.floor(Math.random() * 3), 0), 2);
  }

  scramble(): void {
    for (let i = 0; i < cube_config.scramble_steps; i++) {
      const axis = ["x", "y", "z"][this.random3()];
      const level = this.random3();
      const angle = (this.random3() - 1) * (Math.PI / 2);

      this.table.groups[axis][level].twist(angle === 0 ? Math.PI : angle, true);
    }

  }

  reset(): void {
    twister.finish();

    for (const cubelet of this.cubelets) {
      this.remove(cubelet);
    }
    this.cubelets.splice(0);

    for (let i = 0; i < 27; i++) {
      const cubelet = new Cubelet(i);
      this.cubelets.push(cubelet);
      this.add(cubelet);
    }
    this.table = new GroupTable(this);
    this.dirty = true;

    this.callback();
  }


  //                +------------+
  //                | U1  U2  U3 |
  //                |            |
  //                | U4  U5  U6 |
  //                |            |
  //                | U7  U8  U9 |
  //   +------------+------------+------------+------------+
  //   | L1  L2  L3 | F1  F2  F3 | R1  R2  R3 | B1  B2  B3 |
  //   |            |            |            |            |
  //   | L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |
  //   |            |            |            |            |
  //   | L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |
  //   +------------+------------+------------+------------+
  //                | D1  D2  D3 |
  //                |            |
  //                | D4  D5  D6 |
  //                |            |
  //                | D7  D8  D9 |
  //                +------------+

  serialize(): string[] {
    const result: string[] = [];
    let x, y, z;

    twister.finish();

    y = 2;
    for (z = 0; z < 3; z++) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.U);
        result.push(color);
      }
    }

    x = 2;
    for (y = 2; y >= 0; y--) {
      for (z = 2; z >= 0; z--) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.R);
        result.push(color);
      }
    }

    z = 2;
    for (y = 2; y >= 0; y--) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.F);
        result.push(color);
      }
    }

    y = 0;
    for (z = 2; z >= 0; z--) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.D);
        result.push(color);
      }
    }

    x = 0;
    for (y = 2; y >= 0; y--) {
      for (z = 0; z < 3; z++) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.L);
        result.push(color);
      }
    }

    z = 0;
    for (y = 2; y >= 0; y--) {
      for (x = 2; x >= 0; x--) {
        const index = z * 3 * 3 + y * 3 + x;
        const color = this.cubelets[index].getColorOf(Face.B);
        result.push(color);
      }
    }

    return result;
  }

  restore(state: string[], sscale : number = 1): void {
    let x, y, z;
    let cur = 0;
    let face;

    this.reset();

    y = 2;
    face = Face.U;
    for (z = 0; z < 3; z++) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    x = 2;
    face = Face.R;
    for (y = 2; y >= 0; y--) {
      for (z = 2; z >= 0; z--) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    z = 2;
    face = Face.F;
    for (y = 2; y >= 0; y--) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    y = 0;
    face = Face.D;
    for (z = 2; z >= 0; z--) {
      for (x = 0; x < 3; x++) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    x = 0;
    face = Face.L;
    for (y = 2; y >= 0; y--) {
      for (z = 0; z < 3; z++) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    z = 0;
    face = Face.B;
    for (y = 2; y >= 0; y--) {
      for (x = 2; x >= 0; x--) {
        const index = z * 3 * 3 + y * 3 + x;

        const color = state[cur++];
        const cubelet = this.cubelets[index];
        cubelet.remove(cubelet.stickers[face]);

        if (color != "?") {
          const face_attr = cubelet_face_attrs[face];
          const sticker = new THREE.Mesh(cubelet_sticker, cubelet_lambers[color]);
          sticker.rotation.setFromVector3(face_attr.rotation);
          sticker.position.copy(face_attr.position);
          sticker.position.multiplyScalar(sscale);
          cubelet.stickers[face] = sticker;
          cubelet.add(sticker);
        }
      }
    }

    this.dirty = true;
  }
}
