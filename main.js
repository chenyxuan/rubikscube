/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <div v-resize=\"resize\" style=\"user-select: none; touch-action: none;\">\n        <setting ref=\"setting\"></setting>\n        <viewport ref=\"viewport\"></viewport>\n        <v-card flat style=\"margin: auto; touch-action: none; user-select: none;\">\n            <v-container fluid grid-list-md text-xs-center\n                :style=\"{width: Math.min(size * 10, width) + 'px', height: size * 4 + 'px'}\">\n\n                <v-layout row wrap v-if=\"!isPlayerMode\">\n                    <v-flex xs12 :style=\"{\n                            'padding-left': size / 2 + 'px',\n                            'padding-right': size / 2 + 'px',\n                            'padding-top': size * 0.2 + 'px',\n                            'font-size': size * 0.3 + 'px',\n                            'height':size + 'px'\n                        }\">\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"scramble\" block text :ripple=\"false\" color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Scramble\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"reset\" block text :ripple=\"false\" color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Reset\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"solve\" block text :ripple=\"false\" color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Solve\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n                <v-layout row wrap v-else>\n                    <v-flex xs12 :style=\"{\n                            'padding-left': size / 2 + 'px',\n                            'padding-right': size / 2 + 'px',\n                            'padding-top': size * 0.2 + 'px',\n                            'font-size': size * 0.3 + 'px',\n                            'height': size + 'px'\n                        }\">\n                        <v-slider\n                            :value=\"progress\"\n                            style=\"margin: 0%; padding: 0%;\"\n                            :max=\"solution.length\" \n                            :tick-size=\"3\"\n                            thumb-label=\"always\"\n                            ticks=\"always\"\n                            hide-details\n                            v-on:input=\"set_progress\"\n                        >\n                            <template v-slot:thumb-label>\n                                {{ progress == 0 ? '#' : solution[progress - 1] }}\n                            </template>\n                        </v-slider>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"play\" block text :ripple=\"false\" color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ progress == solution.length ? 'Replay' : 'Play' }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"pause\" block text :ripple=\"false\" color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Pause\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"quit\" block text :ripple=\"false\" color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                Quit\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </v-card>\n    </div>\n</v-app>"

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
        this.serialized_state = result;
        return result.join("");
    }
    restore() {
        const state = this.serialized_state;
        let x, y, z;
        let cur = 0;
        let face;
        this.reset();
        y = 2;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.U;
        for (z = 0; z < 3; z++) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        x = 2;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R;
        for (y = 2; y >= 0; y--) {
            for (z = 2; z >= 0; z--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        z = 2;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F;
        for (y = 2; y >= 0; y--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        y = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D;
        for (z = 2; z >= 0; z--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        x = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L;
        for (y = 2; y >= 0; y--) {
            for (z = 0; z < 3; z++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        z = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B;
        for (y = 2; y >= 0; y--) {
            for (x = 2; x >= 0; x--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                const cubelet = this.cubelets[index];
                const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                cubelet.remove(cubelet.stickers[face]);
                sticker.rotation.setFromVector3(face_attr.rotation);
                sticker.position.copy(face_attr.position);
                cubelet.stickers[face] = sticker;
                cubelet.add(sticker);
            }
        }
        this.dirty = true;
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
        this.stickers = new Array(6);
        for (let i = 0; i < 6; i++) {
            const face_attr = _utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_face_attrs[i];
            if (face_attr.match(this.vector)) {
                const sticker = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_0__.cubelet_sticker, face_attr.lambert);
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
    isTwisting() {
        return this.twists.length != 0;
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
/* harmony export */   "facePostionBindings": () => (/* binding */ facePostionBindings),
/* harmony export */   "stringToTwistParams": () => (/* binding */ stringToTwistParams)
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
const stringToTwistParams = {
    "L": { axis: 'x', layer: 0, angle: -Math.PI / 2 },
    "L'": { axis: 'x', layer: 0, angle: Math.PI / 2 },
    "L2": { axis: 'x', layer: 0, angle: -Math.PI },
    "R": { axis: 'x', layer: 2, angle: Math.PI / 2 },
    "R'": { axis: 'x', layer: 2, angle: -Math.PI / 2 },
    "R2": { axis: 'x', layer: 2, angle: Math.PI },
    "F": { axis: 'z', layer: 2, angle: Math.PI / 2 },
    "F'": { axis: 'z', layer: 2, angle: -Math.PI / 2 },
    "F2": { axis: 'z', layer: 2, angle: Math.PI },
    "B": { axis: 'z', layer: 0, angle: -Math.PI / 2 },
    "B'": { axis: 'z', layer: 0, angle: Math.PI / 2 },
    "B2": { axis: 'z', layer: 0, angle: -Math.PI },
    "U": { axis: 'y', layer: 2, angle: Math.PI / 2 },
    "U'": { axis: 'y', layer: 2, angle: -Math.PI / 2 },
    "U2": { axis: 'y', layer: 2, angle: Math.PI },
    "D": { axis: 'y', layer: 0, angle: -Math.PI / 2 },
    "D'": { axis: 'y', layer: 0, angle: Math.PI / 2 },
    "D2": { axis: 'y', layer: 0, angle: -Math.PI },
    "~": { axis: 'x', layer: 0, angle: 0 }
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
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewport */ "./src/vueapp/viewport/index.ts");
/* harmony import */ var _cube_world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cube/world */ "./src/cube/world.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting */ "./src/vueapp/setting/index.ts");
/* harmony import */ var _solver_Solver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../solver/Solver */ "./src/solver/Solver.ts");
/* harmony import */ var _cube_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../cube/utils */ "./src/cube/utils.ts");
/* harmony import */ var _cube_twister__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../cube/twister */ "./src/cube/twister.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let Playground = class Playground extends vue__WEBPACK_IMPORTED_MODULE_7__["default"] {
    constructor() {
        super();
        this.world = new _cube_world__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.width = 0;
        this.height = 0;
        this.size = 0;
        this.solution = [];
        this.progress = 0;
        this.isPlayerMode = false;
        this.isPlaying = false;
        this.solver = new _solver_Solver__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.key = 0;
    }
    mounted() {
        this.$nextTick(this.resize);
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
        this.callback();
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
        this.solution.push("~");
        console.log(this.solution);
        this.progress = 0;
        this.isPlaying = true;
    }
    onPlayerModeChange() {
        this.world.controller.disable = this.isPlayerMode;
    }
    callback() {
        if (this.isPlayerMode && this.isPlaying) {
            if (this.progress == this.solution.length) {
                this.isPlaying = false;
            }
            if (this.progress < this.solution.length) {
                if (!_cube_twister__WEBPACK_IMPORTED_MODULE_6__.twister.isTwisting()) {
                    const params = _cube_utils__WEBPACK_IMPORTED_MODULE_5__.stringToTwistParams[this.solution[this.progress]];
                    this.world.cube.table.groups[params.axis][params.layer].twist(params.angle, false);
                    this.progress++;
                }
            }
        }
    }
    play() {
        if (this.progress == this.solution.length) {
            this.set_progress(0);
            _cube_twister__WEBPACK_IMPORTED_MODULE_6__.twister.twists.push(new _cube_twister__WEBPACK_IMPORTED_MODULE_6__.Twist(0, Math.PI, _cube_utils__WEBPACK_IMPORTED_MODULE_5__.cube_config.frames * 1.5, (value) => {
                return Math.abs(value - Math.PI) < 1e-6;
            }));
        }
        this.isPlaying = true;
    }
    pause() {
        this.isPlaying = false;
    }
    quit() {
        this.isPlayerMode = false;
    }
    set_progress(value) {
        this.isPlaying = false;
        this.world.cube.restore();
        for (let i = 0; i < value; i++) {
            const params = _cube_utils__WEBPACK_IMPORTED_MODULE_5__.stringToTwistParams[this.solution[i]];
            this.world.cube.table.groups[params.axis][params.layer].twist(params.angle, true);
        }
        this.progress = value;
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
], Playground.prototype, "onPlayerModeChange", null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG9CQUFv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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9zZXR0aW5nL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvdmlld3BvcnQvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZS50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvY3ViZWxldC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2ludGVyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvd29ybGQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3NvbHZlci9Db29yZEN1YmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9zb2x2ZXIvQ3ViaWVDdWJlLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvc29sdmVyL1NvbHZlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3NvbHZlci9VdGlsLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvc2V0dGluZy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC92aWV3cG9ydC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjx2LWFwcD5cXG4gICAgPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIiBzdHlsZT1cXFwidXNlci1zZWxlY3Q6IG5vbmU7IHRvdWNoLWFjdGlvbjogbm9uZTtcXFwiPlxcbiAgICAgICAgPHNldHRpbmcgcmVmPVxcXCJzZXR0aW5nXFxcIj48L3NldHRpbmc+XFxuICAgICAgICA8dmlld3BvcnQgcmVmPVxcXCJ2aWV3cG9ydFxcXCI+PC92aWV3cG9ydD5cXG4gICAgICAgIDx2LWNhcmQgZmxhdCBzdHlsZT1cXFwibWFyZ2luOiBhdXRvOyB0b3VjaC1hY3Rpb246IG5vbmU7IHVzZXItc2VsZWN0OiBub25lO1xcXCI+XFxuICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkIGdyaWQtbGlzdC1tZCB0ZXh0LXhzLWNlbnRlclxcbiAgICAgICAgICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogTWF0aC5taW4oc2l6ZSAqIDEwLCB3aWR0aCkgKyAncHgnLCBoZWlnaHQ6IHNpemUgKiA0ICsgJ3B4J31cXFwiPlxcblxcbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cXFwiIWlzUGxheWVyTW9kZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJzY3JhbWJsZVxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcImdyZWVuXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWluLXdpZHRoOiAwJTsgbWluLWhlaWdodDogMCU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOmhlaWdodD1cXFwic2l6ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKydweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjcmFtYmxlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInJlc2V0XFxcIiBibG9jayB0ZXh0IDpyaXBwbGU9XFxcImZhbHNlXFxcIiBjb2xvcj1cXFwiYmx1ZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNldFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJzb2x2ZVxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcInJlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb2x2ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XFxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWVsc2U+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0Jzogc2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1zbGlkZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnZhbHVlPVxcXCJwcm9ncmVzc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOm1heD1cXFwic29sdXRpb24ubGVuZ3RoXFxcIiBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRpY2stc2l6ZT1cXFwiM1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M9XFxcImFsd2F5c1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZS1kZXRhaWxzXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtb246aW5wdXQ9XFxcInNldF9wcm9ncmVzc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6dGh1bWItbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBwcm9ncmVzcyA9PSAwID8gJyMnIDogc29sdXRpb25bcHJvZ3Jlc3MgLSAxXSB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1zbGlkZXI+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInBsYXlcXFwiIGJsb2NrIHRleHQgOnJpcHBsZT1cXFwiZmFsc2VcXFwiIGNvbG9yPVxcXCJncmVlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBwcm9ncmVzcyA9PSBzb2x1dGlvbi5sZW5ndGggPyAnUmVwbGF5JyA6ICdQbGF5JyB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJwYXVzZVxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcImJsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGF1c2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czQgOnN0eWxlPVxcXCJ7cGFkZGluZzogc2l6ZSAqIDAuMDYgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIEBjbGljaz1cXFwicXVpdFxcXCIgYmxvY2sgdGV4dCA6cmlwcGxlPVxcXCJmYWxzZVxcXCIgY29sb3I9XFxcInJlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiIDpoZWlnaHQ9XFxcInNpemVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpzdHlsZT1cXFwieydmb250LXNpemUnOiBzaXplICogMC4zICsncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBRdWl0XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgPC92LWNhcmQ+XFxuICAgIDwvZGl2Plxcbjwvdi1hcHA+XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIj5cXG4gICAgPHYtYnRuIGZpeGVkIHJpZ2h0IHRvcCBmYWIgY29sb3I9XFxcInByaW1hcnlcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTtcXFwiXFxuICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogc2l6ZSAqIDAuOSArICdweCcsIGhlaWdodDogc2l6ZSAqIDAuOSArICdweCcsICdtYXJnaW4tcmlnaHQnOiB3aWR0aCAvIDIgLSBNYXRoLm1pbihzaXplICogNSwgd2lkdGggLyAyKSArICdweCd9XFxcIlxcbiAgICAgICAgQGNsaWNrPVxcXCJzdGF0ZSA9ICFzdGF0ZVxcXCI+XFxuICAgICAgICA8di1pY29uIDpzaXplPVxcXCJzaXplICogMC42XFxcIj5cXG4gICAgICAgICAgICBzZXR0aW5nc1xcbiAgICAgICAgPC92LWljb24+XFxuICAgIDwvdi1idG4+XFxuICAgIDx2LWJvdHRvbS1zaGVldCB2LW1vZGVsPVxcXCJzdGF0ZVxcXCI+XFxuICAgICAgICA8di1jYXJkIHRleHQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bztcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXIgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiA4LCB3aWR0aCkgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNDUkFNQkxFIExFTkdUSFxcbiAgICAgICAgICAgICAgICA8L3Ytc3ViaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAoc2l6ZSAqIDAuMykgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dnVlLXNsaWRlciB2LW1vZGVsPVxcXCJzY3JhbWJsZV9zdGVwc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNDBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTAsMjAsMzAsNDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBGUkFNRVMgUEVSIFRXSVNUXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcImZyYW1lc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNjBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTUsMzAsNDUsNjBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBTRU5TSVRJVklUWVxcbiAgICAgICAgICAgICAgICA8L3Ytc3ViaGVhZGVyPlxcbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBzaXplICogMC4yICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAoc2l6ZSAqIDAuMykgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8dnVlLXNsaWRlciB2LW1vZGVsPVxcXCJzZW5zaWJpbGl0eVxcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiMTAwXFxcIiA6bWluPVxcXCIwXFxcIiA6bWFya3M9XFxcIlswLDI1LDUwLDc1LDEwMF1cXFwiPjwvdnVlLXNsaWRlcj5cXG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cXG4gICAgICAgIDwvdi1jYXJkPlxcbiAgICA8L3YtYm90dG9tLXNoZWV0PlxcbjwvZGl2PlwiIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgcmVmPVxcXCJjYW52YXNcXFwiPjwvZGl2PlwiIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyB0d2lzdGVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuaW1wb3J0IHsgYXhpc19wbGFuZXMsIGF4aXNfdmVjdG9ycywgY3ViZV9jb25maWcsIGN1YmVfc2l6ZSwgaW5kZXhUb0xheWVyLCB3b3JsZFRvSW5kZXggfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgQm94MywgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuZXhwb3J0IGNsYXNzIEhvbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmF4aXMgPSBcIlwiO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKHdvcmxkKSB7XG4gICAgICAgIHRoaXMuaW50ZXJhY3QgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bl90aWNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRG93bigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2Vtb3ZlXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUueCA9IGFjdGlvbi54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUueSA9IGFjdGlvbi55O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoZW5kXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdXNldXBcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2VvdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMud29ybGQgPSB3b3JsZDtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXhpcyA9IFwiXCI7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuZG93biA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLm1vdmUgPSBuZXcgVEhSRUUuVmVjdG9yMigwLCAwKTtcbiAgICAgICAgdGhpcy5kb3duX3RpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5ob2xkZXIgPSBuZXcgSG9sZGVyKCk7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgc2V0IGxvY2sodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9sb2NrID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jaztcbiAgICB9XG4gICAgc2V0IGRpc2FibGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkaXNhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMuY29udGluZ2xlICsgdGhpcy5hbmdsZTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXAuYW5nbGUgIT0gYW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSB0aGlzLmdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSAoYW5nbGUgLSBncm91cC5hbmdsZSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuYW5nbGUgKz0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2goKSB7XG4gICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgIGNvbnN0IGZpbmdlciA9IHRoaXMuaG9sZGVyLnZlY3RvcjtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmhvbGRlci5pbmRleDtcbiAgICAgICAgY29uc3QgaWxheWVyID0gaW5kZXhUb0xheWVyKGluZGV4KTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgdmVjdG9yID0gYXhpc192ZWN0b3JzW2F4aXNdO1xuICAgICAgICAgICAgaWYgKHZlY3Rvci5kb3QocGxhbmUubm9ybWFsKSA9PT0gMCAmJiB2ZWN0b3IuZG90KGZpbmdlcikgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1theGlzXVtpbGF5ZXJbYXhpc11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpbnRlcnNlY3QocG9pbnQsIHBsYW5lKSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIGNvbnN0IHJheSA9IG5ldyBUSFJFRS5SYXkoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgY29uc3QgeCA9IChwb2ludC54IC8gdGhpcy53b3JsZC53aWR0aCkgKiAyIC0gMTtcbiAgICAgICAgY29uc3QgeSA9IC0ocG9pbnQueSAvIHRoaXMud29ybGQuaGVpZ2h0KSAqIDIgKyAxO1xuICAgICAgICBtYXRyaXguY29weSh0aGlzLndvcmxkLnNjZW5lLm1hdHJpeCk7XG4gICAgICAgIG1hdHJpeC5pbnZlcnQoKTtcbiAgICAgICAgcmF5Lm9yaWdpbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy53b3JsZC5jYW1lcmEubWF0cml4V29ybGQpO1xuICAgICAgICByYXkuZGlyZWN0aW9uLnNldCh4LCB5LCAwLjUpLnVucHJvamVjdCh0aGlzLndvcmxkLmNhbWVyYSkuc3ViKHJheS5vcmlnaW4pLm5vcm1hbGl6ZSgpO1xuICAgICAgICByYXkuYXBwbHlNYXRyaXg0KG1hdHJpeCk7XG4gICAgICAgIHJheS5pbnRlcnNlY3RQbGFuZShwbGFuZSwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFuZGxlRG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nIHx8IHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbYXhpc107XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgaWYgKHBvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZV9tYXJnaW4gPSBjdWJlX3NpemUgLyAyICsgMC4wMDE7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94TWluID0gbmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoLWN1YmVfbWFyZ2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3hNYXggPSBuZXcgVmVjdG9yMygpLnNldFNjYWxhcihjdWJlX21hcmdpbik7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gbmV3IEJveDMoYm94TWluLCBib3hNYXgpO1xuICAgICAgICAgICAgICAgIGlmIChib3guY29udGFpbnNQb2ludChwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IFZlY3RvcjMoKS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy53b3JsZC5jYW1lcmEubWF0cml4V29ybGQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZGlzdGFuY2VUbyhvcmlnaW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IG1pbl9kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5fZGlzdCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci5heGlzID0gYXhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0gd29ybGRUb0luZGV4KHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVNb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gdGhpcy5tb3ZlLnggLSB0aGlzLmRvd24ueDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgaWYgKE1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KSAvIGQgPiAxMjgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRlci5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZHgpID4gTWF0aC5hYnMoZHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bi54IDwgdGhpcy53b3JsZC53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXhpcyA9IFwieFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ6XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGluZ2xlX3NldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2lzdGVyLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW5nbGVfc2V0LmFkZChncm91cC5hbmdsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250aW5nbGVfc2V0LnNpemUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGNvbnRpbmdsZV9zZXQudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGluZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgdmVjdG9yLm1heChuZXcgVmVjdG9yMygpLnN1Yih2ZWN0b3IpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtID0gTWF0aC5tYXgodmVjdG9yLngsIHZlY3Rvci55LCB2ZWN0b3Iueik7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLmNvcHkobm9ybSA9PSB2ZWN0b3IueCA/IG5ldyBWZWN0b3IzKDEsIDAsIDApIDogKG5vcm0gPT0gdmVjdG9yLnkgPyBuZXcgVmVjdG9yMygwLCAxLCAwKSA6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKDAsIDAsIDEpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IHRoaXMubWF0Y2goKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdGhpcy5ncm91cC5kcmFnKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB0aGlzLmdyb3VwLmFuZ2xlO1xuICAgICAgICAgICAgICAgIHZlY3Rvci5jcm9zc1ZlY3RvcnModGhpcy5ob2xkZXIudmVjdG9yLCBwbGFuZS5ub3JtYWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLnZlY3Rvci5tdWx0aXBseVNjYWxhcih2ZWN0b3IueCArIHZlY3Rvci55ICsgdmVjdG9yLnopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gYXhpc19wbGFuZXNbdGhpcy5ob2xkZXIuYXhpc107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmludGVyc2VjdCh0aGlzLmRvd24sIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0aGlzLmludGVyc2VjdCh0aGlzLm1vdmUsIHBsYW5lKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLnN1YlZlY3RvcnMoZW5kLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgdmVjdG9yLm11bHRpcGx5KHRoaXMuaG9sZGVyLnZlY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9XG4gICAgICAgICAgICAgICAgICAgICh2ZWN0b3IueCArIHZlY3Rvci55ICsgdmVjdG9yLnopICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVfY29uZmlnLnNlbnNpYmlsaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gdGhpcy5tb3ZlLnkgLSB0aGlzLmRvd24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gY3ViZV9jb25maWcuc2Vuc2liaWxpdHkgKiAodGhpcy5heGlzID09IFwieVwiID8gLWR4IDpcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYXhpcyA9PSBcInhcIiA/IC1keSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAoZHkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW5nKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpIDwgTWF0aC5QSSAvIDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAoTWF0aC5hYnMoYW5nbGUpIC8gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5kb3duX3RpY2spKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGVlZCA+IDAuMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSA9PSAwID8gMCA6ICgoYW5nbGUgLyBNYXRoLmFicyhhbmdsZSkpICogKE1hdGguUEkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY29udGluZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5nbGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwLnR3aXN0KGFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMuaG9sZGVyLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IEN1YmVsZXQgZnJvbSBcIi4vY3ViZWxldFwiO1xuaW1wb3J0IHsgR3JvdXBUYWJsZSB9IGZyb20gXCIuL2dyb3VwXCI7XG5pbXBvcnQgeyB0d2lzdGVyIH0gZnJvbSBcIi4vdHdpc3RlclwiO1xuaW1wb3J0IHsgY3ViZWxldF9mYWNlX2F0dHJzLCBjdWJlbGV0X2xhbWJlcnMsIGN1YmVsZXRfc3RpY2tlciwgY3ViZV9jb25maWcgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgRmFjZSB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2NrcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ4XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwieVwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInpcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJhXCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgZm9yIChjb25zdCBsb2NrIG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2NrLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9jayhheGlzLCBsYXllcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoX2EgPSB0aGlzLmxvY2tzLmdldChcImFcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYXMoMSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBheGlzX2xvY2tzZXQgPSB0aGlzLmxvY2tzLmdldChheGlzKTtcbiAgICAgICAgaWYgKGF4aXNfbG9ja3NldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsb2Nrc2V0IG9mIHRoaXMubG9ja3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChsb2Nrc2V0ICE9IGF4aXNfbG9ja3NldCAmJiBsb2Nrc2V0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF4aXNfbG9ja3NldC5hZGQobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdW5sb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBheGlzX2xvY2tzZXQgPT09IG51bGwgfHwgYXhpc19sb2Nrc2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBheGlzX2xvY2tzZXQuZGVsZXRlKGxheWVyKTtcbiAgICB9XG4gICAgcmFuZG9tMygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpLCAwKSwgMik7XG4gICAgfVxuICAgIHNjcmFtYmxlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1YmVfY29uZmlnLnNjcmFtYmxlX3N0ZXBzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF4aXMgPSBbXCJ4XCIsIFwieVwiLCBcInpcIl1bdGhpcy5yYW5kb20zKCldO1xuICAgICAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLnJhbmRvbTMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKHRoaXMucmFuZG9tMygpIC0gMSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgdGhpcy50YWJsZS5ncm91cHNbYXhpc11bbGV2ZWxdLnR3aXN0KGFuZ2xlID09PSAwID8gTWF0aC5QSSA6IGFuZ2xlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgZm9yIChjb25zdCBjdWJlbGV0IG9mIHRoaXMuY3ViZWxldHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZWxldHMuc3BsaWNlKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSBuZXcgQ3ViZWxldChpKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZWxldHMucHVzaChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgR3JvdXBUYWJsZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgIHkgPSAyO1xuICAgICAgICBmb3IgKHogPSAwOyB6IDwgMzsgeisrKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuVSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHggPSAyO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gMjsgeiA+PSAwOyB6LS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5SKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDI7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuRik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHkgPSAwO1xuICAgICAgICBmb3IgKHogPSAyOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gMDtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDA7IHogPCAzOyB6KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5MKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDA7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAyOyB4ID49IDA7IHgtLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcmlhbGl6ZWRfc3RhdGUgPSByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcbiAgICB9XG4gICAgcmVzdG9yZSgpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnNlcmlhbGl6ZWRfc3RhdGU7XG4gICAgICAgIGxldCB4LCB5LCB6O1xuICAgICAgICBsZXQgY3VyID0gMDtcbiAgICAgICAgbGV0IGZhY2U7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgeSA9IDI7XG4gICAgICAgIGZhY2UgPSBGYWNlLlU7XG4gICAgICAgIGZvciAoeiA9IDA7IHogPCAzOyB6KyspIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXRlW2N1cisrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbZmFjZV07XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbGFtYmVyc1tjb2xvcl0pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQucmVtb3ZlKGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0pO1xuICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gMjtcbiAgICAgICAgZmFjZSA9IEZhY2UuUjtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDI7XG4gICAgICAgIGZhY2UgPSBGYWNlLkY7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeSA9IDA7XG4gICAgICAgIGZhY2UgPSBGYWNlLkQ7XG4gICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDA7XG4gICAgICAgIGZhY2UgPSBGYWNlLkw7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHogPSAwOyB6IDwgMzsgeisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeiA9IDA7XG4gICAgICAgIGZhY2UgPSBGYWNlLkI7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAyOyB4ID49IDA7IHgtLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gc3RhdGVbY3VyKytdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tmYWNlXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9sYW1iZXJzW2NvbG9yXSk7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5yZW1vdmUoY3ViZWxldC5zdGlja2Vyc1tmYWNlXSk7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGN1YmVsZXRfZGVmcywgY3ViZWxldF9jb3JlLCBjdWJlbGV0X2ZyYW1lLCBjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfZmFjZV9hdHRycywgZGlyZWN0aW9uVG9JbmRleCwgZmFjZVBvc3Rpb25CaW5kaW5ncywgY3ViZWxldF9sYW1iZXJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgaW5kZXhUb0RpcmVjdGlvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBRdWF0ZXJuaW9uLCBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlbGV0IGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3ZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgY29uc3QgZHJjdG4gPSBpbmRleFRvRGlyZWN0aW9uKGluZGV4KTtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMyhkcmN0bi54LCBkcmN0bi55LCBkcmN0bi56KTtcbiAgICAgICAgdGhpcy5mcmFtZSA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfY29yZSk7XG4gICAgICAgIHRoaXMuYWRkKHRoaXMuZnJhbWUpO1xuICAgICAgICB0aGlzLnN0aWNrZXJzID0gbmV3IEFycmF5KDYpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ldO1xuICAgICAgICAgICAgaWYgKGZhY2VfYXR0ci5tYXRjaCh0aGlzLnZlY3RvcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBmYWNlX2F0dHIubGFtYmVydCk7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2tlcnNbaV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbiAgICBzZXQgdmVjdG9yKHZlY3Rvcikge1xuICAgICAgICB0aGlzLl92ZWN0b3IuY29weSh2ZWN0b3IpO1xuICAgICAgICB0aGlzLmluZGV4ID0gZGlyZWN0aW9uVG9JbmRleCh2ZWN0b3IpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLmNvcHkodmVjdG9yKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5tdWx0aXBseVNjYWxhcihjdWJlbGV0X2RlZnMuc2l6ZSk7XG4gICAgfVxuICAgIGdldCB2ZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZWN0b3I7XG4gICAgfVxuICAgIGNvbnZlcnRGYWNlKGZhY2UpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcbiAgICAgICAgY29uc3QgcXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCkuY29weSh0aGlzLnF1YXRlcm5pb24pO1xuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmcgb2YgZmFjZVBvc3Rpb25CaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuZmFjZSA9PT0gZmFjZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLmNvcHkoYmluZGluZy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9zaXRpb24uYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24uaW52ZXJ0KCkpO1xuICAgICAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMyhNYXRoLnJvdW5kKHBvc2l0aW9uLngpLCBNYXRoLnJvdW5kKHBvc2l0aW9uLnkpLCBNYXRoLnJvdW5kKHBvc2l0aW9uLnopKTtcbiAgICAgICAgZm9yIChjb25zdCBiaW5kaW5nIG9mIGZhY2VQb3N0aW9uQmluZGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLnBvc2l0aW9uLmVxdWFscyh2ZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuZmFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGdldENvbG9yT2YoZmFjZSkge1xuICAgICAgICBjb25zdCBzdGlja2VyID0gdGhpcy5zdGlja2Vyc1t0aGlzLmNvbnZlcnRGYWNlKGZhY2UpXTtcbiAgICAgICAgc3dpdGNoIChzdGlja2VyLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5MOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkxcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuRjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJGXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5COlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkJcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLlU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiVVwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJEXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiP1wiO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVHdpc3QsIHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBheGlzX3ZlY3RvcnMsIGN1YmVfY29uZmlnLCBpbmRleFRvTGF5ZXIgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViZUdyb3VwIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUsIGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2FuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3ViZSA9IGN1YmU7XG4gICAgICAgIHRoaXMuYXhpcyA9IGF4aXM7XG4gICAgICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcbiAgICAgICAgdGhpcy5jdWJlbGV0cyA9IFtdO1xuICAgICAgICB0aGlzLmluZGljZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpbGF5ZXIgPSBpbmRleFRvTGF5ZXIoaSk7XG4gICAgICAgICAgICBpZiAoYXhpcyA9PSBcInhcIiAmJiBpbGF5ZXIueCA9PSBsYXllclxuICAgICAgICAgICAgICAgIHx8IGF4aXMgPT0gXCJ5XCIgJiYgaWxheWVyLnkgPT0gbGF5ZXJcbiAgICAgICAgICAgICAgICB8fCBheGlzID09IFwielwiICYmIGlsYXllci56ID09IGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2VzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCBhbmdsZShhbmdsZSkge1xuICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB0aGlzLnNldFJvdGF0aW9uRnJvbUF4aXNBbmdsZShheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgYW5nbGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmdsZTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy50d2lzdGluZykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLnR3aXN0aW5nLmFycml2YWw7XG4gICAgICAgICAgICB0d2lzdGVyLmNhbmNlbCh0aGlzLnR3aXN0aW5nKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpICogKE1hdGguUEkgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICBpZiAodGhpcy50d2lzdGluZykge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLnR3aXN0aW5nLmFycml2YWwgLSB0aGlzLmFuZ2xlO1xuICAgICAgICAgICAgdHdpc3Rlci5maW5pc2godGhpcy50d2lzdGluZyk7XG4gICAgICAgICAgICB0aGlzLnR3aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBob2xkKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5jdWJlLmxvY2sodGhpcy5heGlzLCB0aGlzLmxheWVyKTtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIHRoaXMuaW5kaWNlcykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZS5jdWJlbGV0c1tpXTtcbiAgICAgICAgICAgIHRoaXMuY3ViZWxldHMucHVzaChjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUuYWRkKHRoaXMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZHJhZygpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuaG9sZGluZykge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC10aGlzLmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhvbGQoKTtcbiAgICB9XG4gICAgZHJvcCgpIHtcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0cy5wb3AoKTtcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IGN1YmVsZXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm90YXRlKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUuYWRkKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLmN1YmVsZXRzW2N1YmVsZXQuaW5kZXhdID0gY3ViZWxldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1YmUucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jdWJlLnVubG9jayh0aGlzLmF4aXMsIHRoaXMubGF5ZXIpO1xuICAgICAgICB0aGlzLmN1YmUuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdHdpc3QoYW5nbGUsIGZhc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9sZGluZykge1xuICAgICAgICAgICAgYW5nbGUgPSBhbmdsZSArIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5ob2xkKCk7XG4gICAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBhbmdsZSA9IE1hdGgucm91bmQoYW5nbGUgLyAoTWF0aC5QSSAvIDIpKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgIGlmIChmYXN0KSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZyYWMgPSBNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIC8gKE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gY3ViZV9jb25maWcuZnJhbWVzICogKDIgLSAyIC8gKGZyYWMgKyAxKSk7XG4gICAgICAgICAgICB0aGlzLnR3aXN0aW5nID0gbmV3IFR3aXN0KHRoaXMuYW5nbGUsIGFuZ2xlLCBkdXJhdGlvbiwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmFuZ2xlIC0gYW5nbGUpIDwgMWUtNikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHdpc3Rlci50d2lzdHMucHVzaCh0aGlzLnR3aXN0aW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcm90YXRlKGN1YmVsZXQpIHtcbiAgICAgICAgY3ViZWxldC5yb3RhdGVPbldvcmxkQXhpcyhheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudmVjdG9yID0gY3ViZWxldC52ZWN0b3IuYXBwbHlBeGlzQW5nbGUoYXhpc192ZWN0b3JzW3RoaXMuYXhpc10sIHRoaXMuYW5nbGUpO1xuICAgICAgICBjdWJlbGV0LnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBHcm91cFRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdWJlKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXhpcyBvZiBbXCJ4XCIsIFwieVwiLCBcInpcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKG5ldyBDdWJlR3JvdXAoY3ViZSwgYXhpcywgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ncm91cHNbYXhpc10gPSBsaXN0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RvciB7XG4gICAgY29uc3RydWN0b3IoZG9tLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnRvdWNoID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oXCJ0b3VjaGVuZFwiLCB0aGlzLmxhc3QuY2xpZW50WCAtIHRoaXMuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIHRoaXMubGFzdC5jbGllbnRZIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3QgPSBmaXJzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdGhpcy5kb20gfHwgKChfYSA9IHRoaXMubGFzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkZW50aWZpZXIpICE9IGZpcnN0LmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS50YWJJbmRleCA9IDE7XG4gICAgICAgICAgICB0aGlzLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKGV2ZW50LnR5cGUsIGZpcnN0LmNsaWVudFggLSB0aGlzLmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LCBmaXJzdC5jbGllbnRZIC0gdGhpcy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGVuZFwiIHx8IGV2ZW50LnR5cGUgPT09IFwidG91Y2hjYW5jZWxcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vdXNlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJtb3VzZWRvd25cIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0aGlzLmRvbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb20udGFiSW5kZXggPSAxO1xuICAgICAgICAgICAgdGhpcy5kb20uZm9jdXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNldXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm1vdXNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFR3aXN0IHtcbiAgICBjb25zdHJ1Y3RvcihkZXBhdHVyZSwgYXJyaXZhbCwgZHVyYXRpb24sIGNhbGxiYWNrX2Z1bmMpIHtcbiAgICAgICAgdGhpcy5kZXBhcnR1cmUgPSBkZXBhdHVyZTtcbiAgICAgICAgdGhpcy5hcnJpdmFsID0gYXJyaXZhbDtcbiAgICAgICAgdGhpcy5kdXJhbnRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5jYWxsYmFja19mdW5jID0gY2FsbGJhY2tfZnVuYztcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmFudGlvbjtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5hcnJpdmFsO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkKys7XG4gICAgICAgIGNvbnN0IGZyYWMgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmVsYXBzZWQgLyB0aGlzLmR1cmFudGlvbiwgMCksIDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBmcmFjID09IDEgPyB0aGlzLmFycml2YWwgOiAodGhpcy5kZXBhcnR1cmUgKyAodGhpcy5hcnJpdmFsIC0gdGhpcy5kZXBhcnR1cmUpICogKDEgLSAoMSAtIGZyYWMpICogKDEgLSBmcmFjKSkpO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tfZnVuYyh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUd2lzdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d2lzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgbGV0IGN1ciA9IDA7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLnR3aXN0cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChjdXIgPCBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMudHdpc3RzW2N1cl0udXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy50d2lzdHNbY3VyXS5jYWxsYmFjaygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2lzdHMuc3BsaWNlKGN1ciwgMSk7XG4gICAgICAgICAgICAgICAgZW5kLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5pc2godHdpc3QgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR3aXN0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdpc3RzW2ldID09IHR3aXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHR3aXN0LmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3aXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR3aXN0cyA9IHRoaXMudHdpc3RzLnNwbGljZSgwKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHdpc3Qgb2YgdHdpc3RzKSB7XG4gICAgICAgICAgICAgICAgdHdpc3QuZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuY2VsKHR3aXN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3aXN0c1tpXSA9PSB0d2lzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHdpc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1R3aXN0aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50d2lzdHMubGVuZ3RoICE9IDA7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHR3aXN0ZXIgPSBuZXcgVHdpc3RlcigpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBGYWNlLCBGcmFtZSwgU3RpY2tlciB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgY29uc3QgY3ViZV9jb25maWcgPSB7XG4gICAgZnJhbWVzOiAzMCxcbiAgICBzZW5zaWJpbGl0eTogMjAgKiAxZS00LFxuICAgIHNjcmFtYmxlX3N0ZXBzOiAyMCxcbn07XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb2xvcnMgPSB7XG4gICAgUjogXCIjQjcxQzFDXCIsXG4gICAgTDogXCIjRkY2RDAwXCIsXG4gICAgVTogXCIjRjBGMEYwXCIsXG4gICAgRDogXCIjRkZENjAwXCIsXG4gICAgRjogXCIjMDBBMDIwXCIsXG4gICAgQjogXCIjMEQ0N0ExXCIsXG4gICAgY29yZTogXCIjMjAyMDIwXCIsXG4gICAgZ3JheTogXCIjODA4MDgwXCIsXG4gICAgaGlnaDogXCIjRkYwMDgwXCIsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZGVmcyA9IHtcbiAgICBzaXplOiA2NCxcbiAgICBfYm9yZGVyX3dpZHRoOiAzLFxuICAgIF9lZGdlX3dpZHRoOiAyLFxuICAgIF9zdGlja2VyX2RlcHRoOiAwLjEsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZnJhbWUgPSBuZXcgRnJhbWUoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2xhbWJlcnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGN1YmVsZXRfY29sb3JzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY3ViZWxldF9jb2xvcnNba2V5XSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0pKCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb3JlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICBjb2xvcjogY3ViZWxldF9jb2xvcnMuY29yZSxcbiAgICBzcGVjdWxhcjogY3ViZWxldF9jb2xvcnMuZ3JheSxcbiAgICBzaGluaW5lc3M6IDIsXG59KTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X3N0aWNrZXIgPSBuZXcgU3RpY2tlcihjdWJlbGV0X2RlZnMuc2l6ZSAtIDIgKiBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCAtIGN1YmVsZXRfZGVmcy5fZWRnZV93aWR0aCwgY3ViZWxldF9kZWZzLl9zdGlja2VyX2RlcHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZhY2VfYXR0cnMgPSBbXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygwLCAtTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyhjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5ELFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJIC8gMiwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueSA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuVSxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygtTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnogPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5CLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgY3ViZWxldF9kZWZzLnNpemUgLyAyKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDIgKiBNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBjdWJlX3NpemUgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG5leHBvcnQgY29uc3QgYXhpc192ZWN0b3JzID0ge1xuICAgIGE6IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLFxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcbiAgICB5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksXG4gICAgejogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxufTtcbmV4cG9ydCBjb25zdCBheGlzX3BsYW5lcyA9IHtcbiAgICB4OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB5OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB6OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIC1jdWJlX3NpemUgLyAyKVxufTtcbmV4cG9ydCBjb25zdCBpbmRleFRvRGlyZWN0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGluZGV4ICUgMyAtIDEsIE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMgLSAxLCBNYXRoLmZsb29yKGluZGV4IC8gOSkgLSAxKTtcbn07XG5leHBvcnQgY29uc3QgZGlyZWN0aW9uVG9JbmRleCA9IChkcmN0bikgPT4ge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKChkcmN0bi54ICsgMSkgKyAoZHJjdG4ueSArIDEpICogMyArIChkcmN0bi56ICsgMSkgKiA5KTtcbn07XG5leHBvcnQgY29uc3QgaW5kZXhUb0xheWVyID0gKGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0geyB4OiBpbmRleCAlIDMsIHk6IE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMsIHo6IE1hdGguZmxvb3IoaW5kZXggLyA5KSB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGNvbnN0IHdvcmxkVG9JbmRleCA9IChwb2ludCkgPT4ge1xuICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuY29weShwb2ludCk7XG4gICAgdmVjdG9yLmFkZChuZXcgVmVjdG9yMygpLnNldFNjYWxhcihjdWJlX3NpemUgLyAyKSk7XG4gICAgdmVjdG9yLmRpdmlkZVNjYWxhcihjdWJlX3NpemUpLm11bHRpcGx5U2NhbGFyKDMpLmZsb29yKCk7XG4gICAgdmVjdG9yLm1heChuZXcgVmVjdG9yMygpLnNldFNjYWxhcigwKSk7XG4gICAgdmVjdG9yLm1pbihuZXcgVmVjdG9yMygpLnNldFNjYWxhcigyKSk7XG4gICAgcmV0dXJuIHZlY3Rvci54ICsgdmVjdG9yLnkgKiAzICsgdmVjdG9yLnogKiA5O1xufTtcbmV4cG9ydCBjb25zdCBmYWNlUG9zdGlvbkJpbmRpbmdzID0gW1xuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuUixcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuRCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLlUsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLkIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSlcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSlcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBzdHJpbmdUb1R3aXN0UGFyYW1zID0ge1xuICAgIFwiTFwiOiB7IGF4aXM6ICd4JywgbGF5ZXI6IDAsIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkwnXCI6IHsgYXhpczogJ3gnLCBsYXllcjogMCwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJMMlwiOiB7IGF4aXM6ICd4JywgbGF5ZXI6IDAsIGFuZ2xlOiAtTWF0aC5QSSB9LFxuICAgIFwiUlwiOiB7IGF4aXM6ICd4JywgbGF5ZXI6IDIsIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiUidcIjogeyBheGlzOiAneCcsIGxheWVyOiAyLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJSMlwiOiB7IGF4aXM6ICd4JywgbGF5ZXI6IDIsIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJGXCI6IHsgYXhpczogJ3onLCBsYXllcjogMiwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJGJ1wiOiB7IGF4aXM6ICd6JywgbGF5ZXI6IDIsIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkYyXCI6IHsgYXhpczogJ3onLCBsYXllcjogMiwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcIkJcIjogeyBheGlzOiAneicsIGxheWVyOiAwLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJCJ1wiOiB7IGF4aXM6ICd6JywgbGF5ZXI6IDAsIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiQjJcIjogeyBheGlzOiAneicsIGxheWVyOiAwLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIlVcIjogeyBheGlzOiAneScsIGxheWVyOiAyLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIlUnXCI6IHsgYXhpczogJ3knLCBsYXllcjogMiwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiVTJcIjogeyBheGlzOiAneScsIGxheWVyOiAyLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwiRFwiOiB7IGF4aXM6ICd5JywgbGF5ZXI6IDAsIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkQnXCI6IHsgYXhpczogJ3knLCBsYXllcjogMCwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJEMlwiOiB7IGF4aXM6ICd5JywgbGF5ZXI6IDAsIGFuZ2xlOiAtTWF0aC5QSSB9LFxuICAgIFwiflwiOiB7IGF4aXM6ICd4JywgbGF5ZXI6IDAsIGFuZ2xlOiAwIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCB2YXIgRmFjZTtcbihmdW5jdGlvbiAoRmFjZSkge1xuICAgIEZhY2VbRmFjZVtcIkxcIl0gPSAwXSA9IFwiTFwiO1xuICAgIEZhY2VbRmFjZVtcIlJcIl0gPSAxXSA9IFwiUlwiO1xuICAgIEZhY2VbRmFjZVtcIkRcIl0gPSAyXSA9IFwiRFwiO1xuICAgIEZhY2VbRmFjZVtcIlVcIl0gPSAzXSA9IFwiVVwiO1xuICAgIEZhY2VbRmFjZVtcIkJcIl0gPSA0XSA9IFwiQlwiO1xuICAgIEZhY2VbRmFjZVtcIkZcIl0gPSA1XSA9IFwiRlwiO1xufSkoRmFjZSB8fCAoRmFjZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgYm9yZGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IG8gPSBzaXplIC8gMjtcbiAgICAgICAgY29uc3QgaSA9IG8gLSBib3JkZXI7XG4gICAgICAgIGNvbnN0IF92ZXJ0cyA9IFtcbiAgICAgICAgICAgIC1pLCAraSwgK28sXG4gICAgICAgICAgICAraSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksIC1pLCArbyxcbiAgICAgICAgICAgIC1pLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgK28sIC1pLFxuICAgICAgICAgICAgK2ksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgK2ksXG4gICAgICAgICAgICAtaSwgK28sICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAtaSxcbiAgICAgICAgICAgIC1vLCAraSwgLWksXG4gICAgICAgICAgICAtbywgK2ksICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAraSxcbiAgICAgICAgICAgICtpLCAraSwgLW8sXG4gICAgICAgICAgICAtaSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksIC1pLCAtbyxcbiAgICAgICAgICAgICtpLCAtaSwgLW8sXG4gICAgICAgICAgICAtaSwgLW8sICtpLFxuICAgICAgICAgICAgK2ksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgLWksXG4gICAgICAgICAgICAtaSwgLW8sIC1pLFxuICAgICAgICAgICAgK28sICtpLCAraSxcbiAgICAgICAgICAgICtvLCAraSwgLWksXG4gICAgICAgICAgICArbywgLWksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAraSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShfdmVydHMsIDMpKTtcbiAgICAgICAgdGhpcy5zZXRJbmRleChGcmFtZS5faW5kaWNlcyk7XG4gICAgICAgIHRoaXMuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcbiAgICB9XG59XG5GcmFtZS5faW5kaWNlcyA9IFtcbiAgICAwLCAyLCAxLFxuICAgIDAsIDMsIDIsXG4gICAgNCwgNiwgNSxcbiAgICA0LCA3LCA2LFxuICAgIDgsIDEwLCA5LFxuICAgIDgsIDExLCAxMCxcbiAgICAxMiwgMTQsIDEzLFxuICAgIDEyLCAxNSwgMTQsXG4gICAgMTYsIDE4LCAxNyxcbiAgICAxNiwgMTksIDE4LFxuICAgIDIwLCAyMiwgMjEsXG4gICAgMjAsIDIzLCAyMixcbiAgICAxLCA2LCA3LFxuICAgIDAsIDEsIDcsXG4gICAgMywgMCwgMTAsXG4gICAgMTEsIDMsIDEwLFxuICAgIDE3LCAyLCAzLFxuICAgIDE2LCAxNywgMyxcbiAgICAyMywgMjAsIDEsXG4gICAgMiwgMjMsIDEsXG4gICAgNSwgMTIsIDEzLFxuICAgIDQsIDUsIDEzLFxuICAgIDksIDEzLCAxNCxcbiAgICA4LCA5LCAxNCxcbiAgICAyMiwgMTUsIDEyLFxuICAgIDIxLCAyMiwgMTIsXG4gICAgMTksIDE0LCAxNSxcbiAgICAxOCwgMTksIDE1LFxuICAgIDcsIDQsIDksXG4gICAgMTAsIDcsIDksXG4gICAgMTEsIDgsIDE5LFxuICAgIDE2LCAxMSwgMTksXG4gICAgMjMsIDE3LCAxOCxcbiAgICAyMiwgMjMsIDE4LFxuICAgIDIwLCAyMSwgNSxcbiAgICA2LCAyMCwgNSxcbiAgICAyMCwgNiwgMSxcbiAgICAxMCwgMCwgNyxcbiAgICAyMSwgMTIsIDUsXG4gICAgMTMsIDksIDQsXG4gICAgMjMsIDIsIDE3LFxuICAgIDExLCAxNiwgMyxcbiAgICAyMiwgMTgsIDE1LFxuICAgIDgsIDE0LCAxOSxcbl07XG5leHBvcnQgY2xhc3MgU3RpY2tlciBleHRlbmRzIFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgZGVwdGgpIHtcbiAgICAgICAgc2l6ZSA9IHNpemUgLyAyO1xuICAgICAgICBjb25zdCBsZWZ0ID0gLXNpemU7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHNpemU7XG4gICAgICAgIGNvbnN0IHRvcCA9IC1zaXplO1xuICAgICAgICBjb25zdCByaWdodCA9IHNpemU7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHNpemUgLyA0O1xuICAgICAgICBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICAgICAgICBzaGFwZS5tb3ZlVG8obGVmdCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgYm90dG9tLCBsZWZ0ICsgcmFkaXVzLCBib3R0b20pO1xuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQgLSByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8ocmlnaHQsIGJvdHRvbSwgcmlnaHQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgdG9wLCByaWdodCAtIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQgKyByYWRpdXMsIHRvcCk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgdG9wLCBsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5jbG9zZVBhdGgoKTtcbiAgICAgICAgc3VwZXIoc2hhcGUsIHsgYmV2ZWxFbmFibGVkOiBmYWxzZSwgZGVwdGg6IGRlcHRoIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IEN1YmUgZnJvbSBcIi4vY3ViZVwiO1xuaW1wb3J0IHsgY3ViZWxldF9kZWZzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLnNjZW5lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2VuZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDY7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gNCArIE1hdGguUEkgLyAxNjtcbiAgICAgICAgdGhpcy5hbWJpZW50ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMSk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uYWwgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uYWwucG9zaXRpb24uc2V0KGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMsIGN1YmVsZXRfZGVmcy5zaXplICogMik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuYW1iaWVudCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5jdWJlID0gbmV3IEN1YmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlID0gOTtcbiAgICB9XG4gICAgc2V0IGRpcnR5KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGlydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1YmUuZGlydHk7XG4gICAgfVxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XG4gICAgfVxuICAgIHVwZGF0ZUNhbWVyYSgpIHtcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5oZWlnaHQgLyBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyB0aGlzLnNjYWxlIC8gdGhpcy5wZXJzcGVjdGl2ZTtcbiAgICAgICAgY29uc3QgZm92ID0gKDIgKiBNYXRoLmF0YW4obWluKSAqIDE4MCkgLyBNYXRoLlBJO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGN1YmVsZXRfZGVmcy5zaXplICogMyAqIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMud2lkdGggLyB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gZm92O1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gZGlzdGFuY2U7XG4gICAgICAgIHRoaXMuY2FtZXJhLm5lYXIgPSBkaXN0YW5jZSAtIGN1YmVsZXRfZGVmcy5zaXplICogMztcbiAgICAgICAgdGhpcy5jYW1lcmEuZmFyID0gZGlzdGFuY2UgKyBjdWJlbGV0X2RlZnMuc2l6ZSAqIDg7XG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdCh0aGlzLnNjZW5lLnBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZXRpZnkgZnJvbSBcInZ1ZXRpZnlcIjtcbmltcG9ydCBcInZ1ZXRpZnkvZGlzdC92dWV0aWZ5Lm1pbi5jc3NcIjtcbmltcG9ydCBcIm1hdGVyaWFsLWRlc2lnbi1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3NcIjtcbmltcG9ydCBQbGF5Z3JvdW5kIGZyb20gXCIuL3Z1ZWFwcC9wbGF5Z3JvdW5kXCI7XG5WdWUudXNlKFZ1ZXRpZnkpO1xuY29uc3Qgb3B0cyA9IHt9O1xuY29uc3QgdnVldGlmeSA9IG5ldyBWdWV0aWZ5KG9wdHMpO1xuVnVlLnByb3RvdHlwZS52dWV0aWZ5ID0gdnVldGlmeTtcbmxldCBhcHAgPSBQbGF5Z3JvdW5kO1xuY29uc3Qgdm0gPSBuZXcgVnVlKHtcbiAgICB2dWV0aWZ5LFxuICAgIGVsOiBcIiNhcHBcIixcbiAgICByZW5kZXI6IChoKSA9PiBoKGFwcCksXG59KTtcbiIsImltcG9ydCBDdWJpZUN1YmUgZnJvbSBcIi4vQ3ViaWVDdWJlXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi9VdGlsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb29yZEN1YmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR3aXN0ID0gMDtcbiAgICAgICAgdGhpcy50c3ltID0gMDtcbiAgICAgICAgdGhpcy5mbGlwID0gMDtcbiAgICAgICAgdGhpcy5mc3ltID0gMDtcbiAgICAgICAgdGhpcy5zbGljZSA9IDA7XG4gICAgICAgIHRoaXMucHJ1biA9IDA7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0KCkge1xuICAgICAgICBpZiAoQ29vcmRDdWJlLmluaXRlZCA9PSA0Nikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDb29yZEN1YmUuaW5pdGVkID09IDApIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVEID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkluaXRQZXJtU3ltMlJhdygpO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkluaXRDUGVybU1vdmUoKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Jbml0RVBlcm1Nb3ZlKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdE1QZXJtTW92ZUNvbmooKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Jbml0Q29tYlBNb3ZlQ29uaigpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkluaXRGbGlwU3ltMlJhdygpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkluaXRUd2lzdFN5bTJSYXcoKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Jbml0RmxpcE1vdmUoKTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5Jbml0VHdpc3RNb3ZlKCk7XG4gICAgICAgICAgICBDb29yZEN1YmUuSW5pdFVEU2xpY2VNb3ZlQ29uaigpO1xuICAgICAgICAgICAgQ29vcmRDdWJlLmluaXRlZCA9IDE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQ29vcmRDdWJlLkluaXRNQ1Blcm1QcnVuKCk7XG4gICAgICAgIENvb3JkQ3ViZS5Jbml0RVBlcm1Db21iUFBydW4oKTtcbiAgICAgICAgQ29vcmRDdWJlLkluaXRTbGljZVR3aXN0UHJ1bigpO1xuICAgICAgICBDb29yZEN1YmUuSW5pdFNsaWNlRmxpcFBydW4oKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRDUGVybU1vdmUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fUEVSTV9TWU07IGkrKykge1xuICAgICAgICAgICAgQ29vcmRDdWJlLkNQZXJtTW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllQy5DUGVybSA9IEN1YmllQ3ViZS5FUGVybVMyUltpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVMyOyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLk1vdmVDdWJlW1V0aWwuVUQyU1REW2pdXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLkNQZXJtTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuQ1Blcm1TeW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEluaXRFUGVybU1vdmUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fUEVSTV9TWU07IGkrKykge1xuICAgICAgICAgICAgQ29vcmRDdWJlLkVQZXJtTW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllQy5FUGVybSA9IEN1YmllQ3ViZS5FUGVybVMyUltpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVMyOyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLk1vdmVDdWJlW1V0aWwuVUQyU1REW2pdXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLkVQZXJtTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuRVBlcm1TeW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEluaXRNUGVybU1vdmVDb25qKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX01QRVJNOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5NUGVybU1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5NUGVybUNvbmpbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMuTVBlcm0gPSBpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDb29yZEN1YmUuTl9NT1ZFUzI7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuTW92ZUN1YmVbVXRpbC5VRDJTVERbal1dLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuTVBlcm1Nb3ZlW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5NUGVybTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlQ29uanVnYXRlKENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5TeW1NdWx0SW52WzBdW2pdLCBDb29yZEN1YmUuQ3ViaWVEKTtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuTVBlcm1Db25qW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5NUGVybTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSW5pdENvbWJQTW92ZUNvbmooKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fQ09NQjsgaSsrKSB7XG4gICAgICAgICAgICBDb29yZEN1YmUuQ0NvbWJQTW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkNDb21iUENvbmpbaV0gPSBbXTtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DdWJpZUMuQ0NvbWIgPSBpICUgNzA7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IENvb3JkQ3ViZS5OX01PVkVTMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0KENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5Nb3ZlQ3ViZVtVdGlsLlVEMlNURFtqXV0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBNb3ZlW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5DQ29tYiArIDcwICogKCgoQ29vcmRDdWJlLlAyX1BBUklUWV9NT1ZFID4+IGopICYgMSkgXiAoaSAvIDcwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybkNvbmp1Z2F0ZShDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuU3ltTXVsdEludlswXVtqXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLkNDb21iUENvbmpbaV1bal0gPSBDb29yZEN1YmUuQ3ViaWVELkNDb21iICsgNzAgKiB+fihpIC8gNzApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0RmxpcE1vdmUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fRkxJUF9TWU07IGkrKykge1xuICAgICAgICAgICAgQ29vcmRDdWJlLkZsaXBNb3ZlW2ldID0gW107XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVDLkZsaXAgPSBDdWJpZUN1YmUuRmxpcFMyUltpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVM7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuTW92ZUN1YmVbal0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5GbGlwTW92ZVtpXVtqXSA9IENvb3JkQ3ViZS5DdWJpZUQuRmxpcFN5bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSW5pdFR3aXN0TW92ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDb29yZEN1YmUuTl9UV0lTVF9TWU07IGkrKykge1xuICAgICAgICAgICAgQ29vcmRDdWJlLlR3aXN0TW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLkN1YmllQy5Ud2lzdCA9IEN1YmllQ3ViZS5Ud2lzdFMyUltpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgQ29vcmRDdWJlLk5fTU9WRVM7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdChDb29yZEN1YmUuQ3ViaWVDLCBDdWJpZUN1YmUuTW92ZUN1YmVbal0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5Ud2lzdE1vdmVbaV1bal0gPSBDb29yZEN1YmUuQ3ViaWVELlR3aXN0U3ltO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0VURTbGljZU1vdmVDb25qKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENvb3JkQ3ViZS5OX1NMSUNFOyBpKyspIHtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5VRFNsaWNlTW92ZVtpXSA9IFtdO1xuICAgICAgICAgICAgQ29vcmRDdWJlLlVEU2xpY2VDb25qW2ldID0gW107XG4gICAgICAgICAgICBDb29yZEN1YmUuQ3ViaWVDLlVEU2xpY2UgPSBpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDb29yZEN1YmUuTl9NT1ZFUzsgaisrKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KENvb3JkQ3ViZS5DdWJpZUMsIEN1YmllQ3ViZS5Nb3ZlQ3ViZVtqXSwgQ29vcmRDdWJlLkN1YmllRCk7XG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLlVEU2xpY2VNb3ZlW2ldW2pdID0gQ29vcmRDdWJlLkN1YmllRC5VRFNsaWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgaiArPSAyKSB7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VDb25qdWdhdGUoQ29vcmRDdWJlLkN1YmllQywgQ3ViaWVDdWJlLlN5bU11bHRJbnZbMF1bal0sIENvb3JkQ3ViZS5DdWJpZUQpO1xuICAgICAgICAgICAgICAgIENvb3JkQ3ViZS5VRFNsaWNlQ29ualtpXVtqID4+IDFdID0gQ29vcmRDdWJlLkN1YmllRC5VRFNsaWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBTZXRQcnVuaW5nKHRhYmxlLCBpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdGFibGVbaW5kZXggPj4gM10gXj0gdmFsdWUgPDwgKGluZGV4IDw8IDIpO1xuICAgIH1cbiAgICBzdGF0aWMgR2V0UHJ1bmluZyh0YWJsZSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICh0YWJsZVtpbmRleCA+PiAzXSA+PiAoaW5kZXggPDwgMikpICYgMHhmO1xuICAgIH1cbiAgICBzdGF0aWMgSGFzWmVybyh2YWwpIHtcbiAgICAgICAgcmV0dXJuICgodmFsIC0gMHgxMTExMTExMSkgJiB+dmFsICYgMHg4ODg4ODg4OCkgIT0gMDtcbiAgICB9XG4gICAgc3RhdGljIEluaXRSYXdTeW1QcnVuKFBydW5UYWJsZSwgTl9SQVcsIE5fU1lNLCBSYXdNb3ZlLCBSYXdDb25qLCBTeW1Nb3ZlLCBTeW1TdGF0ZSwgUHJ1bkZsYWcpIHtcbiAgICAgICAgY29uc3QgU1lNX1NISUZUID0gUHJ1bkZsYWcgJiAweGY7XG4gICAgICAgIGNvbnN0IFNZTV9FMkNfTUFHSUMgPSAoKFBydW5GbGFnID4+IDQpICYgMSkgPT0gMSA/IDB4MDBkZGRkMDAgOiAweDAwMDAwMDAwO1xuICAgICAgICBjb25zdCBJU19QSEFTRTIgPSAoKFBydW5GbGFnID4+IDUpICYgMSkgPT0gMTtcbiAgICAgICAgY29uc3QgSU5WX0RFUFRIID0gKFBydW5GbGFnID4+IDgpICYgMHhmO1xuICAgICAgICBjb25zdCBNQVhfREVQVEggPSAoUHJ1bkZsYWcgPj4gMTIpICYgMHhmO1xuICAgICAgICBjb25zdCBNSU5fREVQVEggPSAoUHJ1bkZsYWcgPj4gMTYpICYgMHhmO1xuICAgICAgICBjb25zdCBTWU1fTUFTSyA9ICgxIDw8IFNZTV9TSElGVCkgLSAxO1xuICAgICAgICBjb25zdCBOX1NJWkUgPSBOX1JBVyAqIE5fU1lNO1xuICAgICAgICBjb25zdCBOX01PVkVTID0gSVNfUEhBU0UyID8gMTAgOiAxODtcbiAgICAgICAgY29uc3QgTkVYVF9BWElTX01BR0lDID0gTl9NT1ZFUyA9PSAxMCA/IDB4NDIgOiAweDkyNDkyO1xuICAgICAgICBsZXQgZGVwdGggPSBDb29yZEN1YmUuR2V0UHJ1bmluZyhQcnVuVGFibGUsIE5fU0laRSkgLSAxO1xuICAgICAgICBpZiAoZGVwdGggPT0gLTEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKE5fU0laRSA+PiAzKSArIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIFBydW5UYWJsZVtpXSA9IDB4ZmZmZmZmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDb29yZEN1YmUuU2V0UHJ1bmluZyhQcnVuVGFibGUsIDAsIDAgXiAweGYpO1xuICAgICAgICAgICAgZGVwdGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCBOX1NJWkUsIDB4ZiBeIChkZXB0aCArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBTRUFSQ0hfREVQVEggPSBNYXRoLm1pbihNYXRoLm1heChkZXB0aCArIDEsIE1JTl9ERVBUSCksIE1BWF9ERVBUSCk7XG4gICAgICAgIHdoaWxlIChkZXB0aCA8IFNFQVJDSF9ERVBUSCkge1xuICAgICAgICAgICAgY29uc3QgaW52ID0gZGVwdGggPiBJTlZfREVQVEg7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBpbnYgPyAweGYgOiBkZXB0aDtcbiAgICAgICAgICAgIGNvbnN0IHNlbEFyck1hc2sgPSBzZWxlY3QgKiAweDExMTExMTExO1xuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBpbnYgPyBkZXB0aCA6IDB4ZjtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBDb29yZEN1YmUuaW5pdGVkKys7XG4gICAgICAgICAgICBjb25zdCB4b3JWYWwgPSBkZXB0aCBeIDB4ZjtcbiAgICAgICAgICAgIGxldCB2YWwgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOX1NJWkU7IGkrKywgdmFsID4+PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKChpICYgNykgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBQcnVuVGFibGVbaSA+PiAzXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFDb29yZEN1YmUuSGFzWmVybyh2YWwgXiBzZWxBcnJNYXNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh2YWwgJiAweGYpICE9IHNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmF3ID0gaSAlIE5fUkFXO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN5bSA9IH5+KGkgLyBOX1JBVyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBOX01PVkVTOyBtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN5bXggPSBTeW1Nb3ZlW3N5bV1bbV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhd3ggPSBSYXdDb25qW1Jhd01vdmVbcmF3XVttXV1bc3lteCAmIFNZTV9NQVNLXTtcbiAgICAgICAgICAgICAgICAgICAgc3lteCA+Pj0gU1lNX1NISUZUO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBzeW14ICogTl9SQVcgKyByYXd4O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcnVuID0gQ29vcmRDdWJlLkdldFBydW5pbmcoUHJ1blRhYmxlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJ1biAhPSBjaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBydW4gPCBkZXB0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtICs9IChORVhUX0FYSVNfTUFHSUMgPj4gbSkgJiAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGludikge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCBpLCB4b3JWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCBpZHgsIHhvclZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxLCBzeW1TdGF0ZSA9IFN5bVN0YXRlW3N5bXhdOyAoc3ltU3RhdGUgPj49IDEpICE9IDA7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzeW1TdGF0ZSAmIDEpICE9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZHh4ID0gc3lteCAqIE5fUkFXO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4eCArPSBSYXdDb25qW3Jhd3hdW2ogXiAoKFNZTV9FMkNfTUFHSUMgPj4gKGogPDwgMSkpICYgMyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENvb3JkQ3ViZS5HZXRQcnVuaW5nKFBydW5UYWJsZSwgaWR4eCkgPT0gY2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb29yZEN1YmUuU2V0UHJ1bmluZyhQcnVuVGFibGUsIGlkeHgsIHhvclZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQ29vcmRDdWJlLlNldFBydW5pbmcoUHJ1blRhYmxlLCBOX1NJWkUsIChkZXB0aCArIDEpIF4gMHhmKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRTbGljZVR3aXN0UHJ1bigpIHtcbiAgICAgICAgQ29vcmRDdWJlLkluaXRSYXdTeW1QcnVuKENvb3JkQ3ViZS5VRFNsaWNlVHdpc3RQcnVuLCA0OTUsIDMyNCwgQ29vcmRDdWJlLlVEU2xpY2VNb3ZlLCBDb29yZEN1YmUuVURTbGljZUNvbmosIENvb3JkQ3ViZS5Ud2lzdE1vdmUsIEN1YmllQ3ViZS5TeW1TdGF0ZVR3aXN0LCAweDY5NjAzKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRTbGljZUZsaXBQcnVuKCkge1xuICAgICAgICBDb29yZEN1YmUuSW5pdFJhd1N5bVBydW4oQ29vcmRDdWJlLlVEU2xpY2VGbGlwUHJ1biwgNDk1LCAzMzYsIENvb3JkQ3ViZS5VRFNsaWNlTW92ZSwgQ29vcmRDdWJlLlVEU2xpY2VDb25qLCBDb29yZEN1YmUuRmxpcE1vdmUsIEN1YmllQ3ViZS5TeW1TdGF0ZUZsaXAsIDB4Njk2MDMpO1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdE1DUGVybVBydW4oKSB7XG4gICAgICAgIENvb3JkQ3ViZS5Jbml0UmF3U3ltUHJ1bihDb29yZEN1YmUuTUNQZXJtUHJ1biwgMjQsIDI3NjgsIENvb3JkQ3ViZS5NUGVybU1vdmUsIENvb3JkQ3ViZS5NUGVybUNvbmosIENvb3JkQ3ViZS5DUGVybU1vdmUsIEN1YmllQ3ViZS5TeW1TdGF0ZVBlcm0sIDB4OGVhMzQpO1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdEVQZXJtQ29tYlBQcnVuKCkge1xuICAgICAgICBDb29yZEN1YmUuSW5pdFJhd1N5bVBydW4oQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biwgQ29vcmRDdWJlLk5fQ09NQiwgMjc2OCwgQ29vcmRDdWJlLkNDb21iUE1vdmUsIENvb3JkQ3ViZS5DQ29tYlBDb25qLCBDb29yZEN1YmUuRVBlcm1Nb3ZlLCBDdWJpZUN1YmUuU3ltU3RhdGVQZXJtLCAweDdkODI0KTtcbiAgICB9XG4gICAgc2V0V2l0aFBydW4oY2MsIGRlcHRoKSB7XG4gICAgICAgIHRoaXMudHdpc3QgPSBjYy5Ud2lzdFN5bTtcbiAgICAgICAgdGhpcy5mbGlwID0gY2MuRmxpcFN5bTtcbiAgICAgICAgdGhpcy50c3ltID0gdGhpcy50d2lzdCAmIDc7XG4gICAgICAgIHRoaXMudHdpc3QgPSB0aGlzLnR3aXN0ID4+IDM7XG4gICAgICAgIHRoaXMucHJ1biA9IDA7XG4gICAgICAgIHRoaXMuZnN5bSA9IHRoaXMuZmxpcCAmIDc7XG4gICAgICAgIHRoaXMuZmxpcCA9IHRoaXMuZmxpcCA+PiAzO1xuICAgICAgICB0aGlzLnNsaWNlID0gY2MuVURTbGljZTtcbiAgICAgICAgdGhpcy5wcnVuID0gTWF0aC5tYXgodGhpcy5wcnVuLCBNYXRoLm1heChDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuVURTbGljZVR3aXN0UHJ1biwgdGhpcy50d2lzdCAqIENvb3JkQ3ViZS5OX1NMSUNFICsgQ29vcmRDdWJlLlVEU2xpY2VDb25qW3RoaXMuc2xpY2VdW3RoaXMudHN5bV0pLCBDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuVURTbGljZUZsaXBQcnVuLCB0aGlzLmZsaXAgKiBDb29yZEN1YmUuTl9TTElDRSArIENvb3JkQ3ViZS5VRFNsaWNlQ29ualt0aGlzLnNsaWNlXVt0aGlzLmZzeW1dKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5wcnVuIDw9IGRlcHRoO1xuICAgIH1cbiAgICBkb01vdmVQcnVuKGNjLCBtKSB7XG4gICAgICAgIHRoaXMuc2xpY2UgPSBDb29yZEN1YmUuVURTbGljZU1vdmVbY2Muc2xpY2VdW21dO1xuICAgICAgICB0aGlzLmZsaXAgPSBDb29yZEN1YmUuRmxpcE1vdmVbY2MuZmxpcF1bQ3ViaWVDdWJlLlN5bThNb3ZlWyhtIDw8IDMpIHwgY2MuZnN5bV1dO1xuICAgICAgICB0aGlzLmZzeW0gPSAodGhpcy5mbGlwICYgNykgXiBjYy5mc3ltO1xuICAgICAgICB0aGlzLmZsaXAgPj49IDM7XG4gICAgICAgIHRoaXMudHdpc3QgPSBDb29yZEN1YmUuVHdpc3RNb3ZlW2NjLnR3aXN0XVtDdWJpZUN1YmUuU3ltOE1vdmVbKG0gPDwgMykgfCBjYy50c3ltXV07XG4gICAgICAgIHRoaXMudHN5bSA9ICh0aGlzLnR3aXN0ICYgNykgXiBjYy50c3ltO1xuICAgICAgICB0aGlzLnR3aXN0ID4+PSAzO1xuICAgICAgICB0aGlzLnBydW4gPSBNYXRoLm1heChDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuVURTbGljZVR3aXN0UHJ1biwgdGhpcy50d2lzdCAqIENvb3JkQ3ViZS5OX1NMSUNFICsgQ29vcmRDdWJlLlVEU2xpY2VDb25qW3RoaXMuc2xpY2VdW3RoaXMudHN5bV0pLCBDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuVURTbGljZUZsaXBQcnVuLCB0aGlzLmZsaXAgKiBDb29yZEN1YmUuTl9TTElDRSArIENvb3JkQ3ViZS5VRFNsaWNlQ29ualt0aGlzLnNsaWNlXVt0aGlzLmZzeW1dKSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBydW47XG4gICAgfVxufVxuQ29vcmRDdWJlLk5fTU9WRVMgPSAxODtcbkNvb3JkQ3ViZS5OX01PVkVTMiA9IDEwO1xuQ29vcmRDdWJlLk5fU0xJQ0UgPSA0OTU7XG5Db29yZEN1YmUuTl9UV0lTVCA9IDIxODc7XG5Db29yZEN1YmUuTl9UV0lTVF9TWU0gPSAzMjQ7XG5Db29yZEN1YmUuTl9GTElQID0gMjA0ODtcbkNvb3JkQ3ViZS5OX0ZMSVBfU1lNID0gMzM2O1xuQ29vcmRDdWJlLk5fUEVSTSA9IDQwMzIwO1xuQ29vcmRDdWJlLk5fUEVSTV9TWU0gPSAyNzY4O1xuQ29vcmRDdWJlLk5fTVBFUk0gPSAyNDtcbkNvb3JkQ3ViZS5OX0NPTUIgPSA3MDtcbkNvb3JkQ3ViZS5QMl9QQVJJVFlfTU9WRSA9IDA7XG5Db29yZEN1YmUuVURTbGljZU1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5Ud2lzdE1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5GbGlwTW92ZSA9IFtdO1xuQ29vcmRDdWJlLlVEU2xpY2VDb25qID0gW107XG5Db29yZEN1YmUuVURTbGljZVR3aXN0UHJ1biA9IFtdO1xuQ29vcmRDdWJlLlVEU2xpY2VGbGlwUHJ1biA9IFtdO1xuQ29vcmRDdWJlLkNQZXJtTW92ZSA9IFtdO1xuQ29vcmRDdWJlLkVQZXJtTW92ZSA9IFtdO1xuQ29vcmRDdWJlLk1QZXJtTW92ZSA9IFtdO1xuQ29vcmRDdWJlLk1QZXJtQ29uaiA9IFtdO1xuQ29vcmRDdWJlLkNDb21iUE1vdmUgPSBbXTtcbkNvb3JkQ3ViZS5DQ29tYlBDb25qID0gW107XG5Db29yZEN1YmUuTUNQZXJtUHJ1biA9IFtdO1xuQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biA9IFtdO1xuQ29vcmRDdWJlLmluaXRlZCA9IDA7XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi9VdGlsXCI7XG5pbXBvcnQgQ29vcmRDdWJlIGZyb20gXCIuL0Nvb3JkQ3ViZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ViaWVDdWJlIHtcbiAgICBjb25zdHJ1Y3RvcihjcGVybSA9IDAsIHR3aXN0ID0gMCwgZXBlcm0gPSAwLCBmbGlwID0gMCkge1xuICAgICAgICB0aGlzLmNhID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xuICAgICAgICB0aGlzLmVhID0gWzAsIDIsIDQsIDYsIDgsIDEwLCAxMiwgMTQsIDE2LCAxOCwgMjAsIDIyXTtcbiAgICAgICAgdGhpcy5DUGVybSA9IGNwZXJtO1xuICAgICAgICB0aGlzLlR3aXN0ID0gdHdpc3Q7XG4gICAgICAgIFV0aWwuU2V0TlBlcm1GdWxsKHRoaXMuZWEsIGVwZXJtLCAxMiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuRmxpcCA9IGZsaXA7XG4gICAgfVxuICAgIHN0YXRpYyBFU3ltMkNTeW0oaWR4KSB7XG4gICAgICAgIHJldHVybiBpZHggXiAoKEN1YmllQ3ViZS5TWU1fRTJDX01BR0lDID4+ICgoaWR4ICYgMHhmKSA8PCAxKSkgJiAzKTtcbiAgICB9XG4gICAgc3RhdGljIEluaXRNb3ZlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgcmVzdWx0WzBdID0gbmV3IEN1YmllQ3ViZSgxNTEyMCwgMCwgMTE5NzUwNDAwLCAwKTtcbiAgICAgICAgcmVzdWx0WzNdID0gbmV3IEN1YmllQ3ViZSgyMTAyMSwgMTQ5NCwgMzIzNDAzNDE3LCAwKTtcbiAgICAgICAgcmVzdWx0WzZdID0gbmV3IEN1YmllQ3ViZSg4MDY0LCAxMjM2LCAyOTQ0MTgwOCwgNTUwKTtcbiAgICAgICAgcmVzdWx0WzldID0gbmV3IEN1YmllQ3ViZSg5LCAwLCA1ODgwLCAwKTtcbiAgICAgICAgcmVzdWx0WzEyXSA9IG5ldyBDdWJpZUN1YmUoMTIzMCwgNDEyLCAyOTQ5NjYwLCAwKTtcbiAgICAgICAgcmVzdWx0WzE1XSA9IG5ldyBDdWJpZUN1YmUoMjI0LCAxMzcsIDMyODU1MiwgMTM3KTtcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCAxODsgYSArPSAzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMDsgcCA8IDI7IHArKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFthICsgcCArIDFdID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChyZXN1bHRbYSArIHBdLCByZXN1bHRbYV0sIHJlc3VsdFthICsgcCArIDFdKTtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQocmVzdWx0W2EgKyBwXSwgcmVzdWx0W2FdLCByZXN1bHRbYSArIHAgKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQ3ViaWVDdWJlLk1vdmVDdWJlID0gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdFN5bSgpIHtcbiAgICAgICAgbGV0IGMgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIGxldCBkID0gbmV3IEN1YmllQ3ViZSgpO1xuICAgICAgICBjb25zdCBmMiA9IG5ldyBDdWJpZUN1YmUoMjg3ODMsIDAsIDI1OTI2ODQwNywgMCk7XG4gICAgICAgIGNvbnN0IHU0ID0gbmV3IEN1YmllQ3ViZSgxNTEzOCwgMCwgMTE5NzY1NTM4LCA3KTtcbiAgICAgICAgY29uc3QgbHIyID0gbmV3IEN1YmllQ3ViZSg1MTY3LCAwLCA4MzQ3MzIwNywgMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBscjIuY2FbaV0gfD0gMyA8PCAzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bUN1YmVbaV0gPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgICAgICBDdWJpZUN1YmUuU3ltQ3ViZVtpXS5jb3B5KGMpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0RnVsbChjLCB1NCwgZCk7XG4gICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoYywgdTQsIGQpO1xuICAgICAgICAgICAgW2MsIGRdID0gW2QsIGNdO1xuICAgICAgICAgICAgaWYgKGkgJSA0ID09IDMpIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHRGdWxsKGMsIGxyMiwgZCk7XG4gICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KGMsIGxyMiwgZCk7XG4gICAgICAgICAgICAgICAgW2MsIGRdID0gW2QsIGNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA4ID09IDcpIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHRGdWxsKGMsIGYyLCBkKTtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoYywgZjIsIGQpO1xuICAgICAgICAgICAgICAgIFtjLCBkXSA9IFtkLCBjXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1NdWx0W2ldID0gW107XG4gICAgICAgICAgICBDdWJpZUN1YmUuU3ltTXVsdEludltpXSA9IFtdO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bU1vdmVbaV0gPSBbXTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1Nb3ZlVURbaV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7IGorKykge1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1NdWx0W2ldW2pdID0gaSBeIGogXiAoKDB4MTRhYjQgPj4gaikgJiAoaSA8PCAxKSAmIDIpO1xuICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5TeW1NdWx0SW52W0N1YmllQ3ViZS5TeW1NdWx0W2ldW2pdXVtqXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCAxNjsgcysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE4OyBqKyspIHtcbiAgICAgICAgICAgICAgICBDdWJpZUN1YmUuQ29ybkNvbmp1Z2F0ZShDdWJpZUN1YmUuTW92ZUN1YmVbal0sIEN1YmllQ3ViZS5TeW1NdWx0SW52WzBdW3NdLCBjKTtcbiAgICAgICAgICAgICAgICBvdXRsb29wOiBmb3IgKGxldCBtID0gMDsgbSA8IDE4OyBtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCA4OyB0KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDdWJpZUN1YmUuTW92ZUN1YmVbbV0uY2FbdF0gIT0gYy5jYVt0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGxvb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bU1vdmVbc11bal0gPSBtO1xuICAgICAgICAgICAgICAgICAgICBDdWJpZUN1YmUuU3ltTW92ZVVEW3NdW1V0aWwuU1REMlVEW2pdXSA9IFV0aWwuU1REMlVEW21dO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgQ3ViaWVDdWJlLlN5bThNb3ZlWyhqIDw8IDMpIHwgKHMgPj4gMSldID0gQ3ViaWVDdWJlLlN5bU1vdmVbc11bal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBJbml0U3ltMlJhdyhOX1JBVywgU3ltMlJhdywgUmF3MlN5bSwgU3ltU3RhdGUsIGNvb3JkKSB7XG4gICAgICAgIGNvbnN0IGMgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgIGxldCBjb3VudCA9IDAsIGlkeCA9IDA7XG4gICAgICAgIGNvbnN0IHN5bUluYyA9IGNvb3JkID49IDIgPyAxIDogMjtcbiAgICAgICAgY29uc3QgaXNFZGdlID0gY29vcmQgIT0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOX1JBVzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoUmF3MlN5bVtpXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY29vcmQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGMuRmxpcCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgYy5Ud2lzdCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgYy5FUGVybSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCAxNjsgcyArPSBzeW1JbmMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgIEN1YmllQ3ViZS5FZGdlQ29uanVnYXRlKGMsIHMsIGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ3ViaWVDdWJlLkNvcm5Db25qdWdhdGUoYywgcywgZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29vcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gZC5GbGlwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGQuVHdpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gZC5FUGVybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgU3ltU3RhdGVbY291bnRdIHw9IDEgPDwgKHMgLyBzeW1JbmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBSYXcyU3ltW2lkeF0gPSAoKGNvdW50IDw8IDQpIHwgcykgLyBzeW1JbmM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTeW0yUmF3W2NvdW50KytdID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIHN0YXRpYyBJbml0RmxpcFN5bTJSYXcoKSB7XG4gICAgICAgIEN1YmllQ3ViZS5Jbml0U3ltMlJhdyhDb29yZEN1YmUuTl9GTElQLCBDdWJpZUN1YmUuRmxpcFMyUiwgQ3ViaWVDdWJlLkZsaXBSMlMsIEN1YmllQ3ViZS5TeW1TdGF0ZUZsaXAsIDApO1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdFR3aXN0U3ltMlJhdygpIHtcbiAgICAgICAgQ3ViaWVDdWJlLkluaXRTeW0yUmF3KENvb3JkQ3ViZS5OX1RXSVNULCBDdWJpZUN1YmUuVHdpc3RTMlIsIEN1YmllQ3ViZS5Ud2lzdFIyUywgQ3ViaWVDdWJlLlN5bVN0YXRlVHdpc3QsIDEpO1xuICAgIH1cbiAgICBzdGF0aWMgSW5pdFBlcm1TeW0yUmF3KCkge1xuICAgICAgICBDdWJpZUN1YmUuSW5pdFN5bTJSYXcoQ29vcmRDdWJlLk5fUEVSTSwgQ3ViaWVDdWJlLkVQZXJtUzJSLCBDdWJpZUN1YmUuRVBlcm1SMlMsIEN1YmllQ3ViZS5TeW1TdGF0ZVBlcm0sIDIpO1xuICAgICAgICBjb25zdCBjYyA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDb29yZEN1YmUuTl9QRVJNX1NZTTsgaSsrKSB7XG4gICAgICAgICAgICBjYy5FUGVybSA9IEN1YmllQ3ViZS5FUGVybVMyUltpXTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5QZXJtMkNvbWJQW2ldID0gVXRpbC5HZXRDb21iKGNjLmVhLCAwLCB0cnVlKTtcbiAgICAgICAgICAgIGNjLmludmVyc2UoKTtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5QZXJtSW52RWRnZVN5bVtpXSA9IGNjLkVQZXJtU3ltO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ29vcmRDdWJlLk5fTVBFUk07IGkrKykge1xuICAgICAgICAgICAgY2MuTVBlcm0gPSBpO1xuICAgICAgICAgICAgY2MuaW52ZXJzZSgpO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLk1QZXJtSW52W2ldID0gY2MuTVBlcm07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEluaXQoKSB7XG4gICAgICAgIEN1YmllQ3ViZS50ZW1wcyA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgQ3ViaWVDdWJlLkluaXRNb3ZlKCk7XG4gICAgICAgIEN1YmllQ3ViZS5Jbml0U3ltKCk7XG4gICAgfVxuICAgIHN0YXRpYyBDb3JuTXVsdChhLCBiLCBwcm9kKSB7XG4gICAgICAgIGZvciAobGV0IGNvcm4gPSAwOyBjb3JuIDwgODsgY29ybisrKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlBID0gYS5jYVtiLmNhW2Nvcm5dICYgN10gPj4gMztcbiAgICAgICAgICAgIGNvbnN0IG9yaUIgPSBiLmNhW2Nvcm5dID4+IDM7XG4gICAgICAgICAgICBwcm9kLmNhW2Nvcm5dID0gKGEuY2FbYi5jYVtjb3JuXSAmIDddICYgNykgfCAoKG9yaUEgKyBvcmlCKSAlIDMgPDwgMyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIENvcm5NdWx0RnVsbChhLCBiLCBwcm9kKSB7XG4gICAgICAgIGZvciAobGV0IGNvcm4gPSAwOyBjb3JuIDwgODsgY29ybisrKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlBID0gYS5jYVtiLmNhW2Nvcm5dICYgN10gPj4gMztcbiAgICAgICAgICAgIGNvbnN0IG9yaUIgPSBiLmNhW2Nvcm5dID4+IDM7XG4gICAgICAgICAgICBsZXQgb3JpID0gb3JpQSArIChvcmlBIDwgMyA/IG9yaUIgOiA2IC0gb3JpQik7XG4gICAgICAgICAgICBvcmkgPSAob3JpICUgMykgKyAob3JpQSA8IDMgPT0gb3JpQiA8IDMgPyAwIDogMyk7XG4gICAgICAgICAgICBwcm9kLmNhW2Nvcm5dID0gKGEuY2FbYi5jYVtjb3JuXSAmIDddICYgNykgfCAob3JpIDw8IDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBFZGdlTXVsdChhLCBiLCBwcm9kKSB7XG4gICAgICAgIGZvciAobGV0IGVkID0gMDsgZWQgPCAxMjsgZWQrKykge1xuICAgICAgICAgICAgcHJvZC5lYVtlZF0gPSBhLmVhW2IuZWFbZWRdID4+IDFdIF4gKGIuZWFbZWRdICYgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIENvcm5Db25qdWdhdGUoYSwgaWR4LCBiKSB7XG4gICAgICAgIGNvbnN0IHNpbnYgPSBDdWJpZUN1YmUuU3ltQ3ViZVtDdWJpZUN1YmUuU3ltTXVsdEludlswXVtpZHhdXTtcbiAgICAgICAgY29uc3QgcyA9IEN1YmllQ3ViZS5TeW1DdWJlW2lkeF07XG4gICAgICAgIGZvciAobGV0IGNvcm4gPSAwOyBjb3JuIDwgODsgY29ybisrKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlBID0gc2ludi5jYVthLmNhW3MuY2FbY29ybl0gJiA3XSAmIDddID4+IDM7XG4gICAgICAgICAgICBjb25zdCBvcmlCID0gYS5jYVtzLmNhW2Nvcm5dICYgN10gPj4gMztcbiAgICAgICAgICAgIGNvbnN0IG9yaSA9IG9yaUEgPCAzID8gb3JpQiA6ICgzIC0gb3JpQikgJSAzO1xuICAgICAgICAgICAgYi5jYVtjb3JuXSA9IChzaW52LmNhW2EuY2Fbcy5jYVtjb3JuXSAmIDddICYgN10gJiA3KSB8IChvcmkgPDwgMyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEVkZ2VDb25qdWdhdGUoYSwgaWR4LCBiKSB7XG4gICAgICAgIGNvbnN0IHNpbnYgPSBDdWJpZUN1YmUuU3ltQ3ViZVtDdWJpZUN1YmUuU3ltTXVsdEludlswXVtpZHhdXTtcbiAgICAgICAgY29uc3QgcyA9IEN1YmllQ3ViZS5TeW1DdWJlW2lkeF07XG4gICAgICAgIGZvciAobGV0IGVkID0gMDsgZWQgPCAxMjsgZWQrKykge1xuICAgICAgICAgICAgYi5lYVtlZF0gPSBzaW52LmVhW2EuZWFbcy5lYVtlZF0gPj4gMV0gPj4gMV0gXiAoYS5lYVtzLmVhW2VkXSA+PiAxXSAmIDEpIF4gKHMuZWFbZWRdICYgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEdldFBlcm1TeW1JbnYoaWR4LCBzeW0sIGNvcm5lcikge1xuICAgICAgICBsZXQgaWR4aSA9IEN1YmllQ3ViZS5QZXJtSW52RWRnZVN5bVtpZHhdO1xuICAgICAgICBpZiAoY29ybmVyKSB7XG4gICAgICAgICAgICBpZHhpID0gQ3ViaWVDdWJlLkVTeW0yQ1N5bShpZHhpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGlkeGkgJiAweGZmZjApIHwgQ3ViaWVDdWJlLlN5bU11bHRbaWR4aSAmIDB4Zl1bc3ltXTtcbiAgICB9XG4gICAgc3RhdGljIEdldFNraXBNb3Zlcyhzc3ltKSB7XG4gICAgICAgIGxldCByZXQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgKHNzeW0gPj49IDEpICE9IDA7IGkrKykge1xuICAgICAgICAgICAgaWYgKChzc3ltICYgMSkgPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldCB8PSBDdWJpZUN1YmUuRmlyc3RNb3ZlU3ltW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGNvcHkoYykge1xuICAgICAgICBmb3IgKGxldCBlZGdlID0gMDsgZWRnZSA8IDEyOyBlZGdlKyspIHtcbiAgICAgICAgICAgIHRoaXMuZWFbZWRnZV0gPSBjLmVhW2VkZ2VdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvcm4gPSAwOyBjb3JuIDwgODsgY29ybisrKSB7XG4gICAgICAgICAgICB0aGlzLmNhW2Nvcm5dID0gYy5jYVtjb3JuXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZlcnNlKCkge1xuICAgICAgICBmb3IgKGxldCBlZGdlID0gMDsgZWRnZSA8IDEyOyBlZGdlKyspIHtcbiAgICAgICAgICAgIEN1YmllQ3ViZS50ZW1wcy5lYVt0aGlzLmVhW2VkZ2VdID4+IDFdID0gKGVkZ2UgPDwgMSkgfCAodGhpcy5lYVtlZGdlXSAmIDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvcm4gPSAwOyBjb3JuIDwgODsgY29ybisrKSB7XG4gICAgICAgICAgICBDdWJpZUN1YmUudGVtcHMuY2FbdGhpcy5jYVtjb3JuXSAmIDB4N10gPSBjb3JuIHwgKCgweDIwID4+ICh0aGlzLmNhW2Nvcm5dID4+IDMpKSAmIDB4MTgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29weShDdWJpZUN1YmUudGVtcHMpO1xuICAgIH1cbiAgICBVUkZDb25qdWdhdGUoKSB7XG4gICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdChDdWJpZUN1YmUuVVJGMiwgdGhpcywgQ3ViaWVDdWJlLnRlbXBzKTtcbiAgICAgICAgQ3ViaWVDdWJlLkNvcm5NdWx0KEN1YmllQ3ViZS50ZW1wcywgQ3ViaWVDdWJlLlVSRjEsIHRoaXMpO1xuICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ3ViaWVDdWJlLlVSRjIsIHRoaXMsIEN1YmllQ3ViZS50ZW1wcyk7XG4gICAgICAgIEN1YmllQ3ViZS5FZGdlTXVsdChDdWJpZUN1YmUudGVtcHMsIEN1YmllQ3ViZS5VUkYxLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IEZsaXAoKSB7XG4gICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGlkeCA9IChpZHggPDwgMSkgfCAodGhpcy5lYVtpXSAmIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIHNldCBGbGlwKGlkeCkge1xuICAgICAgICBsZXQgcGFyaXR5ID0gMDtcbiAgICAgICAgbGV0IHZhbCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA+PSAwOyBpLS0sIGlkeCA+Pj0gMSkge1xuICAgICAgICAgICAgcGFyaXR5IF49IHZhbCA9IGlkeCAmIDE7XG4gICAgICAgICAgICB0aGlzLmVhW2ldID0gKHRoaXMuZWFbaV0gJiB+MSkgfCB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lYVsxMV0gPSAodGhpcy5lYVsxMV0gJiB+MSkgfCBwYXJpdHk7XG4gICAgfVxuICAgIGdldCBGbGlwU3ltKCkge1xuICAgICAgICByZXR1cm4gQ3ViaWVDdWJlLkZsaXBSMlNbdGhpcy5GbGlwXTtcbiAgICB9XG4gICAgZ2V0IFR3aXN0KCkge1xuICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGlkeCArPSAoaWR4IDw8IDEpICsgKHRoaXMuY2FbaV0gPj4gMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgc2V0IFR3aXN0KGlkeCkge1xuICAgICAgICBsZXQgdHdzdCA9IDE1O1xuICAgICAgICBsZXQgdmFsID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDY7IGkgPj0gMDsgaS0tLCBpZHggPSB+fihpZHggLyAzKSkge1xuICAgICAgICAgICAgdHdzdCAtPSB2YWwgPSBpZHggJSAzO1xuICAgICAgICAgICAgdGhpcy5jYVtpXSA9ICh0aGlzLmNhW2ldICYgMHg3KSB8ICh2YWwgPDwgMyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYVs3XSA9ICh0aGlzLmNhWzddICYgMHg3KSB8ICh0d3N0ICUgMyA8PCAzKTtcbiAgICB9XG4gICAgZ2V0IFR3aXN0U3ltKCkge1xuICAgICAgICByZXR1cm4gQ3ViaWVDdWJlLlR3aXN0UjJTW3RoaXMuVHdpc3RdO1xuICAgIH1cbiAgICBnZXQgVURTbGljZSgpIHtcbiAgICAgICAgcmV0dXJuIDQ5NCAtIFV0aWwuR2V0Q29tYih0aGlzLmVhLCA4LCB0cnVlKTtcbiAgICB9XG4gICAgc2V0IFVEU2xpY2UoaWR4KSB7XG4gICAgICAgIFV0aWwuU2V0Q29tYih0aGlzLmVhLCA0OTQgLSBpZHgsIDgsIHRydWUpO1xuICAgIH1cbiAgICBnZXQgQ1Blcm0oKSB7XG4gICAgICAgIHJldHVybiBVdGlsLkdldE5QZXJtKHRoaXMuY2EsIDgsIGZhbHNlKTtcbiAgICB9XG4gICAgc2V0IENQZXJtKGlkeCkge1xuICAgICAgICBVdGlsLlNldE5QZXJtKHRoaXMuY2EsIGlkeCwgOCwgZmFsc2UpO1xuICAgIH1cbiAgICBnZXQgQ1Blcm1TeW0oKSB7XG4gICAgICAgIHJldHVybiBDdWJpZUN1YmUuRVN5bTJDU3ltKEN1YmllQ3ViZS5FUGVybVIyU1t0aGlzLkNQZXJtXSk7XG4gICAgfVxuICAgIGdldCBFUGVybSgpIHtcbiAgICAgICAgcmV0dXJuIFV0aWwuR2V0TlBlcm0odGhpcy5lYSwgOCwgdHJ1ZSk7XG4gICAgfVxuICAgIHNldCBFUGVybShpZHgpIHtcbiAgICAgICAgVXRpbC5TZXROUGVybSh0aGlzLmVhLCBpZHgsIDgsIHRydWUpO1xuICAgIH1cbiAgICBnZXQgRVBlcm1TeW0oKSB7XG4gICAgICAgIHJldHVybiBDdWJpZUN1YmUuRVBlcm1SMlNbdGhpcy5FUGVybV07XG4gICAgfVxuICAgIGdldCBNUGVybSgpIHtcbiAgICAgICAgcmV0dXJuIFV0aWwuR2V0TlBlcm1GdWxsKHRoaXMuZWEsIDEyLCB0cnVlKSAlIDI0O1xuICAgIH1cbiAgICBzZXQgTVBlcm0oaWR4KSB7XG4gICAgICAgIFV0aWwuU2V0TlBlcm1GdWxsKHRoaXMuZWEsIGlkeCwgMTIsIHRydWUpO1xuICAgIH1cbiAgICBnZXQgQ0NvbWIoKSB7XG4gICAgICAgIHJldHVybiBVdGlsLkdldENvbWIodGhpcy5jYSwgMCwgZmFsc2UpO1xuICAgIH1cbiAgICBzZXQgQ0NvbWIoaWR4KSB7XG4gICAgICAgIFV0aWwuU2V0Q29tYih0aGlzLmNhLCBpZHgsIDAsIGZhbHNlKTtcbiAgICB9XG4gICAgdmVyaWZ5KCkge1xuICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgbGV0IG1hc2sgPSAwO1xuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IDEyOyBlKyspIHtcbiAgICAgICAgICAgIG1hc2sgfD0gMSA8PCAodGhpcy5lYVtlXSA+PiAxKTtcbiAgICAgICAgICAgIHN1bSBePSB0aGlzLmVhW2VdICYgMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFzayAhPSAweGZmZikge1xuICAgICAgICAgICAgcmV0dXJuIFwibWlzc2luZyBlZGdlc1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdW0gIT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiZmxpcGVkIGVkZ2VzXCI7XG4gICAgICAgIH1cbiAgICAgICAgbWFzayA9IDA7XG4gICAgICAgIHN1bSA9IDA7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgODsgYysrKSB7XG4gICAgICAgICAgICBtYXNrIHw9IDEgPDwgKHRoaXMuY2FbY10gJiA3KTtcbiAgICAgICAgICAgIHN1bSArPSB0aGlzLmNhW2NdID4+IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hc2sgIT0gMHhmZikge1xuICAgICAgICAgICAgcmV0dXJuIFwibWlzc2luZyBjb3JuZXJzXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1bSAlIDMgIT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHdpc3RlZCBjb3JuZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKFV0aWwuR2V0TlBhcml0eShVdGlsLkdldE5QZXJtRnVsbCh0aGlzLmVhLCAxMiwgdHJ1ZSksIDEyKSBeIFV0aWwuR2V0TlBhcml0eSh0aGlzLkNQZXJtLCA4KSkgIT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwicGFyaXR5IGVycm9yXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgY29uc3QgdHMgPSBcIlVSRkRMQlwiO1xuICAgICAgICBjb25zdCBmID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTQ7IGkrKykge1xuICAgICAgICAgICAgZltpXSA9IHRzW35+KGkgLyA5KV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA4OyBjKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSB0aGlzLmNhW2NdICYgMHg3O1xuICAgICAgICAgICAgY29uc3Qgb3JpID0gdGhpcy5jYVtjXSA+PiAzO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCAzOyBuKyspXG4gICAgICAgICAgICAgICAgZltVdGlsLkNvcm5lckZhY2VsZXRbY11bKG4gKyBvcmkpICUgM11dID0gdHNbfn4oVXRpbC5Db3JuZXJGYWNlbGV0W2pdW25dIC8gOSldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgMTI7IGUrKykge1xuICAgICAgICAgICAgY29uc3QgaiA9IHRoaXMuZWFbZV0gPj4gMTtcbiAgICAgICAgICAgIGNvbnN0IG9yaSA9IHRoaXMuZWFbZV0gJiAxO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCAyOyBuKyspXG4gICAgICAgICAgICAgICAgZltVdGlsLkVkZ2VGYWNlbGV0W2VdWyhuICsgb3JpKSAlIDJdXSA9IHRzW35+KFV0aWwuRWRnZUZhY2VsZXRbal1bbl0gLyA5KV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGYuam9pbihcIlwiKTtcbiAgICB9XG4gICAgZGVzZXJpYWxpemUoZmFjZWxldCkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBmID0gW107XG4gICAgICAgIGNvbnN0IGNlbnRlcnMgPSBmYWNlbGV0WzRdICsgZmFjZWxldFsxM10gKyBmYWNlbGV0WzIyXSArIGZhY2VsZXRbMzFdICsgZmFjZWxldFs0MF0gKyBmYWNlbGV0WzQ5XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1NDsgKytpKSB7XG4gICAgICAgICAgICBmW2ldID0gY2VudGVycy5pbmRleE9mKGZhY2VsZXRbaV0pO1xuICAgICAgICAgICAgaWYgKGZbaV0gPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudCArPSAxIDw8IChmW2ldIDw8IDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCAhPSAweDk5OTk5OSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb2wxLCBjb2wyLCBpLCBqLCBvcmk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA4OyArK2kpIHtcbiAgICAgICAgICAgIGZvciAob3JpID0gMDsgb3JpIDwgMzsgKytvcmkpXG4gICAgICAgICAgICAgICAgaWYgKGZbVXRpbC5Db3JuZXJGYWNlbGV0W2ldW29yaV1dID09IDAgfHwgZltVdGlsLkNvcm5lckZhY2VsZXRbaV1bb3JpXV0gPT0gMylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjb2wxID0gZltVdGlsLkNvcm5lckZhY2VsZXRbaV1bKG9yaSArIDEpICUgM11dO1xuICAgICAgICAgICAgY29sMiA9IGZbVXRpbC5Db3JuZXJGYWNlbGV0W2ldWyhvcmkgKyAyKSAlIDNdXTtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCA4OyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sMSA9PSB+fihVdGlsLkNvcm5lckZhY2VsZXRbal1bMV0gLyA5KSAmJiBjb2wyID09IH5+KFV0aWwuQ29ybmVyRmFjZWxldFtqXVsyXSAvIDkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FbaV0gPSBqIHwgKG9yaSAlIDMgPDwgMyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7ICsraSkge1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IDEyOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAoZltVdGlsLkVkZ2VGYWNlbGV0W2ldWzBdXSA9PSB+fihVdGlsLkVkZ2VGYWNlbGV0W2pdWzBdIC8gOSkgJiZcbiAgICAgICAgICAgICAgICAgICAgZltVdGlsLkVkZ2VGYWNlbGV0W2ldWzFdXSA9PSB+fihVdGlsLkVkZ2VGYWNlbGV0W2pdWzFdIC8gOSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYVtpXSA9IGogPDwgMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmW1V0aWwuRWRnZUZhY2VsZXRbaV1bMF1dID09IH5+KFV0aWwuRWRnZUZhY2VsZXRbal1bMV0gLyA5KSAmJlxuICAgICAgICAgICAgICAgICAgICBmW1V0aWwuRWRnZUZhY2VsZXRbaV1bMV1dID09IH5+KFV0aWwuRWRnZUZhY2VsZXRbal1bMF0gLyA5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhW2ldID0gKGogPDwgMSkgfCAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuQ3ViaWVDdWJlLlN5bUN1YmUgPSBbXTtcbkN1YmllQ3ViZS5Nb3ZlQ3ViZSA9IFtdO1xuQ3ViaWVDdWJlLk1vdmVDdWJlU3ltID0gW107XG5DdWJpZUN1YmUuRmlyc3RNb3ZlU3ltID0gW107XG5DdWJpZUN1YmUuU3ltTXVsdCA9IFtdO1xuQ3ViaWVDdWJlLlN5bU11bHRJbnYgPSBbXTtcbkN1YmllQ3ViZS5TeW1Nb3ZlID0gW107XG5DdWJpZUN1YmUuU3ltOE1vdmUgPSBbXTtcbkN1YmllQ3ViZS5TeW1Nb3ZlVUQgPSBbXTtcbkN1YmllQ3ViZS5GbGlwUzJSID0gW107XG5DdWJpZUN1YmUuVHdpc3RTMlIgPSBbXTtcbkN1YmllQ3ViZS5FUGVybVMyUiA9IFtdO1xuQ3ViaWVDdWJlLlBlcm0yQ29tYlAgPSBbXTtcbkN1YmllQ3ViZS5QZXJtSW52RWRnZVN5bSA9IFtdO1xuQ3ViaWVDdWJlLk1QZXJtSW52ID0gW107XG5DdWJpZUN1YmUuU1lNX0UyQ19NQUdJQyA9IDB4MDBkZGRkMDA7XG5DdWJpZUN1YmUuRmxpcFIyUyA9IFtdO1xuQ3ViaWVDdWJlLlR3aXN0UjJTID0gW107XG5DdWJpZUN1YmUuRVBlcm1SMlMgPSBbXTtcbkN1YmllQ3ViZS5TeW1TdGF0ZVR3aXN0ID0gW107XG5DdWJpZUN1YmUuU3ltU3RhdGVGbGlwID0gW107XG5DdWJpZUN1YmUuU3ltU3RhdGVQZXJtID0gW107XG5DdWJpZUN1YmUuVVJGMSA9IG5ldyBDdWJpZUN1YmUoMjUzMSwgMTM3MywgNjcwMjY4MTksIDEzNjcpO1xuQ3ViaWVDdWJlLlVSRjIgPSBuZXcgQ3ViaWVDdWJlKDIwODksIDE5MDYsIDMyMjc1MjkxMywgMjA0MCk7XG5DdWJpZUN1YmUuVVJGTW92ZSA9IFtcbiAgICBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3XSxcbiAgICBbNiwgNywgOCwgMCwgMSwgMiwgMywgNCwgNSwgMTUsIDE2LCAxNywgOSwgMTAsIDExLCAxMiwgMTMsIDE0XSxcbiAgICBbMywgNCwgNSwgNiwgNywgOCwgMCwgMSwgMiwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgOSwgMTAsIDExXSxcbiAgICBbMiwgMSwgMCwgNSwgNCwgMywgOCwgNywgNiwgMTEsIDEwLCA5LCAxNCwgMTMsIDEyLCAxNywgMTYsIDE1XSxcbiAgICBbOCwgNywgNiwgMiwgMSwgMCwgNSwgNCwgMywgMTcsIDE2LCAxNSwgMTEsIDEwLCA5LCAxNCwgMTMsIDEyXSxcbiAgICBbNSwgNCwgMywgOCwgNywgNiwgMiwgMSwgMCwgMTQsIDEzLCAxMiwgMTcsIDE2LCAxNSwgMTEsIDEwLCA5XSxcbl07XG4iLCJpbXBvcnQgQ3ViaWVDdWJlIGZyb20gXCIuL0N1YmllQ3ViZVwiO1xuaW1wb3J0IENvb3JkQ3ViZSBmcm9tIFwiLi9Db29yZEN1YmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuL1V0aWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbHZlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoMSA9IDA7XG4gICAgICAgIHRoaXMudXJmSWR4ID0gMDtcbiAgICAgICAgdGhpcy5kZXB0aDEgPSAwO1xuICAgICAgICBDdWJpZUN1YmUuSW5pdCgpO1xuICAgICAgICBDb29yZEN1YmUuSW5pdCgpO1xuICAgICAgICB0aGlzLm1vdmUgPSBbXTtcbiAgICAgICAgdGhpcy5tb3ZlU29sID0gW107XG4gICAgICAgIHRoaXMubm9kZVVEID0gW107XG4gICAgICAgIHRoaXMudmFsaWQxID0gMDtcbiAgICAgICAgdGhpcy5hbGxvd1Nob3J0ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYyA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgdGhpcy51cmZDdWJpZUN1YmUgPSBbXTtcbiAgICAgICAgdGhpcy51cmZDb29yZEN1YmUgPSBbXTtcbiAgICAgICAgdGhpcy5waGFzZTFDdWJpZSA9IFtdO1xuICAgICAgICB0aGlzLnByZU1vdmVDdWJlcyA9IFtdO1xuICAgICAgICB0aGlzLnByZU1vdmVzID0gW107XG4gICAgICAgIHRoaXMucHJlTW92ZUxlbiA9IDA7XG4gICAgICAgIHRoaXMubWF4UHJlTW92ZXMgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIxOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubm9kZVVEW2ldID0gbmV3IENvb3JkQ3ViZSgpO1xuICAgICAgICAgICAgdGhpcy5waGFzZTFDdWJpZVtpXSA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgdGhpcy51cmZDdWJpZUN1YmVbaV0gPSBuZXcgQ3ViaWVDdWJlKCk7XG4gICAgICAgICAgICB0aGlzLnVyZkNvb3JkQ3ViZVtpXSA9IG5ldyBDb29yZEN1YmUoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNvbHZlci5NQVhfUFJFX01PVkVTOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHJlTW92ZUN1YmVzW2kgKyAxXSA9IG5ldyBDdWJpZUN1YmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzb2x2ZShmYWNlbGV0cykge1xuICAgICAgICBDb29yZEN1YmUuSW5pdCgpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMuY2MuZGVzZXJpYWxpemUoZmFjZWxldHMpO1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlcnJvcjogaW52YWxpZCBjdWJlXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmVyaWZ5ID0gdGhpcy5jYy52ZXJpZnkoKTtcbiAgICAgICAgaWYgKHZlcmlmeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlcnJvcjogXCIgKyB2ZXJpZnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb2wgPSAyMjtcbiAgICAgICAgdGhpcy5tb3ZlU29sID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0U2VhcmNoKCk7XG4gICAgICAgIGNvbnN0IHNvbHV0aW9uID0gdGhpcy5zZWFyY2goKTtcbiAgICAgICAgcmV0dXJuIHNvbHV0aW9uO1xuICAgIH1cbiAgICBpbml0U2VhcmNoKCkge1xuICAgICAgICB0aGlzLmNvbmpNYXNrID0gKFNvbHZlci5UUllfSU5WRVJTRSA/IDAgOiAweDM4KSB8IChTb2x2ZXIuVFJZX1RIUkVFX0FYRVMgPyAwIDogMHgzNik7XG4gICAgICAgIHRoaXMubWF4UHJlTW92ZXMgPSB0aGlzLmNvbmpNYXNrID4gNyA/IDAgOiBTb2x2ZXIuTUFYX1BSRV9NT1ZFUztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudXJmQ3ViaWVDdWJlW2ldLmNvcHkodGhpcy5jYyk7XG4gICAgICAgICAgICB0aGlzLnVyZkNvb3JkQ3ViZVtpXS5zZXRXaXRoUHJ1bih0aGlzLnVyZkN1YmllQ3ViZVtpXSwgMjApO1xuICAgICAgICAgICAgdGhpcy5jYy5VUkZDb25qdWdhdGUoKTtcbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYy5pbnZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoKCkge1xuICAgICAgICBmb3IgKHRoaXMubGVuZ3RoMSA9IDA7IHRoaXMubGVuZ3RoMSA8IHRoaXMuc29sOyB0aGlzLmxlbmd0aDErKykge1xuICAgICAgICAgICAgZm9yICh0aGlzLnVyZklkeCA9IDA7IHRoaXMudXJmSWR4IDwgNjsgdGhpcy51cmZJZHgrKykge1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy5jb25qTWFzayAmICgxIDw8IHRoaXMudXJmSWR4KSkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGhhc2UxUHJlTW92ZXModGhpcy5tYXhQcmVNb3ZlcywgLTMwLCB0aGlzLnVyZkN1YmllQ3ViZVt0aGlzLnVyZklkeF0pID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVNvbCA9PSBudWxsID8gXCJlcnJvcjogbm8gc29sdXRpb24gZm9yIHByb2JcIiA6IHRoaXMuZ2V0U29sdXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZVNvbCA9PSBudWxsID8gXCJlcnJvcjogbm8gc29sdXRpb24gZm9yIGRlcHRoXCIgOiB0aGlzLmdldFNvbHV0aW9uKCk7XG4gICAgfVxuICAgIGdldFNvbHV0aW9uKCkge1xuICAgICAgICBsZXQgcmV0ID0gXCJcIjtcbiAgICAgICAgaWYgKCF0aGlzLm1vdmVTb2wpIHtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJmID0gdGhpcy51cmZJZHg7XG4gICAgICAgIGlmICh1cmYgPCAzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHRoaXMubW92ZVNvbC5sZW5ndGg7ICsrcykge1xuICAgICAgICAgICAgICAgIHJldCArPSBVdGlsLk1PVkUyU1RSW0N1YmllQ3ViZS5VUkZNb3ZlW3VyZl1bdGhpcy5tb3ZlU29sW3NdXV0gKyBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHMgPSB0aGlzLm1vdmVTb2wubGVuZ3RoIC0gMTsgcyA+PSAwOyAtLXMpIHtcbiAgICAgICAgICAgICAgICByZXQgKz0gVXRpbC5NT1ZFMlNUUltDdWJpZUN1YmUuVVJGTW92ZVt1cmZdW3RoaXMubW92ZVNvbFtzXV1dICsgXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgcGhhc2UxUHJlTW92ZXMobWF4bCwgbG0sIGNjKSB7XG4gICAgICAgIHRoaXMucHJlTW92ZUxlbiA9IHRoaXMubWF4UHJlTW92ZXMgLSBtYXhsO1xuICAgICAgICBpZiAodGhpcy5wcmVNb3ZlTGVuID09IDAgfHwgKCgweDM2ZmI3ID4+IGxtKSAmIDEpID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVwdGgxID0gdGhpcy5sZW5ndGgxIC0gdGhpcy5wcmVNb3ZlTGVuO1xuICAgICAgICAgICAgdGhpcy5waGFzZTFDdWJpZVswXS5jb3B5KGNjKTtcbiAgICAgICAgICAgIHRoaXMuYWxsb3dTaG9ydGVyID0gdGhpcy5kZXB0aDEgPT0gU29sdmVyLk1JTl9QMUxFTkdUSF9QUkUgJiYgdGhpcy5wcmVNb3ZlTGVuICE9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlVURbdGhpcy5kZXB0aDEgKyAxXS5zZXRXaXRoUHJ1bihjYywgdGhpcy5kZXB0aDEpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5waGFzZTEodGhpcy5ub2RlVURbdGhpcy5kZXB0aDEgKyAxXSwgdGhpcy5kZXB0aDEsIC0xKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heGwgPT0gMCB8fCB0aGlzLnByZU1vdmVMZW4gKyBTb2x2ZXIuTUlOX1AxTEVOR1RIX1BSRSA+PSB0aGlzLmxlbmd0aDEpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBza2lwTW92ZXMgPSAwO1xuICAgICAgICBpZiAobWF4bCA9PSAxIHx8IHRoaXMucHJlTW92ZUxlbiArIDEgKyBTb2x2ZXIuTUlOX1AxTEVOR1RIX1BSRSA+PSB0aGlzLmxlbmd0aDEpIHtcbiAgICAgICAgICAgIHNraXBNb3ZlcyB8PSAweDM2ZmI3O1xuICAgICAgICB9XG4gICAgICAgIGxtID0gfn4obG0gLyAzKSAqIDM7XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTg7IG0rKykge1xuICAgICAgICAgICAgaWYgKG0gPT0gbG0gfHwgbSA9PSBsbSAtIDkgfHwgbSA9PSBsbSArIDkpIHtcbiAgICAgICAgICAgICAgICBtICs9IDI7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHNraXBNb3ZlcyAmICgxIDw8IG0pKSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBDdWJpZUN1YmUuQ29ybk11bHQoQ3ViaWVDdWJlLk1vdmVDdWJlW21dLCBjYywgdGhpcy5wcmVNb3ZlQ3ViZXNbbWF4bF0pO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KEN1YmllQ3ViZS5Nb3ZlQ3ViZVttXSwgY2MsIHRoaXMucHJlTW92ZUN1YmVzW21heGxdKTtcbiAgICAgICAgICAgIHRoaXMucHJlTW92ZXNbdGhpcy5tYXhQcmVNb3ZlcyAtIG1heGxdID0gbTtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IHRoaXMucGhhc2UxUHJlTW92ZXMobWF4bCAtIDEsIG0sIHRoaXMucHJlTW92ZUN1YmVzW21heGxdKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBwaGFzZTEobm9kZSwgbWF4bCwgbG0pIHtcbiAgICAgICAgaWYgKG5vZGUucHJ1biA9PSAwICYmIG1heGwgPCA1KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxvd1Nob3J0ZXIgfHwgbWF4bCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXB0aDEgLT0gbWF4bDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLmluaXRQaGFzZTJQcmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlcHRoMSArPSBtYXhsO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBheGlzID0gMDsgYXhpcyA8IDE4OyBheGlzICs9IDMpIHtcbiAgICAgICAgICAgIGlmIChheGlzID09IGxtIHx8IGF4aXMgPT0gbG0gLSA5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBwb3dlciA9IDA7IHBvd2VyIDwgMzsgcG93ZXIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBheGlzICsgcG93ZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJ1biA9IHRoaXMubm9kZVVEW21heGxdLmRvTW92ZVBydW4obm9kZSwgbSk7XG4gICAgICAgICAgICAgICAgaWYgKHBydW4gPiBtYXhsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcnVuID09IG1heGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVt0aGlzLmRlcHRoMSAtIG1heGxdID0gbTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkMSA9IE1hdGgubWluKHRoaXMudmFsaWQxLCB0aGlzLmRlcHRoMSAtIG1heGwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldCA9IHRoaXMucGhhc2UxKHRoaXMubm9kZVVEW21heGxdLCBtYXhsIC0gMSwgYXhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXQgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGluaXRQaGFzZTJQcmUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnZhbGlkMTsgaSA8IHRoaXMuZGVwdGgxOyBpKyspIHtcbiAgICAgICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdCh0aGlzLnBoYXNlMUN1YmllW2ldLCBDdWJpZUN1YmUuTW92ZUN1YmVbdGhpcy5tb3ZlW2ldXSwgdGhpcy5waGFzZTFDdWJpZVtpICsgMV0pO1xuICAgICAgICAgICAgQ3ViaWVDdWJlLkVkZ2VNdWx0KHRoaXMucGhhc2UxQ3ViaWVbaV0sIEN1YmllQ3ViZS5Nb3ZlQ3ViZVt0aGlzLm1vdmVbaV1dLCB0aGlzLnBoYXNlMUN1YmllW2kgKyAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZDEgPSB0aGlzLmRlcHRoMTtcbiAgICAgICAgbGV0IHJldCA9IHRoaXMuaW5pdFBoYXNlMih0aGlzLnBoYXNlMUN1YmllW3RoaXMuZGVwdGgxXSk7XG4gICAgICAgIGlmIChyZXQgPT0gMCB8fCB0aGlzLnByZU1vdmVMZW4gPT0gMCB8fCByZXQgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtID0gfn4odGhpcy5wcmVNb3Zlc1t0aGlzLnByZU1vdmVMZW4gLSAxXSAvIDMpICogMyArIDE7XG4gICAgICAgIEN1YmllQ3ViZS5Db3JuTXVsdChDdWJpZUN1YmUuTW92ZUN1YmVbbV0sIHRoaXMucGhhc2UxQ3ViaWVbdGhpcy5kZXB0aDFdLCB0aGlzLnBoYXNlMUN1YmllW3RoaXMuZGVwdGgxICsgMV0pO1xuICAgICAgICBDdWJpZUN1YmUuRWRnZU11bHQoQ3ViaWVDdWJlLk1vdmVDdWJlW21dLCB0aGlzLnBoYXNlMUN1YmllW3RoaXMuZGVwdGgxXSwgdGhpcy5waGFzZTFDdWJpZVt0aGlzLmRlcHRoMSArIDFdKTtcbiAgICAgICAgdGhpcy5wcmVNb3Zlc1t0aGlzLnByZU1vdmVMZW4gLSAxXSArPSAyIC0gKHRoaXMucHJlTW92ZXNbdGhpcy5wcmVNb3ZlTGVuIC0gMV0gJSAzKSAqIDI7XG4gICAgICAgIHJldCA9IHRoaXMuaW5pdFBoYXNlMih0aGlzLnBoYXNlMUN1YmllW3RoaXMuZGVwdGgxICsgMV0pO1xuICAgICAgICB0aGlzLnByZU1vdmVzW3RoaXMucHJlTW92ZUxlbiAtIDFdICs9IDIgLSAodGhpcy5wcmVNb3Zlc1t0aGlzLnByZU1vdmVMZW4gLSAxXSAlIDMpICogMjtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgaW5pdFBoYXNlMihwaGFzZTJDdWJpZSkge1xuICAgICAgICBsZXQgcDJjb3JuID0gcGhhc2UyQ3ViaWUuQ1Blcm1TeW07XG4gICAgICAgIGNvbnN0IHAyY3N5bSA9IHAyY29ybiAmIDB4ZjtcbiAgICAgICAgcDJjb3JuID4+PSA0O1xuICAgICAgICBsZXQgcDJlZGdlID0gcGhhc2UyQ3ViaWUuRVBlcm1TeW07XG4gICAgICAgIGNvbnN0IHAyZXN5bSA9IHAyZWRnZSAmIDB4ZjtcbiAgICAgICAgcDJlZGdlID4+PSA0O1xuICAgICAgICBjb25zdCBwMm1pZCA9IHBoYXNlMkN1YmllLk1QZXJtO1xuICAgICAgICBjb25zdCBwMmVkZ2VpID0gQ3ViaWVDdWJlLkdldFBlcm1TeW1JbnYocDJlZGdlLCBwMmVzeW0sIGZhbHNlKTtcbiAgICAgICAgY29uc3QgcDJjb3JuaSA9IEN1YmllQ3ViZS5HZXRQZXJtU3ltSW52KHAyY29ybiwgcDJjc3ltLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcHJ1biA9IE1hdGgubWF4KENvb3JkQ3ViZS5HZXRQcnVuaW5nKENvb3JkQ3ViZS5NQ1Blcm1QcnVuLCBwMmNvcm4gKiBDb29yZEN1YmUuTl9NUEVSTSArIENvb3JkQ3ViZS5NUGVybUNvbmpbcDJtaWRdW3AyY3N5bV0pLCBDb29yZEN1YmUuR2V0UHJ1bmluZyhDb29yZEN1YmUuRVBlcm1DQ29tYlBQcnVuLCBwMmVkZ2UgKiBDb29yZEN1YmUuTl9DT01CICtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBDb25qW0N1YmllQ3ViZS5QZXJtMkNvbWJQW3AyY29ybl0gJiAweGZmXVtDdWJpZUN1YmUuU3ltTXVsdEludltwMmVzeW1dW3AyY3N5bV1dKSwgQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biwgKHAyZWRnZWkgPj4gNCkgKiBDb29yZEN1YmUuTl9DT01CICtcbiAgICAgICAgICAgIENvb3JkQ3ViZS5DQ29tYlBDb25qW0N1YmllQ3ViZS5QZXJtMkNvbWJQW3AyY29ybmkgPj4gNF0gJiAweGZmXVtDdWJpZUN1YmUuU3ltTXVsdEludltwMmVkZ2VpICYgMHhmXVtwMmNvcm5pICYgMHhmXV0pKTtcbiAgICAgICAgY29uc3QgbWF4RGVwMiA9IE1hdGgubWluKFNvbHZlci5NQVhfREVQVEgyLCB0aGlzLnNvbCAtIHRoaXMubGVuZ3RoMSk7XG4gICAgICAgIGlmIChwcnVuID49IG1heERlcDIpIHtcbiAgICAgICAgICAgIHJldHVybiBwcnVuID4gbWF4RGVwMiA/IDIgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXB0aDI7XG4gICAgICAgIGZvciAoZGVwdGgyID0gbWF4RGVwMiAtIDE7IGRlcHRoMiA+PSBwcnVuOyBkZXB0aDItLSkge1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gdGhpcy5waGFzZTIocDJlZGdlLCBwMmVzeW0sIHAyY29ybiwgcDJjc3ltLCBwMm1pZCwgZGVwdGgyLCB0aGlzLmRlcHRoMSwgMTApO1xuICAgICAgICAgICAgaWYgKHJldCA8IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlcHRoMiAtPSByZXQ7XG4gICAgICAgICAgICB0aGlzLm1vdmVTb2wgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kZXB0aDEgKyBkZXB0aDI7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU29sTW92ZSh0aGlzLm1vdmVbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMucHJlTW92ZUxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTb2xNb3ZlKHRoaXMucHJlTW92ZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2wgPSB0aGlzLm1vdmVTb2wubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXB0aDIgIT0gbWF4RGVwMiAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kU29sTW92ZShtb3ZlKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZlU29sKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW92ZVNvbC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlU29sLnB1c2gobW92ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXhpc0N1ciA9IH5+KG1vdmUgLyAzKTtcbiAgICAgICAgY29uc3QgYXhpc0xhc3QgPSB+fih0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDFdIC8gMyk7XG4gICAgICAgIGlmIChheGlzQ3VyID09IGF4aXNMYXN0KSB7XG4gICAgICAgICAgICBjb25zdCBwb3cgPSAoKG1vdmUgJSAzKSArICh0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDFdICUgMykgKyAxKSAlIDQ7XG4gICAgICAgICAgICBpZiAocG93ID09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb2wucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDFdID0gYXhpc0N1ciAqIDMgKyBwb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW92ZVNvbC5sZW5ndGggPiAxICYmXG4gICAgICAgICAgICBheGlzQ3VyICUgMyA9PSBheGlzTGFzdCAlIDMgJiZcbiAgICAgICAgICAgIGF4aXNDdXIgPT0gfn4odGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAyXSAvIDMpKSB7XG4gICAgICAgICAgICBjb25zdCBwb3cgPSAoKG1vdmUgJSAzKSArICh0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDJdICUgMykgKyAxKSAlIDQ7XG4gICAgICAgICAgICBpZiAocG93ID09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDJdID0gdGhpcy5tb3ZlU29sW3RoaXMubW92ZVNvbC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb2wucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb2xbdGhpcy5tb3ZlU29sLmxlbmd0aCAtIDJdID0gYXhpc0N1ciAqIDMgKyBwb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlU29sLnB1c2gobW92ZSk7XG4gICAgfVxuICAgIHBoYXNlMihlZGdlLCBlc3ltLCBjb3JuLCBjc3ltLCBtaWQsIG1heGwsIGRlcHRoLCBsbSkge1xuICAgICAgICBpZiAoZWRnZSA9PSAwICYmIGNvcm4gPT0gMCAmJiBtaWQgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1heGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW92ZU1hc2sgPSBVdGlsLkNLTVYyQklUW2xtXTtcbiAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMDsgbSsrKSB7XG4gICAgICAgICAgICBpZiAoKChtb3ZlTWFzayA+PiBtKSAmIDEpICE9IDApIHtcbiAgICAgICAgICAgICAgICBtICs9ICgweDQyID4+IG0pICYgMztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1pZHggPSBDb29yZEN1YmUuTVBlcm1Nb3ZlW21pZF1bbV07XG4gICAgICAgICAgICBsZXQgY29ybnggPSBDb29yZEN1YmUuQ1Blcm1Nb3ZlW2Nvcm5dW0N1YmllQ3ViZS5TeW1Nb3ZlVURbY3N5bV1bbV1dO1xuICAgICAgICAgICAgY29uc3QgY3N5bXggPSBDdWJpZUN1YmUuU3ltTXVsdFtjb3JueCAmIDB4Zl1bY3N5bV07XG4gICAgICAgICAgICBjb3JueCA+Pj0gNDtcbiAgICAgICAgICAgIGxldCBlZGdleCA9IENvb3JkQ3ViZS5FUGVybU1vdmVbZWRnZV1bQ3ViaWVDdWJlLlN5bU1vdmVVRFtlc3ltXVttXV07XG4gICAgICAgICAgICBjb25zdCBlc3lteCA9IEN1YmllQ3ViZS5TeW1NdWx0W2VkZ2V4ICYgMHhmXVtlc3ltXTtcbiAgICAgICAgICAgIGVkZ2V4ID4+PSA0O1xuICAgICAgICAgICAgY29uc3QgZWRnZWkgPSBDdWJpZUN1YmUuR2V0UGVybVN5bUludihlZGdleCwgZXN5bXgsIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvcm5pID0gQ3ViaWVDdWJlLkdldFBlcm1TeW1JbnYoY29ybngsIGNzeW14LCB0cnVlKTtcbiAgICAgICAgICAgIGxldCBwcnVuID0gQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biwgKGVkZ2VpID4+IDQpICogQ29vcmRDdWJlLk5fQ09NQiArXG4gICAgICAgICAgICAgICAgQ29vcmRDdWJlLkNDb21iUENvbmpbQ3ViaWVDdWJlLlBlcm0yQ29tYlBbY29ybmkgPj4gNF0gJiAweGZmXVtDdWJpZUN1YmUuU3ltTXVsdEludltlZGdlaSAmIDB4Zl1bY29ybmkgJiAweGZdXSk7XG4gICAgICAgICAgICBpZiAocHJ1biA+IG1heGwgKyAxKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcnVuID49IG1heGwpIHtcbiAgICAgICAgICAgICAgICBtICs9ICgweDQyID4+IG0pICYgMyAmIChtYXhsIC0gcHJ1bik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcnVuID0gTWF0aC5tYXgoQ29vcmRDdWJlLkdldFBydW5pbmcoQ29vcmRDdWJlLkVQZXJtQ0NvbWJQUHJ1biwgZWRnZXggKiBDb29yZEN1YmUuTl9DT01CICtcbiAgICAgICAgICAgICAgICBDb29yZEN1YmUuQ0NvbWJQQ29ualtDdWJpZUN1YmUuUGVybTJDb21iUFtjb3JueF0gJiAweGZmXVtDdWJpZUN1YmUuU3ltTXVsdEludltlc3lteF1bY3N5bXhdXSksIENvb3JkQ3ViZS5HZXRQcnVuaW5nKENvb3JkQ3ViZS5NQ1Blcm1QcnVuLCBjb3JueCAqIENvb3JkQ3ViZS5OX01QRVJNICsgQ29vcmRDdWJlLk1QZXJtQ29ualttaWR4XVtjc3lteF0pKTtcbiAgICAgICAgICAgIGlmIChwcnVuID49IG1heGwpIHtcbiAgICAgICAgICAgICAgICBtICs9ICgweDQyID4+IG0pICYgMyAmIChtYXhsIC0gcHJ1bik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLnBoYXNlMihlZGdleCwgZXN5bXgsIGNvcm54LCBjc3lteCwgbWlkeCwgbWF4bCAtIDEsIGRlcHRoICsgMSwgbSk7XG4gICAgICAgICAgICBpZiAocmV0ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVbZGVwdGhdID0gVXRpbC5VRDJTVERbbV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuU29sdmVyLk1BWF9QUkVfTU9WRVMgPSAyMDtcblNvbHZlci5UUllfSU5WRVJTRSA9IHRydWU7XG5Tb2x2ZXIuVFJZX1RIUkVFX0FYRVMgPSB0cnVlO1xuU29sdmVyLk1JTl9QMUxFTkdUSF9QUkUgPSA3O1xuU29sdmVyLk1BWF9ERVBUSDIgPSAxMztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWwge1xuICAgIHN0YXRpYyBHZXROUGFyaXR5KGlkeCwgbikge1xuICAgICAgICBsZXQgcCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSBuIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHAgXj0gaWR4ICUgKG4gLSBpKTtcbiAgICAgICAgICAgIGlkeCA9IH5+KGlkeCAvIChuIC0gaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwICYgMTtcbiAgICB9XG4gICAgc3RhdGljIFNldFZhbChzcmMsIGRzdCwgZWRnZSkge1xuICAgICAgICByZXR1cm4gZWRnZSA/IChkc3QgPDwgMSkgfCAoc3JjICYgMSkgOiBkc3QgfCAoc3JjICYgMHhmOCk7XG4gICAgfVxuICAgIHN0YXRpYyBHZXRWYWwoc3JjLCBlZGdlKSB7XG4gICAgICAgIHJldHVybiBlZGdlID8gc3JjID4+IDEgOiBzcmMgJiA3O1xuICAgIH1cbiAgICBzdGF0aWMgU2V0TlBlcm0oYXJyLCBpZHgsIG4sIGVkZ2UpIHtcbiAgICAgICAgbi0tO1xuICAgICAgICBsZXQgdmFsID0gMHg3NjU0MzIxMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBVdGlsLkZhY3RbbiAtIGldO1xuICAgICAgICAgICAgbGV0IHYgPSB+fihpZHggLyBwKTtcbiAgICAgICAgICAgIGlkeCAlPSBwO1xuICAgICAgICAgICAgdiA8PD0gMjtcbiAgICAgICAgICAgIGFycltpXSA9IFV0aWwuU2V0VmFsKGFycltpXSwgKHZhbCA+PiB2KSAmIDB4ZiwgZWRnZSk7XG4gICAgICAgICAgICBjb25zdCBtID0gKDEgPDwgdikgLSAxO1xuICAgICAgICAgICAgdmFsID0gKHZhbCAmIG0pICsgKCh2YWwgPj4gNCkgJiB+bSk7XG4gICAgICAgIH1cbiAgICAgICAgYXJyW25dID0gVXRpbC5TZXRWYWwoYXJyW25dLCB2YWwgJiAweGYsIGVkZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgR2V0TlBlcm0oYXJyLCBuLCBlZGdlKSB7XG4gICAgICAgIGxldCBpZHggPSAwLCB2YWwgPSAweDc2NTQzMjEwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG4gLSAxOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBVdGlsLkdldFZhbChhcnJbaV0sIGVkZ2UpIDw8IDI7XG4gICAgICAgICAgICBpZHggPSAobiAtIGkpICogaWR4ICsgKCh2YWwgPj4gdikgJiAweGYpO1xuICAgICAgICAgICAgdmFsIC09IDB4MTExMTExMTAgPDwgdjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cbiAgICBzdGF0aWMgU2V0TlBlcm1GdWxsKGFyciwgaWR4LCBuLCBlZGdlKSB7XG4gICAgICAgIGFycltuIC0gMV0gPSBVdGlsLlNldFZhbChhcnJbbiAtIDFdLCAwLCBlZGdlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IG4gLSAyOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgYXJyW2ldID0gVXRpbC5TZXRWYWwoYXJyW2ldLCBpZHggJSAobiAtIGkpLCBlZGdlKTtcbiAgICAgICAgICAgIGlkeCA9IH5+KGlkeCAvIChuIC0gaSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbjsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuR2V0VmFsKGFycltqXSwgZWRnZSkgPj0gVXRpbC5HZXRWYWwoYXJyW2ldLCBlZGdlKSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJbal0gPSBVdGlsLlNldFZhbChhcnJbal0sIFV0aWwuR2V0VmFsKGFycltqXSwgZWRnZSkgKyAxLCBlZGdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEdldE5QZXJtRnVsbChhcnIsIG4sIGVkZ2UpIHtcbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICBpZHggKj0gbiAtIGk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBuOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5HZXRWYWwoYXJyW2pdLCBlZGdlKSA8IFV0aWwuR2V0VmFsKGFycltpXSwgZWRnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKytpZHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIHN0YXRpYyBHZXRDb21iKGFyciwgbWFzaywgZWRnZSkge1xuICAgICAgICBjb25zdCBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IHZhbHVlID0gMCwgciA9IDQ7XG4gICAgICAgIGZvciAobGV0IGkgPSBlbmQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBwZXJtID0gVXRpbC5HZXRWYWwoYXJyW2ldLCBlZGdlKTtcbiAgICAgICAgICAgIGlmICgocGVybSAmIDB4YykgPT0gbWFzaykge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IFV0aWwuQ25rW2ldW3ItLV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgU2V0Q29tYihhcnIsIHZhbHVlLCBtYXNrLCBlZGdlKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgciA9IDQsIGZpbGwgPSBlbmQ7XG4gICAgICAgIGZvciAobGV0IGkgPSBlbmQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gVXRpbC5DbmtbaV1bcl0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSAtPSBVdGlsLkNua1tpXVtyLS1dO1xuICAgICAgICAgICAgICAgIGFycltpXSA9IFV0aWwuU2V0VmFsKGFycltpXSwgciB8IG1hc2ssIGVkZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKChmaWxsICYgMHhjKSA9PSBtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGwgLT0gNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gVXRpbC5TZXRWYWwoYXJyW2ldLCBmaWxsLS0sIGVkZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuVXRpbC5VeDEgPSAwO1xuVXRpbC5VeDIgPSAxO1xuVXRpbC5VeDMgPSAyO1xuVXRpbC5SeDEgPSAzO1xuVXRpbC5SeDIgPSA0O1xuVXRpbC5SeDMgPSA1O1xuVXRpbC5GeDEgPSA2O1xuVXRpbC5GeDIgPSA3O1xuVXRpbC5GeDMgPSA4O1xuVXRpbC5EeDEgPSA5O1xuVXRpbC5EeDIgPSAxMDtcblV0aWwuRHgzID0gMTE7XG5VdGlsLkx4MSA9IDEyO1xuVXRpbC5MeDIgPSAxMztcblV0aWwuTHgzID0gMTQ7XG5VdGlsLkJ4MSA9IDE1O1xuVXRpbC5CeDIgPSAxNjtcblV0aWwuQngzID0gMTc7XG5VdGlsLlUxID0gMDtcblV0aWwuVTIgPSAxO1xuVXRpbC5VMyA9IDI7XG5VdGlsLlU0ID0gMztcblV0aWwuVTUgPSA0O1xuVXRpbC5VNiA9IDU7XG5VdGlsLlU3ID0gNjtcblV0aWwuVTggPSA3O1xuVXRpbC5VOSA9IDg7XG5VdGlsLlIxID0gOTtcblV0aWwuUjIgPSAxMDtcblV0aWwuUjMgPSAxMTtcblV0aWwuUjQgPSAxMjtcblV0aWwuUjUgPSAxMztcblV0aWwuUjYgPSAxNDtcblV0aWwuUjcgPSAxNTtcblV0aWwuUjggPSAxNjtcblV0aWwuUjkgPSAxNztcblV0aWwuRjEgPSAxODtcblV0aWwuRjIgPSAxOTtcblV0aWwuRjMgPSAyMDtcblV0aWwuRjQgPSAyMTtcblV0aWwuRjUgPSAyMjtcblV0aWwuRjYgPSAyMztcblV0aWwuRjcgPSAyNDtcblV0aWwuRjggPSAyNTtcblV0aWwuRjkgPSAyNjtcblV0aWwuRDEgPSAyNztcblV0aWwuRDIgPSAyODtcblV0aWwuRDMgPSAyOTtcblV0aWwuRDQgPSAzMDtcblV0aWwuRDUgPSAzMTtcblV0aWwuRDYgPSAzMjtcblV0aWwuRDcgPSAzMztcblV0aWwuRDggPSAzNDtcblV0aWwuRDkgPSAzNTtcblV0aWwuTDEgPSAzNjtcblV0aWwuTDIgPSAzNztcblV0aWwuTDMgPSAzODtcblV0aWwuTDQgPSAzOTtcblV0aWwuTDUgPSA0MDtcblV0aWwuTDYgPSA0MTtcblV0aWwuTDcgPSA0MjtcblV0aWwuTDggPSA0MztcblV0aWwuTDkgPSA0NDtcblV0aWwuQjEgPSA0NTtcblV0aWwuQjIgPSA0NjtcblV0aWwuQjMgPSA0NztcblV0aWwuQjQgPSA0ODtcblV0aWwuQjUgPSA0OTtcblV0aWwuQjYgPSA1MDtcblV0aWwuQjcgPSA1MTtcblV0aWwuQjggPSA1MjtcblV0aWwuQjkgPSA1MztcblV0aWwuVSA9IDA7XG5VdGlsLlIgPSAxO1xuVXRpbC5GID0gMjtcblV0aWwuRCA9IDM7XG5VdGlsLkwgPSA0O1xuVXRpbC5CID0gNTtcblV0aWwuQ29ybmVyRmFjZWxldCA9IFtcbiAgICBbVXRpbC5VOSwgVXRpbC5SMSwgVXRpbC5GM10sXG4gICAgW1V0aWwuVTcsIFV0aWwuRjEsIFV0aWwuTDNdLFxuICAgIFtVdGlsLlUxLCBVdGlsLkwxLCBVdGlsLkIzXSxcbiAgICBbVXRpbC5VMywgVXRpbC5CMSwgVXRpbC5SM10sXG4gICAgW1V0aWwuRDMsIFV0aWwuRjksIFV0aWwuUjddLFxuICAgIFtVdGlsLkQxLCBVdGlsLkw5LCBVdGlsLkY3XSxcbiAgICBbVXRpbC5ENywgVXRpbC5COSwgVXRpbC5MN10sXG4gICAgW1V0aWwuRDksIFV0aWwuUjksIFV0aWwuQjddLFxuXTtcblV0aWwuRWRnZUZhY2VsZXQgPSBbXG4gICAgW1V0aWwuVTYsIFV0aWwuUjJdLFxuICAgIFtVdGlsLlU4LCBVdGlsLkYyXSxcbiAgICBbVXRpbC5VNCwgVXRpbC5MMl0sXG4gICAgW1V0aWwuVTIsIFV0aWwuQjJdLFxuICAgIFtVdGlsLkQ2LCBVdGlsLlI4XSxcbiAgICBbVXRpbC5EMiwgVXRpbC5GOF0sXG4gICAgW1V0aWwuRDQsIFV0aWwuTDhdLFxuICAgIFtVdGlsLkQ4LCBVdGlsLkI4XSxcbiAgICBbVXRpbC5GNiwgVXRpbC5SNF0sXG4gICAgW1V0aWwuRjQsIFV0aWwuTDZdLFxuICAgIFtVdGlsLkI2LCBVdGlsLkw0XSxcbiAgICBbVXRpbC5CNCwgVXRpbC5SNl0sXG5dO1xuVXRpbC5NT1ZFMlNUUiA9IFtcbiAgICBcIlUgXCIsXG4gICAgXCJVMlwiLFxuICAgIFwiVSdcIixcbiAgICBcIlIgXCIsXG4gICAgXCJSMlwiLFxuICAgIFwiUidcIixcbiAgICBcIkYgXCIsXG4gICAgXCJGMlwiLFxuICAgIFwiRidcIixcbiAgICBcIkQgXCIsXG4gICAgXCJEMlwiLFxuICAgIFwiRCdcIixcbiAgICBcIkwgXCIsXG4gICAgXCJMMlwiLFxuICAgIFwiTCdcIixcbiAgICBcIkIgXCIsXG4gICAgXCJCMlwiLFxuICAgIFwiQidcIixcbl07XG5VdGlsLlVEMlNURCA9IFtcbiAgICBVdGlsLlV4MSxcbiAgICBVdGlsLlV4MixcbiAgICBVdGlsLlV4MyxcbiAgICBVdGlsLlJ4MixcbiAgICBVdGlsLkZ4MixcbiAgICBVdGlsLkR4MSxcbiAgICBVdGlsLkR4MixcbiAgICBVdGlsLkR4MyxcbiAgICBVdGlsLkx4MixcbiAgICBVdGlsLkJ4MixcbiAgICBVdGlsLlJ4MSxcbiAgICBVdGlsLlJ4MyxcbiAgICBVdGlsLkZ4MSxcbiAgICBVdGlsLkZ4MyxcbiAgICBVdGlsLkx4MSxcbiAgICBVdGlsLkx4MyxcbiAgICBVdGlsLkJ4MSxcbiAgICBVdGlsLkJ4Myxcbl07XG5VdGlsLlNURDJVRCA9ICgoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtVdGlsLlVEMlNURFtpXV0gPSBpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufSkoKTtcblV0aWwuQ0tNVjJCSVQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBpeCA9IH5+KFV0aWwuVUQyU1REW2ldIC8gMyk7XG4gICAgICAgIHJlc3VsdFtpXSA9IDA7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgY29uc3QganggPSB+fihVdGlsLlVEMlNURFtqXSAvIDMpO1xuICAgICAgICAgICAgcmVzdWx0W2ldIHw9IChpeCA9PSBqeCB8fCAoaXggJSAzID09IGp4ICUgMyAmJiBpeCA+PSBqeCkgPyAxIDogMCkgPDwgajtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHRbMTBdID0gMDtcbiAgICByZXR1cm4gcmVzdWx0O1xufSkoKTtcblV0aWwuQ25rID0gKCgpID0+IHtcbiAgICBjb25zdCByZXQgPSBbXTtcbiAgICBjb25zdCBmYWN0ID0gWzFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTM7IGkrKykge1xuICAgICAgICByZXRbaV0gPSBbXTtcbiAgICAgICAgZmFjdFtpICsgMV0gPSBmYWN0W2ldICogKGkgKyAxKTtcbiAgICAgICAgcmV0W2ldWzBdID0gcmV0W2ldW2ldID0gMTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMzsgaisrKSB7XG4gICAgICAgICAgICByZXRbaV1bal0gPSBqIDw9IGkgPyByZXRbaSAtIDFdW2ogLSAxXSArIHJldFtpIC0gMV1bal0gOiAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59KSgpO1xuVXRpbC5GYWN0ID0gKCgpID0+IHtcbiAgICBjb25zdCByZXQgPSBbMV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMzsgaSsrKSB7XG4gICAgICAgIHJldFtpICsgMV0gPSByZXRbaV0gKiAoaSArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufSkoKTtcbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgUHJvdmlkZSwgUmVmLCBXYXRjaCB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uL3ZpZXdwb3J0XCI7XG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uL2N1YmUvd29ybGRcIjtcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi9zZXR0aW5nXCI7XG5pbXBvcnQgU29sdmVyIGZyb20gXCIuLi8uLi9zb2x2ZXIvU29sdmVyXCI7XG5pbXBvcnQgeyBjdWJlX2NvbmZpZywgc3RyaW5nVG9Ud2lzdFBhcmFtcyB9IGZyb20gXCIuLi8uLi9jdWJlL3V0aWxzXCI7XG5pbXBvcnQgeyBUd2lzdCwgdHdpc3RlciB9IGZyb20gXCIuLi8uLi9jdWJlL3R3aXN0ZXJcIjtcbmxldCBQbGF5Z3JvdW5kID0gY2xhc3MgUGxheWdyb3VuZCBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgdGhpcy5zb2x1dGlvbiA9IFtdO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgICAgdGhpcy5pc1BsYXllck1vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb2x2ZXIgPSBuZXcgU29sdmVyKCk7XG4gICAgICAgIHRoaXMua2V5ID0gMDtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy4kbmV4dFRpY2sodGhpcy5yZXNpemUpO1xuICAgICAgICB0aGlzLmxvb3AoKTtcbiAgICB9XG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5kcmF3KCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcmVzaXplKCkge1xuICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGguY2VpbChNYXRoLm1pbih0aGlzLndpZHRoIC8gNiwgdGhpcy5oZWlnaHQgLyAxMikpO1xuICAgICAgICB0aGlzLnZpZXdwb3J0LnJlc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCAtIHRoaXMuc2l6ZSAqIDIuNSk7XG4gICAgICAgIHRoaXMud29ybGQuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHNjcmFtYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMud29ybGQuY3ViZS5zY3JhbWJsZSgpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy53b3JsZC5jdWJlLnJlc2V0KCk7XG4gICAgfVxuICAgIHNvbHZlKCkge1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy53b3JsZC5jdWJlLnNlcmlhbGl6ZSgpO1xuICAgICAgICB0aGlzLnNvbHV0aW9uID0gdGhpcy5zb2x2ZXIuc29sdmUoc3RhdGUpLnNwbGl0KCcgJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICB0aGlzLnNvbHV0aW9uLnB1c2goXCJ+XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvbHV0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgb25QbGF5ZXJNb2RlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLndvcmxkLmNvbnRyb2xsZXIuZGlzYWJsZSA9IHRoaXMuaXNQbGF5ZXJNb2RlO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5ZXJNb2RlICYmIHRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA9PSB0aGlzLnNvbHV0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA8IHRoaXMuc29sdXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0d2lzdGVyLmlzVHdpc3RpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBzdHJpbmdUb1R3aXN0UGFyYW1zW3RoaXMuc29sdXRpb25bdGhpcy5wcm9ncmVzc11dO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3BhcmFtcy5heGlzXVtwYXJhbXMubGF5ZXJdLnR3aXN0KHBhcmFtcy5hbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzID09IHRoaXMuc29sdXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldF9wcm9ncmVzcygwKTtcbiAgICAgICAgICAgIHR3aXN0ZXIudHdpc3RzLnB1c2gobmV3IFR3aXN0KDAsIE1hdGguUEksIGN1YmVfY29uZmlnLmZyYW1lcyAqIDEuNSwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlIC0gTWF0aC5QSSkgPCAxZS02O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHF1aXQoKSB7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJNb2RlID0gZmFsc2U7XG4gICAgfVxuICAgIHNldF9wcm9ncmVzcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzdG9yZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHN0cmluZ1RvVHdpc3RQYXJhbXNbdGhpcy5zb2x1dGlvbltpXV07XG4gICAgICAgICAgICB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3BhcmFtcy5heGlzXVtwYXJhbXMubGF5ZXJdLnR3aXN0KHBhcmFtcy5hbmdsZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHZhbHVlO1xuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICBQcm92aWRlKFwid29ybGRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIE9iamVjdClcbl0sIFBsYXlncm91bmQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICBSZWYoXCJ2aWV3cG9ydFwiKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgVmlld3BvcnQpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ2aWV3cG9ydFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgV2F0Y2goXCJpc1BsYXllck1vZGVcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJvblBsYXllck1vZGVDaGFuZ2VcIiwgbnVsbCk7XG5QbGF5Z3JvdW5kID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIHZpZXdwb3J0OiBWaWV3cG9ydCxcbiAgICAgICAgICAgIHNldHRpbmc6IFNldHRpbmcsXG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCB7IGN1YmVfY29uZmlnIH0gZnJvbSBcIi4uLy4uL2N1YmUvdXRpbHNcIjtcbmltcG9ydCBWdWVTbGlkZXIgZnJvbSAndnVlLXNsaWRlci1jb21wb25lbnQnO1xuaW1wb3J0ICd2dWUtc2xpZGVyLWNvbXBvbmVudC90aGVtZS9kZWZhdWx0LmNzcyc7XG5sZXQgU2V0dGluZyA9IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLnN0YXRlID0gZmFsc2U7XG4gICAgfVxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLmNlaWwoTWF0aC5taW4odGhpcy53aWR0aCAvIDYsIHRoaXMuaGVpZ2h0IC8gMTIpKTtcbiAgICB9XG4gICAgZ2V0IHNlbnNpYmlsaXR5KCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuc2Vuc2liaWxpdHkgKiAxZTQ7XG4gICAgfVxuICAgIHNldCBzZW5zaWJpbGl0eSh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSA9IHZhbHVlICogMWUtNDtcbiAgICB9XG4gICAgZ2V0IGZyYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGN1YmVfY29uZmlnLmZyYW1lcztcbiAgICB9XG4gICAgc2V0IGZyYW1lcyh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5mcmFtZXMgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHNjcmFtYmxlX3N0ZXBzKCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuc2NyYW1ibGVfc3RlcHM7XG4gICAgfVxuICAgIHNldCBzY3JhbWJsZV9zdGVwcyh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zY3JhbWJsZV9zdGVwcyA9IHZhbHVlO1xuICAgIH1cbn07XG5TZXR0aW5nID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFZ1ZVNsaWRlclxuICAgICAgICB9XG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgU2V0dGluZyk7XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIFJlZiB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuLi8uLi9jdWJlL2ludGVyYWN0b3JcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vY3ViZS93b3JsZFwiO1xubGV0IFZpZXdwb3J0ID0gY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzRWxlbS5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgICAgICBjYW52YXM6IGNhbnZhc0VsZW0sXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICAgICAgICBhbHBoYTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDAsIDApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihjYW52YXNFbGVtLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndvcmxkLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBpZiAodGhpcy53b3JsZC5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy53b3JsZC5zY2VuZSwgdGhpcy53b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgdGhpcy53b3JsZC5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcbl9fZGVjb3JhdGUoW1xuICAgIEluamVjdChcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBXb3JsZClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwiY2FudmFzXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBIVE1MRWxlbWVudClcbl0sIFZpZXdwb3J0LnByb3RvdHlwZSwgXCJjYW52YXNcIiwgdm9pZCAwKTtcblZpZXdwb3J0ID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIH0pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cGFyYW10eXBlc1wiLCBbXSlcbl0sIFZpZXdwb3J0KTtcbmV4cG9ydCBkZWZhdWx0IFZpZXdwb3J0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9