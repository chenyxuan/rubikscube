import * as THREE from "three";
import { Vector3 } from "three";
import { Face, Frame, Sticker } from "./utils_internal";

export const cube_config = {
  speed: 3,
  sensibility: 25 * 1e-4,
  scramble_steps: 20,
  solverId: 1,
}

export const twist_duration = (speed: number): number => {
  return (6 - speed) * 200;
};

export const cubelet_colors: { [key: string]: string } = {
  R: "#B71C1C",
  L: "#FF6D00",
  U: "#F0F0F0",
  D: "#FFD600",
  F: "#00A020",
  B: "#0D47A1",
  core: "#202020",
  gray: "#808080",
  high: "#FF0080",
};

export const cubelet_defs = {
  size: 64,
  _border_width: 3,
  _edge_width: 2,
  _sticker_depth: 0.1,
}

export const cubelet_frame: Frame = new Frame(cubelet_defs.size, cubelet_defs._border_width);

export const cubelet_lambers = ((): { [key: string]: THREE.MeshLambertMaterial } => {
  const result: { [key: string]: THREE.MeshLambertMaterial } = {};
  for (const key in cubelet_colors) {
    result[key] = new THREE.MeshLambertMaterial({ color: cubelet_colors[key] });
  }
  return result;
})();

export const cubelet_core = new THREE.MeshPhongMaterial({
  color: cubelet_colors.core,
  specular: cubelet_colors.gray,
  shininess: 2,
});

export const cubelet_sticker = new Sticker(
  cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._edge_width,
  cubelet_defs._sticker_depth
);

export const cubelet_face_attrs = [
  {
    match: (vector: THREE.Vector3): boolean => { return vector.x == -1 },
    lambert: cubelet_lambers.L,
    position: new Vector3(-cubelet_defs.size / 2, 0, 0),
    rotation: new Vector3(0, -Math.PI / 2, 0),
  },
  {
    match: (vector: THREE.Vector3): boolean => { return vector.x == 1 },
    lambert: cubelet_lambers.R,
    position: new Vector3(cubelet_defs.size / 2, 0, 0),
    rotation: new Vector3(0, Math.PI / 2, 0),
  },
  {
    match: (vector: THREE.Vector3): boolean => { return vector.y == -1 },
    lambert: cubelet_lambers.D,
    position: new Vector3(0, -cubelet_defs.size / 2, 0),
    rotation: new Vector3(Math.PI / 2, 0, 0),
  },
  {
    match: (vector: THREE.Vector3): boolean => { return vector.y == 1 },
    lambert: cubelet_lambers.U,
    position: new Vector3(0, cubelet_defs.size / 2, 0),
    rotation: new Vector3(-Math.PI / 2, 0, 0),
  },
  {
    match: (vector: THREE.Vector3): boolean => { return vector.z == -1 },
    lambert: cubelet_lambers.B,
    position: new Vector3(0, 0, -cubelet_defs.size / 2),
    rotation: new Vector3(Math.PI, 0, 0),
  },
  {
    match: (vector: THREE.Vector3): boolean => { return vector.z == 1 },
    lambert: cubelet_lambers.F,
    position: new Vector3(0, 0, cubelet_defs.size / 2),
    rotation: new Vector3(2 * Math.PI, 0, 0),
  },
]

export const cube_size = cubelet_defs.size * 3;

export const axis_vectors: { [key: string]: THREE.Vector3 } = {
  a: new THREE.Vector3(1, 1, 1),
  x: new THREE.Vector3(-1, 0, 0),
  y: new THREE.Vector3(0, -1, 0),
  z: new THREE.Vector3(0, 0, -1),
};

export const axis_planes: { [key: string]: THREE.Plane } = {
  x: new THREE.Plane(new THREE.Vector3(1, 0, 0), -cube_size / 2),
  y: new THREE.Plane(new THREE.Vector3(0, 1, 0), -cube_size / 2),
  z: new THREE.Plane(new THREE.Vector3(0, 0, 1), -cube_size / 2)
}

export const indexToDirection = (index: number): Vector3 => {
  return new Vector3(index % 3 - 1, Math.floor(index / 3) % 3 - 1, Math.floor(index / 9) - 1);
}

