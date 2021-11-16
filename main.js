/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <div v-resize=\"resize\" style=\"user-select: none; touch-action: none;\">\n        <setting ref=\"setting\"></setting>\n        <viewport ref=\"viewport\"></viewport>\n        <v-card flat style=\"margin: auto; touch-action: none; user-select: none;\">\n            <v-container fluid grid-list-md text-xs-center\n                :style=\"{width: Math.min(size * 10, width) + 'px', height: size * 4 + 'px'}\">\n\n                <v-layout row wrap v-if=\"!isPlayerMode\">\n                    <v-flex xs12 :style=\"{\n                            'padding-left': size / 2 + 'px',\n                            'padding-right': size / 2 + 'px',\n                            'padding-top': size * 0.2 + 'px',\n                            'font-size': (size * 0.3) + 'px',\n                            'height':size + 'px'\n                        }\">\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"scramble\" block text :ripple=\"false\" color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Scramble\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"reset\" block text :ripple=\"false\" color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Reset\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"solve\" block text :ripple=\"false\" color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Solve\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n                <v-layout row wrap v-else>\n                    <v-flex xs12 :style=\"{\n                            'padding-left': size / 2 + 'px',\n                            'padding-right': size / 2 + 'px',\n                            'padding-top': size * 0.2 + 'px',\n                            'font-size': (size * 0.3) + 'px',\n                            'height': size + 'px'\n                        }\">\n                        <v-slider\n                            v-model=\"progress\"\n                            style=\"margin: 0%; padding: 0%;\"\n                            :max=\"solution.length\" \n                            :tick-size=\"3\"\n                            thumb-label=\"always\"\n                            ticks=\"always\"\n                            hide-details\n                        >\n                            <template v-slot:thumb-label>\n                                {{ thumb_label_slot() }}\n                            </template>\n                        </v-slider>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"play\" block text :ripple=\"false\" color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Play\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"pause\" block text :ripple=\"false\" color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Pause\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"quit\" block text :ripple=\"false\" color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Quit\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </v-card>\n    </div>\n</v-app>"

/***/ }),

/***/ "./src/vueapp/setting/index.html":
/*!***************************************!*\
  !*** ./src/vueapp/setting/index.html ***!
  \***************************************/
/***/ ((module) => {

module.exports = "<div v-resize=\"resize\">\n    <v-btn fixed right top fab color=\"primary\" style=\"user-select: none;\"\n        :style=\"{width: size * 0.9 + 'px', height: size * 0.9 + 'px', 'margin-right': width / 2 - Math.min(size * 5, width / 2) + 'px'}\"\n        @click=\"state = !state\">\n        <v-icon :size=\"size * 0.6\">\n            settings\n        </v-icon>\n    </v-btn>\n    <v-bottom-sheet v-model=\"state\">\n        <v-card text style=\"margin: auto;\">\n            <v-container fluid grid-list-md text-xs-center :style=\"{width: Math.min(size * 8, width) + 'px'}\">\n                <v-subheader>\n                    SCRAMBLE LENGTH\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"scramble_steps\" thumb-label=\"always\" :max=\"40\" :min=\"0\" :marks=\"[0,10,20,30,40]\"></vue-slider>\n                </v-flex>\n                <v-subheader>\n                    FRAMES PER TWIST\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"frames\" thumb-label=\"always\" :max=\"60\" :min=\"0\" :marks=\"[0,15,30,45,60]\"></vue-slider>\n                </v-flex>\n                <v-subheader>\n                    SENSITIVITY\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"sensibility\" thumb-label=\"always\" :max=\"100\" :min=\"0\" :marks=\"[0,25,50,75,100]\"></vue-slider>\n                </v-flex>\n            </v-container>\n        </v-card>\n    </v-bottom-sheet>\n</div>"

/***/ }),

/***/ "./src/vueapp/viewport/index.html":
/*!****************************************!*\
  !*** ./src/vueapp/viewport/index.html ***!
  \****************************************/
/***/ ((module) => {

module.exports = "<div ref=\"canvas\"></div>"

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
                        _utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.sensibility;
            }
            else {
                const dx = this.move.x - this.down.x;
                const dy = this.move.y - this.down.y;
                this.angle = _utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.sensibility * (this.axis == "y" ? -dx :
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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cubelet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubelet */ "./src/cube/cubelet.ts");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/cube/group.ts");
/* harmony import */ var _twister__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twister */ "./src/cube/twister.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/cube/utils.ts");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");






class Cube extends three__WEBPACK_IMPORTED_MODULE_5__.Group {
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
        for (let i = 0; i < _utils__WEBPACK_IMPORTED_MODULE_3__.cube_config.scramble_steps; i++) {
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
    serialize() {
        const result = [];
        let x, y, z;
        _twister__WEBPACK_IMPORTED_MODULE_2__.twister.finish();
        y = 2;
        for (z = 0; z < 3; z++) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.U);
                result.push(color);
            }
        }
        x = 2;
        for (y = 2; y >= 0; y--) {
            for (z = 2; z >= 0; z--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R);
                result.push(color);
            }
        }
        z = 2;
        for (y = 2; y >= 0; y--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F);
                result.push(color);
            }
        }
        y = 0;
        for (z = 2; z >= 0; z--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D);
                result.push(color);
            }
        }
        x = 0;
        for (y = 2; y >= 0; y--) {
            for (z = 0; z < 3; z++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L);
                result.push(color);
            }
        }
        z = 0;
        for (y = 2; y >= 0; y--) {
            for (x = 2; x >= 0; x--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = this.cubelets[index].getColorOf(_utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B);
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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");




class Cubelet extends three__WEBPACK_IMPORTED_MODULE_1__.Group {
    constructor(index) {
        super();
        this._vector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();
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
    convertFace(face) {
        let position = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3();
        const quaternion = new three__WEBPACK_IMPORTED_MODULE_1__.Quaternion().copy(this.quaternion);
        for (const binding of _utils__WEBPACK_IMPORTED_MODULE_0__.facePostionBindings) {
            if (binding.face === face) {
                position.copy(binding.position);
                break;
            }
        }
        position.applyQuaternion(quaternion.invert());
        const vector = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.round(position.x), Math.round(position.y), Math.round(position.z));
        for (const binding of _utils__WEBPACK_IMPORTED_MODULE_0__.facePostionBindings) {
            if (binding.position.equals(vector)) {
                return binding.face;
            }
        }
        return -1;
    }
    getColorOf(face) {
        const sticker = this.stickers[this.convertFace(face)];
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
            const duration = _utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.frames * (2 - 2 / (frac + 1));
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
/* harmony export */   "cube_config": () => (/* binding */ cube_config),
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
/* harmony export */   "worldToIndex": () => (/* binding */ worldToIndex),
/* harmony export */   "facePostionBindings": () => (/* binding */ facePostionBindings)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");



const cube_config = {
    frames: 30,
    sensibility: 20 * 1e-4,
    scramble_steps: 20,
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
const facePostionBindings = [
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.L,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 0)
    },
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.R,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, 0)
    },
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.D,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0)
    },
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.U,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0)
    },
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.B,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -1)
    },
    {
        face: _utils_internal__WEBPACK_IMPORTED_MODULE_0__.Face.F,
        position: new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1)
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

/***/ "./src/solver/CoordCube.ts":
/*!*********************************!*\
  !*** ./src/solver/CoordCube.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CoordCube)
/* harmony export */ });
/* harmony import */ var _CubieCube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CubieCube */ "./src/solver/CubieCube.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util */ "./src/solver/Util.ts");


class CoordCube {
    constructor() {
        this.twist = 0;
        this.tsym = 0;
        this.flip = 0;
        this.fsym = 0;
        this.slice = 0;
        this.prun = 0;
    }
    static Init() {
        if (CoordCube.inited == 46) {
            return;
        }
        if (CoordCube.inited == 0) {
            CoordCube.CubieC = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
            CoordCube.CubieD = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].InitPermSym2Raw();
            CoordCube.InitCPermMove();
            CoordCube.InitEPermMove();
            CoordCube.InitMPermMoveConj();
            CoordCube.InitCombPMoveConj();
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].InitFlipSym2Raw();
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].InitTwistSym2Raw();
            CoordCube.InitFlipMove();
            CoordCube.InitTwistMove();
            CoordCube.InitUDSliceMoveConj();
            CoordCube.inited = 1;
            return;
        }
        CoordCube.InitMCPermPrun();
        CoordCube.InitEPermCombPPrun();
        CoordCube.InitSliceTwistPrun();
        CoordCube.InitSliceFlipPrun();
    }
    static InitCPermMove() {
        for (let i = 0; i < CoordCube.N_PERM_SYM; i++) {
            CoordCube.CPermMove[i] = [];
            CoordCube.CubieC.CPerm = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EPermS2R[i];
            for (let j = 0; j < CoordCube.N_MOVES2; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[_Util__WEBPACK_IMPORTED_MODULE_1__["default"].UD2STD[j]], CoordCube.CubieD);
                CoordCube.CPermMove[i][j] = CoordCube.CubieD.CPermSym;
            }
        }
    }
    static InitEPermMove() {
        for (let i = 0; i < CoordCube.N_PERM_SYM; i++) {
            CoordCube.EPermMove[i] = [];
            CoordCube.CubieC.EPerm = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EPermS2R[i];
            for (let j = 0; j < CoordCube.N_MOVES2; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[_Util__WEBPACK_IMPORTED_MODULE_1__["default"].UD2STD[j]], CoordCube.CubieD);
                CoordCube.EPermMove[i][j] = CoordCube.CubieD.EPermSym;
            }
        }
    }
    static InitMPermMoveConj() {
        for (let i = 0; i < CoordCube.N_MPERM; i++) {
            CoordCube.MPermMove[i] = [];
            CoordCube.MPermConj[i] = [];
            CoordCube.CubieC.MPerm = i;
            for (let j = 0; j < CoordCube.N_MOVES2; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[_Util__WEBPACK_IMPORTED_MODULE_1__["default"].UD2STD[j]], CoordCube.CubieD);
                CoordCube.MPermMove[i][j] = CoordCube.CubieD.MPerm;
            }
            for (let j = 0; j < 16; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeConjugate(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[0][j], CoordCube.CubieD);
                CoordCube.MPermConj[i][j] = CoordCube.CubieD.MPerm;
            }
        }
    }
    static InitCombPMoveConj() {
        for (let i = 0; i < CoordCube.N_COMB; i++) {
            CoordCube.CCombPMove[i] = [];
            CoordCube.CCombPConj[i] = [];
            CoordCube.CubieC.CComb = i % 70;
            for (let j = 0; j < CoordCube.N_MOVES2; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[_Util__WEBPACK_IMPORTED_MODULE_1__["default"].UD2STD[j]], CoordCube.CubieD);
                CoordCube.CCombPMove[i][j] = CoordCube.CubieD.CComb + 70 * (((CoordCube.P2_PARITY_MOVE >> j) & 1) ^ (i / 70));
            }
            for (let j = 0; j < 16; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornConjugate(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[0][j], CoordCube.CubieD);
                CoordCube.CCombPConj[i][j] = CoordCube.CubieD.CComb + 70 * ~~(i / 70);
            }
        }
    }
    static InitFlipMove() {
        for (let i = 0; i < CoordCube.N_FLIP_SYM; i++) {
            CoordCube.FlipMove[i] = [];
            CoordCube.CubieC.Flip = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].FlipS2R[i];
            for (let j = 0; j < CoordCube.N_MOVES; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[j], CoordCube.CubieD);
                CoordCube.FlipMove[i][j] = CoordCube.CubieD.FlipSym;
            }
        }
    }
    static InitTwistMove() {
        for (let i = 0; i < CoordCube.N_TWIST_SYM; i++) {
            CoordCube.TwistMove[i] = [];
            CoordCube.CubieC.Twist = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].TwistS2R[i];
            for (let j = 0; j < CoordCube.N_MOVES; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[j], CoordCube.CubieD);
                CoordCube.TwistMove[i][j] = CoordCube.CubieD.TwistSym;
            }
        }
    }
    static InitUDSliceMoveConj() {
        for (let i = 0; i < CoordCube.N_SLICE; i++) {
            CoordCube.UDSliceMove[i] = [];
            CoordCube.UDSliceConj[i] = [];
            CoordCube.CubieC.UDSlice = i;
            for (let j = 0; j < CoordCube.N_MOVES; j++) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[j], CoordCube.CubieD);
                CoordCube.UDSliceMove[i][j] = CoordCube.CubieD.UDSlice;
            }
            for (let j = 0; j < 16; j += 2) {
                _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeConjugate(CoordCube.CubieC, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[0][j], CoordCube.CubieD);
                CoordCube.UDSliceConj[i][j >> 1] = CoordCube.CubieD.UDSlice;
            }
        }
    }
    static SetPruning(table, index, value) {
        table[index >> 3] ^= value << (index << 2);
    }
    static GetPruning(table, index) {
        return (table[index >> 3] >> (index << 2)) & 0xf;
    }
    static HasZero(val) {
        return ((val - 0x11111111) & ~val & 0x88888888) != 0;
    }
    static InitRawSymPrun(PrunTable, N_RAW, N_SYM, RawMove, RawConj, SymMove, SymState, PrunFlag) {
        const SYM_SHIFT = PrunFlag & 0xf;
        const SYM_E2C_MAGIC = ((PrunFlag >> 4) & 1) == 1 ? 0x00dddd00 : 0x00000000;
        const IS_PHASE2 = ((PrunFlag >> 5) & 1) == 1;
        const INV_DEPTH = (PrunFlag >> 8) & 0xf;
        const MAX_DEPTH = (PrunFlag >> 12) & 0xf;
        const MIN_DEPTH = (PrunFlag >> 16) & 0xf;
        const SYM_MASK = (1 << SYM_SHIFT) - 1;
        const N_SIZE = N_RAW * N_SYM;
        const N_MOVES = IS_PHASE2 ? 10 : 18;
        const NEXT_AXIS_MAGIC = N_MOVES == 10 ? 0x42 : 0x92492;
        let depth = CoordCube.GetPruning(PrunTable, N_SIZE) - 1;
        if (depth == -1) {
            for (let i = 0; i < (N_SIZE >> 3) + 1; i++) {
                PrunTable[i] = 0xffffffff;
            }
            CoordCube.SetPruning(PrunTable, 0, 0 ^ 0xf);
            depth = 0;
        }
        else {
            CoordCube.SetPruning(PrunTable, N_SIZE, 0xf ^ (depth + 1));
        }
        const SEARCH_DEPTH = Math.min(Math.max(depth + 1, MIN_DEPTH), MAX_DEPTH);
        while (depth < SEARCH_DEPTH) {
            const inv = depth > INV_DEPTH;
            const select = inv ? 0xf : depth;
            const selArrMask = select * 0x11111111;
            const check = inv ? depth : 0xf;
            depth++;
            CoordCube.inited++;
            const xorVal = depth ^ 0xf;
            let val = 0;
            for (let i = 0; i < N_SIZE; i++, val >>= 4) {
                if ((i & 7) == 0) {
                    val = PrunTable[i >> 3];
                    if (!CoordCube.HasZero(val ^ selArrMask)) {
                        i += 7;
                        continue;
                    }
                }
                if ((val & 0xf) != select) {
                    continue;
                }
                const raw = i % N_RAW;
                const sym = ~~(i / N_RAW);
                for (let m = 0; m < N_MOVES; m++) {
                    let symx = SymMove[sym][m];
                    const rawx = RawConj[RawMove[raw][m]][symx & SYM_MASK];
                    symx >>= SYM_SHIFT;
                    const idx = symx * N_RAW + rawx;
                    const prun = CoordCube.GetPruning(PrunTable, idx);
                    if (prun != check) {
                        if (prun < depth - 1) {
                            m += (NEXT_AXIS_MAGIC >> m) & 3;
                        }
                        continue;
                    }
                    if (inv) {
                        CoordCube.SetPruning(PrunTable, i, xorVal);
                        break;
                    }
                    CoordCube.SetPruning(PrunTable, idx, xorVal);
                    for (let j = 1, symState = SymState[symx]; (symState >>= 1) != 0; j++) {
                        if ((symState & 1) != 1) {
                            continue;
                        }
                        let idxx = symx * N_RAW;
                        idxx += RawConj[rawx][j ^ ((SYM_E2C_MAGIC >> (j << 1)) & 3)];
                        if (CoordCube.GetPruning(PrunTable, idxx) == check) {
                            CoordCube.SetPruning(PrunTable, idxx, xorVal);
                        }
                    }
                }
            }
        }
        CoordCube.SetPruning(PrunTable, N_SIZE, (depth + 1) ^ 0xf);
    }
    static InitSliceTwistPrun() {
        CoordCube.InitRawSymPrun(CoordCube.UDSliceTwistPrun, 495, 324, CoordCube.UDSliceMove, CoordCube.UDSliceConj, CoordCube.TwistMove, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymStateTwist, 0x69603);
    }
    static InitSliceFlipPrun() {
        CoordCube.InitRawSymPrun(CoordCube.UDSliceFlipPrun, 495, 336, CoordCube.UDSliceMove, CoordCube.UDSliceConj, CoordCube.FlipMove, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymStateFlip, 0x69603);
    }
    static InitMCPermPrun() {
        CoordCube.InitRawSymPrun(CoordCube.MCPermPrun, 24, 2768, CoordCube.MPermMove, CoordCube.MPermConj, CoordCube.CPermMove, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymStatePerm, 0x8ea34);
    }
    static InitEPermCombPPrun() {
        CoordCube.InitRawSymPrun(CoordCube.EPermCCombPPrun, CoordCube.N_COMB, 2768, CoordCube.CCombPMove, CoordCube.CCombPConj, CoordCube.EPermMove, _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymStatePerm, 0x7d824);
    }
    setWithPrun(cc, depth) {
        this.twist = cc.TwistSym;
        this.flip = cc.FlipSym;
        this.tsym = this.twist & 7;
        this.twist = this.twist >> 3;
        this.prun = 0;
        this.fsym = this.flip & 7;
        this.flip = this.flip >> 3;
        this.slice = cc.UDSlice;
        this.prun = Math.max(this.prun, Math.max(CoordCube.GetPruning(CoordCube.UDSliceTwistPrun, this.twist * CoordCube.N_SLICE + CoordCube.UDSliceConj[this.slice][this.tsym]), CoordCube.GetPruning(CoordCube.UDSliceFlipPrun, this.flip * CoordCube.N_SLICE + CoordCube.UDSliceConj[this.slice][this.fsym])));
        return this.prun <= depth;
    }
    doMovePrun(cc, m) {
        this.slice = CoordCube.UDSliceMove[cc.slice][m];
        this.flip = CoordCube.FlipMove[cc.flip][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Sym8Move[(m << 3) | cc.fsym]];
        this.fsym = (this.flip & 7) ^ cc.fsym;
        this.flip >>= 3;
        this.twist = CoordCube.TwistMove[cc.twist][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Sym8Move[(m << 3) | cc.tsym]];
        this.tsym = (this.twist & 7) ^ cc.tsym;
        this.twist >>= 3;
        this.prun = Math.max(CoordCube.GetPruning(CoordCube.UDSliceTwistPrun, this.twist * CoordCube.N_SLICE + CoordCube.UDSliceConj[this.slice][this.tsym]), CoordCube.GetPruning(CoordCube.UDSliceFlipPrun, this.flip * CoordCube.N_SLICE + CoordCube.UDSliceConj[this.slice][this.fsym]));
        return this.prun;
    }
}
CoordCube.N_MOVES = 18;
CoordCube.N_MOVES2 = 10;
CoordCube.N_SLICE = 495;
CoordCube.N_TWIST = 2187;
CoordCube.N_TWIST_SYM = 324;
CoordCube.N_FLIP = 2048;
CoordCube.N_FLIP_SYM = 336;
CoordCube.N_PERM = 40320;
CoordCube.N_PERM_SYM = 2768;
CoordCube.N_MPERM = 24;
CoordCube.N_COMB = 70;
CoordCube.P2_PARITY_MOVE = 0;
CoordCube.UDSliceMove = [];
CoordCube.TwistMove = [];
CoordCube.FlipMove = [];
CoordCube.UDSliceConj = [];
CoordCube.UDSliceTwistPrun = [];
CoordCube.UDSliceFlipPrun = [];
CoordCube.CPermMove = [];
CoordCube.EPermMove = [];
CoordCube.MPermMove = [];
CoordCube.MPermConj = [];
CoordCube.CCombPMove = [];
CoordCube.CCombPConj = [];
CoordCube.MCPermPrun = [];
CoordCube.EPermCCombPPrun = [];
CoordCube.inited = 0;


/***/ }),

/***/ "./src/solver/CubieCube.ts":
/*!*********************************!*\
  !*** ./src/solver/CubieCube.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CubieCube)
/* harmony export */ });
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util */ "./src/solver/Util.ts");
/* harmony import */ var _CoordCube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CoordCube */ "./src/solver/CoordCube.ts");


