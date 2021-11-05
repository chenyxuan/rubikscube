import * as THREE from "three";
import Cubelet from "./cubelet";
import { Twist, twister } from "./twister";
import Cube from "./cube";
import { axis_vector, config, indexToLayer } from "./utils";

export default class CubeGroup extends THREE.Group {
    holding : boolean;
    
    cubelets: Cubelet[];
    indices: number[];

    cube: Cube;
    axis: string;
    layer: number;
    
    twisting: Twist | undefined = undefined;

    _angle: number;

    set angle(angle) {
        this._angle = angle;
        this.setRotationFromAxisAngle(axis_vector[this.axis], angle);
        this.updateMatrix();
        this.cube.dirty = true;
    }

    get angle(): number {
        return this._angle;
    }

    constructor(cube: Cube, axis: string, layer: number) {
        super();
        this._angle = 0;
        this.holding = false;

        this.cube = cube;
        this.axis = axis;
        this.layer = layer;

        this.cubelets = [];
        this.indices = [];

        for (let i = 0; i < 27; i++) {
            const ilayer = indexToLayer(i);
            if (axis == "x" && ilayer.x == layer
                || axis == "y" && ilayer.y == layer
                || axis == "z" && ilayer.z == layer) {
                this.indices.push(i);
            }
        }
        this.matrixAutoUpdate = false;
        this.updateMatrix();
    }

    cancel(): number {
        if (this.twisting) {
            let angle = this.twisting.arrival;
            twister.cancel(this.twisting);
            this.twisting = undefined;
            return Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
        }
        return 0;
    }

    finish(): number {
        if (this.twisting) {
            const angle = this.twisting.arrival - this.angle;
            twister.finish(this.twisting);
            this.twisting = undefined;
            return angle;
        }
        return 0;
    }

    hold(): boolean {
        const success = this.cube.lock(this.axis, this.layer);
        if (!success) {
            return false;
        }
        this.holding = true;
        for (const i of this.indices) {
            const cubelet = this.cube.cubelets[i];
            this.cubelets.push(cubelet);
            this.cube.remove(cubelet);
            this.add(cubelet);
        }
        this.cube.add(this);
        return true;
    }

    drag(): boolean {
        while (this.holding) {
            this.angle = -this.finish();
        }
        return this.hold();
    }

    drop(): void {
        this.holding = false;
        this.twisting = undefined;
        while (true) {
            const cubelet = this.cubelets.pop();
            if (undefined === cubelet) {
                break;
            }
            this.rotate(cubelet);
            this.remove(cubelet);
            this.cube.add(cubelet);
            this.cube.cubelets[cubelet.index] = cubelet;
        }
        this.cube.remove(this);
        this.cube.dirty = true;
        this.angle = 0;
        this.cube.unlock(this.axis, this.layer);
        this.cube.callback();
    }

    twist(angle: number, fast: boolean): boolean {
        if (this.holding) {
            angle = angle + this.cancel();
        } else {
            const success = this.hold();
            if (!success) {
                return false;
            }
            this.angle = 0;
        }

        angle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
        if (fast) {
            this.angle = angle;
        }
        if (Math.abs(this.angle - angle) < 1e-6) {
            this.drop();
        } else {
            const d = Math.abs(angle - this.angle) / (Math.PI / 2);
            const duration = config.frames * (2 - 2 / (d + 1));
            this.twisting = new Twist(this.angle, angle, duration, (value: number) => {
                this.angle = value;
                if (Math.abs(this.angle - angle) < 1e-6) {
                    this.drop();
                    return true;
                }
                return false;
            });
            twister.twists.push(this.twisting);
        }
        return true;
    }

    rotate(cubelet: Cubelet): void {
        cubelet.rotateOnWorldAxis(axis_vector[this.axis], this.angle);
        cubelet.vector = cubelet.vector.applyAxisAngle(axis_vector[this.axis], this.angle);
        cubelet.updateMatrix();
    }
}


export class GroupTable {
    groups: { [key: string]: CubeGroup[] };

    constructor(cube: Cube) {
        this.groups = {};
        for (const axis of ["x", "y", "z"]) {
            const list: CubeGroup[] = [];
            for (let i = 0; i < 3; i++) {
                list.push(new CubeGroup(cube, axis, i));
            }
            this.groups[axis] = list;
        }
    }

}
