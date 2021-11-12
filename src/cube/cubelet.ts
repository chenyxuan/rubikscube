import { cubelet_defs, cubelet_core, cubelet_frame, cubelet_sticker, cubelet_face_attrs, directionToIndex } from "./utils";
import * as THREE from "three";
import { indexToDirection } from "./utils"

export default class Cubelet extends THREE.Group {
  _vector: THREE.Vector3;
  index: number;
  
  lamberts: (THREE.MeshLambertMaterial | undefined)[];

  frame: THREE.Mesh;

  initial: number;
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
    this.initial = index;
    this.index = index;

    const drctn = indexToDirection(index);
    this.vector = new THREE.Vector3(drctn.x, drctn.y, drctn.z);

    this.frame = new THREE.Mesh(cubelet_frame, cubelet_core);
    this.add(this.frame);

    this.lamberts = new Array(6);
    this.stickers = new Array(6);
    for(let i = 0; i < 6; i++) {
      const face_attr = cubelet_face_attrs[i];
      if(face_attr.match(this.vector)) {
        this.lamberts[i] = face_attr.lambert;
        const sticker = new THREE.Mesh(cubelet_sticker, this.lamberts[i]);
        sticker.rotation.setFromVector3(face_attr.rotation);
        sticker.position.copy(face_attr.position);
        this.stickers[i] = sticker;
        this.add(sticker);
      }
    }

    this.matrixAutoUpdate = false;
    this.updateMatrix();
  }
}