class CubieCube {
    constructor(cperm = 0, twist = 0, eperm = 0, flip = 0) {
        this.ca = [0, 1, 2, 3, 4, 5, 6, 7];
        this.ea = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
        this.CPerm = cperm;
        this.Twist = twist;
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetNPermFull(this.ea, eperm, 12, true);
        this.Flip = flip;
    }
    static ESym2CSym(idx) {
        return idx ^ ((CubieCube.SYM_E2C_MAGIC >> ((idx & 0xf) << 1)) & 3);
    }
    static InitMove() {
        const result = [];
        result[0] = new CubieCube(15120, 0, 119750400, 0);
        result[3] = new CubieCube(21021, 1494, 323403417, 0);
        result[6] = new CubieCube(8064, 1236, 29441808, 550);
        result[9] = new CubieCube(9, 0, 5880, 0);
        result[12] = new CubieCube(1230, 412, 2949660, 0);
        result[15] = new CubieCube(224, 137, 328552, 137);
        for (let a = 0; a < 18; a += 3) {
            for (let p = 0; p < 2; p++) {
                result[a + p + 1] = new CubieCube();
                CubieCube.EdgeMult(result[a + p], result[a], result[a + p + 1]);
                CubieCube.CornMult(result[a + p], result[a], result[a + p + 1]);
            }
        }
        CubieCube.MoveCube = result;
    }
    static InitSym() {
        let c = new CubieCube();
        let d = new CubieCube();
        const f2 = new CubieCube(28783, 0, 259268407, 0);
        const u4 = new CubieCube(15138, 0, 119765538, 7);
        const lr2 = new CubieCube(5167, 0, 83473207, 0);
        for (let i = 0; i < 8; i++) {
            lr2.ca[i] |= 3 << 3;
        }
        for (let i = 0; i < 16; i++) {
            CubieCube.SymCube[i] = new CubieCube();
            CubieCube.SymCube[i].copy(c);
            CubieCube.CornMultFull(c, u4, d);
            CubieCube.EdgeMult(c, u4, d);
            [c, d] = [d, c];
            if (i % 4 == 3) {
                CubieCube.CornMultFull(c, lr2, d);
                CubieCube.EdgeMult(c, lr2, d);
                [c, d] = [d, c];
            }
            if (i % 8 == 7) {
                CubieCube.CornMultFull(c, f2, d);
                CubieCube.EdgeMult(c, f2, d);
                [c, d] = [d, c];
            }
        }
        for (let i = 0; i < 16; i++) {
            CubieCube.SymMult[i] = [];
            CubieCube.SymMultInv[i] = [];
            CubieCube.SymMove[i] = [];
            CubieCube.SymMoveUD[i] = [];
        }
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                CubieCube.SymMult[i][j] = i ^ j ^ ((0x14ab4 >> j) & (i << 1) & 2);
                CubieCube.SymMultInv[CubieCube.SymMult[i][j]][j] = i;
            }
        }
        for (let s = 0; s < 16; s++) {
            for (let j = 0; j < 18; j++) {
                CubieCube.CornConjugate(CubieCube.MoveCube[j], CubieCube.SymMultInv[0][s], c);
                outloop: for (let m = 0; m < 18; m++) {
                    for (let t = 0; t < 8; t++) {
                        if (CubieCube.MoveCube[m].ca[t] != c.ca[t]) {
                            continue outloop;
                        }
                    }
                    CubieCube.SymMove[s][j] = m;
                    CubieCube.SymMoveUD[s][_Util__WEBPACK_IMPORTED_MODULE_0__["default"].STD2UD[j]] = _Util__WEBPACK_IMPORTED_MODULE_0__["default"].STD2UD[m];
                    break;
                }
                if (s % 2 == 0) {
                    CubieCube.Sym8Move[(j << 3) | (s >> 1)] = CubieCube.SymMove[s][j];
                }
            }
        }
    }
    static InitSym2Raw(N_RAW, Sym2Raw, Raw2Sym, SymState, coord) {
        const c = new CubieCube();
        const d = new CubieCube();
        let count = 0, idx = 0;
        const symInc = coord >= 2 ? 1 : 2;
        const isEdge = coord != 1;
        for (let i = 0; i < N_RAW; i++) {
            if (Raw2Sym[i] != undefined) {
                continue;
            }
            switch (coord) {
                case 0:
                    c.Flip = i;
                    break;
                case 1:
                    c.Twist = i;
                    break;
                case 2:
                    c.EPerm = i;
                    break;
            }
            for (let s = 0; s < 16; s += symInc) {
                if (isEdge) {
                    CubieCube.EdgeConjugate(c, s, d);
                }
                else {
                    CubieCube.CornConjugate(c, s, d);
                }
                switch (coord) {
                    case 0:
                        idx = d.Flip;
                        break;
                    case 1:
                        idx = d.Twist;
                        break;
                    case 2:
                        idx = d.EPerm;
                        break;
                }
                if (idx == i) {
                    SymState[count] |= 1 << (s / symInc);
                }
                Raw2Sym[idx] = ((count << 4) | s) / symInc;
            }
            Sym2Raw[count++] = i;
        }
        return count;
    }
    static InitFlipSym2Raw() {
        CubieCube.InitSym2Raw(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_FLIP, CubieCube.FlipS2R, CubieCube.FlipR2S, CubieCube.SymStateFlip, 0);
    }
    static InitTwistSym2Raw() {
        CubieCube.InitSym2Raw(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_TWIST, CubieCube.TwistS2R, CubieCube.TwistR2S, CubieCube.SymStateTwist, 1);
    }
    static InitPermSym2Raw() {
        CubieCube.InitSym2Raw(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_PERM, CubieCube.EPermS2R, CubieCube.EPermR2S, CubieCube.SymStatePerm, 2);
        const cc = new CubieCube();
        for (let i = 0; i < _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_PERM_SYM; i++) {
            cc.EPerm = CubieCube.EPermS2R[i];
            CubieCube.Perm2CombP[i] = _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetComb(cc.ea, 0, true);
            cc.inverse();
            CubieCube.PermInvEdgeSym[i] = cc.EPermSym;
        }
        for (let i = 0; i < _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_MPERM; i++) {
            cc.MPerm = i;
            cc.inverse();
            CubieCube.MPermInv[i] = cc.MPerm;
        }
    }
    static Init() {
        CubieCube.temps = new CubieCube();
        CubieCube.InitMove();
        CubieCube.InitSym();
    }
    static CornMult(a, b, prod) {
        for (let corn = 0; corn < 8; corn++) {
            const oriA = a.ca[b.ca[corn] & 7] >> 3;
            const oriB = b.ca[corn] >> 3;
            prod.ca[corn] = (a.ca[b.ca[corn] & 7] & 7) | ((oriA + oriB) % 3 << 3);
        }
    }
    static CornMultFull(a, b, prod) {
        for (let corn = 0; corn < 8; corn++) {
            const oriA = a.ca[b.ca[corn] & 7] >> 3;
            const oriB = b.ca[corn] >> 3;
            let ori = oriA + (oriA < 3 ? oriB : 6 - oriB);
            ori = (ori % 3) + (oriA < 3 == oriB < 3 ? 0 : 3);
            prod.ca[corn] = (a.ca[b.ca[corn] & 7] & 7) | (ori << 3);
        }
    }
    static EdgeMult(a, b, prod) {
        for (let ed = 0; ed < 12; ed++) {
            prod.ea[ed] = a.ea[b.ea[ed] >> 1] ^ (b.ea[ed] & 1);
        }
    }
    static CornConjugate(a, idx, b) {
        const sinv = CubieCube.SymCube[CubieCube.SymMultInv[0][idx]];
        const s = CubieCube.SymCube[idx];
        for (let corn = 0; corn < 8; corn++) {
            const oriA = sinv.ca[a.ca[s.ca[corn] & 7] & 7] >> 3;
            const oriB = a.ca[s.ca[corn] & 7] >> 3;
            const ori = oriA < 3 ? oriB : (3 - oriB) % 3;
            b.ca[corn] = (sinv.ca[a.ca[s.ca[corn] & 7] & 7] & 7) | (ori << 3);
        }
    }
    static EdgeConjugate(a, idx, b) {
        const sinv = CubieCube.SymCube[CubieCube.SymMultInv[0][idx]];
        const s = CubieCube.SymCube[idx];
        for (let ed = 0; ed < 12; ed++) {
            b.ea[ed] = sinv.ea[a.ea[s.ea[ed] >> 1] >> 1] ^ (a.ea[s.ea[ed] >> 1] & 1) ^ (s.ea[ed] & 1);
        }
    }
    static GetPermSymInv(idx, sym, corner) {
        let idxi = CubieCube.PermInvEdgeSym[idx];
        if (corner) {
            idxi = CubieCube.ESym2CSym(idxi);
        }
        return (idxi & 0xfff0) | CubieCube.SymMult[idxi & 0xf][sym];
    }
    static GetSkipMoves(ssym) {
        let ret = 0;
        for (let i = 1; (ssym >>= 1) != 0; i++) {
            if ((ssym & 1) == 1) {
                ret |= CubieCube.FirstMoveSym[i];
            }
        }
        return ret;
    }
    copy(c) {
        for (let edge = 0; edge < 12; edge++) {
            this.ea[edge] = c.ea[edge];
        }
        for (let corn = 0; corn < 8; corn++) {
            this.ca[corn] = c.ca[corn];
        }
    }
    inverse() {
        for (let edge = 0; edge < 12; edge++) {
            CubieCube.temps.ea[this.ea[edge] >> 1] = (edge << 1) | (this.ea[edge] & 1);
        }
        for (let corn = 0; corn < 8; corn++) {
            CubieCube.temps.ca[this.ca[corn] & 0x7] = corn | ((0x20 >> (this.ca[corn] >> 3)) & 0x18);
        }
        this.copy(CubieCube.temps);
    }
    URFConjugate() {
        CubieCube.CornMult(CubieCube.URF2, this, CubieCube.temps);
        CubieCube.CornMult(CubieCube.temps, CubieCube.URF1, this);
        CubieCube.EdgeMult(CubieCube.URF2, this, CubieCube.temps);
        CubieCube.EdgeMult(CubieCube.temps, CubieCube.URF1, this);
    }
    get Flip() {
        let idx = 0;
        for (let i = 0; i < 11; i++) {
            idx = (idx << 1) | (this.ea[i] & 1);
        }
        return idx;
    }
    set Flip(idx) {
        let parity = 0;
        let val = 0;
        for (let i = 10; i >= 0; i--, idx >>= 1) {
            parity ^= val = idx & 1;
            this.ea[i] = (this.ea[i] & ~1) | val;
        }
        this.ea[11] = (this.ea[11] & ~1) | parity;
    }
    get FlipSym() {
        return CubieCube.FlipR2S[this.Flip];
    }
    get Twist() {
        let idx = 0;
        for (let i = 0; i < 7; i++) {
            idx += (idx << 1) + (this.ca[i] >> 3);
        }
        return idx;
    }
    set Twist(idx) {
        let twst = 15;
        let val = 0;
        for (let i = 6; i >= 0; i--, idx = ~~(idx / 3)) {
            twst -= val = idx % 3;
            this.ca[i] = (this.ca[i] & 0x7) | (val << 3);
        }
        this.ca[7] = (this.ca[7] & 0x7) | (twst % 3 << 3);
    }
    get TwistSym() {
        return CubieCube.TwistR2S[this.Twist];
    }
    get UDSlice() {
        return 494 - _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetComb(this.ea, 8, true);
    }
    set UDSlice(idx) {
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetComb(this.ea, 494 - idx, 8, true);
    }
    get CPerm() {
        return _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNPerm(this.ca, 8, false);
    }
    set CPerm(idx) {
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetNPerm(this.ca, idx, 8, false);
    }
    get CPermSym() {
        return CubieCube.ESym2CSym(CubieCube.EPermR2S[this.CPerm]);
    }
    get EPerm() {
        return _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNPerm(this.ea, 8, true);
    }
    set EPerm(idx) {
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetNPerm(this.ea, idx, 8, true);
    }
    get EPermSym() {
        return CubieCube.EPermR2S[this.EPerm];
    }
    get MPerm() {
        return _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNPermFull(this.ea, 12, true) % 24;
    }
    set MPerm(idx) {
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetNPermFull(this.ea, idx, 12, true);
    }
    get CComb() {
        return _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetComb(this.ca, 0, false);
    }
    set CComb(idx) {
        _Util__WEBPACK_IMPORTED_MODULE_0__["default"].SetComb(this.ca, idx, 0, false);
    }
    verify() {
        let sum = 0;
        let mask = 0;
        for (let e = 0; e < 12; e++) {
            mask |= 1 << (this.ea[e] >> 1);
            sum ^= this.ea[e] & 1;
        }
        if (mask != 0xfff) {
            return "missing edges";
        }
        if (sum != 0) {
            return "fliped edges";
        }
        mask = 0;
        sum = 0;
        for (let c = 0; c < 8; c++) {
            mask |= 1 << (this.ca[c] & 7);
            sum += this.ca[c] >> 3;
        }
        if (mask != 0xff) {
            return "missing corners";
        }
        if (sum % 3 != 0) {
            return "twisted corner";
        }
        if ((_Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNParity(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNPermFull(this.ea, 12, true), 12) ^ _Util__WEBPACK_IMPORTED_MODULE_0__["default"].GetNParity(this.CPerm, 8)) != 0) {
            return "parity error";
        }
        return "";
    }
    serialize() {
        const ts = "URFDLB";
        const f = [];
        for (let i = 0; i < 54; i++) {
            f[i] = ts[~~(i / 9)];
        }
        for (let c = 0; c < 8; c++) {
            const j = this.ca[c] & 0x7;
            const ori = this.ca[c] >> 3;
            for (let n = 0; n < 3; n++)
                f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[c][(n + ori) % 3]] = ts[~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[j][n] / 9)];
        }
        for (let e = 0; e < 12; e++) {
            const j = this.ea[e] >> 1;
            const ori = this.ea[e] & 1;
            for (let n = 0; n < 2; n++)
                f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[e][(n + ori) % 2]] = ts[~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[j][n] / 9)];
        }
        return f.join("");
    }
    deserialize(facelet) {
        let count = 0;
        const f = [];
        const centers = facelet[4] + facelet[13] + facelet[22] + facelet[31] + facelet[40] + facelet[49];
        for (let i = 0; i < 54; ++i) {
            f[i] = centers.indexOf(facelet[i]);
            if (f[i] == -1) {
                return false;
            }
            count += 1 << (f[i] << 2);
        }
        if (count != 0x999999) {
            return false;
        }
        let col1, col2, i, j, ori;
        for (i = 0; i < 8; ++i) {
            for (ori = 0; ori < 3; ++ori)
                if (f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[i][ori]] == 0 || f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[i][ori]] == 3)
                    break;
            col1 = f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[i][(ori + 1) % 3]];
            col2 = f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[i][(ori + 2) % 3]];
            for (j = 0; j < 8; ++j) {
                if (col1 == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[j][1] / 9) && col2 == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].CornerFacelet[j][2] / 9)) {
                    this.ca[i] = j | (ori % 3 << 3);
                    break;
                }
            }
        }
        for (i = 0; i < 12; ++i) {
            for (j = 0; j < 12; ++j) {
                if (f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[i][0]] == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[j][0] / 9) &&
                    f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[i][1]] == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[j][1] / 9)) {
                    this.ea[i] = j << 1;
                    break;
                }
                if (f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[i][0]] == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[j][1] / 9) &&
                    f[_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[i][1]] == ~~(_Util__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeFacelet[j][0] / 9)) {
                    this.ea[i] = (j << 1) | 1;
                    break;
                }
            }
        }
        return true;
    }
}
CubieCube.SymCube = [];
CubieCube.MoveCube = [];
CubieCube.MoveCubeSym = [];
CubieCube.FirstMoveSym = [];
CubieCube.SymMult = [];
CubieCube.SymMultInv = [];
CubieCube.SymMove = [];
CubieCube.Sym8Move = [];
CubieCube.SymMoveUD = [];
CubieCube.FlipS2R = [];
CubieCube.TwistS2R = [];
CubieCube.EPermS2R = [];
CubieCube.Perm2CombP = [];
CubieCube.PermInvEdgeSym = [];
CubieCube.MPermInv = [];
CubieCube.SYM_E2C_MAGIC = 0x00dddd00;
CubieCube.FlipR2S = [];
CubieCube.TwistR2S = [];
CubieCube.EPermR2S = [];
CubieCube.SymStateTwist = [];
CubieCube.SymStateFlip = [];
CubieCube.SymStatePerm = [];
CubieCube.URF1 = new CubieCube(2531, 1373, 67026819, 1367);
CubieCube.URF2 = new CubieCube(2089, 1906, 322752913, 2040);
CubieCube.URFMove = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [6, 7, 8, 0, 1, 2, 3, 4, 5, 15, 16, 17, 9, 10, 11, 12, 13, 14],
    [3, 4, 5, 6, 7, 8, 0, 1, 2, 12, 13, 14, 15, 16, 17, 9, 10, 11],
    [2, 1, 0, 5, 4, 3, 8, 7, 6, 11, 10, 9, 14, 13, 12, 17, 16, 15],
    [8, 7, 6, 2, 1, 0, 5, 4, 3, 17, 16, 15, 11, 10, 9, 14, 13, 12],
    [5, 4, 3, 8, 7, 6, 2, 1, 0, 14, 13, 12, 17, 16, 15, 11, 10, 9],
];


/***/ }),

/***/ "./src/solver/Solver.ts":
/*!******************************!*\
  !*** ./src/solver/Solver.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Solver)
/* harmony export */ });
/* harmony import */ var _CubieCube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CubieCube */ "./src/solver/CubieCube.ts");
/* harmony import */ var _CoordCube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CoordCube */ "./src/solver/CoordCube.ts");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Util */ "./src/solver/Util.ts");



class Solver {
    constructor() {
        this.length1 = 0;
        this.urfIdx = 0;
        this.depth1 = 0;
        _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Init();
        _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].Init();
        this.move = [];
        this.moveSol = [];
        this.nodeUD = [];
        this.valid1 = 0;
        this.allowShorter = false;
        this.cc = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.urfCubieCube = [];
        this.urfCoordCube = [];
        this.phase1Cubie = [];
        this.preMoveCubes = [];
        this.preMoves = [];
        this.preMoveLen = 0;
        this.maxPreMoves = 0;
        for (let i = 0; i < 21; i++) {
            this.nodeUD[i] = new _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"]();
            this.phase1Cubie[i] = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
        for (let i = 0; i < 6; i++) {
            this.urfCubieCube[i] = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
            this.urfCoordCube[i] = new _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"]();
        }
        for (let i = 0; i < Solver.MAX_PRE_MOVES; i++) {
            this.preMoveCubes[i + 1] = new _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
    }
    solve(facelets) {
        _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].Init();
        const valid = this.cc.deserialize(facelets);
        if (!valid) {
            return "error: invalid cube";
        }
        const verify = this.cc.verify();
        if (verify.length > 0) {
            return "error: " + verify;
        }
        this.sol = 22;
        this.moveSol = null;
        this.initSearch();
        const solution = this.search();
        return solution;
    }
    initSearch() {
        this.conjMask = (Solver.TRY_INVERSE ? 0 : 0x38) | (Solver.TRY_THREE_AXES ? 0 : 0x36);
        this.maxPreMoves = this.conjMask > 7 ? 0 : Solver.MAX_PRE_MOVES;
        for (let i = 0; i < 6; i++) {
            this.urfCubieCube[i].copy(this.cc);
            this.urfCoordCube[i].setWithPrun(this.urfCubieCube[i], 20);
            this.cc.URFConjugate();
            if (i % 3 == 2) {
                this.cc.inverse();
            }
        }
    }
    search() {
        for (this.length1 = 0; this.length1 < this.sol; this.length1++) {
            for (this.urfIdx = 0; this.urfIdx < 6; this.urfIdx++) {
                if ((this.conjMask & (1 << this.urfIdx)) != 0) {
                    continue;
                }
                if (this.phase1PreMoves(this.maxPreMoves, -30, this.urfCubieCube[this.urfIdx]) == 0) {
                    return this.moveSol == null ? "error: no solution for prob" : this.getSolution();
                }
            }
        }
        return this.moveSol == null ? "error: no solution for depth" : this.getSolution();
    }
    getSolution() {
        let ret = "";
        if (!this.moveSol) {
            return ret;
        }
        const urf = this.urfIdx;
        if (urf < 3) {
            for (let s = 0; s < this.moveSol.length; ++s) {
                ret += _Util__WEBPACK_IMPORTED_MODULE_2__["default"].MOVE2STR[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].URFMove[urf][this.moveSol[s]]] + " ";
            }
        }
        else {
            for (let s = this.moveSol.length - 1; s >= 0; --s) {
                ret += _Util__WEBPACK_IMPORTED_MODULE_2__["default"].MOVE2STR[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].URFMove[urf][this.moveSol[s]]] + " ";
            }
        }
        return ret;
    }
    phase1PreMoves(maxl, lm, cc) {
        this.preMoveLen = this.maxPreMoves - maxl;
        if (this.preMoveLen == 0 || ((0x36fb7 >> lm) & 1) == 0) {
            this.depth1 = this.length1 - this.preMoveLen;
            this.phase1Cubie[0].copy(cc);
            this.allowShorter = this.depth1 == Solver.MIN_P1LENGTH_PRE && this.preMoveLen != 0;
            if (this.nodeUD[this.depth1 + 1].setWithPrun(cc, this.depth1) &&
                this.phase1(this.nodeUD[this.depth1 + 1], this.depth1, -1) == 0) {
                return 0;
            }
        }
        if (maxl == 0 || this.preMoveLen + Solver.MIN_P1LENGTH_PRE >= this.length1) {
            return 1;
        }
        let skipMoves = 0;
        if (maxl == 1 || this.preMoveLen + 1 + Solver.MIN_P1LENGTH_PRE >= this.length1) {
            skipMoves |= 0x36fb7;
        }
        lm = ~~(lm / 3) * 3;
        for (let m = 0; m < 18; m++) {
            if (m == lm || m == lm - 9 || m == lm + 9) {
                m += 2;
                continue;
            }
            if ((skipMoves & (1 << m)) != 0) {
                continue;
            }
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[m], cc, this.preMoveCubes[maxl]);
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[m], cc, this.preMoveCubes[maxl]);
            this.preMoves[this.maxPreMoves - maxl] = m;
            const ret = this.phase1PreMoves(maxl - 1, m, this.preMoveCubes[maxl]);
            if (ret == 0) {
                return 0;
            }
        }
        return 1;
    }
    phase1(node, maxl, lm) {
        if (node.prun == 0 && maxl < 5) {
            if (this.allowShorter || maxl == 0) {
                this.depth1 -= maxl;
                const ret = this.initPhase2Pre();
                this.depth1 += maxl;
                return ret;
            }
            else {
                return 1;
            }
        }
        for (let axis = 0; axis < 18; axis += 3) {
            if (axis == lm || axis == lm - 9) {
                continue;
            }
            for (let power = 0; power < 3; power++) {
                const m = axis + power;
                const prun = this.nodeUD[maxl].doMovePrun(node, m);
                if (prun > maxl) {
                    break;
                }
                else if (prun == maxl) {
                    continue;
                }
                this.move[this.depth1 - maxl] = m;
                this.valid1 = Math.min(this.valid1, this.depth1 - maxl);
                const ret = this.phase1(this.nodeUD[maxl], maxl - 1, axis);
                if (ret == 0) {
                    return 0;
                }
                else if (ret == 2) {
                    break;
                }
            }
        }
        return 1;
    }
    initPhase2Pre() {
        for (let i = this.valid1; i < this.depth1; i++) {
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(this.phase1Cubie[i], _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[this.move[i]], this.phase1Cubie[i + 1]);
            _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(this.phase1Cubie[i], _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[this.move[i]], this.phase1Cubie[i + 1]);
        }
        this.valid1 = this.depth1;
        let ret = this.initPhase2(this.phase1Cubie[this.depth1]);
        if (ret == 0 || this.preMoveLen == 0 || ret == 2) {
            return ret;
        }
        const m = ~~(this.preMoves[this.preMoveLen - 1] / 3) * 3 + 1;
        _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].CornMult(_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[m], this.phase1Cubie[this.depth1], this.phase1Cubie[this.depth1 + 1]);
        _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].EdgeMult(_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].MoveCube[m], this.phase1Cubie[this.depth1], this.phase1Cubie[this.depth1 + 1]);
        this.preMoves[this.preMoveLen - 1] += 2 - (this.preMoves[this.preMoveLen - 1] % 3) * 2;
        ret = this.initPhase2(this.phase1Cubie[this.depth1 + 1]);
        this.preMoves[this.preMoveLen - 1] += 2 - (this.preMoves[this.preMoveLen - 1] % 3) * 2;
        return ret;
    }
    initPhase2(phase2Cubie) {
        let p2corn = phase2Cubie.CPermSym;
        const p2csym = p2corn & 0xf;
        p2corn >>= 4;
        let p2edge = phase2Cubie.EPermSym;
        const p2esym = p2edge & 0xf;
        p2edge >>= 4;
        const p2mid = phase2Cubie.MPerm;
        const p2edgei = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].GetPermSymInv(p2edge, p2esym, false);
        const p2corni = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].GetPermSymInv(p2corn, p2csym, true);
        const prun = Math.max(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].MCPermPrun, p2corn * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_MPERM + _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].MPermConj[p2mid][p2csym]), _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].EPermCCombPPrun, p2edge * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_COMB +
            _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].CCombPConj[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Perm2CombP[p2corn] & 0xff][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[p2esym][p2csym]]), _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].EPermCCombPPrun, (p2edgei >> 4) * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_COMB +
            _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].CCombPConj[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Perm2CombP[p2corni >> 4] & 0xff][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[p2edgei & 0xf][p2corni & 0xf]]));
        const maxDep2 = Math.min(Solver.MAX_DEPTH2, this.sol - this.length1);
        if (prun >= maxDep2) {
            return prun > maxDep2 ? 2 : 1;
        }
        let depth2;
        for (depth2 = maxDep2 - 1; depth2 >= prun; depth2--) {
            const ret = this.phase2(p2edge, p2esym, p2corn, p2csym, p2mid, depth2, this.depth1, 10);
            if (ret < 0) {
                break;
            }
            depth2 -= ret;
            this.moveSol = [];
            for (let i = 0; i < this.depth1 + depth2; i++) {
                this.appendSolMove(this.move[i]);
            }
            for (let i = this.preMoveLen - 1; i >= 0; i--) {
                this.appendSolMove(this.preMoves[i]);
            }
            this.sol = this.moveSol.length;
        }
        if (depth2 != maxDep2 - 1) {
            return 0;
        }
        else {
            return 1;
        }
    }
    appendSolMove(move) {
        if (!this.moveSol) {
            return;
        }
        if (this.moveSol.length == 0) {
            this.moveSol.push(move);
            return;
        }
        const axisCur = ~~(move / 3);
        const axisLast = ~~(this.moveSol[this.moveSol.length - 1] / 3);
        if (axisCur == axisLast) {
            const pow = ((move % 3) + (this.moveSol[this.moveSol.length - 1] % 3) + 1) % 4;
            if (pow == 3) {
                this.moveSol.pop();
            }
            else {
                this.moveSol[this.moveSol.length - 1] = axisCur * 3 + pow;
            }
            return;
        }
        if (this.moveSol.length > 1 &&
            axisCur % 3 == axisLast % 3 &&
            axisCur == ~~(this.moveSol[this.moveSol.length - 2] / 3)) {
            const pow = ((move % 3) + (this.moveSol[this.moveSol.length - 2] % 3) + 1) % 4;
            if (pow == 3) {
                this.moveSol[this.moveSol.length - 2] = this.moveSol[this.moveSol.length - 1];
                this.moveSol.pop();
            }
            else {
                this.moveSol[this.moveSol.length - 2] = axisCur * 3 + pow;
            }
            return;
        }
        this.moveSol.push(move);
    }
    phase2(edge, esym, corn, csym, mid, maxl, depth, lm) {
        if (edge == 0 && corn == 0 && mid == 0) {
            return maxl;
        }
        const moveMask = _Util__WEBPACK_IMPORTED_MODULE_2__["default"].CKMV2BIT[lm];
        for (let m = 0; m < 10; m++) {
            if (((moveMask >> m) & 1) != 0) {
                m += (0x42 >> m) & 3;
                continue;
            }
            const midx = _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].MPermMove[mid][m];
            let cornx = _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].CPermMove[corn][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMoveUD[csym][m]];
            const csymx = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMult[cornx & 0xf][csym];
            cornx >>= 4;
            let edgex = _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].EPermMove[edge][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMoveUD[esym][m]];
            const esymx = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMult[edgex & 0xf][esym];
            edgex >>= 4;
            const edgei = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].GetPermSymInv(edgex, esymx, false);
            const corni = _CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].GetPermSymInv(cornx, csymx, true);
            let prun = _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].EPermCCombPPrun, (edgei >> 4) * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_COMB +
                _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].CCombPConj[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Perm2CombP[corni >> 4] & 0xff][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[edgei & 0xf][corni & 0xf]]);
            if (prun > maxl + 1) {
                break;
            }
            else if (prun >= maxl) {
                m += (0x42 >> m) & 3 & (maxl - prun);
                continue;
            }
            prun = Math.max(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].EPermCCombPPrun, edgex * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_COMB +
                _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].CCombPConj[_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].Perm2CombP[cornx] & 0xff][_CubieCube__WEBPACK_IMPORTED_MODULE_0__["default"].SymMultInv[esymx][csymx]]), _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].GetPruning(_CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].MCPermPrun, cornx * _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].N_MPERM + _CoordCube__WEBPACK_IMPORTED_MODULE_1__["default"].MPermConj[midx][csymx]));
            if (prun >= maxl) {
                m += (0x42 >> m) & 3 & (maxl - prun);
                continue;
            }
            const ret = this.phase2(edgex, esymx, cornx, csymx, midx, maxl - 1, depth + 1, m);
            if (ret >= 0) {
                this.move[depth] = _Util__WEBPACK_IMPORTED_MODULE_2__["default"].UD2STD[m];
                return ret;
            }
        }
        return -1;
    }
}
Solver.MAX_PRE_MOVES = 20;
Solver.TRY_INVERSE = true;
Solver.TRY_THREE_AXES = true;
Solver.MIN_P1LENGTH_PRE = 7;
Solver.MAX_DEPTH2 = 13;


