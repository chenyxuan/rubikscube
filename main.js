/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <viewport ref=\"viewport\"></viewport>\n</v-app>\n"

/***/ }),

/***/ "./src/cube/controller.ts":
/*!********************************!*\
  !*** ./src/cube/controller.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Holder": () => (/* binding */ Holder),
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");





class Holder {
    constructor() {
        this.vector = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3();
    }
}
class Controller {
    constructor(world) {
        this.sensitivity = 0.5;
        this.rotating = false;
        this.angle = 0;
        this.contingle = 0;
        this.ray = new three__WEBPACK_IMPORTED_MODULE_4__.Ray();
        this.down = new three__WEBPACK_IMPORTED_MODULE_4__.Vector2(0, 0);
        this.move = new three__WEBPACK_IMPORTED_MODULE_4__.Vector2(0, 0);
        this.matrix = new three__WEBPACK_IMPORTED_MODULE_4__.Matrix4();
        this.holder = new Holder();
        this.vector = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3();
        this.planes = [
            new three__WEBPACK_IMPORTED_MODULE_4__.Plane(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, 0), (-_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Plane(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 1, 0), (-_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Plane(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 1), (-_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Plane(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0, 0), (-_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Plane(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -1, 0), (-_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2),
        ];
        this._lock = false;
        this._disable = false;
        this.interact = (action) => {
            switch (action.type) {
                case "touchstart":
                case "mousedown":
                    this.down.x = action.x;
                    this.down.y = action.y;
                    this.tick = new Date().getTime();
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
        this.tick = new Date().getTime();
        this.dragging = false;
        this.world = world;
        this.loop();
    }
    get lock() {
        return this._lock;
    }
    set lock(value) {
        this.handleUp();
        this._lock = value;
    }
    get disable() {
        return this._disable;
    }
    set disable(value) {
        this.handleUp();
        this._disable = value;
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
    }
    update() {
        const angle = this.contingle + this.angle;
        if (this.rotating) {
            if (this.group) {
                if (this.group.angle != angle) {
                    const delta = (angle - this.group.angle) / 2;
                    this.group.angle += delta;
                }
            }
            else {
                const groups = this.world.cube.table.groups[this.axis[0]];
                for (const group of groups) {
                    if (group.angle != angle) {
                        const delta = (angle - group.angle) / 2;
                        group.angle += delta;
                    }
                }
            }
        }
    }
    match() {
        const plane = this.holder.plane.normal;
        const finger = this.holder.vector;
        const index = this.holder.index;
        const order = 3;
        for (const axis of ["x", "y", "z"]) {
            const vector = _group__WEBPACK_IMPORTED_MODULE_0__["default"].AXIS_VECTOR[axis];
            if (vector.dot(plane) === 0 && vector.dot(finger) === 0) {
                let layer = 0;
                switch (axis) {
                    case "x":
                        layer = index % order;
                        break;
                    case "y":
                        layer = Math.floor((index % (order * order)) / order);
                        break;
                    case "z":
                        layer = Math.floor(index / (order * order));
                        break;
                }
                return this.world.cube.table.groups[axis][layer];
            }
        }
        return null;
    }
    intersect(point, plane) {
        const x = (point.x / this.world.width) * 2 - 1;
        const y = -(point.y / this.world.height) * 2 + 1;
        this.ray.origin.setFromMatrixPosition(this.world.camera.matrixWorld);
        this.ray.direction.set(x, y, 0.5).unproject(this.world.camera).sub(this.ray.origin).normalize();
        this.matrix.copy(this.world.scene.matrix);
        this.matrix.invert();
        this.ray.applyMatrix4(this.matrix);
        const result = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(Infinity, Infinity, Infinity);
        this.ray.intersectPlane(plane, result);
        return result;
    }
    handleDown() {
        if (this.disable) {
            return;
        }
        if (this.dragging || this.rotating) {
            this.handleUp();
        }
        this.dragging = true;
        this.holder.index = -1;
        let distance = 0;
        this.planes.forEach((plane) => {
            const point = this.intersect(this.down, plane);
            if (point !== null) {
                let x = point.x / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size / 3;
                let y = point.y / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size / 3;
                let z = point.z / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size / 3;
                if (Math.abs(x) <= 0.5001 && Math.abs(y) <= 0.5001 && Math.abs(z) <= 0.5001) {
                    const d = Math.pow(point.x - this.ray.origin.x, 2) +
                        Math.pow(point.y - this.ray.origin.y, 2) +
                        Math.pow(point.z - this.ray.origin.z, 2);
                    if (distance == 0 || d < distance) {
                        this.holder.plane = plane;
                        const order = 3;
                        x = Math.max(0, Math.min(order - 1, Math.floor((x + 0.5) * order)));
                        y = Math.max(0, Math.min(order - 1, Math.floor((y + 0.5) * order)));
                        z = Math.max(0, Math.min(order - 1, Math.floor((z + 0.5) * order)));
                        this.holder.index = z * order * order + y * order + x;
                        distance = d;
                    }
                }
            }
        }, this);
    }
    handleMove() {
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
                if (dx * dx > dy * dy) {
                    this.axis = "y";
                }
                else {
                    const half = this.world.width / 2;
                    const lf = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2, 0, (_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2);
                    lf.applyMatrix4(this.world.scene.matrix).project(this.world.camera);
                    const lx = Math.round(lf.x * half + half);
                    const rf = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2, 0, (_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size * 3) / 2);
                    rf.applyMatrix4(this.world.scene.matrix).project(this.world.camera);
                    const rx = Math.round(rf.x * half + half);
                    if (lf.z < rf.z) {
                        if (this.down.x < lx) {
                            this.axis = "z'";
                        }
                        else {
                            this.axis = "x";
                        }
                    }
                    else {
                        if (this.down.x < rx) {
                            this.axis = "x";
                        }
                        else {
                            this.axis = "z";
                        }
                    }
                }
                this.group = null;
                const contingle = new Set();
                for (const group of this.world.cube.table.groups[this.axis[0]]) {
                    let success = group.drag();
                    while (!success) {
                        _twister__WEBPACK_IMPORTED_MODULE_1__.tweener.finish();
                        success = group.drag();
                    }
                    contingle.add(group.angle);
                }
                if (contingle.size == 1) {
                    for (const value of contingle.values()) {
                        this.contingle = value;
                        break;
                    }
                }
                else {
                    this.contingle = 0;
                }
            }
            else {
                const start = this.intersect(this.down, this.holder.plane);
                const end = this.intersect(this.move, this.holder.plane);
                this.vector.subVectors(end, start);
                let x = this.vector.x;
                let y = this.vector.y;
                let z = this.vector.z;
                const max = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
                x = Math.abs(x) === max ? x : 0;
                y = Math.abs(y) === max ? y : 0;
                z = Math.abs(z) === max ? z : 0;
                this.vector.set(x, y, z);
                this.holder.vector.copy(this.vector.multiply(this.vector).normalize());
                this.group = this.match();
                if (!this.group) {
                    this.rotating = false;
                    return;
                }
                let success = this.group.drag();
                while (!success) {
                    _twister__WEBPACK_IMPORTED_MODULE_1__.tweener.finish();
                    success = this.group.drag();
                }
                this.contingle = this.group.angle;
                this.vector.crossVectors(this.holder.vector, this.holder.plane.normal);
                this.holder.vector.multiplyScalar(this.vector.x + this.vector.y + this.vector.z);
            }
        }
        if (this.rotating) {
            if (this.group) {
                const start = this.intersect(this.down, this.holder.plane);
                const end = this.intersect(this.move, this.holder.plane);
                this.vector.subVectors(end, start).multiply(this.holder.vector);
                const vector = _group__WEBPACK_IMPORTED_MODULE_0__["default"].AXIS_VECTOR[this.group.axis];
                this.angle =
                    ((-(this.vector.x + this.vector.y + this.vector.z) * (vector.x + vector.y + vector.z)) / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size) *
                        Math.PI *
                        this.sensitivity;
            }
            else {
                const dx = this.move.x - this.down.x;
                const dy = this.move.y - this.down.y;
                switch (this.axis) {
                    case "y":
                        this.angle = (-dx / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size) * Math.PI * this.sensitivity;
                        break;
                    case "x":
                        this.angle = (-dy / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size) * Math.PI * this.sensitivity;
                        break;
                    case "z":
                        this.angle = (dy / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size) * Math.PI * this.sensitivity;
                        break;
                    case "z'":
                        this.angle = (-dy / _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_defs.size) * Math.PI * this.sensitivity;
                        break;
                    default:
                        this.angle = 0;
                        break;
                }
            }
        }
    }
    handleUp() {
        if (this.dragging) {
            let face = null;
            switch (this.holder.plane) {
                case this.planes[0]:
                    face = _utils_internal__WEBPACK_IMPORTED_MODULE_2__.Face.R;
                    break;
                case this.planes[1]:
                    face = _utils_internal__WEBPACK_IMPORTED_MODULE_2__.Face.U;
                    break;
                case this.planes[2]:
                    face = _utils_internal__WEBPACK_IMPORTED_MODULE_2__.Face.F;
                    break;
            }
        }
        if (this.rotating) {
            let angle = this.angle;
            if (!this.lock) {
                if (Math.abs(angle) < Math.PI / 4) {
                    const tick = new Date().getTime();
                    const speed = (Math.abs(angle) / (tick - this.tick)) * 1000;
                    if (speed > 0.2) {
                        angle = angle == 0 ? 0 : ((angle / Math.abs(angle)) * Math.PI) / 2;
                    }
                }
                angle = angle + this.contingle;
            }
            else {
                angle = 0;
            }
            if (this.group) {
                this.group.twist(angle, false);
                if (angle != 0) {
                    let times = Math.round(angle / (Math.PI / 2));
                    const reverse = times < 0;
                    times = Math.abs(times);
                }
            }
            else {
                const groups = this.world.cube.table.groups[this.axis[0]];
                for (const group of groups) {
                    group.twist(angle, false);
                }
                if (angle != 0) {
                    let times = Math.round(angle / (Math.PI / 2));
                    const reverse = times < 0;
                    times = Math.abs(times);
                }
            }
        }
        this.group = null;
        this.holder.index = -1;
        this.dragging = false;
        this.rotating = false;
    }
}


/***/ }),

/***/ "./src/cube/cube.ts":
/*!**************************!*\
  !*** ./src/cube/cube.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cube)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cubelet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubelet */ "./src/cube/cubelet.ts");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");



