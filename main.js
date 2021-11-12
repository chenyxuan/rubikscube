/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <div v-resize=\"resize\" style=\"user-select: none; touch-action: none;\">\n        <viewport ref=\"viewport\"></viewport>\n        <v-card flat style=\"margin: auto; touch-action: none; user-select: none;\">\n            <v-container fluid grid-list-md text-xs-center\n                :style=\"{width: Math.min(size * 10, width) + 'px', height: size * 4 + 'px'}\">\n                <v-layout row wrap>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"scramble\" block text :ripple=\"false\" color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Scramble\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"reset\" block text :ripple=\"false\" color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Reset\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn block text :ripple=\"false\" color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Solve\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </v-card>\n    </div>\n</v-app>"

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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");




class Holder {
    constructor() {
        this.vector = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3();
        this.index = -1;
        this.axis = "";
    }
}
class Controller {
    constructor(world) {
        this.interact = (action) => {
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
        this._lock = false;
        this._disable = false;
        this.world = world;
        this.dragging = false;
        this.rotating = false;
        this.axis = "";
        this.angle = 0;
        this.contingle = 0;
        this.down = new three__WEBPACK_IMPORTED_MODULE_2__.Vector2(0, 0);
        this.move = new three__WEBPACK_IMPORTED_MODULE_2__.Vector2(0, 0);
        this.down_tick = new Date().getTime();
        this.holder = new Holder();
        this.group = null;
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
    }
    set lock(value) {
        this.handleUp();
        this._lock = value;
    }
    get lock() {
        return this._lock;
    }
    set disable(value) {
        this.handleUp();
        this._disable = value;
    }
    get disable() {
        return this._disable;
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
    match() {
        const plane = _utils__WEBPACK_IMPORTED_MODULE_1__.axis_planes[this.holder.axis];
        const finger = this.holder.vector;
        const index = this.holder.index;
        const ilayer = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.indexToLayer)(index);
        for (const axis of ["x", "y", "z"]) {
            const vector = _utils__WEBPACK_IMPORTED_MODULE_1__.axis_vectors[axis];
            if (vector.dot(plane.normal) === 0 && vector.dot(finger) === 0) {
                return this.world.cube.table.groups[axis][ilayer[axis]];
            }
        }
        return null;
    }
    intersect(point, plane) {
        const matrix = new three__WEBPACK_IMPORTED_MODULE_2__.Matrix4();
        const ray = new three__WEBPACK_IMPORTED_MODULE_2__.Ray();
        const result = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3();
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
    handleDown() {
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
            const plane = _utils__WEBPACK_IMPORTED_MODULE_1__.axis_planes[axis];
            const point = this.intersect(this.down, plane);
            if (point !== null) {
                const cube_margin = _utils__WEBPACK_IMPORTED_MODULE_1__.cube_size / 2 + 0.001;
                const boxMin = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().setScalar(-cube_margin);
                const boxMax = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().setScalar(cube_margin);
                const box = new three__WEBPACK_IMPORTED_MODULE_2__.Box3(boxMin, boxMax);
                if (box.containsPoint(point)) {
                    const origin = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().setFromMatrixPosition(this.world.camera.matrixWorld);
                    const dist = point.distanceTo(origin);
                    if (dist < min_dist) {
                        min_dist = dist;
                        this.holder.axis = axis;
                        this.holder.index = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.worldToIndex)(point);
                    }
                }
            }
        }
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
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.axis = "y";
                }
                else {
                    if (this.down.x < this.world.width / 2) {
                        this.axis = "x";
                    }
                    else {
                        this.axis = "z";
                    }
                }
                this.group = null;
                const contingle_set = new Set();
                for (const group of this.world.cube.table.groups[this.axis]) {
                    let success = group.drag();
                    while (!success) {
                        _twister__WEBPACK_IMPORTED_MODULE_0__.twister.finish();
                        success = group.drag();
                    }
                    contingle_set.add(group.angle);
                }
                if (contingle_set.size == 1) {
                    for (const value of contingle_set.values()) {
                        this.contingle = value;
                        break;
                    }
                }
                else {
                    this.contingle = 0;
                }
            }
            else {
                const plane = _utils__WEBPACK_IMPORTED_MODULE_1__.axis_planes[this.holder.axis];
                const start = this.intersect(this.down, plane);
                const end = this.intersect(this.move, plane);
                const vector = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().subVectors(end, start);
                vector.max(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().sub(vector));
                const norm = Math.max(vector.x, vector.y, vector.z);
                this.holder.vector.copy(norm == vector.x ? new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 0, 0) : (norm == vector.y ? new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0) :
                    new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 1)));
                this.group = this.match();
                if (!this.group) {
                    this.rotating = false;
                    return;
                }
                let success = this.group.drag();
                while (!success) {
                    _twister__WEBPACK_IMPORTED_MODULE_0__.twister.finish();
                    success = this.group.drag();
                }
                this.contingle = this.group.angle;
                vector.crossVectors(this.holder.vector, plane.normal);
                this.holder.vector.multiplyScalar(vector.x + vector.y + vector.z);
            }
        }
        if (this.rotating) {
            if (this.group) {
                const plane = _utils__WEBPACK_IMPORTED_MODULE_1__.axis_planes[this.holder.axis];
                const start = this.intersect(this.down, plane);
                const end = this.intersect(this.move, plane);
                const vector = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().subVectors(end, start);
                vector.multiply(this.holder.vector);
                this.angle =
                    (vector.x + vector.y + vector.z) *
                        _utils__WEBPACK_IMPORTED_MODULE_1__.config.sensibility;
            }
            else {
                const dx = this.move.x - this.down.x;
                const dy = this.move.y - this.down.y;
                this.angle = _utils__WEBPACK_IMPORTED_MODULE_1__.config.sensibility * (this.axis == "y" ? -dx :
                    (this.axis == "x" ? -dy :
                        (dy)));
            }
        }
    }
    handleUp() {
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
            }
            else {
                angle = 0;
            }
            if (this.group) {
                this.group.twist(angle, false);
            }
            else {
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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cubelet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubelet */ "./src/cube/cubelet.ts");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");





