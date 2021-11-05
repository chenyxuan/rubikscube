
import * as THREE from "three";
import { Vector3 } from "three";
import {Frame, Mirror, Sticker} from "./utils_internal";

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
  size : 64,
  order : 3,
  _border_width : 3,
  _edge_width : 2,
  _sticker_depth : 0.1,
}


export const cubelet_frame : Frame = new Frame(cubelet_defs.size, cubelet_defs._border_width);


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

export const indexToDirection = (index : number) : {[key: string]: number} => {
  return {x : index % 3 - 1, y : Math.floor(index / 3) % 3 - 1, z : Math.floor(index / 9) - 1};
}

export const face_attrs = [
  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.x == -1}, 
    lambert : cubelet_lambers.L,
    position : new Vector3(-cubelet_defs.size / 2, 0, 0),
    rotation : new Vector3(0, -Math.PI / 2, 0),
  },
  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.x == 1}, 
    lambert : cubelet_lambers.R,
    position : new Vector3(cubelet_defs.size / 2, 0, 0),
    rotation : new Vector3(0, Math.PI / 2, 0),
  },
  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.y == -1}, 
    lambert : cubelet_lambers.D,
    position : new Vector3(0, -cubelet_defs.size / 2, 0),
    rotation : new Vector3(Math.PI / 2, 0, 0),
  },
  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.y == 1}, 
    lambert : cubelet_lambers.U,
    position : new Vector3(0, cubelet_defs.size / 2, 0),
    rotation : new Vector3(-Math.PI / 2, 0, 0),
  },
  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.z == -1}, 
    lambert : cubelet_lambers.B,
    position : new Vector3(0, 0, -cubelet_defs.size / 2),
    rotation : new Vector3(Math.PI, 0, 0),
  },

  { 
    match : (vector : THREE.Vector3) : boolean => { return vector.z == 1}, 
    lambert : cubelet_lambers.F,
    position : new Vector3(0, 0, cubelet_defs.size / 2),
    rotation : new Vector3(2 * Math.PI, 0, 0),
  },
]