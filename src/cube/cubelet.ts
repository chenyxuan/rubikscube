import { cubelet_defs, cubelet_core, cubelet_frame, cubelet_sticker, face_attrs } from "./utils";
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
    const half = 1;
    let x = vector.x;
    let y = vector.y;
    let z = vector.z;
    this._vector.set(x, y, z);
    x = Math.round(x + half);
    y = Math.round(y + half);
    z = Math.round(z + half);
    this.index = z * 9 + y * 3 + x;
    this.position.x = cubelet_defs.size * this._vector.x;
    this.position.y = cubelet_defs.size * this._vector.y;
    this.position.z = cubelet_defs.size * this._vector.z;
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
      const face_attr = face_attrs[i];
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
