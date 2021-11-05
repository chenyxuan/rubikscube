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
        this.dragging = false;
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
        this.sensitivity = 0.5;
        this.tick = new Date().getTime();
        this.hover = -1;
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
        this.world = world;
        this.taps = [];
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
        const order = this.world.cube.order;
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
                        const order = this.world.cube.order;
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
            for (const tap of this.taps) {
                tap(this.holder.index, face);
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
                    this.world.cube.record(new _twister__WEBPACK_IMPORTED_MODULE_1__.TwistAction(this.group.name, reverse, times));
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
                    this.world.cube.record(new _twister__WEBPACK_IMPORTED_MODULE_1__.TwistAction(this.axis, reverse, times));
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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cubelet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubelet */ "./src/cube/cubelet.ts");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history */ "./src/cube/history.ts");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");






class Cube extends three__WEBPACK_IMPORTED_MODULE_5__.Group {
    constructor() {
        super();
        this.dirty = true;
        this.cubelets = [];
        this.initials = [];
        this.callbacks = [];
        this.twister = new _twister__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        const order = 3;
        this.order = order;
        this.scale.set(3 / order, 3 / order, 3 / order);
        for (let i = 0; i < order * order * order; i++) {
            const cubelet = new _cubelet__WEBPACK_IMPORTED_MODULE_0__["default"](i);
            this.cubelets.push(cubelet);
            this.initials.push(cubelet);
            this.add(cubelet);
        }
        this.locks = new Map();
        this.locks.set("x", new Set());
        this.locks.set("y", new Set());
        this.locks.set("z", new Set());
        this.locks.set("a", new Set());
        this.history = new _history__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.table = new _group__WEBPACK_IMPORTED_MODULE_1__.GroupTable(this);
        this.matrixAutoUpdate = false;
        this.updateMatrix();
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
        const tmp = this.locks.get(axis);
        if (tmp == undefined) {
            return false;
        }
        for (const lock of this.locks.values()) {
            if (lock != tmp && lock.size > 0) {
                return false;
            }
        }
        tmp.add(layer);
        return true;
    }
    unlock(axis, layer) {
        const tmp = this.locks.get(axis);
        tmp === null || tmp === void 0 ? void 0 : tmp.delete(layer);
    }
    record(action) {
        this.history.record(action);
    }
    get complete() {
        const complete = [_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.U, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B].every((face) => {
            const group = this.table.face(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face[face]);
            if (!group) {
                throw Error();
            }
            let cubelet = this.cubelets[group.indices[0]];
            const color = cubelet.getFace(face);
            const same = group.indices.every((idx) => {
                cubelet = this.cubelets[idx];
                return color == cubelet.getFace(face);
            });
            return same;
        });
        return complete;
    }
    index(value) {
        return this.initials[value].index;
    }
    reset() {
        _twister__WEBPACK_IMPORTED_MODULE_2__.tweener.finish();
        for (const cubelet of this.cubelets) {
            cubelet.setRotationFromEuler(new three__WEBPACK_IMPORTED_MODULE_5__.Euler(0, 0, 0));
            cubelet.index = cubelet.initial;
            cubelet.updateMatrix();
        }
        this.cubelets.sort((left, right) => {
            return left.index - right.index;
        });
    }
    stick(index, face, value) {
        const cubelet = this.initials[index];
        if (!cubelet) {
            throw Error("invalid cubelet index: " + index);
        }
        cubelet.stick(face, value);
        this.dirty = true;
    }
    strip(strip) {
        for (const face of [_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.U, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B, _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F]) {
            const key = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face[face];
            const group = this.table.face(key);
            if (!group) {
                throw Error();
            }
            for (const index of group.indices) {
                this.initials[index].stick(face, "");
            }
            const indexes = strip[key];
            if (indexes == undefined) {
                continue;
            }
            for (const index of indexes) {
                const cubelet = this.initials[index];
                if (!cubelet) {
                    throw Error("invalid cubelet index: " + index);
                }
                cubelet.stick(face, "remove");
            }
        }
        this.dirty = true;
    }
    serialize() {
        const result = [];
        let x, y, z;
        y = this.order - 1;
        for (z = 0; z < this.order; z++) {
            for (x = 0; x < this.order; x++) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.U);
                result.push(color);
            }
        }
        x = this.order - 1;
        for (y = this.order - 1; y >= 0; y--) {
            for (z = this.order - 1; z >= 0; z--) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R);
                result.push(color);
            }
        }
        z = this.order - 1;
        for (y = this.order - 1; y >= 0; y--) {
            for (x = 0; x < this.order; x++) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F);
                result.push(color);
            }
        }
        y = 0;
        for (z = this.order - 1; z >= 0; z--) {
            for (x = 0; x < this.order; x++) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D);
                result.push(color);
            }
        }
        x = 0;
        for (y = this.order - 1; y >= 0; y--) {
            for (z = 0; z < this.order; z++) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L);
                result.push(color);
            }
        }
        z = 0;
        for (y = this.order - 1; y >= 0; y--) {
            for (x = this.order - 1; x >= 0; x--) {
                const index = z * this.order * this.order + y * this.order + x;
                const color = this.cubelets[index].getColor(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B);
                result.push(color);
            }
        }
        return result.join("");
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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");