class Cube extends three__WEBPACK_IMPORTED_MODULE_2__.Group {
    constructor() {
        super();
        this.cubelets = [];
        this.callbacks = [];
        for (let i = 0; i < 27; i++) {
            const cubelet = new _cubelet__WEBPACK_IMPORTED_MODULE_0__["default"](i);
            this.cubelets.push(cubelet);
            this.add(cubelet);
        }
        this.locks = new Map();
        this.locks.set("x", new Set());
        this.locks.set("y", new Set());
        this.locks.set("z", new Set());
        this.locks.set("a", new Set());
        this.table = new _group__WEBPACK_IMPORTED_MODULE_1__.GroupTable(this);
        this.matrixAutoUpdate = false;
        this.updateMatrix();
        this.dirty = true;
    }
    callback() {
        for (const lock of this.locks.values()) {
            if (lock.size > 0) {
                return;
            }
        }
        for (const callback of this.callbacks) {
            callback();
        }
    }
    lock(axis, layer) {
        var _a;
        if ((_a = this.locks.get("a")) === null || _a === void 0 ? void 0 : _a.has(1)) {
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
    unlock(axis, layer) {
        const axis_lockset = this.locks.get(axis);
        axis_lockset === null || axis_lockset === void 0 ? void 0 : axis_lockset.delete(layer);
    }
}


/***/ }),

/***/ "./src/cube/cubelet.ts":
/*!*****************************!*\
  !*** ./src/cube/cubelet.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cubelet)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");



class Cubelet extends three__WEBPACK_IMPORTED_MODULE_1__.Group {
    constructor(index) {
        super();
        this._vector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();
        this.initial = index;
        this.index = index;
        const drctn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.indexToDirection)(index);
        this.vector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(drctn.x, drctn.y, drctn.z);
        this.frame = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_frame, _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_core);
        this.add(this.frame);
        this.lamberts = new Array(6);
        this.stickers = new Array(6);
        for (let i = 0; i < 6; i++) {
            const face_attr = _utils__WEBPACK_IMPORTED_MODULE_0__.face_attrs[i];
            if (face_attr.match(this.vector)) {
                this.lamberts[i] = face_attr.lambert;
                const sticker = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_sticker, this.lamberts[i]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                this.stickers[i] = sticker;
                this.add(sticker);
            }
        }
        this.matrixAutoUpdate = false;
        this.updateMatrix();
    }
    set vector(vector) {
        const half = 1;
        let x = vector.x;
        let y = vector.y;
        let z = vector.z;
        this._vector.set(x, y, z);
        x = Math.round(x + half);
        y = Math.round(y + half);
        z = Math.round(z + half);
        this.index = z * 9 + y * 3 + x;
        this.position.x = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.x;
        this.position.y = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.y;
        this.position.z = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.z;
    }
    get vector() {
        return this._vector;
    }
}


/***/ }),

/***/ "./src/cube/group.ts":
/*!***************************!*\
  !*** ./src/cube/group.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CubeGroup),
/* harmony export */   "RotateAction": () => (/* binding */ RotateAction),
/* harmony export */   "GroupTable": () => (/* binding */ GroupTable)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");


class CubeGroup extends three__WEBPACK_IMPORTED_MODULE_1__.Group {
    constructor(cube, axis, layer) {
        super();
        this.holding = false;
        this.tween = undefined;
        this.cube = cube;
        this._angle = 0;
        this.cubelets = [];
        this.indices = [];
        this.matrixAutoUpdate = false;
        this.updateMatrix();
        this.axis = axis;
        this.layer = layer;
        const half = 1;
        const table = [
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
        }
        else if (this.layer < half) {
            type = 1;
        }
        else {
            layer = 3 - layer - 1;
        }
        const name = table[type][this.axis];
        this.name = (layer === 0 ? "" : String(layer + 1)) + name;
    }
    set angle(angle) {
        this._angle = angle;
        this.setRotationFromAxisAngle(CubeGroup.AXIS_VECTOR[this.axis], this._angle);
        this.updateMatrix();
        this.cube.dirty = true;
    }
    get angle() {
        return this._angle;
    }
    cancel() {
        if (this.tween) {
            let angle = this.tween.end;
            _twister__WEBPACK_IMPORTED_MODULE_0__.tweener.cancel(this.tween);
            this.tween = undefined;
            angle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
            return angle;
        }
        return 0;
    }
    finish() {
        if (this.tween) {
            const angle = this.tween.end - this.angle;
            _twister__WEBPACK_IMPORTED_MODULE_0__.tweener.finish(this.tween);
            this.tween = undefined;
            return angle;
        }
        return 0;
    }
    hold() {
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
    drag() {
        while (this.holding) {
            this.angle = -this.finish();
        }
        return this.hold();
    }
    drop() {
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
    twist(angle, fast) {
        if (this.holding) {
            angle = angle + this.cancel();
        }
        else {
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
        }
        else {
            const d = Math.abs(delta) / (Math.PI / 2);
            const duration = CubeGroup.frames * (2 - 2 / (d + 1));
            this.tween = _twister__WEBPACK_IMPORTED_MODULE_0__.tweener.tween(this.angle, angle, duration, (value) => {
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
    rotate(cubelet) {
        cubelet.rotateOnWorldAxis(CubeGroup.AXIS_VECTOR[this.axis], this.angle);
        cubelet.vector = cubelet.vector.applyAxisAngle(CubeGroup.AXIS_VECTOR[this.axis], this.angle);
        cubelet.updateMatrix();
    }
}
CubeGroup.frames = 30;
CubeGroup.AXIS_VECTOR = {
    a: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1),
    x: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 0),
    y: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
    z: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -1),
};
class RotateAction {
    constructor(group, twist) {
        this.group = group;
        this.twist = twist;
    }
}
class GroupTable {
    constructor(cube) {
        this.order = 3;
        this.groups = {};
        for (const axis of ["x", "y", "z"]) {
            const list = [];
            for (let layer = 0; layer < this.order; layer++) {
                const g = new CubeGroup(cube, axis, layer);
                list[layer] = g;
            }
            this.groups[axis] = list;
        }
        for (const cubelet of cube.cubelets) {
            const index = cubelet.initial;
            let axis;
            let layer;
            let group;
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
    face(face) {
        let layer = 0;
        let sign = GroupTable.AXIS_MAP[face];
        if (sign.length == 2) {
            sign = sign[1];
        }
        else {
            layer = this.order - 1;
        }
        return this.groups[sign][layer];
    }
}
GroupTable.AXIS_MAP = {
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


/***/ }),

/***/ "./src/cube/interactor.ts":
/*!********************************!*\
  !*** ./src/cube/interactor.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Interaction": () => (/* binding */ Interaction),
/* harmony export */   "default": () => (/* binding */ Interactor)
/* harmony export */ });
class Interaction {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }
}
class Interactor {
    constructor(dom, callback) {
        this.touch = (event) => {
            var _a;
            const first = event.changedTouches[0];
            if (event.type === "touchstart") {
                this.target = event.target;
                if (this.last) {
                    const action = new Interaction("touchend", this.last.clientX - this.dom.getBoundingClientRect().left, this.last.clientY - this.dom.getBoundingClientRect().top);
                    this.callback(action);
                }
                this.last = first;
            }
            if (this.target !== this.dom || ((_a = this.last) === null || _a === void 0 ? void 0 : _a.identifier) != first.identifier) {
                return false;
            }
            this.dom.tabIndex = 1;
            this.dom.focus();
            const action = new Interaction(event.type, first.clientX - this.dom.getBoundingClientRect().left, first.clientY - this.dom.getBoundingClientRect().top);
            this.callback(action);
            event.preventDefault();
            if (event.type === "touchend" || event.type === "touchcancel") {
                this.target = null;
            }
            return true;
        };
        this.mouse = (event) => {
            if (event.type === "mousedown") {
                this.target = event.target;
            }
            if (this.target !== this.dom) {
                return true;
            }
            this.dom.tabIndex = 1;
            this.dom.focus();
            const action = new Interaction(event.type, event.clientX, event.clientY);
            this.callback(action);
            if (event.type === "mouseup") {
                this.target = null;
            }
            return false;
        };
        this.dom = dom;
        this.callback = callback;
        document.addEventListener("touchstart", this.touch);
        document.addEventListener("touchmove", this.touch);
        document.addEventListener("touchend", this.touch);
        document.addEventListener("touchcancel", this.touch);
        document.addEventListener("mousedown", this.mouse);
        document.addEventListener("mousemove", this.mouse);
        document.addEventListener("mouseup", this.mouse);
        document.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });
    }
}


