import * as THREE from "three"
import Cubelet from "./cubelet";
import { GroupTable } from "./group";
import Twister, { tweener, TwistAction } from "./twister";
import History from "./history";
import { Face } from "./utils_internal";

export default class Cube extends THREE.Group {
    public dirty = true;
    public locks: Map<string, Set<number>>;
    public cubelets: Cubelet[] = [];
    public initials: Cubelet[] = [];
    public table: GroupTable;
    public order: number;
    public callbacks: (()=>void)[] = [];
    public history: History;
    public twister: Twister = new Twister(this);
  
    constructor() {
      super();
      const order = 3;
      this.order = order;
      this.scale.set(3 / order, 3 / order, 3 / order);
      for (let i = 0; i < order * order * order; i++) {
        const cubelet = new Cubelet(i);
        this.cubelets.push(cubelet);
        this.initials.push(cubelet);
        this.add(cubelet);
      }
      this.locks = new Map();
      this.locks.set("x", new Set());
      this.locks.set("y", new Set());
      this.locks.set("z", new Set());
      this.locks.set("a", new Set());
      this.history = new History();
      this.table = new GroupTable(this);
      this.matrixAutoUpdate = false;
      this.updateMatrix();
    }
  
    callback(): void {
      // 有锁不回调
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
      const tmp = this.locks.get(axis);
      if (tmp == undefined) {
        return false;
      }
      // 有其他轴上锁了
      for (const lock of this.locks.values()) {
        if (lock != tmp && lock.size > 0) {
          return false;
        }
      }
      tmp.add(layer);
      return true;
    }
  
    unlock(axis: string, layer: number): void {
      const tmp = this.locks.get(axis);
      tmp?.delete(layer);
    }
  
    record(action: TwistAction): void {
      this.history.record(action);
    }
  
    get complete(): boolean {
      const complete = [Face.U, Face.D, Face.L, Face.R, Face.F, Face.B].every((face) => {
        const group = this.table.face(Face[face]);
        if (!group) {
          throw Error();
        }
        let cubelet = this.cubelets[group.indices[0]];
        const color = cubelet.getFace(face);
        const same = group.indices.every((idx) => {
        cubelet = this.cubelets[idx];
        return color == cubelet.getFace(face);
        });
        return same;
      });
      return complete;
    }
  
    index(value: number): number {
      return this.initials[value].index;
    }
  
  
    reset(): void {
      tweener.finish();
      for (const cubelet of this.cubelets) {
        cubelet.setRotationFromEuler(new THREE.Euler(0, 0, 0));
        cubelet.index = cubelet.initial;
        cubelet.updateMatrix();
      }
      this.cubelets.sort((left, right) => {
        return left.index - right.index;
      });
    }
  
    stick(index: number, face: number, value: string): void {
      const cubelet = this.initials[index];
      if (!cubelet) {
        throw Error("invalid cubelet index: " + index);
      }
      cubelet.stick(face, value);
      this.dirty = true;
    }
  
    strip(strip: { [face: string]: number[] | undefined }): void {
      for (const face of [Face.L, Face.R, Face.D, Face.U, Face.B, Face.F]) {
        const key = Face[face];
        const group = this.table.face(key);
        if (!group) {
          throw Error();
        }
        for (const index of group.indices) {
          this.initials[index].stick(face, "");
        }
        const indexes = strip[key];
        if (indexes == undefined) {
          continue;
        }
        for (const index of indexes) {
          const cubelet = this.initials[index];
          if (!cubelet) {
            throw Error("invalid cubelet index: " + index);
          }
          cubelet.stick(face, "remove");
        }
      }
      this.dirty = true;
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
    serialize(): string {
      const result: string[] = [];
      let x, y, z;
  
      y = this.order - 1;
      for (z = 0; z < this.order; z++) {
        for (x = 0; x < this.order; x++) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.U);
          result.push(color);
        }
      }
  
      x = this.order - 1;
      for (y = this.order - 1; y >= 0; y--) {
        for (z = this.order - 1; z >= 0; z--) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.R);
          result.push(color);
        }
      }
  
      z = this.order - 1;
      for (y = this.order - 1; y >= 0; y--) {
        for (x = 0; x < this.order; x++) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.F);
          result.push(color);
        }
      }
  
      y = 0;
      for (z = this.order - 1; z >= 0; z--) {
        for (x = 0; x < this.order; x++) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.D);
          result.push(color);
        }
      }
  
      x = 0;
      for (y = this.order - 1; y >= 0; y--) {
        for (z = 0; z < this.order; z++) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.L);
          result.push(color);
        }
      }
  
      z = 0;
      for (y = this.order - 1; y >= 0; y--) {
        for (x = this.order - 1; x >= 0; x--) {
          const index = z * this.order * this.order + y * this.order + x;
          const color = this.cubelets[index].getColor(Face.B);
          result.push(color);
        }
      }
      return result.join("");
    }
  }
  