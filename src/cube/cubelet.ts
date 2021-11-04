import { FACE, COLORS, Frame, Sticker, Mirror } from "./utils";
import * as THREE from "three";


export default class Cubelet extends THREE.Group {
  public static readonly size = 64;
  private static readonly _border_width = 3;
  private static readonly _edge_width = 2;
  private static readonly _sticker_depth = 0.1;
  private static readonly _frame = new Frame(Cubelet.size, Cubelet._border_width);
  private static readonly _sticker = new Sticker(
    Cubelet.size - 2 * Cubelet._border_width - Cubelet._edge_width,
    Cubelet._sticker_depth,
    false
  );
  private static readonly _mirror: Mirror = new Mirror(
    Cubelet.size - 2 * Cubelet._border_width - Cubelet._sticker_depth
  );

  public static LAMBERS = ((): { [key: string]: THREE.MeshLambertMaterial } => {
    const result: { [key: string]: THREE.MeshLambertMaterial } = {};
    for (const key in COLORS) {
      const color = COLORS[key];
      result[key] = new THREE.MeshLambertMaterial({ color: color });
    }
    return result;
  })();

  public static CORE = new THREE.MeshPhongMaterial({
    color: COLORS.Core,
    specular: COLORS.Gray,
    shininess: 2,
  });

  public static TRANS = new THREE.MeshBasicMaterial({
    color: COLORS.Gray,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });

  public static BASICS = ((): { [key: string]: THREE.MeshBasicMaterial } => {
    const result: { [key: string]: THREE.MeshBasicMaterial } = {};
    for (const key in COLORS) {
      const color = COLORS[key];
      result[key] = new THREE.MeshBasicMaterial({ color: color });
    }
    return result;
  })();