/***/ }),

/***/ "./src/cube/twister.ts":
/*!*****************************!*\
  !*** ./src/cube/twister.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tween": () => (/* binding */ Tween),
/* harmony export */   "Tweener": () => (/* binding */ Tweener),
/* harmony export */   "tweener": () => (/* binding */ tweener)
/* harmony export */ });
class Tween {
    constructor(begin, end, duration, callback) {
        this.begin = begin;
        this.end = end;
        this.duration = duration;
        this.callback = callback;
        this.value = 0;
    }
    finish() {
        this.callback(this.end);
    }
    update() {
        this.value++;
        let elapsed = this.value / this.duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = elapsed < 0 ? 0 : elapsed;
        elapsed = elapsed - 1;
        elapsed = 1 - elapsed * elapsed;
        const value = elapsed == 1 ? this.end : this.begin + (this.end - this.begin) * elapsed;
        return this.callback(value);
    }
}
class Tweener {
    constructor() {
        this.tweens = [];
        this.loop();
    }
    get length() {
        return this.tweens.length;
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
    }
    tween(begin, end, duration, update) {
        const tween = new Tween(begin, end, duration, update);
        this.tweens.push(tween);
        return tween;
    }
    update() {
        if (this.tweens.length === 0)
            return false;
        let i = 0;
        let len = this.tweens.length;
        while (i < len) {
            if (this.tweens[i].update()) {
                this.tweens.splice(i, 1);
                len--;
            }
            else {
                i++;
            }
        }
        return true;
    }
    finish(tween = undefined) {
        if (tween) {
            for (let i = 0; i < this.tweens.length; i++) {
                if (this.tweens[i] == tween) {
                    tween.finish();
                    this.tweens.splice(i, 1);
                    return;
                }
            }
        }
        else {
            const tweens = this.tweens.splice(0, this.tweens.length);
            for (const tween of tweens) {
                tween.finish();
            }
        }
    }
    cancel(tween) {
        for (let i = 0; i < this.tweens.length; i++) {
            if (this.tweens[i] == tween) {
                this.tweens.splice(i, 1);
                return;
            }
        }
    }
}
const tweener = new Tweener();


/***/ }),

/***/ "./src/cube/utils.ts":
/*!***************************!*\
  !*** ./src/cube/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cubelet_colors": () => (/* binding */ cubelet_colors),
/* harmony export */   "cubelet_defs": () => (/* binding */ cubelet_defs),
/* harmony export */   "cubelet_frame": () => (/* binding */ cubelet_frame),
/* harmony export */   "cubelet_lambers": () => (/* binding */ cubelet_lambers),
/* harmony export */   "cubelet_core": () => (/* binding */ cubelet_core),
/* harmony export */   "cubelet_sticker": () => (/* binding */ cubelet_sticker),
/* harmony export */   "indexToDirection": () => (/* binding */ indexToDirection),
/* harmony export */   "face_attrs": () => (/* binding */ face_attrs)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");



const cubelet_colors = {
    R: "#B71C1C",
    L: "#FF6D00",
    U: "#F0F0F0",
    D: "#FFD600",
    F: "#00A020",
    B: "#0D47A1",
    core: "#202020",
    gray: "#808080",
    high: "#FF0080",
};
const cubelet_defs = {
    size: 64,
    order: 3,
    _border_width: 3,
    _edge_width: 2,
    _sticker_depth: 0.1,
};
const cubelet_frame = new _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Frame(cubelet_defs.size, cubelet_defs._border_width);
const cubelet_lambers = (() => {
    const result = {};
    for (const key in cubelet_colors) {
        result[key] = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: cubelet_colors[key] });
    }
    return result;
})();
const cubelet_core = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({
    color: cubelet_colors.core,
    specular: cubelet_colors.gray,
    shininess: 2,
});
const cubelet_sticker = new _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Sticker(cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._edge_width, cubelet_defs._sticker_depth);
const indexToDirection = (index) => {
    return { x: index % 3 - 1, y: Math.floor(index / 3) % 3 - 1, z: Math.floor(index / 9) - 1 };
};
const face_attrs = [
    {
        match: (vector) => { return vector.x == -1; },
        lambert: cubelet_lambers.L,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-cubelet_defs.size / 2, 0, 0),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -Math.PI / 2, 0),
    },
    {
        match: (vector) => { return vector.x == 1; },
        lambert: cubelet_lambers.R,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(cubelet_defs.size / 2, 0, 0),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, Math.PI / 2, 0),
    },
    {
        match: (vector) => { return vector.y == -1; },
        lambert: cubelet_lambers.D,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -cubelet_defs.size / 2, 0),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.PI / 2, 0, 0),
    },
    {
        match: (vector) => { return vector.y == 1; },
        lambert: cubelet_lambers.U,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, cubelet_defs.size / 2, 0),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-Math.PI / 2, 0, 0),
    },
    {
        match: (vector) => { return vector.z == -1; },
        lambert: cubelet_lambers.B,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -cubelet_defs.size / 2),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.PI, 0, 0),
    },
    {
        match: (vector) => { return vector.z == 1; },
        lambert: cubelet_lambers.F,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, cubelet_defs.size / 2),
        rotation: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(2 * Math.PI, 0, 0),
    },
];


/***/ }),

/***/ "./src/cube/utils_internal.ts":
/*!************************************!*\
  !*** ./src/cube/utils_internal.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Face": () => (/* binding */ Face),