export const directionToIndex = (drctn: Vector3): number => {
  return Math.round((drctn.x + 1) + (drctn.y + 1) * 3 + (drctn.z + 1) * 9);
}

export const indexToLayer = (index: number): { [key: string]: number } => {
  const result: { [key: string]: number } = { x: index % 3, y: Math.floor(index / 3) % 3, z: Math.floor(index / 9) };
  return result;
}

export const worldToIndex = (point: Vector3): number => {
  const vector = new Vector3().copy(point);
  vector.add(new Vector3().setScalar(cube_size / 2));
  vector.divideScalar(cube_size).multiplyScalar(3).floor();
  vector.max(new Vector3().setScalar(0));
  vector.min(new Vector3().setScalar(2));
  return vector.x + vector.y * 3 + vector.z * 9;
}

export const facePostionBindings = [
  {
    face: Face.L,
    position: new THREE.Vector3(-1, 0, 0)
  },
  {
    face: Face.R,
    position: new THREE.Vector3(1, 0, 0)
  },
  {
    face: Face.D,
    position: new THREE.Vector3(0, -1, 0)
  },
  {
    face: Face.U,
    position: new THREE.Vector3(0, 1, 0)
  },
  {
    face: Face.B,
    position: new THREE.Vector3(0, 0, -1)
  },
  {
    face: Face.F,
    position: new THREE.Vector3(0, 0, 1)
  },
];

export const stringToTwistParams: { [key: string]: { axis: string, layers: number[], angle: number } } = {
  "L": { axis: 'x', layers: [0], angle: -Math.PI / 2 },
  "L'": { axis: 'x', layers: [0], angle: Math.PI / 2 },
  "L2": { axis: 'x', layers: [0], angle: -Math.PI },

  "R": { axis: 'x', layers: [2], angle: Math.PI / 2 },
  "R'": { axis: 'x', layers: [2], angle: -Math.PI / 2 },
  "R2": { axis: 'x', layers: [2], angle: Math.PI },

  "F": { axis: 'z', layers: [2], angle: Math.PI / 2 },
  "F'": { axis: 'z', layers: [2], angle: -Math.PI / 2 },
  "F2": { axis: 'z', layers: [2], angle: Math.PI },

  "B": { axis: 'z', layers: [0], angle: -Math.PI / 2 },
  "B'": { axis: 'z', layers: [0], angle: Math.PI / 2 },
  "B2": { axis: 'z', layers: [0], angle: -Math.PI },

  "U": { axis: 'y', layers: [2], angle: Math.PI / 2 },
  "U'": { axis: 'y', layers: [2], angle: -Math.PI / 2 },
  "U2": { axis: 'y', layers: [2], angle: Math.PI },

  "D": { axis: 'y', layers: [0], angle: -Math.PI / 2 },
  "D'": { axis: 'y', layers: [0], angle: Math.PI / 2 },
  "D2": { axis: 'y', layers: [0], angle: -Math.PI },

  "~": { axis: 'a', layers: [], angle: 0 },

  "x": { axis: 'x', layers: [0, 1, 2], angle: Math.PI / 2 },
  "x'": { axis: 'x', layers: [0, 1, 2], angle: -Math.PI / 2 },
  "x2": { axis: 'x', layers: [0, 1, 2], angle: Math.PI },

  "y": { axis: 'y', layers: [0, 1, 2], angle: Math.PI / 2 },
  "y'": { axis: 'y', layers: [0, 1, 2], angle: -Math.PI / 2 },
  "y2": { axis: 'y', layers: [0, 1, 2], angle: Math.PI },

  "z": { axis: 'z', layers: [0, 1, 2], angle: Math.PI / 2 },
  "z'": { axis: 'z', layers: [0, 1, 2], angle: -Math.PI / 2 },
  "z2": { axis: 'z', layers: [0, 1, 2], angle: Math.PI },

  "l": { axis: 'x', layers: [0, 1], angle: -Math.PI / 2 },
  "l'": { axis: 'x', layers: [0, 1], angle: Math.PI / 2 },
  "l2": { axis: 'x', layers: [0, 1], angle: -Math.PI },

  "r": { axis: 'x', layers: [2, 1], angle: Math.PI / 2 },
  "r'": { axis: 'x', layers: [2, 1], angle: -Math.PI / 2 },
  "r2": { axis: 'x', layers: [2, 1], angle: Math.PI },

  "f": { axis: 'z', layers: [2, 1], angle: Math.PI / 2 },
  "f'": { axis: 'z', layers: [2, 1], angle: -Math.PI / 2 },
  "f2": { axis: 'z', layers: [2, 1], angle: Math.PI },

  "b": { axis: 'z', layers: [0, 1], angle: -Math.PI / 2 },
  "b'": { axis: 'z', layers: [0, 1], angle: Math.PI / 2 },
  "b2": { axis: 'z', layers: [0, 1], angle: -Math.PI },

  "u": { axis: 'y', layers: [2, 1], angle: Math.PI / 2 },
  "u'": { axis: 'y', layers: [2, 1], angle: -Math.PI / 2 },
  "u2": { axis: 'y', layers: [2, 1], angle: Math.PI },

  "d": { axis: 'y', layers: [0, 1], angle: -Math.PI / 2 },
  "d'": { axis: 'y', layers: [0, 1], angle: Math.PI / 2 },
  "d2": { axis: 'y', layers: [0, 1], angle: -Math.PI },

  "E": { axis: 'y', layers: [1], angle: -Math.PI / 2 },
  "E'": { axis: 'y', layers: [1], angle: Math.PI / 2 },
  "E2": { axis: 'y', layers: [1], angle: -Math.PI },

  "M": { axis: 'x', layers: [1], angle: -Math.PI / 2 },
  "M'": { axis: 'x', layers: [1], angle: Math.PI / 2 },
  "M2": { axis: 'x', layers: [1], angle: -Math.PI },

  "S": { axis: 'z', layers: [1], angle: Math.PI / 2 },
  "S'": { axis: 'z', layers: [1], angle: -Math.PI / 2 },
  "S2": { axis: 'z', layers: [1], angle: Math.PI },

  "": { axis: 'a', layers: [], angle: 0 },
}