  _vector: THREE.Vector3;

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
    this.position.x = Cubelet.size * this._vector.x;
    this.position.y = Cubelet.size * this._vector.y;
    this.position.z = Cubelet.size * this._vector.z;
  }
  get vector(): THREE.Vector3 {
    return this._vector;
  }

  _index: number;

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

  mirrors: THREE.Mesh[];
  lamberts: (THREE.MeshLambertMaterial | undefined)[];
  basics: (THREE.MeshBasicMaterial | undefined)[];
  set mirror(value: boolean) {
    if (value) {
      for (let i = 0; i < 6; i++) {
        if (this.mirrors[i] instanceof THREE.Mesh && this.children.indexOf(this.mirrors[i]) < 0) {
          this.add(this.mirrors[i]);
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (this.mirrors[i] instanceof THREE.Mesh && this.children.indexOf(this.mirrors[i]) >= 0) {
          this.remove(this.mirrors[i]);
        }
      }
    }
  }

  set hollow(value: boolean) {
    if (this.frame) {
      this.frame.material = value ? Cubelet.TRANS : Cubelet.CORE;
    }
  }

  getFace(face: FACE): number {
    const position = new THREE.Vector3(0, 0, 0);
    switch (face) {
      case FACE.L:
        position.x = -1;
        break;
      case FACE.R:
        position.x = 1;
        break;
      case FACE.D:
        position.y = -1;
        break;
      case FACE.U:
        position.y = 1;
        break;
      case FACE.B:
        position.z = -1;
        break;
      case FACE.F:
        position.z = 1;
        break;
      default:
        break;
    }
    this._quaternion.copy(this.quaternion);
    position.applyQuaternion(this._quaternion.invert());
    const x = Math.round(position.x);
    const y = Math.round(position.y);
    const z = Math.round(position.z);
    let color = 0;
    if (x < 0) {
      color = FACE.L;
    } else if (x > 0) {
      color = FACE.R;
    } else if (y < 0) {
      color = FACE.D;
    } else if (y > 0) {
      color = FACE.U;
    } else if (z < 0) {
      color = FACE.B;
    } else if (z > 0) {
      color = FACE.F;
    }
    return color;
  }

  initial: number;
  stickers: THREE.Mesh[];
  set thickness(value: boolean) {
    const scale = value ? Cubelet.size / 2 : 1;
    for (const sticker of this.stickers) {
      if (sticker) {
        sticker.scale.z = scale;
      }
    }
  }

  _quaternion: THREE.Quaternion;
  frame: THREE.Mesh;
  order: number;

  constructor(index: number) {
    super();
    this.order = 3;
    this.initial = index;
    this._vector = new THREE.Vector3();
    this.index = index;
    this.stickers = [];
    this._quaternion = new THREE.Quaternion();
    this.mirrors = [];

    const xx = this.position.x * this.position.x;
    const yy = this.position.y * this.position.y;
    const zz = this.position.z * this.position.z;
    let d = xx + yy + zz - Math.min(xx, yy, zz);
    d = Math.sqrt(d) + (Math.sqrt(2) * Cubelet.size) / 2 - (this.order * Cubelet.size) / 2;
    if (d < 0) {
      return;
    }
    const half = (this.order - 1) / 2;

    this.lamberts = [
      this.vector.x == -half ? Cubelet.LAMBERS.L : undefined,
      this.vector.x == half ? Cubelet.LAMBERS.R : undefined,
      this.vector.y == -half ? Cubelet.LAMBERS.D : undefined,
      this.vector.y == half ? Cubelet.LAMBERS.U : undefined,
      this.vector.z == -half ? Cubelet.LAMBERS.B : undefined,
      this.vector.z == half ? Cubelet.LAMBERS.F : undefined,
    ];

    this.basics = [
      this.vector.x == -half ? Cubelet.BASICS.L : undefined,
      this.vector.x == half ? Cubelet.BASICS.R : undefined,
      this.vector.y == -half ? Cubelet.BASICS.D : undefined,
      this.vector.y == half ? Cubelet.BASICS.U : undefined,
      this.vector.z == -half ? Cubelet.BASICS.B : undefined,
      this.vector.z == half ? Cubelet.BASICS.F : undefined,
    ];

    this.frame = new THREE.Mesh(Cubelet._frame, Cubelet.CORE);
    this.add(this.frame);

    for (let i = 0; i < 6; i++) {
      if (this.lamberts[i] != undefined) {
        const _sticker = new THREE.Mesh(Cubelet._sticker, this.lamberts[i]);
        _sticker.name = FACE[i];
        switch (i) {
          case FACE.L:
            _sticker.rotation.y = -Math.PI / 2;
            _sticker.position.x = -Cubelet.size / 2;
            break;
          case FACE.R:
            _sticker.rotation.y = Math.PI / 2;
            _sticker.position.x = Cubelet.size / 2;
            break;
          case FACE.D:
            _sticker.rotation.x = Math.PI / 2;
            _sticker.position.y = -Cubelet.size / 2;
            break;
          case FACE.U:
            _sticker.rotation.x = -Math.PI / 2;
            _sticker.position.y = Cubelet.size / 2;
            break;
          case FACE.B:
            _sticker.rotation.x = Math.PI;
            _sticker.position.z = -Cubelet.size / 2;
            break;
          case FACE.F:
            _sticker.rotation.x = 2 * Math.PI;
            _sticker.position.z = Cubelet.size / 2;
            break;
          default:
            break;
        }
        this.add(_sticker);
        this.stickers[i] = _sticker;
        const _mirror = new THREE.Mesh(Cubelet._mirror, this.basics[i]);
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

  stick(face: number, value: string): void {
    let lamber;
    let basic;
    if (this.stickers[face] === undefined) {
      return;
    }
    if (value == "remove") {
      this.stickers[face].visible = false;
      this.mirrors[face].visible = false;
      return;
    }
    this.stickers[face].visible = true;
    this.mirrors[face].visible = true;
    if (value && value.length > 0) {
      lamber = Cubelet.LAMBERS[value];
      basic = Cubelet.BASICS[value];
    } else {
      lamber = this.lamberts[face];
      basic = this.basics[face];
    }
    if (lamber === undefined || basic === undefined) {
      return;
    }
    this.stickers[face].material = lamber;
    if (this.mirrors[face] instanceof THREE.Mesh) {
      this.mirrors[face].material = basic;
    }
  }
}