/* harmony export */   "Frame": () => (/* binding */ Frame),
/* harmony export */   "Sticker": () => (/* binding */ Sticker)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var Face;
(function (Face) {
    Face[Face["L"] = 0] = "L";
    Face[Face["R"] = 1] = "R";
    Face[Face["D"] = 2] = "D";
    Face[Face["U"] = 3] = "U";
    Face[Face["B"] = 4] = "B";
    Face[Face["F"] = 5] = "F";
})(Face || (Face = {}));
class Frame extends three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry {
    constructor(size, border) {
        super();
        const o = size / 2;
        const i = o - border;
        const _verts = [
            -i, +i, +o,
            +i, +i, +o,
            +i, -i, +o,
            -i, -i, +o,
            -i, +o, -i,
            +i, +o, -i,
            +i, +o, +i,
            -i, +o, +i,
            -o, -i, -i,
            -o, +i, -i,
            -o, +i, +i,
            -o, -i, +i,
            +i, +i, -o,
            -i, +i, -o,
            -i, -i, -o,
            +i, -i, -o,
            -i, -o, +i,
            +i, -o, +i,
            +i, -o, -i,
            -i, -o, -i,
            +o, +i, +i,
            +o, +i, -i,
            +o, -i, -i,
            +o, -i, +i,
        ];
        this.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(_verts, 3));
        this.setIndex(Frame._indices);
        this.computeVertexNormals();
    }
}
Frame._indices = [
    0, 2, 1,
    0, 3, 2,
    4, 6, 5,
    4, 7, 6,
    8, 10, 9,
    8, 11, 10,
    12, 14, 13,
    12, 15, 14,
    16, 18, 17,
    16, 19, 18,
    20, 22, 21,
    20, 23, 22,
    1, 6, 7,
    0, 1, 7,
    3, 0, 10,
    11, 3, 10,
    17, 2, 3,
    16, 17, 3,
    23, 20, 1,
    2, 23, 1,
    5, 12, 13,
    4, 5, 13,
    9, 13, 14,
    8, 9, 14,
    22, 15, 12,
    21, 22, 12,
    19, 14, 15,
    18, 19, 15,
    7, 4, 9,
    10, 7, 9,
    11, 8, 19,
    16, 11, 19,
    23, 17, 18,
    22, 23, 18,
    20, 21, 5,
    6, 20, 5,
    20, 6, 1,
    10, 0, 7,
    21, 12, 5,
    13, 9, 4,
    23, 2, 17,
    11, 16, 3,
    22, 18, 15,
    8, 14, 19,
];
class Sticker extends three__WEBPACK_IMPORTED_MODULE_0__.ExtrudeGeometry {
    constructor(size, depth) {
        size = size / 2;
        const left = -size;
        const bottom = size;
        const top = -size;
        const right = size;
        const radius = size / 4;
        const shape = new three__WEBPACK_IMPORTED_MODULE_0__.Shape();
        shape.moveTo(left, top + radius);
        shape.lineTo(left, bottom - radius);
        shape.quadraticCurveTo(left, bottom, left + radius, bottom);
        shape.lineTo(right - radius, bottom);
        shape.quadraticCurveTo(right, bottom, right, bottom - radius);
        shape.lineTo(right, top + radius);
        shape.quadraticCurveTo(right, top, right - radius, top);
        shape.lineTo(left + radius, top);
        shape.quadraticCurveTo(left, top, left, top + radius);
        shape.closePath();
        super(shape, { bevelEnabled: false, depth: depth });
    }
}


/***/ }),

/***/ "./src/cube/viewport.ts":
/*!******************************!*\
  !*** ./src/cube/viewport.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _interactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interactor */ "./src/cube/interactor.ts");
/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./world */ "./src/cube/world.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let Viewport = class Viewport extends vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super();
        const canvasElem = document.createElement("canvas");
        canvasElem.style.outline = "none";
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer({
            canvas: canvasElem,
            antialias: true,
            alpha: true
        });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.interactor = new _interactor__WEBPACK_IMPORTED_MODULE_1__["default"](canvasElem, this.world.controller.interact);
    }
    resize(width, height) {
        this.world.resize(width, height);
        this.renderer.setSize(width, height, true);
    }
    mounted() {
        this.canvas.appendChild(this.renderer.domElement);
    }
    draw() {
        if (this.world.dirty) {
            this.renderer.render(this.world.scene, this.world.camera);
        }
    }
};
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Inject)("world"),
    __metadata("design:type", _world__WEBPACK_IMPORTED_MODULE_2__["default"])
], Viewport.prototype, "world", void 0);
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("canvas"),
    __metadata("design:type", HTMLElement)
], Viewport.prototype, "canvas", void 0);
Viewport = __decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: '<div ref="canvas"></div>',
        components: {},
    }),
    __metadata("design:paramtypes", [])
], Viewport);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewport);


/***/ }),

/***/ "./src/cube/world.ts":
/*!***************************!*\
  !*** ./src/cube/world.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ World)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/cube/controller.ts");
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cube */ "./src/cube/cube.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");




class World {
    constructor() {
        this.callbacks = [];
        this.callback = () => {
            for (const callback of this.callbacks) {
                callback();
            }
        };
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        this.scene.matrixAutoUpdate = false;
        this.scene.rotation.x = Math.PI / 6;
        this.scene.rotation.y = -Math.PI / 4 + Math.PI / 16;
        this.ambient = new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0xffffff, 1);
        this.directional = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 0);
        this.directional.position.set(_utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size, _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 3, _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 2);
        this.scene.add(this.ambient);
        this.scene.add(this.directional);
        this.scene.updateMatrix();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(50, 1, 1, _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 32);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 0;
        this.controller = new _controller__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.cube = new _cube__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.scene.add(this.cube);
        this.dirty = true;
        this.scale = 1;
        this.perspective = 9;
    }
    set dirty(value) {
        this.cube.dirty = value;
    }
    get dirty() {
        return this.cube.dirty;
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.updateCamera();
    }
    updateCamera() {
        const min = this.height / Math.min(this.width, this.height) / this.scale / this.perspective;
        const fov = (2 * Math.atan(min) * 180) / Math.PI;
        const distance = _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 3 * this.perspective;
        this.camera.aspect = this.width / this.height;
        this.camera.fov = fov;
        this.camera.position.z = distance;
        this.camera.near = distance - _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 3;
        this.camera.far = distance + _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 8;
        this.camera.lookAt(this.scene.position);
        this.camera.updateProjectionMatrix();
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify */ "./node_modules/vuetify/dist/vuetify.js");
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vuetify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_dist_vuetify_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuetify/dist/vuetify.min.css */ "./node_modules/vuetify/dist/vuetify.min.css");
/* harmony import */ var material_design_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! material-design-icons/iconfont/material-icons.css */ "./node_modules/material-design-icons/iconfont/material-icons.css");
/* harmony import */ var _vueapp_playground__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vueapp/playground */ "./src/vueapp/playground/index.ts");





vue__WEBPACK_IMPORTED_MODULE_3__["default"].use((vuetify__WEBPACK_IMPORTED_MODULE_4___default()));
const opts = {};
const vuetify = new (vuetify__WEBPACK_IMPORTED_MODULE_4___default())(opts);
vue__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.vuetify = vuetify;
let app = _vueapp_playground__WEBPACK_IMPORTED_MODULE_2__["default"];
const vm = new vue__WEBPACK_IMPORTED_MODULE_3__["default"]({
    vuetify,
    el: "#app",
    render: (h) => h(app),
});


/***/ }),

/***/ "./src/vueapp/playground/index.ts":
/*!****************************************!*\
  !*** ./src/vueapp/playground/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _cube_viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/viewport */ "./src/cube/viewport.ts");
/* harmony import */ var _cube_world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cube/world */ "./src/cube/world.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let Playground = class Playground extends vue__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super();
        this.world = new _cube_world__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    mounted() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.viewport.resize(this.width, this.calcuViewportHeight(this.width, this.height));
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
    }
    calcuViewportHeight(width, height) {
        return height - Math.ceil(Math.min(width / 6, height / 12)) * 1.5;
    }
};
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Provide)("world"),
    __metadata("design:type", Object)
], Playground.prototype, "world", void 0);
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("viewport"),
    __metadata("design:type", _cube_viewport__WEBPACK_IMPORTED_MODULE_1__["default"])
], Playground.prototype, "viewport", void 0);
Playground = __decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/playground/index.html"),
        components: {
            viewport: _cube_viewport__WEBPACK_IMPORTED_MODULE_1__["default"]
        },
    }),
    __metadata("design:paramtypes", [])
], Playground);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playground);