class Cube extends three__WEBPACK_IMPORTED_MODULE_4__.Group {
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
    random3() {
        return Math.min(Math.max(Math.floor(Math.random() * 3), 0), 2);
    }
    scramble() {
        for (let i = 0; i < _utils__WEBPACK_IMPORTED_MODULE_3__.config.scramble_steps; i++) {
            const axis = ["x", "y", "z"][this.random3()];
            const level = this.random3();
            const angle = (this.random3() - 1) * (Math.PI / 2);
            this.table.groups[axis][level].twist(angle === 0 ? Math.PI : angle, true);
        }
    }
    reset() {
        _twister__WEBPACK_IMPORTED_MODULE_2__.twister.finish();
        for (const cubelet of this.cubelets) {
            this.remove(cubelet);
        }
        this.cubelets.splice(0);
        for (let i = 0; i < 27; i++) {
            const cubelet = new _cubelet__WEBPACK_IMPORTED_MODULE_0__["default"](i);
            this.cubelets.push(cubelet);
            this.add(cubelet);
        }
        this.table = new _group__WEBPACK_IMPORTED_MODULE_1__.GroupTable(this);
        this.dirty = true;
        this.callback();
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
            const face_attr = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_face_attrs[i];
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
        this._vector.copy(vector);
        this.index = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.directionToIndex)(vector);
        this.position.copy(vector);
        this.position.multiplyScalar(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_defs.size);
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
/* harmony export */   "GroupTable": () => (/* binding */ GroupTable)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");



class CubeGroup extends three__WEBPACK_IMPORTED_MODULE_2__.Group {
    constructor(cube, axis, layer) {
        super();
        this.twisting = undefined;
        this._angle = 0;
        this.holding = false;
        this.cube = cube;
        this.axis = axis;
        this.layer = layer;
        this.cubelets = [];
        this.indices = [];
        for (let i = 0; i < 27; i++) {
            const ilayer = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.indexToLayer)(i);
            if (axis == "x" && ilayer.x == layer
                || axis == "y" && ilayer.y == layer
                || axis == "z" && ilayer.z == layer) {
                this.indices.push(i);
            }
        }
        this.matrixAutoUpdate = false;
        this.updateMatrix();
    }
    set angle(angle) {
        this._angle = angle;
        this.setRotationFromAxisAngle(_utils__WEBPACK_IMPORTED_MODULE_1__.axis_vectors[this.axis], angle);
        this.updateMatrix();
        this.cube.dirty = true;
    }
    get angle() {
        return this._angle;
    }
    cancel() {
        if (this.twisting) {
            const angle = this.twisting.arrival;
            _twister__WEBPACK_IMPORTED_MODULE_0__.twister.cancel(this.twisting);
            this.twisting = undefined;
            return Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
        }
        return 0;
    }
    finish() {
        if (this.twisting) {
            const angle = this.twisting.arrival - this.angle;
            _twister__WEBPACK_IMPORTED_MODULE_0__.twister.finish(this.twisting);
            this.twisting = undefined;
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
        if (Math.abs(this.angle - angle) < 1e-6) {
            this.drop();
        }
        else {
            const frac = Math.abs(this.angle - angle) / (Math.PI / 2);
            const duration = _utils__WEBPACK_IMPORTED_MODULE_1__.config.frames * (2 - 2 / (frac + 1));
            this.twisting = new _twister__WEBPACK_IMPORTED_MODULE_0__.Twist(this.angle, angle, duration, (value) => {
                this.angle = value;
                if (Math.abs(this.angle - angle) < 1e-6) {
                    this.drop();
                    return true;
                }
                return false;
            });
            _twister__WEBPACK_IMPORTED_MODULE_0__.twister.twists.push(this.twisting);
        }
        return true;
    }
    rotate(cubelet) {
        cubelet.rotateOnWorldAxis(_utils__WEBPACK_IMPORTED_MODULE_1__.axis_vectors[this.axis], this.angle);
        cubelet.vector = cubelet.vector.applyAxisAngle(_utils__WEBPACK_IMPORTED_MODULE_1__.axis_vectors[this.axis], this.angle);
        cubelet.updateMatrix();
    }
}
class GroupTable {
    constructor(cube) {
        this.groups = {};
        for (const axis of ["x", "y", "z"]) {
            const list = [];
            for (let i = 0; i < 3; i++) {
                list.push(new CubeGroup(cube, axis, i));
            }
            this.groups[axis] = list;
        }
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
/* harmony export */   "Twist": () => (/* binding */ Twist),
/* harmony export */   "Twister": () => (/* binding */ Twister),
/* harmony export */   "twister": () => (/* binding */ twister)
/* harmony export */ });
class Twist {
    constructor(depature, arrival, duration, callback_func) {
        this.departure = depature;
        this.arrival = arrival;
        this.durantion = duration;
        this.callback_func = callback_func;
        this.elapsed = 0;
    }
    finish() {
        this.elapsed = this.durantion;
        this.current = this.arrival;
        this.callback();
    }
    update() {
        this.elapsed++;
        const frac = Math.min(Math.max(this.elapsed / this.durantion, 0), 1);
        this.current = frac == 1 ? this.arrival : (this.departure + (this.arrival - this.departure) * (1 - (1 - frac) * (1 - frac)));
    }
    callback() {
        return this.callback_func(this.current);
    }
}
class Twister {
    constructor() {
        this.twists = [];
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
    }
    update() {
        let cur = 0;
        let end = this.twists.length;
        while (cur < end) {
            this.twists[cur].update();
            if (this.twists[cur].callback()) {
                this.twists.splice(cur, 1);
                end--;
            }
            else {
                cur++;
            }
        }
    }
    finish(twist = undefined) {
        if (twist) {
            for (let i = 0; i < this.twists.length; i++) {
                if (this.twists[i] == twist) {
                    twist.finish();
                    this.twists.splice(i, 1);
                    break;
                }
            }
        }
        else {
            const twists = this.twists.splice(0);
            for (const twist of twists) {
                twist.finish();
            }
        }
    }
    cancel(twist) {
        for (let i = 0; i < this.twists.length; i++) {
            if (this.twists[i] == twist) {
                this.twists.splice(i, 1);
                break;
            }
        }
    }
}
const twister = new Twister();


/***/ }),

/***/ "./src/cube/utils.ts":
/*!***************************!*\
  !*** ./src/cube/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "cubelet_colors": () => (/* binding */ cubelet_colors),
/* harmony export */   "cubelet_defs": () => (/* binding */ cubelet_defs),
/* harmony export */   "cubelet_frame": () => (/* binding */ cubelet_frame),
/* harmony export */   "cubelet_lambers": () => (/* binding */ cubelet_lambers),
/* harmony export */   "cubelet_core": () => (/* binding */ cubelet_core),
/* harmony export */   "cubelet_sticker": () => (/* binding */ cubelet_sticker),
/* harmony export */   "cubelet_face_attrs": () => (/* binding */ cubelet_face_attrs),
/* harmony export */   "cube_size": () => (/* binding */ cube_size),
/* harmony export */   "axis_vectors": () => (/* binding */ axis_vectors),
/* harmony export */   "axis_planes": () => (/* binding */ axis_planes),
/* harmony export */   "indexToDirection": () => (/* binding */ indexToDirection),
/* harmony export */   "directionToIndex": () => (/* binding */ directionToIndex),
/* harmony export */   "indexToLayer": () => (/* binding */ indexToLayer),
/* harmony export */   "worldToIndex": () => (/* binding */ worldToIndex)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");



