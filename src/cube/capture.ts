import Cube from "./cube";
import * as THREE from "three";
import { cubelet_defs, cube_size } from "./utils";

export default class Capturer {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    ambient: THREE.AmbientLight;
    directional: THREE.DirectionalLight;
    perspective: number;

    camera: THREE.PerspectiveCamera;
    cube: Cube;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        });
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(256, 256, true);

        this.scene = new THREE.Scene();
        this.scene.rotation.x = Math.PI / 6;
        this.scene.rotation.y = -Math.PI / 4 + Math.PI / 16;

        this.ambient = new THREE.AmbientLight(0xffffff, 0.9);
        this.directional = new THREE.DirectionalLight(0xffffff, 0.1);
        this.directional.position.set(cubelet_defs.size, cubelet_defs.size * 3, cubelet_defs.size * 2);

        this.scene.add(this.ambient);
        this.scene.add(this.directional);
        this.scene.updateMatrix();

        this.cube = new Cube();
        this.scene.add(this.cube);

        this.perspective = 9;
        this.camera = new THREE.PerspectiveCamera();
        this.camera.aspect = 1;
        this.camera.fov = (2 * Math.atan(1 / this.perspective) * 180) / Math.PI;
        this.camera.position.z = cube_size * this.perspective * 0.9;
        this.camera.lookAt(this.scene.position);
        this.camera.updateProjectionMatrix();
    }

    generate(state: string): string {
        this.cube.restore(state.split(""), 1.1);
        this.renderer.render(this.scene, this.camera);
        return this.renderer.domElement.toDataURL();
    }

}