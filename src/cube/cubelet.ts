import { cubelet_defs, cubelet_core, cubelet_frame, cubelet_sticker, cubelet_face_attrs, directionToIndex, facePostionBindings, cubelet_lambers } from "./utils";
import * as THREE from "three";
import { indexToDirection } from "./utils"
import { Face } from "./utils_internal";
import { Quaternion, Vector3 } from "three";

export default class Cubelet extends THREE.Group {
  _vector: THREE.Vector3;
  index: number;

  frame: THREE.Mesh;
  stickers: THREE.Mesh[];

  set vector(vector: THREE.Vector3) {
    this._vector.copy(vector);
    this.index = directionToIndex(vector);
    this.position.copy(vector);
    this.position.multiplyScalar(cubelet_defs.size);
  }

  get vector(): THREE.Vector3 {
    return this._vector;
  }

  constructor(index: number) {
    super();
    this._vector = new THREE.Vector3();
    this.index = index;

    const drctn = indexToDirection(index);
    this.vector = new THREE.Vector3(drctn.x, drctn.y, drctn.z);

    this.frame = new THREE.Mesh(cubelet_frame, cubelet_core);
    this.add(this.frame);

    this.stickers = new Array(6);
    for (let i = 0; i < 6; i++) {
      const face_attr = cubelet_face_attrs[i];
      if (face_attr.match(this.vector)) {
        const sticker = new THREE.Mesh(cubelet_sticker, face_attr.lambert);
        sticker.rotation.setFromVector3(face_attr.rotation);
        sticker.position.copy(face_attr.position);
        this.stickers[i] = sticker;
        this.add(sticker);
      }
    }

    this.matrixAutoUpdate = false;
    this.updateMatrix();
  }

  convertFace(face: Face): number {
    let position = new Vector3();
    const quaternion = new Quaternion().copy(this.quaternion);
    for (const binding of facePostionBindings) {
      if (binding.face === face) {
        position.copy(binding.position);
        break;
      }
    }
    position.applyQuaternion(quaternion.invert());
    const vector = new Vector3(
      Math.round(position.x),
      Math.round(position.y),
      Math.round(position.z));
    for (const binding of facePostionBindings) {
      if (binding.position.equals(vector)) {
        return binding.face;
      }
    }
    return -1;
  }

  getColorOf(face: Face): string {
    const sticker = this.stickers[this.convertFace(face)];
    switch (sticker.material) {
      case cubelet_lambers.L:
        return "L";
      case cubelet_lambers.R:
        return "R";
      case cubelet_lambers.F:
        return "F";
      case cubelet_lambers.B:
        return "B";
      case cubelet_lambers.U:
        return "U";
      case cubelet_lambers.D:
        return "D";
    }
    return "?";
  }
}
