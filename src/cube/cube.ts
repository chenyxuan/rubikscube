import * as THREE from "three"
import Cubelet from "./cubelet";
import { GroupTable } from "./group";
import { twister } from "./twister";
import { config } from "./utils";

export default class Cube extends THREE.Group {
    dirty: boolean;
    locks: Map<string, Set<number>>;
    cubelets: Cubelet[] = [];
    table: GroupTable;
    callbacks: (() => void)[] = [];

    constructor() {
        super();

        for (let i = 0; i < 27; i++) {
            const cubelet = new Cubelet(i);
            this.cubelets.push(cubelet);
            this.add(cubelet);
        }

        this.locks = new Map();
        this.locks.set("x", new Set());
        this.locks.set("y", new Set());
        this.locks.set("z", new Set());
        this.locks.set("a", new Set());

        this.table = new GroupTable(this);

        this.matrixAutoUpdate = false;
        this.updateMatrix();

        this.dirty = true;
    }

    callback(): void {
        for (const lock of this.locks.values()) {
            if (lock.size > 0) {
                return;
            }
        }
        for (const callback of this.callbacks) {
            callback();
        }
    }

    lock(axis: string, layer: number): boolean {
        if (this.locks.get("a")?.has(1)) {
            return false;
        }
        const axis_lockset = this.locks.get(axis);
        if (axis_lockset === undefined) {
            return false;
        }
        for (const lockset of this.locks.values()) {
            if (lockset != axis_lockset && lockset.size > 0) {
                return false;
            }
        }
        axis_lockset.add(layer);
        return true;
    }

    unlock(axis: string, layer: number): void {
        const axis_lockset = this.locks.get(axis);
        axis_lockset?.delete(layer);
    }

    random3(): number {
        return Math.min(Math.max(Math.floor(Math.random() * 3), 0), 2);
    }

    scramble(): void {
        for (let i = 0; i < config.scramble_steps; i++) {
            const axis = ["x", "y", "z"][this.random3()];
            const level = this.random3();
            const angle = (this.random3() - 1) * (Math.PI / 2);

            this.table.groups[axis][level].twist(angle === 0 ? Math.PI : angle, true);
        }

    }

    reset(): void {
        twister.finish();
        
        for (const cubelet of this.cubelets) {
            this.remove(cubelet);
        }
        this.cubelets.splice(0);

        for (let i = 0; i < 27; i++) {
            const cubelet = new Cubelet(i);
            this.cubelets.push(cubelet);
            this.add(cubelet);
        }
        this.table = new GroupTable(this);
        this.dirty = true;

        this.callback();
    }
}
