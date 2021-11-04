import * as THREE from "three"
import Cubelet from "./cubelet";

export default class Cube extends THREE.Group {
    
    public cubelets: Cubelet[] = [];

    constructor() {
        super();
        this.scale.set(1, 1, 1);
        for(let i = 0; i < 27; i++) {
            const cubelet = new Cubelet(i);
            this.add(cubelet);
        }

        this.matrixAutoUpdate = false;
        this.updateMatrix();
    }
}