/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC":
/*!******************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC ***!
  \******************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkrubikscube"] = self["webpackChunkrubikscube"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZS50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZWxldC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2ludGVyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdmlld3BvcnQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3dvcmxkLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvcGxheWdyb3VuZC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjx2LWFwcD5cXG4gICAgPHZpZXdwb3J0IHJlZj1cXFwidmlld3BvcnRcXFwiPjwvdmlld3BvcnQ+XFxuPC92LWFwcD5cXG5cIiIsImltcG9ydCBDdWJlR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgdHdlZW5lciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IEZhY2UgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuaW1wb3J0IHsgY3ViZWxldF9kZWZzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBIb2xkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3Iod29ybGQpIHtcbiAgICAgICAgdGhpcy5zZW5zaXRpdml0eSA9IDAuNTtcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jb250aW5nbGUgPSAwO1xuICAgICAgICB0aGlzLnJheSA9IG5ldyBUSFJFRS5SYXkoKTtcbiAgICAgICAgdGhpcy5kb3duID0gbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLm1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IEhvbGRlcigpO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMucGxhbmVzID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW50ZXJhY3QgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlbW92ZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaG1vdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlLnggPSBhY3Rpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlLnkgPSBhY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGNhbmNlbFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZXVwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlb3V0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGdldCBsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jaztcbiAgICB9XG4gICAgc2V0IGxvY2sodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9sb2NrID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkaXNhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZTtcbiAgICB9XG4gICAgc2V0IGRpc2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gdmFsdWU7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLmNvbnRpbmdsZSArIHRoaXMuYW5nbGU7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKGFuZ2xlIC0gdGhpcy5ncm91cC5hbmdsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLmFuZ2xlICs9IGRlbHRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzWzBdXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXAuYW5nbGUgIT0gYW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKGFuZ2xlIC0gZ3JvdXAuYW5nbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmFuZ2xlICs9IGRlbHRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1hdGNoKCkge1xuICAgICAgICBjb25zdCBwbGFuZSA9IHRoaXMuaG9sZGVyLnBsYW5lLm5vcm1hbDtcbiAgICAgICAgY29uc3QgZmluZ2VyID0gdGhpcy5ob2xkZXIudmVjdG9yO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaG9sZGVyLmluZGV4O1xuICAgICAgICBjb25zdCBvcmRlciA9IDM7XG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IEN1YmVHcm91cC5BWElTX1ZFQ1RPUltheGlzXTtcbiAgICAgICAgICAgIGlmICh2ZWN0b3IuZG90KHBsYW5lKSA9PT0gMCAmJiB2ZWN0b3IuZG90KGZpbmdlcikgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXhpcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBpbmRleCAlIG9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoKGluZGV4ICUgKG9yZGVyICogb3JkZXIpKSAvIG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKGluZGV4IC8gKG9yZGVyICogb3JkZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1theGlzXVtsYXllcl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcbiAgICAgICAgY29uc3QgeCA9IChwb2ludC54IC8gdGhpcy53b3JsZC53aWR0aCkgKiAyIC0gMTtcbiAgICAgICAgY29uc3QgeSA9IC0ocG9pbnQueSAvIHRoaXMud29ybGQuaGVpZ2h0KSAqIDIgKyAxO1xuICAgICAgICB0aGlzLnJheS5vcmlnaW4uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMud29ybGQuY2FtZXJhLm1hdHJpeFdvcmxkKTtcbiAgICAgICAgdGhpcy5yYXkuZGlyZWN0aW9uLnNldCh4LCB5LCAwLjUpLnVucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSkuc3ViKHRoaXMucmF5Lm9yaWdpbikubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy53b3JsZC5zY2VuZS5tYXRyaXgpO1xuICAgICAgICB0aGlzLm1hdHJpeC5pbnZlcnQoKTtcbiAgICAgICAgdGhpcy5yYXkuYXBwbHlNYXRyaXg0KHRoaXMubWF0cml4KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFRIUkVFLlZlY3RvcjMoSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYW5kbGVEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgICAgICB0aGlzLnBsYW5lcy5mb3JFYWNoKChwbGFuZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgIGlmIChwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gcG9pbnQueCAvIGN1YmVsZXRfZGVmcy5zaXplIC8gMztcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBvaW50LnkgLyBjdWJlbGV0X2RlZnMuc2l6ZSAvIDM7XG4gICAgICAgICAgICAgICAgbGV0IHogPSBwb2ludC56IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh4KSA8PSAwLjUwMDEgJiYgTWF0aC5hYnMoeSkgPD0gMC41MDAxICYmIE1hdGguYWJzKHopIDw9IDAuNTAwMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gTWF0aC5wb3cocG9pbnQueCAtIHRoaXMucmF5Lm9yaWdpbi54LCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy5yYXkub3JpZ2luLnksIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHBvaW50LnogLSB0aGlzLnJheS5vcmlnaW4ueiwgMik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA9PSAwIHx8IGQgPCBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIucGxhbmUgPSBwbGFuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHggKyAwLjUpICogb3JkZXIpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ob3JkZXIgLSAxLCBNYXRoLmZsb29yKCh5ICsgMC41KSAqIG9yZGVyKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeiA9IE1hdGgubWF4KDAsIE1hdGgubWluKG9yZGVyIC0gMSwgTWF0aC5mbG9vcigoeiArIDAuNSkgKiBvcmRlcikpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0geiAqIG9yZGVyICogb3JkZXIgKyB5ICogb3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgaGFuZGxlTW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBkeCA9IHRoaXMubW92ZS54IC0gdGhpcy5kb3duLng7XG4gICAgICAgICAgICBjb25zdCBkeSA9IHRoaXMubW92ZS55IC0gdGhpcy5kb3duLnk7XG4gICAgICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIGlmIChNYXRoLm1pbih0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodCkgLyBkID4gMTI4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkZXIuaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGR4ICogZHggPiBkeSAqIGR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMud29ybGQud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZiA9IG5ldyBUSFJFRS5WZWN0b3IzKC0oY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIsIDAsIChjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIGxmLmFwcGx5TWF0cml4NCh0aGlzLndvcmxkLnNjZW5lLm1hdHJpeCkucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGx4ID0gTWF0aC5yb3VuZChsZi54ICogaGFsZiArIGhhbGYpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZiA9IG5ldyBUSFJFRS5WZWN0b3IzKChjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiwgMCwgKGN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmYuYXBwbHlNYXRyaXg0KHRoaXMud29ybGQuc2NlbmUubWF0cml4KS5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnggPSBNYXRoLnJvdW5kKHJmLnggKiBoYWxmICsgaGFsZik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZi56IDwgcmYueikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgbHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInonXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvd24ueCA8IHJ4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5nbGUgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSBncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGluZ2xlLmFkZChncm91cC5hbmdsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250aW5nbGUuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLnZlY3Rvci54O1xuICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy52ZWN0b3IueTtcbiAgICAgICAgICAgICAgICBsZXQgeiA9IHRoaXMudmVjdG9yLno7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5hYnMoeCksIE1hdGguYWJzKHkpLCBNYXRoLmFicyh6KSk7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguYWJzKHgpID09PSBtYXggPyB4IDogMDtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5hYnMoeSkgPT09IG1heCA/IHkgOiAwO1xuICAgICAgICAgICAgICAgIHogPSBNYXRoLmFicyh6KSA9PT0gbWF4ID8geiA6IDA7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3Iuc2V0KHgsIHksIHopO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnZlY3Rvci5jb3B5KHRoaXMudmVjdG9yLm11bHRpcGx5KHRoaXMudmVjdG9yKS5ub3JtYWxpemUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IHRoaXMubWF0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdGhpcy5ncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB0aGlzLmdyb3VwLmFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHRoaXMuaG9sZGVyLnBsYW5lLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLm11bHRpcGx5U2NhbGFyKHRoaXMudmVjdG9yLnggKyB0aGlzLnZlY3Rvci55ICsgdGhpcy52ZWN0b3Iueik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHRoaXMuaG9sZGVyLnBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHRoaXMuaG9sZGVyLnBsYW5lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvci5zdWJWZWN0b3JzKGVuZCwgc3RhcnQpLm11bHRpcGx5KHRoaXMuaG9sZGVyLnZlY3Rvcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVjdG9yID0gQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuZ3JvdXAuYXhpc107XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9XG4gICAgICAgICAgICAgICAgICAgICgoLSh0aGlzLnZlY3Rvci54ICsgdGhpcy52ZWN0b3IueSArIHRoaXMudmVjdG9yLnopICogKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3IueikpIC8gY3ViZWxldF9kZWZzLnNpemUpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguUEkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gdGhpcy5tb3ZlLnggLSB0aGlzLmRvd24ueDtcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IHRoaXMubW92ZS55IC0gdGhpcy5kb3duLnk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR4IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR5IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoZHkgLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKiBNYXRoLlBJICogdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR5IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVVwKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgbGV0IGZhY2UgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmhvbGRlci5wbGFuZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMF06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLlI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMV06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLlU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMl06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLkY7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpIDwgTWF0aC5QSSAvIDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IChNYXRoLmFicyhhbmdsZSkgLyAodGljayAtIHRoaXMudGljaykpICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkID4gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlID09IDAgPyAwIDogKChhbmdsZSAvIE1hdGguYWJzKGFuZ2xlKSkgKiBNYXRoLlBJKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY29udGluZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnNlID0gdGltZXMgPCAwO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IE1hdGguYWJzKHRpbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnNlID0gdGltZXMgPCAwO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IE1hdGguYWJzKHRpbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IEN1YmVsZXQgZnJvbSBcIi4vY3ViZWxldFwiO1xuaW1wb3J0IHsgR3JvdXBUYWJsZSB9IGZyb20gXCIuL2dyb3VwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2NrcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwieVwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInpcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2NrLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9jayhheGlzLCBsYXllcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoX2EgPSB0aGlzLmxvY2tzLmdldChcImFcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYXMoMSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBheGlzX2xvY2tzZXQgPSB0aGlzLmxvY2tzLmdldChheGlzKTtcbiAgICAgICAgaWYgKGF4aXNfbG9ja3NldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsb2Nrc2V0IG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2Nrc2V0ICE9IGF4aXNfbG9ja3NldCAmJiBsb2Nrc2V0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF4aXNfbG9ja3NldC5hZGQobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdW5sb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBheGlzX2xvY2tzZXQgPT09IG51bGwgfHwgYXhpc19sb2Nrc2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBheGlzX2xvY2tzZXQuZGVsZXRlKGxheWVyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdWJlbGV0X2RlZnMsIGN1YmVsZXRfY29yZSwgY3ViZWxldF9mcmFtZSwgY3ViZWxldF9zdGlja2VyLCBmYWNlX2F0dHJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgaW5kZXhUb0RpcmVjdGlvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlbGV0IGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3ZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbCA9IGluZGV4O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IGRyY3RuID0gaW5kZXhUb0RpcmVjdGlvbihpbmRleCk7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoZHJjdG4ueCwgZHJjdG4ueSwgZHJjdG4ueik7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X2NvcmUpO1xuICAgICAgICB0aGlzLmFkZCh0aGlzLmZyYW1lKTtcbiAgICAgICAgdGhpcy5sYW1iZXJ0cyA9IG5ldyBBcnJheSg2KTtcbiAgICAgICAgdGhpcy5zdGlja2VycyA9IG5ldyBBcnJheSg2KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGZhY2VfYXR0cnNbaV07XG4gICAgICAgICAgICBpZiAoZmFjZV9hdHRyLm1hdGNoKHRoaXMudmVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFtYmVydHNbaV0gPSBmYWNlX2F0dHIubGFtYmVydDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCB0aGlzLmxhbWJlcnRzW2ldKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja2Vyc1tpXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGhhbGYgPSAxO1xuICAgICAgICBsZXQgeCA9IHZlY3Rvci54O1xuICAgICAgICBsZXQgeSA9IHZlY3Rvci55O1xuICAgICAgICBsZXQgeiA9IHZlY3Rvci56O1xuICAgICAgICB0aGlzLl92ZWN0b3Iuc2V0KHgsIHksIHopO1xuICAgICAgICB4ID0gTWF0aC5yb3VuZCh4ICsgaGFsZik7XG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgKyBoYWxmKTtcbiAgICAgICAgeiA9IE1hdGgucm91bmQoeiArIGhhbGYpO1xuICAgICAgICB0aGlzLmluZGV4ID0geiAqIDkgKyB5ICogMyArIHg7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLng7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLnk7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueiA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLno7XG4gICAgfVxuICAgIGdldCB2ZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZWN0b3I7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyB0d2VlbmVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZUdyb3VwIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUsIGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmN1YmUgPSBjdWJlO1xuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gW107XG4gICAgICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmF4aXMgPSBheGlzO1xuICAgICAgICB0aGlzLmxheWVyID0gbGF5ZXI7XG4gICAgICAgIGNvbnN0IGhhbGYgPSAxO1xuICAgICAgICBjb25zdCB0YWJsZSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiBcIlJcIixcbiAgICAgICAgICAgICAgICB5OiBcIlVcIixcbiAgICAgICAgICAgICAgICB6OiBcIkZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogXCJMJ1wiLFxuICAgICAgICAgICAgICAgIHk6IFwiRCdcIixcbiAgICAgICAgICAgICAgICB6OiBcIkInXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IFwiTSdcIixcbiAgICAgICAgICAgICAgICB5OiBcIkUnXCIsXG4gICAgICAgICAgICAgICAgejogXCJTXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICBsZXQgdHlwZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLmxheWVyID09PSBoYWxmKSB7XG4gICAgICAgICAgICBsYXllciA9IDA7XG4gICAgICAgICAgICB0eXBlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmxheWVyIDwgaGFsZikge1xuICAgICAgICAgICAgdHlwZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYXllciA9IDMgLSBsYXllciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHRhYmxlW3R5cGVdW3RoaXMuYXhpc107XG4gICAgICAgIHRoaXMubmFtZSA9IChsYXllciA9PT0gMCA/IFwiXCIgOiBTdHJpbmcobGF5ZXIgKyAxKSkgKyBuYW1lO1xuICAgIH1cbiAgICBzZXQgYW5nbGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGhpcy5zZXRSb3RhdGlvbkZyb21BeGlzQW5nbGUoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuX2FuZ2xlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5nbGU7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMudHdlZW4uZW5kO1xuICAgICAgICAgICAgdHdlZW5lci5jYW5jZWwodGhpcy50d2Vlbik7XG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdlZW4uZW5kIC0gdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKHRoaXMudHdlZW4pO1xuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaG9sZCgpIHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLmluZGljZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmUuY3ViZWxldHNbaV07XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLmFkZCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRyYWcoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAtdGhpcy5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ob2xkKCk7XG4gICAgfVxuICAgIGRyb3AoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHMucG9wKCk7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBjdWJlbGV0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLmFkZChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5jdWJlbGV0c1tjdWJlbGV0LmluZGV4XSA9IGN1YmVsZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY3ViZS51bmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcbiAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHR3aXN0KGFuZ2xlLCBmYXN0KSB7XG4gICAgICAgIGlmICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuaG9sZCgpO1xuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICBpZiAoZmFzdCkge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlbHRhID0gYW5nbGUgLSB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSA8IDFlLTYpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguYWJzKGRlbHRhKSAvIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IEN1YmVHcm91cC5mcmFtZXMgKiAoMiAtIDIgLyAoZCArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSB0d2VlbmVyLnR3ZWVuKHRoaXMuYW5nbGUsIGFuZ2xlLCBkdXJhdGlvbiwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKEN1YmVHcm91cC5BWElTX1ZFQ1RPUlt0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShDdWJlR3JvdXAuQVhJU19WRUNUT1JbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuQ3ViZUdyb3VwLmZyYW1lcyA9IDMwO1xuQ3ViZUdyb3VwLkFYSVNfVkVDVE9SID0ge1xuICAgIGE6IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLFxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcbiAgICB5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksXG4gICAgejogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxufTtcbmV4cG9ydCBjbGFzcyBSb3RhdGVBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGdyb3VwLCB0d2lzdCkge1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIHRoaXMudHdpc3QgPSB0d2lzdDtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgR3JvdXBUYWJsZSB7XG4gICAgY29uc3RydWN0b3IoY3ViZSkge1xuICAgICAgICB0aGlzLm9yZGVyID0gMztcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbGF5ZXIgPSAwOyBsYXllciA8IHRoaXMub3JkZXI7IGxheWVyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gbmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBsYXllcik7XG4gICAgICAgICAgICAgICAgbGlzdFtsYXllcl0gPSBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ncm91cHNbYXhpc10gPSBsaXN0O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY3ViZWxldCBvZiBjdWJlLmN1YmVsZXRzKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGN1YmVsZXQuaW5pdGlhbDtcbiAgICAgICAgICAgIGxldCBheGlzO1xuICAgICAgICAgICAgbGV0IGxheWVyO1xuICAgICAgICAgICAgbGV0IGdyb3VwO1xuICAgICAgICAgICAgYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgbGF5ZXIgPSBpbmRleCAlIHRoaXMub3JkZXI7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW2F4aXNdW2xheWVyXTtcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcbiAgICAgICAgICAgIGF4aXMgPSBcInlcIjtcbiAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcigoaW5kZXggJSAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKSAvIHRoaXMub3JkZXIpO1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XG4gICAgICAgICAgICBncm91cC5pbmRpY2VzLnB1c2goY3ViZWxldC5pbmRleCk7XG4gICAgICAgICAgICBheGlzID0gXCJ6XCI7XG4gICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoaW5kZXggLyAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKTtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbYXhpc11bbGF5ZXJdO1xuICAgICAgICAgICAgZ3JvdXAuaW5kaWNlcy5wdXNoKGN1YmVsZXQuaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZhY2UoZmFjZSkge1xuICAgICAgICBsZXQgbGF5ZXIgPSAwO1xuICAgICAgICBsZXQgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbZmFjZV07XG4gICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcbiAgICB9XG59XG5Hcm91cFRhYmxlLkFYSVNfTUFQID0ge1xuICAgIFI6IFwieFwiLFxuICAgIEw6IFwiLXhcIixcbiAgICBVOiBcInlcIixcbiAgICBEOiBcIi15XCIsXG4gICAgRjogXCJ6XCIsXG4gICAgQjogXCItelwiLFxuICAgIE06IFwiLXhcIixcbiAgICBFOiBcIi15XCIsXG4gICAgUzogXCJ6XCIsXG59O1xuIiwiZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RvciB7XG4gICAgY29uc3RydWN0b3IoZG9tLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnRvdWNoID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oXCJ0b3VjaGVuZFwiLCB0aGlzLmxhc3QuY2xpZW50WCAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIHRoaXMubGFzdC5jbGllbnRZIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3QgPSBmaXJzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGhpcy5kb20gfHwgKChfYSA9IHRoaXMubGFzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkZW50aWZpZXIpICE9IGZpcnN0LmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGZpcnN0LmNsaWVudFggLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LCBmaXJzdC5jbGllbnRZIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGVuZFwiIHx8IGV2ZW50LnR5cGUgPT09IFwidG91Y2hjYW5jZWxcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vdXNlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJtb3VzZWRvd25cIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0aGlzLmRvbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb20udGFiSW5kZXggPSAxO1xuICAgICAgICAgICAgdGhpcy5kb20uZm9jdXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNldXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm1vdXNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFR3ZWVuIHtcbiAgICBjb25zdHJ1Y3RvcihiZWdpbiwgZW5kLCBkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5iZWdpbiA9IGJlZ2luO1xuICAgICAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5lbmQpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudmFsdWUrKztcbiAgICAgICAgbGV0IGVsYXBzZWQgPSB0aGlzLnZhbHVlIC8gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkIDwgMCA/IDAgOiBlbGFwc2VkO1xuICAgICAgICBlbGFwc2VkID0gZWxhcHNlZCAtIDE7XG4gICAgICAgIGVsYXBzZWQgPSAxIC0gZWxhcHNlZCAqIGVsYXBzZWQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZWxhcHNlZCA9PSAxID8gdGhpcy5lbmQgOiB0aGlzLmJlZ2luICsgKHRoaXMuZW5kIC0gdGhpcy5iZWdpbikgKiBlbGFwc2VkO1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3ZWVuZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR3ZWVucyA9IFtdO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHdlZW5zLmxlbmd0aDtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgdHdlZW4oYmVnaW4sIGVuZCwgZHVyYXRpb24sIHVwZGF0ZSkge1xuICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2VlbihiZWdpbiwgZW5kLCBkdXJhdGlvbiwgdXBkYXRlKTtcbiAgICAgICAgdGhpcy50d2VlbnMucHVzaCh0d2Vlbik7XG4gICAgICAgIHJldHVybiB0d2VlbjtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy50d2VlbnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnR3ZWVucy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50d2VlbnNbaV0udXBkYXRlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3ZWVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgbGVuLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZpbmlzaCh0d2VlbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHdlZW4pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50d2VlbnNbaV0gPT0gdHdlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4uZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR3ZWVucyA9IHRoaXMudHdlZW5zLnNwbGljZSgwLCB0aGlzLnR3ZWVucy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0d2VlbiBvZiB0d2VlbnMpIHtcbiAgICAgICAgICAgICAgICB0d2Vlbi5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5jZWwodHdlZW4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR3ZWVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudHdlZW5zW2ldID09IHR3ZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCB0d2VlbmVyID0gbmV3IFR3ZWVuZXIoKTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgRnJhbWUsIFN0aWNrZXIgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29sb3JzID0ge1xuICAgIFI6IFwiI0I3MUMxQ1wiLFxuICAgIEw6IFwiI0ZGNkQwMFwiLFxuICAgIFU6IFwiI0YwRjBGMFwiLFxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxuICAgIEY6IFwiIzAwQTAyMFwiLFxuICAgIEI6IFwiIzBENDdBMVwiLFxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxuICAgIGdyYXk6IFwiIzgwODA4MFwiLFxuICAgIGhpZ2g6IFwiI0ZGMDA4MFwiLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2RlZnMgPSB7XG4gICAgc2l6ZTogNjQsXG4gICAgb3JkZXI6IDMsXG4gICAgX2JvcmRlcl93aWR0aDogMyxcbiAgICBfZWRnZV93aWR0aDogMixcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZyYW1lID0gbmV3IEZyYW1lKGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9sYW1iZXJzID0gKCgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjdWJlbGV0X2NvbG9ycykge1xuICAgICAgICByZXN1bHRba2V5XSA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29yZSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7XG4gICAgY29sb3I6IGN1YmVsZXRfY29sb3JzLmNvcmUsXG4gICAgc3BlY3VsYXI6IGN1YmVsZXRfY29sb3JzLmdyYXksXG4gICAgc2hpbmluZXNzOiAyLFxufSk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9zdGlja2VyID0gbmV3IFN0aWNrZXIoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX2VkZ2Vfd2lkdGgsIGN1YmVsZXRfZGVmcy5fc3RpY2tlcl9kZXB0aCk7XG5leHBvcnQgY29uc3QgaW5kZXhUb0RpcmVjdGlvbiA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiB7IHg6IGluZGV4ICUgMyAtIDEsIHk6IE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMgLSAxLCB6OiBNYXRoLmZsb29yKGluZGV4IC8gOSkgLSAxIH07XG59O1xuZXhwb3J0IGNvbnN0IGZhY2VfYXR0cnMgPSBbXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygwLCAtTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyhjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5ELFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJIC8gMiwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueSA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuVSxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygtTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnogPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5CLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgY3ViZWxldF9kZWZzLnNpemUgLyAyKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDIgKiBNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuXTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuZXhwb3J0IHZhciBGYWNlO1xuKGZ1bmN0aW9uIChGYWNlKSB7XG4gICAgRmFjZVtGYWNlW1wiTFwiXSA9IDBdID0gXCJMXCI7XG4gICAgRmFjZVtGYWNlW1wiUlwiXSA9IDFdID0gXCJSXCI7XG4gICAgRmFjZVtGYWNlW1wiRFwiXSA9IDJdID0gXCJEXCI7XG4gICAgRmFjZVtGYWNlW1wiVVwiXSA9IDNdID0gXCJVXCI7XG4gICAgRmFjZVtGYWNlW1wiQlwiXSA9IDRdID0gXCJCXCI7XG4gICAgRmFjZVtGYWNlW1wiRlwiXSA9IDVdID0gXCJGXCI7XG59KShGYWNlIHx8IChGYWNlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBGcmFtZSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBib3JkZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3QgbyA9IHNpemUgLyAyO1xuICAgICAgICBjb25zdCBpID0gbyAtIGJvcmRlcjtcbiAgICAgICAgY29uc3QgX3ZlcnRzID0gW1xuICAgICAgICAgICAgLWksICtpLCArbyxcbiAgICAgICAgICAgICtpLCAraSwgK28sXG4gICAgICAgICAgICAraSwgLWksICtvLFxuICAgICAgICAgICAgLWksIC1pLCArbyxcbiAgICAgICAgICAgIC1pLCArbywgLWksXG4gICAgICAgICAgICAraSwgK28sIC1pLFxuICAgICAgICAgICAgK2ksICtvLCAraSxcbiAgICAgICAgICAgIC1pLCArbywgK2ksXG4gICAgICAgICAgICAtbywgLWksIC1pLFxuICAgICAgICAgICAgLW8sICtpLCAtaSxcbiAgICAgICAgICAgIC1vLCAraSwgK2ksXG4gICAgICAgICAgICAtbywgLWksICtpLFxuICAgICAgICAgICAgK2ksICtpLCAtbyxcbiAgICAgICAgICAgIC1pLCAraSwgLW8sXG4gICAgICAgICAgICAtaSwgLWksIC1vLFxuICAgICAgICAgICAgK2ksIC1pLCAtbyxcbiAgICAgICAgICAgIC1pLCAtbywgK2ksXG4gICAgICAgICAgICAraSwgLW8sICtpLFxuICAgICAgICAgICAgK2ksIC1vLCAtaSxcbiAgICAgICAgICAgIC1pLCAtbywgLWksXG4gICAgICAgICAgICArbywgK2ksICtpLFxuICAgICAgICAgICAgK28sICtpLCAtaSxcbiAgICAgICAgICAgICtvLCAtaSwgLWksXG4gICAgICAgICAgICArbywgLWksICtpLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKF92ZXJ0cywgMykpO1xuICAgICAgICB0aGlzLnNldEluZGV4KEZyYW1lLl9pbmRpY2VzKTtcbiAgICAgICAgdGhpcy5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuICAgIH1cbn1cbkZyYW1lLl9pbmRpY2VzID0gW1xuICAgIDAsIDIsIDEsXG4gICAgMCwgMywgMixcbiAgICA0LCA2LCA1LFxuICAgIDQsIDcsIDYsXG4gICAgOCwgMTAsIDksXG4gICAgOCwgMTEsIDEwLFxuICAgIDEyLCAxNCwgMTMsXG4gICAgMTIsIDE1LCAxNCxcbiAgICAxNiwgMTgsIDE3LFxuICAgIDE2LCAxOSwgMTgsXG4gICAgMjAsIDIyLCAyMSxcbiAgICAyMCwgMjMsIDIyLFxuICAgIDEsIDYsIDcsXG4gICAgMCwgMSwgNyxcbiAgICAzLCAwLCAxMCxcbiAgICAxMSwgMywgMTAsXG4gICAgMTcsIDIsIDMsXG4gICAgMTYsIDE3LCAzLFxuICAgIDIzLCAyMCwgMSxcbiAgICAyLCAyMywgMSxcbiAgICA1LCAxMiwgMTMsXG4gICAgNCwgNSwgMTMsXG4gICAgOSwgMTMsIDE0LFxuICAgIDgsIDksIDE0LFxuICAgIDIyLCAxNSwgMTIsXG4gICAgMjEsIDIyLCAxMixcbiAgICAxOSwgMTQsIDE1LFxuICAgIDE4LCAxOSwgMTUsXG4gICAgNywgNCwgOSxcbiAgICAxMCwgNywgOSxcbiAgICAxMSwgOCwgMTksXG4gICAgMTYsIDExLCAxOSxcbiAgICAyMywgMTcsIDE4LFxuICAgIDIyLCAyMywgMTgsXG4gICAgMjAsIDIxLCA1LFxuICAgIDYsIDIwLCA1LFxuICAgIDIwLCA2LCAxLFxuICAgIDEwLCAwLCA3LFxuICAgIDIxLCAxMiwgNSxcbiAgICAxMywgOSwgNCxcbiAgICAyMywgMiwgMTcsXG4gICAgMTEsIDE2LCAzLFxuICAgIDIyLCAxOCwgMTUsXG4gICAgOCwgMTQsIDE5LFxuXTtcbmV4cG9ydCBjbGFzcyBTdGlja2VyIGV4dGVuZHMgVEhSRUUuRXh0cnVkZUdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBkZXB0aCkge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBzdXBlcihzaGFwZSwgeyBiZXZlbEVuYWJsZWQ6IGZhbHNlLCBkZXB0aDogZGVwdGggfSk7XG4gICAgfVxufVxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuL2ludGVyYWN0b3JcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi93b3JsZFwiO1xubGV0IFZpZXdwb3J0ID0gY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgICAgICBjYW52YXM6IGNhbnZhc0VsZW0sXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICAgICAgICBhbHBoYTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDAsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBpZiAodGhpcy53b3JsZC5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy53b3JsZC5zY2VuZSwgdGhpcy53b3JsZC5jYW1lcmEpO1xuICAgICAgICB9XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIEluamVjdChcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwiY2FudmFzXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBIVE1MRWxlbWVudClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJjYW52YXNcIiwgdm9pZCAwKTtcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IHJlZj1cImNhbnZhc1wiPjwvZGl2PicsXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIH0pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbXSlcbl0sIFZpZXdwb3J0KTtcbmV4cG9ydCBkZWZhdWx0IFZpZXdwb3J0O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgQ3ViZSBmcm9tIFwiLi9jdWJlXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2RlZnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueCA9IE1hdGguUEkgLyA2O1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMTY7XG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDApO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsLnBvc2l0aW9uLnNldChjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLnNpemUgKiAzLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmRpcmVjdGlvbmFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIDEsIDEsIGN1YmVsZXRfZGVmcy5zaXplICogMzIpO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IDA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAwO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlID0gbmV3IEN1YmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlID0gOTtcbiAgICB9XG4gICAgc2V0IGRpcnR5KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGlydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1YmUuZGlydHk7XG4gICAgfVxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gICAgfVxuICAgIHVwZGF0ZUNhbWVyYSgpIHtcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5oZWlnaHQgLyBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyB0aGlzLnNjYWxlIC8gdGhpcy5wZXJzcGVjdGl2ZTtcbiAgICAgICAgY29uc3QgZm92ID0gKDIgKiBNYXRoLmF0YW4obWluKSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGN1YmVsZXRfZGVmcy5zaXplICogMyAqIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gZm92O1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gZGlzdGFuY2U7XG4gICAgICAgIHRoaXMuY2FtZXJhLm5lYXIgPSBkaXN0YW5jZSAtIGN1YmVsZXRfZGVmcy5zaXplICogMztcbiAgICAgICAgdGhpcy5jYW1lcmEuZmFyID0gZGlzdGFuY2UgKyBjdWJlbGV0X2RlZnMuc2l6ZSAqIDg7XG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdCh0aGlzLnNjZW5lLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZXRpZnkgZnJvbSBcInZ1ZXRpZnlcIjtcbmltcG9ydCBcInZ1ZXRpZnkvZGlzdC92dWV0aWZ5Lm1pbi5jc3NcIjtcbmltcG9ydCBcIm1hdGVyaWFsLWRlc2lnbi1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3NcIjtcbmltcG9ydCBQbGF5Z3JvdW5kIGZyb20gXCIuL3Z1ZWFwcC9wbGF5Z3JvdW5kXCI7XG5WdWUudXNlKFZ1ZXRpZnkpO1xuY29uc3Qgb3B0cyA9IHt9O1xuY29uc3QgdnVldGlmeSA9IG5ldyBWdWV0aWZ5KG9wdHMpO1xuVnVlLnByb3RvdHlwZS52dWV0aWZ5ID0gdnVldGlmeTtcbmxldCBhcHAgPSBQbGF5Z3JvdW5kO1xuY29uc3Qgdm0gPSBuZXcgVnVlKHtcbiAgICB2dWV0aWZ5LFxuICAgIGVsOiBcIiNhcHBcIixcbiAgICByZW5kZXI6IChoKSA9PiBoKGFwcCksXG59KTtcbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgUHJvdmlkZSwgUmVmIH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCBWaWV3cG9ydCBmcm9tIFwiLi4vLi4vY3ViZS92aWV3cG9ydFwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi8uLi9jdWJlL3dvcmxkXCI7XG5sZXQgUGxheWdyb3VuZCA9IGNsYXNzIFBsYXlncm91bmQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndvcmxkID0gbmV3IFdvcmxkKCk7XG4gICAgfVxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5jYWxjdVZpZXdwb3J0SGVpZ2h0KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSk7XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnZpZXdwb3J0LmRyYXcoKTtcbiAgICB9XG4gICAgY2FsY3VWaWV3cG9ydEhlaWdodCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQgLSBNYXRoLmNlaWwoTWF0aC5taW4od2lkdGggLyA2LCBoZWlnaHQgLyAxMikpICogMS41O1xuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICBQcm92aWRlKFwid29ybGRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIE9iamVjdClcbl0sIFBsYXlncm91bmQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICBSZWYoXCJ2aWV3cG9ydFwiKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgVmlld3BvcnQpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ2aWV3cG9ydFwiLCB2b2lkIDApO1xuUGxheWdyb3VuZCA9IF9fZGVjb3JhdGUoW1xuICAgIENvbXBvbmVudCh7XG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9pbmRleC5odG1sXCIpLFxuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICB2aWV3cG9ydDogVmlld3BvcnRcbiAgICAgICAgfSxcbiAgICB9KSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pXG5dLCBQbGF5Z3JvdW5kKTtcbmV4cG9ydCBkZWZhdWx0IFBsYXlncm91bmQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rcnViaWtzY3ViZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=