import * as THREE from "three";
import World from "./world";

export default class Capturer {
    world : World;
    renderer: THREE.WebGLRenderer;
    
    constructor() {
        this.world = new World();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        });
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(256, 256, true);
        this.world.resize(256, 256);
    }

    generate(state: string): string {
        this.world.cube.restore(state.split(""));
        this.renderer.render(this.world.scene, this.world.camera);
        return this.renderer.domElement.toDataURL();
    }

}