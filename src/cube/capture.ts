import * as THREE from "three";
import { cubelet_defs } from "./utils";
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
        
        /*
        const distance = cubelet_defs.size * 3 * this.world.perspective;
        this.world.camera.position.z = distance;
        this.world.camera.near = distance - cubelet_defs.size * 3;
        this.world.camera.far = distance + cubelet_defs.size * 8;
        */
    }

    generate(state: string): string {
        this.world.cube.restore(state.split(""));
        this.renderer.render(this.world.scene, this.world.camera);
        return this.renderer.domElement.toDataURL();
    }

}