import * as THREE from "three";
import Cubelet from "./cubelet";
import { Tween, tweener } from "./twister";
import Cube from "./cube";

export default class CubeGroup extends THREE.Group {
    public static frames = 30;
    public static readonly AXIS_VECTOR: { [key: string]: THREE.Vector3 } = {
        a: new THREE.Vector3(1, 1, 1),
        x: new THREE.Vector3(-1, 0, 0),
        y: new THREE.Vector3(0, -1, 0),
        z: new THREE.Vector3(0, 0, -1),
    };

    cube: Cube;
    cubelets: Cubelet[];
    indices: number[];
    axis: string;
    layer: number;
    private holding = false;
    private tween: Tween | undefined = undefined;

    _angle: number;
    set angle(angle) {
        this._angle = angle;
        this.setRotationFromAxisAngle(CubeGroup.AXIS_VECTOR[this.axis], this._angle);
        this.updateMatrix();
        this.cube.dirty = true;
    }

    get angle(): number {
        return this._angle;
    }

    constructor(cube: Cube, axis: string, layer: number) {
        super();
        this.cube = cube;
        this._angle = 0;
        this.cubelets = [];
        this.indices = [];
        this.matrixAutoUpdate = false;
        this.updateMatrix();
        this.axis = axis;
        this.layer = layer;

        const half = 1;
        const table: { [key: string]: string }[] = [
            {
                x: "R",
                y: "U",
                z: "F",
            },
            {
                x: "L'",
                y: "D'",
                z: "B'",
            },
            {
                x: "M'",
                y: "E'",
                z: "S",
            },
        ];
        let type = 0;
        if (this.layer === half) {
            layer = 0;
            type = 2;
        } else if (this.layer < half) {
            type = 1;
        } else {
            layer = 3 - layer - 1;
        }
        const name = table[type][this.axis];
        this.name = (layer === 0 ? "" : String(layer + 1)) + name;
    }

    cancel(): number {
        if (this.tween) {
            let angle = this.tween.end;
            tweener.cancel(this.tween);
            this.tween = undefined;
            angle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
            return angle;
        }
        return 0;
    }

    finish(): number {
        if (this.tween) {
            const angle = this.tween.end - this.angle;
            tweener.finish(this.tween);
            this.tween = undefined;
            return angle;
        }
        return 0;
    }

    private hold(): boolean {
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
        this.tween = undefined;
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
        const delta = angle - this.angle;
        if (Math.abs(this.angle - angle) < 1e-6) {
            this.drop();
        } else {
            const d = Math.abs(delta) / (Math.PI / 2);
            const duration = CubeGroup.frames * (2 - 2 / (d + 1));
            this.tween = tweener.tween(this.angle, angle, duration, (value: number) => {
                this.angle = value;
                if (Math.abs(this.angle - angle) < 1e-6) {
                    this.drop();
                    return true;
                }
                return false;
            });
        }
        return true;
    }

    rotate(cubelet: Cubelet): void {
        cubelet.rotateOnWorldAxis(CubeGroup.AXIS_VECTOR[this.axis], this.angle);
        cubelet.vector = cubelet.vector.applyAxisAngle(CubeGroup.AXIS_VECTOR[this.axis], this.angle);
        cubelet.updateMatrix();
    }
}

export class RotateAction {
    group: CubeGroup;
    twist: number;
    constructor(group: CubeGroup, twist: number) {
        this.group = group;
        this.twist = twist;
    }
}

export class GroupTable {
    private order: number;
    groups: { [key: string]: CubeGroup[] };

    constructor(cube: Cube) {
        this.order = 3;
        this.groups = {};
        for (const axis of ["x", "y", "z"]) {
            const list: CubeGroup[] = [];
            for (let layer = 0; layer < this.order; layer++) {
                const g = new CubeGroup(cube, axis, layer);
                list[layer] = g;
            }
            this.groups[axis] = list;
        }
        for (const cubelet of cube.cubelets) {
            const index = cubelet.initial;
            let axis: string;
            let layer: number;
            let group: CubeGroup;

            axis = "x";
            layer = index % this.order;
            group = this.groups[axis][layer];
            group.indices.push(cubelet.index);

            axis = "y";
            layer = Math.floor((index % (this.order * this.order)) / this.order);
            group = this.groups[axis][layer];
            group.indices.push(cubelet.index);

            axis = "z";
            layer = Math.floor(index / (this.order * this.order));
            group = this.groups[axis][layer];
            group.indices.push(cubelet.index);
        }
    }

    private static AXIS_MAP: { [key: string]: string } = {
        R: "x",
        L: "-x",
        U: "y",
        D: "-y",
        F: "z",
        B: "-z",
        M: "-x",
        E: "-y",
        S: "z",
    };

    face(face: string): CubeGroup {
        let layer = 0;
        let sign = GroupTable.AXIS_MAP[face];
        if (sign.length == 2) {
            sign = sign[1];
        } else {
            layer = this.order - 1;
        }
        return this.groups[sign][layer];
    }

}
