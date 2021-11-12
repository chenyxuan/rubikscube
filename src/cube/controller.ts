import { Interaction } from "./interactor";

import CubeGroup from "./group";
import * as THREE from "three";
import World from "./world";
import { twister } from "./twister";
import { axis_planes, axis_vectors, config, cubelet_defs, cube_size, indexToLayer, worldToIndex } from "./utils";
import { Box3, Vector2, Vector3 } from "three";


export class Holder {
  vector: THREE.Vector3;
  index: number;
  axis: string;

  constructor() {
    this.vector = new THREE.Vector3();
    this.index = -1;
    this.axis = "";
  }
}

export default class Controller {
  _lock: boolean;
  _disable: boolean;

  world: World;
  dragging: boolean;
  rotating: boolean;

  axis: string;
  angle: number;
  contingle: number;

  down: Vector2;
  move: Vector2;
  down_tick: number;

  holder: Holder;
  group: CubeGroup | null;


  constructor(world: World) {
    this._lock = false;
    this._disable = false;

    this.world = world;
    this.dragging = false;
    this.rotating = false;

    this.axis = "";
    this.angle = 0;
    this.contingle = 0;

    this.down = new THREE.Vector2(0, 0);
    this.move = new THREE.Vector2(0, 0);
    this.down_tick = new Date().getTime();

    this.holder = new Holder();
    this.group = null;

    this.loop();
  }

  loop(): void {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
  }

  set lock(value: boolean) {
    this.handleUp();
    this._lock = value;
  }
  get lock(): boolean {
    return this._lock;
  }

  set disable(value: boolean) {
    this.handleUp();
    this._disable = value;
  }
  get disable(): boolean {
    return this._disable;
  }

  update(): void {
    const angle = this.contingle + this.angle;
    if (this.rotating) {
      if (this.group) {
        if (this.group.angle != angle) {
          const delta = (angle - this.group.angle) / 2;
          this.group.angle += delta;
        }
      } else {
        const groups = this.world.cube.table.groups[this.axis];
        for (const group of groups) {
          if (group.angle != angle) {
            const delta = (angle - group.angle) / 2;
            group.angle += delta;
          }
        }
      }
    }
  }

  match(): CubeGroup | null {
    const plane = axis_planes[this.holder.axis];
    const finger = this.holder.vector;
    const index = this.holder.index;
    const ilayer = indexToLayer(index);
    for (const axis of ["x", "y", "z"]) {
      const vector = axis_vectors[axis];
      if (vector.dot(plane.normal) === 0 && vector.dot(finger) === 0) {
        return this.world.cube.table.groups[axis][ilayer[axis]];
      }
    }
    return null;
  }

  intersect(point: THREE.Vector2, plane: THREE.Plane): THREE.Vector3 {
    const matrix = new THREE.Matrix4();
    const ray = new THREE.Ray();
    const result = new THREE.Vector3();

    const x = (point.x / this.world.width) * 2 - 1;
    const y = -(point.y / this.world.height) * 2 + 1;

    matrix.copy(this.world.scene.matrix);
    matrix.invert();
    ray.origin.setFromMatrixPosition(this.world.camera.matrixWorld);
    ray.direction.set(x, y, 0.5).unproject(this.world.camera).sub(ray.origin).normalize();
    ray.applyMatrix4(matrix);
    ray.intersectPlane(plane, result);

    return result;
  }

  handleDown(): void {
    if (this.disable) {
      return;
    }
    if (this.dragging || this.rotating) {
      this.handleUp();
    }
    this.dragging = true;
    this.holder.index = -1;
    let min_dist = Infinity;
    for (const axis of ["x", "y", "z"]) {
      const plane = axis_planes[axis];
      const point = this.intersect(this.down, plane);
      if (point !== null) {
        const cube_margin = cube_size / 2 + 0.001;
        const boxMin = new Vector3().setScalar(-cube_margin);
        const boxMax = new Vector3().setScalar(cube_margin);
        const box = new Box3(boxMin, boxMax);
        if (box.containsPoint(point)) {
          const origin = new Vector3().setFromMatrixPosition(this.world.camera.matrixWorld);
          const dist = point.distanceTo(origin);
          if (dist < min_dist) {
            min_dist = dist;
            this.holder.axis = axis;
            this.holder.index = worldToIndex(point);
          }
        }
      }
    }
  }

