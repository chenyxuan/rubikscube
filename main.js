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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWdDO0FBQ0Q7QUFDa0I7QUFDVDtBQUNEO0FBQ2hDO0FBQ1A7QUFDQSwwQkFBMEIsMENBQWE7QUFDdkM7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQ0FBUztBQUNoQyx3QkFBd0IsMENBQWE7QUFDckMsd0JBQXdCLDBDQUFhO0FBQ3JDLDBCQUEwQiwwQ0FBYTtBQUN2QztBQUNBLDBCQUEwQiwwQ0FBYTtBQUN2QztBQUNBLGdCQUFnQix3Q0FBVyxLQUFLLDBDQUFhLGFBQWEscURBQWlCO0FBQzNFLGdCQUFnQix3Q0FBVyxLQUFLLDBDQUFhLGFBQWEscURBQWlCO0FBQzNFLGdCQUFnQix3Q0FBVyxLQUFLLDBDQUFhLGFBQWEscURBQWlCO0FBQzNFLGdCQUFnQix3Q0FBVyxLQUFLLDBDQUFhLGNBQWMscURBQWlCO0FBQzVFLGdCQUFnQix3Q0FBVyxLQUFLLDBDQUFhLGNBQWMscURBQWlCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMERBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMENBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscURBQWlCO0FBQ25ELGtDQUFrQyxxREFBaUI7QUFDbkQsa0NBQWtDLHFEQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywwQ0FBYSxHQUFHLHFEQUFpQixlQUFlLHFEQUFpQjtBQUNwRztBQUNBO0FBQ0EsbUNBQW1DLDBDQUFhLEVBQUUscURBQWlCLGVBQWUscURBQWlCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvREFBYztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMERBQXFCO0FBQ3BEO0FBQ0EsNkdBQTZHLHFEQUFpQjtBQUM5SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHFEQUFpQjtBQUM3RDtBQUNBO0FBQ0EsNENBQTRDLHFEQUFpQjtBQUM3RDtBQUNBO0FBQ0EsMkNBQTJDLHFEQUFpQjtBQUM1RDtBQUNBO0FBQ0EsNENBQTRDLHFEQUFpQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixtREFBTTtBQUNqQztBQUNBO0FBQ0EsMkJBQTJCLG1EQUFNO0FBQ2pDO0FBQ0E7QUFDQSwyQkFBMkIsbURBQU07QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGlEQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsaURBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFcrQjtBQUNDO0FBQ0s7QUFDUTtBQUNiO0FBQ1E7QUFDekIsbUJBQW1CLHdDQUFXO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnREFBTztBQUNsQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25ELGdDQUFnQyxnREFBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0RBQU87QUFDbEMseUJBQXlCLDhDQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbURBQU0sRUFBRSxtREFBTSxFQUFFLG1EQUFNLEVBQUUsbURBQU0sRUFBRSxtREFBTSxFQUFFLG1EQUFNO0FBQ3hFLDBDQUEwQyxpREFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0RBQWM7QUFDdEI7QUFDQSw2Q0FBNkMsd0NBQVc7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtREFBTSxFQUFFLG1EQUFNLEVBQUUsbURBQU0sRUFBRSxtREFBTSxFQUFFLG1EQUFNLEVBQUUsbURBQU07QUFDMUUsd0JBQXdCLGlEQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQyx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0EsNERBQTRELG1EQUFNO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekMscUNBQXFDLFFBQVE7QUFDN0M7QUFDQSw0REFBNEQsbURBQU07QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6Qyx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0EsNERBQTRELG1EQUFNO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekMsd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBLDREQUE0RCxtREFBTTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxRQUFRO0FBQ3pDLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQSw0REFBNEQsbURBQU07QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QyxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBLDREQUE0RCxtREFBTTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0THNJO0FBQ3ZHO0FBQ1M7QUFDekIsc0JBQXNCLHdDQUFXO0FBQ2hEO0FBQ0E7QUFDQSwyQkFBMkIsMENBQWE7QUFDeEMsK0JBQStCLDZDQUFnQjtBQUMvQyxxQkFBcUIsc0RBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxxREFBaUI7QUFDdEQsb0NBQW9DLHFEQUFpQjtBQUNyRCxxQ0FBcUMscURBQWlCO0FBQ3RELG9DQUFvQyxxREFBaUI7QUFDckQscUNBQXFDLHFEQUFpQjtBQUN0RCxvQ0FBb0MscURBQWlCO0FBQ3JEO0FBQ0E7QUFDQSxxQ0FBcUMsb0RBQWdCO0FBQ3JELG9DQUFvQyxvREFBZ0I7QUFDcEQscUNBQXFDLG9EQUFnQjtBQUNyRCxvQ0FBb0Msb0RBQWdCO0FBQ3BELHFDQUFxQyxvREFBZ0I7QUFDckQsb0NBQW9DLG9EQUFnQjtBQUNwRDtBQUNBLHlCQUF5Qix1Q0FBVSxDQUFDLGlEQUFhLEVBQUUsZ0RBQVk7QUFDL0Q7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBLHFDQUFxQyx1Q0FBVSxDQUFDLG1EQUFlO0FBQy9EO0FBQ0EseUJBQXlCLG1EQUFNO0FBQy9CO0FBQ0EsK0NBQStDLHFEQUFpQjtBQUNoRTtBQUNBLHlCQUF5QixtREFBTTtBQUMvQjtBQUNBLDhDQUE4QyxxREFBaUI7QUFDL0Q7QUFDQSx5QkFBeUIsbURBQU07QUFDL0I7QUFDQSwrQ0FBK0MscURBQWlCO0FBQ2hFO0FBQ0EseUJBQXlCLG1EQUFNO0FBQy9CO0FBQ0EsOENBQThDLHFEQUFpQjtBQUMvRDtBQUNBLHlCQUF5QixtREFBTTtBQUMvQjtBQUNBLCtDQUErQyxxREFBaUI7QUFDaEU7QUFDQSx5QkFBeUIsbURBQU07QUFDL0I7QUFDQSw4Q0FBOEMscURBQWlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx1Q0FBVSxDQUFDLGtEQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFEQUFpQjtBQUMzQywwQkFBMEIscURBQWlCO0FBQzNDLDBCQUEwQixxREFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBDQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBZTtBQUNwQyxvQkFBb0Isa0RBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHVDQUFVO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDBDQUFhO0FBQzFDO0FBQ0EsaUJBQWlCLG1EQUFNO0FBQ3ZCO0FBQ0E7QUFDQSxpQkFBaUIsbURBQU07QUFDdkI7QUFDQTtBQUNBLGlCQUFpQixtREFBTTtBQUN2QjtBQUNBO0FBQ0EsaUJBQWlCLG1EQUFNO0FBQ3ZCO0FBQ0E7QUFDQSxpQkFBaUIsbURBQU07QUFDdkI7QUFDQTtBQUNBLGlCQUFpQixtREFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbURBQU07QUFDMUI7QUFDQTtBQUNBLG9CQUFvQixtREFBTTtBQUMxQjtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCO0FBQ0E7QUFDQSxvQkFBb0IsbURBQU07QUFDMUI7QUFDQTtBQUNBLG9CQUFvQixtREFBTTtBQUMxQjtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBaUI7QUFDbEM7QUFDQSxpQkFBaUIscURBQWlCO0FBQ2xDO0FBQ0EsaUJBQWlCLHFEQUFpQjtBQUNsQztBQUNBLGlCQUFpQixxREFBaUI7QUFDbEM7QUFDQSxpQkFBaUIscURBQWlCO0FBQ2xDO0FBQ0EsaUJBQWlCLHFEQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hOK0I7QUFDSztBQUNyQix3QkFBd0Isd0NBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvREFBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtREFBYTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMENBQWE7QUFDeEIsV0FBVywwQ0FBYTtBQUN4QixXQUFXLDBDQUFhO0FBQ3hCLFdBQVcsMENBQWE7QUFDeEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0JBQW9CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG9CQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msd0JBQXdCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvVndDO0FBQ3pCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlEQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQscUJBQXFCLElBQUksZ0JBQWdCO0FBQ3ZHO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RGdDO0FBQ3pCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQsZ0NBQWdDLDBCQUEwQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZCQUE2QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscURBQWdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZS50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZWxldC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2hpc3RvcnkudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2ludGVyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdmlld3BvcnQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3dvcmxkLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvcGxheWdyb3VuZC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjx2LWFwcD5cXG4gICAgPHZpZXdwb3J0IHJlZj1cXFwidmlld3BvcnRcXFwiPjwvdmlld3BvcnQ+XFxuPC92LWFwcD5cXG5cIiIsImltcG9ydCBDdWJlR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVHdpc3RBY3Rpb24sIHR3ZWVuZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBGYWNlIH0gZnJvbSBcIi4vdXRpbHNfaW50ZXJuYWxcIjtcbmltcG9ydCB7IGN1YmVsZXRfZGVmcyB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgSG9sZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHdvcmxkKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jb250aW5nbGUgPSAwO1xuICAgICAgICB0aGlzLnJheSA9IG5ldyBUSFJFRS5SYXkoKTtcbiAgICAgICAgdGhpcy5kb3duID0gbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLm1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIHRoaXMuaG9sZGVyID0gbmV3IEhvbGRlcigpO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMucGxhbmVzID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2Vuc2l0aXZpdHkgPSAwLjU7XG4gICAgICAgIHRoaXMudGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmhvdmVyID0gLTE7XG4gICAgICAgIHRoaXMuaW50ZXJhY3QgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlbW92ZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaG1vdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlLnggPSBhY3Rpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlLnkgPSBhY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGNhbmNlbFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZXVwXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlb3V0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcbiAgICAgICAgdGhpcy50YXBzID0gW107XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBnZXQgbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2s7XG4gICAgfVxuICAgIHNldCBsb2NrKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgdGhpcy5fbG9jayA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGlzYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGU7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZSA9IHZhbHVlO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5jb250aW5nbGUgKyB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIHRoaXMuZ3JvdXAuYW5nbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIGdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaCgpIHtcbiAgICAgICAgY29uc3QgcGxhbmUgPSB0aGlzLmhvbGRlci5wbGFuZS5ub3JtYWw7XG4gICAgICAgIGNvbnN0IGZpbmdlciA9IHRoaXMuaG9sZGVyLnZlY3RvcjtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmhvbGRlci5pbmRleDtcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB0aGlzLndvcmxkLmN1YmUub3JkZXI7XG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IEN1YmVHcm91cC5BWElTX1ZFQ1RPUltheGlzXTtcbiAgICAgICAgICAgIGlmICh2ZWN0b3IuZG90KHBsYW5lKSA9PT0gMCAmJiB2ZWN0b3IuZG90KGZpbmdlcikgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXhpcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBpbmRleCAlIG9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoKGluZGV4ICUgKG9yZGVyICogb3JkZXIpKSAvIG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKGluZGV4IC8gKG9yZGVyICogb3JkZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1theGlzXVtsYXllcl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcbiAgICAgICAgY29uc3QgeCA9IChwb2ludC54IC8gdGhpcy53b3JsZC53aWR0aCkgKiAyIC0gMTtcbiAgICAgICAgY29uc3QgeSA9IC0ocG9pbnQueSAvIHRoaXMud29ybGQuaGVpZ2h0KSAqIDIgKyAxO1xuICAgICAgICB0aGlzLnJheS5vcmlnaW4uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMud29ybGQuY2FtZXJhLm1hdHJpeFdvcmxkKTtcbiAgICAgICAgdGhpcy5yYXkuZGlyZWN0aW9uLnNldCh4LCB5LCAwLjUpLnVucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSkuc3ViKHRoaXMucmF5Lm9yaWdpbikubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubWF0cml4LmNvcHkodGhpcy53b3JsZC5zY2VuZS5tYXRyaXgpO1xuICAgICAgICB0aGlzLm1hdHJpeC5pbnZlcnQoKTtcbiAgICAgICAgdGhpcy5yYXkuYXBwbHlNYXRyaXg0KHRoaXMubWF0cml4KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFRIUkVFLlZlY3RvcjMoSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYW5kbGVEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgICAgICB0aGlzLnBsYW5lcy5mb3JFYWNoKChwbGFuZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgIGlmIChwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gcG9pbnQueCAvIGN1YmVsZXRfZGVmcy5zaXplIC8gMztcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBvaW50LnkgLyBjdWJlbGV0X2RlZnMuc2l6ZSAvIDM7XG4gICAgICAgICAgICAgICAgbGV0IHogPSBwb2ludC56IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh4KSA8PSAwLjUwMDEgJiYgTWF0aC5hYnMoeSkgPD0gMC41MDAxICYmIE1hdGguYWJzKHopIDw9IDAuNTAwMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gTWF0aC5wb3cocG9pbnQueCAtIHRoaXMucmF5Lm9yaWdpbi54LCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy5yYXkub3JpZ2luLnksIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHBvaW50LnogLSB0aGlzLnJheS5vcmlnaW4ueiwgMik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA9PSAwIHx8IGQgPCBkaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIucGxhbmUgPSBwbGFuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyID0gdGhpcy53b3JsZC5jdWJlLm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG9yZGVyIC0gMSwgTWF0aC5mbG9vcigoeCArIDAuNSkgKiBvcmRlcikpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHkgKyAwLjUpICogb3JkZXIpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB6ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ob3JkZXIgLSAxLCBNYXRoLmZsb29yKCh6ICsgMC41KSAqIG9yZGVyKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSB6ICogb3JkZXIgKiBvcmRlciArIHkgKiBvcmRlciArIHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICBoYW5kbGVNb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gdGhpcy5tb3ZlLnggLSB0aGlzLmRvd24ueDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgaWYgKE1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KSAvIGQgPiAxMjgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRlci5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHggKiBkeCA+IGR5ICogZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYWxmID0gdGhpcy53b3JsZC53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxmID0gbmV3IFRIUkVFLlZlY3RvcjMoLShjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiwgMCwgKGN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgbGYuYXBwbHlNYXRyaXg0KHRoaXMud29ybGQuc2NlbmUubWF0cml4KS5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbHggPSBNYXRoLnJvdW5kKGxmLnggKiBoYWxmICsgaGFsZik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJmID0gbmV3IFRIUkVFLlZlY3RvcjMoKGN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyLCAwLCAoY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICByZi5hcHBseU1hdHJpeDQodGhpcy53b3JsZC5zY2VuZS5tYXRyaXgpLnByb2plY3QodGhpcy53b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByeCA9IE1hdGgucm91bmQocmYueCAqIGhhbGYgKyBoYWxmKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxmLnogPCByZi56KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3duLnggPCBseCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieidcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgcngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwielwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbmdsZSA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzWzBdXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2VlbmVyLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW5nbGUuYWRkKGdyb3VwLmFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRpbmdsZS5zaXplID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBjb250aW5nbGUudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCB0aGlzLmhvbGRlci5wbGFuZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5pbnRlcnNlY3QodGhpcy5tb3ZlLCB0aGlzLmhvbGRlci5wbGFuZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3Iuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMudmVjdG9yLng7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSB0aGlzLnZlY3Rvci55O1xuICAgICAgICAgICAgICAgIGxldCB6ID0gdGhpcy52ZWN0b3IuejtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heChNYXRoLmFicyh4KSwgTWF0aC5hYnMoeSksIE1hdGguYWJzKHopKTtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5hYnMoeCkgPT09IG1heCA/IHggOiAwO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmFicyh5KSA9PT0gbWF4ID8geSA6IDA7XG4gICAgICAgICAgICAgICAgeiA9IE1hdGguYWJzKHopID09PSBtYXggPyB6IDogMDtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvci5zZXQoeCwgeSwgeik7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLmNvcHkodGhpcy52ZWN0b3IubXVsdGlwbHkodGhpcy52ZWN0b3IpLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gdGhpcy5tYXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHRoaXMuZ3JvdXAuYW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3IuY3Jvc3NWZWN0b3JzKHRoaXMuaG9sZGVyLnZlY3RvciwgdGhpcy5ob2xkZXIucGxhbmUubm9ybWFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci52ZWN0b3IubXVsdGlwbHlTY2FsYXIodGhpcy52ZWN0b3IueCArIHRoaXMudmVjdG9yLnkgKyB0aGlzLnZlY3Rvci56KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgdGhpcy5ob2xkZXIucGxhbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnN1YlZlY3RvcnMoZW5kLCBzdGFydCkubXVsdGlwbHkodGhpcy5ob2xkZXIudmVjdG9yKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBDdWJlR3JvdXAuQVhJU19WRUNUT1JbdGhpcy5ncm91cC5heGlzXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID1cbiAgICAgICAgICAgICAgICAgICAgKCgtKHRoaXMudmVjdG9yLnggKyB0aGlzLnZlY3Rvci55ICsgdGhpcy52ZWN0b3IueikgKiAodmVjdG9yLnggKyB2ZWN0b3IueSArIHZlY3Rvci56KSkgLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5QSSAqXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnNpdGl2aXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuYXhpcykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9ICgtZHggLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKiBNYXRoLlBJICogdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9ICgtZHkgLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKiBNYXRoLlBJICogdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IChkeSAvIGN1YmVsZXRfZGVmcy5zaXplKSAqIE1hdGguUEkgKiB0aGlzLnNlbnNpdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ6J1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9ICgtZHkgLyBjdWJlbGV0X2RlZnMuc2l6ZSkgKiBNYXRoLlBJICogdGhpcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBsZXQgZmFjZSA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuaG9sZGVyLnBsYW5lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnBsYW5lc1swXTpcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuUjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnBsYW5lc1sxXTpcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuVTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnBsYW5lc1syXTpcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuRjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhcCBvZiB0aGlzLnRhcHMpIHtcbiAgICAgICAgICAgICAgICB0YXAodGhpcy5ob2xkZXIuaW5kZXgsIGZhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpIDwgTWF0aC5QSSAvIDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IChNYXRoLmFicyhhbmdsZSkgLyAodGljayAtIHRoaXMudGljaykpICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkID4gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlID09IDAgPyAwIDogKChhbmdsZSAvIE1hdGguYWJzKGFuZ2xlKSkgKiBNYXRoLlBJKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY29udGluZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnNlID0gdGltZXMgPCAwO1xuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IE1hdGguYWJzKHRpbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5jdWJlLnJlY29yZChuZXcgVHdpc3RBY3Rpb24odGhpcy5ncm91cC5uYW1lLCByZXZlcnNlLCB0aW1lcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzWzBdXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICAgICAgICBncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYW5nbGUgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXMgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldmVyc2UgPSB0aW1lcyA8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVzID0gTWF0aC5hYnModGltZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVjb3JkKG5ldyBUd2lzdEFjdGlvbih0aGlzLmF4aXMsIHJldmVyc2UsIHRpbWVzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBDdWJlbGV0IGZyb20gXCIuL2N1YmVsZXRcIjtcbmltcG9ydCB7IEdyb3VwVGFibGUgfSBmcm9tIFwiLi9ncm91cFwiO1xuaW1wb3J0IFR3aXN0ZXIsIHsgdHdlZW5lciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCBIaXN0b3J5IGZyb20gXCIuL2hpc3RvcnlcIjtcbmltcG9ydCB7IEZhY2UgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZSBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5pbml0aWFscyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLnR3aXN0ZXIgPSBuZXcgVHdpc3Rlcih0aGlzKTtcbiAgICAgICAgY29uc3Qgb3JkZXIgPSAzO1xuICAgICAgICB0aGlzLm9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KDMgLyBvcmRlciwgMyAvIG9yZGVyLCAzIC8gb3JkZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyICogb3JkZXIgKiBvcmRlcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gbmV3IEN1YmVsZXQoaSk7XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvY2tzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInhcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ5XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwielwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcImFcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IEhpc3RvcnkoKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBHcm91cFRhYmxlKHRoaXMpO1xuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgY2FsbGJhY2soKSB7XG4gICAgICAgIGZvciAoY29uc3QgbG9jayBvZiB0aGlzLmxvY2tzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBpZiAobG9jay5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvY2soYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoKF9hID0gdGhpcy5sb2Nrcy5nZXQoXCJhXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaGFzKDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG1wID0gdGhpcy5sb2Nrcy5nZXQoYXhpcyk7XG4gICAgICAgIGlmICh0bXAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2NrICE9IHRtcCAmJiBsb2NrLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRtcC5hZGQobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdW5sb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICB0bXAgPT09IG51bGwgfHwgdG1wID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0bXAuZGVsZXRlKGxheWVyKTtcbiAgICB9XG4gICAgcmVjb3JkKGFjdGlvbikge1xuICAgICAgICB0aGlzLmhpc3RvcnkucmVjb3JkKGFjdGlvbik7XG4gICAgfVxuICAgIGdldCBjb21wbGV0ZSgpIHtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSBbRmFjZS5VLCBGYWNlLkQsIEZhY2UuTCwgRmFjZS5SLCBGYWNlLkYsIEZhY2UuQl0uZXZlcnkoKGZhY2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50YWJsZS5mYWNlKEZhY2VbZmFjZV0pO1xuICAgICAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbZ3JvdXAuaW5kaWNlc1swXV07XG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IGN1YmVsZXQuZ2V0RmFjZShmYWNlKTtcbiAgICAgICAgICAgIGNvbnN0IHNhbWUgPSBncm91cC5pbmRpY2VzLmV2ZXJ5KChpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpZHhdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvciA9PSBjdWJlbGV0LmdldEZhY2UoZmFjZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzYW1lO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xuICAgIH1cbiAgICBpbmRleCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsc1t2YWx1ZV0uaW5kZXg7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0d2VlbmVyLmZpbmlzaCgpO1xuICAgICAgICBmb3IgKGNvbnN0IGN1YmVsZXQgb2YgdGhpcy5jdWJlbGV0cykge1xuICAgICAgICAgICAgY3ViZWxldC5zZXRSb3RhdGlvbkZyb21FdWxlcihuZXcgVEhSRUUuRXVsZXIoMCwgMCwgMCkpO1xuICAgICAgICAgICAgY3ViZWxldC5pbmRleCA9IGN1YmVsZXQuaW5pdGlhbDtcbiAgICAgICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlbGV0cy5zb3J0KChsZWZ0LCByaWdodCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0aWNrKGluZGV4LCBmYWNlLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5pbml0aWFsc1tpbmRleF07XG4gICAgICAgIGlmICghY3ViZWxldCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIGN1YmVsZXQgaW5kZXg6IFwiICsgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGN1YmVsZXQuc3RpY2soZmFjZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgc3RyaXAoc3RyaXApIHtcbiAgICAgICAgZm9yIChjb25zdCBmYWNlIG9mIFtGYWNlLkwsIEZhY2UuUiwgRmFjZS5ELCBGYWNlLlUsIEZhY2UuQiwgRmFjZS5GXSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gRmFjZVtmYWNlXTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50YWJsZS5mYWNlKGtleSk7XG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgZ3JvdXAuaW5kaWNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbHNbaW5kZXhdLnN0aWNrKGZhY2UsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXhlcyA9IHN0cmlwW2tleV07XG4gICAgICAgICAgICBpZiAoaW5kZXhlcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kZXhlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmluaXRpYWxzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWN1YmVsZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIGN1YmVsZXQgaW5kZXg6IFwiICsgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrKGZhY2UsIFwicmVtb3ZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgeCwgeSwgejtcbiAgICAgICAgeSA9IHRoaXMub3JkZXIgLSAxO1xuICAgICAgICBmb3IgKHogPSAwOyB6IDwgdGhpcy5vcmRlcjsgeisrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5vcmRlcjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvcihGYWNlLlUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gdGhpcy5vcmRlciAtIDE7XG4gICAgICAgIGZvciAoeSA9IHRoaXMub3JkZXIgLSAxOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gdGhpcy5vcmRlciAtIDE7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvcihGYWNlLlIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB6ID0gdGhpcy5vcmRlciAtIDE7XG4gICAgICAgIGZvciAoeSA9IHRoaXMub3JkZXIgLSAxOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMub3JkZXI7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5GKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeSA9IDA7XG4gICAgICAgIGZvciAoeiA9IHRoaXMub3JkZXIgLSAxOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMub3JkZXI7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5EKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDA7XG4gICAgICAgIGZvciAoeSA9IHRoaXMub3JkZXIgLSAxOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gMDsgeiA8IHRoaXMub3JkZXI7IHorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5MKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDA7XG4gICAgICAgIGZvciAoeSA9IHRoaXMub3JkZXIgLSAxOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gdGhpcy5vcmRlciAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvcihGYWNlLkIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3ViZWxldF9kZWZzLCBjdWJlbGV0X2NvcmUsIGN1YmVsZXRfbGFtYmVycywgY3ViZWxldF9iYXNpY3MsIGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9taXJyb3IgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBGYWNlIH0gZnJvbSBcIi4vdXRpbHNfaW50ZXJuYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVsZXQgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5fcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgIHRoaXMub3JkZXIgPSBjdWJlbGV0X2RlZnMub3JkZXI7XG4gICAgICAgIHRoaXMuaW5pdGlhbCA9IGluZGV4O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc3RpY2tlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5taXJyb3JzID0gW107XG4gICAgICAgIGNvbnN0IGhhbGYgPSAodGhpcy5vcmRlciAtIDEpIC8gMjtcbiAgICAgICAgdGhpcy5sYW1iZXJ0cyA9IFtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPT0gLWhhbGYgPyBjdWJlbGV0X2xhbWJlcnMuTCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPT0gaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5SIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueSA9PSAtaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5EIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueSA9PSBoYWxmID8gY3ViZWxldF9sYW1iZXJzLlUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci56ID09IC1oYWxmID8gY3ViZWxldF9sYW1iZXJzLkIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci56ID09IGhhbGYgPyBjdWJlbGV0X2xhbWJlcnMuRiA6IHVuZGVmaW5lZCxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5iYXNpY3MgPSBbXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IC1oYWxmID8gY3ViZWxldF9iYXNpY3MuTCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPT0gaGFsZiA/IGN1YmVsZXRfYmFzaWNzLlIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci55ID09IC1oYWxmID8gY3ViZWxldF9iYXNpY3MuRCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnkgPT0gaGFsZiA/IGN1YmVsZXRfYmFzaWNzLlUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci56ID09IC1oYWxmID8gY3ViZWxldF9iYXNpY3MuQiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnogPT0gaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkYgOiB1bmRlZmluZWQsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X2NvcmUpO1xuICAgICAgICB0aGlzLmFkZCh0aGlzLmZyYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxhbWJlcnRzW2ldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCB0aGlzLmxhbWJlcnRzW2ldKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLkw6XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueCA9IC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLlI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi55ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5wb3NpdGlvbi54ID0gY3ViZWxldF9kZWZzLnNpemUgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5EOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueSA9IC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLlU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueSA9IGN1YmVsZXRfZGVmcy5zaXplIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEZhY2UuQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnJvdGF0aW9uLnggPSBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueiA9IC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLkY6XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi54ID0gMiAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5wb3NpdGlvbi56ID0gY3ViZWxldF9kZWZzLnNpemUgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoX3N0aWNrZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2tlcnNbaV0gPSBfc3RpY2tlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBfbWlycm9yID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9taXJyb3IsIHRoaXMuYmFzaWNzW2ldKTtcbiAgICAgICAgICAgICAgICBfbWlycm9yLnJvdGF0aW9uLnggPSBfc3RpY2tlci5yb3RhdGlvbi54ID09IDAgPyAwIDogX3N0aWNrZXIucm90YXRpb24ueCArIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi55ID0gX3N0aWNrZXIucm90YXRpb24ueSA9PSAwID8gMCA6IF9zdGlja2VyLnJvdGF0aW9uLnkgKyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIF9taXJyb3Iucm90YXRpb24ueiA9IF9zdGlja2VyLnJvdGF0aW9uLnogPT0gMCA/IDAgOiBfc3RpY2tlci5yb3RhdGlvbi56ICsgTWF0aC5QSTtcbiAgICAgICAgICAgICAgICBpZiAoX21pcnJvci5yb3RhdGlvbi54ICsgX21pcnJvci5yb3RhdGlvbi55ICsgX21pcnJvci5yb3RhdGlvbi56ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX21pcnJvci5wb3NpdGlvbi54ID0gX3N0aWNrZXIucG9zaXRpb24ueCAqICh0aGlzLm9yZGVyICsgMSk7XG4gICAgICAgICAgICAgICAgX21pcnJvci5wb3NpdGlvbi55ID0gX3N0aWNrZXIucG9zaXRpb24ueSAqICh0aGlzLm9yZGVyICsgMSk7XG4gICAgICAgICAgICAgICAgX21pcnJvci5wb3NpdGlvbi56ID0gX3N0aWNrZXIucG9zaXRpb24ueiAqICh0aGlzLm9yZGVyICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5taXJyb3JzW2ldID0gX21pcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgc2V0IHZlY3Rvcih2ZWN0b3IpIHtcbiAgICAgICAgY29uc3QgaGFsZiA9ICh0aGlzLm9yZGVyIC0gMSkgLyAyO1xuICAgICAgICBsZXQgeCA9IE1hdGgucm91bmQodmVjdG9yLnggKiAyKSAvIDI7XG4gICAgICAgIGxldCB5ID0gTWF0aC5yb3VuZCh2ZWN0b3IueSAqIDIpIC8gMjtcbiAgICAgICAgbGV0IHogPSBNYXRoLnJvdW5kKHZlY3Rvci56ICogMikgLyAyO1xuICAgICAgICB0aGlzLl92ZWN0b3Iuc2V0KHgsIHksIHopO1xuICAgICAgICB4ID0gTWF0aC5yb3VuZCh4ICsgaGFsZik7XG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgKyBoYWxmKTtcbiAgICAgICAgeiA9IE1hdGgucm91bmQoeiArIGhhbGYpO1xuICAgICAgICB0aGlzLl9pbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gY3ViZWxldF9kZWZzLnNpemUgKiB0aGlzLl92ZWN0b3IueDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gY3ViZWxldF9kZWZzLnNpemUgKiB0aGlzLl92ZWN0b3IueTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi56ID0gY3ViZWxldF9kZWZzLnNpemUgKiB0aGlzLl92ZWN0b3IuejtcbiAgICB9XG4gICAgZ2V0IHZlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY3RvcjtcbiAgICB9XG4gICAgc2V0IGluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGhhbGYgPSAodGhpcy5vcmRlciAtIDEpIC8gMjtcbiAgICAgICAgY29uc3QgX3ggPSAoaW5kZXggJSB0aGlzLm9yZGVyKSAtIGhhbGY7XG4gICAgICAgIGNvbnN0IF95ID0gTWF0aC5mbG9vcigoaW5kZXggJSAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKSAvIHRoaXMub3JkZXIpIC0gaGFsZjtcbiAgICAgICAgY29uc3QgX3ogPSBNYXRoLmZsb29yKGluZGV4IC8gKHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyKSkgLSBoYWxmO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKF94LCBfeSwgX3opO1xuICAgIH1cbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleDtcbiAgICB9XG4gICAgc3RpY2soZmFjZSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IGxhbWJlcjtcbiAgICAgICAgbGV0IGJhc2ljO1xuICAgICAgICBpZiAodGhpcy5zdGlja2Vyc1tmYWNlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09IFwicmVtb3ZlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RpY2tlcnNbZmFjZV0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5taXJyb3JzW2ZhY2VdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0aWNrZXJzW2ZhY2VdLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1pcnJvcnNbZmFjZV0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYW1iZXIgPSBjdWJlbGV0X2xhbWJlcnNbdmFsdWVdO1xuICAgICAgICAgICAgYmFzaWMgPSBjdWJlbGV0X2Jhc2ljc1t2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYW1iZXIgPSB0aGlzLmxhbWJlcnRzW2ZhY2VdO1xuICAgICAgICAgICAgYmFzaWMgPSB0aGlzLmJhc2ljc1tmYWNlXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFtYmVyID09PSB1bmRlZmluZWQgfHwgYmFzaWMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RpY2tlcnNbZmFjZV0ubWF0ZXJpYWwgPSBsYW1iZXI7XG4gICAgICAgIGlmICh0aGlzLm1pcnJvcnNbZmFjZV0gaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XG4gICAgICAgICAgICB0aGlzLm1pcnJvcnNbZmFjZV0ubWF0ZXJpYWwgPSBiYXNpYztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRGYWNlKGZhY2UpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcbiAgICAgICAgc3dpdGNoIChmYWNlKSB7XG4gICAgICAgICAgICBjYXNlIEZhY2UuTDpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0gLTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZhY2UuUjpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRmFjZS5EOlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgPSAtMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRmFjZS5VOlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGYWNlLkI6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueiA9IC0xO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGYWNlLkY6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueiA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3F1YXRlcm5pb24uY29weSh0aGlzLnF1YXRlcm5pb24pO1xuICAgICAgICBwb3NpdGlvbi5hcHBseVF1YXRlcm5pb24odGhpcy5fcXVhdGVybmlvbi5pbnZlcnQoKSk7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKHBvc2l0aW9uLngpO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZChwb3NpdGlvbi55KTtcbiAgICAgICAgY29uc3QgeiA9IE1hdGgucm91bmQocG9zaXRpb24ueik7XG4gICAgICAgIGxldCBjb2xvciA9IDA7XG4gICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgY29sb3IgPSBGYWNlLkw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeCA+IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5SO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHkgPCAwKSB7XG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuRDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5ID4gMCkge1xuICAgICAgICAgICAgY29sb3IgPSBGYWNlLlU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeiA8IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5CO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHogPiAwKSB7XG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuRjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuICAgIGdldENvbG9yKGZhY2UpIHtcbiAgICAgICAgY29uc3Qgc3RpY2tlciA9IHRoaXMuc3RpY2tlcnNbdGhpcy5nZXRGYWNlKGZhY2UpXTtcbiAgICAgICAgaWYgKCFzdGlja2VyIHx8ICFzdGlja2VyLnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiBcIj9cIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHN0aWNrZXIubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTFwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5GOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkZcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuVTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5EOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCI/XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyB0d2VlbmVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZUdyb3VwIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUsIGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmN1YmUgPSBjdWJlO1xuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gW107XG4gICAgICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmF4aXMgPSBheGlzO1xuICAgICAgICB0aGlzLmxheWVyID0gbGF5ZXI7XG4gICAgICAgIGNvbnN0IGhhbGYgPSAodGhpcy5jdWJlLm9yZGVyIC0gMSkgLyAyO1xuICAgICAgICBjb25zdCB0YWJsZSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiBcIlJcIixcbiAgICAgICAgICAgICAgICB5OiBcIlVcIixcbiAgICAgICAgICAgICAgICB6OiBcIkZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogXCJMJ1wiLFxuICAgICAgICAgICAgICAgIHk6IFwiRCdcIixcbiAgICAgICAgICAgICAgICB6OiBcIkInXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IFwiTSdcIixcbiAgICAgICAgICAgICAgICB5OiBcIkUnXCIsXG4gICAgICAgICAgICAgICAgejogXCJTXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICBsZXQgdHlwZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLmxheWVyID09PSBoYWxmKSB7XG4gICAgICAgICAgICBsYXllciA9IDA7XG4gICAgICAgICAgICB0eXBlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmxheWVyIDwgaGFsZikge1xuICAgICAgICAgICAgdHlwZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYXllciA9IHRoaXMuY3ViZS5vcmRlciAtIGxheWVyIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lID0gdGFibGVbdHlwZV1bdGhpcy5heGlzXTtcbiAgICAgICAgdGhpcy5uYW1lID0gKGxheWVyID09PSAwID8gXCJcIiA6IFN0cmluZyhsYXllciArIDEpKSArIG5hbWU7XG4gICAgfVxuICAgIHNldCBhbmdsZShhbmdsZSkge1xuICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB0aGlzLnNldFJvdGF0aW9uRnJvbUF4aXNBbmdsZShDdWJlR3JvdXAuQVhJU19WRUNUT1JbdGhpcy5heGlzXSwgdGhpcy5fYW5nbGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmdsZTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy50d2Vlbikge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy50d2Vlbi5lbmQ7XG4gICAgICAgICAgICB0d2VlbmVyLmNhbmNlbCh0aGlzLnR3ZWVuKTtcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBhbmdsZSA9IE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy50d2Vlbi5lbmQgLSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgdHdlZW5lci5maW5pc2godGhpcy50d2Vlbik7XG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBob2xkKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5jdWJlLmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIHRoaXMuaW5kaWNlcykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZS5jdWJlbGV0c1tpXTtcbiAgICAgICAgICAgIHRoaXMuY3ViZWxldHMucHVzaChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUuYWRkKHRoaXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZHJhZygpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuaG9sZGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC10aGlzLmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhvbGQoKTtcbiAgICB9XG4gICAgZHJvcCgpIHtcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHdlZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0cy5wb3AoKTtcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IGN1YmVsZXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm90YXRlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUuYWRkKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLmN1YmVsZXRzW2N1YmVsZXQuaW5kZXhdID0gY3ViZWxldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jdWJlLnVubG9jayh0aGlzLmF4aXMsIHRoaXMubGF5ZXIpO1xuICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdHdpc3QoYW5nbGUsIGZhc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9sZGluZykge1xuICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5ob2xkKCk7XG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBhbmdsZSA9IE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgIGlmIChmYXN0KSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVsdGEgPSBhbmdsZSAtIHRoaXMuYW5nbGU7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xuICAgICAgICAgICAgdGhpcy5kcm9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkID0gTWF0aC5hYnMoZGVsdGEpIC8gKE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gQ3ViZUdyb3VwLmZyYW1lcyAqICgyIC0gMiAvIChkICsgMSkpO1xuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHR3ZWVuZXIudHdlZW4odGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJvdGF0ZShjdWJlbGV0KSB7XG4gICAgICAgIGN1YmVsZXQucm90YXRlT25Xb3JsZEF4aXMoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuYW5nbGUpO1xuICAgICAgICBjdWJlbGV0LnZlY3RvciA9IGN1YmVsZXQudmVjdG9yLmFwcGx5QXhpc0FuZ2xlKEN1YmVHcm91cC5BWElTX1ZFQ1RPUlt0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG59XG5DdWJlR3JvdXAuZnJhbWVzID0gMzA7XG5DdWJlR3JvdXAuQVhJU19WRUNUT1IgPSB7XG4gICAgYTogbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSksXG4gICAgeDogbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApLFxuICAgIHk6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSxcbiAgICB6OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksXG59O1xuZXhwb3J0IGNsYXNzIFJvdGF0ZUFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZ3JvdXAsIHR3aXN0KSB7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcbiAgICAgICAgdGhpcy50d2lzdCA9IHR3aXN0O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBHcm91cFRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlKSB7XG4gICAgICAgIHRoaXMub3JkZXIgPSBjdWJlLm9yZGVyO1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGF4aXMgb2YgW1wieFwiLCBcInlcIiwgXCJ6XCJdKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBsYXllciA9IDA7IGxheWVyIDwgdGhpcy5vcmRlcjsgbGF5ZXIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGcgPSBuZXcgQ3ViZUdyb3VwKGN1YmUsIGF4aXMsIGxheWVyKTtcbiAgICAgICAgICAgICAgICBsaXN0W2xheWVyXSA9IGc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1theGlzXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjdWJlbGV0IG9mIGN1YmUuaW5pdGlhbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3ViZWxldC5pbml0aWFsO1xuICAgICAgICAgICAgbGV0IGF4aXM7XG4gICAgICAgICAgICBsZXQgbGF5ZXI7XG4gICAgICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgICAgICBheGlzID0gXCJ4XCI7XG4gICAgICAgICAgICBsYXllciA9IGluZGV4ICUgdGhpcy5vcmRlcjtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbYXhpc11bbGF5ZXJdO1xuICAgICAgICAgICAgZ3JvdXAuaW5kaWNlcy5wdXNoKGN1YmVsZXQuaW5kZXgpO1xuICAgICAgICAgICAgYXhpcyA9IFwieVwiO1xuICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKChpbmRleCAlICh0aGlzLm9yZGVyICogdGhpcy5vcmRlcikpIC8gdGhpcy5vcmRlcik7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW2F4aXNdW2xheWVyXTtcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcbiAgICAgICAgICAgIGF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLm9yZGVyICogdGhpcy5vcmRlcikpO1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XG4gICAgICAgICAgICBncm91cC5pbmRpY2VzLnB1c2goY3ViZWxldC5pbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmFjZShmYWNlKSB7XG4gICAgICAgIGxldCBsYXllciA9IDA7XG4gICAgICAgIGxldCBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtmYWNlXTtcbiAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIHNpZ24gPSBzaWduWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLm9yZGVyIC0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgIH1cbiAgICBjb252ZXJ0KGFjdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHNpZ24gPSBhY3Rpb24uc2lnbjtcbiAgICAgICAgaWYgKHNpZ24ubWF0Y2goLy5bV3ddLykpIHtcbiAgICAgICAgICAgIHNpZ24gPSBzaWduLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIndcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9bWFlaXS8udGVzdChzaWduKSkge1xuICAgICAgICAgICAgc2lnbiA9IHNpZ24udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZ3JvdXA7XG4gICAgICAgIGxldCB0d2lzdCA9IGFjdGlvbi50aW1lcyAqIChhY3Rpb24ucmV2ZXJzZSA/IC0xIDogMSk7XG4gICAgICAgIGxldCBsYXllcjtcbiAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNpZ24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGF5ZXIgPSAwOyBsYXllciA8IHRoaXMub3JkZXI7IGxheWVyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGNhc2UgXCJSXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiRlwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiQlwiOlxuICAgICAgICAgICAgICAgICAgICBsYXllciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSBHcm91cFRhYmxlLkFYSVNfTUFQW3NpZ24udG9VcHBlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSBzaWduWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLm9yZGVyIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImZcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJkXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtzaWduLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdpc3QgPSAtdHdpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXIgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlNcIjpcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKCh0aGlzLm9yZGVyIC0gMSkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbc2lnbi50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ID0gLXR3aXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IHNpZ25bMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSBHcm91cFRhYmxlLkFYSVNfTUFQW3NpZ24udG9VcHBlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSBzaWduWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxheWVyID0gMTsgbGF5ZXIgPCB0aGlzLm9yZGVyIC0gMTsgbGF5ZXIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gc2lnbi5tYXRjaCgvKFswMTIzNDU2Nzg5XSopKC0/KShbMDEyMzQ1Njc4OV0qKShbbHJ1ZGZiXSkvaSk7XG4gICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmcm9tID0gTnVtYmVyKGxpc3RbMV0pO1xuICAgICAgICAgICAgbGV0IHRvID0gTnVtYmVyKGxpc3RbM10pO1xuICAgICAgICAgICAgaWYgKHRvID09PSBOYU4gfHwgdG8gPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoL1tscnVkZmJdLy50ZXN0KGxpc3RbNF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvID0gZnJvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnJvbSA+IHRoaXMub3JkZXIpIHtcbiAgICAgICAgICAgICAgICBmcm9tID0gdGhpcy5vcmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0byA+IHRoaXMub3JkZXIpIHtcbiAgICAgICAgICAgICAgICB0byA9IHRoaXMub3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtsaXN0WzRdLnRvVXBwZXJDYXNlKCldO1xuICAgICAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcbiAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyb20gPSB0aGlzLm9yZGVyIC0gZnJvbSArIDE7XG4gICAgICAgICAgICAgICAgdG8gPSB0aGlzLm9yZGVyIC0gdG8gKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZyb20gPiB0bykge1xuICAgICAgICAgICAgICAgIFtmcm9tLCB0b10gPSBbdG8sIGZyb21dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgbGF5ZXIgPSBmcm9tIC0gMTsgbGF5ZXIgPCB0bzsgbGF5ZXIrKykge1xuICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5Hcm91cFRhYmxlLkFYSVNfTUFQID0ge1xuICAgIFI6IFwieFwiLFxuICAgIEw6IFwiLXhcIixcbiAgICBVOiBcInlcIixcbiAgICBEOiBcIi15XCIsXG4gICAgRjogXCJ6XCIsXG4gICAgQjogXCItelwiLFxuICAgIE06IFwiLXhcIixcbiAgICBFOiBcIi15XCIsXG4gICAgUzogXCJ6XCIsXG59O1xuIiwiaW1wb3J0IHsgVHdpc3RBY3Rpb24gfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaXN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIHRoaXMuaW5pdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZXhwID0gXCJcIjtcbiAgICB9XG4gICAgcmVjb3JkKHJhdykge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgVHdpc3RBY3Rpb24ocmF3LnNpZ24sIHJhdy5yZXZlcnNlLCByYXcudGltZXMpO1xuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBhY3Rpb24udGltZXMgPSBhY3Rpb24udGltZXMgJSA0O1xuICAgICAgICAgICAgaWYgKGFjdGlvbi50aW1lcyAhPSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cCA9IHRoaXMuZXhwICsgXCIgXCIgKyBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0LnNpZ24gPT0gYWN0aW9uLnNpZ24pIHtcbiAgICAgICAgICAgICAgICBsYXN0LnRpbWVzID0gbGFzdC50aW1lcyArIGFjdGlvbi50aW1lcyAqIChsYXN0LnJldmVyc2UgPT0gYWN0aW9uLnJldmVyc2UgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0LnRpbWVzIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0LnRpbWVzID0gLWxhc3QudGltZXM7XG4gICAgICAgICAgICAgICAgICAgIGxhc3QucmV2ZXJzZSA9ICFsYXN0LnJldmVyc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3QudGltZXMgPSBsYXN0LnRpbWVzICUgNDtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cCA9IHRoaXMuZXhwLnN1YnN0cmluZygwLCB0aGlzLmV4cC5sYXN0SW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0LnRpbWVzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHAgPSB0aGlzLmV4cCArIFwiIFwiICsgbGFzdC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwID0gdGhpcy5leHAgKyBcIiBcIiArIGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIHRoaXMuaW5pdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZXhwID0gXCJcIjtcbiAgICB9XG4gICAgZ2V0IGxhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aDtcbiAgICB9XG4gICAgZ2V0IG1vdmVzKCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGZvciAoY29uc3QgdHdpc3Qgb2YgdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZiAodHdpc3Quc2lnbiA9PSBcInhcIiB8fCB0d2lzdC5zaWduID09IFwieVwiIHx8IHR3aXN0LnNpZ24gPT0gXCJ6XCIpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBJbnRlcmFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgeCwgeSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGRvbSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50b3VjaCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoc3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKFwidG91Y2hlbmRcIiwgdGhpcy5sYXN0LmNsaWVudFggLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LCB0aGlzLmxhc3QuY2xpZW50WSAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0ID0gZmlyc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQgIT09IHRoaXMuZG9tIHx8ICgoX2EgPSB0aGlzLmxhc3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZGVudGlmaWVyKSAhPSBmaXJzdC5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb20udGFiSW5kZXggPSAxO1xuICAgICAgICAgICAgdGhpcy5kb20uZm9jdXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBmaXJzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgZmlyc3QuY2xpZW50WSAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNoY2FuY2VsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb3VzZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGhpcy5kb20pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnRhYkluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJtb3VzZXVwXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZG9tID0gZG9tO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDdWJlR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcbmV4cG9ydCBjbGFzcyBUd2VlbiB7XG4gICAgY29uc3RydWN0b3IoYmVnaW4sIGVuZCwgZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMuZW5kKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZhbHVlKys7XG4gICAgICAgIGxldCBlbGFwc2VkID0gdGhpcy52YWx1ZSAvIHRoaXMuZHVyYXRpb247XG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuICAgICAgICBlbGFwc2VkID0gZWxhcHNlZCA8IDAgPyAwIDogZWxhcHNlZDtcbiAgICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgLSAxO1xuICAgICAgICBlbGFwc2VkID0gMSAtIGVsYXBzZWQgKiBlbGFwc2VkO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsYXBzZWQgPT0gMSA/IHRoaXMuZW5kIDogdGhpcy5iZWdpbiArICh0aGlzLmVuZCAtIHRoaXMuYmVnaW4pICogZWxhcHNlZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUd2VlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d2VlbnMgPSBbXTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR3ZWVucy5sZW5ndGg7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHR3ZWVuKGJlZ2luLCBlbmQsIGR1cmF0aW9uLCB1cGRhdGUpIHtcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oYmVnaW4sIGVuZCwgZHVyYXRpb24sIHVwZGF0ZSk7XG4gICAgICAgIHRoaXMudHdlZW5zLnB1c2godHdlZW4pO1xuICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdlZW5zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy50d2VlbnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMudHdlZW5zW2ldLnVwZGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmaW5pc2godHdlZW4gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR3ZWVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdlZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdlZW5zW2ldID09IHR3ZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3ZWVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0d2VlbnMgPSB0aGlzLnR3ZWVucy5zcGxpY2UoMCwgdGhpcy50d2VlbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHdlZW4gb2YgdHdlZW5zKSB7XG4gICAgICAgICAgICAgICAgdHdlZW4uZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuY2VsKHR3ZWVuKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3ZWVuc1tpXSA9PSB0d2Vlbikge1xuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY29uc3QgdHdlZW5lciA9IG5ldyBUd2VlbmVyKCk7XG5leHBvcnQgY2xhc3MgVHdpc3RBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGV4cCwgcmV2ZXJzZSA9IGZhbHNlLCB0aW1lcyA9IDEpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZXhwLm1hdGNoKC8oW1xcKlxcI347LiN4eXpdfFswMTIzNDU2Nzg5LV0qW2JzZmRldWxtcl1bd10qKSgnPykoXFxkKikoJz8pL2kpO1xuICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgICBleHAgPSB2YWx1ZXNbMV07XG4gICAgICAgICAgICByZXZlcnNlID0gcmV2ZXJzZSAhPT0gKCh2YWx1ZXNbMl0gKyB2YWx1ZXNbNF0pLmxlbmd0aCA9PSAxKTtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMgKiAodmFsdWVzWzNdLmxlbmd0aCA9PSAwID8gMSA6IHBhcnNlSW50KHZhbHVlc1szXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvW1hZWl0vLnRlc3QoZXhwKSkge1xuICAgICAgICAgICAgZXhwID0gZXhwLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9bV3ddLy50ZXN0KGV4cCkpIHtcbiAgICAgICAgICAgIGV4cCA9IGV4cC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgZXhwID0gZXhwLnJlcGxhY2UoXCJXXCIsIFwid1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpZ24gPSBleHA7XG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgICAgIHRoaXMudGltZXMgPSB0aW1lcztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcyA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaWduICsgKHRoaXMudGltZXMgPT0gMSA/IFwiXCIgOiBTdHJpbmcodGhpcy50aW1lcykpICsgKHRoaXMucmV2ZXJzZSA/IFwiJ1wiIDogXCJcIik7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3aXN0Tm9kZSB7XG4gICAgY29uc3RydWN0b3IoZXhwLCByZXZlcnNlID0gZmFsc2UsIHRpbWVzID0gMSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIGV4cCA9IGV4cC5yZXBsYWNlKC9b4oCY77yH4oCZXS9nLCBcIidcIik7XG4gICAgICAgIGlmIChleHAubWF0Y2goL14oW1xcKlxcI347LiN4eXpdfFswMTIzNDU2Nzg5LV0qW2JzZmRldWxtcl1bd10qKSQvZ2kpKSB7XG4gICAgICAgICAgICB0aGlzLnR3aXN0ID0gbmV3IFR3aXN0QWN0aW9uKGV4cCwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHdpc3QgPSBuZXcgVHdpc3RBY3Rpb24oXCJcIiwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICBpZiAoZXhwLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGlzdCA9IFR3aXN0Tm9kZS5TUExJVF9TRUdNRU5UKGV4cCk7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVzO1xuICAgICAgICAgICAgdmFsdWVzID0gaXRlbS5tYXRjaCgvXlxcWyguK1s6fCxdLispXFxdJC9pKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBUd2lzdE5vZGUuU1BMSVRfQlJBQ0tFVCh2YWx1ZXNbMV0pO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWVzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMl0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIHRydWUsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgVHdpc3ROb2RlKHZhbHVlc1syXSwgdHJ1ZSwgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI6XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMl0sIGZhbHNlLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIHRydWUsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVzID0gaXRlbS5tYXRjaCgvXihcXFsuK1s6fCxdLitcXF0pKCc/KShcXGQqKSgnPykkL2kpO1xuICAgICAgICAgICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IGl0ZW0ubWF0Y2goL15cXCgoLispXFwpKCc/KShcXGQqKSgnPykkL2kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IGl0ZW0ubWF0Y2goLyhbXFwqXFwjfjsuI3h5el18WzAxMjM0NTY3ODktXSpbYnNmZGV1bG1yXVt3XSopKCc/KShcXGQqKSgnPykvaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXZlcnNlID0gKHZhbHVlc1syXSArIHZhbHVlc1s0XSkubGVuZ3RoID09IDE7XG4gICAgICAgICAgICBjb25zdCB0aW1lcyA9IHZhbHVlc1szXS5sZW5ndGggPT0gMCA/IDEgOiBwYXJzZUludCh2YWx1ZXNbM10pO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBUd2lzdE5vZGUodmFsdWVzWzFdLCByZXZlcnNlLCB0aW1lcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBTUExJVF9TRUdNRU5UKGV4cCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICAgIGxldCBidWZmZXIgPSBcIlwiO1xuICAgICAgICBsZXQgc3RhY2sgPSAwO1xuICAgICAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5vdGUgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBleHAuY2hhckF0KGkpO1xuICAgICAgICAgICAgaWYgKGMgPT09IFwiIFwiICYmIGJ1ZmZlci5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09IFwiL1wiICYmIGV4cC5jaGFyQXQoaSArIDEpID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBub3RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgbm90ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChUd2lzdE5vZGUuQUZGSVguaW5kZXhPZihjKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmNvbmNhdChjKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCAmJiBzdGFjayA9PSAwICYmIHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIihcIiB8fCBjID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2srKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2stLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgc3RhdGljIFNQTElUX0JSQUNLRVQoZXhwKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IFwiXCI7XG4gICAgICAgIGxldCBzdGFjayA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXhwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gZXhwLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmIChzdGFjayA9PSAwICYmIChjID09PSBcIixcIiB8fCBjID09PSBcIjpcIikpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYyk7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gXCJcIjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIihcIiB8fCBjID09PSBcIltcIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2srKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgICAgICAgICAgc3RhY2stLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgcGFyc2UocmV2ZXJzZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldmVyc2UgPSB0aGlzLnR3aXN0LnJldmVyc2UgIT09IHJldmVyc2U7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBpZiAoMCAhPT0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdC50aW1lczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSBqIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gdGhpcy5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gbi5wYXJzZShyZXZlcnNlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHdpc3Quc2lnbiAhPSBcIlwiICYmICF0aGlzLnR3aXN0LnNpZ24uc3RhcnRzV2l0aChcIi8vXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgVHdpc3RBY3Rpb24odGhpcy50d2lzdC5zaWduLCByZXZlcnNlLCB0aGlzLnR3aXN0LnRpbWVzKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5Ud2lzdE5vZGUuQUZGSVggPSBcIidXdzAxMjM0NTY3ODktXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2lzdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnR3aXN0KGFjdGlvbiwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY3ViZSA9IGN1YmU7XG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFja3MucHVzaCh0aGlzLnVwZGF0ZSk7XG4gICAgfVxuICAgIHNjcmFtYmxlcigpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGV4cHMgPSBbXTtcbiAgICAgICAgbGV0IGxhc3QgPSAtMTtcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IFtcIlVcIiwgXCJEXCIsIFwiUlwiLCBcIkxcIiwgXCJGXCIsIFwiQlwiXTtcbiAgICAgICAgbGV0IGF4aXMgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzICogMyAqIHRoaXMuY3ViZS5vcmRlcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBleHAgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChheGlzID09IGxhc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzaWRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zW2F4aXMgKiAyICsgc2lkZV07XG4gICAgICAgICAgICBjb25zdCBwcmVmaXggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IodGhpcy5jdWJlLm9yZGVyIC8gMikpO1xuICAgICAgICAgICAgaWYgKHByZWZpeCAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGV4cC5wdXNoKHByZWZpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHAucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgY29uc3Qgc3VmZml4ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGlmIChzdWZmaXggPCAwLjQpIHtcbiAgICAgICAgICAgICAgICBleHAucHVzaChcIjJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdWZmaXggPCAwLjcpIHtcbiAgICAgICAgICAgICAgICBleHAucHVzaChcIidcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBzLnB1c2goZXhwLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgbGFzdCA9IGF4aXM7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gZXhwcy5qb2luKFwiIFwiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHdlZW5lci5maW5pc2goKTtcbiAgICB9XG4gICAgc2V0dXAoZXhwLCByZXZlcnNlID0gZmFsc2UsIHRpbWVzID0gMSkge1xuICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLmN1YmUucmVzZXQoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBUd2lzdE5vZGUoZXhwLCByZXZlcnNlLCB0aW1lcyk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBub2RlLnBhcnNlKCk7XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMudHdpc3QoYWN0aW9uLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1YmUuaGlzdG9yeS5jbGVhcigpO1xuICAgICAgICB0aGlzLmN1YmUuaGlzdG9yeS5pbml0ID0gZXhwO1xuICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcHVzaChleHAsIHJldmVyc2UgPSBmYWxzZSwgdGltZXMgPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgVHdpc3ROb2RlKGV4cCwgcmV2ZXJzZSwgdGltZXMpO1xuICAgICAgICBjb25zdCBsaXN0ID0gbm9kZS5wYXJzZSgpO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWUucHVzaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHR3aXN0KGFjdGlvbiwgZmFzdCwgZm9yY2UpIHtcbiAgICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiI1wiKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwKFwiXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiKlwiKSB7XG4gICAgICAgICAgICBjb25zdCBleHAgPSB0aGlzLnNjcmFtYmxlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cChleHApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiLlwiIHx8IGFjdGlvbi5zaWduID09IFwiflwiKSB7XG4gICAgICAgICAgICBpZiAoZmFzdCB8fCBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKFwiYVwiLCAxKTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdHdlZW5lci50d2VlbigwLCAxLCBDdWJlR3JvdXAuZnJhbWVzICogYWN0aW9uLnRpbWVzLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3ViZS51bmxvY2soXCJhXCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnNpZ24gPT0gXCI7XCIpIHtcbiAgICAgICAgICAgIGlmIChmYXN0IHx8IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5jdWJlLmxvY2soXCJhXCIsIDEpO1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUudW5sb2NrKFwiYVwiLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmN1YmUudGFibGUuY29udmVydChhY3Rpb24pO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCByb3RhdGUgb2YgbGlzdCkge1xuICAgICAgICAgICAgc3VjY2VzcyA9IHJvdGF0ZS5ncm91cC50d2lzdCgoTWF0aC5QSSAvIDIpICogcm90YXRlLnR3aXN0LCBmYXN0KTtcbiAgICAgICAgICAgIHdoaWxlICghc3VjY2VzcyAmJiBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IHJvdGF0ZS5ncm91cC50d2lzdCgoTWF0aC5QSSAvIDIpICogcm90YXRlLnR3aXN0LCBmYXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJlY29yZChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgIH1cbiAgICB1bmRvKCkge1xuICAgICAgICBpZiAodGhpcy5jdWJlLmhpc3RvcnkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5jdWJlLmhpc3RvcnkubGFzdDtcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IG5ldyBUd2lzdEFjdGlvbihsYXN0LnNpZ24sICFsYXN0LnJldmVyc2UsIDEpO1xuICAgICAgICB0aGlzLnR3aXN0KHJldmVyc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IEZyYW1lLCBNaXJyb3IsIFN0aWNrZXIgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29sb3JzID0ge1xuICAgIFI6IFwiI0I3MUMxQ1wiLFxuICAgIEw6IFwiI0ZGNkQwMFwiLFxuICAgIFU6IFwiI0YwRjBGMFwiLFxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxuICAgIEY6IFwiIzAwQTAyMFwiLFxuICAgIEI6IFwiIzBENDdBMVwiLFxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxuICAgIGdyYXk6IFwiIzgwODA4MFwiLFxuICAgIGhpZ2g6IFwiI0ZGMDA4MFwiLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2RlZnMgPSB7XG4gICAgc2l6ZTogNjQsXG4gICAgb3JkZXI6IDMsXG4gICAgX2JvcmRlcl93aWR0aDogMyxcbiAgICBfZWRnZV93aWR0aDogMixcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZyYW1lID0gbmV3IEZyYW1lKGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9iYXNpY3MgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGN1YmVsZXRfY29sb3JzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfbGFtYmVycyA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY3ViZWxldF9jb2xvcnMpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiBjdWJlbGV0X2NvbG9yc1trZXldIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufSkoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2NvcmUgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBjdWJlbGV0X2NvbG9ycy5jb3JlLFxuICAgIHNwZWN1bGFyOiBjdWJlbGV0X2NvbG9ycy5ncmF5LFxuICAgIHNoaW5pbmVzczogMixcbn0pO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfdHJhbnMgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBjdWJlbGV0X2NvbG9ycy5ncmF5LFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuMSxcbiAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbn0pO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfc3RpY2tlciA9IG5ldyBTdGlja2VyKGN1YmVsZXRfZGVmcy5zaXplIC0gMiAqIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoIC0gY3ViZWxldF9kZWZzLl9lZGdlX3dpZHRoLCBjdWJlbGV0X2RlZnMuX3N0aWNrZXJfZGVwdGgsIGZhbHNlKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X21pcnJvciA9IG5ldyBNaXJyb3IoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX3N0aWNrZXJfZGVwdGgpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5leHBvcnQgdmFyIEZhY2U7XG4oZnVuY3Rpb24gKEZhY2UpIHtcbiAgICBGYWNlW0ZhY2VbXCJMXCJdID0gMF0gPSBcIkxcIjtcbiAgICBGYWNlW0ZhY2VbXCJSXCJdID0gMV0gPSBcIlJcIjtcbiAgICBGYWNlW0ZhY2VbXCJEXCJdID0gMl0gPSBcIkRcIjtcbiAgICBGYWNlW0ZhY2VbXCJVXCJdID0gM10gPSBcIlVcIjtcbiAgICBGYWNlW0ZhY2VbXCJCXCJdID0gNF0gPSBcIkJcIjtcbiAgICBGYWNlW0ZhY2VbXCJGXCJdID0gNV0gPSBcIkZcIjtcbn0pKEZhY2UgfHwgKEZhY2UgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIEZyYW1lIGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGJvcmRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBvID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGkgPSBvIC0gYm9yZGVyO1xuICAgICAgICBjb25zdCBfdmVydHMgPSBbXG4gICAgICAgICAgICAtaSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksICtpLCArbyxcbiAgICAgICAgICAgICtpLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgLWksICtvLFxuICAgICAgICAgICAgLWksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgLWksXG4gICAgICAgICAgICAraSwgK28sICtpLFxuICAgICAgICAgICAgLWksICtvLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgLWksXG4gICAgICAgICAgICAtbywgK2ksIC1pLFxuICAgICAgICAgICAgLW8sICtpLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgK2ksXG4gICAgICAgICAgICAraSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksICtpLCAtbyxcbiAgICAgICAgICAgIC1pLCAtaSwgLW8sXG4gICAgICAgICAgICAraSwgLWksIC1vLFxuICAgICAgICAgICAgLWksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgK2ksXG4gICAgICAgICAgICAraSwgLW8sIC1pLFxuICAgICAgICAgICAgLWksIC1vLCAtaSxcbiAgICAgICAgICAgICtvLCAraSwgK2ksXG4gICAgICAgICAgICArbywgK2ksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAtaSxcbiAgICAgICAgICAgICtvLCAtaSwgK2ksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwicG9zaXRpb25cIiwgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoX3ZlcnRzLCAzKSk7XG4gICAgICAgIHRoaXMuc2V0SW5kZXgoRnJhbWUuX2luZGljZXMpO1xuICAgICAgICB0aGlzLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG4gICAgfVxufVxuRnJhbWUuX2luZGljZXMgPSBbXG4gICAgMCwgMiwgMSxcbiAgICAwLCAzLCAyLFxuICAgIDQsIDYsIDUsXG4gICAgNCwgNywgNixcbiAgICA4LCAxMCwgOSxcbiAgICA4LCAxMSwgMTAsXG4gICAgMTIsIDE0LCAxMyxcbiAgICAxMiwgMTUsIDE0LFxuICAgIDE2LCAxOCwgMTcsXG4gICAgMTYsIDE5LCAxOCxcbiAgICAyMCwgMjIsIDIxLFxuICAgIDIwLCAyMywgMjIsXG4gICAgMSwgNiwgNyxcbiAgICAwLCAxLCA3LFxuICAgIDMsIDAsIDEwLFxuICAgIDExLCAzLCAxMCxcbiAgICAxNywgMiwgMyxcbiAgICAxNiwgMTcsIDMsXG4gICAgMjMsIDIwLCAxLFxuICAgIDIsIDIzLCAxLFxuICAgIDUsIDEyLCAxMyxcbiAgICA0LCA1LCAxMyxcbiAgICA5LCAxMywgMTQsXG4gICAgOCwgOSwgMTQsXG4gICAgMjIsIDE1LCAxMixcbiAgICAyMSwgMjIsIDEyLFxuICAgIDE5LCAxNCwgMTUsXG4gICAgMTgsIDE5LCAxNSxcbiAgICA3LCA0LCA5LFxuICAgIDEwLCA3LCA5LFxuICAgIDExLCA4LCAxOSxcbiAgICAxNiwgMTEsIDE5LFxuICAgIDIzLCAxNywgMTgsXG4gICAgMjIsIDIzLCAxOCxcbiAgICAyMCwgMjEsIDUsXG4gICAgNiwgMjAsIDUsXG4gICAgMjAsIDYsIDEsXG4gICAgMTAsIDAsIDcsXG4gICAgMjEsIDEyLCA1LFxuICAgIDEzLCA5LCA0LFxuICAgIDIzLCAyLCAxNyxcbiAgICAxMSwgMTYsIDMsXG4gICAgMjIsIDE4LCAxNSxcbiAgICA4LCAxNCwgMTksXG5dO1xuZXhwb3J0IGNsYXNzIFN0aWNrZXIgZXh0ZW5kcyBUSFJFRS5FeHRydWRlR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGRlcHRoLCBhcnJvdykge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBpZiAoYXJyb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGggPSBzaXplICogMC42O1xuICAgICAgICAgICAgY29uc3QgdyA9IGggKiAwLjg7XG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IG5ldyBUSFJFRS5QYXRoKCk7XG4gICAgICAgICAgICBhcnJvdy5tb3ZlVG8oMCwgaCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8oLXcsIDApO1xuICAgICAgICAgICAgYXJyb3cubGluZVRvKC13IC8gMiwgMCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8oLXcgLyAyLCAtaCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8odyAvIDIsIC1oKTtcbiAgICAgICAgICAgIGFycm93LmxpbmVUbyh3IC8gMiwgMCk7XG4gICAgICAgICAgICBhcnJvdy5saW5lVG8odywgMCk7XG4gICAgICAgICAgICBhcnJvdy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHNoYXBlLmhvbGVzLnB1c2goYXJyb3cpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHNoYXBlLCB7IGJldmVsRW5hYmxlZDogZmFsc2UsIGRlcHRoOiBkZXB0aCB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgVEhSRUUuU2hhcGVHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBzdXBlcihzaGFwZSk7XG4gICAgfVxufVxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuL2ludGVyYWN0b3JcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi93b3JsZFwiO1xubGV0IFZpZXdwb3J0ID0gY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgICAgICBjYW52YXM6IGNhbnZhc0VsZW0sXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICAgICAgICBhbHBoYTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDAsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLndvcmxkLnNjZW5lLCB0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIEluamVjdChcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwiY2FudmFzXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBIVE1MRWxlbWVudClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJjYW52YXNcIiwgdm9pZCAwKTtcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IHJlZj1cImNhbnZhc1wiPjwvZGl2PicsXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIH0pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbXSlcbl0sIFZpZXdwb3J0KTtcbmV4cG9ydCBkZWZhdWx0IFZpZXdwb3J0O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgQ3ViZSBmcm9tIFwiLi9jdWJlXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2RlZnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueCA9IE1hdGguUEkgLyA2O1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMTY7XG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDApO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsLnBvc2l0aW9uLnNldChjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLnNpemUgKiAzLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmRpcmVjdGlvbmFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIDEsIDEsIGN1YmVsZXRfZGVmcy5zaXplICogMzIpO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IDA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAwO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlID0gbmV3IEN1YmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmUgPSA5O1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIH1cbiAgICB1cGRhdGVDYW1lcmEoKSB7XG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuaGVpZ2h0IC8gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gdGhpcy5zY2FsZSAvIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIGNvbnN0IGZvdiA9ICgyICogTWF0aC5hdGFuKG1pbikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMgKiB0aGlzLnBlcnNwZWN0aXZlO1xuICAgICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IGRpc3RhbmNlO1xuICAgICAgICB0aGlzLmNhbWVyYS5uZWFyID0gZGlzdGFuY2UgLSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZhciA9IGRpc3RhbmNlICsgY3ViZWxldF9kZWZzLnNpemUgKiA4O1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQodGhpcy5zY2VuZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWV0aWZ5IGZyb20gXCJ2dWV0aWZ5XCI7XG5pbXBvcnQgXCJ2dWV0aWZ5L2Rpc3QvdnVldGlmeS5taW4uY3NzXCI7XG5pbXBvcnQgXCJtYXRlcmlhbC1kZXNpZ24taWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCI7XG5pbXBvcnQgUGxheWdyb3VuZCBmcm9tIFwiLi92dWVhcHAvcGxheWdyb3VuZFwiO1xuVnVlLnVzZShWdWV0aWZ5KTtcbmNvbnN0IG9wdHMgPSB7fTtcbmNvbnN0IHZ1ZXRpZnkgPSBuZXcgVnVldGlmeShvcHRzKTtcblZ1ZS5wcm90b3R5cGUudnVldGlmeSA9IHZ1ZXRpZnk7XG5sZXQgYXBwID0gUGxheWdyb3VuZDtcbmNvbnN0IHZtID0gbmV3IFZ1ZSh7XG4gICAgdnVldGlmeSxcbiAgICBlbDogXCIjYXBwXCIsXG4gICAgcmVuZGVyOiAoaCkgPT4gaChhcHApLFxufSk7XG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIFByb3ZpZGUsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uLy4uL2N1YmUvdmlld3BvcnRcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vY3ViZS93b3JsZFwiO1xubGV0IFBsYXlncm91bmQgPSBjbGFzcyBQbGF5Z3JvdW5kIGV4dGVuZHMgVnVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZCgpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMudmlld3BvcnQucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuY2FsY3VWaWV3cG9ydEhlaWdodCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XG4gICAgfVxuICAgIGNhbGN1Vmlld3BvcnRIZWlnaHQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4gaGVpZ2h0IC0gTWF0aC5jZWlsKE1hdGgubWluKHdpZHRoIC8gNiwgaGVpZ2h0IC8gMTIpKSAqIDEuNTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgUHJvdmlkZShcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwidmlld3BvcnRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwidmlld3BvcnRcIiwgdm9pZCAwKTtcblBsYXlncm91bmQgPSBfX2RlY29yYXRlKFtcbiAgICBDb21wb25lbnQoe1xuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaW5kZXguaHRtbFwiKSxcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgdmlld3BvcnQ6IFZpZXdwb3J0XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9