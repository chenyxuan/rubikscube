import { cubelet_defs, cubelet_core, cubelet_lambers, cubelet_basics, cubelet_frame, cubelet_sticker, cubelet_mirror } from "./utils";
import * as THREE from "three";
import { Face } from "./utils_internal";

export default class Cubelet extends THREE.Group {
  _vector: THREE.Vector3;
  _quaternion: THREE.Quaternion;
  _index: number;


  mirrors: THREE.Mesh[];
  lamberts: (THREE.MeshLambertMaterial | undefined)[];
  basics: (THREE.MeshBasicMaterial | undefined)[];


  frame: THREE.Mesh;
  order: number;

  initial: number;
  stickers: THREE.Mesh[];

  set vector(vector: THREE.Vector3) {
    const half = (this.order - 1) / 2;
    let x = Math.round(vector.x * 2) / 2;
    let y = Math.round(vector.y * 2) / 2;
    let z = Math.round(vector.z * 2) / 2;
    this._vector.set(x, y, z);
    x = Math.round(x + half);
    y = Math.round(y + half);
    z = Math.round(z + half);
    this._index = z * this.order * this.order + y * this.order + x;
    this.position.x = cubelet_defs.size * this._vector.x;
    this.position.y = cubelet_defs.size * this._vector.y;
    this.position.z = cubelet_defs.size * this._vector.z;
  }

  get vector(): THREE.Vector3 {
    return this._vector;
  }

  set index(index: number) {
    const half = (this.order - 1) / 2;
    const _x = (index % this.order) - half;
    const _y = Math.floor((index % (this.order * this.order)) / this.order) - half;
    const _z = Math.floor(index / (this.order * this.order)) - half;
    this.vector = new THREE.Vector3(_x, _y, _z);
  }

  get index(): number {
    return this._index;
  }

  constructor(index: number) {
    super();
    this._vector = new THREE.Vector3();
    this._quaternion = new THREE.Quaternion();
    this.order = cubelet_defs.order;
    this.initial = index;
    this.index = index;
    this.stickers = [];
    this.mirrors = [];

    const half = (this.order - 1) / 2;

    this.lamberts = [
      this.vector.x == -half ? cubelet_lambers.L : undefined,
      this.vector.x == half ? cubelet_lambers.R : undefined,
      this.vector.y == -half ? cubelet_lambers.D : undefined,
      this.vector.y == half ? cubelet_lambers.U : undefined,
      this.vector.z == -half ? cubelet_lambers.B : undefined,
      this.vector.z == half ? cubelet_lambers.F : undefined,
    ];

    this.basics = [
      this.vector.x == -half ? cubelet_basics.L : undefined,
      this.vector.x == half ? cubelet_basics.R : undefined,
      this.vector.y == -half ? cubelet_basics.D : undefined,
      this.vector.y == half ? cubelet_basics.U : undefined,
      this.vector.z == -half ? cubelet_basics.B : undefined,
      this.vector.z == half ? cubelet_basics.F : undefined,
    ];

    this.frame = new THREE.Mesh(cubelet_frame, cubelet_core);
    this.add(this.frame);

    for (let i = 0; i < 6; i++) {
      if (this.lamberts[i] != undefined) {
        const _sticker = new THREE.Mesh(cubelet_sticker, this.lamberts[i]);
        switch (i) {
          case Face.L:
            _sticker.rotation.y = -Math.PI / 2;
            _sticker.position.x = -cubelet_defs.size / 2;
            break;
          case Face.R:
            _sticker.rotation.y = Math.PI / 2;
            _sticker.position.x = cubelet_defs.size / 2;
            break;
          case Face.D:
            _sticker.rotation.x = Math.PI / 2;
            _sticker.position.y = -cubelet_defs.size / 2;
            break;
          case Face.U:
            _sticker.rotation.x = -Math.PI / 2;
            _sticker.position.y = cubelet_defs.size / 2;
            break;
          case Face.B:
            _sticker.rotation.x = Math.PI;
            _sticker.position.z = -cubelet_defs.size / 2;
            break;
          case Face.F:
            _sticker.rotation.x = 2 * Math.PI;
            _sticker.position.z = cubelet_defs.size / 2;
            break;
          default:
            break;
        }
        this.add(_sticker);
        this.stickers[i] = _sticker;
        const _mirror = new THREE.Mesh(cubelet_mirror, this.basics[i]);
        _mirror.rotation.x = _sticker.rotation.x == 0 ? 0 : _sticker.rotation.x + Math.PI;
        _mirror.rotation.y = _sticker.rotation.y == 0 ? 0 : _sticker.rotation.y + Math.PI;
        _mirror.rotation.z = _sticker.rotation.z == 0 ? 0 : _sticker.rotation.z + Math.PI;
        if (_mirror.rotation.x + _mirror.rotation.y + _mirror.rotation.z == 0) {
          _mirror.rotation.y = Math.PI;
        }

        _mirror.position.x = _sticker.position.x * (this.order + 1);
        _mirror.position.y = _sticker.position.y * (this.order + 1);
        _mirror.position.z = _sticker.position.z * (this.order + 1);
        this.mirrors[i] = _mirror;
      }
    }
    this.matrixAutoUpdate = false;
    this.updateMatrix();
  }

}
