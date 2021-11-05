import * as THREE from "three"
import Cubelet from "./cubelet";
import { GroupTable } from "./group";

export default class Cube extends THREE.Group {
    dirty: boolean;
    locks: Map<string, Set<number>>;
    cubelets: Cubelet[] = [];
    table: GroupTable;
    order: number;
    callbacks: (() => void)[] = [];

    constructor() {
        super();
        const order = 3;
        this.order = order;

        this.scale.set(3 / order, 3 / order, 3 / order);

        for (let i = 0; i < order * order * order; i++) {
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

}