  handleMove(): void {
    if (this.disable) {
      return;
    }
    if (this.dragging) {
      const dx = this.move.x - this.down.x;
      const dy = this.move.y - this.down.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (Math.min(this.world.width, this.world.height) / d > 128) {
        return;
      }
      this.dragging = false;
      this.rotating = true;
      if (this.holder.index === -1) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.axis = "y";
        } else {
          if (this.down.x < this.world.width / 2) {
            this.axis = "x";
          } else {
            this.axis = "z";
          }
        }
        this.group = null;
        const contingle_set: Set<number> = new Set();
        for (const group of this.world.cube.table.groups[this.axis]) {
          let success = group.drag();
          while (!success) {
            twister.finish();
            success = group.drag();
          }
          contingle_set.add(group.angle);
        }
        if (contingle_set.size == 1) {
          for (const value of contingle_set.values()) {
            this.contingle = value;
            break;
          }
        } else {
          this.contingle = 0;
        }
      } else {
        const plane = axis_planes[this.holder.axis];
        const start = this.intersect(this.down, plane);
        const end = this.intersect(this.move, plane);
        const vector = new Vector3().subVectors(end, start);
        vector.max(new Vector3().sub(vector));
        const norm = Math.max(vector.x, vector.y, vector.z);
        this.holder.vector.copy(
          norm == vector.x ? new Vector3(1, 0, 0) : (
            norm == vector.y ? new Vector3(0, 1, 0) :
              new Vector3(0, 0, 1)
          ));
        this.group = this.match();
        if (!this.group) {
          this.rotating = false;
          return;
        }
        let success = this.group.drag();
        while (!success) {
          twister.finish();
          success = this.group.drag();
        }
        this.contingle = this.group.angle;
        vector.crossVectors(this.holder.vector, plane.normal);
        this.holder.vector.multiplyScalar(vector.x + vector.y + vector.z);
      }
    }
    if (this.rotating) {
      if (this.group) {
        const plane = axis_planes[this.holder.axis];
        const start = this.intersect(this.down, plane);
        const end = this.intersect(this.move, plane);
        const vector = new Vector3().subVectors(end, start);
        vector.multiply(this.holder.vector);
        this.angle =
          (vector.x + vector.y + vector.z) *
          config.sensibility;
      } else {
        const dx = this.move.x - this.down.x;
        const dy = this.move.y - this.down.y;
        this.angle = config.sensibility * (
          this.axis == "y" ? -dx :
            (
              this.axis == "x" ? -dy :
                (
                  dy
                )
            )
        )
      }
    }
  }

  handleUp(): void {
    if (this.rotating) {
      let angle = this.angle;
      if (!this.lock) {
        if (Math.abs(angle) < Math.PI / 4) {
          const speed = (Math.abs(angle) / (new Date().getTime() - this.down_tick)) * 1000;
          if (speed > 0.2) {
            angle = angle == 0 ? 0 : ((angle / Math.abs(angle)) * (Math.PI / 2));
          }
        }
        angle = angle + this.contingle;
      } else {
        angle = 0;
      }
      if (this.group) {
        this.group.twist(angle, false);
      } else {
        const groups = this.world.cube.table.groups[this.axis];
        for (const group of groups) {
          group.twist(angle, false);
        }
      }
    }
    this.group = null;
    this.holder.index = -1;
    this.dragging = false;
    this.rotating = false;
  }

  interact = (action: Interaction): boolean => {
    switch (action.type) {
      case "touchstart":
      case "mousedown":
        this.down.x = action.x;
        this.down.y = action.y;
        this.down_tick = new Date().getTime();
        this.handleDown();
        break;
      case "mousemove":
      case "touchmove":
        this.move.x = action.x;
        this.move.y = action.y;
        this.handleMove();
        break;
      case "touchend":
      case "touchcancel":
      case "mouseup":
      case "mouseout":
        this.handleUp();
        break;
      default:
        return false;
    }
    return true;
  };
}
