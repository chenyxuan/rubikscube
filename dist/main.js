/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\r\n    <viewport ref=\"viewport\"></viewport>\r\n</v-app>\r\n"

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RnQztBQUN6QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xELGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw2QkFBNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFEQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoYStCO0FBQzJCO0FBQ25EO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDBCQUEwQixrREFBSztBQUMvQjtBQUNQO0FBQ0E7QUFDQSwwQkFBMEIsb0RBQXVCLEdBQUcsNEJBQTRCO0FBQ2hGO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0EsMEJBQTBCLHNEQUF5QixHQUFHLDRCQUE0QjtBQUNsRjtBQUNBO0FBQ0EsQ0FBQztBQUNNLHlCQUF5QixvREFBdUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNLDBCQUEwQixvREFBdUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ00sNEJBQTRCLG9EQUFPO0FBQ25DLDJCQUEyQixtREFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ1Q7QUFDeEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0JBQW9CO0FBQ2Qsb0JBQW9CLGlEQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseURBQTRCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxzQkFBc0Isa0RBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdDQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVDQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1DQUFtQztBQUMxRDtBQUNBO0FBQ08scUJBQXFCLGdEQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3Q0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckpBLGtCQUFrQixTQUFJLElBQUksU0FBSTtBQUM5QjtBQUNBO0FBQ0EsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBLGtCQUFrQixTQUFJLElBQUksU0FBSTtBQUM5QjtBQUNBO0FBQ3NCO0FBQzBDO0FBQ2pDO0FBQ087QUFDVjtBQUM1QixzQ0FBc0MsMkNBQUc7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0RBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsbURBQVU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFNO0FBQ1YsOEJBQThCLDhDQUFLO0FBQ25DO0FBQ0E7QUFDQSxJQUFJLDJEQUFHO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBUztBQUNiO0FBQ0Esc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZETztBQUNPO0FBQ1o7QUFDYTtBQUN4QjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHdDQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrQ0FBa0I7QUFDN0MsK0JBQStCLG1EQUFzQjtBQUNyRCxzQ0FBc0MscURBQWlCLEVBQUUscURBQWlCLE1BQU0scURBQWlCO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvREFBdUIsV0FBVyxxREFBaUI7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1EQUFVO0FBQ3hDLHdCQUF3Qiw2Q0FBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscURBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxxREFBaUI7QUFDdkQscUNBQXFDLHFEQUFpQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEc0I7QUFDUTtBQUNRO0FBQ3FCO0FBQ2Q7QUFDN0MsK0NBQU8sQ0FBQyxnREFBTztBQUNmO0FBQ0Esb0JBQW9CLGdEQUFPO0FBQzNCLDZEQUFxQjtBQUNyQixVQUFVLDBEQUFVO0FBQ3BCLGVBQWUsMkNBQUc7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkRCxrQkFBa0IsU0FBSSxJQUFJLFNBQUk7QUFDOUI7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQSxrQkFBa0IsU0FBSSxJQUFJLFNBQUk7QUFDOUI7QUFDQTtBQUNzQjtBQUMyQztBQUN0QjtBQUNOO0FBQ3JDLDBDQUEwQywyQ0FBRztBQUM3QztBQUNBO0FBQ0EseUJBQXlCLG1EQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBLElBQUksMkRBQUc7QUFDUCw4QkFBOEIsc0RBQVE7QUFDdEM7QUFDQTtBQUNBLElBQUksaUVBQVM7QUFDYixrQkFBa0IsbUJBQU8sQ0FBQyx3REFBYztBQUN4QztBQUNBLHNCQUFzQixzREFBUTtBQUM5QixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2pEMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmVsZXQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2dyb3VwLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9oaXN0b3J5LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9pbnRlcmFjdG9yLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS90d2lzdGVyLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlscy50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdXRpbHNfaW50ZXJuYWwudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3ZpZXdwb3J0LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS93b3JsZC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8di1hcHA+XFxyXFxuICAgIDx2aWV3cG9ydCByZWY9XFxcInZpZXdwb3J0XFxcIj48L3ZpZXdwb3J0Plxcclxcbjwvdi1hcHA+XFxyXFxuXCIiLCJpbXBvcnQgQ3ViZUdyb3VwIGZyb20gXCIuL2dyb3VwXCI7XHJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBUd2lzdEFjdGlvbiwgdHdlZW5lciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcclxuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XHJcbmltcG9ydCB7IGN1YmVsZXRfZGVmcyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCBjbGFzcyBIb2xkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3Iod29ybGQpIHtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcclxuICAgICAgICB0aGlzLnJheSA9IG5ldyBUSFJFRS5SYXkoKTtcclxuICAgICAgICB0aGlzLmRvd24gPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcclxuICAgICAgICB0aGlzLm1vdmUgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgSG9sZGVyKCk7XHJcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMucGxhbmVzID0gW1xyXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxyXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxyXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksICgtY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpLFxyXG4gICAgICAgICAgICBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApLCAoLWN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyKSxcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSwgKC1jdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMiksXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLl9sb2NrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2Vuc2l0aXZpdHkgPSAwLjU7XHJcbiAgICAgICAgdGhpcy50aWNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5ob3ZlciA9IC0xO1xyXG4gICAgICAgIHRoaXMuaW50ZXJhY3QgPSAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaHN0YXJ0XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnggPSBhY3Rpb24ueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24ueSA9IGFjdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlbW92ZVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS54ID0gYWN0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlLnkgPSBhY3Rpb24ueTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNlb3V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XHJcbiAgICAgICAgdGhpcy50YXBzID0gW107XHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgbG9jaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jaztcclxuICAgIH1cclxuICAgIHNldCBsb2NrKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xyXG4gICAgICAgIHRoaXMuX2xvY2sgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBkaXNhYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlO1xyXG4gICAgfVxyXG4gICAgc2V0IGRpc2FibGUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgbG9vcCgpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLmNvbnRpbmdsZSArIHRoaXMuYW5nbGU7XHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSB0aGlzLmdyb3VwLmFuZ2xlKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cC5hbmdsZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzWzBdXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKGFuZ2xlIC0gZ3JvdXAuYW5nbGUpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWF0Y2goKSB7XHJcbiAgICAgICAgY29uc3QgcGxhbmUgPSB0aGlzLmhvbGRlci5wbGFuZS5ub3JtYWw7XHJcbiAgICAgICAgY29uc3QgZmluZ2VyID0gdGhpcy5ob2xkZXIudmVjdG9yO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ob2xkZXIuaW5kZXg7XHJcbiAgICAgICAgY29uc3Qgb3JkZXIgPSB0aGlzLndvcmxkLmN1YmUub3JkZXI7XHJcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xyXG4gICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBDdWJlR3JvdXAuQVhJU19WRUNUT1JbYXhpc107XHJcbiAgICAgICAgICAgIGlmICh2ZWN0b3IuZG90KHBsYW5lKSA9PT0gMCAmJiB2ZWN0b3IuZG90KGZpbmdlcikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IDA7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IGluZGV4ICUgb3JkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gTWF0aC5mbG9vcigoaW5kZXggJSAob3JkZXIgKiBvcmRlcikpIC8gb3JkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoaW5kZXggLyAob3JkZXIgKiBvcmRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW2F4aXNdW2xheWVyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcclxuICAgICAgICBjb25zdCB4ID0gKHBvaW50LnggLyB0aGlzLndvcmxkLndpZHRoKSAqIDIgLSAxO1xyXG4gICAgICAgIGNvbnN0IHkgPSAtKHBvaW50LnkgLyB0aGlzLndvcmxkLmhlaWdodCkgKiAyICsgMTtcclxuICAgICAgICB0aGlzLnJheS5vcmlnaW4uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMud29ybGQuY2FtZXJhLm1hdHJpeFdvcmxkKTtcclxuICAgICAgICB0aGlzLnJheS5kaXJlY3Rpb24uc2V0KHgsIHksIDAuNSkudW5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKS5zdWIodGhpcy5yYXkub3JpZ2luKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB0aGlzLm1hdHJpeC5jb3B5KHRoaXMud29ybGQuc2NlbmUubWF0cml4KTtcclxuICAgICAgICB0aGlzLm1hdHJpeC5pbnZlcnQoKTtcclxuICAgICAgICB0aGlzLnJheS5hcHBseU1hdHJpeDQodGhpcy5tYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBUSFJFRS5WZWN0b3IzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpO1xyXG4gICAgICAgIHRoaXMucmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVEb3duKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZyB8fCB0aGlzLnJvdGF0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMucGxhbmVzLmZvckVhY2goKHBsYW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCBwbGFuZSk7XHJcbiAgICAgICAgICAgIGlmIChwb2ludCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBwb2ludC54IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb2ludC55IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHogPSBwb2ludC56IC8gY3ViZWxldF9kZWZzLnNpemUgLyAzO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgpIDw9IDAuNTAwMSAmJiBNYXRoLmFicyh5KSA8PSAwLjUwMDEgJiYgTWF0aC5hYnMoeikgPD0gMC41MDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IE1hdGgucG93KHBvaW50LnggLSB0aGlzLnJheS5vcmlnaW4ueCwgMikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy5yYXkub3JpZ2luLnksIDIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cocG9pbnQueiAtIHRoaXMucmF5Lm9yaWdpbi56LCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPT0gMCB8fCBkIDwgZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIucGxhbmUgPSBwbGFuZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JkZXIgPSB0aGlzLndvcmxkLmN1YmUub3JkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHggKyAwLjUpICogb3JkZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHkgKyAwLjUpICogb3JkZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHogPSBNYXRoLm1heCgwLCBNYXRoLm1pbihvcmRlciAtIDEsIE1hdGguZmxvb3IoKHogKyAwLjUpICogb3JkZXIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0geiAqIG9yZGVyICogb3JkZXIgKyB5ICogb3JkZXIgKyB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVNb3ZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICBjb25zdCBkeCA9IHRoaXMubW92ZS54IC0gdGhpcy5kb3duLng7XHJcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcclxuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLm1pbih0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodCkgLyBkID4gMTI4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZGVyLmluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGR4ICogZHggPiBkeSAqIGR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYWxmID0gdGhpcy53b3JsZC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGYgPSBuZXcgVEhSRUUuVmVjdG9yMygtKGN1YmVsZXRfZGVmcy5zaXplICogMykgLyAyLCAwLCAoY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxmLmFwcGx5TWF0cml4NCh0aGlzLndvcmxkLnNjZW5lLm1hdHJpeCkucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbHggPSBNYXRoLnJvdW5kKGxmLnggKiBoYWxmICsgaGFsZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmYgPSBuZXcgVEhSRUUuVmVjdG9yMygoY3ViZWxldF9kZWZzLnNpemUgKiAzKSAvIDIsIDAsIChjdWJlbGV0X2RlZnMuc2l6ZSAqIDMpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmYuYXBwbHlNYXRyaXg0KHRoaXMud29ybGQuc2NlbmUubWF0cml4KS5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByeCA9IE1hdGgucm91bmQocmYueCAqIGhhbGYgKyBoYWxmKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGYueiA8IHJmLnopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgbHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3duLnggPCByeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGluZ2xlID0gbmV3IFNldCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5lci5maW5pc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGluZ2xlLmFkZChncm91cC5hbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGluZ2xlLnNpemUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCB0aGlzLmhvbGRlci5wbGFuZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHRoaXMuaG9sZGVyLnBsYW5lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMudmVjdG9yLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMudmVjdG9yLnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeiA9IHRoaXMudmVjdG9yLno7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heChNYXRoLmFicyh4KSwgTWF0aC5hYnMoeSksIE1hdGguYWJzKHopKTtcclxuICAgICAgICAgICAgICAgIHggPSBNYXRoLmFicyh4KSA9PT0gbWF4ID8geCA6IDA7XHJcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5hYnMoeSkgPT09IG1heCA/IHkgOiAwO1xyXG4gICAgICAgICAgICAgICAgeiA9IE1hdGguYWJzKHopID09PSBtYXggPyB6IDogMDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnNldCh4LCB5LCB6KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnZlY3Rvci5jb3B5KHRoaXMudmVjdG9yLm11bHRpcGx5KHRoaXMudmVjdG9yKS5ub3JtYWxpemUoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gdGhpcy5tYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdGhpcy5ncm91cC5kcmFnKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0d2VlbmVyLmZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gdGhpcy5ncm91cC5hbmdsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHRoaXMuaG9sZGVyLnBsYW5lLm5vcm1hbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci52ZWN0b3IubXVsdGlwbHlTY2FsYXIodGhpcy52ZWN0b3IueCArIHRoaXMudmVjdG9yLnkgKyB0aGlzLnZlY3Rvci56KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHRoaXMuaG9sZGVyLnBsYW5lKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgdGhpcy5ob2xkZXIucGxhbmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3Iuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KS5tdWx0aXBseSh0aGlzLmhvbGRlci52ZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVjdG9yID0gQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuZ3JvdXAuYXhpc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID1cclxuICAgICAgICAgICAgICAgICAgICAoKC0odGhpcy52ZWN0b3IueCArIHRoaXMudmVjdG9yLnkgKyB0aGlzLnZlY3Rvci56KSAqICh2ZWN0b3IueCArIHZlY3Rvci55ICsgdmVjdG9yLnopKSAvIGN1YmVsZXRfZGVmcy5zaXplKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguUEkgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnNpdGl2aXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gKC1keCAvIGN1YmVsZXRfZGVmcy5zaXplKSAqIE1hdGguUEkgKiB0aGlzLnNlbnNpdGl2aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gKC1keSAvIGN1YmVsZXRfZGVmcy5zaXplKSAqIE1hdGguUEkgKiB0aGlzLnNlbnNpdGl2aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gKGR5IC8gY3ViZWxldF9kZWZzLnNpemUpICogTWF0aC5QSSAqIHRoaXMuc2Vuc2l0aXZpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ6J1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gKC1keSAvIGN1YmVsZXRfZGVmcy5zaXplKSAqIE1hdGguUEkgKiB0aGlzLnNlbnNpdGl2aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoYW5kbGVVcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICBsZXQgZmFjZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5ob2xkZXIucGxhbmUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMF06XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuUjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMV06XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuVTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5wbGFuZXNbMl06XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZSA9IEZhY2UuRjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhcCBvZiB0aGlzLnRhcHMpIHtcclxuICAgICAgICAgICAgICAgIHRhcCh0aGlzLmhvbGRlci5pbmRleCwgZmFjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPCBNYXRoLlBJIC8gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IChNYXRoLmFicyhhbmdsZSkgLyAodGljayAtIHRoaXMudGljaykpICogMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPiAwLjIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSA9PSAwID8gMCA6ICgoYW5nbGUgLyBNYXRoLmFicyhhbmdsZSkpICogTWF0aC5QSSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNvbnRpbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFuZ2xlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXMgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2ZXJzZSA9IHRpbWVzIDwgMDtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcyA9IE1hdGguYWJzKHRpbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVjb3JkKG5ldyBUd2lzdEFjdGlvbih0aGlzLmdyb3VwLm5hbWUsIHJldmVyc2UsIHRpbWVzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc1swXV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5nbGUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lcyA9IE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnNlID0gdGltZXMgPCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzID0gTWF0aC5hYnModGltZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuY3ViZS5yZWNvcmQobmV3IFR3aXN0QWN0aW9uKHRoaXMuYXhpcywgcmV2ZXJzZSwgdGltZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCBDdWJlbGV0IGZyb20gXCIuL2N1YmVsZXRcIjtcclxuaW1wb3J0IHsgR3JvdXBUYWJsZSB9IGZyb20gXCIuL2dyb3VwXCI7XHJcbmltcG9ydCBUd2lzdGVyLCB7IHR3ZWVuZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XHJcbmltcG9ydCBIaXN0b3J5IGZyb20gXCIuL2hpc3RvcnlcIjtcclxuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRpYWxzID0gW107XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgICAgICB0aGlzLnR3aXN0ZXIgPSBuZXcgVHdpc3Rlcih0aGlzKTtcclxuICAgICAgICBjb25zdCBvcmRlciA9IDM7XHJcbiAgICAgICAgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc2V0KDMgLyBvcmRlciwgMyAvIG9yZGVyLCAzIC8gb3JkZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXIgKiBvcmRlciAqIG9yZGVyOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xyXG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbHMucHVzaChjdWJlbGV0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9ja3MgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XHJcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ5XCIsIG5ldyBTZXQoKSk7XHJcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ6XCIsIG5ldyBTZXQoKSk7XHJcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IEhpc3RvcnkoKTtcclxuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IEdyb3VwVGFibGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcclxuICAgIH1cclxuICAgIGNhbGxiYWNrKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgbG9jayBvZiB0aGlzLmxvY2tzLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NrLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvY2soYXhpcywgbGF5ZXIpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKChfYSA9IHRoaXMubG9ja3MuZ2V0KFwiYVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhcygxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xyXG4gICAgICAgIGlmICh0bXAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGxvY2sgIT0gdG1wICYmIGxvY2suc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0bXAuYWRkKGxheWVyKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHVubG9jayhheGlzLCBsYXllcikge1xyXG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xyXG4gICAgICAgIHRtcCA9PT0gbnVsbCB8fCB0bXAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRtcC5kZWxldGUobGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgcmVjb3JkKGFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeS5yZWNvcmQoYWN0aW9uKTtcclxuICAgIH1cclxuICAgIGdldCBjb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZSA9IFtGYWNlLlUsIEZhY2UuRCwgRmFjZS5MLCBGYWNlLlIsIEZhY2UuRiwgRmFjZS5CXS5ldmVyeSgoZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IHRoaXMudGFibGUuZmFjZShGYWNlW2ZhY2VdKTtcclxuICAgICAgICAgICAgaWYgKCFncm91cCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbZ3JvdXAuaW5kaWNlc1swXV07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gY3ViZWxldC5nZXRGYWNlKGZhY2UpO1xyXG4gICAgICAgICAgICBjb25zdCBzYW1lID0gZ3JvdXAuaW5kaWNlcy5ldmVyeSgoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpZHhdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yID09IGN1YmVsZXQuZ2V0RmFjZShmYWNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb21wbGV0ZTtcclxuICAgIH1cclxuICAgIGluZGV4KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbHNbdmFsdWVdLmluZGV4O1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdHdlZW5lci5maW5pc2goKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGN1YmVsZXQgb2YgdGhpcy5jdWJlbGV0cykge1xyXG4gICAgICAgICAgICBjdWJlbGV0LnNldFJvdGF0aW9uRnJvbUV1bGVyKG5ldyBUSFJFRS5FdWxlcigwLCAwLCAwKSk7XHJcbiAgICAgICAgICAgIGN1YmVsZXQuaW5kZXggPSBjdWJlbGV0LmluaXRpYWw7XHJcbiAgICAgICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3ViZWxldHMuc29ydCgobGVmdCwgcmlnaHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0aWNrKGluZGV4LCBmYWNlLCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmluaXRpYWxzW2luZGV4XTtcclxuICAgICAgICBpZiAoIWN1YmVsZXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIGN1YmVsZXQgaW5kZXg6IFwiICsgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdWJlbGV0LnN0aWNrKGZhY2UsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHN0cmlwKHN0cmlwKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBmYWNlIG9mIFtGYWNlLkwsIEZhY2UuUiwgRmFjZS5ELCBGYWNlLlUsIEZhY2UuQiwgRmFjZS5GXSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBGYWNlW2ZhY2VdO1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IHRoaXMudGFibGUuZmFjZShrZXkpO1xyXG4gICAgICAgICAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaW5kZXggb2YgZ3JvdXAuaW5kaWNlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsc1tpbmRleF0uc3RpY2soZmFjZSwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXhlcyA9IHN0cmlwW2tleV07XHJcbiAgICAgICAgICAgIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRleGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5pbml0aWFsc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1YmVsZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgY3ViZWxldCBpbmRleDogXCIgKyBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrKGZhY2UsIFwicmVtb3ZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCB4LCB5LCB6O1xyXG4gICAgICAgIHkgPSB0aGlzLm9yZGVyIC0gMTtcclxuICAgICAgICBmb3IgKHogPSAwOyB6IDwgdGhpcy5vcmRlcjsgeisrKSB7XHJcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLm9yZGVyOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvcihGYWNlLlUpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHggPSB0aGlzLm9yZGVyIC0gMTtcclxuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcclxuICAgICAgICAgICAgZm9yICh6ID0gdGhpcy5vcmRlciAtIDE7IHogPj0gMDsgei0tKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5SKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB6ID0gdGhpcy5vcmRlciAtIDE7XHJcbiAgICAgICAgZm9yICh5ID0gdGhpcy5vcmRlciAtIDE7IHkgPj0gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLm9yZGVyOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyICsgeSAqIHRoaXMub3JkZXIgKyB4O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvcihGYWNlLkYpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICAgIGZvciAoeiA9IHRoaXMub3JkZXIgLSAxOyB6ID49IDA7IHotLSkge1xyXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgdGhpcy5vcmRlcjsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiB0aGlzLm9yZGVyICogdGhpcy5vcmRlciArIHkgKiB0aGlzLm9yZGVyICsgeDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3IoRmFjZS5EKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4ID0gMDtcclxuICAgICAgICBmb3IgKHkgPSB0aGlzLm9yZGVyIC0gMTsgeSA+PSAwOyB5LS0pIHtcclxuICAgICAgICAgICAgZm9yICh6ID0gMDsgeiA8IHRoaXMub3JkZXI7IHorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yKEZhY2UuTCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeiA9IDA7XHJcbiAgICAgICAgZm9yICh5ID0gdGhpcy5vcmRlciAtIDE7IHkgPj0gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGZvciAoeCA9IHRoaXMub3JkZXIgLSAxOyB4ID49IDA7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yKEZhY2UuQik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGN1YmVsZXRfZGVmcywgY3ViZWxldF9jb3JlLCBjdWJlbGV0X2xhbWJlcnMsIGN1YmVsZXRfYmFzaWNzLCBjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbWlycm9yIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IEZhY2UgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlbGV0IGV4dGVuZHMgVEhSRUUuR3JvdXAge1xyXG4gICAgY29uc3RydWN0b3IoaW5kZXgpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3ZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgdGhpcy5vcmRlciA9IGN1YmVsZXRfZGVmcy5vcmRlcjtcclxuICAgICAgICB0aGlzLmluaXRpYWwgPSBpbmRleDtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5zdGlja2VycyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWlycm9ycyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGhhbGYgPSAodGhpcy5vcmRlciAtIDEpIC8gMjtcclxuICAgICAgICB0aGlzLmxhbWJlcnRzID0gW1xyXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IC1oYWxmID8gY3ViZWxldF9sYW1iZXJzLkwgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPT0gaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5SIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci55ID09IC1oYWxmID8gY3ViZWxldF9sYW1iZXJzLkQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnkgPT0gaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5VIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci56ID09IC1oYWxmID8gY3ViZWxldF9sYW1iZXJzLkIgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnogPT0gaGFsZiA/IGN1YmVsZXRfbGFtYmVycy5GIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5iYXNpY3MgPSBbXHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPT0gLWhhbGYgPyBjdWJlbGV0X2Jhc2ljcy5MIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci54ID09IGhhbGYgPyBjdWJlbGV0X2Jhc2ljcy5SIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci55ID09IC1oYWxmID8gY3ViZWxldF9iYXNpY3MuRCA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueSA9PSBoYWxmID8gY3ViZWxldF9iYXNpY3MuVSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueiA9PSAtaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkIgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnogPT0gaGFsZiA/IGN1YmVsZXRfYmFzaWNzLkYgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9mcmFtZSwgY3ViZWxldF9jb3JlKTtcclxuICAgICAgICB0aGlzLmFkZCh0aGlzLmZyYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYW1iZXJ0c1tpXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9zdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCB0aGlzLmxhbWJlcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5MOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5wb3NpdGlvbi54ID0gLWN1YmVsZXRfZGVmcy5zaXplIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLlI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnJvdGF0aW9uLnkgPSBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueCA9IGN1YmVsZXRfZGVmcy5zaXplIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBGYWNlLkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucG9zaXRpb24ueSA9IC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRmFjZS5VOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5wb3NpdGlvbi55ID0gY3ViZWxldF9kZWZzLnNpemUgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEZhY2UuQjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueCA9IE1hdGguUEk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zdGlja2VyLnBvc2l0aW9uLnogPSAtY3ViZWxldF9kZWZzLnNpemUgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEZhY2UuRjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0aWNrZXIucm90YXRpb24ueCA9IDIgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc3RpY2tlci5wb3NpdGlvbi56ID0gY3ViZWxldF9kZWZzLnNpemUgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKF9zdGlja2VyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2tlcnNbaV0gPSBfc3RpY2tlcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9taXJyb3IgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X21pcnJvciwgdGhpcy5iYXNpY3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi54ID0gX3N0aWNrZXIucm90YXRpb24ueCA9PSAwID8gMCA6IF9zdGlja2VyLnJvdGF0aW9uLnggKyBNYXRoLlBJO1xyXG4gICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi55ID0gX3N0aWNrZXIucm90YXRpb24ueSA9PSAwID8gMCA6IF9zdGlja2VyLnJvdGF0aW9uLnkgKyBNYXRoLlBJO1xyXG4gICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi56ID0gX3N0aWNrZXIucm90YXRpb24ueiA9PSAwID8gMCA6IF9zdGlja2VyLnJvdGF0aW9uLnogKyBNYXRoLlBJO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9taXJyb3Iucm90YXRpb24ueCArIF9taXJyb3Iucm90YXRpb24ueSArIF9taXJyb3Iucm90YXRpb24ueiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX21pcnJvci5yb3RhdGlvbi55ID0gTWF0aC5QSTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9taXJyb3IucG9zaXRpb24ueCA9IF9zdGlja2VyLnBvc2l0aW9uLnggKiAodGhpcy5vcmRlciArIDEpO1xyXG4gICAgICAgICAgICAgICAgX21pcnJvci5wb3NpdGlvbi55ID0gX3N0aWNrZXIucG9zaXRpb24ueSAqICh0aGlzLm9yZGVyICsgMSk7XHJcbiAgICAgICAgICAgICAgICBfbWlycm9yLnBvc2l0aW9uLnogPSBfc3RpY2tlci5wb3NpdGlvbi56ICogKHRoaXMub3JkZXIgKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWlycm9yc1tpXSA9IF9taXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcclxuICAgIH1cclxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XHJcbiAgICAgICAgY29uc3QgaGFsZiA9ICh0aGlzLm9yZGVyIC0gMSkgLyAyO1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5yb3VuZCh2ZWN0b3IueCAqIDIpIC8gMjtcclxuICAgICAgICBsZXQgeSA9IE1hdGgucm91bmQodmVjdG9yLnkgKiAyKSAvIDI7XHJcbiAgICAgICAgbGV0IHogPSBNYXRoLnJvdW5kKHZlY3Rvci56ICogMikgLyAyO1xyXG4gICAgICAgIHRoaXMuX3ZlY3Rvci5zZXQoeCwgeSwgeik7XHJcbiAgICAgICAgeCA9IE1hdGgucm91bmQoeCArIGhhbGYpO1xyXG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgKyBoYWxmKTtcclxuICAgICAgICB6ID0gTWF0aC5yb3VuZCh6ICsgaGFsZik7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSB6ICogdGhpcy5vcmRlciAqIHRoaXMub3JkZXIgKyB5ICogdGhpcy5vcmRlciArIHg7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gY3ViZWxldF9kZWZzLnNpemUgKiB0aGlzLl92ZWN0b3IueDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIHRoaXMuX3ZlY3Rvci55O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueiA9IGN1YmVsZXRfZGVmcy5zaXplICogdGhpcy5fdmVjdG9yLno7XHJcbiAgICB9XHJcbiAgICBnZXQgdmVjdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZWN0b3I7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5kZXgoaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBoYWxmID0gKHRoaXMub3JkZXIgLSAxKSAvIDI7XHJcbiAgICAgICAgY29uc3QgX3ggPSAoaW5kZXggJSB0aGlzLm9yZGVyKSAtIGhhbGY7XHJcbiAgICAgICAgY29uc3QgX3kgPSBNYXRoLmZsb29yKChpbmRleCAlICh0aGlzLm9yZGVyICogdGhpcy5vcmRlcikpIC8gdGhpcy5vcmRlcikgLSBoYWxmO1xyXG4gICAgICAgIGNvbnN0IF96ID0gTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLm9yZGVyICogdGhpcy5vcmRlcikpIC0gaGFsZjtcclxuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKF94LCBfeSwgX3opO1xyXG4gICAgfVxyXG4gICAgZ2V0IGluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleDtcclxuICAgIH1cclxuICAgIHN0aWNrKGZhY2UsIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGxhbWJlcjtcclxuICAgICAgICBsZXQgYmFzaWM7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RpY2tlcnNbZmFjZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInJlbW92ZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RpY2tlcnNbZmFjZV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1pcnJvcnNbZmFjZV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RpY2tlcnNbZmFjZV0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5taXJyb3JzW2ZhY2VdLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxhbWJlciA9IGN1YmVsZXRfbGFtYmVyc1t2YWx1ZV07XHJcbiAgICAgICAgICAgIGJhc2ljID0gY3ViZWxldF9iYXNpY3NbdmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGFtYmVyID0gdGhpcy5sYW1iZXJ0c1tmYWNlXTtcclxuICAgICAgICAgICAgYmFzaWMgPSB0aGlzLmJhc2ljc1tmYWNlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhbWJlciA9PT0gdW5kZWZpbmVkIHx8IGJhc2ljID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0aWNrZXJzW2ZhY2VdLm1hdGVyaWFsID0gbGFtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLm1pcnJvcnNbZmFjZV0gaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWlycm9yc1tmYWNlXS5tYXRlcmlhbCA9IGJhc2ljO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEZhY2UoZmFjZSkge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgc3dpdGNoIChmYWNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRmFjZS5MOlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRmFjZS5SOlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGYWNlLkQ6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGYWNlLlU6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZhY2UuQjpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnogPSAtMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZhY2UuRjpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcXVhdGVybmlvbi5jb3B5KHRoaXMucXVhdGVybmlvbik7XHJcbiAgICAgICAgcG9zaXRpb24uYXBwbHlRdWF0ZXJuaW9uKHRoaXMuX3F1YXRlcm5pb24uaW52ZXJ0KCkpO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKHBvc2l0aW9uLngpO1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHBvc2l0aW9uLnkpO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnJvdW5kKHBvc2l0aW9uLnopO1xyXG4gICAgICAgIGxldCBjb2xvciA9IDA7XHJcbiAgICAgICAgaWYgKHggPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5MO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4ID4gMCkge1xyXG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuUjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeSA8IDApIHtcclxuICAgICAgICAgICAgY29sb3IgPSBGYWNlLkQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHkgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbG9yID0gRmFjZS5VO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh6IDwgMCkge1xyXG4gICAgICAgICAgICBjb2xvciA9IEZhY2UuQjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeiA+IDApIHtcclxuICAgICAgICAgICAgY29sb3IgPSBGYWNlLkY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuICAgIGdldENvbG9yKGZhY2UpIHtcclxuICAgICAgICBjb25zdCBzdGlja2VyID0gdGhpcy5zdGlja2Vyc1t0aGlzLmdldEZhY2UoZmFjZSldO1xyXG4gICAgICAgIGlmICghc3RpY2tlciB8fCAhc3RpY2tlci52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIj9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChzdGlja2VyLm1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJMXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkY6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJGXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJCXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVXCI7XHJcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJEXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIj9cIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgdHdlZW5lciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZUdyb3VwIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xyXG4gICAgY29uc3RydWN0b3IoY3ViZSwgYXhpcywgbGF5ZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHdlZW4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5jdWJlID0gY3ViZTtcclxuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdWJlbGV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGhpcy5heGlzID0gYXhpcztcclxuICAgICAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgY29uc3QgaGFsZiA9ICh0aGlzLmN1YmUub3JkZXIgLSAxKSAvIDI7XHJcbiAgICAgICAgY29uc3QgdGFibGUgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IFwiUlwiLFxyXG4gICAgICAgICAgICAgICAgeTogXCJVXCIsXHJcbiAgICAgICAgICAgICAgICB6OiBcIkZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogXCJMJ1wiLFxyXG4gICAgICAgICAgICAgICAgeTogXCJEJ1wiLFxyXG4gICAgICAgICAgICAgICAgejogXCJCJ1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBcIk0nXCIsXHJcbiAgICAgICAgICAgICAgICB5OiBcIkUnXCIsXHJcbiAgICAgICAgICAgICAgICB6OiBcIlNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCB0eXBlID0gMDtcclxuICAgICAgICBpZiAodGhpcy5sYXllciA9PT0gaGFsZikge1xyXG4gICAgICAgICAgICBsYXllciA9IDA7XHJcbiAgICAgICAgICAgIHR5cGUgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmxheWVyIDwgaGFsZikge1xyXG4gICAgICAgICAgICB0eXBlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxheWVyID0gdGhpcy5jdWJlLm9yZGVyIC0gbGF5ZXIgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuYW1lID0gdGFibGVbdHlwZV1bdGhpcy5heGlzXTtcclxuICAgICAgICB0aGlzLm5hbWUgPSAobGF5ZXIgPT09IDAgPyBcIlwiIDogU3RyaW5nKGxheWVyICsgMSkpICsgbmFtZTtcclxuICAgIH1cclxuICAgIHNldCBhbmdsZShhbmdsZSkge1xyXG4gICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgdGhpcy5zZXRSb3RhdGlvbkZyb21BeGlzQW5nbGUoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuX2FuZ2xlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXQgYW5nbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ2xlO1xyXG4gICAgfVxyXG4gICAgY2FuY2VsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMudHdlZW4uZW5kO1xyXG4gICAgICAgICAgICB0d2VlbmVyLmNhbmNlbCh0aGlzLnR3ZWVuKTtcclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgZmluaXNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy50d2Vlbi5lbmQgLSB0aGlzLmFuZ2xlO1xyXG4gICAgICAgICAgICB0d2VlbmVyLmZpbmlzaCh0aGlzLnR3ZWVuKTtcclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGhvbGQoKSB7XHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XHJcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5pbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmUuY3ViZWxldHNbaV07XHJcbiAgICAgICAgICAgIHRoaXMuY3ViZWxldHMucHVzaChjdWJlbGV0KTtcclxuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbW92ZShjdWJlbGV0KTtcclxuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3ViZS5hZGQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBkcmFnKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmhvbGRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC10aGlzLmZpbmlzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ob2xkKCk7XHJcbiAgICB9XHJcbiAgICBkcm9wKCkge1xyXG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHdlZW4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHMucG9wKCk7XHJcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IGN1YmVsZXQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKGN1YmVsZXQpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjdWJlbGV0KTtcclxuICAgICAgICAgICAgdGhpcy5jdWJlLmFkZChjdWJlbGV0KTtcclxuICAgICAgICAgICAgdGhpcy5jdWJlLmN1YmVsZXRzW2N1YmVsZXQuaW5kZXhdID0gY3ViZWxldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdWJlLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3ViZS51bmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcclxuICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIHR3aXN0KGFuZ2xlLCBmYXN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG9sZGluZykge1xyXG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmhvbGQoKTtcclxuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFuZ2xlID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpICogKE1hdGguUEkgLyAyKTtcclxuICAgICAgICBpZiAoZmFzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gYW5nbGUgLSB0aGlzLmFuZ2xlO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGQgPSBNYXRoLmFicyhkZWx0YSkgLyAoTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IEN1YmVHcm91cC5mcmFtZXMgKiAoMiAtIDIgLyAoZCArIDEpKTtcclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IHR3ZWVuZXIudHdlZW4odGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByb3RhdGUoY3ViZWxldCkge1xyXG4gICAgICAgIGN1YmVsZXQucm90YXRlT25Xb3JsZEF4aXMoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuYW5nbGUpO1xyXG4gICAgICAgIGN1YmVsZXQudmVjdG9yID0gY3ViZWxldC52ZWN0b3IuYXBwbHlBeGlzQW5nbGUoQ3ViZUdyb3VwLkFYSVNfVkVDVE9SW3RoaXMuYXhpc10sIHRoaXMuYW5nbGUpO1xyXG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XHJcbiAgICB9XHJcbn1cclxuQ3ViZUdyb3VwLmZyYW1lcyA9IDIwO1xyXG5DdWJlR3JvdXAuQVhJU19WRUNUT1IgPSB7XHJcbiAgICBhOiBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKSxcclxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcclxuICAgIHk6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSxcclxuICAgIHo6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcclxufTtcclxuZXhwb3J0IGNsYXNzIFJvdGF0ZUFjdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihncm91cCwgdHdpc3QpIHtcclxuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XHJcbiAgICAgICAgdGhpcy50d2lzdCA9IHR3aXN0O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBHcm91cFRhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcclxuICAgICAgICB0aGlzLm9yZGVyID0gY3ViZS5vcmRlcjtcclxuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBsYXllciA9IDA7IGxheWVyIDwgdGhpcy5vcmRlcjsgbGF5ZXIrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZyA9IG5ldyBDdWJlR3JvdXAoY3ViZSwgYXhpcywgbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdFtsYXllcl0gPSBnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2F4aXNdID0gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBjdWJlbGV0IG9mIGN1YmUuaW5pdGlhbHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjdWJlbGV0LmluaXRpYWw7XHJcbiAgICAgICAgICAgIGxldCBheGlzO1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXI7XHJcbiAgICAgICAgICAgIGxldCBncm91cDtcclxuICAgICAgICAgICAgYXhpcyA9IFwieFwiO1xyXG4gICAgICAgICAgICBsYXllciA9IGluZGV4ICUgdGhpcy5vcmRlcjtcclxuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XHJcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcclxuICAgICAgICAgICAgYXhpcyA9IFwieVwiO1xyXG4gICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoKGluZGV4ICUgKHRoaXMub3JkZXIgKiB0aGlzLm9yZGVyKSkgLyB0aGlzLm9yZGVyKTtcclxuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XHJcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcclxuICAgICAgICAgICAgYXhpcyA9IFwielwiO1xyXG4gICAgICAgICAgICBsYXllciA9IE1hdGguZmxvb3IoaW5kZXggLyAodGhpcy5vcmRlciAqIHRoaXMub3JkZXIpKTtcclxuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1theGlzXVtsYXllcl07XHJcbiAgICAgICAgICAgIGdyb3VwLmluZGljZXMucHVzaChjdWJlbGV0LmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmYWNlKGZhY2UpIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSAwO1xyXG4gICAgICAgIGxldCBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtmYWNlXTtcclxuICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICBzaWduID0gc2lnblsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XHJcbiAgICB9XHJcbiAgICBjb252ZXJ0KGFjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCBzaWduID0gYWN0aW9uLnNpZ247XHJcbiAgICAgICAgaWYgKHNpZ24ubWF0Y2goLy5bV3ddLykpIHtcclxuICAgICAgICAgICAgc2lnbiA9IHNpZ24udG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwid1wiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKC9bWFlaXS8udGVzdChzaWduKSkge1xyXG4gICAgICAgICAgICBzaWduID0gc2lnbi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ3JvdXA7XHJcbiAgICAgICAgbGV0IHR3aXN0ID0gYWN0aW9uLnRpbWVzICogKGFjdGlvbi5yZXZlcnNlID8gLTEgOiAxKTtcclxuICAgICAgICBsZXQgbGF5ZXI7XHJcbiAgICAgICAgaWYgKHNpZ24ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc2lnbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInhcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwielwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxheWVyID0gMDsgbGF5ZXIgPCB0aGlzLm9yZGVyOyBsYXllcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlJcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJVXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRlwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkxcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJEXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtzaWduLnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ID0gLXR3aXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gdGhpcy5vcmRlciAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJcIjpcclxuICAgICAgICAgICAgICAgICAgICBsYXllciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbc2lnbi50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IHNpZ25bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IHRoaXMub3JkZXIgLSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbc2lnbl1bbGF5ZXIgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgUm90YXRlQWN0aW9uKGdyb3VwLCB0d2lzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBNYXRoLmZsb29yKCh0aGlzLm9yZGVyIC0gMSkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWduID0gR3JvdXBUYWJsZS5BWElTX01BUFtzaWduLnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ID0gLXR3aXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gc2lnblsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tzaWduXVtsYXllcl07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmRlciAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IEdyb3VwVGFibGUuQVhJU19NQVBbc2lnbi50b1VwcGVyQ2FzZSgpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbi5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IHNpZ25bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxheWVyID0gMTsgbGF5ZXIgPCB0aGlzLm9yZGVyIC0gMTsgbGF5ZXIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFJvdGF0ZUFjdGlvbihncm91cCwgdHdpc3QpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHNpZ24ubWF0Y2goLyhbMDEyMzQ1Njc4OV0qKSgtPykoWzAxMjM0NTY3ODldKikoW2xydWRmYl0pL2kpO1xyXG4gICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gTnVtYmVyKGxpc3RbMV0pO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSBOdW1iZXIobGlzdFszXSk7XHJcbiAgICAgICAgICAgIGlmICh0byA9PT0gTmFOIHx8IHRvID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoL1tscnVkZmJdLy50ZXN0KGxpc3RbNF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG8gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG8gPSBmcm9tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmcm9tID4gdGhpcy5vcmRlcikge1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IHRoaXMub3JkZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvID4gdGhpcy5vcmRlcikge1xyXG4gICAgICAgICAgICAgICAgdG8gPSB0aGlzLm9yZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpZ24gPSBHcm91cFRhYmxlLkFYSVNfTUFQW2xpc3RbNF0udG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgICAgIGlmIChzaWduLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0d2lzdCA9IC10d2lzdDtcclxuICAgICAgICAgICAgICAgIHNpZ24gPSBzaWduWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IHRoaXMub3JkZXIgLSBmcm9tICsgMTtcclxuICAgICAgICAgICAgICAgIHRvID0gdGhpcy5vcmRlciAtIHRvICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZnJvbSA+IHRvKSB7XHJcbiAgICAgICAgICAgICAgICBbZnJvbSwgdG9dID0gW3RvLCBmcm9tXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBsYXllciA9IGZyb20gLSAxOyBsYXllciA8IHRvOyBsYXllcisrKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW3NpZ25dW2xheWVyXTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBSb3RhdGVBY3Rpb24oZ3JvdXAsIHR3aXN0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5Hcm91cFRhYmxlLkFYSVNfTUFQID0ge1xyXG4gICAgUjogXCJ4XCIsXHJcbiAgICBMOiBcIi14XCIsXHJcbiAgICBVOiBcInlcIixcclxuICAgIEQ6IFwiLXlcIixcclxuICAgIEY6IFwielwiLFxyXG4gICAgQjogXCItelwiLFxyXG4gICAgTTogXCIteFwiLFxyXG4gICAgRTogXCIteVwiLFxyXG4gICAgUzogXCJ6XCIsXHJcbn07XHJcbiIsImltcG9ydCB7IFR3aXN0QWN0aW9uIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaXN0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5leHAgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmVjb3JkKHJhdykge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBUd2lzdEFjdGlvbihyYXcuc2lnbiwgcmF3LnJldmVyc2UsIHJhdy50aW1lcyk7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBhY3Rpb24udGltZXMgPSBhY3Rpb24udGltZXMgJSA0O1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnRpbWVzICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cCA9IHRoaXMuZXhwICsgXCIgXCIgKyBhY3Rpb24udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAobGFzdC5zaWduID09IGFjdGlvbi5zaWduKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0LnRpbWVzID0gbGFzdC50aW1lcyArIGFjdGlvbi50aW1lcyAqIChsYXN0LnJldmVyc2UgPT0gYWN0aW9uLnJldmVyc2UgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3QudGltZXMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC50aW1lcyA9IC1sYXN0LnRpbWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QucmV2ZXJzZSA9ICFsYXN0LnJldmVyc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0LnRpbWVzID0gbGFzdC50aW1lcyAlIDQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cCA9IHRoaXMuZXhwLnN1YnN0cmluZygwLCB0aGlzLmV4cC5sYXN0SW5kZXhPZihcIiBcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3QudGltZXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwID0gdGhpcy5leHAgKyBcIiBcIiArIGxhc3QudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHAgPSB0aGlzLmV4cCArIFwiIFwiICsgYWN0aW9uLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLmV4cCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBnZXQgbGFzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBnZXQgbW92ZXMoKSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoY29uc3QgdHdpc3Qgb2YgdGhpcy5saXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0d2lzdC5zaWduID09IFwieFwiIHx8IHR3aXN0LnNpZ24gPT0gXCJ5XCIgfHwgdHdpc3Quc2lnbiA9PSBcInpcIikge1xyXG4gICAgICAgICAgICAgICAgbGVuZ3RoLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xyXG4gICAgY29uc3RydWN0b3IodHlwZSwgeCwgeSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoZG9tLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihcInRvdWNoZW5kXCIsIHRoaXMubGFzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGZpcnN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGhpcy5kb20gfHwgKChfYSA9IHRoaXMubGFzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkZW50aWZpZXIpICE9IGZpcnN0LmlkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBmaXJzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgZmlyc3QuY2xpZW50WSAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNoY2FuY2VsXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubW91c2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGhpcy5kb20pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZG9tLnRhYkluZGV4ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5kb20uZm9jdXMoKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNldXBcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZG9tID0gZG9tO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2gpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBDdWJlR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIjtcclxuZXhwb3J0IGNsYXNzIFR3ZWVuIHtcclxuICAgIGNvbnN0cnVjdG9yKGJlZ2luLCBlbmQsIGR1cmF0aW9uLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcclxuICAgICAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG4gICAgfVxyXG4gICAgZmluaXNoKCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5lbmQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUrKztcclxuICAgICAgICBsZXQgZWxhcHNlZCA9IHRoaXMudmFsdWUgLyB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xyXG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkIDwgMCA/IDAgOiBlbGFwc2VkO1xyXG4gICAgICAgIGVsYXBzZWQgPSBlbGFwc2VkIC0gMTtcclxuICAgICAgICBlbGFwc2VkID0gMSAtIGVsYXBzZWQgKiBlbGFwc2VkO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZWxhcHNlZCA9PSAxID8gdGhpcy5lbmQgOiB0aGlzLmJlZ2luICsgKHRoaXMuZW5kIC0gdGhpcy5iZWdpbikgKiBlbGFwc2VkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgVHdlZW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnR3ZWVucyA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9vcCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50d2VlbnMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgbG9vcCgpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICB0d2VlbihiZWdpbiwgZW5kLCBkdXJhdGlvbiwgdXBkYXRlKSB7XHJcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oYmVnaW4sIGVuZCwgZHVyYXRpb24sIHVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy50d2VlbnMucHVzaCh0d2Vlbik7XHJcbiAgICAgICAgcmV0dXJuIHR3ZWVuO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVucy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudHdlZW5zLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50d2VlbnNbaV0udXBkYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZmluaXNoKHR3ZWVuID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHR3ZWVuKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR3ZWVuc1tpXSA9PSB0d2Vlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLmZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHdlZW5zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR3ZWVucyA9IHRoaXMudHdlZW5zLnNwbGljZSgwLCB0aGlzLnR3ZWVucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHR3ZWVuIG9mIHR3ZWVucykge1xyXG4gICAgICAgICAgICAgICAgdHdlZW4uZmluaXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYW5jZWwodHdlZW4pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdlZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR3ZWVuc1tpXSA9PSB0d2Vlbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2VlbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCB0d2VlbmVyID0gbmV3IFR3ZWVuZXIoKTtcclxuZXhwb3J0IGNsYXNzIFR3aXN0QWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGV4cCwgcmV2ZXJzZSA9IGZhbHNlLCB0aW1lcyA9IDEpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBleHAubWF0Y2goLyhbXFwqXFwjfjsuI3h5el18WzAxMjM0NTY3ODktXSpbYnNmZGV1bG1yXVt3XSopKCc/KShcXGQqKSgnPykvaSk7XHJcbiAgICAgICAgaWYgKHZhbHVlcykge1xyXG4gICAgICAgICAgICBleHAgPSB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgIHJldmVyc2UgPSByZXZlcnNlICE9PSAoKHZhbHVlc1syXSArIHZhbHVlc1s0XSkubGVuZ3RoID09IDEpO1xyXG4gICAgICAgICAgICB0aW1lcyA9IHRpbWVzICogKHZhbHVlc1szXS5sZW5ndGggPT0gMCA/IDEgOiBwYXJzZUludCh2YWx1ZXNbM10pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKC9bWFlaXS8udGVzdChleHApKSB7XHJcbiAgICAgICAgICAgIGV4cCA9IGV4cC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoL1tXd10vLnRlc3QoZXhwKSkge1xyXG4gICAgICAgICAgICBleHAgPSBleHAudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgZXhwID0gZXhwLnJlcGxhY2UoXCJXXCIsIFwid1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaWduID0gZXhwO1xyXG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IHJldmVyc2U7XHJcbiAgICAgICAgdGhpcy50aW1lcyA9IHRpbWVzO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVzID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ24gKyAodGhpcy50aW1lcyA9PSAxID8gXCJcIiA6IFN0cmluZyh0aGlzLnRpbWVzKSkgKyAodGhpcy5yZXZlcnNlID8gXCInXCIgOiBcIlwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgVHdpc3ROb2RlIHtcclxuICAgIGNvbnN0cnVjdG9yKGV4cCwgcmV2ZXJzZSA9IGZhbHNlLCB0aW1lcyA9IDEpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgZXhwID0gZXhwLnJlcGxhY2UoL1vigJjvvIfigJldL2csIFwiJ1wiKTtcclxuICAgICAgICBpZiAoZXhwLm1hdGNoKC9eKFtcXCpcXCN+Oy4jeHl6XXxbMDEyMzQ1Njc4OS1dKltic2ZkZXVsbXJdW3ddKikkL2dpKSkge1xyXG4gICAgICAgICAgICB0aGlzLnR3aXN0ID0gbmV3IFR3aXN0QWN0aW9uKGV4cCwgcmV2ZXJzZSwgdGltZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHdpc3QgPSBuZXcgVHdpc3RBY3Rpb24oXCJcIiwgcmV2ZXJzZSwgdGltZXMpO1xyXG4gICAgICAgIGlmIChleHAubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaXN0ID0gVHdpc3ROb2RlLlNQTElUX1NFR01FTlQoZXhwKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzO1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSBpdGVtLm1hdGNoKC9eXFxbKC4rWzp8LF0uKylcXF0kL2kpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBUd2lzdE5vZGUuU1BMSVRfQlJBQ0tFVCh2YWx1ZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZXNbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiLFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgVHdpc3ROb2RlKHZhbHVlc1syXSwgZmFsc2UsIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBUd2lzdE5vZGUodmFsdWVzWzBdLCB0cnVlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgVHdpc3ROb2RlKHZhbHVlc1syXSwgdHJ1ZSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiOlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFR3aXN0Tm9kZSh2YWx1ZXNbMF0sIGZhbHNlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgVHdpc3ROb2RlKHZhbHVlc1syXSwgZmFsc2UsIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBUd2lzdE5vZGUodmFsdWVzWzBdLCB0cnVlLCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWVzID0gaXRlbS5tYXRjaCgvXihcXFsuK1s6fCxdLitcXF0pKCc/KShcXGQqKSgnPykkL2kpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBpdGVtLm1hdGNoKC9eXFwoKC4rKVxcKSgnPykoXFxkKikoJz8pJC9pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBpdGVtLm1hdGNoKC8oW1xcKlxcI347LiN4eXpdfFswMTIzNDU2Nzg5LV0qW2JzZmRldWxtcl1bd10qKSgnPykoXFxkKikoJz8pL2kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudWxsID09PSB2YWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJldmVyc2UgPSAodmFsdWVzWzJdICsgdmFsdWVzWzRdKS5sZW5ndGggPT0gMTtcclxuICAgICAgICAgICAgY29uc3QgdGltZXMgPSB2YWx1ZXNbM10ubGVuZ3RoID09IDAgPyAxIDogcGFyc2VJbnQodmFsdWVzWzNdKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBUd2lzdE5vZGUodmFsdWVzWzFdLCByZXZlcnNlLCB0aW1lcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBTUExJVF9TRUdNRU5UKGV4cCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBsZXQgYnVmZmVyID0gXCJcIjtcclxuICAgICAgICBsZXQgc3RhY2sgPSAwO1xyXG4gICAgICAgIGxldCByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBub3RlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYyA9IGV4cC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjID09PSBcIiBcIiAmJiBidWZmZXIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjID09PSBcIi9cIiAmJiBleHAuY2hhckF0KGkgKyAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIG5vdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMgPT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgICAgIG5vdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub3RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVHdpc3ROb2RlLkFGRklYLmluZGV4T2YoYykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmNvbmNhdChjKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCAmJiBzdGFjayA9PSAwICYmIHJlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMgPT09IFwiKFwiIHx8IGMgPT09IFwiW1wiKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWZmZXIuY29uY2F0KGMpO1xyXG4gICAgICAgICAgICAgICAgc3RhY2srKztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmNvbmNhdChjKTtcclxuICAgICAgICAgICAgICAgIHN0YWNrLS07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5jb25jYXQoYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgU1BMSVRfQlJBQ0tFVChleHApIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHN0YWNrID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4cC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjID0gZXhwLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgaWYgKHN0YWNrID09IDAgJiYgKGMgPT09IFwiLFwiIHx8IGMgPT09IFwiOlwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMgPT09IFwiKFwiIHx8IGMgPT09IFwiW1wiKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWZmZXIuY29uY2F0KGMpO1xyXG4gICAgICAgICAgICAgICAgc3RhY2srKztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjID09PSBcIilcIiB8fCBjID09PSBcIl1cIikge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmNvbmNhdChjKTtcclxuICAgICAgICAgICAgICAgIHN0YWNrLS07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmZXIgPSBidWZmZXIuY29uY2F0KGMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKGJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgcGFyc2UocmV2ZXJzZSA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV2ZXJzZSA9IHRoaXMudHdpc3QucmV2ZXJzZSAhPT0gcmV2ZXJzZTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICBpZiAoMCAhPT0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR3aXN0LnRpbWVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gaiAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHRoaXMuY2hpbGRyZW5bal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBuLnBhcnNlKHJldmVyc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR3aXN0LnNpZ24gIT0gXCJcIiAmJiAhdGhpcy50d2lzdC5zaWduLnN0YXJ0c1dpdGgoXCIvL1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgVHdpc3RBY3Rpb24odGhpcy50d2lzdC5zaWduLCByZXZlcnNlLCB0aGlzLnR3aXN0LnRpbWVzKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5Ud2lzdE5vZGUuQUZGSVggPSBcIidXdzAxMjM0NTY3ODktXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3aXN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY3ViZSkge1xyXG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMucXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMudHdpc3QoYWN0aW9uLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS51bnNoaWZ0KGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmN1YmUgPSBjdWJlO1xyXG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFja3MucHVzaCh0aGlzLnVwZGF0ZSk7XHJcbiAgICB9XHJcbiAgICBzY3JhbWJsZXIoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgZXhwcyA9IFtdO1xyXG4gICAgICAgIGxldCBsYXN0ID0gLTE7XHJcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IFtcIlVcIiwgXCJEXCIsIFwiUlwiLCBcIkxcIiwgXCJGXCIsIFwiQlwiXTtcclxuICAgICAgICBsZXQgYXhpcyA9IC0xO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMyAqIDMgKiB0aGlzLmN1YmUub3JkZXI7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBleHAgPSBbXTtcclxuICAgICAgICAgICAgd2hpbGUgKGF4aXMgPT0gbGFzdCkge1xyXG4gICAgICAgICAgICAgICAgYXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1theGlzICogMiArIHNpZGVdO1xyXG4gICAgICAgICAgICBjb25zdCBwcmVmaXggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IodGhpcy5jdWJlLm9yZGVyIC8gMikpO1xyXG4gICAgICAgICAgICBpZiAocHJlZml4ICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBleHAucHVzaChwcmVmaXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4cC5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1ZmZpeCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgIGlmIChzdWZmaXggPCAwLjQpIHtcclxuICAgICAgICAgICAgICAgIGV4cC5wdXNoKFwiMlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdWZmaXggPCAwLjcpIHtcclxuICAgICAgICAgICAgICAgIGV4cC5wdXNoKFwiJ1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHBzLnB1c2goZXhwLmpvaW4oXCJcIikpO1xyXG4gICAgICAgICAgICBsYXN0ID0gYXhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ID0gZXhwcy5qb2luKFwiIFwiKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBmaW5pc2goKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0d2VlbmVyLmZpbmlzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0d2VlbmVyLmZpbmlzaCgpO1xyXG4gICAgfVxyXG4gICAgc2V0dXAoZXhwLCByZXZlcnNlID0gZmFsc2UsIHRpbWVzID0gMSkge1xyXG4gICAgICAgIHRoaXMuZmluaXNoKCk7XHJcbiAgICAgICAgdGhpcy5jdWJlLnJlc2V0KCk7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBUd2lzdE5vZGUoZXhwLCByZXZlcnNlLCB0aW1lcyk7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IG5vZGUucGFyc2UoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBsaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudHdpc3QoYWN0aW9uLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmN1YmUuaGlzdG9yeS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY3ViZS5oaXN0b3J5LmluaXQgPSBleHA7XHJcbiAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBwdXNoKGV4cCwgcmV2ZXJzZSA9IGZhbHNlLCB0aW1lcyA9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gbmV3IFR3aXN0Tm9kZShleHAsIHJldmVyc2UsIHRpbWVzKTtcclxuICAgICAgICBjb25zdCBsaXN0ID0gbm9kZS5wYXJzZSgpO1xyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb24gb2YgbGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIHR3aXN0KGFjdGlvbiwgZmFzdCwgZm9yY2UpIHtcclxuICAgICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhY3Rpb24uc2lnbiA9PSBcIiNcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwKFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cCA9IHRoaXMuc2NyYW1ibGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXAoZXhwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24uc2lnbiA9PSBcIi5cIiB8fCBhY3Rpb24uc2lnbiA9PSBcIn5cIikge1xyXG4gICAgICAgICAgICBpZiAoZmFzdCB8fCBmb3JjZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5jdWJlLmxvY2soXCJhXCIsIDEpO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdHdlZW5lci50d2VlbigwLCAxLCBDdWJlR3JvdXAuZnJhbWVzICogYWN0aW9uLnRpbWVzLCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1YmUudW5sb2NrKFwiYVwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGlvbi5zaWduID09IFwiO1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChmYXN0IHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmN1YmUubG9jayhcImFcIiwgMSk7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1YmUudW5sb2NrKFwiYVwiLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5jdWJlLnRhYmxlLmNvbnZlcnQoYWN0aW9uKTtcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCByb3RhdGUgb2YgbGlzdCkge1xyXG4gICAgICAgICAgICBzdWNjZXNzID0gcm90YXRlLmdyb3VwLnR3aXN0KChNYXRoLlBJIC8gMikgKiByb3RhdGUudHdpc3QsIGZhc3QpO1xyXG4gICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MgJiYgZm9yY2UpIHtcclxuICAgICAgICAgICAgICAgIHR3ZWVuZXIuZmluaXNoKCk7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gcm90YXRlLmdyb3VwLnR3aXN0KChNYXRoLlBJIC8gMikgKiByb3RhdGUudHdpc3QsIGZhc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yZWNvcmQoYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XHJcbiAgICB9XHJcbiAgICB1bmRvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1YmUuaGlzdG9yeS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmN1YmUuaGlzdG9yeS5sYXN0O1xyXG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSBuZXcgVHdpc3RBY3Rpb24obGFzdC5zaWduLCAhbGFzdC5yZXZlcnNlLCAxKTtcclxuICAgICAgICB0aGlzLnR3aXN0KHJldmVyc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgRnJhbWUsIE1pcnJvciwgU3RpY2tlciB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XHJcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2NvbG9ycyA9IHtcclxuICAgIFI6IFwiI0I3MUMxQ1wiLFxyXG4gICAgTDogXCIjRkY2RDAwXCIsXHJcbiAgICBVOiBcIiNGMEYwRjBcIixcclxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxyXG4gICAgRjogXCIjMDBBMDIwXCIsXHJcbiAgICBCOiBcIiMwRDQ3QTFcIixcclxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxyXG4gICAgZ3JheTogXCIjODA4MDgwXCIsXHJcbiAgICBoaWdoOiBcIiNGRjAwODBcIixcclxufTtcclxuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZGVmcyA9IHtcclxuICAgIHNpemU6IDY0LFxyXG4gICAgb3JkZXI6IDMsXHJcbiAgICBfYm9yZGVyX3dpZHRoOiAzLFxyXG4gICAgX2VkZ2Vfd2lkdGg6IDIsXHJcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxyXG59O1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9mcmFtZSA9IG5ldyBGcmFtZShjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGgpO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9iYXNpY3MgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjdWJlbGV0X2NvbG9ycykge1xyXG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59KSgpO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9sYW1iZXJzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY3ViZWxldF9jb2xvcnMpIHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59KSgpO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9jb3JlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcclxuICAgIGNvbG9yOiBjdWJlbGV0X2NvbG9ycy5jb3JlLFxyXG4gICAgc3BlY3VsYXI6IGN1YmVsZXRfY29sb3JzLmdyYXksXHJcbiAgICBzaGluaW5lc3M6IDIsXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF90cmFucyA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XHJcbiAgICBjb2xvcjogY3ViZWxldF9jb2xvcnMuZ3JheSxcclxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG4gICAgb3BhY2l0eTogMC4xLFxyXG4gICAgZGVwdGhXcml0ZTogZmFsc2UsXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9zdGlja2VyID0gbmV3IFN0aWNrZXIoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX2VkZ2Vfd2lkdGgsIGN1YmVsZXRfZGVmcy5fc3RpY2tlcl9kZXB0aCwgZmFsc2UpO1xyXG5leHBvcnQgY29uc3QgY3ViZWxldF9taXJyb3IgPSBuZXcgTWlycm9yKGN1YmVsZXRfZGVmcy5zaXplIC0gMiAqIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoIC0gY3ViZWxldF9kZWZzLl9zdGlja2VyX2RlcHRoKTtcclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcbmV4cG9ydCB2YXIgRmFjZTtcclxuKGZ1bmN0aW9uIChGYWNlKSB7XHJcbiAgICBGYWNlW0ZhY2VbXCJMXCJdID0gMF0gPSBcIkxcIjtcclxuICAgIEZhY2VbRmFjZVtcIlJcIl0gPSAxXSA9IFwiUlwiO1xyXG4gICAgRmFjZVtGYWNlW1wiRFwiXSA9IDJdID0gXCJEXCI7XHJcbiAgICBGYWNlW0ZhY2VbXCJVXCJdID0gM10gPSBcIlVcIjtcclxuICAgIEZhY2VbRmFjZVtcIkJcIl0gPSA0XSA9IFwiQlwiO1xyXG4gICAgRmFjZVtGYWNlW1wiRlwiXSA9IDVdID0gXCJGXCI7XHJcbn0pKEZhY2UgfHwgKEZhY2UgPSB7fSkpO1xyXG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBib3JkZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGNvbnN0IG8gPSBzaXplIC8gMjtcclxuICAgICAgICBjb25zdCBpID0gbyAtIGJvcmRlcjtcclxuICAgICAgICBjb25zdCBfdmVydHMgPSBbXHJcbiAgICAgICAgICAgIC1pLCAraSwgK28sXHJcbiAgICAgICAgICAgICtpLCAraSwgK28sXHJcbiAgICAgICAgICAgICtpLCAtaSwgK28sXHJcbiAgICAgICAgICAgIC1pLCAtaSwgK28sXHJcbiAgICAgICAgICAgIC1pLCArbywgLWksXHJcbiAgICAgICAgICAgICtpLCArbywgLWksXHJcbiAgICAgICAgICAgICtpLCArbywgK2ksXHJcbiAgICAgICAgICAgIC1pLCArbywgK2ksXHJcbiAgICAgICAgICAgIC1vLCAtaSwgLWksXHJcbiAgICAgICAgICAgIC1vLCAraSwgLWksXHJcbiAgICAgICAgICAgIC1vLCAraSwgK2ksXHJcbiAgICAgICAgICAgIC1vLCAtaSwgK2ksXHJcbiAgICAgICAgICAgICtpLCAraSwgLW8sXHJcbiAgICAgICAgICAgIC1pLCAraSwgLW8sXHJcbiAgICAgICAgICAgIC1pLCAtaSwgLW8sXHJcbiAgICAgICAgICAgICtpLCAtaSwgLW8sXHJcbiAgICAgICAgICAgIC1pLCAtbywgK2ksXHJcbiAgICAgICAgICAgICtpLCAtbywgK2ksXHJcbiAgICAgICAgICAgICtpLCAtbywgLWksXHJcbiAgICAgICAgICAgIC1pLCAtbywgLWksXHJcbiAgICAgICAgICAgICtvLCAraSwgK2ksXHJcbiAgICAgICAgICAgICtvLCAraSwgLWksXHJcbiAgICAgICAgICAgICtvLCAtaSwgLWksXHJcbiAgICAgICAgICAgICtvLCAtaSwgK2ksXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKF92ZXJ0cywgMykpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5kZXgoRnJhbWUuX2luZGljZXMpO1xyXG4gICAgICAgIHRoaXMuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcclxuICAgIH1cclxufVxyXG5GcmFtZS5faW5kaWNlcyA9IFtcclxuICAgIDAsIDIsIDEsXHJcbiAgICAwLCAzLCAyLFxyXG4gICAgNCwgNiwgNSxcclxuICAgIDQsIDcsIDYsXHJcbiAgICA4LCAxMCwgOSxcclxuICAgIDgsIDExLCAxMCxcclxuICAgIDEyLCAxNCwgMTMsXHJcbiAgICAxMiwgMTUsIDE0LFxyXG4gICAgMTYsIDE4LCAxNyxcclxuICAgIDE2LCAxOSwgMTgsXHJcbiAgICAyMCwgMjIsIDIxLFxyXG4gICAgMjAsIDIzLCAyMixcclxuICAgIDEsIDYsIDcsXHJcbiAgICAwLCAxLCA3LFxyXG4gICAgMywgMCwgMTAsXHJcbiAgICAxMSwgMywgMTAsXHJcbiAgICAxNywgMiwgMyxcclxuICAgIDE2LCAxNywgMyxcclxuICAgIDIzLCAyMCwgMSxcclxuICAgIDIsIDIzLCAxLFxyXG4gICAgNSwgMTIsIDEzLFxyXG4gICAgNCwgNSwgMTMsXHJcbiAgICA5LCAxMywgMTQsXHJcbiAgICA4LCA5LCAxNCxcclxuICAgIDIyLCAxNSwgMTIsXHJcbiAgICAyMSwgMjIsIDEyLFxyXG4gICAgMTksIDE0LCAxNSxcclxuICAgIDE4LCAxOSwgMTUsXHJcbiAgICA3LCA0LCA5LFxyXG4gICAgMTAsIDcsIDksXHJcbiAgICAxMSwgOCwgMTksXHJcbiAgICAxNiwgMTEsIDE5LFxyXG4gICAgMjMsIDE3LCAxOCxcclxuICAgIDIyLCAyMywgMTgsXHJcbiAgICAyMCwgMjEsIDUsXHJcbiAgICA2LCAyMCwgNSxcclxuICAgIDIwLCA2LCAxLFxyXG4gICAgMTAsIDAsIDcsXHJcbiAgICAyMSwgMTIsIDUsXHJcbiAgICAxMywgOSwgNCxcclxuICAgIDIzLCAyLCAxNyxcclxuICAgIDExLCAxNiwgMyxcclxuICAgIDIyLCAxOCwgMTUsXHJcbiAgICA4LCAxNCwgMTksXHJcbl07XHJcbmV4cG9ydCBjbGFzcyBTdGlja2VyIGV4dGVuZHMgVEhSRUUuRXh0cnVkZUdlb21ldHJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKHNpemUsIGRlcHRoLCBhcnJvdykge1xyXG4gICAgICAgIHNpemUgPSBzaXplIC8gMjtcclxuICAgICAgICBjb25zdCBsZWZ0ID0gLXNpemU7XHJcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcclxuICAgICAgICBjb25zdCB0b3AgPSAtc2l6ZTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHNpemU7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XHJcbiAgICAgICAgY29uc3Qgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcclxuICAgICAgICBzaGFwZS5tb3ZlVG8obGVmdCwgdG9wICsgcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIGJvdHRvbSwgbGVmdCArIHJhZGl1cywgYm90dG9tKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQgLSByYWRpdXMsIGJvdHRvbSk7XHJcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQsIHRvcCArIHJhZGl1cyk7XHJcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgdG9wLCByaWdodCAtIHJhZGl1cywgdG9wKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcclxuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIHRvcCwgbGVmdCwgdG9wICsgcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5jbG9zZVBhdGgoKTtcclxuICAgICAgICBpZiAoYXJyb3cpIHtcclxuICAgICAgICAgICAgY29uc3QgaCA9IHNpemUgKiAwLjY7XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBoICogMC44O1xyXG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IG5ldyBUSFJFRS5QYXRoKCk7XHJcbiAgICAgICAgICAgIGFycm93Lm1vdmVUbygwLCBoKTtcclxuICAgICAgICAgICAgYXJyb3cubGluZVRvKC13LCAwKTtcclxuICAgICAgICAgICAgYXJyb3cubGluZVRvKC13IC8gMiwgMCk7XHJcbiAgICAgICAgICAgIGFycm93LmxpbmVUbygtdyAvIDIsIC1oKTtcclxuICAgICAgICAgICAgYXJyb3cubGluZVRvKHcgLyAyLCAtaCk7XHJcbiAgICAgICAgICAgIGFycm93LmxpbmVUbyh3IC8gMiwgMCk7XHJcbiAgICAgICAgICAgIGFycm93LmxpbmVUbyh3LCAwKTtcclxuICAgICAgICAgICAgYXJyb3cuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIHNoYXBlLmhvbGVzLnB1c2goYXJyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihzaGFwZSwgeyBiZXZlbEVuYWJsZWQ6IGZhbHNlLCBkZXB0aDogZGVwdGggfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1pcnJvciBleHRlbmRzIFRIUkVFLlNoYXBlR2VvbWV0cnkge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHNpemUgPSBzaXplIC8gMjtcclxuICAgICAgICBjb25zdCBsZWZ0ID0gLXNpemU7XHJcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcclxuICAgICAgICBjb25zdCB0b3AgPSAtc2l6ZTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHNpemU7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XHJcbiAgICAgICAgY29uc3Qgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcclxuICAgICAgICBzaGFwZS5tb3ZlVG8obGVmdCwgdG9wICsgcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIGJvdHRvbSwgbGVmdCArIHJhZGl1cywgYm90dG9tKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQgLSByYWRpdXMsIGJvdHRvbSk7XHJcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQsIHRvcCArIHJhZGl1cyk7XHJcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgdG9wLCByaWdodCAtIHJhZGl1cywgdG9wKTtcclxuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcclxuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIHRvcCwgbGVmdCwgdG9wICsgcmFkaXVzKTtcclxuICAgICAgICBzaGFwZS5jbG9zZVBhdGgoKTtcclxuICAgICAgICBzdXBlcihzaGFwZSk7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XHJcbn07XHJcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgUmVmIH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuL2ludGVyYWN0b3JcIjtcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuL3dvcmxkXCI7XHJcbmxldCBWaWV3cG9ydCA9IGNsYXNzIFZpZXdwb3J0IGV4dGVuZHMgVnVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgY2FudmFzRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcclxuICAgICAgICAgICAgY2FudmFzOiBjYW52YXNFbGVtLFxyXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXHJcbiAgICAgICAgICAgIGFscGhhOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xyXG4gICAgfVxyXG4gICAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMud29ybGQuc2NlbmUsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgIH1cclxufTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBJbmplY3QoXCJ3b3JsZFwiKSxcclxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcclxuXSwgVmlld3BvcnQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XHJcbl9fZGVjb3JhdGUoW1xyXG4gICAgUmVmKFwiY2FudmFzXCIpLFxyXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEhUTUxFbGVtZW50KVxyXG5dLCBWaWV3cG9ydC5wcm90b3R5cGUsIFwiY2FudmFzXCIsIHZvaWQgMCk7XHJcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXHJcbiAgICBDb21wb25lbnQoe1xyXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiByZWY9XCJjYW52YXNcIj48L2Rpdj4nLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxyXG4gICAgfSksXHJcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pXHJcbl0sIFZpZXdwb3J0KTtcclxuZXhwb3J0IGRlZmF1bHQgVmlld3BvcnQ7XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XHJcbmltcG9ydCBDdWJlIGZyb20gXCIuL2N1YmVcIjtcclxuaW1wb3J0IHsgY3ViZWxldF9kZWZzIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDY7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyA0ICsgTWF0aC5QSSAvIDE2O1xyXG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uYWwgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMCk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbC5wb3NpdGlvbi5zZXQoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5zaXplICogMywgY3ViZWxldF9kZWZzLnNpemUgKiAyKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWwpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIDEsIDEsIGN1YmVsZXRfZGVmcy5zaXplICogMzIpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSAwO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAwO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY3ViZSA9IG5ldyBDdWJlKCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcclxuICAgICAgICB0aGlzLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlID0gOTtcclxuICAgIH1cclxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDYW1lcmEoKSB7XHJcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5oZWlnaHQgLyBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyB0aGlzLnNjYWxlIC8gdGhpcy5wZXJzcGVjdGl2ZTtcclxuICAgICAgICBjb25zdCBmb3YgPSAoMiAqIE1hdGguYXRhbihtaW4pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMgKiB0aGlzLnBlcnNwZWN0aXZlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLm5lYXIgPSBkaXN0YW5jZSAtIGN1YmVsZXRfZGVmcy5zaXplICogMztcclxuICAgICAgICB0aGlzLmNhbWVyYS5mYXIgPSBkaXN0YW5jZSArIGN1YmVsZXRfZGVmcy5zaXplICogODtcclxuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQodGhpcy5zY2VuZS5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVldGlmeSBmcm9tIFwidnVldGlmeVwiO1xyXG5pbXBvcnQgXCJ2dWV0aWZ5L2Rpc3QvdnVldGlmeS5taW4uY3NzXCI7XHJcbmltcG9ydCBcIm1hdGVyaWFsLWRlc2lnbi1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3NcIjtcclxuaW1wb3J0IFBsYXlncm91bmQgZnJvbSBcIi4vdnVlYXBwL3BsYXlncm91bmRcIjtcclxuVnVlLnVzZShWdWV0aWZ5KTtcclxuY29uc3Qgb3B0cyA9IHt9O1xyXG5jb25zdCB2dWV0aWZ5ID0gbmV3IFZ1ZXRpZnkob3B0cyk7XHJcblZ1ZS5wcm90b3R5cGUudnVldGlmeSA9IHZ1ZXRpZnk7XHJcbmxldCBhcHAgPSBQbGF5Z3JvdW5kO1xyXG5jb25zdCB2bSA9IG5ldyBWdWUoe1xyXG4gICAgdnVldGlmeSxcclxuICAgIGVsOiBcIiNhcHBcIixcclxuICAgIHJlbmRlcjogKGgpID0+IGgoYXBwKSxcclxufSk7XHJcbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xyXG59O1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBQcm92aWRlLCBSZWYgfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xyXG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uLy4uL2N1YmUvdmlld3BvcnRcIjtcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi8uLi9jdWJlL3dvcmxkXCI7XHJcbmxldCBQbGF5Z3JvdW5kID0gY2xhc3MgUGxheWdyb3VuZCBleHRlbmRzIFZ1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoKTtcclxuICAgIH1cclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy52aWV3cG9ydC5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5jYWxjdVZpZXdwb3J0SGVpZ2h0KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSk7XHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcbiAgICB9XHJcbiAgICBsb29wKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XHJcbiAgICB9XHJcbiAgICBjYWxjdVZpZXdwb3J0SGVpZ2h0KHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0IC0gTWF0aC5jZWlsKE1hdGgubWluKHdpZHRoIC8gNiwgaGVpZ2h0IC8gMTIpKSAqIDEuNTtcclxuICAgIH1cclxufTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBQcm92aWRlKFwid29ybGRcIiksXHJcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgT2JqZWN0KVxyXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIFJlZihcInZpZXdwb3J0XCIpLFxyXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxyXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ2aWV3cG9ydFwiLCB2b2lkIDApO1xyXG5QbGF5Z3JvdW5kID0gX19kZWNvcmF0ZShbXHJcbiAgICBDb21wb25lbnQoe1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9pbmRleC5odG1sXCIpLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAgICAgdmlld3BvcnQ6IFZpZXdwb3J0XHJcbiAgICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxyXG5dLCBQbGF5Z3JvdW5kKTtcclxuZXhwb3J0IGRlZmF1bHQgUGxheWdyb3VuZDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9