/***/ }),

/***/ "./src/solver/Util.ts":
/*!****************************!*\
  !*** ./src/solver/Util.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    static GetNParity(idx, n) {
        let p = 0;
        for (let i = n - 2; i >= 0; i--) {
            p ^= idx % (n - i);
            idx = ~~(idx / (n - i));
        }
        return p & 1;
    }
    static SetVal(src, dst, edge) {
        return edge ? (dst << 1) | (src & 1) : dst | (src & 0xf8);
    }
    static GetVal(src, edge) {
        return edge ? src >> 1 : src & 7;
    }
    static SetNPerm(arr, idx, n, edge) {
        n--;
        let val = 0x76543210;
        for (let i = 0; i < n; ++i) {
            const p = Util.Fact[n - i];
            let v = ~~(idx / p);
            idx %= p;
            v <<= 2;
            arr[i] = Util.SetVal(arr[i], (val >> v) & 0xf, edge);
            const m = (1 << v) - 1;
            val = (val & m) + ((val >> 4) & ~m);
        }
        arr[n] = Util.SetVal(arr[n], val & 0xf, edge);
    }
    static GetNPerm(arr, n, edge) {
        let idx = 0, val = 0x76543210;
        for (let i = 0; i < n - 1; ++i) {
            const v = Util.GetVal(arr[i], edge) << 2;
            idx = (n - i) * idx + ((val >> v) & 0xf);
            val -= 0x11111110 << v;
        }
        return idx;
    }
    static SetNPermFull(arr, idx, n, edge) {
        arr[n - 1] = Util.SetVal(arr[n - 1], 0, edge);
        for (let i = n - 2; i >= 0; --i) {
            arr[i] = Util.SetVal(arr[i], idx % (n - i), edge);
            idx = ~~(idx / (n - i));
            for (let j = i + 1; j < n; ++j) {
                if (Util.GetVal(arr[j], edge) >= Util.GetVal(arr[i], edge)) {
                    arr[j] = Util.SetVal(arr[j], Util.GetVal(arr[j], edge) + 1, edge);
                }
            }
        }
    }
    static GetNPermFull(arr, n, edge) {
        let idx = 0;
        for (let i = 0; i < n; ++i) {
            idx *= n - i;
            for (let j = i + 1; j < n; ++j) {
                if (Util.GetVal(arr[j], edge) < Util.GetVal(arr[i], edge)) {
                    ++idx;
                }
            }
        }
        return idx;
    }
    static GetComb(arr, mask, edge) {
        const end = arr.length - 1;
        let value = 0, r = 4;
        for (let i = end; i >= 0; i--) {
            const perm = Util.GetVal(arr[i], edge);
            if ((perm & 0xc) == mask) {
                value += Util.Cnk[i][r--];
            }
        }
        return value;
    }
    static SetComb(arr, value, mask, edge) {
        const end = arr.length - 1;
        let r = 4, fill = end;
        for (let i = end; i >= 0; i--) {
            if (value >= Util.Cnk[i][r]) {
                value -= Util.Cnk[i][r--];
                arr[i] = Util.SetVal(arr[i], r | mask, edge);
            }
            else {
                if ((fill & 0xc) == mask) {
                    fill -= 4;
                }
                arr[i] = Util.SetVal(arr[i], fill--, edge);
            }
        }
    }
}
Util.Ux1 = 0;
Util.Ux2 = 1;
Util.Ux3 = 2;
Util.Rx1 = 3;
Util.Rx2 = 4;
Util.Rx3 = 5;
Util.Fx1 = 6;
Util.Fx2 = 7;
Util.Fx3 = 8;
Util.Dx1 = 9;
Util.Dx2 = 10;
Util.Dx3 = 11;
Util.Lx1 = 12;
Util.Lx2 = 13;
Util.Lx3 = 14;
Util.Bx1 = 15;
Util.Bx2 = 16;
Util.Bx3 = 17;
Util.U1 = 0;
Util.U2 = 1;
Util.U3 = 2;
Util.U4 = 3;
Util.U5 = 4;
Util.U6 = 5;
Util.U7 = 6;
Util.U8 = 7;
Util.U9 = 8;
Util.R1 = 9;
Util.R2 = 10;
Util.R3 = 11;
Util.R4 = 12;
Util.R5 = 13;
Util.R6 = 14;
Util.R7 = 15;
Util.R8 = 16;
Util.R9 = 17;
Util.F1 = 18;
Util.F2 = 19;
Util.F3 = 20;
Util.F4 = 21;
Util.F5 = 22;
Util.F6 = 23;
Util.F7 = 24;
Util.F8 = 25;
Util.F9 = 26;
Util.D1 = 27;
Util.D2 = 28;
Util.D3 = 29;
Util.D4 = 30;
Util.D5 = 31;
Util.D6 = 32;
Util.D7 = 33;
Util.D8 = 34;
Util.D9 = 35;
Util.L1 = 36;
Util.L2 = 37;
Util.L3 = 38;
Util.L4 = 39;
Util.L5 = 40;
Util.L6 = 41;
Util.L7 = 42;
Util.L8 = 43;
Util.L9 = 44;
Util.B1 = 45;
Util.B2 = 46;
Util.B3 = 47;
Util.B4 = 48;
Util.B5 = 49;
Util.B6 = 50;
Util.B7 = 51;
Util.B8 = 52;
Util.B9 = 53;
Util.U = 0;
Util.R = 1;
Util.F = 2;
Util.D = 3;
Util.L = 4;
Util.B = 5;
Util.CornerFacelet = [
    [Util.U9, Util.R1, Util.F3],
    [Util.U7, Util.F1, Util.L3],
    [Util.U1, Util.L1, Util.B3],
    [Util.U3, Util.B1, Util.R3],
    [Util.D3, Util.F9, Util.R7],
    [Util.D1, Util.L9, Util.F7],
    [Util.D7, Util.B9, Util.L7],
    [Util.D9, Util.R9, Util.B7],
];
Util.EdgeFacelet = [
    [Util.U6, Util.R2],
    [Util.U8, Util.F2],
    [Util.U4, Util.L2],
    [Util.U2, Util.B2],
    [Util.D6, Util.R8],
    [Util.D2, Util.F8],
    [Util.D4, Util.L8],
    [Util.D8, Util.B8],
    [Util.F6, Util.R4],
    [Util.F4, Util.L6],
    [Util.B6, Util.L4],
    [Util.B4, Util.R6],
];
Util.MOVE2STR = [
    "U ",
    "U2",
    "U'",
    "R ",
    "R2",
    "R'",
    "F ",
    "F2",
    "F'",
    "D ",
    "D2",
    "D'",
    "L ",
    "L2",
    "L'",
    "B ",
    "B2",
    "B'",
];
Util.UD2STD = [
    Util.Ux1,
    Util.Ux2,
    Util.Ux3,
    Util.Rx2,
    Util.Fx2,
    Util.Dx1,
    Util.Dx2,
    Util.Dx3,
    Util.Lx2,
    Util.Bx2,
    Util.Rx1,
    Util.Rx3,
    Util.Fx1,
    Util.Fx3,
    Util.Lx1,
    Util.Lx3,
    Util.Bx1,
    Util.Bx3,
];
Util.STD2UD = (() => {
    const result = [];
    for (let i = 0; i < 18; i++) {
        result[Util.UD2STD[i]] = i;
    }
    return result;
})();
Util.CKMV2BIT = (() => {
    const result = [];
    for (let i = 0; i < 10; i++) {
        const ix = ~~(Util.UD2STD[i] / 3);
        result[i] = 0;
        for (let j = 0; j < 10; j++) {
            const jx = ~~(Util.UD2STD[j] / 3);
            result[i] |= (ix == jx || (ix % 3 == jx % 3 && ix >= jx) ? 1 : 0) << j;
        }
    }
    result[10] = 0;
    return result;
})();
Util.Cnk = (() => {
    const ret = [];
    const fact = [1];
    for (let i = 0; i < 13; i++) {
        ret[i] = [];
        fact[i + 1] = fact[i] * (i + 1);
        ret[i][0] = ret[i][i] = 1;
        for (let j = 1; j < 13; j++) {
            ret[i][j] = j <= i ? ret[i - 1][j - 1] + ret[i - 1][j] : 0;
        }
    }
    return ret;
})();
Util.Fact = (() => {
    const ret = [1];
    for (let i = 0; i < 13; i++) {
        ret[i + 1] = ret[i] * (i + 1);
    }
    return ret;
})();


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
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewport */ "./src/vueapp/viewport/index.ts");
/* harmony import */ var _cube_world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cube/world */ "./src/cube/world.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting */ "./src/vueapp/setting/index.ts");
/* harmony import */ var _solver_Solver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../solver/Solver */ "./src/solver/Solver.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let Playground = class Playground extends vue__WEBPACK_IMPORTED_MODULE_5__["default"] {
    constructor() {
        super();
        this.world = new _cube_world__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.width = 0;
        this.height = 0;
        this.size = 0;
        this.isPlayerMode = false;
        this.isPlaying = false;
        this.solver = new _solver_Solver__WEBPACK_IMPORTED_MODULE_4__["default"]();
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
        this.viewport.resize(this.width, this.height - this.size * 2.5);
        this.world.cube.dirty = true;
    }
    scramble() {
        this.reset();
        this.world.cube.scramble();
    }
    reset() {
        this.world.cube.reset();
    }
    solve() {
        this.isPlayerMode = true;
        const state = this.world.cube.serialize();
        this.solution = this.solver.solve(state).split(' ').filter(Boolean);
        this._progress = 0;
    }
    onPlayingChange() {
        this.world.controller.disable = this.isPlayerMode;
    }
    play() {
    }
    pause() {
    }
    quit() {
        this.isPlayerMode = false;
    }
    set progress(value) {
        this._progress = value;
    }
    get progress() {
        return this._progress;
    }
    thumb_label_slot() {
        return this._progress == 0 ? '#' : this.solution[this._progress - 1];
    }
};
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Provide)("world"),
    __metadata("design:type", Object)
], Playground.prototype, "world", void 0);
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("viewport"),
    __metadata("design:type", _viewport__WEBPACK_IMPORTED_MODULE_1__["default"])
], Playground.prototype, "viewport", void 0);
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Watch)("isPlayerMode"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Playground.prototype, "onPlayingChange", null);
Playground = __decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/playground/index.html"),
        components: {
            viewport: _viewport__WEBPACK_IMPORTED_MODULE_1__["default"],
            setting: _setting__WEBPACK_IMPORTED_MODULE_3__["default"],
        },
    }),
    __metadata("design:paramtypes", [])
], Playground);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playground);


/***/ }),

/***/ "./src/vueapp/setting/index.ts":
/*!*************************************!*\
  !*** ./src/vueapp/setting/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _cube_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/utils */ "./src/cube/utils.ts");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-slider-component */ "./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slider-component/theme/default.css */ "./node_modules/vue-slider-component/theme/default.css");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let Setting = class Setting extends vue__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.size = 0;
        this.state = false;
    }
    mounted() {
        this.resize();
    }
    resize() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
    }
    get sensibility() {
        return _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.sensibility * 1e4;
    }
    set sensibility(value) {
        _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.sensibility = value * 1e-4;
    }
    get frames() {
        return _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.frames;
    }
    set frames(value) {
        _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.frames = value;
    }
    get scramble_steps() {
        return _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.scramble_steps;
    }
    set scramble_steps(value) {
        _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.scramble_steps = value;
    }
};
Setting = __decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/setting/index.html"),
        components: {
            VueSlider: (vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default())
        }
    }),
    __metadata("design:paramtypes", [])
], Setting);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Setting);


/***/ }),

