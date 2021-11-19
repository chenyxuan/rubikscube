import * as THREE from "three";
import { Vector3 } from "three";
import Controller from "./controller";
import Cube from "./cube";
import { cubelet_defs } from "./utils";

export default class World {
  width: number;
  height: number;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  cube: Cube;

  ambient: THREE.AmbientLight;
  directional: THREE.DirectionalLight;

  controller: Controller;

  scale: number;
  perspective: number;

  set dirty(value: boolean) {
    this.cube.dirty = value;
  }

  get dirty(): boolean {
    return this.cube.dirty;
  }

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.matrixAutoUpdate = false;
    this.scene.rotation.x = Math.PI / 6;
    this.scene.rotation.y = -Math.PI / 4 + Math.PI / 16;

    this.ambient = new THREE.AmbientLight(0xffffff, 1);

    this.directional = new THREE.DirectionalLight(0xffffff, 0);
    this.directional.position.set(cubelet_defs.size, cubelet_defs.size * 3, cubelet_defs.size * 2);

    this.scene.add(this.ambient);
    this.scene.add(this.directional);
    this.scene.updateMatrix();

    this.camera = new THREE.PerspectiveCamera();

    this.controller = new Controller(this);
    this.cube = new Cube();
    this.scene.add(this.cube);
    this.dirty = true;
    this.scale = 1;
    this.perspective = 9;

  }
  
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.updateCamera();
  }

  updateCamera(): void {
    const min = this.height / Math.min(this.width, this.height) / this.scale / this.perspective;
    const fov = (2 * Math.atan(min) * 180) / Math.PI;
    const distance = cubelet_defs.size * 3 * this.perspective * 0.9;

    this.camera.aspect = this.width / this.height;
    this.camera.fov = fov;
    this.camera.position.z = distance;
    this.camera.near = distance - cubelet_defs.size * 3;
    this.camera.far = distance + cubelet_defs.size * 8;
    this.camera.lookAt(new Vector3(0, 0, 30));
    this.camera.updateProjectionMatrix();
  }
}
