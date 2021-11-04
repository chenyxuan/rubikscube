import * as THREE from "three";
import Controller from "./controller";
import Cube from "./cube";
import Cubelet from "./cubelet";

export default class World {
  width : number;
  height : number;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  cube: Cube;

  ambient: THREE.AmbientLight;
  directional: THREE.DirectionalLight;

  controller: Controller;

  scale : number;
  perspective : number;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.matrixAutoUpdate = false;
    this.scene.rotation.x = Math.PI / 6;
    this.scene.rotation.y = -Math.PI / 4 + Math.PI / 16;

    this.ambient = new THREE.AmbientLight(0xffffff, 1);

    this.directional = new THREE.DirectionalLight(0xffffff, 0);
    this.directional.position.set(Cubelet.size, Cubelet.size * 3, Cubelet.size * 2);

    this.scene.add(this.ambient);
    this.scene.add(this.directional);
    this.scene.updateMatrix();

    this.camera = new THREE.PerspectiveCamera(50, 1, 1, Cubelet.size * 32);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0;

    this.controller = new Controller(this);
    this.cube = new Cube();
    this.scene.add(this.cube);
    this.scale = 1;
    this.perspective = 9;
  }

  resize(width : number, height : number): void {
    this.width = width;
    this.height = height;
    this.updateCamera();
  }

  updateCamera():void {
    const min = this.height / Math.min(this.width, this.height) / this.scale / this.perspective;
    const fov = (2 * Math.atan(min) * 180) / Math.PI;
    const distance = Cubelet.size * 3 * this.perspective;

    this.camera.aspect = this.width / this.height;
    this.camera.fov = fov;
    this.camera.position.z = distance;
    this.camera.near = distance - Cubelet.size * 3;
    this.camera.far = distance + Cubelet.size * 8;
    this.camera.lookAt(this.scene.position);
    this.camera.updateProjectionMatrix();
  }
}
