
import * as THREE from "three";
import {Face, Frame, Mirror, Sticker} from "./utils_internal";

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

export const cubelet_basics = ((): { [key: string]: THREE.MeshBasicMaterial } => {
  const result: { [key: string]: THREE.MeshBasicMaterial } = {};
  for (const key in cubelet_colors) {
    result[key] = new THREE.MeshBasicMaterial({ color: cubelet_colors[key] });
  }
  return result;
})();

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

export const cubelet_trans = new THREE.MeshBasicMaterial({
  color: cubelet_colors.gray,
  transparent: true,
  opacity: 0.1,
  depthWrite: false,
});

export const cubelet_sticker = new Sticker(
  cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._edge_width,
  cubelet_defs._sticker_depth,
  false
);

export const cubelet_mirror = new Mirror(
  cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._sticker_depth
);