const config = {
    frames: 30,
    sensibility: 20 * 1e-4,
    scramble_steps: 50,
};
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
const cubelet_face_attrs = [
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
const cube_size = cubelet_defs.size * 3;
const axis_vectors = {
    a: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1),
    x: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 0),
    y: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
    z: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -1),
};
const axis_planes = {
    x: new three__WEBPACK_IMPORTED_MODULE_1__.Plane(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, 0), -cube_size / 2),
    y: new three__WEBPACK_IMPORTED_MODULE_1__.Plane(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), -cube_size / 2),
    z: new three__WEBPACK_IMPORTED_MODULE_1__.Plane(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1), -cube_size / 2)
};
const indexToDirection = (index) => {
    return new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(index % 3 - 1, Math.floor(index / 3) % 3 - 1, Math.floor(index / 9) - 1);
};
const directionToIndex = (drctn) => {
    return Math.round((drctn.x + 1) + (drctn.y + 1) * 3 + (drctn.z + 1) * 9);
};
const indexToLayer = (index) => {
    const result = { x: index % 3, y: Math.floor(index / 3) % 3, z: Math.floor(index / 9) };
    return result;
};
const worldToIndex = (point) => {
    const vector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3().copy(point);
    vector.add(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3().setScalar(cube_size / 2));
    vector.divideScalar(cube_size).multiplyScalar(3).floor();
    vector.max(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3().setScalar(0));
    vector.min(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3().setScalar(2));
    return vector.x + vector.y * 3 + vector.z * 9;
};


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
            this.world.dirty = false;
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
        this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera();
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
        this.width = 0;
        this.height = 0;
        this.size = 0;
    }
    mounted() {
        this.$nextTick(this.resize);
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
    }
    resize() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
        this.viewport.resize(this.width, this.height - this.size * 1.5);
        this.world.cube.dirty = true;
    }
    scramble() {
        this.world.cube.scramble();
    }
    reset() {
        this.world.cube.reset();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtRkFBbUYsbUJBQW1CLGdHQUFnRyxvQkFBb0Isa0JBQWtCLDJGQUEyRixrRUFBa0Usb0ZBQW9GLDRCQUE0Qix5SkFBeUosZ0JBQWdCLFlBQVksWUFBWSxpRUFBaUUsOEJBQThCLDhMQUE4TCw0QkFBNEIscUpBQXFKLGdCQUFnQixZQUFZLFlBQVksaUVBQWlFLDhCQUE4QiwyTEFBMkwsNEJBQTRCLG1JQUFtSSxnQkFBZ0IsWUFBWSxZQUFZLGlFQUFpRSw4QkFBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBanREO0FBQ0s7QUFDK0Q7QUFDN0Q7QUFDL0I7QUFDUDtBQUNBLDBCQUEwQiwwQ0FBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQ0FBYTtBQUNyQyx3QkFBd0IsMENBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrQ0FBVztBQUNqQztBQUNBO0FBQ0EsdUJBQXVCLG9EQUFZO0FBQ25DO0FBQ0EsMkJBQTJCLGdEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBDQUFhO0FBQ3hDLHdCQUF3QixzQ0FBUztBQUNqQywyQkFBMkIsMENBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtDQUFXO0FBQ3JDO0FBQ0E7QUFDQSxvQ0FBb0MsNkNBQVM7QUFDN0MsbUNBQW1DLDBDQUFPO0FBQzFDLG1DQUFtQywwQ0FBTztBQUMxQyxnQ0FBZ0MsdUNBQUk7QUFDcEM7QUFDQSx1Q0FBdUMsMENBQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsb0RBQVk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvREFBYztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0NBQVc7QUFDekM7QUFDQTtBQUNBLG1DQUFtQywwQ0FBTztBQUMxQywrQkFBK0IsMENBQU87QUFDdEM7QUFDQSwrREFBK0QsMENBQU8sb0NBQW9DLDBDQUFPO0FBQ2pILHdCQUF3QiwwQ0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsK0NBQVc7QUFDekM7QUFDQTtBQUNBLG1DQUFtQywwQ0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0RBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNEQUFrQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVRK0I7QUFDQztBQUNLO0FBQ0Q7QUFDSDtBQUNsQixtQkFBbUIsd0NBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyxnQ0FBZ0MsZ0RBQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4Q0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsSUFBSSx5REFBcUIsRUFBRTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0RBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyxnQ0FBZ0MsZ0RBQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhDQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRjJIO0FBQzVGO0FBQ1k7QUFDNUIsc0JBQXNCLHdDQUFXO0FBQ2hEO0FBQ0E7QUFDQSwyQkFBMkIsMENBQWE7QUFDeEM7QUFDQTtBQUNBLHNCQUFzQix3REFBZ0I7QUFDdEMsMEJBQTBCLDBDQUFhO0FBQ3ZDLHlCQUF5Qix1Q0FBVSxDQUFDLGlEQUFhLEVBQUUsZ0RBQVk7QUFDL0Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0IsOEJBQThCLHNEQUFrQjtBQUNoRDtBQUNBO0FBQ0Esb0NBQW9DLHVDQUFVLENBQUMsbURBQWU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3REFBZ0I7QUFDckM7QUFDQSxxQ0FBcUMscURBQWlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEMrQjtBQUNZO0FBQ2tCO0FBQzlDLHdCQUF3Qix3Q0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLDJCQUEyQixvREFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdEQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpREFBYTtBQUMxQyxnQ0FBZ0MsMkNBQUs7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVkseURBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdEQUFZO0FBQzlDLHVEQUF1RCxnREFBWTtBQUNuRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlJTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxxQkFBcUIsSUFBSSxnQkFBZ0I7QUFDdkc7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RXdCO0FBQ0M7QUFDa0I7QUFDM0M7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTywwQkFBMEIsa0RBQUs7QUFDL0I7QUFDUDtBQUNBO0FBQ0EsMEJBQTBCLHNEQUF5QixHQUFHLDRCQUE0QjtBQUNsRjtBQUNBO0FBQ0EsQ0FBQztBQUNNLHlCQUF5QixvREFBdUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNLDRCQUE0QixvREFBTztBQUNuQztBQUNQO0FBQ0EsNkJBQTZCLHdCQUF3QjtBQUNyRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLHVCQUF1QjtBQUNwRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLHdCQUF3QjtBQUNyRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLHVCQUF1QjtBQUNwRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLHdCQUF3QjtBQUNyRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLHVCQUF1QjtBQUNwRDtBQUNBLHNCQUFzQiwwQ0FBTztBQUM3QixzQkFBc0IsMENBQU87QUFDN0IsS0FBSztBQUNMO0FBQ087QUFDQTtBQUNQLFdBQVcsMENBQWE7QUFDeEIsV0FBVywwQ0FBYTtBQUN4QixXQUFXLDBDQUFhO0FBQ3hCLFdBQVcsMENBQWE7QUFDeEI7QUFDTztBQUNQLFdBQVcsd0NBQVcsS0FBSywwQ0FBYTtBQUN4QyxXQUFXLHdDQUFXLEtBQUssMENBQWE7QUFDeEMsV0FBVyx3Q0FBVyxLQUFLLDBDQUFhO0FBQ3hDO0FBQ087QUFDUCxlQUFlLDBDQUFPO0FBQ3RCO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUCxxQkFBcUI7QUFDckI7QUFDQTtBQUNPO0FBQ1AsdUJBQXVCLDBDQUFPO0FBQzlCLG1CQUFtQiwwQ0FBTztBQUMxQjtBQUNBLG1CQUFtQiwwQ0FBTztBQUMxQixtQkFBbUIsMENBQU87QUFDMUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFHK0I7QUFDeEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0JBQW9CO0FBQ2Qsb0JBQW9CLGlEQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseURBQTRCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxzQkFBc0Isa0RBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdDQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1DQUFtQztBQUMxRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSEEsa0JBQWtCLFNBQUksSUFBSSxTQUFJO0FBQzlCO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0Esa0JBQWtCLFNBQUksSUFBSSxTQUFJO0FBQzlCO0FBQ0E7QUFDc0I7QUFDMEM7QUFDakM7QUFDTztBQUNWO0FBQzVCLHNDQUFzQywyQ0FBRztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnREFBbUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtREFBVTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQU07QUFDViw4QkFBOEIsOENBQUs7QUFDbkM7QUFDQTtBQUNBLElBQUksMkRBQUc7QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFTO0FBQ2I7QUFDQSxzQkFBc0I7QUFDdEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURPO0FBQ087QUFDWjtBQUNhO0FBQ3hCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsd0NBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtDQUFrQjtBQUM3QywrQkFBK0IsbURBQXNCO0FBQ3JELHNDQUFzQyxxREFBaUIsRUFBRSxxREFBaUIsTUFBTSxxREFBaUI7QUFDakc7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9EQUF1QjtBQUNqRCw4QkFBOEIsbURBQVU7QUFDeEMsd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFEQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MscURBQWlCO0FBQ3ZELHFDQUFxQyxxREFBaUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRHNCO0FBQ1E7QUFDUTtBQUNxQjtBQUNkO0FBQzdDLCtDQUFPLENBQUMsZ0RBQU87QUFDZjtBQUNBLG9CQUFvQixnREFBTztBQUMzQiw2REFBcUI7QUFDckIsVUFBVSwwREFBVTtBQUNwQixlQUFlLDJDQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEQsa0JBQWtCLFNBQUksSUFBSSxTQUFJO0FBQzlCO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0Esa0JBQWtCLFNBQUksSUFBSSxTQUFJO0FBQzlCO0FBQ0E7QUFDc0I7QUFDMkM7QUFDdEI7QUFDTjtBQUNyQywwQ0FBMEMsMkNBQUc7QUFDN0M7QUFDQTtBQUNBLHlCQUF5QixtREFBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLCtEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyREFBRztBQUNQLDhCQUE4QixzREFBUTtBQUN0QztBQUNBO0FBQ0EsSUFBSSxpRUFBUztBQUNiLGtCQUFrQixtQkFBTyxDQUFDLHdEQUFjO0FBQ3hDO0FBQ0Esc0JBQXNCLHNEQUFRO0FBQzlCLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNUQxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZS50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZWxldC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2ludGVyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdmlld3BvcnQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3dvcmxkLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvcGxheWdyb3VuZC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjx2LWFwcD5cXG4gICAgPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIiBzdHlsZT1cXFwidXNlci1zZWxlY3Q6IG5vbmU7IHRvdWNoLWFjdGlvbjogbm9uZTtcXFwiPlxcbiAgICAgICAgPHZpZXdwb3J0IHJlZj1cXFwidmlld3BvcnRcXFwiPjwvdmlld3BvcnQ+XFxuICAgICAgICA8di1jYXJkIGZsYXQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bzsgdG91Y2gtYWN0aW9uOiBub25lOyB1c2VyLXNlbGVjdDogbm9uZTtcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXJcXG4gICAgICAgICAgICAgICAgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiAxMCwgd2lkdGgpICsgJ3B4JywgaGVpZ2h0OiBzaXplICogNCArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czQgOnN0eWxlPVxcXCJ7cGFkZGluZzogc2l6ZSAqIDAuMDYgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIEBjbGljaz1cXFwic2NyYW1ibGVcXFwiIGJsb2NrIHRleHQgOnJpcHBsZT1cXFwiZmFsc2VcXFwiIGNvbG9yPVxcXCJncmVlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTY3JhbWJsZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJyZXNldFxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcImJsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZXRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czQgOnN0eWxlPVxcXCJ7cGFkZGluZzogc2l6ZSAqIDAuMDYgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGJsb2NrIHRleHQgOnJpcHBsZT1cXFwiZmFsc2VcXFwiIGNvbG9yPVxcXCJyZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU29sdmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxcbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICA8L3YtY2FyZD5cXG4gICAgPC9kaXY+XFxuPC92LWFwcD5cIiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgdHdpc3RlciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IGF4aXNfcGxhbmVzLCBheGlzX3ZlY3RvcnMsIGNvbmZpZywgY3ViZV9zaXplLCBpbmRleFRvTGF5ZXIsIHdvcmxkVG9JbmRleCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBCb3gzLCBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5leHBvcnQgY2xhc3MgSG9sZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuYXhpcyA9IFwiXCI7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3Iod29ybGQpIHtcbiAgICAgICAgdGhpcy5pbnRlcmFjdCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hzdGFydFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnggPSBhY3Rpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnkgPSBhY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duX3RpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVEb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hjYW5jZWxcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW91dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9sb2NrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5heGlzID0gXCJcIjtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgdGhpcy5kb3duID0gbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLmRvd25fdGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBIb2xkZXIoKTtcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBzZXQgbG9jayh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2xvY2sgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NrO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpc2FibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5jb250aW5nbGUgKyB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIHRoaXMuZ3JvdXAuYW5nbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIGdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaCgpIHtcbiAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgY29uc3QgZmluZ2VyID0gdGhpcy5ob2xkZXIudmVjdG9yO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaG9sZGVyLmluZGV4O1xuICAgICAgICBjb25zdCBpbGF5ZXIgPSBpbmRleFRvTGF5ZXIoaW5kZXgpO1xuICAgICAgICBmb3IgKGNvbnN0IGF4aXMgb2YgW1wieFwiLCBcInlcIiwgXCJ6XCJdKSB7XG4gICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBheGlzX3ZlY3RvcnNbYXhpc107XG4gICAgICAgICAgICBpZiAodmVjdG9yLmRvdChwbGFuZS5ub3JtYWwpID09PSAwICYmIHZlY3Rvci5kb3QoZmluZ2VyKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW2F4aXNdW2lsYXllcltheGlzXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgY29uc3QgcmF5ID0gbmV3IFRIUkVFLlJheSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCB4ID0gKHBvaW50LnggLyB0aGlzLndvcmxkLndpZHRoKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCB5ID0gLShwb2ludC55IC8gdGhpcy53b3JsZC5oZWlnaHQpICogMiArIDE7XG4gICAgICAgIG1hdHJpeC5jb3B5KHRoaXMud29ybGQuc2NlbmUubWF0cml4KTtcbiAgICAgICAgbWF0cml4LmludmVydCgpO1xuICAgICAgICByYXkub3JpZ2luLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHJheS5kaXJlY3Rpb24uc2V0KHgsIHksIDAuNSkudW5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKS5zdWIocmF5Lm9yaWdpbikubm9ybWFsaXplKCk7XG4gICAgICAgIHJheS5hcHBseU1hdHJpeDQobWF0cml4KTtcbiAgICAgICAgcmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYW5kbGVEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWluX2Rpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1theGlzXTtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCBwbGFuZSk7XG4gICAgICAgICAgICBpZiAocG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlX21hcmdpbiA9IGN1YmVfc2l6ZSAvIDIgKyAwLjAwMTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3hNaW4gPSBuZXcgVmVjdG9yMygpLnNldFNjYWxhcigtY3ViZV9tYXJnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveE1heCA9IG5ldyBWZWN0b3IzKCkuc2V0U2NhbGFyKGN1YmVfbWFyZ2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBuZXcgQm94Myhib3hNaW4sIGJveE1heCk7XG4gICAgICAgICAgICAgICAgaWYgKGJveC5jb250YWluc1BvaW50KHBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBuZXcgVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5kaXN0YW5jZVRvKG9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmF4aXMgPSBheGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSB3b3JsZFRvSW5kZXgocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5taW4odGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQpIC8gZCA+IDEyOCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucm90YXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZGVyLmluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3duLnggPCB0aGlzLndvcmxkLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5nbGVfc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbmdsZV9zZXQuYWRkKGdyb3VwLmFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRpbmdsZV9zZXQuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlX3NldC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubWF4KG5ldyBWZWN0b3IzKCkuc3ViKHZlY3RvcikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm0gPSBNYXRoLm1heCh2ZWN0b3IueCwgdmVjdG9yLnksIHZlY3Rvci56KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci52ZWN0b3IuY29weShub3JtID09IHZlY3Rvci54ID8gbmV3IFZlY3RvcjMoMSwgMCwgMCkgOiAobm9ybSA9PSB2ZWN0b3IueSA/IG5ldyBWZWN0b3IzKDAsIDEsIDApIDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gdGhpcy5tYXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHRoaXMuZ3JvdXAuYW5nbGU7XG4gICAgICAgICAgICAgICAgdmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHBsYW5lLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLm11bHRpcGx5U2NhbGFyKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3Iueik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubXVsdGlwbHkodGhpcy5ob2xkZXIudmVjdG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID1cbiAgICAgICAgICAgICAgICAgICAgKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3IueikgKlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNlbnNpYmlsaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gY29uZmlnLnNlbnNpYmlsaXR5ICogKHRoaXMuYXhpcyA9PSBcInlcIiA/IC1keCA6XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmF4aXMgPT0gXCJ4XCIgPyAtZHkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgKGR5KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVVwKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2NrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlKSA8IE1hdGguUEkgLyA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gKE1hdGguYWJzKGFuZ2xlKSAvIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuZG93bl90aWNrKSkgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPiAwLjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgPT0gMCA/IDAgOiAoKGFuZ2xlIC8gTWF0aC5hYnMoYW5nbGUpKSAqIChNYXRoLlBJIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNvbnRpbmdsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuZ2xlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBDdWJlbGV0IGZyb20gXCIuL2N1YmVsZXRcIjtcbmltcG9ydCB7IEdyb3VwVGFibGUgfSBmcm9tIFwiLi9ncm91cFwiO1xuaW1wb3J0IHsgdHdpc3RlciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2NrcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwieVwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInpcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2NrLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9jayhheGlzLCBsYXllcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoX2EgPSB0aGlzLmxvY2tzLmdldChcImFcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYXMoMSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBheGlzX2xvY2tzZXQgPSB0aGlzLmxvY2tzLmdldChheGlzKTtcbiAgICAgICAgaWYgKGF4aXNfbG9ja3NldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsb2Nrc2V0IG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2Nrc2V0ICE9IGF4aXNfbG9ja3NldCAmJiBsb2Nrc2V0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF4aXNfbG9ja3NldC5hZGQobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdW5sb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBheGlzX2xvY2tzZXQgPT09IG51bGwgfHwgYXhpc19sb2Nrc2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBheGlzX2xvY2tzZXQuZGVsZXRlKGxheWVyKTtcbiAgICB9XG4gICAgcmFuZG9tMygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpLCAwKSwgMik7XG4gICAgfVxuICAgIHNjcmFtYmxlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5zY3JhbWJsZV9zdGVwczsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBheGlzID0gW1wieFwiLCBcInlcIiwgXCJ6XCJdW3RoaXMucmFuZG9tMygpXTtcbiAgICAgICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5yYW5kb20zKCk7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9ICh0aGlzLnJhbmRvbTMoKSAtIDEpICogKE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIHRoaXMudGFibGUuZ3JvdXBzW2F4aXNdW2xldmVsXS50d2lzdChhbmdsZSA9PT0gMCA/IE1hdGguUEkgOiBhbmdsZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgIGZvciAoY29uc3QgY3ViZWxldCBvZiB0aGlzLmN1YmVsZXRzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmVsZXRzLnNwbGljZSgwKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gbmV3IEN1YmVsZXQoaSk7XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhYmxlID0gbmV3IEdyb3VwVGFibGUodGhpcyk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3ViZWxldF9kZWZzLCBjdWJlbGV0X2NvcmUsIGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9mYWNlX2F0dHJzLCBkaXJlY3Rpb25Ub0luZGV4IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgaW5kZXhUb0RpcmVjdGlvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlbGV0IGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3ZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbCA9IGluZGV4O1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IGRyY3RuID0gaW5kZXhUb0RpcmVjdGlvbihpbmRleCk7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoZHJjdG4ueCwgZHJjdG4ueSwgZHJjdG4ueik7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X2NvcmUpO1xuICAgICAgICB0aGlzLmFkZCh0aGlzLmZyYW1lKTtcbiAgICAgICAgdGhpcy5sYW1iZXJ0cyA9IG5ldyBBcnJheSg2KTtcbiAgICAgICAgdGhpcy5zdGlja2VycyA9IG5ldyBBcnJheSg2KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tpXTtcbiAgICAgICAgICAgIGlmIChmYWNlX2F0dHIubWF0Y2godGhpcy52ZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW1iZXJ0c1tpXSA9IGZhY2VfYXR0ci5sYW1iZXJ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIHRoaXMubGFtYmVydHNbaV0pO1xuICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0aWNrZXJzW2ldID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgc2V0IHZlY3Rvcih2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy5fdmVjdG9yLmNvcHkodmVjdG9yKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGRpcmVjdGlvblRvSW5kZXgodmVjdG9yKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5jb3B5KHZlY3Rvcik7XG4gICAgICAgIHRoaXMucG9zaXRpb24ubXVsdGlwbHlTY2FsYXIoY3ViZWxldF9kZWZzLnNpemUpO1xuICAgIH1cbiAgICBnZXQgdmVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVjdG9yO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVHdpc3QsIHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBheGlzX3ZlY3RvcnMsIGNvbmZpZywgaW5kZXhUb0xheWVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVHcm91cCBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlLCBheGlzLCBsYXllcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnR3aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1YmUgPSBjdWJlO1xuICAgICAgICB0aGlzLmF4aXMgPSBheGlzO1xuICAgICAgICB0aGlzLmxheWVyID0gbGF5ZXI7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaWxheWVyID0gaW5kZXhUb0xheWVyKGkpO1xuICAgICAgICAgICAgaWYgKGF4aXMgPT0gXCJ4XCIgJiYgaWxheWVyLnggPT0gbGF5ZXJcbiAgICAgICAgICAgICAgICB8fCBheGlzID09IFwieVwiICYmIGlsYXllci55ID09IGxheWVyXG4gICAgICAgICAgICAgICAgfHwgYXhpcyA9PSBcInpcIiAmJiBpbGF5ZXIueiA9PSBsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbiAgICBzZXQgYW5nbGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgdGhpcy5zZXRSb3RhdGlvbkZyb21BeGlzQW5nbGUoYXhpc192ZWN0b3JzW3RoaXMuYXhpc10sIGFuZ2xlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5nbGU7XG4gICAgfVxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpc3RpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy50d2lzdGluZy5hcnJpdmFsO1xuICAgICAgICAgICAgdHdpc3Rlci5jYW5jZWwodGhpcy50d2lzdGluZyk7XG4gICAgICAgICAgICB0aGlzLnR3aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdpc3RpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy50d2lzdGluZy5hcnJpdmFsIC0gdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaG9sZCgpIHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY3ViZS5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLmluZGljZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmUuY3ViZWxldHNbaV07XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLmFkZCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRyYWcoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAtdGhpcy5maW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5ob2xkKCk7XG4gICAgfVxuICAgIGRyb3AoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnR3aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHMucG9wKCk7XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBjdWJlbGV0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLmFkZChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5jdWJlbGV0c1tjdWJlbGV0LmluZGV4XSA9IGN1YmVsZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY3ViZS51bmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcbiAgICAgICAgdGhpcy5jdWJlLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHR3aXN0KGFuZ2xlLCBmYXN0KSB7XG4gICAgICAgIGlmICh0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuaG9sZCgpO1xuICAgICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYW5nbGUgPSBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICBpZiAoZmFzdCkge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xuICAgICAgICAgICAgdGhpcy5kcm9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmcmFjID0gTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSAvIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGNvbmZpZy5mcmFtZXMgKiAoMiAtIDIgLyAoZnJhYyArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSBuZXcgVHdpc3QodGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0d2lzdGVyLnR3aXN0cy5wdXNoKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdyb3VwVGFibGUge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1theGlzXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb20sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihcInRvdWNoZW5kXCIsIHRoaXMubGFzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGZpcnN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0aGlzLmRvbSB8fCAoKF9hID0gdGhpcy5sYXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWRlbnRpZmllcikgIT0gZmlyc3QuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnRhYkluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZmlyc3QuY2xpZW50WCAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIGZpcnN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoZW5kXCIgfHwgZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGNhbmNlbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW91c2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZG93blwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQgIT09IHRoaXMuZG9tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVHdpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGRlcGF0dXJlLCBhcnJpdmFsLCBkdXJhdGlvbiwgY2FsbGJhY2tfZnVuYykge1xuICAgICAgICB0aGlzLmRlcGFydHVyZSA9IGRlcGF0dXJlO1xuICAgICAgICB0aGlzLmFycml2YWwgPSBhcnJpdmFsO1xuICAgICAgICB0aGlzLmR1cmFudGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLmNhbGxiYWNrX2Z1bmMgPSBjYWxsYmFja19mdW5jO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZHVyYW50aW9uO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmFycml2YWw7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmVsYXBzZWQrKztcbiAgICAgICAgY29uc3QgZnJhYyA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuZWxhcHNlZCAvIHRoaXMuZHVyYW50aW9uLCAwKSwgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGZyYWMgPT0gMSA/IHRoaXMuYXJyaXZhbCA6ICh0aGlzLmRlcGFydHVyZSArICh0aGlzLmFycml2YWwgLSB0aGlzLmRlcGFydHVyZSkgKiAoMSAtICgxIC0gZnJhYykgKiAoMSAtIGZyYWMpKSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFja19mdW5jKHRoaXMuY3VycmVudCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3aXN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR3aXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgY3VyID0gMDtcbiAgICAgICAgbGV0IGVuZCA9IHRoaXMudHdpc3RzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGN1ciA8IGVuZCkge1xuICAgICAgICAgICAgdGhpcy50d2lzdHNbY3VyXS51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3aXN0c1tjdXJdLmNhbGxiYWNrKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3aXN0cy5zcGxpY2UoY3VyLCAxKTtcbiAgICAgICAgICAgICAgICBlbmQtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmlzaCh0d2lzdCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHdpc3QpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50d2lzdHNbaV0gPT0gdHdpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdpc3QuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHdpc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdHdpc3RzID0gdGhpcy50d2lzdHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0d2lzdCBvZiB0d2lzdHMpIHtcbiAgICAgICAgICAgICAgICB0d2lzdC5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5jZWwodHdpc3QpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR3aXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudHdpc3RzW2ldID09IHR3aXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2lzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHR3aXN0ZXIgPSBuZXcgVHdpc3RlcigpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBGcmFtZSwgU3RpY2tlciB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGZyYW1lczogMzAsXG4gICAgc2Vuc2liaWxpdHk6IDIwICogMWUtNCxcbiAgICBzY3JhbWJsZV9zdGVwczogNTAsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29sb3JzID0ge1xuICAgIFI6IFwiI0I3MUMxQ1wiLFxuICAgIEw6IFwiI0ZGNkQwMFwiLFxuICAgIFU6IFwiI0YwRjBGMFwiLFxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxuICAgIEY6IFwiIzAwQTAyMFwiLFxuICAgIEI6IFwiIzBENDdBMVwiLFxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxuICAgIGdyYXk6IFwiIzgwODA4MFwiLFxuICAgIGhpZ2g6IFwiI0ZGMDA4MFwiLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2RlZnMgPSB7XG4gICAgc2l6ZTogNjQsXG4gICAgX2JvcmRlcl93aWR0aDogMyxcbiAgICBfZWRnZV93aWR0aDogMixcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZyYW1lID0gbmV3IEZyYW1lKGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9sYW1iZXJzID0gKCgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjdWJlbGV0X2NvbG9ycykge1xuICAgICAgICByZXN1bHRba2V5XSA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29yZSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7XG4gICAgY29sb3I6IGN1YmVsZXRfY29sb3JzLmNvcmUsXG4gICAgc3BlY3VsYXI6IGN1YmVsZXRfY29sb3JzLmdyYXksXG4gICAgc2hpbmluZXNzOiAyLFxufSk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9zdGlja2VyID0gbmV3IFN0aWNrZXIoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX2VkZ2Vfd2lkdGgsIGN1YmVsZXRfZGVmcy5fc3RpY2tlcl9kZXB0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9mYWNlX2F0dHJzID0gW1xuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci54ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuTCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgLU1hdGguUEkgLyAyLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci54ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5SLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoY3ViZWxldF9kZWZzLnNpemUgLyAyLCAwLCAwKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDAsIE1hdGguUEkgLyAyLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci55ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuRCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlUsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMygwLCBjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoLU1hdGguUEkgLyAyLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuQixcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIDAsIC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIpLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoTWF0aC5QSSwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueiA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuRixcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygyICogTWF0aC5QSSwgMCwgMCksXG4gICAgfSxcbl07XG5leHBvcnQgY29uc3QgY3ViZV9zaXplID0gY3ViZWxldF9kZWZzLnNpemUgKiAzO1xuZXhwb3J0IGNvbnN0IGF4aXNfdmVjdG9ycyA9IHtcbiAgICBhOiBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKSxcbiAgICB4OiBuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksXG4gICAgeTogbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLFxuICAgIHo6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcbn07XG5leHBvcnQgY29uc3QgYXhpc19wbGFuZXMgPSB7XG4gICAgeDogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAtY3ViZV9zaXplIC8gMiksXG4gICAgeTogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCAtY3ViZV9zaXplIC8gMiksXG4gICAgejogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAtY3ViZV9zaXplIC8gMilcbn07XG5leHBvcnQgY29uc3QgaW5kZXhUb0RpcmVjdGlvbiA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyhpbmRleCAlIDMgLSAxLCBNYXRoLmZsb29yKGluZGV4IC8gMykgJSAzIC0gMSwgTWF0aC5mbG9vcihpbmRleCAvIDkpIC0gMSk7XG59O1xuZXhwb3J0IGNvbnN0IGRpcmVjdGlvblRvSW5kZXggPSAoZHJjdG4pID0+IHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoZHJjdG4ueCArIDEpICsgKGRyY3RuLnkgKyAxKSAqIDMgKyAoZHJjdG4ueiArIDEpICogOSk7XG59O1xuZXhwb3J0IGNvbnN0IGluZGV4VG9MYXllciA9IChpbmRleCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgeDogaW5kZXggJSAzLCB5OiBNYXRoLmZsb29yKGluZGV4IC8gMykgJSAzLCB6OiBNYXRoLmZsb29yKGluZGV4IC8gOSkgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydCBjb25zdCB3b3JsZFRvSW5kZXggPSAocG9pbnQpID0+IHtcbiAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLmNvcHkocG9pbnQpO1xuICAgIHZlY3Rvci5hZGQobmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoY3ViZV9zaXplIC8gMikpO1xuICAgIHZlY3Rvci5kaXZpZGVTY2FsYXIoY3ViZV9zaXplKS5tdWx0aXBseVNjYWxhcigzKS5mbG9vcigpO1xuICAgIHZlY3Rvci5tYXgobmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoMCkpO1xuICAgIHZlY3Rvci5taW4obmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoMikpO1xuICAgIHJldHVybiB2ZWN0b3IueCArIHZlY3Rvci55ICogMyArIHZlY3Rvci56ICogOTtcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCB2YXIgRmFjZTtcbihmdW5jdGlvbiAoRmFjZSkge1xuICAgIEZhY2VbRmFjZVtcIkxcIl0gPSAwXSA9IFwiTFwiO1xuICAgIEZhY2VbRmFjZVtcIlJcIl0gPSAxXSA9IFwiUlwiO1xuICAgIEZhY2VbRmFjZVtcIkRcIl0gPSAyXSA9IFwiRFwiO1xuICAgIEZhY2VbRmFjZVtcIlVcIl0gPSAzXSA9IFwiVVwiO1xuICAgIEZhY2VbRmFjZVtcIkJcIl0gPSA0XSA9IFwiQlwiO1xuICAgIEZhY2VbRmFjZVtcIkZcIl0gPSA1XSA9IFwiRlwiO1xufSkoRmFjZSB8fCAoRmFjZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgYm9yZGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IG8gPSBzaXplIC8gMjtcbiAgICAgICAgY29uc3QgaSA9IG8gLSBib3JkZXI7XG4gICAgICAgIGNvbnN0IF92ZXJ0cyA9IFtcbiAgICAgICAgICAgIC1pLCAraSwgK28sXG4gICAgICAgICAgICAraSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksIC1pLCArbyxcbiAgICAgICAgICAgIC1pLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgK28sIC1pLFxuICAgICAgICAgICAgK2ksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgK2ksXG4gICAgICAgICAgICAtaSwgK28sICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAtaSxcbiAgICAgICAgICAgIC1vLCAraSwgLWksXG4gICAgICAgICAgICAtbywgK2ksICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAraSxcbiAgICAgICAgICAgICtpLCAraSwgLW8sXG4gICAgICAgICAgICAtaSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksIC1pLCAtbyxcbiAgICAgICAgICAgICtpLCAtaSwgLW8sXG4gICAgICAgICAgICAtaSwgLW8sICtpLFxuICAgICAgICAgICAgK2ksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgLWksXG4gICAgICAgICAgICAtaSwgLW8sIC1pLFxuICAgICAgICAgICAgK28sICtpLCAraSxcbiAgICAgICAgICAgICtvLCAraSwgLWksXG4gICAgICAgICAgICArbywgLWksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAraSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShfdmVydHMsIDMpKTtcbiAgICAgICAgdGhpcy5zZXRJbmRleChGcmFtZS5faW5kaWNlcyk7XG4gICAgICAgIHRoaXMuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcbiAgICB9XG59XG5GcmFtZS5faW5kaWNlcyA9IFtcbiAgICAwLCAyLCAxLFxuICAgIDAsIDMsIDIsXG4gICAgNCwgNiwgNSxcbiAgICA0LCA3LCA2LFxuICAgIDgsIDEwLCA5LFxuICAgIDgsIDExLCAxMCxcbiAgICAxMiwgMTQsIDEzLFxuICAgIDEyLCAxNSwgMTQsXG4gICAgMTYsIDE4LCAxNyxcbiAgICAxNiwgMTksIDE4LFxuICAgIDIwLCAyMiwgMjEsXG4gICAgMjAsIDIzLCAyMixcbiAgICAxLCA2LCA3LFxuICAgIDAsIDEsIDcsXG4gICAgMywgMCwgMTAsXG4gICAgMTEsIDMsIDEwLFxuICAgIDE3LCAyLCAzLFxuICAgIDE2LCAxNywgMyxcbiAgICAyMywgMjAsIDEsXG4gICAgMiwgMjMsIDEsXG4gICAgNSwgMTIsIDEzLFxuICAgIDQsIDUsIDEzLFxuICAgIDksIDEzLCAxNCxcbiAgICA4LCA5LCAxNCxcbiAgICAyMiwgMTUsIDEyLFxuICAgIDIxLCAyMiwgMTIsXG4gICAgMTksIDE0LCAxNSxcbiAgICAxOCwgMTksIDE1LFxuICAgIDcsIDQsIDksXG4gICAgMTAsIDcsIDksXG4gICAgMTEsIDgsIDE5LFxuICAgIDE2LCAxMSwgMTksXG4gICAgMjMsIDE3LCAxOCxcbiAgICAyMiwgMjMsIDE4LFxuICAgIDIwLCAyMSwgNSxcbiAgICA2LCAyMCwgNSxcbiAgICAyMCwgNiwgMSxcbiAgICAxMCwgMCwgNyxcbiAgICAyMSwgMTIsIDUsXG4gICAgMTMsIDksIDQsXG4gICAgMjMsIDIsIDE3LFxuICAgIDExLCAxNiwgMyxcbiAgICAyMiwgMTgsIDE1LFxuICAgIDgsIDE0LCAxOSxcbl07XG5leHBvcnQgY2xhc3MgU3RpY2tlciBleHRlbmRzIFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgZGVwdGgpIHtcbiAgICAgICAgc2l6ZSA9IHNpemUgLyAyO1xuICAgICAgICBjb25zdCBsZWZ0ID0gLXNpemU7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHNpemU7XG4gICAgICAgIGNvbnN0IHRvcCA9IC1zaXplO1xuICAgICAgICBjb25zdCByaWdodCA9IHNpemU7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHNpemUgLyA0O1xuICAgICAgICBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICAgICAgICBzaGFwZS5tb3ZlVG8obGVmdCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgYm90dG9tLCBsZWZ0ICsgcmFkaXVzLCBib3R0b20pO1xuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQgLSByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8ocmlnaHQsIGJvdHRvbSwgcmlnaHQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgdG9wLCByaWdodCAtIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQgKyByYWRpdXMsIHRvcCk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgdG9wLCBsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5jbG9zZVBhdGgoKTtcbiAgICAgICAgc3VwZXIoc2hhcGUsIHsgYmV2ZWxFbmFibGVkOiBmYWxzZSwgZGVwdGg6IGRlcHRoIH0pO1xuICAgIH1cbn1cbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBSZWYgfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgSW50ZXJhY3RvciBmcm9tIFwiLi9pbnRlcmFjdG9yXCI7XG5pbXBvcnQgV29ybGQgZnJvbSBcIi4vd29ybGRcIjtcbmxldCBWaWV3cG9ydCA9IGNsYXNzIFZpZXdwb3J0IGV4dGVuZHMgVnVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3QgY2FudmFzRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhc0VsZW0uc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgICAgICAgY2FudmFzOiBjYW52YXNFbGVtLFxuICAgICAgICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgICAgICAgYWxwaGE6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigwLCAwKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdG9yID0gbmV3IEludGVyYWN0b3IoY2FudmFzRWxlbSwgdGhpcy53b3JsZC5jb250cm9sbGVyLmludGVyYWN0KTtcbiAgICB9XG4gICAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53b3JsZC5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0LCB0cnVlKTtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5jYW52YXMuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgaWYgKHRoaXMud29ybGQuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMud29ybGQuc2NlbmUsIHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgIHRoaXMud29ybGQuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICBJbmplY3QoXCJ3b3JsZFwiKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgV29ybGQpXG5dLCBWaWV3cG9ydC5wcm90b3R5cGUsIFwid29ybGRcIiwgdm9pZCAwKTtcbl9fZGVjb3JhdGUoW1xuICAgIFJlZihcImNhbnZhc1wiKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgSFRNTEVsZW1lbnQpXG5dLCBWaWV3cG9ydC5wcm90b3R5cGUsIFwiY2FudmFzXCIsIHZvaWQgMCk7XG5WaWV3cG9ydCA9IF9fZGVjb3JhdGUoW1xuICAgIENvbXBvbmVudCh7XG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiByZWY9XCJjYW52YXNcIj48L2Rpdj4nLFxuICAgICAgICBjb21wb25lbnRzOiB7fSxcbiAgICB9KSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pXG5dLCBWaWV3cG9ydCk7XG5leHBvcnQgZGVmYXVsdCBWaWV3cG9ydDtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IEN1YmUgZnJvbSBcIi4vY3ViZVwiO1xuaW1wb3J0IHsgY3ViZWxldF9kZWZzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuc2NlbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnggPSBNYXRoLlBJIC8gNjtcbiAgICAgICAgdGhpcy5zY2VuZS5yb3RhdGlvbi55ID0gLU1hdGguUEkgLyA0ICsgTWF0aC5QSSAvIDE2O1xuICAgICAgICB0aGlzLmFtYmllbnQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAxKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAwKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbC5wb3NpdGlvbi5zZXQoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5zaXplICogMywgY3ViZWxldF9kZWZzLnNpemUgKiAyKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5hbWJpZW50KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5kaXJlY3Rpb25hbCk7XG4gICAgICAgIHRoaXMuc2NlbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmN1YmUgPSBuZXcgQ3ViZSgpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmN1YmUpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmUgPSA5O1xuICAgIH1cbiAgICBzZXQgZGlydHkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkaXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3ViZS5kaXJ0eTtcbiAgICB9XG4gICAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgICB9XG4gICAgdXBkYXRlQ2FtZXJhKCkge1xuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLmhlaWdodCAvIE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIHRoaXMuc2NhbGUgLyB0aGlzLnBlcnNwZWN0aXZlO1xuICAgICAgICBjb25zdCBmb3YgPSAoMiAqIE1hdGguYXRhbihtaW4pICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gY3ViZWxldF9kZWZzLnNpemUgKiAzICogdGhpcy5wZXJzcGVjdGl2ZTtcbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSBkaXN0YW5jZTtcbiAgICAgICAgdGhpcy5jYW1lcmEubmVhciA9IGRpc3RhbmNlIC0gY3ViZWxldF9kZWZzLnNpemUgKiAzO1xuICAgICAgICB0aGlzLmNhbWVyYS5mYXIgPSBkaXN0YW5jZSArIGN1YmVsZXRfZGVmcy5zaXplICogODtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KHRoaXMuc2NlbmUucG9zaXRpb24pO1xuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVldGlmeSBmcm9tIFwidnVldGlmeVwiO1xuaW1wb3J0IFwidnVldGlmeS9kaXN0L3Z1ZXRpZnkubWluLmNzc1wiO1xuaW1wb3J0IFwibWF0ZXJpYWwtZGVzaWduLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzc1wiO1xuaW1wb3J0IFBsYXlncm91bmQgZnJvbSBcIi4vdnVlYXBwL3BsYXlncm91bmRcIjtcblZ1ZS51c2UoVnVldGlmeSk7XG5jb25zdCBvcHRzID0ge307XG5jb25zdCB2dWV0aWZ5ID0gbmV3IFZ1ZXRpZnkob3B0cyk7XG5WdWUucHJvdG90eXBlLnZ1ZXRpZnkgPSB2dWV0aWZ5O1xubGV0IGFwcCA9IFBsYXlncm91bmQ7XG5jb25zdCB2bSA9IG5ldyBWdWUoe1xuICAgIHZ1ZXRpZnksXG4gICAgZWw6IFwiI2FwcFwiLFxuICAgIHJlbmRlcjogKGgpID0+IGgoYXBwKSxcbn0pO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBQcm92aWRlLCBSZWYgfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuLi8uLi9jdWJlL3ZpZXdwb3J0XCI7XG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uL2N1YmUvd29ybGRcIjtcbmxldCBQbGF5Z3JvdW5kID0gY2xhc3MgUGxheWdyb3VuZCBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kbmV4dFRpY2sodGhpcy5yZXNpemUpO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLmNlaWwoTWF0aC5taW4odGhpcy53aWR0aCAvIDYsIHRoaXMuaGVpZ2h0IC8gMTIpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgLSB0aGlzLnNpemUgKiAxLjUpO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBzY3JhbWJsZSgpIHtcbiAgICAgICAgdGhpcy53b3JsZC5jdWJlLnNjcmFtYmxlKCk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzZXQoKTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgUHJvdmlkZShcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwidmlld3BvcnRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwidmlld3BvcnRcIiwgdm9pZCAwKTtcblBsYXlncm91bmQgPSBfX2RlY29yYXRlKFtcbiAgICBDb21wb25lbnQoe1xuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaW5kZXguaHRtbFwiKSxcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgdmlld3BvcnQ6IFZpZXdwb3J0XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9