/***/ "./src/vueapp/viewport/index.ts":
/*!**************************************!*\
  !*** ./src/vueapp/viewport/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cube_interactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/interactor */ "./src/cube/interactor.ts");
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
        this.interactor = new _cube_interactor__WEBPACK_IMPORTED_MODULE_1__["default"](canvasElem, this.world.controller.interact);
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
    __metadata("design:type", _cube_world__WEBPACK_IMPORTED_MODULE_2__["default"])
], Viewport.prototype, "world", void 0);
__decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("canvas"),
    __metadata("design:type", HTMLElement)
], Viewport.prototype, "canvas", void 0);
Viewport = __decorate([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/viewport/index.html"),
        components: {},
    }),
    __metadata("design:paramtypes", [])
], Viewport);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewport);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9zZXR0aW5nL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvdmlld3BvcnQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZS50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZWxldC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2ludGVyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvd29ybGQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3NvbHZlci9Db29yZEN1YmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9zb2x2ZXIvQ3ViaWVDdWJlLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvc29sdmVyL1NvbHZlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3NvbHZlci9VdGlsLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvc2V0dGluZy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC92aWV3cG9ydC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjx2LWFwcD5cXG4gICAgPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIiBzdHlsZT1cXFwidXNlci1zZWxlY3Q6IG5vbmU7IHRvdWNoLWFjdGlvbjogbm9uZTtcXFwiPlxcbiAgICAgICAgPHNldHRpbmcgcmVmPVxcXCJzZXR0aW5nXFxcIj48L3NldHRpbmc+XFxuICAgICAgICA8dmlld3BvcnQgcmVmPVxcXCJ2aWV3cG9ydFxcXCI+PC92aWV3cG9ydD5cXG4gICAgICAgIDx2LWNhcmQgZmxhdCBzdHlsZT1cXFwibWFyZ2luOiBhdXRvOyB0b3VjaC1hY3Rpb246IG5vbmU7IHVzZXItc2VsZWN0OiBub25lO1xcXCI+XFxuICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkIGdyaWQtbGlzdC1tZCB0ZXh0LXhzLWNlbnRlclxcbiAgICAgICAgICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogTWF0aC5taW4oc2l6ZSAqIDEwLCB3aWR0aCkgKyAncHgnLCBoZWlnaHQ6IHNpemUgKiA0ICsgJ3B4J31cXFwiPlxcblxcbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cXFwiIWlzUGxheWVyTW9kZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOnNpemUgKyAncHgnXFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInNjcmFtYmxlXFxcIiBibG9jayB0ZXh0IDpyaXBwbGU9XFxcImZhbHNlXFxcIiBjb2xvcj1cXFwiZ3JlZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2NyYW1ibGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czQgOnN0eWxlPVxcXCJ7cGFkZGluZzogc2l6ZSAqIDAuMDYgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIEBjbGljaz1cXFwicmVzZXRcXFwiIGJsb2NrIHRleHQgOnJpcHBsZT1cXFwiZmFsc2VcXFwiIGNvbG9yPVxcXCJibHVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWluLXdpZHRoOiAwJTsgbWluLWhlaWdodDogMCU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOmhlaWdodD1cXFwic2l6ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKydweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2V0XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInNvbHZlXFxcIiBibG9jayB0ZXh0IDpyaXBwbGU9XFxcImZhbHNlXFxcIiBjb2xvcj1cXFwicmVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWluLXdpZHRoOiAwJTsgbWluLWhlaWdodDogMCU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOmhlaWdodD1cXFwic2l6ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKydweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvbHZlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtZWxzZT5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogKHNpemUgKiAwLjMpICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6IHNpemUgKyAncHgnXFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtc2xpZGVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInByb2dyZXNzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bWF4PVxcXCJzb2x1dGlvbi5sZW5ndGhcXFwiIFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGljay1zaXplPVxcXCIzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYi1sYWJlbD1cXFwiYWx3YXlzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrcz1cXFwiYWx3YXlzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlLWRldGFpbHNcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6dGh1bWItbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0aHVtYl9sYWJlbF9zbG90KCkgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Ytc2xpZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJwbGF5XFxcIiBibG9jayB0ZXh0IDpyaXBwbGU9XFxcImZhbHNlXFxcIiBjb2xvcj1cXFwiZ3JlZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxheVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJwYXVzZVxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcImJsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGF1c2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czQgOnN0eWxlPVxcXCJ7cGFkZGluZzogc2l6ZSAqIDAuMDYgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIEBjbGljaz1cXFwicXVpdFxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcInJlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBRdWl0XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgPC92LWNhcmQ+XFxuICAgIDwvZGl2Plxcbjwvdi1hcHA+XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIj5cXG4gICAgPHYtYnRuIGZpeGVkIHJpZ2h0IHRvcCBmYWIgY29sb3I9XFxcInByaW1hcnlcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTtcXFwiXFxuICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogc2l6ZSAqIDAuOSArICdweCcsIGhlaWdodDogc2l6ZSAqIDAuOSArICdweCcsICdtYXJnaW4tcmlnaHQnOiB3aWR0aCAvIDIgLSBNYXRoLm1pbihzaXplICogNSwgd2lkdGggLyAyKSArICdweCd9XFxcIlxcbiAgICAgICAgQGNsaWNrPVxcXCJzdGF0ZSA9ICFzdGF0ZVxcXCI+XFxuICAgICAgICA8di1pY29uIDpzaXplPVxcXCJzaXplICogMC42XFxcIj5cXG4gICAgICAgICAgICBzZXR0aW5nc1xcbiAgICAgICAgPC92LWljb24+XFxuICAgIDwvdi1idG4+XFxuICAgIDx2LWJvdHRvbS1zaGVldCB2LW1vZGVsPVxcXCJzdGF0ZVxcXCI+XFxuICAgICAgICA8di1jYXJkIHRleHQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bztcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXIgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiA4LCB3aWR0aCkgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNDUkFNQkxFIExFTkdUSFxcbiAgICAgICAgICAgICAgICA8L3Ytc3ViaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAoc2l6ZSAqIDAuMykgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dnVlLXNsaWRlciB2LW1vZGVsPVxcXCJzY3JhbWJsZV9zdGVwc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNDBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTAsMjAsMzAsNDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBGUkFNRVMgUEVSIFRXSVNUXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcImZyYW1lc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNjBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTUsMzAsNDUsNjBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBTRU5TSVRJVklUWVxcbiAgICAgICAgICAgICAgICA8L3Ytc3ViaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAoc2l6ZSAqIDAuMykgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dnVlLXNsaWRlciB2LW1vZGVsPVxcXCJzZW5zaWJpbGl0eVxcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiMTAwXFxcIiA6bWluPVxcXCIwXFxcIiA6bWFya3M9XFxcIlswLDI1LDUwLDc1LDEwMF1cXFwiPjwvdnVlLXNsaWRlcj5cXG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cXG4gICAgICAgIDwvdi1jYXJkPlxcbiAgICA8L3YtYm90dG9tLXNoZWV0PlxcbjwvZGl2PlwiIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgcmVmPVxcXCJjYW52YXNcXFwiPjwvZGl2PlwiIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyB0d2lzdGVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuaW1wb3J0IHsgYXhpc19wbGFuZXMsIGF4aXNfdmVjdG9ycywgY3ViZV9jb25maWcsIGN1YmVfc2l6ZSwgaW5kZXhUb0xheWVyLCB3b3JsZFRvSW5kZXggfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgQm94MywgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuZXhwb3J0IGNsYXNzIEhvbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmF4aXMgPSBcIlwiO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHdvcmxkKSB7XG4gICAgICAgIHRoaXMuaW50ZXJhY3QgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bl90aWNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRG93bigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vtb3ZlXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUueCA9IGFjdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUueSA9IGFjdGlvbi55O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoZW5kXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNldXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2VvdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXhpcyA9IFwiXCI7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuZG93biA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLm1vdmUgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcbiAgICAgICAgdGhpcy5kb3duX3RpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgSG9sZGVyKCk7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgc2V0IGxvY2sodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9sb2NrID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jaztcbiAgICB9XG4gICAgc2V0IGRpc2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkaXNhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMuY29udGluZ2xlICsgdGhpcy5hbmdsZTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXAuYW5nbGUgIT0gYW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSB0aGlzLmdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSBncm91cC5hbmdsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2goKSB7XG4gICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgIGNvbnN0IGZpbmdlciA9IHRoaXMuaG9sZGVyLnZlY3RvcjtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmhvbGRlci5pbmRleDtcbiAgICAgICAgY29uc3QgaWxheWVyID0gaW5kZXhUb0xheWVyKGluZGV4KTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgdmVjdG9yID0gYXhpc192ZWN0b3JzW2F4aXNdO1xuICAgICAgICAgICAgaWYgKHZlY3Rvci5kb3QocGxhbmUubm9ybWFsKSA9PT0gMCAmJiB2ZWN0b3IuZG90KGZpbmdlcikgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1theGlzXVtpbGF5ZXJbYXhpc11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpbnRlcnNlY3QocG9pbnQsIHBsYW5lKSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIGNvbnN0IHJheSA9IG5ldyBUSFJFRS5SYXkoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgY29uc3QgeCA9IChwb2ludC54IC8gdGhpcy53b3JsZC53aWR0aCkgKiAyIC0gMTtcbiAgICAgICAgY29uc3QgeSA9IC0ocG9pbnQueSAvIHRoaXMud29ybGQuaGVpZ2h0KSAqIDIgKyAxO1xuICAgICAgICBtYXRyaXguY29weSh0aGlzLndvcmxkLnNjZW5lLm1hdHJpeCk7XG4gICAgICAgIG1hdHJpeC5pbnZlcnQoKTtcbiAgICAgICAgcmF5Lm9yaWdpbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy53b3JsZC5jYW1lcmEubWF0cml4V29ybGQpO1xuICAgICAgICByYXkuZGlyZWN0aW9uLnNldCh4LCB5LCAwLjUpLnVucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSkuc3ViKHJheS5vcmlnaW4pLm5vcm1hbGl6ZSgpO1xuICAgICAgICByYXkuYXBwbHlNYXRyaXg0KG1hdHJpeCk7XG4gICAgICAgIHJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFuZGxlRG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nIHx8IHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbYXhpc107XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgaWYgKHBvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZV9tYXJnaW4gPSBjdWJlX3NpemUgLyAyICsgMC4wMDE7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94TWluID0gbmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoLWN1YmVfbWFyZ2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3hNYXggPSBuZXcgVmVjdG9yMygpLnNldFNjYWxhcihjdWJlX21hcmdpbik7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gbmV3IEJveDMoYm94TWluLCBib3hNYXgpO1xuICAgICAgICAgICAgICAgIGlmIChib3guY29udGFpbnNQb2ludChwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IFZlY3RvcjMoKS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy53b3JsZC5jYW1lcmEubWF0cml4V29ybGQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZGlzdGFuY2VUbyhvcmlnaW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IG1pbl9kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5fZGlzdCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci5heGlzID0gYXhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0gd29ybGRUb0luZGV4KHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVNb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gdGhpcy5tb3ZlLnggLSB0aGlzLmRvd24ueDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgaWYgKE1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KSAvIGQgPiAxMjgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRlci5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgdGhpcy53b3JsZC53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ6XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGluZ2xlX3NldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdGVyLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW5nbGVfc2V0LmFkZChncm91cC5hbmdsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250aW5nbGVfc2V0LnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGNvbnRpbmdsZV9zZXQudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgdmVjdG9yLm1heChuZXcgVmVjdG9yMygpLnN1Yih2ZWN0b3IpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtID0gTWF0aC5tYXgodmVjdG9yLngsIHZlY3Rvci55LCB2ZWN0b3Iueik7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLmNvcHkobm9ybSA9PSB2ZWN0b3IueCA/IG5ldyBWZWN0b3IzKDEsIDAsIDApIDogKG5vcm0gPT0gdmVjdG9yLnkgPyBuZXcgVmVjdG9yMygwLCAxLCAwKSA6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IHRoaXMubWF0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdGhpcy5ncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB0aGlzLmdyb3VwLmFuZ2xlO1xuICAgICAgICAgICAgICAgIHZlY3Rvci5jcm9zc1ZlY3RvcnModGhpcy5ob2xkZXIudmVjdG9yLCBwbGFuZS5ub3JtYWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnZlY3Rvci5tdWx0aXBseVNjYWxhcih2ZWN0b3IueCArIHZlY3Rvci55ICsgdmVjdG9yLnopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgdmVjdG9yLm11bHRpcGx5KHRoaXMuaG9sZGVyLnZlY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9XG4gICAgICAgICAgICAgICAgICAgICh2ZWN0b3IueCArIHZlY3Rvci55ICsgdmVjdG9yLnopICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVfY29uZmlnLnNlbnNpYmlsaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gY3ViZV9jb25maWcuc2Vuc2liaWxpdHkgKiAodGhpcy5heGlzID09IFwieVwiID8gLWR4IDpcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYXhpcyA9PSBcInhcIiA/IC1keSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAoZHkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpIDwgTWF0aC5QSSAvIDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAoTWF0aC5hYnMoYW5nbGUpIC8gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5kb3duX3RpY2spKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGVlZCA+IDAuMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSA9PSAwID8gMCA6ICgoYW5nbGUgLyBNYXRoLmFicyhhbmdsZSkpICogKE1hdGguUEkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY29udGluZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IEN1YmVsZXQgZnJvbSBcIi4vY3ViZWxldFwiO1xuaW1wb3J0IHsgR3JvdXBUYWJsZSB9IGZyb20gXCIuL2dyb3VwXCI7XG5pbXBvcnQgeyB0d2lzdGVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuaW1wb3J0IHsgY3ViZV9jb25maWcgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2NrcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwieVwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInpcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2NrLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9jayhheGlzLCBsYXllcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoX2EgPSB0aGlzLmxvY2tzLmdldChcImFcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYXMoMSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBheGlzX2xvY2tzZXQgPSB0aGlzLmxvY2tzLmdldChheGlzKTtcbiAgICAgICAgaWYgKGF4aXNfbG9ja3NldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsb2Nrc2V0IG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2Nrc2V0ICE9IGF4aXNfbG9ja3NldCAmJiBsb2Nrc2V0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF4aXNfbG9ja3NldC5hZGQobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdW5sb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBheGlzX2xvY2tzZXQgPT09IG51bGwgfHwgYXhpc19sb2Nrc2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBheGlzX2xvY2tzZXQuZGVsZXRlKGxheWVyKTtcbiAgICB9XG4gICAgcmFuZG9tMygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpLCAwKSwgMik7XG4gICAgfVxuICAgIHNjcmFtYmxlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1YmVfY29uZmlnLnNjcmFtYmxlX3N0ZXBzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF4aXMgPSBbXCJ4XCIsIFwieVwiLCBcInpcIl1bdGhpcy5yYW5kb20zKCldO1xuICAgICAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLnJhbmRvbTMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKHRoaXMucmFuZG9tMygpIC0gMSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgdGhpcy50YWJsZS5ncm91cHNbYXhpc11bbGV2ZWxdLnR3aXN0KGFuZ2xlID09PSAwID8gTWF0aC5QSSA6IGFuZ2xlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgZm9yIChjb25zdCBjdWJlbGV0IG9mIHRoaXMuY3ViZWxldHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZWxldHMuc3BsaWNlKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSBuZXcgQ3ViZWxldChpKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZWxldHMucHVzaChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgIHkgPSAyO1xuICAgICAgICBmb3IgKHogPSAwOyB6IDwgMzsgeisrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuVSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHggPSAyO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gMjsgeiA+PSAwOyB6LS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5SKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDI7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuRik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHkgPSAwO1xuICAgICAgICBmb3IgKHogPSAyOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gMDtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDA7IHogPCAzOyB6KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5MKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDA7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAyOyB4ID49IDA7IHgtLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3ViZWxldF9kZWZzLCBjdWJlbGV0X2NvcmUsIGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9mYWNlX2F0dHJzLCBkaXJlY3Rpb25Ub0luZGV4LCBmYWNlUG9zdGlvbkJpbmRpbmdzLCBjdWJlbGV0X2xhbWJlcnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBpbmRleFRvRGlyZWN0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVsZXQgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBjb25zdCBkcmN0biA9IGluZGV4VG9EaXJlY3Rpb24oaW5kZXgpO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKGRyY3RuLngsIGRyY3RuLnksIGRyY3RuLnopO1xuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9mcmFtZSwgY3ViZWxldF9jb3JlKTtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5mcmFtZSk7XG4gICAgICAgIHRoaXMubGFtYmVydHMgPSBuZXcgQXJyYXkoNik7XG4gICAgICAgIHRoaXMuc3RpY2tlcnMgPSBuZXcgQXJyYXkoNik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbaV07XG4gICAgICAgICAgICBpZiAoZmFjZV9hdHRyLm1hdGNoKHRoaXMudmVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFtYmVydHNbaV0gPSBmYWNlX2F0dHIubGFtYmVydDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCB0aGlzLmxhbWJlcnRzW2ldKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja2Vyc1tpXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XG4gICAgICAgIHRoaXMuX3ZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gICAgICAgIHRoaXMuaW5kZXggPSBkaXJlY3Rpb25Ub0luZGV4KHZlY3Rvcik7XG4gICAgICAgIHRoaXMucG9zaXRpb24uY29weSh2ZWN0b3IpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKGN1YmVsZXRfZGVmcy5zaXplKTtcbiAgICB9XG4gICAgZ2V0IHZlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY3RvcjtcbiAgICB9XG4gICAgY29udmVydEZhY2UoZmFjZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBxdWF0ZXJuaW9uID0gbmV3IFF1YXRlcm5pb24oKS5jb3B5KHRoaXMucXVhdGVybmlvbik7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZyBvZiBmYWNlUG9zdGlvbkJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5mYWNlID09PSBmYWNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24uY29weShiaW5kaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbi5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbi5pbnZlcnQoKSk7XG4gICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKE1hdGgucm91bmQocG9zaXRpb24ueCksIE1hdGgucm91bmQocG9zaXRpb24ueSksIE1hdGgucm91bmQocG9zaXRpb24ueikpO1xuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmcgb2YgZmFjZVBvc3Rpb25CaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcucG9zaXRpb24uZXF1YWxzKHZlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5mYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZ2V0Q29sb3JPZihmYWNlKSB7XG4gICAgICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLnN0aWNrZXJzW3RoaXMuY29udmVydEZhY2UoZmFjZSldO1xuICAgICAgICBzd2l0Y2ggKHN0aWNrZXIubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTFwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5GOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkZcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuVTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5EOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCI/XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBUd2lzdCwgdHdpc3RlciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IGF4aXNfdmVjdG9ycywgY3ViZV9jb25maWcsIGluZGV4VG9MYXllciB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlR3JvdXAgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoY3ViZSwgYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdWJlID0gY3ViZTtcbiAgICAgICAgdGhpcy5heGlzID0gYXhpcztcbiAgICAgICAgdGhpcy5sYXllciA9IGxheWVyO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGlsYXllciA9IGluZGV4VG9MYXllcihpKTtcbiAgICAgICAgICAgIGlmIChheGlzID09IFwieFwiICYmIGlsYXllci54ID09IGxheWVyXG4gICAgICAgICAgICAgICAgfHwgYXhpcyA9PSBcInlcIiAmJiBpbGF5ZXIueSA9PSBsYXllclxuICAgICAgICAgICAgICAgIHx8IGF4aXMgPT0gXCJ6XCIgJiYgaWxheWVyLnogPT0gbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgc2V0IGFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRoaXMuc2V0Um90YXRpb25Gcm9tQXhpc0FuZ2xlKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCBhbmdsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ2xlO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbDtcbiAgICAgICAgICAgIHR3aXN0ZXIuY2FuY2VsKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbCAtIHRoaXMuYW5nbGU7XG4gICAgICAgICAgICB0d2lzdGVyLmZpbmlzaCh0aGlzLnR3aXN0aW5nKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGhvbGQoKSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmN1YmUubG9jayh0aGlzLmF4aXMsIHRoaXMubGF5ZXIpO1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvbGRpbmcgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5pbmRpY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlLmN1YmVsZXRzW2ldO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5hZGQodGhpcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkcmFnKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gLXRoaXMuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaG9sZCgpO1xuICAgIH1cbiAgICBkcm9wKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gY3ViZWxldCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5hZGQoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUuY3ViZWxldHNbY3ViZWxldC5pbmRleF0gPSBjdWJlbGV0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmN1YmUudW5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xuICAgIH1cbiAgICB0d2lzdChhbmdsZSwgZmFzdCkge1xuICAgICAgICBpZiAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmhvbGQoKTtcbiAgICAgICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGFuZ2xlID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpICogKE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGZhc3QpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSA8IDFlLTYpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnJhYyA9IE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgLyAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjdWJlX2NvbmZpZy5mcmFtZXMgKiAoMiAtIDIgLyAoZnJhYyArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSBuZXcgVHdpc3QodGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0d2lzdGVyLnR3aXN0cy5wdXNoKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdyb3VwVGFibGUge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1theGlzXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb20sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudG91Y2ggPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihcInRvdWNoZW5kXCIsIHRoaXMubGFzdC5jbGllbnRYIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGZpcnN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0aGlzLmRvbSB8fCAoKF9hID0gdGhpcy5sYXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWRlbnRpZmllcikgIT0gZmlyc3QuaWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnRhYkluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZmlyc3QuY2xpZW50WCAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIGZpcnN0LmNsaWVudFkgLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoZW5kXCIgfHwgZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGNhbmNlbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW91c2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZG93blwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQgIT09IHRoaXMuZG9tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVHdpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGRlcGF0dXJlLCBhcnJpdmFsLCBkdXJhdGlvbiwgY2FsbGJhY2tfZnVuYykge1xuICAgICAgICB0aGlzLmRlcGFydHVyZSA9IGRlcGF0dXJlO1xuICAgICAgICB0aGlzLmFycml2YWwgPSBhcnJpdmFsO1xuICAgICAgICB0aGlzLmR1cmFudGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLmNhbGxiYWNrX2Z1bmMgPSBjYWxsYmFja19mdW5jO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZHVyYW50aW9uO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmFycml2YWw7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmVsYXBzZWQrKztcbiAgICAgICAgY29uc3QgZnJhYyA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuZWxhcHNlZCAvIHRoaXMuZHVyYW50aW9uLCAwKSwgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGZyYWMgPT0gMSA/IHRoaXMuYXJyaXZhbCA6ICh0aGlzLmRlcGFydHVyZSArICh0aGlzLmFycml2YWwgLSB0aGlzLmRlcGFydHVyZSkgKiAoMSAtICgxIC0gZnJhYykgKiAoMSAtIGZyYWMpKSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFja19mdW5jKHRoaXMuY3VycmVudCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3aXN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR3aXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgY3VyID0gMDtcbiAgICAgICAgbGV0IGVuZCA9IHRoaXMudHdpc3RzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGN1ciA8IGVuZCkge1xuICAgICAgICAgICAgdGhpcy50d2lzdHNbY3VyXS51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3aXN0c1tjdXJdLmNhbGxiYWNrKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3aXN0cy5zcGxpY2UoY3VyLCAxKTtcbiAgICAgICAgICAgICAgICBlbmQtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmlzaCh0d2lzdCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHdpc3QpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50d2lzdHNbaV0gPT0gdHdpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdpc3QuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHdpc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdHdpc3RzID0gdGhpcy50d2lzdHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0d2lzdCBvZiB0d2lzdHMpIHtcbiAgICAgICAgICAgICAgICB0d2lzdC5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5jZWwodHdpc3QpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR3aXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudHdpc3RzW2ldID09IHR3aXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2lzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHR3aXN0ZXIgPSBuZXcgVHdpc3RlcigpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBGYWNlLCBGcmFtZSwgU3RpY2tlciB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgY29uc3QgY3ViZV9jb25maWcgPSB7XG4gICAgZnJhbWVzOiAzMCxcbiAgICBzZW5zaWJpbGl0eTogMjAgKiAxZS00LFxuICAgIHNjcmFtYmxlX3N0ZXBzOiAyMCxcbn07XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb2xvcnMgPSB7XG4gICAgUjogXCIjQjcxQzFDXCIsXG4gICAgTDogXCIjRkY2RDAwXCIsXG4gICAgVTogXCIjRjBGMEYwXCIsXG4gICAgRDogXCIjRkZENjAwXCIsXG4gICAgRjogXCIjMDBBMDIwXCIsXG4gICAgQjogXCIjMEQ0N0ExXCIsXG4gICAgY29yZTogXCIjMjAyMDIwXCIsXG4gICAgZ3JheTogXCIjODA4MDgwXCIsXG4gICAgaGlnaDogXCIjRkYwMDgwXCIsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZGVmcyA9IHtcbiAgICBzaXplOiA2NCxcbiAgICBfYm9yZGVyX3dpZHRoOiAzLFxuICAgIF9lZGdlX3dpZHRoOiAyLFxuICAgIF9zdGlja2VyX2RlcHRoOiAwLjEsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZnJhbWUgPSBuZXcgRnJhbWUoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2xhbWJlcnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGN1YmVsZXRfY29sb3JzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY3ViZWxldF9jb2xvcnNba2V5XSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0pKCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb3JlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICBjb2xvcjogY3ViZWxldF9jb2xvcnMuY29yZSxcbiAgICBzcGVjdWxhcjogY3ViZWxldF9jb2xvcnMuZ3JheSxcbiAgICBzaGluaW5lc3M6IDIsXG59KTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X3N0aWNrZXIgPSBuZXcgU3RpY2tlcihjdWJlbGV0X2RlZnMuc2l6ZSAtIDIgKiBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCAtIGN1YmVsZXRfZGVmcy5fZWRnZV93aWR0aCwgY3ViZWxldF9kZWZzLl9zdGlja2VyX2RlcHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZhY2VfYXR0cnMgPSBbXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygwLCAtTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyhjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5ELFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJIC8gMiwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueSA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuVSxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygtTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnogPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5CLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgY3ViZWxldF9kZWZzLnNpemUgLyAyKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDIgKiBNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBjdWJlX3NpemUgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG5leHBvcnQgY29uc3QgYXhpc192ZWN0b3JzID0ge1xuICAgIGE6IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLFxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcbiAgICB5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksXG4gICAgejogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxufTtcbmV4cG9ydCBjb25zdCBheGlzX3BsYW5lcyA9IHtcbiAgICB4OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB5OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB6OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIC1jdWJlX3NpemUgLyAyKVxufTtcbmV4cG9ydCBjb25zdCBpbmRleFRvRGlyZWN0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGluZGV4ICUgMyAtIDEsIE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMgLSAxLCBNYXRoLmZsb29yKGluZGV4IC8gOSkgLSAxKTtcbn07XG5leHBvcnQgY29uc3QgZGlyZWN0aW9uVG9JbmRleCA9IChkcmN0bikgPT4ge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKChkcmN0bi54ICsgMSkgKyAoZHJjdG4ueSArIDEpICogMyArIChkcmN0bi56ICsgMSkgKiA5KTtcbn07XG5leHBvcnQgY29uc3QgaW5kZXhUb0xheWVyID0gKGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0geyB4OiBpbmRleCAlIDMsIHk6IE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMsIHo6IE1hdGguZmxvb3IoaW5kZXggLyA5KSB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGNvbnN0IHdvcmxkVG9JbmRleCA9IChwb2ludCkgPT4ge1xuICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuY29weShwb2ludCk7XG4gICAgdmVjdG9yLmFkZChuZXcgVmVjdG9yMygpLnNldFNjYWxhcihjdWJlX3NpemUgLyAyKSk7XG4gICAgdmVjdG9yLmRpdmlkZVNjYWxhcihjdWJlX3NpemUpLm11bHRpcGx5U2NhbGFyKDMpLmZsb29yKCk7XG4gICAgdmVjdG9yLm1heChuZXcgVmVjdG9yMygpLnNldFNjYWxhcigwKSk7XG4gICAgdmVjdG9yLm1pbihuZXcgVmVjdG9yMygpLnNldFNjYWxhcigyKSk7XG4gICAgcmV0dXJuIHZlY3Rvci54ICsgdmVjdG9yLnkgKiAzICsgdmVjdG9yLnogKiA5O1xufTtcbmV4cG9ydCBjb25zdCBmYWNlUG9zdGlvbkJpbmRpbmdzID0gW1xuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuUixcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuRCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLlUsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLkIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSlcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSlcbiAgICB9LFxuXTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuZXhwb3J0IHZhciBGYWNlO1xuKGZ1bmN0aW9uIChGYWNlKSB7XG4gICAgRmFjZVtGYWNlW1wiTFwiXSA9IDBdID0gXCJMXCI7XG4gICAgRmFjZVtGYWNlW1wiUlwiXSA9IDFdID0gXCJSXCI7XG4gICAgRmFjZVtGYWNlW1wiRFwiXSA9IDJdID0gXCJEXCI7XG4gICAgRmFjZVtGYWNlW1wiVVwiXSA9IDNdID0gXCJVXCI7XG4gICAgRmFjZVtGYWNlW1wiQlwiXSA9IDRdID0gXCJCXCI7XG4gICAgRmFjZVtGYWNlW1wiRlwiXSA9IDVdID0gXCJGXCI7XG59KShGYWNlIHx8IChGYWNlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBGcmFtZSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBib3JkZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3QgbyA9IHNpemUgLyAyO1xuICAgICAgICBjb25zdCBpID0gbyAtIGJvcmRlcjtcbiAgICAgICAgY29uc3QgX3ZlcnRzID0gW1xuICAgICAgICAgICAgLWksICtpLCArbyxcbiAgICAgICAgICAgICtpLCAraSwgK28sXG4gICAgICAgICAgICAraSwgLWksICtvLFxuICAgICAgICAgICAgLWksIC1pLCArbyxcbiAgICAgICAgICAgIC1pLCArbywgLWksXG4gICAgICAgICAgICAraSwgK28sIC1pLFxuICAgICAgICAgICAgK2ksICtvLCAraSxcbiAgICAgICAgICAgIC1pLCArbywgK2ksXG4gICAgICAgICAgICAtbywgLWksIC1pLFxuICAgICAgICAgICAgLW8sICtpLCAtaSxcbiAgICAgICAgICAgIC1vLCAraSwgK2ksXG4gICAgICAgICAgICAtbywgLWksICtpLFxuICAgICAgICAgICAgK2ksICtpLCAtbyxcbiAgICAgICAgICAgIC1pLCAraSwgLW8sXG4gICAgICAgICAgICAtaSwgLWksIC1vLFxuICAgICAgICAgICAgK2ksIC1pLCAtbyxcbiAgICAgICAgICAgIC1pLCAtbywgK2ksXG4gICAgICAgICAgICAraSwgLW8sICtpLFxuICAgICAgICAgICAgK2ksIC1vLCAtaSxcbiAgICAgICAgICAgIC1pLCAtbywgLWksXG4gICAgICAgICAgICArbywgK2ksICtpLFxuICAgICAgICAgICAgK28sICtpLCAtaSxcbiAgICAgICAgICAgICtvLCAtaSwgLWksXG4gICAgICAgICAgICArbywgLWksICtpLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKF92ZXJ0cywgMykpO1xuICAgICAgICB0aGlzLnNldEluZGV4KEZyYW1lLl9pbmRpY2VzKTtcbiAgICAgICAgdGhpcy5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuICAgIH1cbn1cbkZyYW1lLl9pbmRpY2VzID0gW1xuICAgIDAsIDIsIDEsXG4gICAgMCwgMywgMixcbiAgICA0LCA2LCA1LFxuICAgIDQsIDcsIDYsXG4gICAgOCwgMTAsIDksXG4gICAgOCwgMTEsIDEwLFxuICAgIDEyLCAxNCwgMTMsXG4gICAgMTIsIDE1LCAxNCxcbiAgICAxNiwgMTgsIDE3LFxuICAgIDE2LCAxOSwgMTgsXG4gICAgMjAsIDIyLCAyMSxcbiAgICAyMCwgMjMsIDIyLFxuICAgIDEsIDYsIDcsXG4gICAgMCwgMSwgNyxcbiAgICAzLCAwLCAxMCxcbiAgICAxMSwgMywgMTAsXG4gICAgMTcsIDIsIDMsXG4gICAgMTYsIDE3LCAzLFxuICAgIDIzLCAyMCwgMSxcbiAgICAyLCAyMywgMSxcbiAgICA1LCAxMiwgMTMsXG4gICAgNCwgNSwgMTMsXG4gICAgOSwgMTMsIDE0LFxuICAgIDgsIDksIDE0LFxuICAgIDIyLCAxNSwgMTIsXG4gICAgMjEsIDIyLCAxMixcbiAgICAxOSwgMTQsIDE1LFxuICAgIDE4LCAxOSwgMTUsXG4gICAgNywgNCwgOSxcbiAgICAxMCwgNywgOSxcbiAgICAxMSwgOCwgMTksXG4gICAgMTYsIDExLCAxOSxcbiAgICAyMywgMTcsIDE4LFxuICAgIDIyLCAyMywgMTgsXG4gICAgMjAsIDIxLCA1LFxuICAgIDYsIDIwLCA1LFxuICAgIDIwLCA2LCAxLFxuICAgIDEwLCAwLCA3LFxuICAgIDIxLCAxMiwgNSxcbiAgICAxMywgOSwgNCxcbiAgICAyMywgMiwgMTcsXG4gICAgMTEsIDE2LCAzLFxuICAgIDIyLCAxOCwgMTUsXG4gICAgOCwgMTQsIDE5LFxuXTtcbmV4cG9ydCBjbGFzcyBTdGlja2VyIGV4dGVuZHMgVEhSRUUuRXh0cnVkZUdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihzaXplLCBkZXB0aCkge1xuICAgICAgICBzaXplID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGxlZnQgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gc2l6ZTtcbiAgICAgICAgY29uc3QgdG9wID0gLXNpemU7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gc2l6ZSAvIDQ7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgIHNoYXBlLm1vdmVUbyhsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCBib3R0b20sIGxlZnQgKyByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCAtIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgYm90dG9tLCByaWdodCwgYm90dG9tIC0gcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCB0b3AsIHJpZ2h0IC0gcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5saW5lVG8obGVmdCArIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhsZWZ0LCB0b3AsIGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmNsb3NlUGF0aCgpO1xuICAgICAgICBzdXBlcihzaGFwZSwgeyBiZXZlbEVuYWJsZWQ6IGZhbHNlLCBkZXB0aDogZGVwdGggfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgQ3ViZSBmcm9tIFwiLi9jdWJlXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2RlZnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueCA9IE1hdGguUEkgLyA2O1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMTY7XG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDApO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsLnBvc2l0aW9uLnNldChjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLnNpemUgKiAzLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmRpcmVjdGlvbmFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodGhpcyk7XG4gICAgICAgIHRoaXMuY3ViZSA9IG5ldyBDdWJlKCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY3ViZSk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZSA9IDk7XG4gICAgfVxuICAgIHNldCBkaXJ0eSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpcnR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlLmRpcnR5O1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIH1cbiAgICB1cGRhdGVDYW1lcmEoKSB7XG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuaGVpZ2h0IC8gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gdGhpcy5zY2FsZSAvIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIGNvbnN0IGZvdiA9ICgyICogTWF0aC5hdGFuKG1pbikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMgKiB0aGlzLnBlcnNwZWN0aXZlO1xuICAgICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IGRpc3RhbmNlO1xuICAgICAgICB0aGlzLmNhbWVyYS5uZWFyID0gZGlzdGFuY2UgLSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZhciA9IGRpc3RhbmNlICsgY3ViZWxldF9kZWZzLnNpemUgKiA4O1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQodGhpcy5zY2VuZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWV0aWZ5IGZyb20gXCJ2dWV0aWZ5XCI7XG5pbXBvcnQgXCJ2dWV0aWZ5L2Rpc3QvdnVldGlmeS5taW4uY3NzXCI7XG5pbXBvcnQgXCJtYXRlcmlhbC1kZXNpZ24taWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCI7XG5pbXBvcnQgUGxheWdyb3VuZCBmcm9tIFwiLi92dWVhcHAvcGxheWdyb3VuZFwiO1xuVnVlLnVzZShWdWV0aWZ5KTtcbmNvbnN0IG9wdHMgPSB7fTtcbmNvbnN0IHZ1ZXRpZnkgPSBuZXcgVnVldGlmeShvcHRzKTtcblZ1ZS5wcm90b3R5cGUudnVldGlmeSA9IHZ1ZXRpZnk7XG5sZXQgYXBwID0gUGxheWdyb3VuZDtcbmNvbnN0IHZtID0gbmV3IFZ1ZSh7XG4gICAgdnVldGlmeSxcbiAgICBlbDogXCIjYXBwXCIsXG4gICAgcmVuZGVyOiAoaCkgPT4gaChhcHApLFxufSk7XG4iLCJpbXBvcnQgQ3ViaWVDdWJlIGZyb20gXCIuL0N1YmllQ3ViZVwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4vVXRpbFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29vcmRDdWJlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d2lzdCA9IDA7XG4gICAgICAgIHRoaXMudHN5bSA9IDA7XG4gICAgICAgIHRoaXMuZmxpcCA9IDA7XG4gICAgICAgIHRoaXMuZnN5bSA9IDA7XG4gICAgICAgIHRoaXMuc2xpY2UgPSAwO1xuICAgICAgICB0aGlzLnBydW4gPSAwO1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdCgpIHtcbiAgICAgICAgaWYgKENvb3JkQ3ViZS5pbml0ZWQgPT0gNDYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ29vcmRDdWJlLmluaXRlZCA9PSAwKSB7XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVDID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllRCA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5Jbml0UGVybVN5bTJSYXcoKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Jbml0Q1Blcm1Nb3ZlKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdEVQZXJtTW92ZSgpO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkluaXRNUGVybU1vdmVDb25qKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdENvbWJQTW92ZUNvbmooKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5Jbml0RmxpcFN5bTJSYXcoKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5Jbml0VHdpc3RTeW0yUmF3KCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdEZsaXBNb3ZlKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdFR3aXN0TW92ZSgpO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkluaXRVRFNsaWNlTW92ZUNvbmooKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5pbml0ZWQgPSAxO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIENvb3JkQ3ViZS5Jbml0TUNQZXJtUHJ1bigpO1xuICAgICAgICBDb29yZEN1YmUuSW5pdEVQZXJtQ29tYlBQcnVuKCk7XG4gICAgICAgIENvb3JkQ3ViZS5Jbml0U2xpY2VUd2lzdFBydW4oKTtcbiAgICAgICAgQ29vcmRDdWJlLkluaXRTbGljZUZsaXBQcnVuKCk7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0Q1Blcm1Nb3ZlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX1BFUk1fU1lNOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DUGVybU1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMuQ1Blcm0gPSBDdWJpZUN1YmUuRVBlcm1TMlJbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IENvb3JkQ3ViZS5OX01PVkVTMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0KENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5Nb3ZlQ3ViZVtVdGlsLlVEMlNURFtqXV0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5DUGVybU1vdmVbaV1bal0gPSBDb29yZEN1YmUuQ3ViaWVELkNQZXJtU3ltO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0RVBlcm1Nb3ZlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX1BFUk1fU1lNOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5FUGVybU1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMuRVBlcm0gPSBDdWJpZUN1YmUuRVBlcm1TMlJbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IENvb3JkQ3ViZS5OX01PVkVTMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5Nb3ZlQ3ViZVtVdGlsLlVEMlNURFtqXV0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5FUGVybU1vdmVbaV1bal0gPSBDb29yZEN1YmUuQ3ViaWVELkVQZXJtU3ltO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0TVBlcm1Nb3ZlQ29uaigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDb29yZEN1YmUuTl9NUEVSTTsgaSsrKSB7XG4gICAgICAgICAgICBDb29yZEN1YmUuTVBlcm1Nb3ZlW2ldID0gW107XG4gICAgICAgICAgICBDb29yZEN1YmUuTVBlcm1Db25qW2ldID0gW107XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVDLk1QZXJtID0gaTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVMyOyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLk1vdmVDdWJlW1V0aWwuVUQyU1REW2pdXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLk1QZXJtTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuTVBlcm07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZUNvbmp1Z2F0ZShDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuU3ltTXVsdEludlswXVtqXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLk1QZXJtQ29ualtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuTVBlcm07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEluaXRDb21iUE1vdmVDb25qKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX0NPTUI7IGkrKykge1xuICAgICAgICAgICAgQ29vcmRDdWJlLkNDb21iUE1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBDb25qW2ldID0gW107XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVDLkNDb21iID0gaSAlIDcwO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDb29yZEN1YmUuTl9NT1ZFUzI7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdChDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuTW92ZUN1YmVbVXRpbC5VRDJTVERbal1dLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuQ0NvbWJQTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuQ0NvbWIgKyA3MCAqICgoKENvb3JkQ3ViZS5QMl9QQVJJVFlfTU9WRSA+PiBqKSAmIDEpIF4gKGkgLyA3MCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5Db25qdWdhdGUoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLlN5bU11bHRJbnZbMF1bal0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBDb25qW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5DQ29tYiArIDcwICogfn4oaSAvIDcwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSW5pdEZsaXBNb3ZlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX0ZMSVBfU1lNOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5GbGlwTW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllQy5GbGlwID0gQ3ViaWVDdWJlLkZsaXBTMlJbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IENvb3JkQ3ViZS5OX01PVkVTOyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLk1vdmVDdWJlW2pdLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuRmxpcE1vdmVbaV1bal0gPSBDb29yZEN1YmUuQ3ViaWVELkZsaXBTeW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEluaXRUd2lzdE1vdmUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fVFdJU1RfU1lNOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Ud2lzdE1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMuVHdpc3QgPSBDdWJpZUN1YmUuVHdpc3RTMlJbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IENvb3JkQ3ViZS5OX01PVkVTOyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLk1vdmVDdWJlW2pdLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuVHdpc3RNb3ZlW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5Ud2lzdFN5bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSW5pdFVEU2xpY2VNb3ZlQ29uaigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDb29yZEN1YmUuTl9TTElDRTsgaSsrKSB7XG4gICAgICAgICAgICBDb29yZEN1YmUuVURTbGljZU1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5VRFNsaWNlQ29ualtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllQy5VRFNsaWNlID0gaTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVM7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuTW92ZUN1YmVbal0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5VRFNsaWNlTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuVURTbGljZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7IGogKz0gMikge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlQ29uanVnYXRlKENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5TeW1NdWx0SW52WzBdW2pdLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuVURTbGljZUNvbmpbaV1baiA+PiAxXSA9IENvb3JkQ3ViZS5DdWJpZUQuVURTbGljZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgU2V0UHJ1bmluZyh0YWJsZSwgaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIHRhYmxlW2luZGV4ID4+IDNdIF49IHZhbHVlIDw8IChpbmRleCA8PCAyKTtcbiAgICB9XG4gICAgc3RhdGljIEdldFBydW5pbmcodGFibGUsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiAodGFibGVbaW5kZXggPj4gM10gPj4gKGluZGV4IDw8IDIpKSAmIDB4ZjtcbiAgICB9XG4gICAgc3RhdGljIEhhc1plcm8odmFsKSB7XG4gICAgICAgIHJldHVybiAoKHZhbCAtIDB4MTExMTExMTEpICYgfnZhbCAmIDB4ODg4ODg4ODgpICE9IDA7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0UmF3U3ltUHJ1bihQcnVuVGFibGUsIE5fUkFXLCBOX1NZTSwgUmF3TW92ZSwgUmF3Q29uaiwgU3ltTW92ZSwgU3ltU3RhdGUsIFBydW5GbGFnKSB7XG4gICAgICAgIGNvbnN0IFNZTV9TSElGVCA9IFBydW5GbGFnICYgMHhmO1xuICAgICAgICBjb25zdCBTWU1fRTJDX01BR0lDID0gKChQcnVuRmxhZyA+PiA0KSAmIDEpID09IDEgPyAweDAwZGRkZDAwIDogMHgwMDAwMDAwMDtcbiAgICAgICAgY29uc3QgSVNfUEhBU0UyID0gKChQcnVuRmxhZyA+PiA1KSAmIDEpID09IDE7XG4gICAgICAgIGNvbnN0IElOVl9ERVBUSCA9IChQcnVuRmxhZyA+PiA4KSAmIDB4ZjtcbiAgICAgICAgY29uc3QgTUFYX0RFUFRIID0gKFBydW5GbGFnID4+IDEyKSAmIDB4ZjtcbiAgICAgICAgY29uc3QgTUlOX0RFUFRIID0gKFBydW5GbGFnID4+IDE2KSAmIDB4ZjtcbiAgICAgICAgY29uc3QgU1lNX01BU0sgPSAoMSA8PCBTWU1fU0hJRlQpIC0gMTtcbiAgICAgICAgY29uc3QgTl9TSVpFID0gTl9SQVcgKiBOX1NZTTtcbiAgICAgICAgY29uc3QgTl9NT1ZFUyA9IElTX1BIQVNFMiA/IDEwIDogMTg7XG4gICAgICAgIGNvbnN0IE5FWFRfQVhJU19NQUdJQyA9IE5fTU9WRVMgPT0gMTAgPyAweDQyIDogMHg5MjQ5MjtcbiAgICAgICAgbGV0IGRlcHRoID0gQ29vcmRDdWJlLkdldFBydW5pbmcoUHJ1blRhYmxlLCBOX1NJWkUpIC0gMTtcbiAgICAgICAgaWYgKGRlcHRoID09IC0xKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChOX1NJWkUgPj4gMykgKyAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBQcnVuVGFibGVbaV0gPSAweGZmZmZmZmZmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCAwLCAwIF4gMHhmKTtcbiAgICAgICAgICAgIGRlcHRoID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5TZXRQcnVuaW5nKFBydW5UYWJsZSwgTl9TSVpFLCAweGYgXiAoZGVwdGggKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgU0VBUkNIX0RFUFRIID0gTWF0aC5taW4oTWF0aC5tYXgoZGVwdGggKyAxLCBNSU5fREVQVEgpLCBNQVhfREVQVEgpO1xuICAgICAgICB3aGlsZSAoZGVwdGggPCBTRUFSQ0hfREVQVEgpIHtcbiAgICAgICAgICAgIGNvbnN0IGludiA9IGRlcHRoID4gSU5WX0RFUFRIO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gaW52ID8gMHhmIDogZGVwdGg7XG4gICAgICAgICAgICBjb25zdCBzZWxBcnJNYXNrID0gc2VsZWN0ICogMHgxMTExMTExMTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gaW52ID8gZGVwdGggOiAweGY7XG4gICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgQ29vcmRDdWJlLmluaXRlZCsrO1xuICAgICAgICAgICAgY29uc3QgeG9yVmFsID0gZGVwdGggXiAweGY7XG4gICAgICAgICAgICBsZXQgdmFsID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTl9TSVpFOyBpKyssIHZhbCA+Pj0gNCkge1xuICAgICAgICAgICAgICAgIGlmICgoaSAmIDcpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gUHJ1blRhYmxlW2kgPj4gM107XG4gICAgICAgICAgICAgICAgICAgIGlmICghQ29vcmRDdWJlLkhhc1plcm8odmFsIF4gc2VsQXJyTWFzaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodmFsICYgMHhmKSAhPSBzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhdyA9IGkgJSBOX1JBVztcbiAgICAgICAgICAgICAgICBjb25zdCBzeW0gPSB+fihpIC8gTl9SQVcpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgTl9NT1ZFUzsgbSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzeW14ID0gU3ltTW92ZVtzeW1dW21dO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYXd4ID0gUmF3Q29ualtSYXdNb3ZlW3Jhd11bbV1dW3N5bXggJiBTWU1fTUFTS107XG4gICAgICAgICAgICAgICAgICAgIHN5bXggPj49IFNZTV9TSElGVDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gc3lteCAqIE5fUkFXICsgcmF3eDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJ1biA9IENvb3JkQ3ViZS5HZXRQcnVuaW5nKFBydW5UYWJsZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBydW4gIT0gY2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcnVuIDwgZGVwdGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbSArPSAoTkVYVF9BWElTX01BR0lDID4+IG0pICYgMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5TZXRQcnVuaW5nKFBydW5UYWJsZSwgaSwgeG9yVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5TZXRQcnVuaW5nKFBydW5UYWJsZSwgaWR4LCB4b3JWYWwpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMSwgc3ltU3RhdGUgPSBTeW1TdGF0ZVtzeW14XTsgKHN5bVN0YXRlID4+PSAxKSAhPSAwOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3ltU3RhdGUgJiAxKSAhPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4eCA9IHN5bXggKiBOX1JBVztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeHggKz0gUmF3Q29ualtyYXd4XVtqIF4gKChTWU1fRTJDX01BR0lDID4+IChqIDw8IDEpKSAmIDMpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDb29yZEN1YmUuR2V0UHJ1bmluZyhQcnVuVGFibGUsIGlkeHgpID09IGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCBpZHh4LCB4b3JWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENvb3JkQ3ViZS5TZXRQcnVuaW5nKFBydW5UYWJsZSwgTl9TSVpFLCAoZGVwdGggKyAxKSBeIDB4Zik7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0U2xpY2VUd2lzdFBydW4oKSB7XG4gICAgICAgIENvb3JkQ3ViZS5Jbml0UmF3U3ltUHJ1bihDb29yZEN1YmUuVURTbGljZVR3aXN0UHJ1biwgNDk1LCAzMjQsIENvb3JkQ3ViZS5VRFNsaWNlTW92ZSwgQ29vcmRDdWJlLlVEU2xpY2VDb25qLCBDb29yZEN1YmUuVHdpc3RNb3ZlLCBDdWJpZUN1YmUuU3ltU3RhdGVUd2lzdCwgMHg2OTYwMyk7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0U2xpY2VGbGlwUHJ1bigpIHtcbiAgICAgICAgQ29vcmRDdWJlLkluaXRSYXdTeW1QcnVuKENvb3JkQ3ViZS5VRFNsaWNlRmxpcFBydW4sIDQ5NSwgMzM2LCBDb29yZEN1YmUuVURTbGljZU1vdmUsIENvb3JkQ3ViZS5VRFNsaWNlQ29uaiwgQ29vcmRDdWJlLkZsaXBNb3ZlLCBDdWJpZUN1YmUuU3ltU3RhdGVGbGlwLCAweDY5NjAzKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRNQ1Blcm1QcnVuKCkge1xuICAgICAgICBDb29yZEN1YmUuSW5pdFJhd1N5bVBydW4oQ29vcmRDdWJlLk1DUGVybVBydW4sIDI0LCAyNzY4LCBDb29yZEN1YmUuTVBlcm1Nb3ZlLCBDb29yZEN1YmUuTVBlcm1Db25qLCBDb29yZEN1YmUuQ1Blcm1Nb3ZlLCBDdWJpZUN1YmUuU3ltU3RhdGVQZXJtLCAweDhlYTM0KTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRFUGVybUNvbWJQUHJ1bigpIHtcbiAgICAgICAgQ29vcmRDdWJlLkluaXRSYXdTeW1QcnVuKENvb3JkQ3ViZS5FUGVybUNDb21iUFBydW4sIENvb3JkQ3ViZS5OX0NPTUIsIDI3NjgsIENvb3JkQ3ViZS5DQ29tYlBNb3ZlLCBDb29yZEN1YmUuQ0NvbWJQQ29uaiwgQ29vcmRDdWJlLkVQZXJtTW92ZSwgQ3ViaWVDdWJlLlN5bVN0YXRlUGVybSwgMHg3ZDgyNCk7XG4gICAgfVxuICAgIHNldFdpdGhQcnVuKGNjLCBkZXB0aCkge1xuICAgICAgICB0aGlzLnR3aXN0ID0gY2MuVHdpc3RTeW07XG4gICAgICAgIHRoaXMuZmxpcCA9IGNjLkZsaXBTeW07XG4gICAgICAgIHRoaXMudHN5bSA9IHRoaXMudHdpc3QgJiA3O1xuICAgICAgICB0aGlzLnR3aXN0ID0gdGhpcy50d2lzdCA+PiAzO1xuICAgICAgICB0aGlzLnBydW4gPSAwO1xuICAgICAgICB0aGlzLmZzeW0gPSB0aGlzLmZsaXAgJiA3O1xuICAgICAgICB0aGlzLmZsaXAgPSB0aGlzLmZsaXAgPj4gMztcbiAgICAgICAgdGhpcy5zbGljZSA9IGNjLlVEU2xpY2U7XG4gICAgICAgIHRoaXMucHJ1biA9IE1hdGgubWF4KHRoaXMucHJ1biwgTWF0aC5tYXgoQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLlVEU2xpY2VUd2lzdFBydW4sIHRoaXMudHdpc3QgKiBDb29yZEN1YmUuTl9TTElDRSArIENvb3JkQ3ViZS5VRFNsaWNlQ29ualt0aGlzLnNsaWNlXVt0aGlzLnRzeW1dKSwgQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLlVEU2xpY2VGbGlwUHJ1biwgdGhpcy5mbGlwICogQ29vcmRDdWJlLk5fU0xJQ0UgKyBDb29yZEN1YmUuVURTbGljZUNvbmpbdGhpcy5zbGljZV1bdGhpcy5mc3ltXSkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJ1biA8PSBkZXB0aDtcbiAgICB9XG4gICAgZG9Nb3ZlUHJ1bihjYywgbSkge1xuICAgICAgICB0aGlzLnNsaWNlID0gQ29vcmRDdWJlLlVEU2xpY2VNb3ZlW2NjLnNsaWNlXVttXTtcbiAgICAgICAgdGhpcy5mbGlwID0gQ29vcmRDdWJlLkZsaXBNb3ZlW2NjLmZsaXBdW0N1YmllQ3ViZS5TeW04TW92ZVsobSA8PCAzKSB8IGNjLmZzeW1dXTtcbiAgICAgICAgdGhpcy5mc3ltID0gKHRoaXMuZmxpcCAmIDcpIF4gY2MuZnN5bTtcbiAgICAgICAgdGhpcy5mbGlwID4+PSAzO1xuICAgICAgICB0aGlzLnR3aXN0ID0gQ29vcmRDdWJlLlR3aXN0TW92ZVtjYy50d2lzdF1bQ3ViaWVDdWJlLlN5bThNb3ZlWyhtIDw8IDMpIHwgY2MudHN5bV1dO1xuICAgICAgICB0aGlzLnRzeW0gPSAodGhpcy50d2lzdCAmIDcpIF4gY2MudHN5bTtcbiAgICAgICAgdGhpcy50d2lzdCA+Pj0gMztcbiAgICAgICAgdGhpcy5wcnVuID0gTWF0aC5tYXgoQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLlVEU2xpY2VUd2lzdFBydW4sIHRoaXMudHdpc3QgKiBDb29yZEN1YmUuTl9TTElDRSArIENvb3JkQ3ViZS5VRFNsaWNlQ29ualt0aGlzLnNsaWNlXVt0aGlzLnRzeW1dKSwgQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLlVEU2xpY2VGbGlwUHJ1biwgdGhpcy5mbGlwICogQ29vcmRDdWJlLk5fU0xJQ0UgKyBDb29yZEN1YmUuVURTbGljZUNvbmpbdGhpcy5zbGljZV1bdGhpcy5mc3ltXSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5wcnVuO1xuICAgIH1cbn1cbkNvb3JkQ3ViZS5OX01PVkVTID0gMTg7XG5Db29yZEN1YmUuTl9NT1ZFUzIgPSAxMDtcbkNvb3JkQ3ViZS5OX1NMSUNFID0gNDk1O1xuQ29vcmRDdWJlLk5fVFdJU1QgPSAyMTg3O1xuQ29vcmRDdWJlLk5fVFdJU1RfU1lNID0gMzI0O1xuQ29vcmRDdWJlLk5fRkxJUCA9IDIwNDg7XG5Db29yZEN1YmUuTl9GTElQX1NZTSA9IDMzNjtcbkNvb3JkQ3ViZS5OX1BFUk0gPSA0MDMyMDtcbkNvb3JkQ3ViZS5OX1BFUk1fU1lNID0gMjc2ODtcbkNvb3JkQ3ViZS5OX01QRVJNID0gMjQ7XG5Db29yZEN1YmUuTl9DT01CID0gNzA7XG5Db29yZEN1YmUuUDJfUEFSSVRZX01PVkUgPSAwO1xuQ29vcmRDdWJlLlVEU2xpY2VNb3ZlID0gW107XG5Db29yZEN1YmUuVHdpc3RNb3ZlID0gW107XG5Db29yZEN1YmUuRmxpcE1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5VRFNsaWNlQ29uaiA9IFtdO1xuQ29vcmRDdWJlLlVEU2xpY2VUd2lzdFBydW4gPSBbXTtcbkNvb3JkQ3ViZS5VRFNsaWNlRmxpcFBydW4gPSBbXTtcbkNvb3JkQ3ViZS5DUGVybU1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5FUGVybU1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5NUGVybU1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5NUGVybUNvbmogPSBbXTtcbkNvb3JkQ3ViZS5DQ29tYlBNb3ZlID0gW107XG5Db29yZEN1YmUuQ0NvbWJQQ29uaiA9IFtdO1xuQ29vcmRDdWJlLk1DUGVybVBydW4gPSBbXTtcbkNvb3JkQ3ViZS5FUGVybUNDb21iUFBydW4gPSBbXTtcbkNvb3JkQ3ViZS5pbml0ZWQgPSAwO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4vVXRpbFwiO1xuaW1wb3J0IENvb3JkQ3ViZSBmcm9tIFwiLi9Db29yZEN1YmVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmllQ3ViZSB7XG4gICAgY29uc3RydWN0b3IoY3Blcm0gPSAwLCB0d2lzdCA9IDAsIGVwZXJtID0gMCwgZmxpcCA9IDApIHtcbiAgICAgICAgdGhpcy5jYSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcbiAgICAgICAgdGhpcy5lYSA9IFswLCAyLCA0LCA2LCA4LCAxMCwgMTIsIDE0LCAxNiwgMTgsIDIwLCAyMl07XG4gICAgICAgIHRoaXMuQ1Blcm0gPSBjcGVybTtcbiAgICAgICAgdGhpcy5Ud2lzdCA9IHR3aXN0O1xuICAgICAgICBVdGlsLlNldE5QZXJtRnVsbCh0aGlzLmVhLCBlcGVybSwgMTIsIHRydWUpO1xuICAgICAgICB0aGlzLkZsaXAgPSBmbGlwO1xuICAgIH1cbiAgICBzdGF0aWMgRVN5bTJDU3ltKGlkeCkge1xuICAgICAgICByZXR1cm4gaWR4IF4gKChDdWJpZUN1YmUuU1lNX0UyQ19NQUdJQyA+PiAoKGlkeCAmIDB4ZikgPDwgMSkpICYgMyk7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0TW92ZSgpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHJlc3VsdFswXSA9IG5ldyBDdWJpZUN1YmUoMTUxMjAsIDAsIDExOTc1MDQwMCwgMCk7XG4gICAgICAgIHJlc3VsdFszXSA9IG5ldyBDdWJpZUN1YmUoMjEwMjEsIDE0OTQsIDMyMzQwMzQxNywgMCk7XG4gICAgICAgIHJlc3VsdFs2XSA9IG5ldyBDdWJpZUN1YmUoODA2NCwgMTIzNiwgMjk0NDE4MDgsIDU1MCk7XG4gICAgICAgIHJlc3VsdFs5XSA9IG5ldyBDdWJpZUN1YmUoOSwgMCwgNTg4MCwgMCk7XG4gICAgICAgIHJlc3VsdFsxMl0gPSBuZXcgQ3ViaWVDdWJlKDEyMzAsIDQxMiwgMjk0OTY2MCwgMCk7XG4gICAgICAgIHJlc3VsdFsxNV0gPSBuZXcgQ3ViaWVDdWJlKDIyNCwgMTM3LCAzMjg1NTIsIDEzNyk7XG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgMTg7IGEgKz0gMykge1xuICAgICAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCAyOyBwKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbYSArIHAgKyAxXSA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQocmVzdWx0W2EgKyBwXSwgcmVzdWx0W2FdLCByZXN1bHRbYSArIHAgKyAxXSk7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0KHJlc3VsdFthICsgcF0sIHJlc3VsdFthXSwgcmVzdWx0W2EgKyBwICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEN1YmllQ3ViZS5Nb3ZlQ3ViZSA9IHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIEluaXRTeW0oKSB7XG4gICAgICAgIGxldCBjID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICBsZXQgZCA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgY29uc3QgZjIgPSBuZXcgQ3ViaWVDdWJlKDI4NzgzLCAwLCAyNTkyNjg0MDcsIDApO1xuICAgICAgICBjb25zdCB1NCA9IG5ldyBDdWJpZUN1YmUoMTUxMzgsIDAsIDExOTc2NTUzOCwgNyk7XG4gICAgICAgIGNvbnN0IGxyMiA9IG5ldyBDdWJpZUN1YmUoNTE2NywgMCwgODM0NzMyMDcsIDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgbHIyLmNhW2ldIHw9IDMgPDwgMztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1DdWJlW2ldID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bUN1YmVbaV0uY29weShjKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdEZ1bGwoYywgdTQsIGQpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KGMsIHU0LCBkKTtcbiAgICAgICAgICAgIFtjLCBkXSA9IFtkLCBjXTtcbiAgICAgICAgICAgIGlmIChpICUgNCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0RnVsbChjLCBscjIsIGQpO1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChjLCBscjIsIGQpO1xuICAgICAgICAgICAgICAgIFtjLCBkXSA9IFtkLCBjXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICUgOCA9PSA3KSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0RnVsbChjLCBmMiwgZCk7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KGMsIGYyLCBkKTtcbiAgICAgICAgICAgICAgICBbYywgZF0gPSBbZCwgY107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgICAgICBDdWJpZUN1YmUuU3ltTXVsdFtpXSA9IFtdO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bU11bHRJbnZbaV0gPSBbXTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1Nb3ZlW2ldID0gW107XG4gICAgICAgICAgICBDdWJpZUN1YmUuU3ltTW92ZVVEW2ldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuU3ltTXVsdFtpXVtqXSA9IGkgXiBqIF4gKCgweDE0YWI0ID4+IGopICYgKGkgPDwgMSkgJiAyKTtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuU3ltTXVsdEludltDdWJpZUN1YmUuU3ltTXVsdFtpXVtqXV1bal0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgMTY7IHMrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxODsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5Db25qdWdhdGUoQ3ViaWVDdWJlLk1vdmVDdWJlW2pdLCBDdWJpZUN1YmUuU3ltTXVsdEludlswXVtzXSwgYyk7XG4gICAgICAgICAgICAgICAgb3V0bG9vcDogZm9yIChsZXQgbSA9IDA7IG0gPCAxODsgbSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgODsgdCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ3ViaWVDdWJlLk1vdmVDdWJlW21dLmNhW3RdICE9IGMuY2FbdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRsb29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1Nb3ZlW3NdW2pdID0gbTtcbiAgICAgICAgICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bU1vdmVVRFtzXVtVdGlsLlNURDJVRFtqXV0gPSBVdGlsLlNURDJVRFttXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5TeW04TW92ZVsoaiA8PCAzKSB8IChzID4+IDEpXSA9IEN1YmllQ3ViZS5TeW1Nb3ZlW3NdW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSW5pdFN5bTJSYXcoTl9SQVcsIFN5bTJSYXcsIFJhdzJTeW0sIFN5bVN0YXRlLCBjb29yZCkge1xuICAgICAgICBjb25zdCBjID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICBjb25zdCBkID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICBsZXQgY291bnQgPSAwLCBpZHggPSAwO1xuICAgICAgICBjb25zdCBzeW1JbmMgPSBjb29yZCA+PSAyID8gMSA6IDI7XG4gICAgICAgIGNvbnN0IGlzRWRnZSA9IGNvb3JkICE9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTl9SQVc7IGkrKykge1xuICAgICAgICAgICAgaWYgKFJhdzJTeW1baV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNvb3JkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBjLkZsaXAgPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGMuVHdpc3QgPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGMuRVBlcm0gPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgMTY7IHMgKz0gc3ltSW5jKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRWRnZSkge1xuICAgICAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZUNvbmp1Z2F0ZShjLCBzLCBkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5Db3JuQ29uanVnYXRlKGMsIHMsIGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGQuRmxpcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSBkLlR3aXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGQuRVBlcm07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIFN5bVN0YXRlW2NvdW50XSB8PSAxIDw8IChzIC8gc3ltSW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUmF3MlN5bVtpZHhdID0gKChjb3VudCA8PCA0KSB8IHMpIC8gc3ltSW5jO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU3ltMlJhd1tjb3VudCsrXSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdEZsaXBTeW0yUmF3KCkge1xuICAgICAgICBDdWJpZUN1YmUuSW5pdFN5bTJSYXcoQ29vcmRDdWJlLk5fRkxJUCwgQ3ViaWVDdWJlLkZsaXBTMlIsIEN1YmllQ3ViZS5GbGlwUjJTLCBDdWJpZUN1YmUuU3ltU3RhdGVGbGlwLCAwKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRUd2lzdFN5bTJSYXcoKSB7XG4gICAgICAgIEN1YmllQ3ViZS5Jbml0U3ltMlJhdyhDb29yZEN1YmUuTl9UV0lTVCwgQ3ViaWVDdWJlLlR3aXN0UzJSLCBDdWJpZUN1YmUuVHdpc3RSMlMsIEN1YmllQ3ViZS5TeW1TdGF0ZVR3aXN0LCAxKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRQZXJtU3ltMlJhdygpIHtcbiAgICAgICAgQ3ViaWVDdWJlLkluaXRTeW0yUmF3KENvb3JkQ3ViZS5OX1BFUk0sIEN1YmllQ3ViZS5FUGVybVMyUiwgQ3ViaWVDdWJlLkVQZXJtUjJTLCBDdWJpZUN1YmUuU3ltU3RhdGVQZXJtLCAyKTtcbiAgICAgICAgY29uc3QgY2MgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fUEVSTV9TWU07IGkrKykge1xuICAgICAgICAgICAgY2MuRVBlcm0gPSBDdWJpZUN1YmUuRVBlcm1TMlJbaV07XG4gICAgICAgICAgICBDdWJpZUN1YmUuUGVybTJDb21iUFtpXSA9IFV0aWwuR2V0Q29tYihjYy5lYSwgMCwgdHJ1ZSk7XG4gICAgICAgICAgICBjYy5pbnZlcnNlKCk7XG4gICAgICAgICAgICBDdWJpZUN1YmUuUGVybUludkVkZ2VTeW1baV0gPSBjYy5FUGVybVN5bTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX01QRVJNOyBpKyspIHtcbiAgICAgICAgICAgIGNjLk1QZXJtID0gaTtcbiAgICAgICAgICAgIGNjLmludmVyc2UoKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5NUGVybUludltpXSA9IGNjLk1QZXJtO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0KCkge1xuICAgICAgICBDdWJpZUN1YmUudGVtcHMgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIEN1YmllQ3ViZS5Jbml0TW92ZSgpO1xuICAgICAgICBDdWJpZUN1YmUuSW5pdFN5bSgpO1xuICAgIH1cbiAgICBzdGF0aWMgQ29ybk11bHQoYSwgYiwgcHJvZCkge1xuICAgICAgICBmb3IgKGxldCBjb3JuID0gMDsgY29ybiA8IDg7IGNvcm4rKykge1xuICAgICAgICAgICAgY29uc3Qgb3JpQSA9IGEuY2FbYi5jYVtjb3JuXSAmIDddID4+IDM7XG4gICAgICAgICAgICBjb25zdCBvcmlCID0gYi5jYVtjb3JuXSA+PiAzO1xuICAgICAgICAgICAgcHJvZC5jYVtjb3JuXSA9IChhLmNhW2IuY2FbY29ybl0gJiA3XSAmIDcpIHwgKChvcmlBICsgb3JpQikgJSAzIDw8IDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBDb3JuTXVsdEZ1bGwoYSwgYiwgcHJvZCkge1xuICAgICAgICBmb3IgKGxldCBjb3JuID0gMDsgY29ybiA8IDg7IGNvcm4rKykge1xuICAgICAgICAgICAgY29uc3Qgb3JpQSA9IGEuY2FbYi5jYVtjb3JuXSAmIDddID4+IDM7XG4gICAgICAgICAgICBjb25zdCBvcmlCID0gYi5jYVtjb3JuXSA+PiAzO1xuICAgICAgICAgICAgbGV0IG9yaSA9IG9yaUEgKyAob3JpQSA8IDMgPyBvcmlCIDogNiAtIG9yaUIpO1xuICAgICAgICAgICAgb3JpID0gKG9yaSAlIDMpICsgKG9yaUEgPCAzID09IG9yaUIgPCAzID8gMCA6IDMpO1xuICAgICAgICAgICAgcHJvZC5jYVtjb3JuXSA9IChhLmNhW2IuY2FbY29ybl0gJiA3XSAmIDcpIHwgKG9yaSA8PCAzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgRWRnZU11bHQoYSwgYiwgcHJvZCkge1xuICAgICAgICBmb3IgKGxldCBlZCA9IDA7IGVkIDwgMTI7IGVkKyspIHtcbiAgICAgICAgICAgIHByb2QuZWFbZWRdID0gYS5lYVtiLmVhW2VkXSA+PiAxXSBeIChiLmVhW2VkXSAmIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBDb3JuQ29uanVnYXRlKGEsIGlkeCwgYikge1xuICAgICAgICBjb25zdCBzaW52ID0gQ3ViaWVDdWJlLlN5bUN1YmVbQ3ViaWVDdWJlLlN5bU11bHRJbnZbMF1baWR4XV07XG4gICAgICAgIGNvbnN0IHMgPSBDdWJpZUN1YmUuU3ltQ3ViZVtpZHhdO1xuICAgICAgICBmb3IgKGxldCBjb3JuID0gMDsgY29ybiA8IDg7IGNvcm4rKykge1xuICAgICAgICAgICAgY29uc3Qgb3JpQSA9IHNpbnYuY2FbYS5jYVtzLmNhW2Nvcm5dICYgN10gJiA3XSA+PiAzO1xuICAgICAgICAgICAgY29uc3Qgb3JpQiA9IGEuY2Fbcy5jYVtjb3JuXSAmIDddID4+IDM7XG4gICAgICAgICAgICBjb25zdCBvcmkgPSBvcmlBIDwgMyA/IG9yaUIgOiAoMyAtIG9yaUIpICUgMztcbiAgICAgICAgICAgIGIuY2FbY29ybl0gPSAoc2ludi5jYVthLmNhW3MuY2FbY29ybl0gJiA3XSAmIDddICYgNykgfCAob3JpIDw8IDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBFZGdlQ29uanVnYXRlKGEsIGlkeCwgYikge1xuICAgICAgICBjb25zdCBzaW52ID0gQ3ViaWVDdWJlLlN5bUN1YmVbQ3ViaWVDdWJlLlN5bU11bHRJbnZbMF1baWR4XV07XG4gICAgICAgIGNvbnN0IHMgPSBDdWJpZUN1YmUuU3ltQ3ViZVtpZHhdO1xuICAgICAgICBmb3IgKGxldCBlZCA9IDA7IGVkIDwgMTI7IGVkKyspIHtcbiAgICAgICAgICAgIGIuZWFbZWRdID0gc2ludi5lYVthLmVhW3MuZWFbZWRdID4+IDFdID4+IDFdIF4gKGEuZWFbcy5lYVtlZF0gPj4gMV0gJiAxKSBeIChzLmVhW2VkXSAmIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBHZXRQZXJtU3ltSW52KGlkeCwgc3ltLCBjb3JuZXIpIHtcbiAgICAgICAgbGV0IGlkeGkgPSBDdWJpZUN1YmUuUGVybUludkVkZ2VTeW1baWR4XTtcbiAgICAgICAgaWYgKGNvcm5lcikge1xuICAgICAgICAgICAgaWR4aSA9IEN1YmllQ3ViZS5FU3ltMkNTeW0oaWR4aSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChpZHhpICYgMHhmZmYwKSB8IEN1YmllQ3ViZS5TeW1NdWx0W2lkeGkgJiAweGZdW3N5bV07XG4gICAgfVxuICAgIHN0YXRpYyBHZXRTa2lwTW92ZXMoc3N5bSkge1xuICAgICAgICBsZXQgcmV0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IChzc3ltID4+PSAxKSAhPSAwOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoc3N5bSAmIDEpID09IDEpIHtcbiAgICAgICAgICAgICAgICByZXQgfD0gQ3ViaWVDdWJlLkZpcnN0TW92ZVN5bVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBjb3B5KGMpIHtcbiAgICAgICAgZm9yIChsZXQgZWRnZSA9IDA7IGVkZ2UgPCAxMjsgZWRnZSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVhW2VkZ2VdID0gYy5lYVtlZGdlXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb3JuID0gMDsgY29ybiA8IDg7IGNvcm4rKykge1xuICAgICAgICAgICAgdGhpcy5jYVtjb3JuXSA9IGMuY2FbY29ybl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52ZXJzZSgpIHtcbiAgICAgICAgZm9yIChsZXQgZWRnZSA9IDA7IGVkZ2UgPCAxMjsgZWRnZSsrKSB7XG4gICAgICAgICAgICBDdWJpZUN1YmUudGVtcHMuZWFbdGhpcy5lYVtlZGdlXSA+PiAxXSA9IChlZGdlIDw8IDEpIHwgKHRoaXMuZWFbZWRnZV0gJiAxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb3JuID0gMDsgY29ybiA8IDg7IGNvcm4rKykge1xuICAgICAgICAgICAgQ3ViaWVDdWJlLnRlbXBzLmNhW3RoaXMuY2FbY29ybl0gJiAweDddID0gY29ybiB8ICgoMHgyMCA+PiAodGhpcy5jYVtjb3JuXSA+PiAzKSkgJiAweDE4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvcHkoQ3ViaWVDdWJlLnRlbXBzKTtcbiAgICB9XG4gICAgVVJGQ29uanVnYXRlKCkge1xuICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQoQ3ViaWVDdWJlLlVSRjIsIHRoaXMsIEN1YmllQ3ViZS50ZW1wcyk7XG4gICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdChDdWJpZUN1YmUudGVtcHMsIEN1YmllQ3ViZS5VUkYxLCB0aGlzKTtcbiAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KEN1YmllQ3ViZS5VUkYyLCB0aGlzLCBDdWJpZUN1YmUudGVtcHMpO1xuICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ3ViaWVDdWJlLnRlbXBzLCBDdWJpZUN1YmUuVVJGMSwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBGbGlwKCkge1xuICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBpZHggPSAoaWR4IDw8IDEpIHwgKHRoaXMuZWFbaV0gJiAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cbiAgICBzZXQgRmxpcChpZHgpIHtcbiAgICAgICAgbGV0IHBhcml0eSA9IDA7XG4gICAgICAgIGxldCB2YWwgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMTA7IGkgPj0gMDsgaS0tLCBpZHggPj49IDEpIHtcbiAgICAgICAgICAgIHBhcml0eSBePSB2YWwgPSBpZHggJiAxO1xuICAgICAgICAgICAgdGhpcy5lYVtpXSA9ICh0aGlzLmVhW2ldICYgfjEpIHwgdmFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWFbMTFdID0gKHRoaXMuZWFbMTFdICYgfjEpIHwgcGFyaXR5O1xuICAgIH1cbiAgICBnZXQgRmxpcFN5bSgpIHtcbiAgICAgICAgcmV0dXJuIEN1YmllQ3ViZS5GbGlwUjJTW3RoaXMuRmxpcF07XG4gICAgfVxuICAgIGdldCBUd2lzdCgpIHtcbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBpZHggKz0gKGlkeCA8PCAxKSArICh0aGlzLmNhW2ldID4+IDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIHNldCBUd2lzdChpZHgpIHtcbiAgICAgICAgbGV0IHR3c3QgPSAxNTtcbiAgICAgICAgbGV0IHZhbCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSA2OyBpID49IDA7IGktLSwgaWR4ID0gfn4oaWR4IC8gMykpIHtcbiAgICAgICAgICAgIHR3c3QgLT0gdmFsID0gaWR4ICUgMztcbiAgICAgICAgICAgIHRoaXMuY2FbaV0gPSAodGhpcy5jYVtpXSAmIDB4NykgfCAodmFsIDw8IDMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FbN10gPSAodGhpcy5jYVs3XSAmIDB4NykgfCAodHdzdCAlIDMgPDwgMyk7XG4gICAgfVxuICAgIGdldCBUd2lzdFN5bSgpIHtcbiAgICAgICAgcmV0dXJuIEN1YmllQ3ViZS5Ud2lzdFIyU1t0aGlzLlR3aXN0XTtcbiAgICB9XG4gICAgZ2V0IFVEU2xpY2UoKSB7XG4gICAgICAgIHJldHVybiA0OTQgLSBVdGlsLkdldENvbWIodGhpcy5lYSwgOCwgdHJ1ZSk7XG4gICAgfVxuICAgIHNldCBVRFNsaWNlKGlkeCkge1xuICAgICAgICBVdGlsLlNldENvbWIodGhpcy5lYSwgNDk0IC0gaWR4LCA4LCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0IENQZXJtKCkge1xuICAgICAgICByZXR1cm4gVXRpbC5HZXROUGVybSh0aGlzLmNhLCA4LCBmYWxzZSk7XG4gICAgfVxuICAgIHNldCBDUGVybShpZHgpIHtcbiAgICAgICAgVXRpbC5TZXROUGVybSh0aGlzLmNhLCBpZHgsIDgsIGZhbHNlKTtcbiAgICB9XG4gICAgZ2V0IENQZXJtU3ltKCkge1xuICAgICAgICByZXR1cm4gQ3ViaWVDdWJlLkVTeW0yQ1N5bShDdWJpZUN1YmUuRVBlcm1SMlNbdGhpcy5DUGVybV0pO1xuICAgIH1cbiAgICBnZXQgRVBlcm0oKSB7XG4gICAgICAgIHJldHVybiBVdGlsLkdldE5QZXJtKHRoaXMuZWEsIDgsIHRydWUpO1xuICAgIH1cbiAgICBzZXQgRVBlcm0oaWR4KSB7XG4gICAgICAgIFV0aWwuU2V0TlBlcm0odGhpcy5lYSwgaWR4LCA4LCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0IEVQZXJtU3ltKCkge1xuICAgICAgICByZXR1cm4gQ3ViaWVDdWJlLkVQZXJtUjJTW3RoaXMuRVBlcm1dO1xuICAgIH1cbiAgICBnZXQgTVBlcm0oKSB7XG4gICAgICAgIHJldHVybiBVdGlsLkdldE5QZXJtRnVsbCh0aGlzLmVhLCAxMiwgdHJ1ZSkgJSAyNDtcbiAgICB9XG4gICAgc2V0IE1QZXJtKGlkeCkge1xuICAgICAgICBVdGlsLlNldE5QZXJtRnVsbCh0aGlzLmVhLCBpZHgsIDEyLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0IENDb21iKCkge1xuICAgICAgICByZXR1cm4gVXRpbC5HZXRDb21iKHRoaXMuY2EsIDAsIGZhbHNlKTtcbiAgICB9XG4gICAgc2V0IENDb21iKGlkeCkge1xuICAgICAgICBVdGlsLlNldENvbWIodGhpcy5jYSwgaWR4LCAwLCBmYWxzZSk7XG4gICAgfVxuICAgIHZlcmlmeSgpIHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGxldCBtYXNrID0gMDtcbiAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCAxMjsgZSsrKSB7XG4gICAgICAgICAgICBtYXNrIHw9IDEgPDwgKHRoaXMuZWFbZV0gPj4gMSk7XG4gICAgICAgICAgICBzdW0gXj0gdGhpcy5lYVtlXSAmIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hc2sgIT0gMHhmZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm1pc3NpbmcgZWRnZXNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VtICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcImZsaXBlZCBlZGdlc1wiO1xuICAgICAgICB9XG4gICAgICAgIG1hc2sgPSAwO1xuICAgICAgICBzdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDg7IGMrKykge1xuICAgICAgICAgICAgbWFzayB8PSAxIDw8ICh0aGlzLmNhW2NdICYgNyk7XG4gICAgICAgICAgICBzdW0gKz0gdGhpcy5jYVtjXSA+PiAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXNrICE9IDB4ZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm1pc3NpbmcgY29ybmVyc1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdW0gJSAzICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInR3aXN0ZWQgY29ybmVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChVdGlsLkdldE5QYXJpdHkoVXRpbC5HZXROUGVybUZ1bGwodGhpcy5lYSwgMTIsIHRydWUpLCAxMikgXiBVdGlsLkdldE5QYXJpdHkodGhpcy5DUGVybSwgOCkpICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcInBhcml0eSBlcnJvclwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IHRzID0gXCJVUkZETEJcIjtcbiAgICAgICAgY29uc3QgZiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU0OyBpKyspIHtcbiAgICAgICAgICAgIGZbaV0gPSB0c1t+fihpIC8gOSldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgODsgYysrKSB7XG4gICAgICAgICAgICBjb25zdCBqID0gdGhpcy5jYVtjXSAmIDB4NztcbiAgICAgICAgICAgIGNvbnN0IG9yaSA9IHRoaXMuY2FbY10gPj4gMztcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgMzsgbisrKVxuICAgICAgICAgICAgICAgIGZbVXRpbC5Db3JuZXJGYWNlbGV0W2NdWyhuICsgb3JpKSAlIDNdXSA9IHRzW35+KFV0aWwuQ29ybmVyRmFjZWxldFtqXVtuXSAvIDkpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IDEyOyBlKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSB0aGlzLmVhW2VdID4+IDE7XG4gICAgICAgICAgICBjb25zdCBvcmkgPSB0aGlzLmVhW2VdICYgMTtcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgMjsgbisrKVxuICAgICAgICAgICAgICAgIGZbVXRpbC5FZGdlRmFjZWxldFtlXVsobiArIG9yaSkgJSAyXV0gPSB0c1t+fihVdGlsLkVkZ2VGYWNlbGV0W2pdW25dIC8gOSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGRlc2VyaWFsaXplKGZhY2VsZXQpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3QgZiA9IFtdO1xuICAgICAgICBjb25zdCBjZW50ZXJzID0gZmFjZWxldFs0XSArIGZhY2VsZXRbMTNdICsgZmFjZWxldFsyMl0gKyBmYWNlbGV0WzMxXSArIGZhY2VsZXRbNDBdICsgZmFjZWxldFs0OV07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTQ7ICsraSkge1xuICAgICAgICAgICAgZltpXSA9IGNlbnRlcnMuaW5kZXhPZihmYWNlbGV0W2ldKTtcbiAgICAgICAgICAgIGlmIChmW2ldID09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQgKz0gMSA8PCAoZltpXSA8PCAyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgIT0gMHg5OTk5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sMSwgY29sMiwgaSwgaiwgb3JpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgODsgKytpKSB7XG4gICAgICAgICAgICBmb3IgKG9yaSA9IDA7IG9yaSA8IDM7ICsrb3JpKVxuICAgICAgICAgICAgICAgIGlmIChmW1V0aWwuQ29ybmVyRmFjZWxldFtpXVtvcmldXSA9PSAwIHx8IGZbVXRpbC5Db3JuZXJGYWNlbGV0W2ldW29yaV1dID09IDMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY29sMSA9IGZbVXRpbC5Db3JuZXJGYWNlbGV0W2ldWyhvcmkgKyAxKSAlIDNdXTtcbiAgICAgICAgICAgIGNvbDIgPSBmW1V0aWwuQ29ybmVyRmFjZWxldFtpXVsob3JpICsgMikgJSAzXV07XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgODsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbDEgPT0gfn4oVXRpbC5Db3JuZXJGYWNlbGV0W2pdWzFdIC8gOSkgJiYgY29sMiA9PSB+fihVdGlsLkNvcm5lckZhY2VsZXRbal1bMl0gLyA5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhW2ldID0gaiB8IChvcmkgJSAzIDw8IDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyArK2kpIHtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCAxMjsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZbVXRpbC5FZGdlRmFjZWxldFtpXVswXV0gPT0gfn4oVXRpbC5FZGdlRmFjZWxldFtqXVswXSAvIDkpICYmXG4gICAgICAgICAgICAgICAgICAgIGZbVXRpbC5FZGdlRmFjZWxldFtpXVsxXV0gPT0gfn4oVXRpbC5FZGdlRmFjZWxldFtqXVsxXSAvIDkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFbaV0gPSBqIDw8IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZltVdGlsLkVkZ2VGYWNlbGV0W2ldWzBdXSA9PSB+fihVdGlsLkVkZ2VGYWNlbGV0W2pdWzFdIC8gOSkgJiZcbiAgICAgICAgICAgICAgICAgICAgZltVdGlsLkVkZ2VGYWNlbGV0W2ldWzFdXSA9PSB+fihVdGlsLkVkZ2VGYWNlbGV0W2pdWzBdIC8gOSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYVtpXSA9IChqIDw8IDEpIHwgMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbkN1YmllQ3ViZS5TeW1DdWJlID0gW107XG5DdWJpZUN1YmUuTW92ZUN1YmUgPSBbXTtcbkN1YmllQ3ViZS5Nb3ZlQ3ViZVN5bSA9IFtdO1xuQ3ViaWVDdWJlLkZpcnN0TW92ZVN5bSA9IFtdO1xuQ3ViaWVDdWJlLlN5bU11bHQgPSBbXTtcbkN1YmllQ3ViZS5TeW1NdWx0SW52ID0gW107XG5DdWJpZUN1YmUuU3ltTW92ZSA9IFtdO1xuQ3ViaWVDdWJlLlN5bThNb3ZlID0gW107XG5DdWJpZUN1YmUuU3ltTW92ZVVEID0gW107XG5DdWJpZUN1YmUuRmxpcFMyUiA9IFtdO1xuQ3ViaWVDdWJlLlR3aXN0UzJSID0gW107XG5DdWJpZUN1YmUuRVBlcm1TMlIgPSBbXTtcbkN1YmllQ3ViZS5QZXJtMkNvbWJQID0gW107XG5DdWJpZUN1YmUuUGVybUludkVkZ2VTeW0gPSBbXTtcbkN1YmllQ3ViZS5NUGVybUludiA9IFtdO1xuQ3ViaWVDdWJlLlNZTV9FMkNfTUFHSUMgPSAweDAwZGRkZDAwO1xuQ3ViaWVDdWJlLkZsaXBSMlMgPSBbXTtcbkN1YmllQ3ViZS5Ud2lzdFIyUyA9IFtdO1xuQ3ViaWVDdWJlLkVQZXJtUjJTID0gW107XG5DdWJpZUN1YmUuU3ltU3RhdGVUd2lzdCA9IFtdO1xuQ3ViaWVDdWJlLlN5bVN0YXRlRmxpcCA9IFtdO1xuQ3ViaWVDdWJlLlN5bVN0YXRlUGVybSA9IFtdO1xuQ3ViaWVDdWJlLlVSRjEgPSBuZXcgQ3ViaWVDdWJlKDI1MzEsIDEzNzMsIDY3MDI2ODE5LCAxMzY3KTtcbkN1YmllQ3ViZS5VUkYyID0gbmV3IEN1YmllQ3ViZSgyMDg5LCAxOTA2LCAzMjI3NTI5MTMsIDIwNDApO1xuQ3ViaWVDdWJlLlVSRk1vdmUgPSBbXG4gICAgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxN10sXG4gICAgWzYsIDcsIDgsIDAsIDEsIDIsIDMsIDQsIDUsIDE1LCAxNiwgMTcsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF0sXG4gICAgWzMsIDQsIDUsIDYsIDcsIDgsIDAsIDEsIDIsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDksIDEwLCAxMV0sXG4gICAgWzIsIDEsIDAsIDUsIDQsIDMsIDgsIDcsIDYsIDExLCAxMCwgOSwgMTQsIDEzLCAxMiwgMTcsIDE2LCAxNV0sXG4gICAgWzgsIDcsIDYsIDIsIDEsIDAsIDUsIDQsIDMsIDE3LCAxNiwgMTUsIDExLCAxMCwgOSwgMTQsIDEzLCAxMl0sXG4gICAgWzUsIDQsIDMsIDgsIDcsIDYsIDIsIDEsIDAsIDE0LCAxMywgMTIsIDE3LCAxNiwgMTUsIDExLCAxMCwgOV0sXG5dO1xuIiwiaW1wb3J0IEN1YmllQ3ViZSBmcm9tIFwiLi9DdWJpZUN1YmVcIjtcbmltcG9ydCBDb29yZEN1YmUgZnJvbSBcIi4vQ29vcmRDdWJlXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi9VdGlsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2x2ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxlbmd0aDEgPSAwO1xuICAgICAgICB0aGlzLnVyZklkeCA9IDA7XG4gICAgICAgIHRoaXMuZGVwdGgxID0gMDtcbiAgICAgICAgQ3ViaWVDdWJlLkluaXQoKTtcbiAgICAgICAgQ29vcmRDdWJlLkluaXQoKTtcbiAgICAgICAgdGhpcy5tb3ZlID0gW107XG4gICAgICAgIHRoaXMubW92ZVNvbCA9IFtdO1xuICAgICAgICB0aGlzLm5vZGVVRCA9IFtdO1xuICAgICAgICB0aGlzLnZhbGlkMSA9IDA7XG4gICAgICAgIHRoaXMuYWxsb3dTaG9ydGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2MgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIHRoaXMudXJmQ3ViaWVDdWJlID0gW107XG4gICAgICAgIHRoaXMudXJmQ29vcmRDdWJlID0gW107XG4gICAgICAgIHRoaXMucGhhc2UxQ3ViaWUgPSBbXTtcbiAgICAgICAgdGhpcy5wcmVNb3ZlQ3ViZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcmVNb3ZlcyA9IFtdO1xuICAgICAgICB0aGlzLnByZU1vdmVMZW4gPSAwO1xuICAgICAgICB0aGlzLm1heFByZU1vdmVzID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVVRFtpXSA9IG5ldyBDb29yZEN1YmUoKTtcbiAgICAgICAgICAgIHRoaXMucGhhc2UxQ3ViaWVbaV0gPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudXJmQ3ViaWVDdWJlW2ldID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICAgICAgdGhpcy51cmZDb29yZEN1YmVbaV0gPSBuZXcgQ29vcmRDdWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTb2x2ZXIuTUFYX1BSRV9NT1ZFUzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnByZU1vdmVDdWJlc1tpICsgMV0gPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc29sdmUoZmFjZWxldHMpIHtcbiAgICAgICAgQ29vcmRDdWJlLkluaXQoKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLmNjLmRlc2VyaWFsaXplKGZhY2VsZXRzKTtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3I6IGludmFsaWQgY3ViZVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZlcmlmeSA9IHRoaXMuY2MudmVyaWZ5KCk7XG4gICAgICAgIGlmICh2ZXJpZnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3I6IFwiICsgdmVyaWZ5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29sID0gMjI7XG4gICAgICAgIHRoaXMubW92ZVNvbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5pdFNlYXJjaCgpO1xuICAgICAgICBjb25zdCBzb2x1dGlvbiA9IHRoaXMuc2VhcmNoKCk7XG4gICAgICAgIHJldHVybiBzb2x1dGlvbjtcbiAgICB9XG4gICAgaW5pdFNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5jb25qTWFzayA9IChTb2x2ZXIuVFJZX0lOVkVSU0UgPyAwIDogMHgzOCkgfCAoU29sdmVyLlRSWV9USFJFRV9BWEVTID8gMCA6IDB4MzYpO1xuICAgICAgICB0aGlzLm1heFByZU1vdmVzID0gdGhpcy5jb25qTWFzayA+IDcgPyAwIDogU29sdmVyLk1BWF9QUkVfTU9WRVM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVyZkN1YmllQ3ViZVtpXS5jb3B5KHRoaXMuY2MpO1xuICAgICAgICAgICAgdGhpcy51cmZDb29yZEN1YmVbaV0uc2V0V2l0aFBydW4odGhpcy51cmZDdWJpZUN1YmVbaV0sIDIwKTtcbiAgICAgICAgICAgIHRoaXMuY2MuVVJGQ29uanVnYXRlKCk7XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2MuaW52ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlYXJjaCgpIHtcbiAgICAgICAgZm9yICh0aGlzLmxlbmd0aDEgPSAwOyB0aGlzLmxlbmd0aDEgPCB0aGlzLnNvbDsgdGhpcy5sZW5ndGgxKyspIHtcbiAgICAgICAgICAgIGZvciAodGhpcy51cmZJZHggPSAwOyB0aGlzLnVyZklkeCA8IDY7IHRoaXMudXJmSWR4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuY29uak1hc2sgJiAoMSA8PCB0aGlzLnVyZklkeCkpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBoYXNlMVByZU1vdmVzKHRoaXMubWF4UHJlTW92ZXMsIC0zMCwgdGhpcy51cmZDdWJpZUN1YmVbdGhpcy51cmZJZHhdKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVTb2wgPT0gbnVsbCA/IFwiZXJyb3I6IG5vIHNvbHV0aW9uIGZvciBwcm9iXCIgOiB0aGlzLmdldFNvbHV0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVTb2wgPT0gbnVsbCA/IFwiZXJyb3I6IG5vIHNvbHV0aW9uIGZvciBkZXB0aFwiIDogdGhpcy5nZXRTb2x1dGlvbigpO1xuICAgIH1cbiAgICBnZXRTb2x1dGlvbigpIHtcbiAgICAgICAgbGV0IHJldCA9IFwiXCI7XG4gICAgICAgIGlmICghdGhpcy5tb3ZlU29sKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVyZiA9IHRoaXMudXJmSWR4O1xuICAgICAgICBpZiAodXJmIDwgMykge1xuICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCB0aGlzLm1vdmVTb2wubGVuZ3RoOyArK3MpIHtcbiAgICAgICAgICAgICAgICByZXQgKz0gVXRpbC5NT1ZFMlNUUltDdWJpZUN1YmUuVVJGTW92ZVt1cmZdW3RoaXMubW92ZVNvbFtzXV1dICsgXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzID0gdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDE7IHMgPj0gMDsgLS1zKSB7XG4gICAgICAgICAgICAgICAgcmV0ICs9IFV0aWwuTU9WRTJTVFJbQ3ViaWVDdWJlLlVSRk1vdmVbdXJmXVt0aGlzLm1vdmVTb2xbc11dXSArIFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIHBoYXNlMVByZU1vdmVzKG1heGwsIGxtLCBjYykge1xuICAgICAgICB0aGlzLnByZU1vdmVMZW4gPSB0aGlzLm1heFByZU1vdmVzIC0gbWF4bDtcbiAgICAgICAgaWYgKHRoaXMucHJlTW92ZUxlbiA9PSAwIHx8ICgoMHgzNmZiNyA+PiBsbSkgJiAxKSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlcHRoMSA9IHRoaXMubGVuZ3RoMSAtIHRoaXMucHJlTW92ZUxlbjtcbiAgICAgICAgICAgIHRoaXMucGhhc2UxQ3ViaWVbMF0uY29weShjYyk7XG4gICAgICAgICAgICB0aGlzLmFsbG93U2hvcnRlciA9IHRoaXMuZGVwdGgxID09IFNvbHZlci5NSU5fUDFMRU5HVEhfUFJFICYmIHRoaXMucHJlTW92ZUxlbiAhPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZVVEW3RoaXMuZGVwdGgxICsgMV0uc2V0V2l0aFBydW4oY2MsIHRoaXMuZGVwdGgxKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMucGhhc2UxKHRoaXMubm9kZVVEW3RoaXMuZGVwdGgxICsgMV0sIHRoaXMuZGVwdGgxLCAtMSkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtYXhsID09IDAgfHwgdGhpcy5wcmVNb3ZlTGVuICsgU29sdmVyLk1JTl9QMUxFTkdUSF9QUkUgPj0gdGhpcy5sZW5ndGgxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2tpcE1vdmVzID0gMDtcbiAgICAgICAgaWYgKG1heGwgPT0gMSB8fCB0aGlzLnByZU1vdmVMZW4gKyAxICsgU29sdmVyLk1JTl9QMUxFTkdUSF9QUkUgPj0gdGhpcy5sZW5ndGgxKSB7XG4gICAgICAgICAgICBza2lwTW92ZXMgfD0gMHgzNmZiNztcbiAgICAgICAgfVxuICAgICAgICBsbSA9IH5+KGxtIC8gMykgKiAzO1xuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDE4OyBtKyspIHtcbiAgICAgICAgICAgIGlmIChtID09IGxtIHx8IG0gPT0gbG0gLSA5IHx8IG0gPT0gbG0gKyA5KSB7XG4gICAgICAgICAgICAgICAgbSArPSAyO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChza2lwTW92ZXMgJiAoMSA8PCBtKSkgIT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0KEN1YmllQ3ViZS5Nb3ZlQ3ViZVttXSwgY2MsIHRoaXMucHJlTW92ZUN1YmVzW21heGxdKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChDdWJpZUN1YmUuTW92ZUN1YmVbbV0sIGNjLCB0aGlzLnByZU1vdmVDdWJlc1ttYXhsXSk7XG4gICAgICAgICAgICB0aGlzLnByZU1vdmVzW3RoaXMubWF4UHJlTW92ZXMgLSBtYXhsXSA9IG07XG4gICAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLnBoYXNlMVByZU1vdmVzKG1heGwgLSAxLCBtLCB0aGlzLnByZU1vdmVDdWJlc1ttYXhsXSk7XG4gICAgICAgICAgICBpZiAocmV0ID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcGhhc2UxKG5vZGUsIG1heGwsIGxtKSB7XG4gICAgICAgIGlmIChub2RlLnBydW4gPT0gMCAmJiBtYXhsIDwgNSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dTaG9ydGVyIHx8IG1heGwgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVwdGgxIC09IG1heGw7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gdGhpcy5pbml0UGhhc2UyUHJlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXB0aDEgKz0gbWF4bDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgYXhpcyA9IDA7IGF4aXMgPCAxODsgYXhpcyArPSAzKSB7XG4gICAgICAgICAgICBpZiAoYXhpcyA9PSBsbSB8fCBheGlzID09IGxtIC0gOSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcG93ZXIgPSAwOyBwb3dlciA8IDM7IHBvd2VyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gYXhpcyArIHBvd2VyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBydW4gPSB0aGlzLm5vZGVVRFttYXhsXS5kb01vdmVQcnVuKG5vZGUsIG0pO1xuICAgICAgICAgICAgICAgIGlmIChwcnVuID4gbWF4bCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJ1biA9PSBtYXhsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVbdGhpcy5kZXB0aDEgLSBtYXhsXSA9IG07XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZDEgPSBNYXRoLm1pbih0aGlzLnZhbGlkMSwgdGhpcy5kZXB0aDEgLSBtYXhsKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLnBoYXNlMSh0aGlzLm5vZGVVRFttYXhsXSwgbWF4bCAtIDEsIGF4aXMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0ID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpbml0UGhhc2UyUHJlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy52YWxpZDE7IGkgPCB0aGlzLmRlcHRoMTsgaSsrKSB7XG4gICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQodGhpcy5waGFzZTFDdWJpZVtpXSwgQ3ViaWVDdWJlLk1vdmVDdWJlW3RoaXMubW92ZVtpXV0sIHRoaXMucGhhc2UxQ3ViaWVbaSArIDFdKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdCh0aGlzLnBoYXNlMUN1YmllW2ldLCBDdWJpZUN1YmUuTW92ZUN1YmVbdGhpcy5tb3ZlW2ldXSwgdGhpcy5waGFzZTFDdWJpZVtpICsgMV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsaWQxID0gdGhpcy5kZXB0aDE7XG4gICAgICAgIGxldCByZXQgPSB0aGlzLmluaXRQaGFzZTIodGhpcy5waGFzZTFDdWJpZVt0aGlzLmRlcHRoMV0pO1xuICAgICAgICBpZiAocmV0ID09IDAgfHwgdGhpcy5wcmVNb3ZlTGVuID09IDAgfHwgcmV0ID09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbSA9IH5+KHRoaXMucHJlTW92ZXNbdGhpcy5wcmVNb3ZlTGVuIC0gMV0gLyAzKSAqIDMgKyAxO1xuICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQoQ3ViaWVDdWJlLk1vdmVDdWJlW21dLCB0aGlzLnBoYXNlMUN1YmllW3RoaXMuZGVwdGgxXSwgdGhpcy5waGFzZTFDdWJpZVt0aGlzLmRlcHRoMSArIDFdKTtcbiAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KEN1YmllQ3ViZS5Nb3ZlQ3ViZVttXSwgdGhpcy5waGFzZTFDdWJpZVt0aGlzLmRlcHRoMV0sIHRoaXMucGhhc2UxQ3ViaWVbdGhpcy5kZXB0aDEgKyAxXSk7XG4gICAgICAgIHRoaXMucHJlTW92ZXNbdGhpcy5wcmVNb3ZlTGVuIC0gMV0gKz0gMiAtICh0aGlzLnByZU1vdmVzW3RoaXMucHJlTW92ZUxlbiAtIDFdICUgMykgKiAyO1xuICAgICAgICByZXQgPSB0aGlzLmluaXRQaGFzZTIodGhpcy5waGFzZTFDdWJpZVt0aGlzLmRlcHRoMSArIDFdKTtcbiAgICAgICAgdGhpcy5wcmVNb3Zlc1t0aGlzLnByZU1vdmVMZW4gLSAxXSArPSAyIC0gKHRoaXMucHJlTW92ZXNbdGhpcy5wcmVNb3ZlTGVuIC0gMV0gJSAzKSAqIDI7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGluaXRQaGFzZTIocGhhc2UyQ3ViaWUpIHtcbiAgICAgICAgbGV0IHAyY29ybiA9IHBoYXNlMkN1YmllLkNQZXJtU3ltO1xuICAgICAgICBjb25zdCBwMmNzeW0gPSBwMmNvcm4gJiAweGY7XG4gICAgICAgIHAyY29ybiA+Pj0gNDtcbiAgICAgICAgbGV0IHAyZWRnZSA9IHBoYXNlMkN1YmllLkVQZXJtU3ltO1xuICAgICAgICBjb25zdCBwMmVzeW0gPSBwMmVkZ2UgJiAweGY7XG4gICAgICAgIHAyZWRnZSA+Pj0gNDtcbiAgICAgICAgY29uc3QgcDJtaWQgPSBwaGFzZTJDdWJpZS5NUGVybTtcbiAgICAgICAgY29uc3QgcDJlZGdlaSA9IEN1YmllQ3ViZS5HZXRQZXJtU3ltSW52KHAyZWRnZSwgcDJlc3ltLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHAyY29ybmkgPSBDdWJpZUN1YmUuR2V0UGVybVN5bUludihwMmNvcm4sIHAyY3N5bSwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHBydW4gPSBNYXRoLm1heChDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuTUNQZXJtUHJ1biwgcDJjb3JuICogQ29vcmRDdWJlLk5fTVBFUk0gKyBDb29yZEN1YmUuTVBlcm1Db25qW3AybWlkXVtwMmNzeW1dKSwgQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biwgcDJlZGdlICogQ29vcmRDdWJlLk5fQ09NQiArXG4gICAgICAgICAgICBDb29yZEN1YmUuQ0NvbWJQQ29ualtDdWJpZUN1YmUuUGVybTJDb21iUFtwMmNvcm5dICYgMHhmZl1bQ3ViaWVDdWJlLlN5bU11bHRJbnZbcDJlc3ltXVtwMmNzeW1dXSksIENvb3JkQ3ViZS5HZXRQcnVuaW5nKENvb3JkQ3ViZS5FUGVybUNDb21iUFBydW4sIChwMmVkZ2VpID4+IDQpICogQ29vcmRDdWJlLk5fQ09NQiArXG4gICAgICAgICAgICBDb29yZEN1YmUuQ0NvbWJQQ29ualtDdWJpZUN1YmUuUGVybTJDb21iUFtwMmNvcm5pID4+IDRdICYgMHhmZl1bQ3ViaWVDdWJlLlN5bU11bHRJbnZbcDJlZGdlaSAmIDB4Zl1bcDJjb3JuaSAmIDB4Zl1dKSk7XG4gICAgICAgIGNvbnN0IG1heERlcDIgPSBNYXRoLm1pbihTb2x2ZXIuTUFYX0RFUFRIMiwgdGhpcy5zb2wgLSB0aGlzLmxlbmd0aDEpO1xuICAgICAgICBpZiAocHJ1biA+PSBtYXhEZXAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJ1biA+IG1heERlcDIgPyAyIDogMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVwdGgyO1xuICAgICAgICBmb3IgKGRlcHRoMiA9IG1heERlcDIgLSAxOyBkZXB0aDIgPj0gcHJ1bjsgZGVwdGgyLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IHRoaXMucGhhc2UyKHAyZWRnZSwgcDJlc3ltLCBwMmNvcm4sIHAyY3N5bSwgcDJtaWQsIGRlcHRoMiwgdGhpcy5kZXB0aDEsIDEwKTtcbiAgICAgICAgICAgIGlmIChyZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXB0aDIgLT0gcmV0O1xuICAgICAgICAgICAgdGhpcy5tb3ZlU29sID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGVwdGgxICsgZGVwdGgyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNvbE1vdmUodGhpcy5tb3ZlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnByZU1vdmVMZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU29sTW92ZSh0aGlzLnByZU1vdmVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29sID0gdGhpcy5tb3ZlU29sLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVwdGgyICE9IG1heERlcDIgLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZFNvbE1vdmUobW92ZSkge1xuICAgICAgICBpZiAoIXRoaXMubW92ZVNvbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdmVTb2wubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVNvbC5wdXNoKG1vdmUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF4aXNDdXIgPSB+fihtb3ZlIC8gMyk7XG4gICAgICAgIGNvbnN0IGF4aXNMYXN0ID0gfn4odGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAxXSAvIDMpO1xuICAgICAgICBpZiAoYXhpc0N1ciA9PSBheGlzTGFzdCkge1xuICAgICAgICAgICAgY29uc3QgcG93ID0gKChtb3ZlICUgMykgKyAodGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAxXSAlIDMpICsgMSkgJSA0O1xuICAgICAgICAgICAgaWYgKHBvdyA9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU29sLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAxXSA9IGF4aXNDdXIgKiAzICsgcG93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdmVTb2wubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgYXhpc0N1ciAlIDMgPT0gYXhpc0xhc3QgJSAzICYmXG4gICAgICAgICAgICBheGlzQ3VyID09IH5+KHRoaXMubW92ZVNvbFt0aGlzLm1vdmVTb2wubGVuZ3RoIC0gMl0gLyAzKSkge1xuICAgICAgICAgICAgY29uc3QgcG93ID0gKChtb3ZlICUgMykgKyAodGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAyXSAlIDMpICsgMSkgJSA0O1xuICAgICAgICAgICAgaWYgKHBvdyA9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAyXSA9IHRoaXMubW92ZVNvbFt0aGlzLm1vdmVTb2wubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU29sLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAyXSA9IGF4aXNDdXIgKiAzICsgcG93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZVNvbC5wdXNoKG1vdmUpO1xuICAgIH1cbiAgICBwaGFzZTIoZWRnZSwgZXN5bSwgY29ybiwgY3N5bSwgbWlkLCBtYXhsLCBkZXB0aCwgbG0pIHtcbiAgICAgICAgaWYgKGVkZ2UgPT0gMCAmJiBjb3JuID09IDAgJiYgbWlkID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXhsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vdmVNYXNrID0gVXRpbC5DS01WMkJJVFtsbV07XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTA7IG0rKykge1xuICAgICAgICAgICAgaWYgKCgobW92ZU1hc2sgPj4gbSkgJiAxKSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgbSArPSAoMHg0MiA+PiBtKSAmIDM7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtaWR4ID0gQ29vcmRDdWJlLk1QZXJtTW92ZVttaWRdW21dO1xuICAgICAgICAgICAgbGV0IGNvcm54ID0gQ29vcmRDdWJlLkNQZXJtTW92ZVtjb3JuXVtDdWJpZUN1YmUuU3ltTW92ZVVEW2NzeW1dW21dXTtcbiAgICAgICAgICAgIGNvbnN0IGNzeW14ID0gQ3ViaWVDdWJlLlN5bU11bHRbY29ybnggJiAweGZdW2NzeW1dO1xuICAgICAgICAgICAgY29ybnggPj49IDQ7XG4gICAgICAgICAgICBsZXQgZWRnZXggPSBDb29yZEN1YmUuRVBlcm1Nb3ZlW2VkZ2VdW0N1YmllQ3ViZS5TeW1Nb3ZlVURbZXN5bV1bbV1dO1xuICAgICAgICAgICAgY29uc3QgZXN5bXggPSBDdWJpZUN1YmUuU3ltTXVsdFtlZGdleCAmIDB4Zl1bZXN5bV07XG4gICAgICAgICAgICBlZGdleCA+Pj0gNDtcbiAgICAgICAgICAgIGNvbnN0IGVkZ2VpID0gQ3ViaWVDdWJlLkdldFBlcm1TeW1JbnYoZWRnZXgsIGVzeW14LCBmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCBjb3JuaSA9IEN1YmllQ3ViZS5HZXRQZXJtU3ltSW52KGNvcm54LCBjc3lteCwgdHJ1ZSk7XG4gICAgICAgICAgICBsZXQgcHJ1biA9IENvb3JkQ3ViZS5HZXRQcnVuaW5nKENvb3JkQ3ViZS5FUGVybUNDb21iUFBydW4sIChlZGdlaSA+PiA0KSAqIENvb3JkQ3ViZS5OX0NPTUIgK1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBDb25qW0N1YmllQ3ViZS5QZXJtMkNvbWJQW2Nvcm5pID4+IDRdICYgMHhmZl1bQ3ViaWVDdWJlLlN5bU11bHRJbnZbZWRnZWkgJiAweGZdW2Nvcm5pICYgMHhmXV0pO1xuICAgICAgICAgICAgaWYgKHBydW4gPiBtYXhsICsgMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJ1biA+PSBtYXhsKSB7XG4gICAgICAgICAgICAgICAgbSArPSAoMHg0MiA+PiBtKSAmIDMgJiAobWF4bCAtIHBydW4pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJ1biA9IE1hdGgubWF4KENvb3JkQ3ViZS5HZXRQcnVuaW5nKENvb3JkQ3ViZS5FUGVybUNDb21iUFBydW4sIGVkZ2V4ICogQ29vcmRDdWJlLk5fQ09NQiArXG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLkNDb21iUENvbmpbQ3ViaWVDdWJlLlBlcm0yQ29tYlBbY29ybnhdICYgMHhmZl1bQ3ViaWVDdWJlLlN5bU11bHRJbnZbZXN5bXhdW2NzeW14XV0pLCBDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuTUNQZXJtUHJ1biwgY29ybnggKiBDb29yZEN1YmUuTl9NUEVSTSArIENvb3JkQ3ViZS5NUGVybUNvbmpbbWlkeF1bY3N5bXhdKSk7XG4gICAgICAgICAgICBpZiAocHJ1biA+PSBtYXhsKSB7XG4gICAgICAgICAgICAgICAgbSArPSAoMHg0MiA+PiBtKSAmIDMgJiAobWF4bCAtIHBydW4pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmV0ID0gdGhpcy5waGFzZTIoZWRnZXgsIGVzeW14LCBjb3JueCwgY3N5bXgsIG1pZHgsIG1heGwgLSAxLCBkZXB0aCArIDEsIG0pO1xuICAgICAgICAgICAgaWYgKHJldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlW2RlcHRoXSA9IFV0aWwuVUQyU1REW21dO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cblNvbHZlci5NQVhfUFJFX01PVkVTID0gMjA7XG5Tb2x2ZXIuVFJZX0lOVkVSU0UgPSB0cnVlO1xuU29sdmVyLlRSWV9USFJFRV9BWEVTID0gdHJ1ZTtcblNvbHZlci5NSU5fUDFMRU5HVEhfUFJFID0gNztcblNvbHZlci5NQVhfREVQVEgyID0gMTM7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsIHtcbiAgICBzdGF0aWMgR2V0TlBhcml0eShpZHgsIG4pIHtcbiAgICAgICAgbGV0IHAgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gbiAtIDI7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBwIF49IGlkeCAlIChuIC0gaSk7XG4gICAgICAgICAgICBpZHggPSB+fihpZHggLyAobiAtIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcCAmIDE7XG4gICAgfVxuICAgIHN0YXRpYyBTZXRWYWwoc3JjLCBkc3QsIGVkZ2UpIHtcbiAgICAgICAgcmV0dXJuIGVkZ2UgPyAoZHN0IDw8IDEpIHwgKHNyYyAmIDEpIDogZHN0IHwgKHNyYyAmIDB4ZjgpO1xuICAgIH1cbiAgICBzdGF0aWMgR2V0VmFsKHNyYywgZWRnZSkge1xuICAgICAgICByZXR1cm4gZWRnZSA/IHNyYyA+PiAxIDogc3JjICYgNztcbiAgICB9XG4gICAgc3RhdGljIFNldE5QZXJtKGFyciwgaWR4LCBuLCBlZGdlKSB7XG4gICAgICAgIG4tLTtcbiAgICAgICAgbGV0IHZhbCA9IDB4NzY1NDMyMTA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gVXRpbC5GYWN0W24gLSBpXTtcbiAgICAgICAgICAgIGxldCB2ID0gfn4oaWR4IC8gcCk7XG4gICAgICAgICAgICBpZHggJT0gcDtcbiAgICAgICAgICAgIHYgPDw9IDI7XG4gICAgICAgICAgICBhcnJbaV0gPSBVdGlsLlNldFZhbChhcnJbaV0sICh2YWwgPj4gdikgJiAweGYsIGVkZ2UpO1xuICAgICAgICAgICAgY29uc3QgbSA9ICgxIDw8IHYpIC0gMTtcbiAgICAgICAgICAgIHZhbCA9ICh2YWwgJiBtKSArICgodmFsID4+IDQpICYgfm0pO1xuICAgICAgICB9XG4gICAgICAgIGFycltuXSA9IFV0aWwuU2V0VmFsKGFycltuXSwgdmFsICYgMHhmLCBlZGdlKTtcbiAgICB9XG4gICAgc3RhdGljIEdldE5QZXJtKGFyciwgbiwgZWRnZSkge1xuICAgICAgICBsZXQgaWR4ID0gMCwgdmFsID0gMHg3NjU0MzIxMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuIC0gMTsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gVXRpbC5HZXRWYWwoYXJyW2ldLCBlZGdlKSA8PCAyO1xuICAgICAgICAgICAgaWR4ID0gKG4gLSBpKSAqIGlkeCArICgodmFsID4+IHYpICYgMHhmKTtcbiAgICAgICAgICAgIHZhbCAtPSAweDExMTExMTEwIDw8IHY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgc3RhdGljIFNldE5QZXJtRnVsbChhcnIsIGlkeCwgbiwgZWRnZSkge1xuICAgICAgICBhcnJbbiAtIDFdID0gVXRpbC5TZXRWYWwoYXJyW24gLSAxXSwgMCwgZWRnZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSBuIC0gMjsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGFycltpXSA9IFV0aWwuU2V0VmFsKGFycltpXSwgaWR4ICUgKG4gLSBpKSwgZWRnZSk7XG4gICAgICAgICAgICBpZHggPSB+fihpZHggLyAobiAtIGkpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IG47ICsraikge1xuICAgICAgICAgICAgICAgIGlmIChVdGlsLkdldFZhbChhcnJbal0sIGVkZ2UpID49IFV0aWwuR2V0VmFsKGFycltpXSwgZWRnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyW2pdID0gVXRpbC5TZXRWYWwoYXJyW2pdLCBVdGlsLkdldFZhbChhcnJbal0sIGVkZ2UpICsgMSwgZWRnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBHZXROUGVybUZ1bGwoYXJyLCBuLCBlZGdlKSB7XG4gICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgaWR4ICo9IG4gLSBpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbjsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuR2V0VmFsKGFycltqXSwgZWRnZSkgPCBVdGlsLkdldFZhbChhcnJbaV0sIGVkZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICsraWR4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cbiAgICBzdGF0aWMgR2V0Q29tYihhcnIsIG1hc2ssIGVkZ2UpIHtcbiAgICAgICAgY29uc3QgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCB2YWx1ZSA9IDAsIHIgPSA0O1xuICAgICAgICBmb3IgKGxldCBpID0gZW5kOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgcGVybSA9IFV0aWwuR2V0VmFsKGFycltpXSwgZWRnZSk7XG4gICAgICAgICAgICBpZiAoKHBlcm0gJiAweGMpID09IG1hc2spIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBVdGlsLkNua1tpXVtyLS1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIFNldENvbWIoYXJyLCB2YWx1ZSwgbWFzaywgZWRnZSkge1xuICAgICAgICBjb25zdCBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IHIgPSA0LCBmaWxsID0gZW5kO1xuICAgICAgICBmb3IgKGxldCBpID0gZW5kOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID49IFV0aWwuQ25rW2ldW3JdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgLT0gVXRpbC5DbmtbaV1bci0tXTtcbiAgICAgICAgICAgICAgICBhcnJbaV0gPSBVdGlsLlNldFZhbChhcnJbaV0sIHIgfCBtYXNrLCBlZGdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoZmlsbCAmIDB4YykgPT0gbWFzaykge1xuICAgICAgICAgICAgICAgICAgICBmaWxsIC09IDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFycltpXSA9IFV0aWwuU2V0VmFsKGFycltpXSwgZmlsbC0tLCBlZGdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblV0aWwuVXgxID0gMDtcblV0aWwuVXgyID0gMTtcblV0aWwuVXgzID0gMjtcblV0aWwuUngxID0gMztcblV0aWwuUngyID0gNDtcblV0aWwuUngzID0gNTtcblV0aWwuRngxID0gNjtcblV0aWwuRngyID0gNztcblV0aWwuRngzID0gODtcblV0aWwuRHgxID0gOTtcblV0aWwuRHgyID0gMTA7XG5VdGlsLkR4MyA9IDExO1xuVXRpbC5MeDEgPSAxMjtcblV0aWwuTHgyID0gMTM7XG5VdGlsLkx4MyA9IDE0O1xuVXRpbC5CeDEgPSAxNTtcblV0aWwuQngyID0gMTY7XG5VdGlsLkJ4MyA9IDE3O1xuVXRpbC5VMSA9IDA7XG5VdGlsLlUyID0gMTtcblV0aWwuVTMgPSAyO1xuVXRpbC5VNCA9IDM7XG5VdGlsLlU1ID0gNDtcblV0aWwuVTYgPSA1O1xuVXRpbC5VNyA9IDY7XG5VdGlsLlU4ID0gNztcblV0aWwuVTkgPSA4O1xuVXRpbC5SMSA9IDk7XG5VdGlsLlIyID0gMTA7XG5VdGlsLlIzID0gMTE7XG5VdGlsLlI0ID0gMTI7XG5VdGlsLlI1ID0gMTM7XG5VdGlsLlI2ID0gMTQ7XG5VdGlsLlI3ID0gMTU7XG5VdGlsLlI4ID0gMTY7XG5VdGlsLlI5ID0gMTc7XG5VdGlsLkYxID0gMTg7XG5VdGlsLkYyID0gMTk7XG5VdGlsLkYzID0gMjA7XG5VdGlsLkY0ID0gMjE7XG5VdGlsLkY1ID0gMjI7XG5VdGlsLkY2ID0gMjM7XG5VdGlsLkY3ID0gMjQ7XG5VdGlsLkY4ID0gMjU7XG5VdGlsLkY5ID0gMjY7XG5VdGlsLkQxID0gMjc7XG5VdGlsLkQyID0gMjg7XG5VdGlsLkQzID0gMjk7XG5VdGlsLkQ0ID0gMzA7XG5VdGlsLkQ1ID0gMzE7XG5VdGlsLkQ2ID0gMzI7XG5VdGlsLkQ3ID0gMzM7XG5VdGlsLkQ4ID0gMzQ7XG5VdGlsLkQ5ID0gMzU7XG5VdGlsLkwxID0gMzY7XG5VdGlsLkwyID0gMzc7XG5VdGlsLkwzID0gMzg7XG5VdGlsLkw0ID0gMzk7XG5VdGlsLkw1ID0gNDA7XG5VdGlsLkw2ID0gNDE7XG5VdGlsLkw3ID0gNDI7XG5VdGlsLkw4ID0gNDM7XG5VdGlsLkw5ID0gNDQ7XG5VdGlsLkIxID0gNDU7XG5VdGlsLkIyID0gNDY7XG5VdGlsLkIzID0gNDc7XG5VdGlsLkI0ID0gNDg7XG5VdGlsLkI1ID0gNDk7XG5VdGlsLkI2ID0gNTA7XG5VdGlsLkI3ID0gNTE7XG5VdGlsLkI4ID0gNTI7XG5VdGlsLkI5ID0gNTM7XG5VdGlsLlUgPSAwO1xuVXRpbC5SID0gMTtcblV0aWwuRiA9IDI7XG5VdGlsLkQgPSAzO1xuVXRpbC5MID0gNDtcblV0aWwuQiA9IDU7XG5VdGlsLkNvcm5lckZhY2VsZXQgPSBbXG4gICAgW1V0aWwuVTksIFV0aWwuUjEsIFV0aWwuRjNdLFxuICAgIFtVdGlsLlU3LCBVdGlsLkYxLCBVdGlsLkwzXSxcbiAgICBbVXRpbC5VMSwgVXRpbC5MMSwgVXRpbC5CM10sXG4gICAgW1V0aWwuVTMsIFV0aWwuQjEsIFV0aWwuUjNdLFxuICAgIFtVdGlsLkQzLCBVdGlsLkY5LCBVdGlsLlI3XSxcbiAgICBbVXRpbC5EMSwgVXRpbC5MOSwgVXRpbC5GN10sXG4gICAgW1V0aWwuRDcsIFV0aWwuQjksIFV0aWwuTDddLFxuICAgIFtVdGlsLkQ5LCBVdGlsLlI5LCBVdGlsLkI3XSxcbl07XG5VdGlsLkVkZ2VGYWNlbGV0ID0gW1xuICAgIFtVdGlsLlU2LCBVdGlsLlIyXSxcbiAgICBbVXRpbC5VOCwgVXRpbC5GMl0sXG4gICAgW1V0aWwuVTQsIFV0aWwuTDJdLFxuICAgIFtVdGlsLlUyLCBVdGlsLkIyXSxcbiAgICBbVXRpbC5ENiwgVXRpbC5SOF0sXG4gICAgW1V0aWwuRDIsIFV0aWwuRjhdLFxuICAgIFtVdGlsLkQ0LCBVdGlsLkw4XSxcbiAgICBbVXRpbC5EOCwgVXRpbC5COF0sXG4gICAgW1V0aWwuRjYsIFV0aWwuUjRdLFxuICAgIFtVdGlsLkY0LCBVdGlsLkw2XSxcbiAgICBbVXRpbC5CNiwgVXRpbC5MNF0sXG4gICAgW1V0aWwuQjQsIFV0aWwuUjZdLFxuXTtcblV0aWwuTU9WRTJTVFIgPSBbXG4gICAgXCJVIFwiLFxuICAgIFwiVTJcIixcbiAgICBcIlUnXCIsXG4gICAgXCJSIFwiLFxuICAgIFwiUjJcIixcbiAgICBcIlInXCIsXG4gICAgXCJGIFwiLFxuICAgIFwiRjJcIixcbiAgICBcIkYnXCIsXG4gICAgXCJEIFwiLFxuICAgIFwiRDJcIixcbiAgICBcIkQnXCIsXG4gICAgXCJMIFwiLFxuICAgIFwiTDJcIixcbiAgICBcIkwnXCIsXG4gICAgXCJCIFwiLFxuICAgIFwiQjJcIixcbiAgICBcIkInXCIsXG5dO1xuVXRpbC5VRDJTVEQgPSBbXG4gICAgVXRpbC5VeDEsXG4gICAgVXRpbC5VeDIsXG4gICAgVXRpbC5VeDMsXG4gICAgVXRpbC5SeDIsXG4gICAgVXRpbC5GeDIsXG4gICAgVXRpbC5EeDEsXG4gICAgVXRpbC5EeDIsXG4gICAgVXRpbC5EeDMsXG4gICAgVXRpbC5MeDIsXG4gICAgVXRpbC5CeDIsXG4gICAgVXRpbC5SeDEsXG4gICAgVXRpbC5SeDMsXG4gICAgVXRpbC5GeDEsXG4gICAgVXRpbC5GeDMsXG4gICAgVXRpbC5MeDEsXG4gICAgVXRpbC5MeDMsXG4gICAgVXRpbC5CeDEsXG4gICAgVXRpbC5CeDMsXG5dO1xuVXRpbC5TVEQyVUQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICByZXN1bHRbVXRpbC5VRDJTVERbaV1dID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0pKCk7XG5VdGlsLkNLTVYyQklUID0gKCgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgaXggPSB+fihVdGlsLlVEMlNURFtpXSAvIDMpO1xuICAgICAgICByZXN1bHRbaV0gPSAwO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGp4ID0gfn4oVXRpbC5VRDJTVERbal0gLyAzKTtcbiAgICAgICAgICAgIHJlc3VsdFtpXSB8PSAoaXggPT0ganggfHwgKGl4ICUgMyA9PSBqeCAlIDMgJiYgaXggPj0gangpID8gMSA6IDApIDw8IGo7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0WzEwXSA9IDA7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0pKCk7XG5VdGlsLkNuayA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmV0ID0gW107XG4gICAgY29uc3QgZmFjdCA9IFsxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEzOyBpKyspIHtcbiAgICAgICAgcmV0W2ldID0gW107XG4gICAgICAgIGZhY3RbaSArIDFdID0gZmFjdFtpXSAqIChpICsgMSk7XG4gICAgICAgIHJldFtpXVswXSA9IHJldFtpXVtpXSA9IDE7XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgcmV0W2ldW2pdID0gaiA8PSBpID8gcmV0W2kgLSAxXVtqIC0gMV0gKyByZXRbaSAtIDFdW2pdIDogMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufSkoKTtcblV0aWwuRmFjdCA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmV0ID0gWzFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTM7IGkrKykge1xuICAgICAgICByZXRbaSArIDFdID0gcmV0W2ldICogKGkgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn0pKCk7XG4iLCJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIFByb3ZpZGUsIFJlZiwgV2F0Y2ggfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuLi92aWV3cG9ydFwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi8uLi9jdWJlL3dvcmxkXCI7XG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi4vc2V0dGluZ1wiO1xuaW1wb3J0IFNvbHZlciBmcm9tIFwiLi4vLi4vc29sdmVyL1NvbHZlclwiO1xubGV0IFBsYXlncm91bmQgPSBjbGFzcyBQbGF5Z3JvdW5kIGV4dGVuZHMgVnVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvbHZlciA9IG5ldyBTb2x2ZXIoKTtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kbmV4dFRpY2sodGhpcy5yZXNpemUpO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLmNlaWwoTWF0aC5taW4odGhpcy53aWR0aCAvIDYsIHRoaXMuaGVpZ2h0IC8gMTIpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgLSB0aGlzLnNpemUgKiAyLjUpO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBzY3JhbWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUuc2NyYW1ibGUoKTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMud29ybGQuY3ViZS5yZXNldCgpO1xuICAgIH1cbiAgICBzb2x2ZSgpIHtcbiAgICAgICAgdGhpcy5pc1BsYXllck1vZGUgPSB0cnVlO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMud29ybGQuY3ViZS5zZXJpYWxpemUoKTtcbiAgICAgICAgdGhpcy5zb2x1dGlvbiA9IHRoaXMuc29sdmVyLnNvbHZlKHN0YXRlKS5zcGxpdCgnICcpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSAwO1xuICAgIH1cbiAgICBvblBsYXlpbmdDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMud29ybGQuY29udHJvbGxlci5kaXNhYmxlID0gdGhpcy5pc1BsYXllck1vZGU7XG4gICAgfVxuICAgIHBsYXkoKSB7XG4gICAgfVxuICAgIHBhdXNlKCkge1xuICAgIH1cbiAgICBxdWl0KCkge1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHByb2dyZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XG4gICAgfVxuICAgIHRodW1iX2xhYmVsX3Nsb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcyA9PSAwID8gJyMnIDogdGhpcy5zb2x1dGlvblt0aGlzLl9wcm9ncmVzcyAtIDFdO1xuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICBQcm92aWRlKFwid29ybGRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIE9iamVjdClcbl0sIFBsYXlncm91bmQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICBSZWYoXCJ2aWV3cG9ydFwiKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgVmlld3BvcnQpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ2aWV3cG9ydFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgV2F0Y2goXCJpc1BsYXllck1vZGVcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJvblBsYXlpbmdDaGFuZ2VcIiwgbnVsbCk7XG5QbGF5Z3JvdW5kID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIHZpZXdwb3J0OiBWaWV3cG9ydCxcbiAgICAgICAgICAgIHNldHRpbmc6IFNldHRpbmcsXG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCB7IGN1YmVfY29uZmlnIH0gZnJvbSBcIi4uLy4uL2N1YmUvdXRpbHNcIjtcbmltcG9ydCBWdWVTbGlkZXIgZnJvbSAndnVlLXNsaWRlci1jb21wb25lbnQnO1xuaW1wb3J0ICd2dWUtc2xpZGVyLWNvbXBvbmVudC90aGVtZS9kZWZhdWx0LmNzcyc7XG5sZXQgU2V0dGluZyA9IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLnN0YXRlID0gZmFsc2U7XG4gICAgfVxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLmNlaWwoTWF0aC5taW4odGhpcy53aWR0aCAvIDYsIHRoaXMuaGVpZ2h0IC8gMTIpKTtcbiAgICB9XG4gICAgZ2V0IHNlbnNpYmlsaXR5KCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuc2Vuc2liaWxpdHkgKiAxZTQ7XG4gICAgfVxuICAgIHNldCBzZW5zaWJpbGl0eSh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSA9IHZhbHVlICogMWUtNDtcbiAgICB9XG4gICAgZ2V0IGZyYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGN1YmVfY29uZmlnLmZyYW1lcztcbiAgICB9XG4gICAgc2V0IGZyYW1lcyh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5mcmFtZXMgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHNjcmFtYmxlX3N0ZXBzKCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuc2NyYW1ibGVfc3RlcHM7XG4gICAgfVxuICAgIHNldCBzY3JhbWJsZV9zdGVwcyh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zY3JhbWJsZV9zdGVwcyA9IHZhbHVlO1xuICAgIH1cbn07XG5TZXR0aW5nID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFZ1ZVNsaWRlclxuICAgICAgICB9XG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgU2V0dGluZyk7XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuLi8uLi9jdWJlL2ludGVyYWN0b3JcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vY3ViZS93b3JsZFwiO1xubGV0IFZpZXdwb3J0ID0gY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgICAgICBjYW52YXM6IGNhbnZhc0VsZW0sXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICAgICAgICBhbHBoYTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDAsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBpZiAodGhpcy53b3JsZC5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy53b3JsZC5zY2VuZSwgdGhpcy53b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgdGhpcy53b3JsZC5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIEluamVjdChcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwiY2FudmFzXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBIVE1MRWxlbWVudClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJjYW52YXNcIiwgdm9pZCAwKTtcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIH0pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbXSlcbl0sIFZpZXdwb3J0KTtcbmV4cG9ydCBkZWZhdWx0IFZpZXdwb3J0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9