export const lblOrderMapping: { [key: string]: string } = {
  "U": "U",
  "u": "U'",
  "D": "D",
  "d": "D'",
  "F": "F",
  "f": "F'",
  "L": "L",
  "l": "L'",
  "R": "R",
  "r": "R'",
  "B": "B",
  "b": "B'",
  "Y": "y",
  "y": "y'"
}

export const faceToColor: { [key: string]: string } = {
  "U": "w",
  "F": "g",
  "R": "r",
  "B": "b",
  "D": "y",
  "L": "o"
}

export const whiteToBottom = (state: string[]): string => {
  switch ('U') {
    case state[4]:
      return "x2";
    case state[13]:
      return "z";
    case state[22]:
      return "x'";
    case state[40]:
      return "z'";
    case state[49]:
      return "x";
    default:
      return "";
  }
}

export const oppositeMapping: { [key: string]: string } = {
  "U": "D",
  "D": "U",
  "R": "L",
  "L": "R",
  "F": "B",
  "B": "F",
  "y": "y'",
  "y'": "y"
}

export const delayedYellowToTop = (last: string): { [key: string]: string } => {
  switch (last) {
    case "x":
      return {
        combined: "x'",
        delayed: "x2"
      };
    case "x'":
      return {
        combined: "x",
        delayed: "x2"
      };
    case "x2":
      return {
        combined: "",
        delayed: "x2"
      };
    /*
      case "y":
        return {
          combined: "y'",
          delayed: "y2"
        };
      case "y'":
        return {
          combined: "y",
          delayed: "y2"
        };
      case "y2":
        return {
          combined: "",
          delayed: "y2"
        };
    */
    case "z":
      return {
        combined: "z'",
        delayed: "z2"
      };
    case "z'":
      return {
        combined: "z",
        delayed: "z2"
      };
    /*
      case "z2":
        return {
          combined: "",
          delayed: "z2"
        };
    */
    default:
      return {
        combined: "x2",
        delayed: "x2"
      };
  }
}