class Cubelet extends three__WEBPACK_IMPORTED_MODULE_2__.Group {
    constructor(index) {
        super();
        this._vector = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3();
        this._quaternion = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion();
        this.order = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.order;
        this.initial = index;
        this.index = index;
        this.stickers = [];
        this.mirrors = [];
        const half = (this.order - 1) / 2;
        this.lamberts = [
            this.vector.x == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.L : undefined,
            this.vector.x == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.R : undefined,
            this.vector.y == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.D : undefined,
            this.vector.y == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.U : undefined,
            this.vector.z == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.B : undefined,
            this.vector.z == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.F : undefined,
        ];
        this.basics = [
            this.vector.x == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.L : undefined,
            this.vector.x == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.R : undefined,
            this.vector.y == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.D : undefined,
            this.vector.y == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.U : undefined,
            this.vector.z == -half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.B : undefined,
            this.vector.z == half ? _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics.F : undefined,
        ];
        this.frame = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_frame, _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_core);
        this.add(this.frame);
        for (let i = 0; i < 6; i++) {
            if (this.lamberts[i] != undefined) {
                const _sticker = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_sticker, this.lamberts[i]);
                switch (i) {
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.L:
                        _sticker.rotation.y = -Math.PI / 2;
                        _sticker.position.x = -_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.R:
                        _sticker.rotation.y = Math.PI / 2;
                        _sticker.position.x = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.D:
                        _sticker.rotation.x = Math.PI / 2;
                        _sticker.position.y = -_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.U:
                        _sticker.rotation.x = -Math.PI / 2;
                        _sticker.position.y = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.B:
                        _sticker.rotation.x = Math.PI;
                        _sticker.position.z = -_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.F:
                        _sticker.rotation.x = 2 * Math.PI;
                        _sticker.position.z = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size / 2;
                        break;
                    default:
                        break;
                }
                this.add(_sticker);
                this.stickers[i] = _sticker;
                const _mirror = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_mirror, this.basics[i]);
                _mirror.rotation.x = _sticker.rotation.x == 0 ? 0 : _sticker.rotation.x + Math.PI;
                _mirror.rotation.y = _sticker.rotation.y == 0 ? 0 : _sticker.rotation.y + Math.PI;
                _mirror.rotation.z = _sticker.rotation.z == 0 ? 0 : _sticker.rotation.z + Math.PI;
                if (_mirror.rotation.x + _mirror.rotation.y + _mirror.rotation.z == 0) {
                    _mirror.rotation.y = Math.PI;
                }
                _mirror.position.x = _sticker.position.x * (this.order + 1);
                _mirror.position.y = _sticker.position.y * (this.order + 1);
                _mirror.position.z = _sticker.position.z * (this.order + 1);
                this.mirrors[i] = _mirror;
            }
        }
        this.matrixAutoUpdate = false;
        this.updateMatrix();
    }
    set vector(vector) {
        const half = (this.order - 1) / 2;
        let x = Math.round(vector.x * 2) / 2;
        let y = Math.round(vector.y * 2) / 2;
        let z = Math.round(vector.z * 2) / 2;
        this._vector.set(x, y, z);
        x = Math.round(x + half);
        y = Math.round(y + half);
        z = Math.round(z + half);
        this._index = z * this.order * this.order + y * this.order + x;
        this.position.x = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.x;
        this.position.y = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.y;
        this.position.z = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size * this._vector.z;
    }
    get vector() {
        return this._vector;
    }
    set index(index) {
        const half = (this.order - 1) / 2;
        const _x = (index % this.order) - half;
        const _y = Math.floor((index % (this.order * this.order)) / this.order) - half;
        const _z = Math.floor(index / (this.order * this.order)) - half;
        this.vector = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(_x, _y, _z);
    }
    get index() {
        return this._index;
    }
    stick(face, value) {
        let lamber;
        let basic;
        if (this.stickers[face] === undefined) {
            return;
        }
        if (value == "remove") {
            this.stickers[face].visible = false;
            this.mirrors[face].visible = false;
            return;
        }
        this.stickers[face].visible = true;
        this.mirrors[face].visible = true;
        if (value && value.length > 0) {
            lamber = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers[value];
            basic = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_basics[value];
        }
        else {
            lamber = this.lamberts[face];
            basic = this.basics[face];
        }
        if (lamber === undefined || basic === undefined) {
            return;
        }
        this.stickers[face].material = lamber;
        if (this.mirrors[face] instanceof three__WEBPACK_IMPORTED_MODULE_2__.Mesh) {
            this.mirrors[face].material = basic;
        }
    }
    getFace(face) {
        const position = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0);
        switch (face) {
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.L:
                position.x = -1;
                break;
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.R:
                position.x = 1;
                break;
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.D:
                position.y = -1;
                break;
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.U:
                position.y = 1;
                break;
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.B:
                position.z = -1;
                break;
            case _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.F:
                position.z = 1;
                break;
            default:
                break;
        }
        this._quaternion.copy(this.quaternion);
        position.applyQuaternion(this._quaternion.invert());
        const x = Math.round(position.x);
        const y = Math.round(position.y);
        const z = Math.round(position.z);
        let color = 0;
        if (x < 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.L;
        }
        else if (x > 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.R;
        }
        else if (y < 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.D;
        }
        else if (y > 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.U;
        }
        else if (z < 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.B;
        }
        else if (z > 0) {
            color = _utils_internal__WEBPACK_IMPORTED_MODULE_1__.Face.F;
        }
        return color;
    }
    getColor(face) {
        const sticker = this.stickers[this.getFace(face)];
        if (!sticker || !sticker.visible) {
            return "?";
        }
        switch (sticker.material) {
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.L:
                return "L";
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.R:
                return "R";
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.F:
                return "F";
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.B:
                return "B";
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.U:
                return "U";
            case _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_lambers.D:
                return "D";
        }
        return "?";
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
        const half = (this.cube.order - 1) / 2;
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
            layer = this.cube.order - layer - 1;
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
CubeGroup.frames = 20;
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
        this.order = cube.order;
        this.groups = {};
        for (const axis of ["x", "y", "z"]) {
            const list = [];
            for (let layer = 0; layer < this.order; layer++) {
                const g = new CubeGroup(cube, axis, layer);
                list[layer] = g;
            }
            this.groups[axis] = list;
        }
        for (const cubelet of cube.initials) {
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
    convert(action) {
        const result = [];
        let sign = action.sign;
        if (sign.match(/.[Ww]/)) {
            sign = sign.toLowerCase().replace("w", "");
        }
        if (/[XYZ]/.test(sign)) {
            sign = sign.toLowerCase();
        }
        let group;
        let twist = action.times * (action.reverse ? -1 : 1);
        let layer;
        if (sign.length === 1) {
            switch (sign) {
                case "x":
                case "y":
                case "z":
                    for (let layer = 0; layer < this.order; layer++) {
                        group = this.groups[sign][layer];
                        result.push(new RotateAction(group, twist));
                    }
                    return result;
                case "R":
                case "U":
                case "F":
                case "L":
                case "D":
                case "B":
                    layer = 0;
                    sign = GroupTable.AXIS_MAP[sign.toUpperCase()];
                    if (sign.length == 2) {
                        twist = -twist;
                        sign = sign[1];
                    }
                    else {
                        layer = this.order - 1;
                    }
                    group = this.groups[sign][layer];
                    result.push(new RotateAction(group, twist));
                    return result;
                case "r":
                case "u":
                case "f":
                case "l":
                case "d":
                case "b":
                    layer = 0;
                    sign = GroupTable.AXIS_MAP[sign.toUpperCase()];
                    if (sign.length == 2) {
                        twist = -twist;
                        sign = sign[1];
                    }
                    else {
                        layer = this.order - 2;
                    }
                    group = this.groups[sign][layer];
                    result.push(new RotateAction(group, twist));
                    group = this.groups[sign][layer + 1];
                    result.push(new RotateAction(group, twist));
                    return result;
                case "E":
                case "M":
                case "S":
                    layer = Math.floor((this.order - 1) / 2);
                    sign = GroupTable.AXIS_MAP[sign.toUpperCase()];
                    if (sign.length == 2) {
                        twist = -twist;
                        sign = sign[1];
                    }
                    group = this.groups[sign][layer];
                    result.push(new RotateAction(group, twist));
                    if (this.order % 2 == 0) {
                        group = this.groups[sign][layer + 1];
                        result.push(new RotateAction(group, twist));
                    }
                    return result;
                case "e":
                case "m":
                case "s":
                    sign = GroupTable.AXIS_MAP[sign.toUpperCase()];
                    if (sign.length == 2) {
                        twist = -twist;
                        sign = sign[1];
                    }
                    for (let layer = 1; layer < this.order - 1; layer++) {
                        group = this.groups[sign][layer];
                        result.push(new RotateAction(group, twist));
                    }
                    return result;
            }
        }
        else {
            const list = sign.match(/([0123456789]*)(-?)([0123456789]*)([lrudfb])/i);
            if (list == null) {
                return result;
            }
            let from = Number(list[1]);
            let to = Number(list[3]);
            if (to === NaN || to === 0) {
                if (/[lrudfb]/.test(list[4])) {
                    to = 1;
                }
                else {
                    to = from;
                }
            }
            if (from > this.order) {
                from = this.order;
            }
            if (to > this.order) {
                to = this.order;
            }
            sign = GroupTable.AXIS_MAP[list[4].toUpperCase()];
            if (sign.length == 2) {
                twist = -twist;
                sign = sign[1];
            }
            else {
                from = this.order - from + 1;
                to = this.order - to + 1;
            }
            if (from > to) {
                [from, to] = [to, from];
            }
            for (let layer = from - 1; layer < to; layer++) {
                group = this.groups[sign][layer];
                result.push(new RotateAction(group, twist));
            }
        }
        return result;
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

/***/ "./src/cube/history.ts":
/*!*****************************!*\
  !*** ./src/cube/history.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");

class History {
    constructor() {
        this.list = [];
        this.init = "";
        this.exp = "";
    }
    record(raw) {
        const action = new _twister__WEBPACK_IMPORTED_MODULE_0__.TwistAction(raw.sign, raw.reverse, raw.times);
        if (this.list.length == 0) {
            action.times = action.times % 4;
            if (action.times != 0) {
                this.list.push(action);
                this.exp = this.exp + " " + action.value;
            }
        }
        else {
            const last = this.list[this.list.length - 1];
            if (last.sign == action.sign) {
                last.times = last.times + action.times * (last.reverse == action.reverse ? 1 : -1);
                if (last.times < 0) {
                    last.times = -last.times;
                    last.reverse = !last.reverse;
                }
                last.times = last.times % 4;
                this.exp = this.exp.substring(0, this.exp.lastIndexOf(" "));
                if (last.times == 0) {
                    this.list.pop();
                }
                else {
                    this.exp = this.exp + " " + last.value;
                }
            }
            else {
                this.list.push(action);
                this.exp = this.exp + " " + action.value;
            }
        }
    }
    clear() {
        this.list = [];
        this.init = "";
        this.exp = "";
    }
    get last() {
        return this.list[this.list.length - 1];
    }
    get length() {
        return this.list.length;
    }
    get moves() {
        let length = this.length;
        for (const twist of this.list) {
            if (twist.sign == "x" || twist.sign == "y" || twist.sign == "z") {
                length--;
            }
        }
        return length;
    }
}


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
/* harmony export */   "tweener": () => (/* binding */ tweener),
/* harmony export */   "TwistAction": () => (/* binding */ TwistAction),
/* harmony export */   "TwistNode": () => (/* binding */ TwistNode),
/* harmony export */   "default": () => (/* binding */ Twister)
/* harmony export */ });
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");

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
class TwistAction {
    constructor(exp, reverse = false, times = 1) {
        const values = exp.match(/([\*\#~;.#xyz]|[0123456789-]*[bsfdeulmr][w]*)('?)(\d*)('?)/i);
        if (values) {
            exp = values[1];
            reverse = reverse !== ((values[2] + values[4]).length == 1);
            times = times * (values[3].length == 0 ? 1 : parseInt(values[3]));
        }
        if (/[XYZ]/.test(exp)) {
            exp = exp.toLowerCase();
        }
        if (/[Ww]/.test(exp)) {
            exp = exp.toUpperCase();
            exp = exp.replace("W", "w");
        }
        this.sign = exp;
        this.reverse = reverse;
        this.times = times;
    }
    get value() {
        if (this.times == 0) {
            return "";
        }
        return this.sign + (this.times == 1 ? "" : String(this.times)) + (this.reverse ? "'" : "");
    }
}
class TwistNode {
    constructor(exp, reverse = false, times = 1) {
        this.children = [];
        exp = exp.replace(/[‘＇’]/g, "'");
        if (exp.match(/^([\*\#~;.#xyz]|[0123456789-]*[bsfdeulmr][w]*)$/gi)) {
            this.twist = new TwistAction(exp, reverse, times);
            return;
        }
        this.twist = new TwistAction("", reverse, times);
        if (exp.length == 0) {
            return;
        }
        const list = TwistNode.SPLIT_SEGMENT(exp);
        for (const item of list) {
            let values;
            values = item.match(/^\[(.+[:|,].+)\]$/i);
            if (values) {
                values = TwistNode.SPLIT_BRACKET(values[1]);
                switch (values[1]) {
                    case ",":
                        this.children.push(new TwistNode(values[0], false, 1));
                        this.children.push(new TwistNode(values[2], false, 1));
                        this.children.push(new TwistNode(values[0], true, 1));
                        this.children.push(new TwistNode(values[2], true, 1));
                        break;
                    case ":":
                        this.children.push(new TwistNode(values[0], false, 1));
                        this.children.push(new TwistNode(values[2], false, 1));
                        this.children.push(new TwistNode(values[0], true, 1));
                        break;
                    default:
                        break;
                }
                continue;
            }
            values = item.match(/^(\[.+[:|,].+\])('?)(\d*)('?)$/i);
            if (values === null) {
                values = item.match(/^\((.+)\)('?)(\d*)('?)$/i);
            }
            if (values === null) {
                values = item.match(/([\*\#~;.#xyz]|[0123456789-]*[bsfdeulmr][w]*)('?)(\d*)('?)/i);
            }
            if (null === values) {
                continue;
            }
            const reverse = (values[2] + values[4]).length == 1;
            const times = values[3].length == 0 ? 1 : parseInt(values[3]);
            this.children.push(new TwistNode(values[1], reverse, times));
        }
    }
    static SPLIT_SEGMENT(exp) {
        const list = [];
        let buffer = "";
        let stack = 0;
        let ready = false;
        let note = false;
        for (let i = 0; i < exp.length; i++) {
            const c = exp.charAt(i);
            if (c === " " && buffer.length == 0) {
                continue;
            }
            if (c === "/" && exp.charAt(i + 1) === "/") {
                i++;
                note = true;
                continue;
            }
            if (c === "\n") {
                note = false;
                continue;
            }
            if (note) {
                continue;
            }
            if (TwistNode.AFFIX.indexOf(c) >= 0) {
                buffer = buffer.concat(c);
                continue;
            }
            if (buffer.length > 0 && stack == 0 && ready) {
                list.push(buffer);
                buffer = "";
                i--;
                ready = false;
                continue;
            }
            if (c === "(" || c === "[") {
                buffer = buffer.concat(c);
                stack++;
                continue;
            }
            if (c === ")" || c === "]") {
                buffer = buffer.concat(c);
                stack--;
                continue;
            }
            ready = true;
            buffer = buffer.concat(c);
        }
        if (buffer.length > 0) {
            list.push(buffer);
        }
        return list;
    }
    static SPLIT_BRACKET(exp) {
        const list = [];
        let buffer = "";
        let stack = 0;
        for (let i = 0; i < exp.length; i++) {
            const c = exp.charAt(i);
            if (stack == 0 && (c === "," || c === ":")) {
                list.push(buffer);
                list.push(c);
                buffer = "";
                continue;
            }
            if (c === "(" || c === "[") {
                buffer = buffer.concat(c);
                stack++;
                continue;
            }
            if (c === ")" || c === "]") {
                buffer = buffer.concat(c);
                stack--;
                continue;
            }
            buffer = buffer.concat(c);
        }
        if (buffer.length > 0) {
            list.push(buffer);
        }
        return list;
    }
    parse(reverse = false) {
        reverse = this.twist.reverse !== reverse;
        const result = [];
        if (0 !== this.children.length) {
            for (let i = 0; i < this.twist.times; i++) {
                for (let j = 0; j < this.children.length; j++) {
                    let n;
                    if (reverse) {
                        n = this.children[this.children.length - j - 1];
                    }
                    else {
                        n = this.children[j];
                    }
                    const list = n.parse(reverse);
                    for (const element of list) {
                        result.push(element);
                    }
                }
            }
        }
        else if (this.twist.sign != "" && !this.twist.sign.startsWith("//")) {
            const action = new TwistAction(this.twist.sign, reverse, this.twist.times);
            result.push(action);
        }
        return result;
    }
}
TwistNode.AFFIX = "'Ww0123456789-";
class Twister {
    constructor(cube) {
        this.queue = [];
        this.update = () => {
            while (true) {
                const action = this.queue.shift();
                if (action == undefined) {
                    return;
                }
                const success = this.twist(action, false, false);
                if (!success) {
                    this.queue.unshift(action);
                    return;
                }
            }
        };
        this.cube = cube;
        this.cube.callbacks.push(this.update);
    }
    scrambler() {
        let result = "";
        const exps = [];
        let last = -1;
        const actions = ["U", "D", "R", "L", "F", "B"];
        let axis = -1;
        for (let i = 0; i < 3 * 3 * this.cube.order; i++) {
            const exp = [];
            while (axis == last) {
                axis = Math.floor(Math.random() * 3);
            }
            const side = Math.floor(Math.random() * 2);
            const action = actions[axis * 2 + side];
            const prefix = Math.ceil(Math.random() * Math.floor(this.cube.order / 2));
            if (prefix !== 1) {
                exp.push(prefix);
            }
            exp.push(action);
            const suffix = Math.random();
            if (suffix < 0.4) {
                exp.push("2");
            }
            else if (suffix < 0.7) {
                exp.push("'");
            }
            exps.push(exp.join(""));
            last = axis;
        }
        result = exps.join(" ");
        return result;
    }
    get length() {
        return this.queue.length;
    }
    finish() {
        while (this.queue.length > 0) {
            tweener.finish();
        }
        tweener.finish();
    }
    setup(exp, reverse = false, times = 1) {
        this.finish();
        this.cube.reset();
        const node = new TwistNode(exp, reverse, times);
        const list = node.parse();
        for (const action of list) {
            this.twist(action, true, true);
        }
        this.cube.dirty = true;
        this.cube.history.clear();
        this.cube.history.init = exp;
        this.cube.callback();
    }
    push(exp, reverse = false, times = 1) {
        const node = new TwistNode(exp, reverse, times);
        const list = node.parse();
        if (list.length == 0) {
            return;
        }
        for (const action of list) {
            this.queue.push(action);
        }
        this.update();
    }
    twist(action, fast, force) {
        let success = false;
        if (action.sign == "#") {
            this.setup("");
            return true;
        }
        if (action.sign == "*") {
            const exp = this.scrambler();
            this.setup(exp);
            return true;
        }
        if (action.sign == "." || action.sign == "~") {
            if (fast || force) {
                this.cube.callback();
                return true;
            }
            success = this.cube.lock("a", 1);
            if (success) {
                tweener.tween(0, 1, _group__WEBPACK_IMPORTED_MODULE_0__["default"].frames * action.times, (value) => {
                    if (value == 1) {
                        this.cube.unlock("a", 1);
                        this.cube.callback();
                        return true;
                    }
                    return false;
                });
            }
            return success;
        }
        if (action.sign == ";") {
            if (fast || force) {
                this.cube.callback();
                return true;
            }
            success = this.cube.lock("a", 1);
            if (success) {
                this.cube.unlock("a", 1);
                this.cube.callback();
            }
            return success;
        }
        const list = this.cube.table.convert(action);
        if (list.length == 0) {
            return true;
        }
        for (const rotate of list) {
            success = rotate.group.twist((Math.PI / 2) * rotate.twist, fast);
            while (!success && force) {
                tweener.finish();
                success = rotate.group.twist((Math.PI / 2) * rotate.twist, fast);
            }
        }
        if (success) {
            this.cube.record(action);
        }
        return success;
    }
    undo() {
        if (this.cube.history.length == 0) {
            return;
        }
        const last = this.cube.history.last;
        const reverse = new TwistAction(last.sign, !last.reverse, 1);
        this.twist(reverse, false, true);
    }
}


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
/* harmony export */   "cubelet_basics": () => (/* binding */ cubelet_basics),
/* harmony export */   "cubelet_lambers": () => (/* binding */ cubelet_lambers),
/* harmony export */   "cubelet_core": () => (/* binding */ cubelet_core),
/* harmony export */   "cubelet_trans": () => (/* binding */ cubelet_trans),
/* harmony export */   "cubelet_sticker": () => (/* binding */ cubelet_sticker),
/* harmony export */   "cubelet_mirror": () => (/* binding */ cubelet_mirror)
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
const cubelet_basics = (() => {
    const result = {};
    for (const key in cubelet_colors) {
        result[key] = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: cubelet_colors[key] });
    }
    return result;
})();
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
const cubelet_trans = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
    color: cubelet_colors.gray,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
});
const cubelet_sticker = new _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Sticker(cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._edge_width, cubelet_defs._sticker_depth, false);
const cubelet_mirror = new _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Mirror(cubelet_defs.size - 2 * cubelet_defs._border_width - cubelet_defs._sticker_depth);


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
/* harmony export */   "Sticker": () => (/* binding */ Sticker),
/* harmony export */   "Mirror": () => (/* binding */ Mirror)
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
    constructor(size, depth, arrow) {
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
        if (arrow) {
            const h = size * 0.6;
            const w = h * 0.8;
            const arrow = new three__WEBPACK_IMPORTED_MODULE_0__.Path();
            arrow.moveTo(0, h);
            arrow.lineTo(-w, 0);
            arrow.lineTo(-w / 2, 0);
            arrow.lineTo(-w / 2, -h);
            arrow.lineTo(w / 2, -h);
            arrow.lineTo(w / 2, 0);
            arrow.lineTo(w, 0);
            arrow.closePath();
            shape.holes.push(arrow);
        }
        super(shape, { bevelEnabled: false, depth: depth });
    }
}
class Mirror extends three__WEBPACK_IMPORTED_MODULE_0__.ShapeGeometry {
    constructor(size) {
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
        super(shape);
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
        this.renderer.render(this.world.scene, this.world.camera);
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
        this.scale = 1;
        this.perspective = 9;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RnQztBQUN6QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xELGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw2QkFBNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFEQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7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RUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmVsZXQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2dyb3VwLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9oaXN0b3J5LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9pbnRlcmFjdG9yLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS90d2lzdGVyLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlscy50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdXRpbHNfaW50ZXJuYWwudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3ZpZXdwb3J0LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS93b3JsZC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8di1hcHA+XFxuICAgIDx2aWV3cG9ydCByZWY9XFxcInZpZXdwb3J0XFxcIj48L3ZpZXdwb3J0Plxcbjwvdi1hcHA+XFxuXCIiLCJpbXBvcnQgQ3ViZUdyb3VwIGZyb20gXCIuL2dyb3VwXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IFR3aXN0QWN0aW9uLCB0d2VlbmVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2RlZnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGNsYXNzIEhvbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih3b3JsZCkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgdGhpcy5yYXkgPSBuZXcgVEhSRUUuUmF5KCk7XG4gICAgICAgIHRoaXMuZG93biA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLm1vdmUgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBIb2xkZXIoKTtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICB0aGlzLnBsYW5lcyA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX2xvY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbnNpdGl2aXR5ID0gMC41O1xuICAgICAgICB0aGlzLnRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ob3ZlciA9IC0xO1xuICAgICAgICB0aGlzLmludGVyYWN0ID0gKGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaHN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24ueCA9IGFjdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24ueSA9IGFjdGlvbi55O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVEb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hjYW5jZWxcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW91dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XG4gICAgICAgIHRoaXMudGFwcyA9IFtdO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgZ2V0IGxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NrO1xuICAgIH1cbiAgICBzZXQgbG9jayh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2xvY2sgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpc2FibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMuY29udGluZ2xlICsgdGhpcy5hbmdsZTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXAuYW5nbGUgIT0gYW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSB0aGlzLmdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNbMF1dO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSBncm91cC5hbmdsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2goKSB7XG4gICAgICAgIGNvbnN0IHBsYW5lID0gdGhpcy5ob2xkZXIucGxhbmUubm9ybWFsO1xuICAgICAgICBjb25zdCBmaW5nZXIgPSB0aGlzLmhvbGRlci52ZWN0b3I7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ob2xkZXIuaW5kZXg7XG4gICAgICAgIGNvbnN0IG9yZGVyID0gdGhpcy53b3JsZC5jdWJlLm9yZGVyO1xuICAgICAgICBmb3IgKGNvbnN0IGF4aXMgb2YgW1wieFwiLCBcInlcIiwgXCJ6XCJdKSB7XG4gICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBDdWJlR3JvdXAuQVhJU19WRUNUT1JbYXhpc107XG4gICAgICAgICAgICBpZiAodmVjdG9yLmRvdChwbGFuZSkgPT09IDAgJiYgdmVjdG9yLmRvdChmaW5nZXIpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gMDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gaW5kZXggJSBvcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKChpbmRleCAlIChvcmRlciAqIG9yZGVyKSkgLyBvcmRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcihpbmRleCAvIChvcmRlciAqIG9yZGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbYXhpc11bbGF5ZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpbnRlcnNlY3QocG9pbnQsIHBsYW5lKSB7XG4gICAgICAgIGNvbnN0IHggPSAocG9pbnQueCAvIHRoaXMud29ybGQud2lkdGgpICogMiAtIDE7XG4gICAgICAgIGNvbnN0IHkgPSAtKHBvaW50LnkgLyB0aGlzLndvcmxkLmhlaWdodCkgKiAyICsgMTtcbiAgICAgICAgdGhpcy5yYXkub3JpZ2luLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHRoaXMucmF5LmRpcmVjdGlvbi5zZXQoeCwgeSwgMC41KS51bnByb2plY3QodGhpcy53b3JsZC5jYW1lcmEpLnN1Yih0aGlzLnJheS5vcmlnaW4pLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMud29ybGQuc2NlbmUubWF0cml4KTtcbiAgICAgICAgdGhpcy5tYXRyaXguaW52ZXJ0KCk7XG4gICAgICAgIHRoaXMucmF5LmFwcGx5TWF0cml4NCh0aGlzLm1hdHJpeCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBUSFJFRS5WZWN0b3IzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFuZGxlRG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nIHx8IHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICAgICAgdGhpcy5wbGFuZXMuZm9yRWFjaCgocGxhbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCBwbGFuZSk7XG4gICAgICAgICAgICBpZiAocG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvaW50LnggLyBjdWJlbGV0X2RlZnMuc2l6ZSAvIDM7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb2ludC55IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xuICAgICAgICAgICAgICAgIGxldCB6ID0gcG9pbnQueiAvIGN1YmVsZXRfZGVmcy5zaXplIC8gMztcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoeCkgPD0gMC41MDAxICYmIE1hdGguYWJzKHkpIDw9IDAuNTAwMSAmJiBNYXRoLmFicyh6KSA8PSAwLjUwMDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IE1hdGgucG93KHBvaW50LnggLSB0aGlzLnJheS5vcmlnaW4ueCwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocG9pbnQueSAtIHRoaXMucmF5Lm9yaWdpbi55LCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhwb2ludC56IC0gdGhpcy5yYXkub3JpZ2luLnosIDIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPT0gMCB8fCBkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnBsYW5lID0gcGxhbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlciA9IHRoaXMud29ybGQuY3ViZS5vcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHggKyAwLjUpICogb3JkZXIpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ob3JkZXIgLSAxLCBNYXRoLmZsb29yKCh5ICsgMC41KSAqIG9yZGVyKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeiA9IE1hdGgubWF4KDAsIE1hdGgubWluKG9yZGVyIC0gMSwgTWF0aC5mbG9vcigoeiArIDAuNSkgKiBvcmRlcikpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0geiAqIG9yZGVyICogb3JkZXIgKyB5ICogb3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgaGFuZGxlTW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBkeCA9IHRoaXMubW92ZS54IC0gdGhpcy5kb3duLng7XG4gICAgICAgICAgICBjb25zdCBkeSA9IHRoaXMubW92ZS55IC0gdGhpcy5kb3duLnk7XG4gICAgICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIGlmIChNYXRoLm1pbih0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodCkgLyBkID4gMTI4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkZXIuaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGR4ICogZHggPiBkeSAqIGR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZiA9IHRoaXMud29ybGQud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZiA9IG5ldyBUSFJFRS5WZWN0b3IzKC0oY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIsIDAsIChjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIGxmLmFwcGx5TWF0cml4NCh0aGlzLndvcmxkLnNjZW5lLm1hdHJpeCkucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGx4ID0gTWF0aC5yb3VuZChsZi54ICogaGFsZiArIGhhbGYpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZiA9IG5ldyBUSFJFRS5WZWN0b3IzKChjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiwgMCwgKGN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmYuYXBwbHlNYXRyaXg0KHRoaXMud29ybGQuc2NlbmUubWF0cml4KS5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnggPSBNYXRoLnJvdW5kKHJmLnggKiBoYWxmICsgaGFsZik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZi56IDwgcmYueikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgbHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInonXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvd24ueCA8IHJ4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5nbGUgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSBncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGluZ2xlLmFkZChncm91cC5hbmdsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250aW5nbGUuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLnZlY3Rvci54O1xuICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy52ZWN0b3IueTtcbiAgICAgICAgICAgICAgICBsZXQgeiA9IHRoaXMudmVjdG9yLno7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5hYnMoeCksIE1hdGguYWJzKHkpLCBNYXRoLmFicyh6KSk7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguYWJzKHgpID09PSBtYXggPyB4IDogMDtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5hYnMoeSkgPT09IG1heCA/IHkgOiAwO1xuICAgICAgICAgICAgICAgIHogPSBNYXRoLmFicyh6KSA9PT0gbWF4ID8geiA6IDA7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3Iuc2V0KHgsIHksIHopO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnZlY3Rvci5jb3B5KHRoaXMudmVjdG9yLm11bHRpcGx5KHRoaXMudmVjdG9yKS5ub3JtYWxpemUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IHRoaXMubWF0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdGhpcy5ncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB0aGlzLmdyb3VwLmFuZ2xlO1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHRoaXMuaG9sZGVyLnBsYW5lLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLm11bHRpcGx5U2NhbGFyKHRoaXMudmVjdG9yLnggKyB0aGlzLnZlY3Rvci55ICsgdGhpcy52ZWN0b3Iueik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHRoaXMuaG9sZGVyLnBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHRoaXMuaG9sZGVyLnBsYW5lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvci5zdWJWZWN0b3JzKGVuZCwgc3RhcnQpLm11bHRpcGx5KHRoaXMuaG9sZGVyLnZlY3Rvcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVjdG9yID0gQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuZ3JvdXAuYXhpc107XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9XG4gICAgICAgICAgICAgICAgICAgICgoLSh0aGlzLnZlY3Rvci54ICsgdGhpcy52ZWN0b3IueSArIHRoaXMudmVjdG9yLnopICogKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3IueikpIC8gY3ViZWxldF9kZWZzLnNpemUpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguUEkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gdGhpcy5tb3ZlLnggLSB0aGlzLmRvd24ueDtcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IHRoaXMubW92ZS55IC0gdGhpcy5kb3duLnk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR4IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR5IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoZHkgLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKiBNYXRoLlBJICogdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAoLWR5IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVVwKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgbGV0IGZhY2UgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmhvbGRlci5wbGFuZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMF06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLlI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMV06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLlU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMl06XG4gICAgICAgICAgICAgICAgICAgIGZhY2UgPSBGYWNlLkY7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB0YXAgb2YgdGhpcy50YXBzKSB7XG4gICAgICAgICAgICAgICAgdGFwKHRoaXMuaG9sZGVyLmluZGV4LCBmYWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2NrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlKSA8IE1hdGguUEkgLyA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAoTWF0aC5hYnMoYW5nbGUpIC8gKHRpY2sgLSB0aGlzLnRpY2spKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGVlZCA+IDAuMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSA9PSAwID8gMCA6ICgoYW5nbGUgLyBNYXRoLmFicyhhbmdsZSkpICogTWF0aC5QSSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNvbnRpbmdsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuZ2xlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChhbmdsZSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lcyA9IE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2ZXJzZSA9IHRpbWVzIDwgMDtcbiAgICAgICAgICAgICAgICAgICAgdGltZXMgPSBNYXRoLmFicyh0aW1lcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuY3ViZS5yZWNvcmQobmV3IFR3aXN0QWN0aW9uKHRoaXMuZ3JvdXAubmFtZSwgcmV2ZXJzZSwgdGltZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnNlID0gdGltZXMgPCAwO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IE1hdGguYWJzKHRpbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5jdWJlLnJlY29yZChuZXcgVHdpc3RBY3Rpb24odGhpcy5heGlzLCByZXZlcnNlLCB0aW1lcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ3ViZWxldCBmcm9tIFwiLi9jdWJlbGV0XCI7XG5pbXBvcnQgeyBHcm91cFRhYmxlIH0gZnJvbSBcIi4vZ3JvdXBcIjtcbmltcG9ydCBUd2lzdGVyLCB7IHR3ZWVuZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgSGlzdG9yeSBmcm9tIFwiLi9oaXN0b3J5XCI7XG5pbXBvcnQgeyBGYWNlIH0gZnJvbSBcIi4vdXRpbHNfaW50ZXJuYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuaW5pdGlhbHMgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy50d2lzdGVyID0gbmV3IFR3aXN0ZXIodGhpcyk7XG4gICAgICAgIGNvbnN0IG9yZGVyID0gMztcbiAgICAgICAgdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgICAgICB0aGlzLnNjYWxlLnNldCgzIC8gb3JkZXIsIDMgLyBvcmRlciwgMyAvIG9yZGVyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlciAqIG9yZGVyICogb3JkZXI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFscy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2NrcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwieVwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInpcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBIaXN0b3J5KCk7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxvY2sgb2YgdGhpcy5sb2Nrcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKGxvY2suc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKChfYSA9IHRoaXMubG9ja3MuZ2V0KFwiYVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhcygxKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBpZiAodG1wID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbG9jayBvZiB0aGlzLmxvY2tzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBpZiAobG9jayAhPSB0bXAgJiYgbG9jay5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0bXAuYWRkKGxheWVyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHVubG9jayhheGlzLCBsYXllcikge1xuICAgICAgICBjb25zdCB0bXAgPSB0aGlzLmxvY2tzLmdldChheGlzKTtcbiAgICAgICAgdG1wID09PSBudWxsIHx8IHRtcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdG1wLmRlbGV0ZShsYXllcik7XG4gICAgfVxuICAgIHJlY29yZChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnJlY29yZChhY3Rpb24pO1xuICAgIH1cbiAgICBnZXQgY29tcGxldGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlID0gW0ZhY2UuVSwgRmFjZS5ELCBGYWNlLkwsIEZhY2UuUiwgRmFjZS5GLCBGYWNlLkJdLmV2ZXJ5KChmYWNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IHRoaXMudGFibGUuZmFjZShGYWNlW2ZhY2VdKTtcbiAgICAgICAgICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2dyb3VwLmluZGljZXNbMF1dO1xuICAgICAgICAgICAgY29uc3QgY29sb3IgPSBjdWJlbGV0LmdldEZhY2UoZmFjZSk7XG4gICAgICAgICAgICBjb25zdCBzYW1lID0gZ3JvdXAuaW5kaWNlcy5ldmVyeSgoaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaWR4XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3IgPT0gY3ViZWxldC5nZXRGYWNlKGZhY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2FtZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb21wbGV0ZTtcbiAgICB9XG4gICAgaW5kZXgodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbHNbdmFsdWVdLmluZGV4O1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICAgICAgZm9yIChjb25zdCBjdWJlbGV0IG9mIHRoaXMuY3ViZWxldHMpIHtcbiAgICAgICAgICAgIGN1YmVsZXQuc2V0Um90YXRpb25Gcm9tRXVsZXIobmV3IFRIUkVFLkV1bGVyKDAsIDAsIDApKTtcbiAgICAgICAgICAgIGN1YmVsZXQuaW5kZXggPSBjdWJlbGV0LmluaXRpYWw7XG4gICAgICAgICAgICBjdWJlbGV0LnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZWxldHMuc29ydCgobGVmdCwgcmlnaHQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGljayhpbmRleCwgZmFjZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuaW5pdGlhbHNbaW5kZXhdO1xuICAgICAgICBpZiAoIWN1YmVsZXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBjdWJlbGV0IGluZGV4OiBcIiArIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBjdWJlbGV0LnN0aWNrKGZhY2UsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHN0cmlwKHN0cmlwKSB7XG4gICAgICAgIGZvciAoY29uc3QgZmFjZSBvZiBbRmFjZS5MLCBGYWNlLlIsIEZhY2UuRCwgRmFjZS5VLCBGYWNlLkIsIEZhY2UuRl0pIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IEZhY2VbZmFjZV07XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IHRoaXMudGFibGUuZmFjZShrZXkpO1xuICAgICAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGdyb3VwLmluZGljZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxzW2luZGV4XS5zdGljayhmYWNlLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ZXMgPSBzdHJpcFtrZXldO1xuICAgICAgICAgICAgaWYgKGluZGV4ZXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIGluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5pbml0aWFsc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKCFjdWJlbGV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBjdWJlbGV0IGluZGV4OiBcIiArIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGljayhmYWNlLCBcInJlbW92ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIHkgPSB0aGlzLm9yZGVyIC0gMTtcbiAgICAgICAgZm9yICh6ID0gMDsgeiA8IHRoaXMub3JkZXI7IHorKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMub3JkZXI7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5VKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IHRoaXMub3JkZXIgLSAxO1xuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IHRoaXMub3JkZXIgLSAxOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5SKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IHRoaXMub3JkZXIgLSAxO1xuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLm9yZGVyOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yKEZhY2UuRik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHkgPSAwO1xuICAgICAgICBmb3IgKHogPSB0aGlzLm9yZGVyIC0gMTsgeiA+PSAwOyB6LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLm9yZGVyOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yKEZhY2UuRCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHggPSAwO1xuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDA7IHogPCB0aGlzLm9yZGVyOyB6KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yKEZhY2UuTCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHogPSAwO1xuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IHRoaXMub3JkZXIgLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5CKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGN1YmVsZXRfZGVmcywgY3ViZWxldF9jb3JlLCBjdWJlbGV0X2xhbWJlcnMsIGN1YmVsZXRfYmFzaWNzLCBjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbWlycm9yIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlbGV0IGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3ZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMuX3F1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgICB0aGlzLm9yZGVyID0gY3ViZWxldF9kZWZzLm9yZGVyO1xuICAgICAgICB0aGlzLmluaXRpYWwgPSBpbmRleDtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnN0aWNrZXJzID0gW107XG4gICAgICAgIHRoaXMubWlycm9ycyA9IFtdO1xuICAgICAgICBjb25zdCBoYWxmID0gKHRoaXMub3JkZXIgLSAxKSAvIDI7XG4gICAgICAgIHRoaXMubGFtYmVydHMgPSBbXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IC1oYWxmID8gY3ViZWxldF9sYW1iZXJzLkwgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IGhhbGYgPyBjdWJlbGV0X2xhbWJlcnMuUiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnkgPT0gLWhhbGYgPyBjdWJlbGV0X2xhbWJlcnMuRCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnkgPT0gaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5VIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueiA9PSAtaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5CIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueiA9PSBoYWxmID8gY3ViZWxldF9sYW1iZXJzLkYgOiB1bmRlZmluZWQsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuYmFzaWNzID0gW1xuICAgICAgICAgICAgdGhpcy52ZWN0b3IueCA9PSAtaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkwgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IGhhbGYgPyBjdWJlbGV0X2Jhc2ljcy5SIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueSA9PSAtaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci55ID09IGhhbGYgPyBjdWJlbGV0X2Jhc2ljcy5VIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueiA9PSAtaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci56ID09IGhhbGYgPyBjdWJlbGV0X2Jhc2ljcy5GIDogdW5kZWZpbmVkLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9mcmFtZSwgY3ViZWxldF9jb3JlKTtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5mcmFtZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYW1iZXJ0c1tpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgdGhpcy5sYW1iZXJ0c1tpXSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5MOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnBvc2l0aW9uLnggPSAtY3ViZWxldF9kZWZzLnNpemUgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5SOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueSA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueCA9IGN1YmVsZXRfZGVmcy5zaXplIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEZhY2UuRDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnBvc2l0aW9uLnkgPSAtY3ViZWxldF9kZWZzLnNpemUgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5VOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnBvc2l0aW9uLnkgPSBjdWJlbGV0X2RlZnMuc2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLkI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi54ID0gTWF0aC5QSTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnBvc2l0aW9uLnogPSAtY3ViZWxldF9kZWZzLnNpemUgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5GOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueCA9IDIgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueiA9IGN1YmVsZXRfZGVmcy5zaXplIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKF9zdGlja2VyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0aWNrZXJzW2ldID0gX3N0aWNrZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgX21pcnJvciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfbWlycm9yLCB0aGlzLmJhc2ljc1tpXSk7XG4gICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi54ID0gX3N0aWNrZXIucm90YXRpb24ueCA9PSAwID8gMCA6IF9zdGlja2VyLnJvdGF0aW9uLnggKyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIF9taXJyb3Iucm90YXRpb24ueSA9IF9zdGlja2VyLnJvdGF0aW9uLnkgPT0gMCA/IDAgOiBfc3RpY2tlci5yb3RhdGlvbi55ICsgTWF0aC5QSTtcbiAgICAgICAgICAgICAgICBfbWlycm9yLnJvdGF0aW9uLnogPSBfc3RpY2tlci5yb3RhdGlvbi56ID09IDAgPyAwIDogX3N0aWNrZXIucm90YXRpb24ueiArIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgaWYgKF9taXJyb3Iucm90YXRpb24ueCArIF9taXJyb3Iucm90YXRpb24ueSArIF9taXJyb3Iucm90YXRpb24ueiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF9taXJyb3Iucm90YXRpb24ueSA9IE1hdGguUEk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9taXJyb3IucG9zaXRpb24ueCA9IF9zdGlja2VyLnBvc2l0aW9uLnggKiAodGhpcy5vcmRlciArIDEpO1xuICAgICAgICAgICAgICAgIF9taXJyb3IucG9zaXRpb24ueSA9IF9zdGlja2VyLnBvc2l0aW9uLnkgKiAodGhpcy5vcmRlciArIDEpO1xuICAgICAgICAgICAgICAgIF9taXJyb3IucG9zaXRpb24ueiA9IF9zdGlja2VyLnBvc2l0aW9uLnogKiAodGhpcy5vcmRlciArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMubWlycm9yc1tpXSA9IF9taXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGhhbGYgPSAodGhpcy5vcmRlciAtIDEpIC8gMjtcbiAgICAgICAgbGV0IHggPSBNYXRoLnJvdW5kKHZlY3Rvci54ICogMikgLyAyO1xuICAgICAgICBsZXQgeSA9IE1hdGgucm91bmQodmVjdG9yLnkgKiAyKSAvIDI7XG4gICAgICAgIGxldCB6ID0gTWF0aC5yb3VuZCh2ZWN0b3IueiAqIDIpIC8gMjtcbiAgICAgICAgdGhpcy5fdmVjdG9yLnNldCh4LCB5LCB6KTtcbiAgICAgICAgeCA9IE1hdGgucm91bmQoeCArIGhhbGYpO1xuICAgICAgICB5ID0gTWF0aC5yb3VuZCh5ICsgaGFsZik7XG4gICAgICAgIHogPSBNYXRoLnJvdW5kKHogKyBoYWxmKTtcbiAgICAgICAgdGhpcy5faW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLng7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLnk7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueiA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLno7XG4gICAgfVxuICAgIGdldCB2ZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZWN0b3I7XG4gICAgfVxuICAgIHNldCBpbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBoYWxmID0gKHRoaXMub3JkZXIgLSAxKSAvIDI7XG4gICAgICAgIGNvbnN0IF94ID0gKGluZGV4ICUgdGhpcy5vcmRlcikgLSBoYWxmO1xuICAgICAgICBjb25zdCBfeSA9IE1hdGguZmxvb3IoKGluZGV4ICUgKHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyKSkgLyB0aGlzLm9yZGVyKSAtIGhhbGY7XG4gICAgICAgIGNvbnN0IF96ID0gTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLm9yZGVyICogdGhpcy5vcmRlcikpIC0gaGFsZjtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyhfeCwgX3ksIF96KTtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXg7XG4gICAgfVxuICAgIHN0aWNrKGZhY2UsIHZhbHVlKSB7XG4gICAgICAgIGxldCBsYW1iZXI7XG4gICAgICAgIGxldCBiYXNpYztcbiAgICAgICAgaWYgKHRoaXMuc3RpY2tlcnNbZmFjZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInJlbW92ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnN0aWNrZXJzW2ZhY2VdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubWlycm9yc1tmYWNlXS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGlja2Vyc1tmYWNlXS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5taXJyb3JzW2ZhY2VdLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGFtYmVyID0gY3ViZWxldF9sYW1iZXJzW3ZhbHVlXTtcbiAgICAgICAgICAgIGJhc2ljID0gY3ViZWxldF9iYXNpY3NbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGFtYmVyID0gdGhpcy5sYW1iZXJ0c1tmYWNlXTtcbiAgICAgICAgICAgIGJhc2ljID0gdGhpcy5iYXNpY3NbZmFjZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhbWJlciA9PT0gdW5kZWZpbmVkIHx8IGJhc2ljID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0aWNrZXJzW2ZhY2VdLm1hdGVyaWFsID0gbGFtYmVyO1xuICAgICAgICBpZiAodGhpcy5taXJyb3JzW2ZhY2VdIGluc3RhbmNlb2YgVEhSRUUuTWVzaCkge1xuICAgICAgICAgICAgdGhpcy5taXJyb3JzW2ZhY2VdLm1hdGVyaWFsID0gYmFzaWM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RmFjZShmYWNlKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XG4gICAgICAgIHN3aXRjaCAoZmFjZSkge1xuICAgICAgICAgICAgY2FzZSBGYWNlLkw6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueCA9IC0xO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGYWNlLlI6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueCA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZhY2UuRDpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gLTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZhY2UuVTpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRmFjZS5COlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnogPSAtMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRmFjZS5GOlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnogPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9xdWF0ZXJuaW9uLmNvcHkodGhpcy5xdWF0ZXJuaW9uKTtcbiAgICAgICAgcG9zaXRpb24uYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX3F1YXRlcm5pb24uaW52ZXJ0KCkpO1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZChwb3NpdGlvbi54KTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQocG9zaXRpb24ueSk7XG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnJvdW5kKHBvc2l0aW9uLnopO1xuICAgICAgICBsZXQgY29sb3IgPSAwO1xuICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5MO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHggPiAwKSB7XG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuUjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5IDwgMCkge1xuICAgICAgICAgICAgY29sb3IgPSBGYWNlLkQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeSA+IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5VO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHogPCAwKSB7XG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuQjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh6ID4gMCkge1xuICAgICAgICAgICAgY29sb3IgPSBGYWNlLkY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbiAgICBnZXRDb2xvcihmYWNlKSB7XG4gICAgICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLnN0aWNrZXJzW3RoaXMuZ2V0RmFjZShmYWNlKV07XG4gICAgICAgIGlmICghc3RpY2tlciB8fCAhc3RpY2tlci52aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI/XCI7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChzdGlja2VyLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5MOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkxcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJGXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5COlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkJcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiVVwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJEXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiP1wiO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgdHdlZW5lciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVHcm91cCBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlLCBheGlzLCBsYXllcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50d2VlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jdWJlID0gY3ViZTtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5heGlzID0gYXhpcztcbiAgICAgICAgdGhpcy5sYXllciA9IGxheWVyO1xuICAgICAgICBjb25zdCBoYWxmID0gKHRoaXMuY3ViZS5vcmRlciAtIDEpIC8gMjtcbiAgICAgICAgY29uc3QgdGFibGUgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogXCJSXCIsXG4gICAgICAgICAgICAgICAgeTogXCJVXCIsXG4gICAgICAgICAgICAgICAgejogXCJGXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IFwiTCdcIixcbiAgICAgICAgICAgICAgICB5OiBcIkQnXCIsXG4gICAgICAgICAgICAgICAgejogXCJCJ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiBcIk0nXCIsXG4gICAgICAgICAgICAgICAgeTogXCJFJ1wiLFxuICAgICAgICAgICAgICAgIHo6IFwiU1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHR5cGUgPSAwO1xuICAgICAgICBpZiAodGhpcy5sYXllciA9PT0gaGFsZikge1xuICAgICAgICAgICAgbGF5ZXIgPSAwO1xuICAgICAgICAgICAgdHlwZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5sYXllciA8IGhhbGYpIHtcbiAgICAgICAgICAgIHR5cGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLmN1YmUub3JkZXIgLSBsYXllciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHRhYmxlW3R5cGVdW3RoaXMuYXhpc107XG4gICAgICAgIHRoaXMubmFtZSA9IChsYXllciA9PT0gMCA/IFwiXCIgOiBTdHJpbmcobGF5ZXIgKyAxKSkgKyBuYW1lO1xuICAgIH1cbiAgICBzZXQgYW5nbGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGhpcy5zZXRSb3RhdGlvbkZyb21BeGlzQW5nbGUoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuX2FuZ2xlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5nbGU7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMudHdlZW4uZW5kO1xuICAgICAgICAgICAgdHdlZW5lci5jYW5jZWwodGhpcy50d2Vlbik7XG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdlZW4uZW5kIC0gdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKHRoaXMudHdlZW4pO1xuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaG9sZCgpIHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLmluZGljZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmUuY3ViZWxldHNbaV07XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLmFkZCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRyYWcoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAtdGhpcy5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ob2xkKCk7XG4gICAgfVxuICAgIGRyb3AoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHMucG9wKCk7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBjdWJlbGV0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLmFkZChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5jdWJlbGV0c1tjdWJlbGV0LmluZGV4XSA9IGN1YmVsZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY3ViZS51bmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcbiAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHR3aXN0KGFuZ2xlLCBmYXN0KSB7XG4gICAgICAgIGlmICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuaG9sZCgpO1xuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICBpZiAoZmFzdCkge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlbHRhID0gYW5nbGUgLSB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSA8IDFlLTYpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguYWJzKGRlbHRhKSAvIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IEN1YmVHcm91cC5mcmFtZXMgKiAoMiAtIDIgLyAoZCArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSB0d2VlbmVyLnR3ZWVuKHRoaXMuYW5nbGUsIGFuZ2xlLCBkdXJhdGlvbiwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKEN1YmVHcm91cC5BWElTX1ZFQ1RPUlt0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShDdWJlR3JvdXAuQVhJU19WRUNUT1JbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuQ3ViZUdyb3VwLmZyYW1lcyA9IDIwO1xuQ3ViZUdyb3VwLkFYSVNfVkVDVE9SID0ge1xuICAgIGE6IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLFxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcbiAgICB5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksXG4gICAgejogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxufTtcbmV4cG9ydCBjbGFzcyBSb3RhdGVBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGdyb3VwLCB0d2lzdCkge1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIHRoaXMudHdpc3QgPSB0d2lzdDtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgR3JvdXBUYWJsZSB7XG4gICAgY29uc3RydWN0b3IoY3ViZSkge1xuICAgICAgICB0aGlzLm9yZGVyID0gY3ViZS5vcmRlcjtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbGF5ZXIgPSAwOyBsYXllciA8IHRoaXMub3JkZXI7IGxheWVyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gbmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBsYXllcik7XG4gICAgICAgICAgICAgICAgbGlzdFtsYXllcl0gPSBnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ncm91cHNbYXhpc10gPSBsaXN0O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY3ViZWxldCBvZiBjdWJlLmluaXRpYWxzKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGN1YmVsZXQuaW5pdGlhbDtcbiAgICAgICAgICAgIGxldCBheGlzO1xuICAgICAgICAgICAgbGV0IGxheWVyO1xuICAgICAgICAgICAgbGV0IGdyb3VwO1xuICAgICAgICAgICAgYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgbGF5ZXIgPSBpbmRleCAlIHRoaXMub3JkZXI7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW2F4aXNdW2xheWVyXTtcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcbiAgICAgICAgICAgIGF4aXMgPSBcInlcIjtcbiAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcigoaW5kZXggJSAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKSAvIHRoaXMub3JkZXIpO1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XG4gICAgICAgICAgICBncm91cC5pbmRpY2VzLnB1c2goY3ViZWxldC5pbmRleCk7XG4gICAgICAgICAgICBheGlzID0gXCJ6XCI7XG4gICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoaW5kZXggLyAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKTtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbYXhpc11bbGF5ZXJdO1xuICAgICAgICAgICAgZ3JvdXAuaW5kaWNlcy5wdXNoKGN1YmVsZXQuaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZhY2UoZmFjZSkge1xuICAgICAgICBsZXQgbGF5ZXIgPSAwO1xuICAgICAgICBsZXQgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbZmFjZV07XG4gICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcbiAgICB9XG4gICAgY29udmVydChhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBzaWduID0gYWN0aW9uLnNpZ247XG4gICAgICAgIGlmIChzaWduLm1hdGNoKC8uW1d3XS8pKSB7XG4gICAgICAgICAgICBzaWduID0gc2lnbi50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCJ3XCIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvW1hZWl0vLnRlc3Qoc2lnbikpIHtcbiAgICAgICAgICAgIHNpZ24gPSBzaWduLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGdyb3VwO1xuICAgICAgICBsZXQgdHdpc3QgPSBhY3Rpb24udGltZXMgKiAoYWN0aW9uLnJldmVyc2UgPyAtMSA6IDEpO1xuICAgICAgICBsZXQgbGF5ZXI7XG4gICAgICAgIGlmIChzaWduLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgc3dpdGNoIChzaWduKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxheWVyID0gMDsgbGF5ZXIgPCB0aGlzLm9yZGVyOyBsYXllcisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUlwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJVXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIkZcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiTFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIkJcIjpcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtzaWduLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdpc3QgPSAtdHdpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJmXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImxcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgICAgICAgICAgICAgIGxheWVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbc2lnbi50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ID0gLXR3aXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IHNpZ25bMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IHRoaXMub3JkZXIgLSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJTXCI6XG4gICAgICAgICAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcigodGhpcy5vcmRlciAtIDEpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSBHcm91cFRhYmxlLkFYSVNfTUFQW3NpZ24udG9VcHBlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSBzaWduWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmRlciAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllciArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtzaWduLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdpc3QgPSAtdHdpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYXllciA9IDE7IGxheWVyIDwgdGhpcy5vcmRlciAtIDE7IGxheWVyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHNpZ24ubWF0Y2goLyhbMDEyMzQ1Njc4OV0qKSgtPykoWzAxMjM0NTY3ODldKikoW2xydWRmYl0pL2kpO1xuICAgICAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZnJvbSA9IE51bWJlcihsaXN0WzFdKTtcbiAgICAgICAgICAgIGxldCB0byA9IE51bWJlcihsaXN0WzNdKTtcbiAgICAgICAgICAgIGlmICh0byA9PT0gTmFOIHx8IHRvID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKC9bbHJ1ZGZiXS8udGVzdChsaXN0WzRdKSkge1xuICAgICAgICAgICAgICAgICAgICB0byA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0byA9IGZyb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZyb20gPiB0aGlzLm9yZGVyKSB7XG4gICAgICAgICAgICAgICAgZnJvbSA9IHRoaXMub3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG8gPiB0aGlzLm9yZGVyKSB7XG4gICAgICAgICAgICAgICAgdG8gPSB0aGlzLm9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbbGlzdFs0XS50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdHdpc3QgPSAtdHdpc3Q7XG4gICAgICAgICAgICAgICAgc2lnbiA9IHNpZ25bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcm9tID0gdGhpcy5vcmRlciAtIGZyb20gKyAxO1xuICAgICAgICAgICAgICAgIHRvID0gdGhpcy5vcmRlciAtIHRvICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcm9tID4gdG8pIHtcbiAgICAgICAgICAgICAgICBbZnJvbSwgdG9dID0gW3RvLCBmcm9tXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGxheWVyID0gZnJvbSAtIDE7IGxheWVyIDwgdG87IGxheWVyKyspIHtcbiAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuR3JvdXBUYWJsZS5BWElTX01BUCA9IHtcbiAgICBSOiBcInhcIixcbiAgICBMOiBcIi14XCIsXG4gICAgVTogXCJ5XCIsXG4gICAgRDogXCIteVwiLFxuICAgIEY6IFwielwiLFxuICAgIEI6IFwiLXpcIixcbiAgICBNOiBcIi14XCIsXG4gICAgRTogXCIteVwiLFxuICAgIFM6IFwielwiLFxufTtcbiIsImltcG9ydCB7IFR3aXN0QWN0aW9uIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGlzdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXQgPSBcIlwiO1xuICAgICAgICB0aGlzLmV4cCA9IFwiXCI7XG4gICAgfVxuICAgIHJlY29yZChyYXcpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IFR3aXN0QWN0aW9uKHJhdy5zaWduLCByYXcucmV2ZXJzZSwgcmF3LnRpbWVzKTtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgYWN0aW9uLnRpbWVzID0gYWN0aW9uLnRpbWVzICUgNDtcbiAgICAgICAgICAgIGlmIChhY3Rpb24udGltZXMgIT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5leHAgPSB0aGlzLmV4cCArIFwiIFwiICsgYWN0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdC5zaWduID09IGFjdGlvbi5zaWduKSB7XG4gICAgICAgICAgICAgICAgbGFzdC50aW1lcyA9IGxhc3QudGltZXMgKyBhY3Rpb24udGltZXMgKiAobGFzdC5yZXZlcnNlID09IGFjdGlvbi5yZXZlcnNlID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdC50aW1lcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdC50aW1lcyA9IC1sYXN0LnRpbWVzO1xuICAgICAgICAgICAgICAgICAgICBsYXN0LnJldmVyc2UgPSAhbGFzdC5yZXZlcnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0LnRpbWVzID0gbGFzdC50aW1lcyAlIDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5leHAgPSB0aGlzLmV4cC5zdWJzdHJpbmcoMCwgdGhpcy5leHAubGFzdEluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdC50aW1lcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwID0gdGhpcy5leHAgKyBcIiBcIiArIGxhc3QudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cCA9IHRoaXMuZXhwICsgXCIgXCIgKyBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXQgPSBcIlwiO1xuICAgICAgICB0aGlzLmV4cCA9IFwiXCI7XG4gICAgfVxuICAgIGdldCBsYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XG4gICAgfVxuICAgIGdldCBtb3ZlcygpIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGNvbnN0IHR3aXN0IG9mIHRoaXMubGlzdCkge1xuICAgICAgICAgICAgaWYgKHR3aXN0LnNpZ24gPT0gXCJ4XCIgfHwgdHdpc3Quc2lnbiA9PSBcInlcIiB8fCB0d2lzdC5zaWduID09IFwielwiKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb20sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihcInRvdWNoZW5kXCIsIHRoaXMubGFzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGZpcnN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0aGlzLmRvbSB8fCAoKF9hID0gdGhpcy5sYXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWRlbnRpZmllcikgIT0gZmlyc3QuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnRhYkluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZmlyc3QuY2xpZW50WCAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIGZpcnN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoZW5kXCIgfHwgZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGNhbmNlbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW91c2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZG93blwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQgIT09IHRoaXMuZG9tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDdWJlR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcbmV4cG9ydCBjbGFzcyBUd2VlbiB7XG4gICAgY29uc3RydWN0b3IoYmVnaW4sIGVuZCwgZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMuZW5kKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZhbHVlKys7XG4gICAgICAgIGxldCBlbGFwc2VkID0gdGhpcy52YWx1ZSAvIHRoaXMuZHVyYXRpb247XG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuICAgICAgICBlbGFwc2VkID0gZWxhcHNlZCA8IDAgPyAwIDogZWxhcHNlZDtcbiAgICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgLSAxO1xuICAgICAgICBlbGFwc2VkID0gMSAtIGVsYXBzZWQgKiBlbGFwc2VkO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsYXBzZWQgPT0gMSA/IHRoaXMuZW5kIDogdGhpcy5iZWdpbiArICh0aGlzLmVuZCAtIHRoaXMuYmVnaW4pICogZWxhcHNlZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUd2VlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d2VlbnMgPSBbXTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR3ZWVucy5sZW5ndGg7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHR3ZWVuKGJlZ2luLCBlbmQsIGR1cmF0aW9uLCB1cGRhdGUpIHtcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oYmVnaW4sIGVuZCwgZHVyYXRpb24sIHVwZGF0ZSk7XG4gICAgICAgIHRoaXMudHdlZW5zLnB1c2godHdlZW4pO1xuICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdlZW5zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy50d2VlbnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMudHdlZW5zW2ldLnVwZGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaW5pc2godHdlZW4gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR3ZWVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdlZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdlZW5zW2ldID09IHR3ZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3ZWVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0d2VlbnMgPSB0aGlzLnR3ZWVucy5zcGxpY2UoMCwgdGhpcy50d2VlbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHdlZW4gb2YgdHdlZW5zKSB7XG4gICAgICAgICAgICAgICAgdHdlZW4uZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuY2VsKHR3ZWVuKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3ZWVuc1tpXSA9PSB0d2Vlbikge1xuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY29uc3QgdHdlZW5lciA9IG5ldyBUd2VlbmVyKCk7XG5leHBvcnQgY2xhc3MgVHdpc3RBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGV4cCwgcmV2ZXJzZSA9IGZhbHNlLCB0aW1lcyA9IDEpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZXhwLm1hdGNoKC8oW1xcKlxcI347LiN4eXpdfFswMTIzNDU2Nzg5LV0qW2JzZmRldWxtcl1bd10qKSgnPykoXFxkKikoJz8pL2kpO1xuICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgICBleHAgPSB2YWx1ZXNbMV07XG4gICAgICAgICAgICByZXZlcnNlID0gcmV2ZXJzZSAhPT0gKCh2YWx1ZXNbMl0gKyB2YWx1ZXNbNF0pLmxlbmd0aCA9PSAxKTtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMgKiAodmFsdWVzWzNdLmxlbmd0aCA9PSAwID8gMSA6IHBhcnNlSW50KHZhbHVlc1szXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvW1hZWl0vLnRlc3QoZXhwKSkge1xuICAgICAgICAgICAgZXhwID0gZXhwLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9bV3ddLy50ZXN0KGV4cCkpIHtcbiAgICAgICAgICAgIGV4cCA9IGV4cC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgZXhwID0gZXhwLnJlcGxhY2UoXCJXXCIsIFwid1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpZ24gPSBleHA7XG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgICAgIHRoaXMudGltZXMgPSB0aW1lcztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcyA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaWduICsgKHRoaXMudGltZXMgPT0gMSA/IFwiXCIgOiBTdHJpbmcodGhpcy50aW1lcykpICsgKHRoaXMucmV2ZXJzZSA/IFwiJ1wiIDogXCJcIik7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3aXN0Tm9kZSB7XG4gICAgY29uc3RydWN0b3IoZXhwLCByZXZlcnNlID0gZmFsc2UsIHRpbWVzID0gMSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIGV4cCA9IGV4cC5yZXBsYWNlKC9b4oCY77yH4oCZXS9nLCBcIidcIik7XG4gICAgICAgIGlmIChleHAubWF0Y2goL14oW1xcKlxcI347LiN4eXpdfFswMTIzNDU2Nzg5LV0qW2JzZmRldWxtcl1bd10qKSQvZ2kpKSB7XG4gICAgICAgICAgICB0aGlzLnR3aXN0ID0gbmV3IFR3aXN0QWN0aW9uKGV4cCwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHdpc3QgPSBuZXcgVHdpc3RBY3Rpb24oXCJcIiwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICBpZiAoZXhwLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGlzdCA9IFR3aXN0Tm9kZS5TUExJVF9TRUdNRU5UKGV4cCk7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVzO1xuICAgICAgICAgICAgdmFsdWVzID0gaXRlbS5tYXRjaCgvXlxcWyguK1s6fCxdLispXFxdJC9pKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBUd2lzdE5vZGUuU1BMSVRfQlJBQ0tFVCh2YWx1ZXNbMV0pO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWVzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMl0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIHRydWUsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgVHdpc3ROb2RlKHZhbHVlc1syXSwgdHJ1ZSwgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI6XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMl0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIHRydWUsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVzID0gaXRlbS5tYXRjaCgvXihcXFsuK1s6fCxdLitcXF0pKCc/KShcXGQqKSgnPykkL2kpO1xuICAgICAgICAgICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IGl0ZW0ubWF0Y2goL15cXCgoLispXFwpKCc/KShcXGQqKSgnPykkL2kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IGl0ZW0ubWF0Y2goLyhbXFwqXFwjfjsuI3h5el18WzAxMjM0NTY3ODktXSpbYnNmZGV1bG1yXVt3XSopKCc/KShcXGQqKSgnPykvaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXZlcnNlID0gKHZhbHVlc1syXSArIHZhbHVlc1s0XSkubGVuZ3RoID09IDE7XG4gICAgICAgICAgICBjb25zdCB0aW1lcyA9IHZhbHVlc1szXS5sZW5ndGggPT0gMCA/IDEgOiBwYXJzZUludCh2YWx1ZXNbM10pO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBUd2lzdE5vZGUodmFsdWVzWzFdLCByZXZlcnNlLCB0aW1lcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBTUExJVF9TRUdNRU5UKGV4cCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICAgIGxldCBidWZmZXIgPSBcIlwiO1xuICAgICAgICBsZXQgc3RhY2sgPSAwO1xuICAgICAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGUgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBleHAuY2hhckF0KGkpO1xuICAgICAgICAgICAgaWYgKGMgPT09IFwiIFwiICYmIGJ1ZmZlci5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09IFwiL1wiICYmIGV4cC5jaGFyQXQoaSArIDEpID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBub3RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgbm90ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChUd2lzdE5vZGUuQUZGSVguaW5kZXhPZihjKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmNvbmNhdChjKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCAmJiBzdGFjayA9PSAwICYmIHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIihcIiB8fCBjID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2srKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2stLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgc3RhdGljIFNQTElUX0JSQUNLRVQoZXhwKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IFwiXCI7XG4gICAgICAgIGxldCBzdGFjayA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXhwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gZXhwLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmIChzdGFjayA9PSAwICYmIChjID09PSBcIixcIiB8fCBjID09PSBcIjpcIikpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYyk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIihcIiB8fCBjID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2srKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2stLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgcGFyc2UocmV2ZXJzZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldmVyc2UgPSB0aGlzLnR3aXN0LnJldmVyc2UgIT09IHJldmVyc2U7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoMCAhPT0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdC50aW1lczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSBqIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gbi5wYXJzZShyZXZlcnNlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHdpc3Quc2lnbiAhPSBcIlwiICYmICF0aGlzLnR3aXN0LnNpZ24uc3RhcnRzV2l0aChcIi8vXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgVHdpc3RBY3Rpb24odGhpcy50d2lzdC5zaWduLCByZXZlcnNlLCB0aGlzLnR3aXN0LnRpbWVzKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5Ud2lzdE5vZGUuQUZGSVggPSBcIidXdzAxMjM0NTY3ODktXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2lzdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnR3aXN0KGFjdGlvbiwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3ViZSA9IGN1YmU7XG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFja3MucHVzaCh0aGlzLnVwZGF0ZSk7XG4gICAgfVxuICAgIHNjcmFtYmxlcigpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGV4cHMgPSBbXTtcbiAgICAgICAgbGV0IGxhc3QgPSAtMTtcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IFtcIlVcIiwgXCJEXCIsIFwiUlwiLCBcIkxcIiwgXCJGXCIsIFwiQlwiXTtcbiAgICAgICAgbGV0IGF4aXMgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzICogMyAqIHRoaXMuY3ViZS5vcmRlcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBleHAgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChheGlzID09IGxhc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzaWRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zW2F4aXMgKiAyICsgc2lkZV07XG4gICAgICAgICAgICBjb25zdCBwcmVmaXggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IodGhpcy5jdWJlLm9yZGVyIC8gMikpO1xuICAgICAgICAgICAgaWYgKHByZWZpeCAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGV4cC5wdXNoKHByZWZpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHAucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgY29uc3Qgc3VmZml4ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGlmIChzdWZmaXggPCAwLjQpIHtcbiAgICAgICAgICAgICAgICBleHAucHVzaChcIjJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdWZmaXggPCAwLjcpIHtcbiAgICAgICAgICAgICAgICBleHAucHVzaChcIidcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBzLnB1c2goZXhwLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgbGFzdCA9IGF4aXM7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gZXhwcy5qb2luKFwiIFwiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICB9XG4gICAgc2V0dXAoZXhwLCByZXZlcnNlID0gZmFsc2UsIHRpbWVzID0gMSkge1xuICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLmN1YmUucmVzZXQoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBUd2lzdE5vZGUoZXhwLCByZXZlcnNlLCB0aW1lcyk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBub2RlLnBhcnNlKCk7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMudHdpc3QoYWN0aW9uLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1YmUuaGlzdG9yeS5jbGVhcigpO1xuICAgICAgICB0aGlzLmN1YmUuaGlzdG9yeS5pbml0ID0gZXhwO1xuICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcHVzaChleHAsIHJldmVyc2UgPSBmYWxzZSwgdGltZXMgPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgVHdpc3ROb2RlKGV4cCwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICBjb25zdCBsaXN0ID0gbm9kZS5wYXJzZSgpO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWUucHVzaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHR3aXN0KGFjdGlvbiwgZmFzdCwgZm9yY2UpIHtcbiAgICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiI1wiKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwKFwiXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiKlwiKSB7XG4gICAgICAgICAgICBjb25zdCBleHAgPSB0aGlzLnNjcmFtYmxlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cChleHApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiLlwiIHx8IGFjdGlvbi5zaWduID09IFwiflwiKSB7XG4gICAgICAgICAgICBpZiAoZmFzdCB8fCBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKFwiYVwiLCAxKTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdHdlZW5lci50d2VlbigwLCAxLCBDdWJlR3JvdXAuZnJhbWVzICogYWN0aW9uLnRpbWVzLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3ViZS51bmxvY2soXCJhXCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnNpZ24gPT0gXCI7XCIpIHtcbiAgICAgICAgICAgIGlmIChmYXN0IHx8IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5jdWJlLmxvY2soXCJhXCIsIDEpO1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUudW5sb2NrKFwiYVwiLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmN1YmUudGFibGUuY29udmVydChhY3Rpb24pO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCByb3RhdGUgb2YgbGlzdCkge1xuICAgICAgICAgICAgc3VjY2VzcyA9IHJvdGF0ZS5ncm91cC50d2lzdCgoTWF0aC5QSSAvIDIpICogcm90YXRlLnR3aXN0LCBmYXN0KTtcbiAgICAgICAgICAgIHdoaWxlICghc3VjY2VzcyAmJiBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHJvdGF0ZS5ncm91cC50d2lzdCgoTWF0aC5QSSAvIDIpICogcm90YXRlLnR3aXN0LCBmYXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJlY29yZChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH1cbiAgICB1bmRvKCkge1xuICAgICAgICBpZiAodGhpcy5jdWJlLmhpc3RvcnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5jdWJlLmhpc3RvcnkubGFzdDtcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IG5ldyBUd2lzdEFjdGlvbihsYXN0LnNpZ24sICFsYXN0LnJldmVyc2UsIDEpO1xuICAgICAgICB0aGlzLnR3aXN0KHJldmVyc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IEZyYW1lLCBNaXJyb3IsIFN0aWNrZXIgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29sb3JzID0ge1xuICAgIFI6IFwiI0I3MUMxQ1wiLFxuICAgIEw6IFwiI0ZGNkQwMFwiLFxuICAgIFU6IFwiI0YwRjBGMFwiLFxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxuICAgIEY6IFwiIzAwQTAyMFwiLFxuICAgIEI6IFwiIzBENDdBMVwiLFxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxuICAgIGdyYXk6IFwiIzgwODA4MFwiLFxuICAgIGhpZ2g6IFwiI0ZGMDA4MFwiLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2RlZnMgPSB7XG4gICAgc2l6ZTogNjQsXG4gICAgb3JkZXI6IDMsXG4gICAgX2JvcmRlcl93aWR0aDogMyxcbiAgICBfZWRnZV93aWR0aDogMixcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZyYW1lID0gbmV3IEZyYW1lKGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9iYXNpY3MgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGN1YmVsZXRfY29sb3JzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfbGFtYmVycyA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY3ViZWxldF9jb2xvcnMpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiBjdWJlbGV0X2NvbG9yc1trZXldIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufSkoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2NvcmUgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBjdWJlbGV0X2NvbG9ycy5jb3JlLFxuICAgIHNwZWN1bGFyOiBjdWJlbGV0X2NvbG9ycy5ncmF5LFxuICAgIHNoaW5pbmVzczogMixcbn0pO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfdHJhbnMgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBjdWJlbGV0X2NvbG9ycy5ncmF5LFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuMSxcbiAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbn0pO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfc3RpY2tlciA9IG5ldyBTdGlja2VyKGN1YmVsZXRfZGVmcy5zaXplIC0gMiAqIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoIC0gY3ViZWxldF9kZWZzLl9lZGdlX3dpZHRoLCBjdWJlbGV0X2RlZnMuX3N0aWNrZXJfZGVwdGgsIGZhbHNlKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X21pcnJvciA9IG5ldyBNaXJyb3IoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX3N0aWNrZXJfZGVwdGgpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5leHBvcnQgdmFyIEZhY2U7XG4oZnVuY3Rpb24gKEZhY2UpIHtcbiAgICBGYWNlW0ZhY2VbXCJMXCJdID0gMF0gPSBcIkxcIjtcbiAgICBGYWNlW0ZhY2VbXCJSXCJdID0gMV0gPSBcIlJcIjtcbiAgICBGYWNlW0ZhY2VbXCJEXCJdID0gMl0gPSBcIkRcIjtcbiAgICBGYWNlW0ZhY2VbXCJVXCJdID0gM10gPSBcIlVcIjtcbiAgICBGYWNlW0ZhY2VbXCJCXCJdID0gNF0gPSBcIkJcIjtcbiAgICBGYWNlW0ZhY2VbXCJGXCJdID0gNV0gPSBcIkZcIjtcbn0pKEZhY2UgfHwgKEZhY2UgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIEZyYW1lIGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGJvcmRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBvID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGkgPSBvIC0gYm9yZGVyO1xuICAgICAgICBjb25zdCBfdmVydHMgPSBbXG4gICAgICAgICAgICAtaSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksICtpLCArbyxcbiAgICAgICAgICAgICtpLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgLWksICtvLFxuICAgICAgICAgICAgLWksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgLWksXG4gICAgICAgICAgICAraSwgK28sICtpLFxuICAgICAgICAgICAgLWksICtvLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgLWksXG4gICAgICAgICAgICAtbywgK2ksIC1pLFxuICAgICAgICAgICAgLW8sICtpLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgK2ksXG4gICAgICAgICAgICAraSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksICtpLCAtbyxcbiAgICAgICAgICAgIC1pLCAtaSwgLW8sXG4gICAgICAgICAgICAraSwgLWksIC1vLFxuICAgICAgICAgICAgLWksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgK2ksXG4gICAgICAgICAgICAraSwgLW8sIC1pLFxuICAgICAgICAgICAgLWksIC1vLCAtaSxcbiAgICAgICAgICAgICtvLCAraSwgK2ksXG4gICAgICAgICAgICArbywgK2ksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAtaSxcbiAgICAgICAgICAgICtvLCAtaSwgK2ksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwicG9zaXRpb25cIiwgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoX3ZlcnRzLCAzKSk7XG4gICAgICAgIHRoaXMuc2V0SW5kZXgoRnJhbWUuX2luZGljZXMpO1xuICAgICAgICB0aGlzLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG4gICAgfVxufVxuRnJhbWUuX2luZGljZXMgPSBbXG4gICAgMCwgMiwgMSxcbiAgICAwLCAzLCAyLFxuICAgIDQsIDYsIDUsXG4gICAgNCwgNywgNixcbiAgICA4LCAxMCwgOSxcbiAgICA4LCAxMSwgMTAsXG4gICAgMTIsIDE0LCAxMyxcbiAgICAxMiwgMTUsIDE0LFxuICAgIDE2LCAxOCwgMTcsXG4gICAgMTYsIDE5LCAxOCxcbiAgICAyMCwgMjIsIDIxLFxuICAgIDIwLCAyMywgMjIsXG4gICAgMSwgNiwgNyxcbiAgICAwLCAxLCA3LFxuICAgIDMsIDAsIDEwLFxuICAgIDExLCAzLCAxMCxcbiAgICAxNywgMiwgMyxcbiAgICAxNiwgMTcsIDMsXG4gICAgMjMsIDIwLCAxLFxuICAgIDIsIDIzLCAxLFxuICAgIDUsIDEyLCAxMyxcbiAgICA0LCA1LCAxMyxcbiAgICA5LCAxMywgMTQsXG4gICAgOCwgOSwgMTQsXG4gICAgMjIsIDE1LCAxMixcbiAgICAyMSwgMjIsIDEyLFxuICAgIDE5LCAxNCwgMTUsXG4gICAgMTgsIDE5LCAxNSxcbiAgICA3LCA0LCA5LFxuICAgIDEwLCA3LCA5LFxuICAgIDExLCA4LCAxOSxcbiAgICAxNiwgMTEsIDE5LFxuICAgIDIzLCAxNywgMTgsXG4gICAgMjIsIDIzLCAxOCxcbiAgICAyMCwgMjEsIDUsXG4gICAgNiwgMjAsIDUsXG4gICAgMjAsIDYsIDEsXG4gICAgMTAsIDAsIDcsXG4gICAgMjEsIDEyLCA1LFxuICAgIDEzLCA5LCA0LFxuICAgIDIzLCAyLCAxNyxcbiAgICAxMSwgMTYsIDMsXG4gICAgMjIsIDE4LCAxNSxcbiAgICA4LCAxNCwgMTksXG5dO1xuZXhwb3J0IGNsYXNzIFN0aWNrZXIgZXh0ZW5kcyBUSFJFRS5FeHRydWRlR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGRlcHRoLCBhcnJvdykge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBpZiAoYXJyb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGggPSBzaXplICogMC42O1xuICAgICAgICAgICAgY29uc3QgdyA9IGggKiAwLjg7XG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IG5ldyBUSFJFRS5QYXRoKCk7XG4gICAgICAgICAgICBhcnJvdy5tb3ZlVG8oMCwgaCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8oLXcsIDApO1xuICAgICAgICAgICAgYXJyb3cubGluZVRvKC13IC8gMiwgMCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8oLXcgLyAyLCAtaCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8odyAvIDIsIC1oKTtcbiAgICAgICAgICAgIGFycm93LmxpbmVUbyh3IC8gMiwgMCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8odywgMCk7XG4gICAgICAgICAgICBhcnJvdy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHNoYXBlLmhvbGVzLnB1c2goYXJyb3cpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHNoYXBlLCB7IGJldmVsRW5hYmxlZDogZmFsc2UsIGRlcHRoOiBkZXB0aCB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgVEhSRUUuU2hhcGVHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBzdXBlcihzaGFwZSk7XG4gICAgfVxufVxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuL2ludGVyYWN0b3JcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi93b3JsZFwiO1xubGV0IFZpZXdwb3J0ID0gY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgICAgICBjYW52YXM6IGNhbnZhc0VsZW0sXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICAgICAgICBhbHBoYTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDAsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLndvcmxkLnNjZW5lLCB0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIEluamVjdChcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwiY2FudmFzXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBIVE1MRWxlbWVudClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJjYW52YXNcIiwgdm9pZCAwKTtcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IHJlZj1cImNhbnZhc1wiPjwvZGl2PicsXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIH0pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbXSlcbl0sIFZpZXdwb3J0KTtcbmV4cG9ydCBkZWZhdWx0IFZpZXdwb3J0O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgQ3ViZSBmcm9tIFwiLi9jdWJlXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2RlZnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueCA9IE1hdGguUEkgLyA2O1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMTY7XG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDApO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsLnBvc2l0aW9uLnNldChjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLnNpemUgKiAzLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmRpcmVjdGlvbmFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIDEsIDEsIGN1YmVsZXRfZGVmcy5zaXplICogMzIpO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IDA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAwO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlID0gbmV3IEN1YmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmUgPSA5O1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIH1cbiAgICB1cGRhdGVDYW1lcmEoKSB7XG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuaGVpZ2h0IC8gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gdGhpcy5zY2FsZSAvIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIGNvbnN0IGZvdiA9ICgyICogTWF0aC5hdGFuKG1pbikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMgKiB0aGlzLnBlcnNwZWN0aXZlO1xuICAgICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IGRpc3RhbmNlO1xuICAgICAgICB0aGlzLmNhbWVyYS5uZWFyID0gZGlzdGFuY2UgLSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZhciA9IGRpc3RhbmNlICsgY3ViZWxldF9kZWZzLnNpemUgKiA4O1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQodGhpcy5zY2VuZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWV0aWZ5IGZyb20gXCJ2dWV0aWZ5XCI7XG5pbXBvcnQgXCJ2dWV0aWZ5L2Rpc3QvdnVldGlmeS5taW4uY3NzXCI7XG5pbXBvcnQgXCJtYXRlcmlhbC1kZXNpZ24taWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCI7XG5pbXBvcnQgUGxheWdyb3VuZCBmcm9tIFwiLi92dWVhcHAvcGxheWdyb3VuZFwiO1xuVnVlLnVzZShWdWV0aWZ5KTtcbmNvbnN0IG9wdHMgPSB7fTtcbmNvbnN0IHZ1ZXRpZnkgPSBuZXcgVnVldGlmeShvcHRzKTtcblZ1ZS5wcm90b3R5cGUudnVldGlmeSA9IHZ1ZXRpZnk7XG5sZXQgYXBwID0gUGxheWdyb3VuZDtcbmNvbnN0IHZtID0gbmV3IFZ1ZSh7XG4gICAgdnVldGlmeSxcbiAgICBlbDogXCIjYXBwXCIsXG4gICAgcmVuZGVyOiAoaCkgPT4gaChhcHApLFxufSk7XG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIFByb3ZpZGUsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uLy4uL2N1YmUvdmlld3BvcnRcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vY3ViZS93b3JsZFwiO1xubGV0IFBsYXlncm91bmQgPSBjbGFzcyBQbGF5Z3JvdW5kIGV4dGVuZHMgVnVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZCgpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMudmlld3BvcnQucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuY2FsY3VWaWV3cG9ydEhlaWdodCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XG4gICAgfVxuICAgIGNhbGN1Vmlld3BvcnRIZWlnaHQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4gaGVpZ2h0IC0gTWF0aC5jZWlsKE1hdGgubWluKHdpZHRoIC8gNiwgaGVpZ2h0IC8gMTIpKSAqIDEuNTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgUHJvdmlkZShcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwidmlld3BvcnRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwidmlld3BvcnRcIiwgdm9pZCAwKTtcblBsYXlncm91bmQgPSBfX2RlY29yYXRlKFtcbiAgICBDb21wb25lbnQoe1xuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaW5kZXguaHRtbFwiKSxcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgdmlld3BvcnQ6IFZpZXdwb3J0XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9