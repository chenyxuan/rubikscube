
import * as THREE from "three";

export enum FACE {
    L,
    R,
    D,
    U,
    B,
    F,
  }
  
  export const COLORS: { [key: string]: string } = {
    R: "#B71C1C",
    L: "#FF6D00",
    U: "#F0F0F0",
    D: "#FFD600",
    F: "#00A020",
    B: "#0D47A1",
    Core: "#202020",
    Gray: "#808080",
    High: "#FF0080",
  };
  

  
export class Frame extends THREE.BufferGeometry {
  private static readonly _INDICES = [
    0, 2, 1,
    0, 3, 2,
    4, 6, 5,
    4, 7, 6,
    8, 10, 9,
    8, 11, 10,
    12, 14, 13,
    12, 15, 14,
    16, 18, 17,
    16, 19, 18,
    20, 22, 21,
    20, 23, 22,
    1, 6, 7,
    0, 1, 7,
    3, 0, 10,
    11, 3, 10,
    17, 2, 3,
    16, 17, 3,
    23, 20, 1,
    2, 23, 1,
    5, 12, 13,
    4, 5, 13,
    9, 13, 14,
    8, 9, 14,
    22, 15, 12,
    21, 22, 12,
    19, 14, 15,
    18, 19, 15,
    7, 4, 9,
    10, 7, 9,
    11, 8, 19,
    16, 11, 19,
    23, 17, 18,
    22, 23, 18,
    20, 21, 5,
    6, 20, 5,
    20, 6, 1,
    10, 0, 7,
    21, 12, 5,
    13, 9, 4,
    23, 2, 17,
    11, 16, 3,
    22, 18, 15,
    8, 14, 19,
  ];

  constructor(size: number, border: number) {
    super();
    const _O = size / 2;
    const _I = _O - border;
    const _verts = [
      -_I, +_I, +_O, // 0: F Face
      +_I, +_I, +_O,
      +_I, -_I, +_O,
      -_I, -_I, +_O,
      -_I, +_O, -_I, // 4: U Face
      +_I, +_O, -_I,
      +_I, +_O, +_I,
      -_I, +_O, +_I,
      -_O, -_I, -_I, //8: L Face
      -_O, +_I, -_I,
      -_O, +_I, +_I,
      -_O, -_I, +_I,
      +_I, +_I, -_O, //12: B Face
      -_I, +_I, -_O,
      -_I, -_I, -_O,
      +_I, -_I, -_O,
      -_I, -_O, +_I, //16: D Face
      +_I, -_O, +_I,
      +_I, -_O, -_I,
      -_I, -_O, -_I,
      +_O, +_I, +_I, //20: R Face
      +_O, +_I, -_I,
      +_O, -_I, -_I,
      +_O, -_I, +_I,
    ];
    this.setAttribute("position", new THREE.Float32BufferAttribute(_verts, 3));
    this.setIndex(Frame._INDICES);
    this.computeVertexNormals();
  }
}

export class Sticker extends THREE.ExtrudeGeometry {
  constructor(size: number, depth: number, arrow: boolean) {
    size = size / 2;
    const left = -size;
    const bottom = size;
    const top = -size;
    const right = size;
    const radius = size / 4;

    const shape = new THREE.Shape();
    shape.moveTo(left, top + radius);
    shape.lineTo(left, bottom - radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom - radius);
    shape.lineTo(right, top + radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top + radius);
    shape.closePath();

    if (arrow) {
      const h = size * 0.6;
      const w = h * 0.8;
      const arrow = new THREE.Path();
      arrow.moveTo(0, h);
      arrow.lineTo(-w, 0);
      arrow.lineTo(-w / 2, 0);
      arrow.lineTo(-w / 2, -h);
      arrow.lineTo(w / 2, -h);
      arrow.lineTo(w / 2, 0);
      arrow.lineTo(w, 0);
      arrow.closePath();
      shape.holes.push(arrow);
    }

    super(shape, { bevelEnabled: false, depth: depth });
  }
}

export class Mirror extends THREE.ShapeGeometry {
  constructor(size: number) {
    size = size / 2;
    const left = -size;
    const bottom = size;
    const top = -size;
    const right = size;
    const radius = size / 4;

    const shape = new THREE.Shape();
    shape.moveTo(left, top + radius);
    shape.lineTo(left, bottom - radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom - radius);
    shape.lineTo(right, top + radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top + radius);
    shape.closePath();

    super(shape);
  }
}