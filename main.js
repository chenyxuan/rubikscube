/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <div v-resize=\"resize\" style=\"user-select: none; touch-action: none;\">\n        <v-flex xs12 :style=\"{\n                'height':size + 'px'\n            }\" id=\"top-flex\"></v-flex>\n\n        <v-btn fixed right top fab color=\"primary\" style=\"user-select: none;\" :style=\"{\n        width: size * 0.9 + 'px', \n        height: size * 0.9 + 'px', \n        'margin-right': width / 2 - Math.min(size * 4, width / 2) + size * 1.1 + 'px'}\" @click=\"listd=!listd\">\n            <v-icon :size=\"size * 0.6\">\n                school\n            </v-icon>\n        </v-btn>\n\n        <v-btn fixed left top text color=\"primary\" style=\"user-select: none; margin: 0%; padding: 0%;\"\n            :style=\"{height: size+'px', 'margin-left': width / 2 - Math.min(size * 4, width / 2 - size / 4) + 'px'}\"\n            @click=\"listd=true\" v-if=\"isDemoMode\">\n            <div :style=\"{'font-size':(size * 0.4)+'px'}\" style=\"text-transform: none;\">{{ demoName }}</div>\n        </v-btn>\n\n        <v-bottom-sheet v-model=\"listd\">\n            <v-card text style=\"margin-left: 0%; margin-right: 0%; padding-left: 0%; padding-right: 0%;\">\n                <v-container fluid grid-list-md text-xs-center style=\"padding-left: 0%; padding-right: 0%;\"\n                    :style=\"{width: Math.min(size * 10, width) + 'px'}\">\n                    <v-layout row wrap\n                        style=\"margin-left: 0%; margin-right: 0%; padding-left: 0%; padding-right: 0%; min-width: 0%; min-height: 0%; align-items: stretch;\">\n                        <v-card outlined style=\"margin: 0%; padding: 0%;\" :style=\"{'width': demoGridWidth  + 'px'}\"\n                            v-for=\"(demoImage, i) in demoImages\" :key=\"i\">\n                            <v-btn block depressed text color=\"primary\" :style=\"{\n                                'font-size': size * 0.3 + 'px',\n                                'height': size * 0.35 + 'px'\n                            }\" style=\"text-transform: none;\n                            text-align: center;\n                            margin: 0%;\n                            padding: 0%;\" @click=\"selectDemo(i)\">\n                                {{ demoData[i].name }}\n                            </v-btn>\n                            <img :src=\"demoImage\" style=\"margin: 0%; padding: 0%;\"\n                                :style=\"{'width':demoGridWidth  + 'px'}\" @click=\"selectDemo(i)\">\n                        </v-card>\n                    </v-layout>\n                </v-container>\n            </v-card>\n        </v-bottom-sheet>\n\n        <setting ref=\"setting\"></setting>\n        <viewport ref=\"viewport\"></viewport>\n        <v-flex xs12 :style=\"{\n                'height':size + 'px',\n                'padding': 'none',\n                'margin': 'none'\n            }\" id=\"bottom-flex\" v-show=\"!isPlayerMode\">\n        </v-flex>\n        <v-card flat style=\"margin: auto; touch-action: none; user-select: none;\">\n            <v-container fluid grid-list-md text-xs-center\n                :style=\"{width: Math.min(size * 8, width) + 'px', height: size * 4 + 'px'}\">\n                <v-layout row wrap>\n                    <v-flex xs12 :style=\"{\n                    'height': size + 'px'\n                }\" v-if=\"isPlayerMode\">\n                        <v-slider :value=\"progress\" style=\"margin: 0%; padding: 0%;\" :max=\"solution.length\"\n                            :tick-size=\"3\" thumb-label=\"always\" ticks=\"always\" hide-details v-on:input=\"setProgress\">\n                            <template v-slot:thumb-label>\n                                {{ progress == 0 ? '#' : solution[progress - 1] }}\n                            </template>\n                        </v-slider>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"greenButton\" block text color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Scramble' : (progress == solution.length ? 'Replay' : 'Play') }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"blueButton\" block text color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Reset' : 'Pause' }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"redButton\" block text color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Solve' : 'Quit' }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </v-card>\n    </div>\n</v-app>"

/***/ }),

/***/ "./src/vueapp/setting/index.html":
/*!***************************************!*\
  !*** ./src/vueapp/setting/index.html ***!
  \***************************************/
/***/ ((module) => {

module.exports = "<div v-resize=\"resize\">\n    <v-btn fixed right top fab color=\"primary\" style=\"user-select: none;\"\n        :style=\"{width: size * 0.9 + 'px', height: size * 0.9 + 'px', 'margin-right': width / 2 - Math.min(size * 4, width / 2) + 'px'}\"\n        @click=\"state = !state\">\n        <v-icon :size=\"size * 0.6\">\n            settings\n        </v-icon>\n    </v-btn>\n    <v-bottom-sheet v-model=\"state\">\n        <v-card text style=\"margin: auto;\">\n            <v-container fluid grid-list-md text-xs-center :style=\"{width: Math.min(size * 8, width) + 'px'}\">\n                <v-subheader>\n                    SOLVING ALGORITHM\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                }\">\n                    <v-radio-group v-model=\"solver_id\">\n                        <v-radio label=\"Layer By Layer Method\" :value=\"0\" off-icon=\"radio_button_unchecked\" on-icon=\"radio_button_checked\"></v-radio>\n                        <v-radio label=\"Kociemba's Algorithm\" :value=\"1\" off-icon=\"radio_button_unchecked\"  on-icon=\"radio_button_checked\" :style=\"{ 'margin-top' : size * 0.2 + 'px'}\"></v-radio>\n                    </v-radio-group>\n                </v-flex>\n                <v-subheader>\n                    SCRAMBLE LENGTH\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"scramble_steps\" thumb-label=\"always\" :max=\"40\" :min=\"0\"\n                        :marks=\"[0,10,20,30,40]\"></vue-slider>\n                </v-flex>\n                <v-subheader>\n                    FRAMES PER TWIST\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"frames\" thumb-label=\"always\" :max=\"60\" :min=\"0\" :marks=\"[0,15,30,45,60]\">\n                    </vue-slider>\n                </v-flex>\n                <v-subheader>\n                    SENSITIVITY\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"sensibility\" thumb-label=\"always\" :max=\"100\" :min=\"0\"\n                        :marks=\"[0,25,50,75,100]\"></vue-slider>\n                </v-flex>\n            </v-container>\n        </v-card>\n    </v-bottom-sheet>\n</div>"

/***/ }),

/***/ "./src/vueapp/viewport/index.html":
/*!****************************************!*\
  !*** ./src/vueapp/viewport/index.html ***!
  \****************************************/
/***/ ((module) => {

module.exports = "<div ref=\"canvas\"></div>"

/***/ }),

/***/ "./src/cube/capture.ts":
/*!*****************************!*\
  !*** ./src/cube/capture.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Capturer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world */ "./src/cube/world.ts");


class Capturer {
    constructor() {
        this.world = new _world__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        });
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(256, 256, true);
        this.world.resize(256, 256);
        this.generate("??????????????????????????????????????????????????????");
    }
    generate(state) {
        this.world.cube.restore(state.split(""));
        this.renderer.render(this.world.scene, this.world.camera);
        return this.renderer.domElement.toDataURL();
    }
}


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
        return result;
    }
    restore(state) {
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
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
            }
        }
        x = 2;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.R;
        for (y = 2; y >= 0; y--) {
            for (z = 2; z >= 0; z--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
            }
        }
        z = 2;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.F;
        for (y = 2; y >= 0; y--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
            }
        }
        y = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.D;
        for (z = 2; z >= 0; z--) {
            for (x = 0; x < 3; x++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
            }
        }
        x = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.L;
        for (y = 2; y >= 0; y--) {
            for (z = 0; z < 3; z++) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
            }
        }
        z = 0;
        face = _utils_internal__WEBPACK_IMPORTED_MODULE_4__.Face.B;
        for (y = 2; y >= 0; y--) {
            for (x = 2; x >= 0; x--) {
                const index = z * 3 * 3 + y * 3 + x;
                const color = state[cur++];
                const cubelet = this.cubelets[index];
                cubelet.remove(cubelet.stickers[face]);
                cubelet.stickers[face] = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh();
                if (color != "?") {
                    const face_attr = _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_face_attrs[face];
                    const sticker = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(_utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_sticker, _utils__WEBPACK_IMPORTED_MODULE_3__.cubelet_lambers[color]);
                    sticker.rotation.setFromVector3(face_attr.rotation);
                    sticker.position.copy(face_attr.position);
                    cubelet.stickers[face] = sticker;
                    cubelet.add(sticker);
                }
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
    constructor(doms, callback) {
        this.doms = [];
        this.touch = (event) => {
            var _a;
            const first = event.changedTouches[0];
            if (event.type === "touchstart") {
                this.target = event.target;
                if (this.last) {
                    const action = new Interaction("touchend", this.last.clientX - this.doms[0].getBoundingClientRect().left, this.last.clientY - this.doms[0].getBoundingClientRect().top);
                    this.callback(action);
                }
                this.last = first;
            }
            if (this.notin() || ((_a = this.last) === null || _a === void 0 ? void 0 : _a.identifier) != first.identifier) {
                return false;
            }
            const action = new Interaction(event.type, first.clientX - this.doms[0].getBoundingClientRect().left, first.clientY - this.doms[0].getBoundingClientRect().top);
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
            if (this.notin()) {
                return true;
            }
            const action = new Interaction(event.type, event.clientX - this.doms[0].getBoundingClientRect().left, event.clientY - this.doms[0].getBoundingClientRect().top);
            this.callback(action);
            if (event.type === "mouseup") {
                this.target = null;
            }
            return false;
        };
        for (const dom of doms) {
            if (dom) {
                this.doms.push(dom);
            }
        }
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
    notin() {
        for (const dom of this.doms) {
            if (this.target === dom) {
                return false;
            }
        }
        return true;
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
/* harmony export */   "stringToTwistParams": () => (/* binding */ stringToTwistParams),
/* harmony export */   "lblOrderMapping": () => (/* binding */ lblOrderMapping),
/* harmony export */   "faceToColor": () => (/* binding */ faceToColor)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _utils_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils_internal */ "./src/cube/utils_internal.ts");



const cube_config = {
    frames: 30,
    sensibility: 25 * 1e-4,
    scramble_steps: 20,
    solverId: 0,
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
    "L": { axis: 'x', layers: [0], angle: -Math.PI / 2 },
    "L'": { axis: 'x', layers: [0], angle: Math.PI / 2 },
    "L2": { axis: 'x', layers: [0], angle: -Math.PI },
    "R": { axis: 'x', layers: [2], angle: Math.PI / 2 },
    "R'": { axis: 'x', layers: [2], angle: -Math.PI / 2 },
    "R2": { axis: 'x', layers: [2], angle: Math.PI },
    "F": { axis: 'z', layers: [2], angle: Math.PI / 2 },
    "F'": { axis: 'z', layers: [2], angle: -Math.PI / 2 },
    "F2": { axis: 'z', layers: [2], angle: Math.PI },
    "B": { axis: 'z', layers: [0], angle: -Math.PI / 2 },
    "B'": { axis: 'z', layers: [0], angle: Math.PI / 2 },
    "B2": { axis: 'z', layers: [0], angle: -Math.PI },
    "U": { axis: 'y', layers: [2], angle: Math.PI / 2 },
    "U'": { axis: 'y', layers: [2], angle: -Math.PI / 2 },
    "U2": { axis: 'y', layers: [2], angle: Math.PI },
    "D": { axis: 'y', layers: [0], angle: -Math.PI / 2 },
    "D'": { axis: 'y', layers: [0], angle: Math.PI / 2 },
    "D2": { axis: 'y', layers: [0], angle: -Math.PI },
    "~": { axis: 'a', layers: [], angle: 0 },
    "x": { axis: 'x', layers: [0, 1, 2], angle: Math.PI / 2 },
    "x'": { axis: 'x', layers: [0, 1, 2], angle: -Math.PI / 2 },
    "x2": { axis: 'x', layers: [0, 1, 2], angle: Math.PI },
    "y": { axis: 'y', layers: [0, 1, 2], angle: Math.PI / 2 },
    "y'": { axis: 'y', layers: [0, 1, 2], angle: -Math.PI / 2 },
    "y2": { axis: 'y', layers: [0, 1, 2], angle: Math.PI },
    "z": { axis: 'z', layers: [0, 1, 2], angle: Math.PI / 2 },
    "z'": { axis: 'z', layers: [0, 1, 2], angle: -Math.PI / 2 },
    "z2": { axis: 'z', layers: [0, 1, 2], angle: Math.PI },
    "l": { axis: 'x', layers: [0, 1], angle: -Math.PI / 2 },
    "l'": { axis: 'x', layers: [0, 1], angle: Math.PI / 2 },
    "l2": { axis: 'x', layers: [0, 1], angle: -Math.PI },
    "r": { axis: 'x', layers: [2, 1], angle: Math.PI / 2 },
    "r'": { axis: 'x', layers: [2, 1], angle: -Math.PI / 2 },
    "r2": { axis: 'x', layers: [2, 1], angle: Math.PI },
    "f": { axis: 'z', layers: [2, 1], angle: Math.PI / 2 },
    "f'": { axis: 'z', layers: [2, 1], angle: -Math.PI / 2 },
    "f2": { axis: 'z', layers: [2, 1], angle: Math.PI },
    "b": { axis: 'z', layers: [0, 1], angle: -Math.PI / 2 },
    "b'": { axis: 'z', layers: [0, 1], angle: Math.PI / 2 },
    "b2": { axis: 'z', layers: [0, 1], angle: -Math.PI },
    "u": { axis: 'y', layers: [2, 1], angle: Math.PI / 2 },
    "u'": { axis: 'y', layers: [2, 1], angle: -Math.PI / 2 },
    "u2": { axis: 'y', layers: [2, 1], angle: Math.PI },
    "d": { axis: 'y', layers: [0, 1], angle: -Math.PI / 2 },
    "d'": { axis: 'y', layers: [0, 1], angle: Math.PI / 2 },
    "d2": { axis: 'y', layers: [0, 1], angle: -Math.PI },
    "E": { axis: 'y', layers: [1], angle: -Math.PI / 2 },
    "E'": { axis: 'y', layers: [1], angle: Math.PI / 2 },
    "E2": { axis: 'y', layers: [1], angle: -Math.PI },
    "M": { axis: 'x', layers: [1], angle: -Math.PI / 2 },
    "M'": { axis: 'x', layers: [1], angle: Math.PI / 2 },
    "M2": { axis: 'x', layers: [1], angle: -Math.PI },
    "S": { axis: 'z', layers: [1], angle: Math.PI / 2 },
    "S'": { axis: 'z', layers: [1], angle: -Math.PI / 2 },
    "S2": { axis: 'z', layers: [1], angle: Math.PI },
};
const lblOrderMapping = {
    "U": "U",
    "u": "U'",
    "D": "D",
    "d": "D'",
    "F": "F",
    "f": "F'",
    "L": "L",
    "l": "L'",
    "R": "R",
    "r": "R'",
    "B": "B",
    "b": "B'",
    "Y": "y",
    "y": "y'"
};
const faceToColor = {
    "U": "y",
    "F": "b",
    "R": "r",
    "B": "g",
    "D": "w",
    "L": "o"
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
        this.ambient = new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0xffffff, 0.9);
        this.directional = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 0.1);
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
        const distance = _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 3 * this.perspective * 0.9;
        this.camera.aspect = this.width / this.height;
        this.camera.fov = fov;
        this.camera.position.z = distance;
        this.camera.near = distance - _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 3;
        this.camera.far = distance + _utils__WEBPACK_IMPORTED_MODULE_2__.cubelet_defs.size * 8;
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 30));
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewport */ "./src/vueapp/viewport/index.ts");
/* harmony import */ var _cube_world__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cube/world */ "./src/cube/world.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setting */ "./src/vueapp/setting/index.ts");
/* harmony import */ var _cube_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../cube/utils */ "./src/cube/utils.ts");
/* harmony import */ var _cube_twister__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../cube/twister */ "./src/cube/twister.ts");
/* harmony import */ var _cube_interactor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../cube/interactor */ "./src/cube/interactor.ts");
/* harmony import */ var _cube_capture__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../cube/capture */ "./src/cube/capture.ts");
/* harmony import */ var _lbl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lbl */ "./src/vueapp/playground/lbl.js");











let Playground = class Playground extends vue__WEBPACK_IMPORTED_MODULE_9__["default"] {
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
        this.key = 0;
        this.initState = [];
        this.cubejsCube = __webpack_require__(/*! cubejs */ "./node_modules/cubejs/index.js");
        this.elapsedframes = 0;
        this.listd = false;
        this.capturer = new _cube_capture__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.demoData = __webpack_require__(/*! ./demos.json */ "./src/vueapp/playground/demos.json");
        this.demoImages = [];
        this.demoGridWidth = 0;
        this.demoBackupState = [];
        this.isDemoMode = false;
    }
    mounted() {
        this.cubejsCube.initSolver();
        this.interactor = new _cube_interactor__WEBPACK_IMPORTED_MODULE_6__["default"]([
            this.viewport.canvasElem,
            document.getElementById("top-flex"),
            document.getElementById("bottom-flex")
        ], this.world.controller.interact);
        for (let i = 0; i < this.demoData.length; i++) {
            this.demoImages.push(this.capturer.generate(this.demoData[i].state));
        }
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
        this.demoGridWidth = ~~(Math.min(this.size * 2, this.width / 4) * 100) / 100;
        this.viewport.resize(this.width, this.height - this.size * 3.5);
        this.world.cube.dirty = true;
    }
    scramble() {
        this.reset();
        this.world.cube.scramble();
    }
    reset() {
        this.world.cube.reset();
    }
    idle(value) {
        _cube_twister__WEBPACK_IMPORTED_MODULE_5__.twister.twists.push(new _cube_twister__WEBPACK_IMPORTED_MODULE_5__.Twist(0, Math.PI, _cube_utils__WEBPACK_IMPORTED_MODULE_4__.cube_config.frames * value, (value) => {
            return Math.abs(value - Math.PI) < 1e-6;
        }));
    }
    solve() {
        this.isPlayerMode = true;
        this.initState = this.world.cube.serialize();
        const solverId = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.cube_config.solverId;
        if (solverId == 0) {
            const lblState = [];
            for (const faceState of this.initState) {
                lblState.push(_cube_utils__WEBPACK_IMPORTED_MODULE_4__.faceToColor[faceState]);
            }
            const lblSolution = (0,_lbl__WEBPACK_IMPORTED_MODULE_8__["default"])(lblState);
            this.solution = [];
            for (const lblPhase of lblSolution) {
                const lblOrders = lblPhase.split("").filter(Boolean);
                for (const order of lblOrders) {
                    const step = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.lblOrderMapping[order];
                    if (step) {
                        this.solution.push(step);
                    }
                }
            }
        }
        else if (solverId === 1) {
            this.solution = this.cubejsCube
                .fromString(this.initState)
                .solve()
                .split(' ').
                filter(Boolean);
        }
        this.solution.push("~");
        console.log(this.initState.join(""));
        console.log(this.solution.join(" "));
        this.setProgress(0);
        this.idle(0.5);
        this.isPlaying = true;
    }
    onPlayerModeChange() {
        this.world.controller.lock = this.isPlayerMode;
    }
    onPlayingChange() {
        this.world.controller.disable = this.isPlaying;
    }
    callback() {
        if (this.isPlayerMode && this.isPlaying) {
            if (this.progress == this.solution.length) {
                this.isPlaying = false;
            }
            if (this.progress < this.solution.length) {
                if (!_cube_twister__WEBPACK_IMPORTED_MODULE_5__.twister.isTwisting()) {
                    const params = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.stringToTwistParams[this.solution[this.progress]];
                    for (const layer of params.layers) {
                        this.world.cube.table.groups[params.axis][layer].twist(params.angle, false);
                    }
                    this.progress++;
                }
            }
        }
        if (this.elapsedframes < _cube_utils__WEBPACK_IMPORTED_MODULE_4__.cube_config.frames) {
            this.elapsedframes++;
        }
    }
    play() {
        if (this.progress == this.solution.length) {
            this.setProgress(0);
            this.idle(1.5);
        }
        this.isPlaying = true;
    }
    pause() {
        this.isPlaying = false;
    }
    quit() {
        this.isPlaying = false;
        this.isPlayerMode = false;
        if (this.isDemoMode) {
            this.isDemoMode = false;
            this.world.cube.restore(this.demoBackupState);
        }
    }
    setProgress(value) {
        this.isPlaying = false;
        this.world.cube.restore(this.initState);
        for (let i = 0; i < value; i++) {
            const params = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.stringToTwistParams[this.solution[i]];
            for (const layer of params.layers) {
                this.world.cube.table.groups[params.axis][layer].twist(params.angle, true);
            }
        }
        this.progress = value;
    }
    greenButton() {
        if (!this.isPlayerMode) {
            this.scramble();
        }
        else {
            this.play();
        }
    }
    blueButton() {
        if (!this.isPlayerMode) {
            this.reset();
        }
        else {
            this.pause();
        }
    }
    redButton() {
        if (this.elapsedframes < _cube_utils__WEBPACK_IMPORTED_MODULE_4__.cube_config.frames) {
            return;
        }
        if (!this.isPlayerMode) {
            this.solve();
        }
        else {
            this.quit();
        }
        this.elapsedframes = 0;
    }
    selectDemo(idx) {
        this.listd = false;
        if (!this.isDemoMode) {
            this.demoBackupState = this.world.cube.serialize();
        }
        this.isDemoMode = true;
        this.isPlayerMode = true;
        this.demoName = this.demoData[idx].name;
        this.initState = this.demoData[idx].state.split("");
        this.solution = this.demoData[idx].solution.split(' ').filter(Boolean);
        this.solution.push("~");
        console.log(this.initState.join(""));
        console.log(this.solution.join(" "));
        this.setProgress(0);
    }
};
(0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Provide)("world"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:type", Object)
], Playground.prototype, "world", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("viewport"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:type", _viewport__WEBPACK_IMPORTED_MODULE_1__["default"])
], Playground.prototype, "viewport", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Watch)("isPlayerMode"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:returntype", void 0)
], Playground.prototype, "onPlayerModeChange", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Watch)("isPlaying"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:type", Function),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:paramtypes", []),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:returntype", void 0)
], Playground.prototype, "onPlayingChange", null);
Playground = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/playground/index.html"),
        components: {
            viewport: _viewport__WEBPACK_IMPORTED_MODULE_1__["default"],
            setting: _setting__WEBPACK_IMPORTED_MODULE_3__["default"],
        },
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__metadata)("design:paramtypes", [])
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var _cube_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/utils */ "./src/cube/utils.ts");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-slider-component */ "./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js");
/* harmony import */ var vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_slider_component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_slider_component_theme_default_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slider-component/theme/default.css */ "./node_modules/vue-slider-component/theme/default.css");






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
    get solver_id() {
        return _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.solverId;
    }
    set solver_id(value) {
        _cube_utils__WEBPACK_IMPORTED_MODULE_1__.cube_config.solverId = value;
    }
};
Setting = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/setting/index.html"),
        components: {
            VueSlider: (vue_slider_component__WEBPACK_IMPORTED_MODULE_2___default())
        }
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:paramtypes", [])
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _cube_world__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/world */ "./src/cube/world.ts");





let Viewport = class Viewport extends vue__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super();
        const canvasElem = document.createElement("canvas");
        canvasElem.style.outline = "none";
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer({
            canvas: canvasElem,
            antialias: true,
            alpha: true
        });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.canvasElem = canvasElem;
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
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Inject)("world"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", _cube_world__WEBPACK_IMPORTED_MODULE_1__["default"])
], Viewport.prototype, "world", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Ref)("canvas"),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:type", HTMLElement)
], Viewport.prototype, "canvas", void 0);
Viewport = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__.Component)({
        template: __webpack_require__(/*! ./index.html */ "./src/vueapp/viewport/index.html"),
        components: {},
    }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__metadata)("design:paramtypes", [])
], Viewport);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Viewport);


/***/ }),

/***/ "./src/vueapp/playground/lbl.js":
/*!**************************************!*\
  !*** ./src/vueapp/playground/lbl.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ solveWithLBL)
/* harmony export */ });
function solveWithLBL(state) {

    var cubeState = {};

    var nextColor = {};
    var nextFace = { l: "f", f: "r", r: "b", b: "l" };
    var prevFace = { l: "b", b: "r", r: "f", f: "l" };

    /*
        var stepName = {
            0: "First layer edges",
            1: "First layer corners",
            2: "Second layer",
            3: "Top cross",
            4: "Third layer corners (pos)",
            5: "Third layer corners (ori)",
            6: "Third layer edges"
        };
    */

    function getCubeState(state) {
        cubeState = {
            b: state[49],
            bl: state[50].concat(state[39]),
            d: state[31],
            db: state[34].concat(state[52]),
            dbl: state[33].concat(state[53]).concat(state[42]),
            df: state[28].concat(state[25]),
            dfr: state[29].concat(state[26]).concat(state[15]),
            dl: state[30].concat(state[43]),
            dlf: state[27].concat(state[44]).concat(state[24]),
            dr: state[32].concat(state[16]),
            drb: state[35].concat(state[17]).concat(state[51]),
            f: state[22],
            fr: state[23].concat(state[12]),
            l: state[40],
            lf: state[41].concat(state[21]),
            r: state[13],
            rb: state[14].concat(state[48]),
            u: state[4],
            ub: state[1].concat(state[46]),
            ubl: state[0].concat(state[47]).concat(state[36]),
            uf: state[7].concat(state[19]),
            ufr: state[8].concat(state[20]).concat(state[9]),
            ul: state[3].concat(state[37]),
            ulf: state[6].concat(state[38]).concat(state[18]),
            ur: state[5].concat(state[10]),
            urb: state[2].concat(state[11]).concat(state[45]),
        }

        var color_l = cubeState["l"], color_r = cubeState["r"],
            color_f = cubeState["f"], color_b = cubeState["b"];
        nextColor[color_l] = color_f;
        nextColor[color_f] = color_r;
        nextColor[color_r] = color_b;
        nextColor[color_b] = color_l;

        console.log(cubeState);
        console.log(nextColor);
    }

    function Twist_B() {

        var tmp = cubeState.ub;
        cubeState.ub = cubeState.rb;
        cubeState.rb = cubeState.db;
        cubeState.db = cubeState.bl[1] + cubeState.bl[0];
        cubeState.bl = tmp[1] + tmp[0];


        tmp = cubeState.ubl;
        cubeState.ubl = cubeState.urb[1] + cubeState.urb[2] + cubeState.urb[0];
        cubeState.urb = cubeState.drb[1] + cubeState.drb[0] + cubeState.drb[2];
        cubeState.drb = cubeState.dbl[2] + cubeState.dbl[0] + cubeState.dbl[1];
        cubeState.dbl = tmp[2] + tmp[1] + tmp[0];
    }


    function Twist_R() {

        var tmp = cubeState.ur;
        cubeState.ur = cubeState.fr;
        cubeState.fr = cubeState.dr;
        cubeState.dr = cubeState.rb[1] + cubeState.rb[0];
        cubeState.rb = tmp[1] + tmp[0];

        tmp = cubeState.urb;
        cubeState.urb = cubeState.ufr[1] + cubeState.ufr[2] + cubeState.ufr[0];
        cubeState.ufr = cubeState.dfr[1] + cubeState.dfr[0] + cubeState.dfr[2];
        cubeState.dfr = cubeState.drb[2] + cubeState.drb[0] + cubeState.drb[1];
        cubeState.drb = tmp[2] + tmp[1] + tmp[0];
    };

    function Twist_F() {

        var tmp = cubeState.uf;
        cubeState.uf = cubeState.lf;
        cubeState.lf = cubeState.df;
        cubeState.df = cubeState.fr[1] + cubeState.fr[0];
        cubeState.fr = tmp[1] + tmp[0];


        tmp = cubeState.ufr;
        cubeState.ufr = cubeState.ulf[1] + cubeState.ulf[2] + cubeState.ulf[0];
        cubeState.ulf = cubeState.dlf[1] + cubeState.dlf[0] + cubeState.dlf[2];
        cubeState.dlf = cubeState.dfr[2] + cubeState.dfr[0] + cubeState.dfr[1];
        cubeState.dfr = tmp[2] + tmp[1] + tmp[0];
    }

    function Twist_L() {

        var tmp = cubeState.ul;
        cubeState.ul = cubeState.bl;
        cubeState.bl = cubeState.dl;
        cubeState.dl = cubeState.lf[1] + cubeState.lf[0];
        cubeState.lf = tmp[1] + tmp[0];


        tmp = cubeState.ulf;
        cubeState.ulf = cubeState.ubl[1] + cubeState.ubl[2] + cubeState.ubl[0];
        cubeState.ubl = cubeState.dbl[1] + cubeState.dbl[0] + cubeState.dbl[2];
        cubeState.dbl = cubeState.dlf[2] + cubeState.dlf[0] + cubeState.dlf[1];
        cubeState.dlf = tmp[2] + tmp[1] + tmp[0];
    }

    function Twist_U() {

        var tmp = cubeState.ul;
        cubeState.ul = cubeState.uf;
        cubeState.uf = cubeState.ur;
        cubeState.ur = cubeState.ub;
        cubeState.ub = tmp;


        tmp = cubeState.ulf;
        cubeState.ulf = cubeState.ufr;
        cubeState.ufr = cubeState.urb;
        cubeState.urb = cubeState.ubl;
        cubeState.ubl = tmp;
    }

    function Twist_D() {

        var tmp = cubeState.dl;
        cubeState.dl = cubeState.db;
        cubeState.db = cubeState.dr;
        cubeState.dr = cubeState.df;
        cubeState.df = tmp;


        tmp = cubeState.dlf;
        cubeState.dlf = cubeState.dbl;
        cubeState.dbl = cubeState.drb;
        cubeState.drb = cubeState.dfr;
        cubeState.dfr = tmp;
    }

    function Twist_Y() {

        Twist_U();

        let tmp = cubeState.lf;
        cubeState.lf = cubeState.fr;
        cubeState.fr = cubeState.rb;
        cubeState.rb = cubeState.bl;
        cubeState.bl = tmp;

        tmp = cubeState.f;
        cubeState.f = cubeState.r;
        cubeState.r = cubeState.b;
        cubeState.b = cubeState.l;
        cubeState.l = tmp;


        Twist_D(), Twist_D(), Twist_D();
    }


    function changeState(order_list) {
        for (const order of order_list) {
            switch (order) {
                case "D":
                    Twist_D();
                    break;
                case "d": 	//
                    Twist_D(); Twist_D(); Twist_D();
                    break;
                case "U":
                    Twist_U();
                    break;
                case "u":
                    Twist_U(); Twist_U(); Twist_U();
                    break;
                case "L":
                    Twist_L();
                    break;
                case "l":
                    Twist_L(); Twist_L(); Twist_L();
                    break;
                case "F":
                    Twist_F();
                    break;
                case "f":
                    Twist_F(); Twist_F(); Twist_F();
                    break;
                case "R":
                    Twist_R();
                    break;
                case "r":
                    Twist_R(); Twist_R(); Twist_R();
                    break;
                case "B":
                    Twist_B();
                    break;
                case "b":
                    Twist_B(); Twist_B(); Twist_B();
                    break;
                case "Y":
                    Twist_Y();
                    break;
                case "y":
                    Twist_Y(); Twist_Y(); Twist_Y();
                    break;
            }
        }
    }


    function getBlockPos(block) {
        const reg = new RegExp("[" + block + "]{" + block.length + "}");
        //console.log(reg)
        for (let k in cubeState) {
            if (cubeState[k].match(reg)) return { k: k, v: cubeState[k] };
        }
    }

    function FIRST_LAYER_EDGES_SINGLE(block_pos, block_color) {
        var exp = "", exp_log = "", s;
        for (let i = 0; i < 7; i++) {
            s = getBlockPos(block_color);
            //console.log(s)
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == block_color[0]) {
                    if (s.k == block_pos) return exp_log;
                    else exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                }
                else exp = s.k[1].toUpperCase();
            }
            else if (s.k.indexOf("u") != -1) {
                if (s.k[1] == block_pos[1]) {
                    if (s.v[0] == block_color[0]) exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                    else if (cubeState[block_pos[0] + nextFace[s.k[1]]] != cubeState[block_pos[0]] + cubeState[nextFace[s.k[1]]])
                        exp = "u" + nextFace[s.k[1]] + s.k[1].toUpperCase();
                    else exp = "u" + nextFace[s.k[1]] + s.k[1].toUpperCase() + nextFace[s.k[1]].toUpperCase();
                }
                else exp = "U";
            }
            else {
                if (s.v[0] == block_color[0]) {
                    if (s.k[1] == block_pos[1]) exp = s.k[1];
                    else if (cubeState[block_pos[0] + s.k[1]] != cubeState[block_pos[0]] + cubeState[s.k[1]]) exp = s.k[1].toUpperCase();
                    else exp = s.k[1].toUpperCase() + "U" + s.k[1];
                }
                else {
                    if (s.k[0] == block_pos[1]) exp = s.k[0].toUpperCase();
                    else if (cubeState[block_pos[0] + s.k[0]] != cubeState[block_pos[0]] + cubeState[s.k[0]]) exp = s.k[0];
                    else exp = s.k[0] + "U" + s.k[0].toUpperCase();
                }
            }
            exp_log += exp;
            changeState(exp);
        }
        console.log("First Layer Cross Single Error: ", exp_log);
        return "First Layer Cross Single Error: " + exp_log;
    }


    function FIRST_LAYER_CORNERS_SINGLE(block_pos, block_color) {
        var exp = "", exp_log = "", s;
        for (let i = 0; i < 10; i++) {
            s = getBlockPos(block_color);
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == cubeState["d"]) {
                    if (s.k == block_pos) return exp_log;
                    else exp = s.k[1] + "U" + s.k[1].toUpperCase();
                }
                else if (s.v[1] == cubeState["d"]) exp = s.k[1] + "u" + s.k[1].toUpperCase();
                else exp = s.k[2].toUpperCase() + "U" + s.k[2];
            }
            else {

                if (s.k == "u" + block_pos[1] + block_pos[2]) {
                    if (s.v[0] == cubeState["d"]) exp = s.k[2].toUpperCase() + "u" + s.k[2];
                    else if (s.v[1] == cubeState["d"]) exp = s.k[1] + "u" + s.k[1].toUpperCase();
                    else exp = s.k[2].toUpperCase() + "U" + s.k[2];
                }
                else exp = "U";
            }
            exp_log += exp;
            changeState(exp);
        }
        console.log("First Layer Corners Single Error: ", exp_log);
        return "First Layer Corners Single Error: " + exp_log;
    };

    function SECOND_LAYER_SINGLE(block_pos, block_color) {
        var exp = "", exp_log = "", s;
        for (let i = 0; i < 6; i++) {
            s = getBlockPos(block_color);
            if (s.k.indexOf("u") != -1) {
                if (nextColor[s.v[0]] == s.v[1]) {
                    if (s.v[1] == cubeState[s.k[1]])
                        exp = "u" + prevFace[s.k[1]] + "U" + prevFace[s.k[1]].toUpperCase()
                            + "U" + s.k[1].toUpperCase() + "u" + s.k[1];
                    else exp = "U";
                }
                else {
                    if (s.v[1] == cubeState[s.k[1]])
                        exp = "U" + nextFace[s.k[1]].toUpperCase() + "u" + nextFace[s.k[1]]
                            + "u" + s.k[1] + "U" + s.k[1].toUpperCase();
                    else exp = "U";
                }
            }
            else {
                if (s.v[0] == cubeState[s.k[0]] && s.v[1] == cubeState[s.k[1]]) return exp_log;
                else exp = "u" + s.k[0] + "U" + s.k[0].toUpperCase() + "U" + s.k[1].toUpperCase() + "u" + s.k[1];
            }
            exp_log += exp;
            changeState(exp);
        }
        console.log("Second Layer Single Error: ", exp_log);
        return "Second Layer Single Error: " + exp_log;
    }

    // --------------- COMPLETE THE FIRST LAYER EDGES ---------------
    function FIRST_LAYER_EDGES() {
        console.log("------------ COMPLETE THE FIRST LAYER EDGES ------------");
        let order = "";
        order += FIRST_LAYER_EDGES_SINGLE("dl", cubeState["d"] + cubeState["l"]);
        order += FIRST_LAYER_EDGES_SINGLE("df", cubeState["d"] + cubeState["f"]);
        order += FIRST_LAYER_EDGES_SINGLE("dr", cubeState["d"] + cubeState["r"]);
        order += FIRST_LAYER_EDGES_SINGLE("db", cubeState["d"] + cubeState["b"]);
        return compress(order);
        //Execute(order, "First layer edges");
    };

    // --------------  COMPLETE THE FIRST LAYER CORNERS --------------
    function FIRST_LAYER_CORNERS() {
        console.log("------------ COMPLETE THE FIRST LAYER CORNERS ------------");
        let order = "";
        order += FIRST_LAYER_CORNERS_SINGLE("dlf", cubeState["d"] + cubeState["l"] + cubeState["f"]);
        order += FIRST_LAYER_CORNERS_SINGLE("dfr", cubeState["d"] + cubeState["f"] + cubeState["r"]);
        order += FIRST_LAYER_CORNERS_SINGLE("drb", cubeState["d"] + cubeState["r"] + cubeState["b"]);
        order += FIRST_LAYER_CORNERS_SINGLE("dbl", cubeState["d"] + cubeState["b"] + cubeState["l"]);
        return compress(order);
        //Execute(order, "First layer corners");
    }

    // ---------------  COMPLETE THE SECOND LAYER ---------------
    function SECOND_LAYER() {
        console.log("------------ COMPLETE THE SECOND LAYER ------------");
        let order = "";
        order += SECOND_LAYER_SINGLE("lf", cubeState["l"] + cubeState["f"]);
        order += SECOND_LAYER_SINGLE("fr", cubeState["f"] + cubeState["r"]);
        order += SECOND_LAYER_SINGLE("rb", cubeState["r"] + cubeState["b"]);
        order += SECOND_LAYER_SINGLE("bl", cubeState["b"] + cubeState["l"]);
        return compress(order);
    };

    // --------------- COMPLETE THE TOP CROSS ---------------
    function TOP_CROSS() {
        console.log("------------ COMPLETE THE TOP CROSS ------------");
        var exp = "", exp_log = "";
        var uc = cubeState["u"];

        for (let i = 0; i < 4; i++) {
            if (cubeState.ul[0] == uc && cubeState.ur[0] == uc
                && cubeState.uf[0] == uc && cubeState.ub[0] == uc)
                return compress(exp_log);
            else if (cubeState.ul[0] == uc && cubeState.ur[0] == uc) exp = "FRUruf";
            else if (cubeState.uf[0] == uc && cubeState.ub[0] == uc) exp = "RBUbur";
            else if (cubeState.uf[0] == uc && cubeState.ur[0] == uc) exp = "FRUruf";
            else if (cubeState.ur[0] == uc && cubeState.ub[0] == uc) exp = "RBUbur";
            else if (cubeState.ub[0] == uc && cubeState.ul[0] == uc) exp = "BLUlub";
            else if (cubeState.ul[0] == uc && cubeState.uf[0] == uc) exp = "LFUful";
            else exp = "FRUruf";
            exp_log += exp;
            changeState(exp);
        }
        console.log("Top Cross Error: ", exp_log);
        return "Top Cross Error: " + exp_log;
    };

    // ----- COMPLETE THE THIRD LAYER CORNERS (POSITION) -----
    function THIRD_LAYER_CORNERS_POS() {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (POSITION) ------------");
        const step = "rLUluRULul", blocks = ["ulf", "ufr", "urb", "ubl"], uc = cubeState["u"];
        var exp_log = "";

        for (let i = 0; i < 4; i++) {
            var last = i;
            var times = 0;
            for (let j = i + 1; j < i + 4; j++) {
                const next = j % 4;


                let lastc = cubeState[blocks[last]].replace(uc, "");

                let nextc = cubeState[blocks[next]].replace(uc, "");

                if (nextColor[lastc[0]] == lastc[1]) {

                    if (nextc.indexOf(lastc[1]) != -1
                        && nextc.indexOf(nextColor[lastc[1]]) != -1) times += 1;
                    else break;
                }
                else {
                    if (nextc.indexOf(lastc[0]) != -1
                        && nextc.indexOf(nextColor[lastc[0]]) != -1) times += 1;
                    else break;
                }

                last = next;
            }

            if (times == 1) {
                last = (last - 1 + 4) % 4;
                if (last == 0) exp_log = "u" + step, changeState(exp_log);
                else if (last == 1) exp_log = step, changeState(exp_log);
                else if (last == 2) exp_log = "U" + step, changeState(exp_log);
                else if (last == 3) exp_log = "UU" + step, changeState(exp_log);
                return compress(exp_log);
            }

            else if (times > 1) return compress(exp_log);
        }

        exp_log = step + "U" + step;
        changeState(exp_log);
        return compress(exp_log);
    }

    // ----- COMPLETE THE THIRD LAYER CORNERS (ORIENT) -----
    function THIRD_LAYER_CORNERS_ORI() {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (ORIENT) ------------");
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        const blocks = ["ulf", "ufr", "urb", "ubl"], uc = cubeState["u"];
        var exp_log = "", s = "";

        for (const block of blocks) s += cubeState[block].indexOf(uc);

        if (s.match(/2220|0222|2022|2202/)) {
            if (s == "0222") exp_log += "U";
            else if (s == "2022") exp_log += "UU";
            else if (s == "2202") exp_log += "u";
            exp_log += step1;
        }
        else if (s.match(/1110|0111|1011|1101/)) {
            if (s == "0111") exp_log += "U";
            else if (s == "1011") exp_log += "UU";
            else if (s == "1101") exp_log += "u";
            exp_log += step2;
        }
        else if (s.match(/2001|1200|0120|0012/)) {
            if (s == "1200") exp_log += "U";
            else if (s == "0120") exp_log += "UU";
            else if (s == "0012") exp_log += "u";
            exp_log += step1 + "U" + step2;
        }
        else if (s.match(/1002|2100|0210|0021/)) {
            if (s == "2100") exp_log += "U";
            else if (s == "0210") exp_log += "UU";
            else if (s == "0021") exp_log += "u";
            exp_log += step2 + "U" + step1;
        }
        else if (s.match(/2121|1212/)) {
            if (s == "1212") exp_log += "U";
            exp_log += step2 + "UU" + step2;
        }
        else if (s.match(/2112|2211|1221|1122/)) {
            if (s == "2211") exp_log += "U";
            else if (s == "1221") exp_log += "UU";
            else if (s == "1122") exp_log += "u";
            exp_log += step1 + "U" + step1;
        }
        else if (s.match(/0201|1020/)) {
            if (s == "1020") exp_log += "U";
            exp_log += step1 + "UU" + step2;
        }
        else if (s.match(/0102|2010/)) {
            if (s == "2010") exp_log += "U";
            exp_log += step2 + "UU" + step1;
        }

        changeState(exp_log);
        console.log(exp_log)
        return compress(exp_log);
    }

    // --------------- COMPLETE THE THIRD LAYER EDGES ---------------
    function THIRD_LAYER_EDGES() {
        console.log("------------ COMPLETE THE THIRD LAYER EDGES ------------")
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        var exp_log = "";


        while (cubeState.ulf[2] != cubeState.f) {
            changeState("U");
            exp_log += "U";
        }

        for (let i = 0; i < 3; i++) {
            let exp = "";
            const s = cubeState.uf[1] + cubeState.ur[1] + cubeState.ub[1] + cubeState.ul[1];
            const c = cubeState.f + cubeState.r + cubeState.b + cubeState.l;

            let times = 0, pos = -1;
            for (let j = 0; j < 4; j++) {
                if (s[j] == c[j]) times++, pos = j;
            }

            // console.log(s, c)
            // console.log(times, pos)


            if (times > 1) return compress(exp_log)
            else if (times == 1) {
                if (pos == 1) exp += "Y";
                else if (pos == 2) exp += "YY";
                else if (pos == 3) exp += "y";

                if (s[(pos + 1) % 4] == nextColor[nextColor[s[pos]]])
                    exp += step1 + step2;
                else exp += "y" + step2 + step1;
            }
            else exp += step1 + step2;

            exp_log += exp;
            changeState(exp);
        }

        console.log("Third Layer Edges Error: ", exp_log);
        return "Third Layer Edges Error: " + exp_log;
    }

    function solveCube() {
        let steps = [];
        steps.push(FIRST_LAYER_EDGES());
        steps.push(FIRST_LAYER_CORNERS());
        steps.push(SECOND_LAYER());
        steps.push(TOP_CROSS());
        steps.push(THIRD_LAYER_CORNERS_POS());
        steps.push(THIRD_LAYER_CORNERS_ORI());
        steps.push(THIRD_LAYER_EDGES());
        return steps;
    };

    function compress(order) {
        for (let i = 0; i < 10; i++) {
            order = order.replace(/uU|Uu|dD|Dd|lL|Ll|fF|Ff|rR|Rr|bB|Bb|yY|Yy|uuuu|dddd|llll|ffff|rrrr|bbbb|yyyy|UUUU|DDDD|LLLL|FFFF|RRRR|BBBB|YYYY/g, "");
            order = order.replace(/uuu/g, "U");
            order = order.replace(/ddd/g, "D");
            order = order.replace(/lll/g, "L");
            order = order.replace(/fff/g, "F");
            order = order.replace(/rrr/g, "R");
            order = order.replace(/bbb/g, "B");
            order = order.replace(/yyy/g, "Y");

            order = order.replace(/UUU/g, "u");
            order = order.replace(/DDD/g, "d");
            order = order.replace(/LLL/g, "l");
            order = order.replace(/FFF/g, "f");
            order = order.replace(/RRR/g, "r");
            order = order.replace(/BBB/g, "b");
            order = order.replace(/YYY/g, "y");
        }
        return order;
    }

    getCubeState(state);
    return solveCube();
}

/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC":
/*!******************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC ***!
  \******************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC";

/***/ }),

/***/ "./src/vueapp/playground/demos.json":
/*!******************************************!*\
  !*** ./src/vueapp/playground/demos.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"LBL-101","state":"?U?UU??U????UB?????R??RB?????????????F??F?????L??L????","solution":"U F\' U\'"},{"name":"LBL-201","state":"????????RU???R??RR??B?B?BB?UU?UUUUUU????L?LLL????F?FFF","solution":"R U R\'"},{"name":"LBL-202","state":"????????BR???R??RR??U?B?BB?UU?UUUUUU????L?LLL????F?FFF","solution":"F\' U\' F"},{"name":"LBL-203","state":"????????UB???R??RR??R?B?BB?UU?UUUUUU????L?LLL????F?FFF","solution":"F\' U F R U2 R\'"},{"name":"LBL-204","state":"?????????????R?URR????B?BBRUUBUUUUUU????L?LLL????F?FFF","solution":"F\' U F R U R\'"},{"name":"LBL-205","state":"?????????????R?BRR????B?BBUUURUUUUUU????L?LLL????F?FFF","solution":"R U\' R\' F\' U\' F"},{"name":"LBL-301","state":"????DB????R??R?RRR????B?BBBUUUUUUUUU????L?LLL????F?FFF","solution":"R\' U\' R\' U\' R\' U R U R"},{"name":"LBL-302","state":"????D??R?????R?RRR?B??B?BBBUUUUUUUUU????L?LLL????F?FFF","solution":"F U F U F U\' F\' U\' F\'"},{"name":"LBL-303","state":"????D???????BR?RRR????BRBBBUUUUUUUUU????L?LLL????F?FFF","solution":"F U F U F U\' F\' U\' F\' U R\' U\' R\' U\' R\' U R U R"},{"name":"LBL-401","state":"?D?DD?????D?RRRRRR?D?BBBBBBUUUUUUUUU???LLLLLL???FFFFFF","solution":"R\' U\' F\' U F R"},{"name":"LBL-402","state":"?D??D??D??D?RRRRRR???BBBBBBUUUUUUUUU?D?LLLLLL???FFFFFF","solution":"R\' F\' U\' F U R"},{"name":"LBL-403","state":"????D?????D?RRRRRR?D?BBBBBBUUUUUUUUU?D?LLLLLL?D?FFFFFF","solution":"R\' U\' F\' U F R U R\' F\' U\' F U R"},{"name":"LBL-501","state":"DD?DDD?D?D??RRRRRRD??BBBBBBUUUUUUUUU???LLLLLLD??FFFFFF","solution":"R\' U L U\' R U L\' U\'"},{"name":"LBL-502","state":"DD?DDD?D???DRRRRRR??DBBBBBBUUUUUUUUU??DLLLLLL???FFFFFF","solution":"U L U\' R\' U L\' U\' R"},{"name":"LBL-601","state":"DDDDDDDDD?B?RRRRRR?L?BBBBBBUUUUUUUUU?R?LLLLLL?F?FFFFFF","solution":"F2 U R\' L F2 R L\' U F2"},{"name":"LBL-602","state":"DDDDDDDDD?L?RRRRRR?R?BBBBBBUUUUUUUUU?B?LLLLLL?F?FFFFFF","solution":"F2 U\' R\' L F2 R L\' U\' F2"},{"name":"LBL-701","state":"DDDDDDDDDFRFRRRRRRBBRBBBBBBUUUUUUUUURLLLLLLLLLFBFFFFFF","solution":"R2 B2 R F R\' B2 R F\' R"},{"name":"LBL-702","state":"DDDDDDDDDRRLRRRRRRLBBBBBBBBUUUUUUUUUFLFLLLLLLBFRFFFFFF","solution":"L2 B2 L\' F\' L B2 L\' F L\'"},{"name":"LBL-703","state":"DDDDDDDDDLRLRRRRRRFBFBBBBBBUUUUUUUUURLRLLLLLLBFBFFFFFF","solution":"R2 B2 R F R\' B2 R F\' R U R2 B2 R F R\' B2 R F\' R U\'"}]');

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
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4RCxZQUFZLHlDQUF5QztBQUNyRCxXQUFXLDRDQUE0QztBQUN2RCxZQUFZLDZDQUE2QztBQUN6RCxZQUFZLHdDQUF3QztBQUNwRCxXQUFXLDRDQUE0QztBQUN2RCxZQUFZLDZDQUE2QztBQUN6RCxZQUFZLHdDQUF3QztBQUNwRCxXQUFXLDZDQUE2QztBQUN4RCxZQUFZLDRDQUE0QztBQUN4RCxZQUFZLHlDQUF5QztBQUNyRCxXQUFXLDRDQUE0QztBQUN2RCxZQUFZLDZDQUE2QztBQUN6RCxZQUFZLHdDQUF3QztBQUNwRCxXQUFXLDZDQUE2QztBQUN4RCxZQUFZLDRDQUE0QztBQUN4RCxZQUFZLHlDQUF5QztBQUNyRCxXQUFXLGlDQUFpQztBQUM1QyxXQUFXLGtEQUFrRDtBQUM3RCxZQUFZLG1EQUFtRDtBQUMvRCxZQUFZLDhDQUE4QztBQUMxRCxXQUFXLGtEQUFrRDtBQUM3RCxZQUFZLG1EQUFtRDtBQUMvRCxZQUFZLDhDQUE4QztBQUMxRCxXQUFXLGtEQUFrRDtBQUM3RCxZQUFZLG1EQUFtRDtBQUMvRCxZQUFZLDhDQUE4QztBQUMxRCxXQUFXLGdEQUFnRDtBQUMzRCxZQUFZLCtDQUErQztBQUMzRCxZQUFZLDRDQUE0QztBQUN4RCxXQUFXLCtDQUErQztBQUMxRCxZQUFZLGdEQUFnRDtBQUM1RCxZQUFZLDJDQUEyQztBQUN2RCxXQUFXLCtDQUErQztBQUMxRCxZQUFZLGdEQUFnRDtBQUM1RCxZQUFZLDJDQUEyQztBQUN2RCxXQUFXLGdEQUFnRDtBQUMzRCxZQUFZLCtDQUErQztBQUMzRCxZQUFZLDRDQUE0QztBQUN4RCxXQUFXLCtDQUErQztBQUMxRCxZQUFZLGdEQUFnRDtBQUM1RCxZQUFZLDJDQUEyQztBQUN2RCxXQUFXLGdEQUFnRDtBQUMzRCxZQUFZLCtDQUErQztBQUMzRCxZQUFZLDRDQUE0QztBQUN4RCxXQUFXLDZDQUE2QztBQUN4RCxZQUFZLDRDQUE0QztBQUN4RCxZQUFZLHlDQUF5QztBQUNyRCxXQUFXLDZDQUE2QztBQUN4RCxZQUFZLDRDQUE0QztBQUN4RCxZQUFZLHlDQUF5QztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixXQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixXQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxnREFBZ0QscUJBQXFCO0FBQ3JFO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3JrQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvcGxheWdyb3VuZC9pbmRleC5odG1sIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3NldHRpbmcvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC92aWV3cG9ydC9pbmRleC5odG1sIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9jYXB0dXJlLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9jb250cm9sbGVyLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9jdWJlLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9jdWJlbGV0LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9ncm91cC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvaW50ZXJhY3Rvci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdHdpc3Rlci50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzX2ludGVybmFsLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS93b3JsZC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3BsYXlncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvc2V0dGluZy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC92aWV3cG9ydC9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2xibC5qcyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8di1hcHA+XFxuICAgIDxkaXYgdi1yZXNpemU9XFxcInJlc2l6ZVxcXCIgc3R5bGU9XFxcInVzZXItc2VsZWN0OiBub25lOyB0b3VjaC1hY3Rpb246IG5vbmU7XFxcIj5cXG4gICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCdcXG4gICAgICAgICAgICB9XFxcIiBpZD1cXFwidG9wLWZsZXhcXFwiPjwvdi1mbGV4PlxcblxcbiAgICAgICAgPHYtYnRuIGZpeGVkIHJpZ2h0IHRvcCBmYWIgY29sb3I9XFxcInByaW1hcnlcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTtcXFwiIDpzdHlsZT1cXFwie1xcbiAgICAgICAgd2lkdGg6IHNpemUgKiAwLjkgKyAncHgnLCBcXG4gICAgICAgIGhlaWdodDogc2l6ZSAqIDAuOSArICdweCcsIFxcbiAgICAgICAgJ21hcmdpbi1yaWdodCc6IHdpZHRoIC8gMiAtIE1hdGgubWluKHNpemUgKiA0LCB3aWR0aCAvIDIpICsgc2l6ZSAqIDEuMSArICdweCd9XFxcIiBAY2xpY2s9XFxcImxpc3RkPSFsaXN0ZFxcXCI+XFxuICAgICAgICAgICAgPHYtaWNvbiA6c2l6ZT1cXFwic2l6ZSAqIDAuNlxcXCI+XFxuICAgICAgICAgICAgICAgIHNjaG9vbFxcbiAgICAgICAgICAgIDwvdi1pY29uPlxcbiAgICAgICAgPC92LWJ0bj5cXG5cXG4gICAgICAgIDx2LWJ0biBmaXhlZCBsZWZ0IHRvcCB0ZXh0IGNvbG9yPVxcXCJwcmltYXJ5XFxcIiBzdHlsZT1cXFwidXNlci1zZWxlY3Q6IG5vbmU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCJcXG4gICAgICAgICAgICA6c3R5bGU9XFxcIntoZWlnaHQ6IHNpemUrJ3B4JywgJ21hcmdpbi1sZWZ0Jzogd2lkdGggLyAyIC0gTWF0aC5taW4oc2l6ZSAqIDQsIHdpZHRoIC8gMiAtIHNpemUgLyA0KSArICdweCd9XFxcIlxcbiAgICAgICAgICAgIEBjbGljaz1cXFwibGlzdGQ9dHJ1ZVxcXCIgdi1pZj1cXFwiaXNEZW1vTW9kZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzooc2l6ZSAqIDAuNCkrJ3B4J31cXFwiIHN0eWxlPVxcXCJ0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXFwiPnt7IGRlbW9OYW1lIH19PC9kaXY+XFxuICAgICAgICA8L3YtYnRuPlxcblxcbiAgICAgICAgPHYtYm90dG9tLXNoZWV0IHYtbW9kZWw9XFxcImxpc3RkXFxcIj5cXG4gICAgICAgICAgICA8di1jYXJkIHRleHQgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiAwJTsgbWFyZ2luLXJpZ2h0OiAwJTsgcGFkZGluZy1sZWZ0OiAwJTsgcGFkZGluZy1yaWdodDogMCU7XFxcIj5cXG4gICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkIGdyaWQtbGlzdC1tZCB0ZXh0LXhzLWNlbnRlciBzdHlsZT1cXFwicGFkZGluZy1sZWZ0OiAwJTsgcGFkZGluZy1yaWdodDogMCU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiAxMCwgd2lkdGgpICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwXFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiAwJTsgbWFyZ2luLXJpZ2h0OiAwJTsgcGFkZGluZy1sZWZ0OiAwJTsgcGFkZGluZy1yaWdodDogMCU7IG1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBhbGlnbi1pdGVtczogc3RyZXRjaDtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQgb3V0bGluZWQgc3R5bGU9XFxcIm1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOnN0eWxlPVxcXCJ7J3dpZHRoJzogZGVtb0dyaWRXaWR0aCAgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XFxcIihkZW1vSW1hZ2UsIGkpIGluIGRlbW9JbWFnZXNcXFwiIDprZXk9XFxcImlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gYmxvY2sgZGVwcmVzc2VkIHRleHQgY29sb3I9XFxcInByaW1hcnlcXFwiIDpzdHlsZT1cXFwie1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6IHNpemUgKiAwLjM1ICsgJ3B4J1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XFxcIiBzdHlsZT1cXFwidGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwJTtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCU7XFxcIiBAY2xpY2s9XFxcInNlbGVjdERlbW8oaSlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZGVtb0RhdGFbaV0ubmFtZSB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIDpzcmM9XFxcImRlbW9JbWFnZVxcXCIgc3R5bGU9XFxcIm1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdHlsZT1cXFwieyd3aWR0aCc6ZGVtb0dyaWRXaWR0aCAgKyAncHgnfVxcXCIgQGNsaWNrPVxcXCJzZWxlY3REZW1vKGkpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZD5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XFxuICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICAgICAgPC92LWNhcmQ+XFxuICAgICAgICA8L3YtYm90dG9tLXNoZWV0PlxcblxcbiAgICAgICAgPHNldHRpbmcgcmVmPVxcXCJzZXR0aW5nXFxcIj48L3NldHRpbmc+XFxuICAgICAgICA8dmlld3BvcnQgcmVmPVxcXCJ2aWV3cG9ydFxcXCI+PC92aWV3cG9ydD5cXG4gICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6c2l6ZSArICdweCcsXFxuICAgICAgICAgICAgICAgICdwYWRkaW5nJzogJ25vbmUnLFxcbiAgICAgICAgICAgICAgICAnbWFyZ2luJzogJ25vbmUnXFxuICAgICAgICAgICAgfVxcXCIgaWQ9XFxcImJvdHRvbS1mbGV4XFxcIiB2LXNob3c9XFxcIiFpc1BsYXllck1vZGVcXFwiPlxcbiAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICA8di1jYXJkIGZsYXQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bzsgdG91Y2gtYWN0aW9uOiBub25lOyB1c2VyLXNlbGVjdDogbm9uZTtcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXJcXG4gICAgICAgICAgICAgICAgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiA4LCB3aWR0aCkgKyAncHgnLCBoZWlnaHQ6IHNpemUgKiA0ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0Jzogc2l6ZSArICdweCdcXG4gICAgICAgICAgICAgICAgfVxcXCIgdi1pZj1cXFwiaXNQbGF5ZXJNb2RlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1zbGlkZXIgOnZhbHVlPVxcXCJwcm9ncmVzc1xcXCIgc3R5bGU9XFxcIm1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOm1heD1cXFwic29sdXRpb24ubGVuZ3RoXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGljay1zaXplPVxcXCIzXFxcIiB0aHVtYi1sYWJlbD1cXFwiYWx3YXlzXFxcIiB0aWNrcz1cXFwiYWx3YXlzXFxcIiBoaWRlLWRldGFpbHMgdi1vbjppbnB1dD1cXFwic2V0UHJvZ3Jlc3NcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnRodW1iLWxhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcHJvZ3Jlc3MgPT0gMCA/ICcjJyA6IHNvbHV0aW9uW3Byb2dyZXNzIC0gMV0gfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Ytc2xpZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJncmVlbkJ1dHRvblxcXCIgYmxvY2sgdGV4dCBjb2xvcj1cXFwiZ3JlZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgIWlzUGxheWVyTW9kZSA/ICdTY3JhbWJsZScgOiAocHJvZ3Jlc3MgPT0gc29sdXRpb24ubGVuZ3RoID8gJ1JlcGxheScgOiAnUGxheScpIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcImJsdWVCdXR0b25cXFwiIGJsb2NrIHRleHQgY29sb3I9XFxcImJsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgIWlzUGxheWVyTW9kZSA/ICdSZXNldCcgOiAnUGF1c2UnIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInJlZEJ1dHRvblxcXCIgYmxvY2sgdGV4dCBjb2xvcj1cXFwicmVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWluLXdpZHRoOiAwJTsgbWluLWhlaWdodDogMCU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOmhlaWdodD1cXFwic2l6ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKydweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICFpc1BsYXllck1vZGUgPyAnU29sdmUnIDogJ1F1aXQnIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgPC92LWNhcmQ+XFxuICAgIDwvZGl2Plxcbjwvdi1hcHA+XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIj5cXG4gICAgPHYtYnRuIGZpeGVkIHJpZ2h0IHRvcCBmYWIgY29sb3I9XFxcInByaW1hcnlcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTtcXFwiXFxuICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogc2l6ZSAqIDAuOSArICdweCcsIGhlaWdodDogc2l6ZSAqIDAuOSArICdweCcsICdtYXJnaW4tcmlnaHQnOiB3aWR0aCAvIDIgLSBNYXRoLm1pbihzaXplICogNCwgd2lkdGggLyAyKSArICdweCd9XFxcIlxcbiAgICAgICAgQGNsaWNrPVxcXCJzdGF0ZSA9ICFzdGF0ZVxcXCI+XFxuICAgICAgICA8di1pY29uIDpzaXplPVxcXCJzaXplICogMC42XFxcIj5cXG4gICAgICAgICAgICBzZXR0aW5nc1xcbiAgICAgICAgPC92LWljb24+XFxuICAgIDwvdi1idG4+XFxuICAgIDx2LWJvdHRvbS1zaGVldCB2LW1vZGVsPVxcXCJzdGF0ZVxcXCI+XFxuICAgICAgICA8di1jYXJkIHRleHQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bztcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXIgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiA4LCB3aWR0aCkgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNPTFZJTkcgQUxHT1JJVEhNXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgIH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtcmFkaW8tZ3JvdXAgdi1tb2RlbD1cXFwic29sdmVyX2lkXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1yYWRpbyBsYWJlbD1cXFwiTGF5ZXIgQnkgTGF5ZXIgTWV0aG9kXFxcIiA6dmFsdWU9XFxcIjBcXFwiIG9mZi1pY29uPVxcXCJyYWRpb19idXR0b25fdW5jaGVja2VkXFxcIiBvbi1pY29uPVxcXCJyYWRpb19idXR0b25fY2hlY2tlZFxcXCI+PC92LXJhZGlvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXJhZGlvIGxhYmVsPVxcXCJLb2NpZW1iYSdzIEFsZ29yaXRobVxcXCIgOnZhbHVlPVxcXCIxXFxcIiBvZmYtaWNvbj1cXFwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFxcXCIgIG9uLWljb249XFxcInJhZGlvX2J1dHRvbl9jaGVja2VkXFxcIiA6c3R5bGU9XFxcInsgJ21hcmdpbi10b3AnIDogc2l6ZSAqIDAuMiArICdweCd9XFxcIj48L3YtcmFkaW8+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtcmFkaW8tZ3JvdXA+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBTQ1JBTUJMRSBMRU5HVEhcXG4gICAgICAgICAgICAgICAgPC92LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIDpzdHlsZT1cXFwie1xcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctdG9wJzogc2l6ZSAqIDAuMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogKHNpemUgKiAwLjMpICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOnNpemUgKyAncHgnXFxuICAgICAgICAgICAgICAgIH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHZ1ZS1zbGlkZXIgdi1tb2RlbD1cXFwic2NyYW1ibGVfc3RlcHNcXFwiIHRodW1iLWxhYmVsPVxcXCJhbHdheXNcXFwiIDptYXg9XFxcIjQwXFxcIiA6bWluPVxcXCIwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDptYXJrcz1cXFwiWzAsMTAsMjAsMzAsNDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBGUkFNRVMgUEVSIFRXSVNUXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcImZyYW1lc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNjBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTUsMzAsNDUsNjBdXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdnVlLXNsaWRlcj5cXG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNFTlNJVElWSVRZXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcInNlbnNpYmlsaXR5XFxcIiB0aHVtYi1sYWJlbD1cXFwiYWx3YXlzXFxcIiA6bWF4PVxcXCIxMDBcXFwiIDptaW49XFxcIjBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOm1hcmtzPVxcXCJbMCwyNSw1MCw3NSwxMDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICA8L3YtY2FyZD5cXG4gICAgPC92LWJvdHRvbS1zaGVldD5cXG48L2Rpdj5cIiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IHJlZj1cXFwiY2FudmFzXFxcIj48L2Rpdj5cIiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuL3dvcmxkXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXB0dXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgICAgIGFscGhhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbygxKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKDI1NiwgMjU2LCB0cnVlKTtcbiAgICAgICAgdGhpcy53b3JsZC5yZXNpemUoMjU2LCAyNTYpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKFwiPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XCIpO1xuICAgIH1cbiAgICBnZW5lcmF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzdG9yZShzdGF0ZS5zcGxpdChcIlwiKSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMud29ybGQuc2NlbmUsIHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBheGlzX3BsYW5lcywgYXhpc192ZWN0b3JzLCBjdWJlX2NvbmZpZywgY3ViZV9zaXplLCBpbmRleFRvTGF5ZXIsIHdvcmxkVG9JbmRleCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBCb3gzLCBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5leHBvcnQgY2xhc3MgSG9sZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuYXhpcyA9IFwiXCI7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3Iod29ybGQpIHtcbiAgICAgICAgdGhpcy5pbnRlcmFjdCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hzdGFydFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnggPSBhY3Rpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnkgPSBhY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duX3RpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVEb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hjYW5jZWxcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW91dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9sb2NrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5heGlzID0gXCJcIjtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgdGhpcy5kb3duID0gbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLmRvd25fdGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBIb2xkZXIoKTtcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBzZXQgbG9jayh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2xvY2sgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NrO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpc2FibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5jb250aW5nbGUgKyB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIHRoaXMuZ3JvdXAuYW5nbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIGdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaCgpIHtcbiAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgY29uc3QgZmluZ2VyID0gdGhpcy5ob2xkZXIudmVjdG9yO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaG9sZGVyLmluZGV4O1xuICAgICAgICBjb25zdCBpbGF5ZXIgPSBpbmRleFRvTGF5ZXIoaW5kZXgpO1xuICAgICAgICBmb3IgKGNvbnN0IGF4aXMgb2YgW1wieFwiLCBcInlcIiwgXCJ6XCJdKSB7XG4gICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBheGlzX3ZlY3RvcnNbYXhpc107XG4gICAgICAgICAgICBpZiAodmVjdG9yLmRvdChwbGFuZS5ub3JtYWwpID09PSAwICYmIHZlY3Rvci5kb3QoZmluZ2VyKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW2F4aXNdW2lsYXllcltheGlzXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgY29uc3QgcmF5ID0gbmV3IFRIUkVFLlJheSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCB4ID0gKHBvaW50LnggLyB0aGlzLndvcmxkLndpZHRoKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCB5ID0gLShwb2ludC55IC8gdGhpcy53b3JsZC5oZWlnaHQpICogMiArIDE7XG4gICAgICAgIG1hdHJpeC5jb3B5KHRoaXMud29ybGQuc2NlbmUubWF0cml4KTtcbiAgICAgICAgbWF0cml4LmludmVydCgpO1xuICAgICAgICByYXkub3JpZ2luLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHJheS5kaXJlY3Rpb24uc2V0KHgsIHksIDAuNSkudW5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKS5zdWIocmF5Lm9yaWdpbikubm9ybWFsaXplKCk7XG4gICAgICAgIHJheS5hcHBseU1hdHJpeDQobWF0cml4KTtcbiAgICAgICAgcmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYW5kbGVEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWluX2Rpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1theGlzXTtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCBwbGFuZSk7XG4gICAgICAgICAgICBpZiAocG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlX21hcmdpbiA9IGN1YmVfc2l6ZSAvIDIgKyAwLjAwMTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3hNaW4gPSBuZXcgVmVjdG9yMygpLnNldFNjYWxhcigtY3ViZV9tYXJnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveE1heCA9IG5ldyBWZWN0b3IzKCkuc2V0U2NhbGFyKGN1YmVfbWFyZ2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBuZXcgQm94Myhib3hNaW4sIGJveE1heCk7XG4gICAgICAgICAgICAgICAgaWYgKGJveC5jb250YWluc1BvaW50KHBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBuZXcgVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5kaXN0YW5jZVRvKG9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmF4aXMgPSBheGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSB3b3JsZFRvSW5kZXgocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5taW4odGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQpIC8gZCA+IDEyOCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucm90YXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZGVyLmluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3duLnggPCB0aGlzLndvcmxkLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5nbGVfc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbmdsZV9zZXQuYWRkKGdyb3VwLmFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRpbmdsZV9zZXQuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlX3NldC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubWF4KG5ldyBWZWN0b3IzKCkuc3ViKHZlY3RvcikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm0gPSBNYXRoLm1heCh2ZWN0b3IueCwgdmVjdG9yLnksIHZlY3Rvci56KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci52ZWN0b3IuY29weShub3JtID09IHZlY3Rvci54ID8gbmV3IFZlY3RvcjMoMSwgMCwgMCkgOiAobm9ybSA9PSB2ZWN0b3IueSA/IG5ldyBWZWN0b3IzKDAsIDEsIDApIDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gdGhpcy5tYXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHRoaXMuZ3JvdXAuYW5nbGU7XG4gICAgICAgICAgICAgICAgdmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHBsYW5lLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLm11bHRpcGx5U2NhbGFyKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3Iueik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubXVsdGlwbHkodGhpcy5ob2xkZXIudmVjdG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID1cbiAgICAgICAgICAgICAgICAgICAgKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3IueikgKlxuICAgICAgICAgICAgICAgICAgICAgICAgY3ViZV9jb25maWcuc2Vuc2liaWxpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IHRoaXMubW92ZS54IC0gdGhpcy5kb3duLng7XG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSAqICh0aGlzLmF4aXMgPT0gXCJ5XCIgPyAtZHggOlxuICAgICAgICAgICAgICAgICAgICAodGhpcy5heGlzID09IFwieFwiID8gLWR5IDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChkeSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMuYW5nbGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMubG9jaykge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPCBNYXRoLlBJIC8gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IChNYXRoLmFicyhhbmdsZSkgLyAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmRvd25fdGljaykpICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkID4gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlID09IDAgPyAwIDogKChhbmdsZSAvIE1hdGguYWJzKGFuZ2xlKSkgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jb250aW5nbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICAgICAgICBncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ3ViZWxldCBmcm9tIFwiLi9jdWJlbGV0XCI7XG5pbXBvcnQgeyBHcm91cFRhYmxlIH0gZnJvbSBcIi4vZ3JvdXBcIjtcbmltcG9ydCB7IHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2ZhY2VfYXR0cnMsIGN1YmVsZXRfbGFtYmVycywgY3ViZWxldF9zdGlja2VyLCBjdWJlX2NvbmZpZyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBGYWNlIH0gZnJvbSBcIi4vdXRpbHNfaW50ZXJuYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gbmV3IEN1YmVsZXQoaSk7XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvY2tzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInhcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ5XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwielwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcImFcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBHcm91cFRhYmxlKHRoaXMpO1xuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxvY2sgb2YgdGhpcy5sb2Nrcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKGxvY2suc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKChfYSA9IHRoaXMubG9ja3MuZ2V0KFwiYVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhcygxKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBpZiAoYXhpc19sb2Nrc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxvY2tzZXQgb2YgdGhpcy5sb2Nrcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKGxvY2tzZXQgIT0gYXhpc19sb2Nrc2V0ICYmIGxvY2tzZXQuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXhpc19sb2Nrc2V0LmFkZChsYXllcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB1bmxvY2soYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgYXhpc19sb2Nrc2V0ID0gdGhpcy5sb2Nrcy5nZXQoYXhpcyk7XG4gICAgICAgIGF4aXNfbG9ja3NldCA9PT0gbnVsbCB8fCBheGlzX2xvY2tzZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGF4aXNfbG9ja3NldC5kZWxldGUobGF5ZXIpO1xuICAgIH1cbiAgICByYW5kb20zKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyksIDApLCAyKTtcbiAgICB9XG4gICAgc2NyYW1ibGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3ViZV9jb25maWcuc2NyYW1ibGVfc3RlcHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXhpcyA9IFtcInhcIiwgXCJ5XCIsIFwielwiXVt0aGlzLnJhbmRvbTMoKV07XG4gICAgICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMucmFuZG9tMygpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAodGhpcy5yYW5kb20zKCkgLSAxKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLmdyb3Vwc1theGlzXVtsZXZlbF0udHdpc3QoYW5nbGUgPT09IDAgPyBNYXRoLlBJIDogYW5nbGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0d2lzdGVyLmZpbmlzaCgpO1xuICAgICAgICBmb3IgKGNvbnN0IGN1YmVsZXQgb2YgdGhpcy5jdWJlbGV0cykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlbGV0cy5zcGxpY2UoMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBHcm91cFRhYmxlKHRoaXMpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgeCwgeSwgejtcbiAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgeSA9IDI7XG4gICAgICAgIGZvciAoeiA9IDA7IHogPCAzOyB6KyspIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5VKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDI7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHogPSAyOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLlIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB6ID0gMjtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5GKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeSA9IDA7XG4gICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuRCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHggPSAwO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gMDsgeiA8IDM7IHorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkwpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB6ID0gMDtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDI7IHggPj0gMDsgeC0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuQik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3RvcmUoc3RhdGUpIHtcbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIGxldCBjdXIgPSAwO1xuICAgICAgICBsZXQgZmFjZTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB5ID0gMjtcbiAgICAgICAgZmFjZSA9IEZhY2UuVTtcbiAgICAgICAgZm9yICh6ID0gMDsgeiA8IDM7IHorKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gc3RhdGVbY3VyKytdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gbmV3IE1lc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gMjtcbiAgICAgICAgZmFjZSA9IEZhY2UuUjtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQucmVtb3ZlKGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBuZXcgTWVzaCgpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbZmFjZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbGFtYmVyc1tjb2xvcl0pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHogPSAyO1xuICAgICAgICBmYWNlID0gRmFjZS5GO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gc3RhdGVbY3VyKytdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gbmV3IE1lc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5ID0gMDtcbiAgICAgICAgZmFjZSA9IEZhY2UuRDtcbiAgICAgICAgZm9yICh6ID0gMjsgeiA+PSAwOyB6LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXRlW2N1cisrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY3ViZWxldC5yZW1vdmUoY3ViZWxldC5zdGlja2Vyc1tmYWNlXSk7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IG5ldyBNZXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tmYWNlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9sYW1iZXJzW2NvbG9yXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDA7XG4gICAgICAgIGZhY2UgPSBGYWNlLkw7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHogPSAwOyB6IDwgMzsgeisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQucmVtb3ZlKGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBuZXcgTWVzaCgpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbZmFjZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbGFtYmVyc1tjb2xvcl0pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHogPSAwO1xuICAgICAgICBmYWNlID0gRmFjZS5CO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMjsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXRlW2N1cisrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY3ViZWxldC5yZW1vdmUoY3ViZWxldC5zdGlja2Vyc1tmYWNlXSk7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IG5ldyBNZXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tmYWNlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9sYW1iZXJzW2NvbG9yXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3ViZWxldF9kZWZzLCBjdWJlbGV0X2NvcmUsIGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9mYWNlX2F0dHJzLCBkaXJlY3Rpb25Ub0luZGV4LCBmYWNlUG9zdGlvbkJpbmRpbmdzLCBjdWJlbGV0X2xhbWJlcnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBpbmRleFRvRGlyZWN0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVsZXQgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBjb25zdCBkcmN0biA9IGluZGV4VG9EaXJlY3Rpb24oaW5kZXgpO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKGRyY3RuLngsIGRyY3RuLnksIGRyY3RuLnopO1xuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9mcmFtZSwgY3ViZWxldF9jb3JlKTtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5mcmFtZSk7XG4gICAgICAgIHRoaXMuc3RpY2tlcnMgPSBuZXcgQXJyYXkoNik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbaV07XG4gICAgICAgICAgICBpZiAoZmFjZV9hdHRyLm1hdGNoKHRoaXMudmVjdG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGZhY2VfYXR0ci5sYW1iZXJ0KTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja2Vyc1tpXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XG4gICAgICAgIHRoaXMuX3ZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gICAgICAgIHRoaXMuaW5kZXggPSBkaXJlY3Rpb25Ub0luZGV4KHZlY3Rvcik7XG4gICAgICAgIHRoaXMucG9zaXRpb24uY29weSh2ZWN0b3IpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKGN1YmVsZXRfZGVmcy5zaXplKTtcbiAgICB9XG4gICAgZ2V0IHZlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY3RvcjtcbiAgICB9XG4gICAgY29udmVydEZhY2UoZmFjZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBxdWF0ZXJuaW9uID0gbmV3IFF1YXRlcm5pb24oKS5jb3B5KHRoaXMucXVhdGVybmlvbik7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZyBvZiBmYWNlUG9zdGlvbkJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5mYWNlID09PSBmYWNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24uY29weShiaW5kaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbi5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbi5pbnZlcnQoKSk7XG4gICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKE1hdGgucm91bmQocG9zaXRpb24ueCksIE1hdGgucm91bmQocG9zaXRpb24ueSksIE1hdGgucm91bmQocG9zaXRpb24ueikpO1xuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmcgb2YgZmFjZVBvc3Rpb25CaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcucG9zaXRpb24uZXF1YWxzKHZlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5mYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZ2V0Q29sb3JPZihmYWNlKSB7XG4gICAgICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLnN0aWNrZXJzW3RoaXMuY29udmVydEZhY2UoZmFjZSldO1xuICAgICAgICBzd2l0Y2ggKHN0aWNrZXIubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTFwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5GOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkZcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuVTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5EOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCI/XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBUd2lzdCwgdHdpc3RlciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IGF4aXNfdmVjdG9ycywgY3ViZV9jb25maWcsIGluZGV4VG9MYXllciB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlR3JvdXAgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoY3ViZSwgYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdWJlID0gY3ViZTtcbiAgICAgICAgdGhpcy5heGlzID0gYXhpcztcbiAgICAgICAgdGhpcy5sYXllciA9IGxheWVyO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGlsYXllciA9IGluZGV4VG9MYXllcihpKTtcbiAgICAgICAgICAgIGlmIChheGlzID09IFwieFwiICYmIGlsYXllci54ID09IGxheWVyXG4gICAgICAgICAgICAgICAgfHwgYXhpcyA9PSBcInlcIiAmJiBpbGF5ZXIueSA9PSBsYXllclxuICAgICAgICAgICAgICAgIHx8IGF4aXMgPT0gXCJ6XCIgJiYgaWxheWVyLnogPT0gbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgc2V0IGFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRoaXMuc2V0Um90YXRpb25Gcm9tQXhpc0FuZ2xlKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCBhbmdsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ2xlO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbDtcbiAgICAgICAgICAgIHR3aXN0ZXIuY2FuY2VsKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbCAtIHRoaXMuYW5nbGU7XG4gICAgICAgICAgICB0d2lzdGVyLmZpbmlzaCh0aGlzLnR3aXN0aW5nKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGhvbGQoKSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmN1YmUubG9jayh0aGlzLmF4aXMsIHRoaXMubGF5ZXIpO1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvbGRpbmcgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5pbmRpY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlLmN1YmVsZXRzW2ldO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5hZGQodGhpcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkcmFnKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gLXRoaXMuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaG9sZCgpO1xuICAgIH1cbiAgICBkcm9wKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gY3ViZWxldCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5hZGQoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUuY3ViZWxldHNbY3ViZWxldC5pbmRleF0gPSBjdWJlbGV0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmN1YmUudW5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xuICAgIH1cbiAgICB0d2lzdChhbmdsZSwgZmFzdCkge1xuICAgICAgICBpZiAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmhvbGQoKTtcbiAgICAgICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGFuZ2xlID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpICogKE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGZhc3QpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSA8IDFlLTYpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnJhYyA9IE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgLyAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjdWJlX2NvbmZpZy5mcmFtZXMgKiAoMiAtIDIgLyAoZnJhYyArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSBuZXcgVHdpc3QodGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0d2lzdGVyLnR3aXN0cy5wdXNoKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdyb3VwVGFibGUge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1theGlzXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb21zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmRvbXMgPSBbXTtcbiAgICAgICAgdGhpcy50b3VjaCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoc3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKFwidG91Y2hlbmRcIiwgdGhpcy5sYXN0LmNsaWVudFggLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3QgPSBmaXJzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGluKCkgfHwgKChfYSA9IHRoaXMubGFzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkZW50aWZpZXIpICE9IGZpcnN0LmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZmlyc3QuY2xpZW50WCAtIHRoaXMuZG9tc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LCBmaXJzdC5jbGllbnRZIC0gdGhpcy5kb21zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNoY2FuY2VsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb3VzZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGluKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBldmVudC5jbGllbnRYIC0gdGhpcy5kb21zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIGV2ZW50LmNsaWVudFkgLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNldXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBkb20gb2YgZG9tcykge1xuICAgICAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tcy5wdXNoKGRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB9XG4gICAgbm90aW4oKSB7XG4gICAgICAgIGZvciAoY29uc3QgZG9tIG9mIHRoaXMuZG9tcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSBkb20pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFR3aXN0IHtcbiAgICBjb25zdHJ1Y3RvcihkZXBhdHVyZSwgYXJyaXZhbCwgZHVyYXRpb24sIGNhbGxiYWNrX2Z1bmMpIHtcbiAgICAgICAgdGhpcy5kZXBhcnR1cmUgPSBkZXBhdHVyZTtcbiAgICAgICAgdGhpcy5hcnJpdmFsID0gYXJyaXZhbDtcbiAgICAgICAgdGhpcy5kdXJhbnRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5jYWxsYmFja19mdW5jID0gY2FsbGJhY2tfZnVuYztcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmFudGlvbjtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5hcnJpdmFsO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkKys7XG4gICAgICAgIGNvbnN0IGZyYWMgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmVsYXBzZWQgLyB0aGlzLmR1cmFudGlvbiwgMCksIDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBmcmFjID09IDEgPyB0aGlzLmFycml2YWwgOiAodGhpcy5kZXBhcnR1cmUgKyAodGhpcy5hcnJpdmFsIC0gdGhpcy5kZXBhcnR1cmUpICogKDEgLSAoMSAtIGZyYWMpICogKDEgLSBmcmFjKSkpO1xuICAgIH1cbiAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tfZnVuYyh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUd2lzdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d2lzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgbGV0IGN1ciA9IDA7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLnR3aXN0cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChjdXIgPCBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMudHdpc3RzW2N1cl0udXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy50d2lzdHNbY3VyXS5jYWxsYmFjaygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d2lzdHMuc3BsaWNlKGN1ciwgMSk7XG4gICAgICAgICAgICAgICAgZW5kLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5pc2godHdpc3QgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR3aXN0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdpc3RzW2ldID09IHR3aXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHR3aXN0LmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3aXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR3aXN0cyA9IHRoaXMudHdpc3RzLnNwbGljZSgwKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdHdpc3Qgb2YgdHdpc3RzKSB7XG4gICAgICAgICAgICAgICAgdHdpc3QuZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuY2VsKHR3aXN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50d2lzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR3aXN0c1tpXSA9PSB0d2lzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHdpc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1R3aXN0aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50d2lzdHMubGVuZ3RoICE9IDA7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHR3aXN0ZXIgPSBuZXcgVHdpc3RlcigpO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBGYWNlLCBGcmFtZSwgU3RpY2tlciB9IGZyb20gXCIuL3V0aWxzX2ludGVybmFsXCI7XG5leHBvcnQgY29uc3QgY3ViZV9jb25maWcgPSB7XG4gICAgZnJhbWVzOiAzMCxcbiAgICBzZW5zaWJpbGl0eTogMjUgKiAxZS00LFxuICAgIHNjcmFtYmxlX3N0ZXBzOiAyMCxcbiAgICBzb2x2ZXJJZDogMCxcbn07XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb2xvcnMgPSB7XG4gICAgUjogXCIjQjcxQzFDXCIsXG4gICAgTDogXCIjRkY2RDAwXCIsXG4gICAgVTogXCIjRjBGMEYwXCIsXG4gICAgRDogXCIjRkZENjAwXCIsXG4gICAgRjogXCIjMDBBMDIwXCIsXG4gICAgQjogXCIjMEQ0N0ExXCIsXG4gICAgY29yZTogXCIjMjAyMDIwXCIsXG4gICAgZ3JheTogXCIjODA4MDgwXCIsXG4gICAgaGlnaDogXCIjRkYwMDgwXCIsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZGVmcyA9IHtcbiAgICBzaXplOiA2NCxcbiAgICBfYm9yZGVyX3dpZHRoOiAzLFxuICAgIF9lZGdlX3dpZHRoOiAyLFxuICAgIF9zdGlja2VyX2RlcHRoOiAwLjEsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfZnJhbWUgPSBuZXcgRnJhbWUoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5fYm9yZGVyX3dpZHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2xhbWJlcnMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGN1YmVsZXRfY29sb3JzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY3ViZWxldF9jb2xvcnNba2V5XSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn0pKCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9jb3JlID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICBjb2xvcjogY3ViZWxldF9jb2xvcnMuY29yZSxcbiAgICBzcGVjdWxhcjogY3ViZWxldF9jb2xvcnMuZ3JheSxcbiAgICBzaGluaW5lc3M6IDIsXG59KTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X3N0aWNrZXIgPSBuZXcgU3RpY2tlcihjdWJlbGV0X2RlZnMuc2l6ZSAtIDIgKiBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCAtIGN1YmVsZXRfZGVmcy5fZWRnZV93aWR0aCwgY3ViZWxldF9kZWZzLl9zdGlja2VyX2RlcHRoKTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZhY2VfYXR0cnMgPSBbXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygwLCAtTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnggPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyhjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgTWF0aC5QSSAvIDIsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5ELFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJIC8gMiwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueSA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuVSxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiwgMCksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygtTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnogPT0gLTE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5CLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLWN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMyhNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgY3ViZWxldF9kZWZzLnNpemUgLyAyKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDIgKiBNYXRoLlBJLCAwLCAwKSxcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBjdWJlX3NpemUgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG5leHBvcnQgY29uc3QgYXhpc192ZWN0b3JzID0ge1xuICAgIGE6IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLFxuICAgIHg6IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSxcbiAgICB5OiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksXG4gICAgejogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxufTtcbmV4cG9ydCBjb25zdCBheGlzX3BsYW5lcyA9IHtcbiAgICB4OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB5OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIC1jdWJlX3NpemUgLyAyKSxcbiAgICB6OiBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIC1jdWJlX3NpemUgLyAyKVxufTtcbmV4cG9ydCBjb25zdCBpbmRleFRvRGlyZWN0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGluZGV4ICUgMyAtIDEsIE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMgLSAxLCBNYXRoLmZsb29yKGluZGV4IC8gOSkgLSAxKTtcbn07XG5leHBvcnQgY29uc3QgZGlyZWN0aW9uVG9JbmRleCA9IChkcmN0bikgPT4ge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKChkcmN0bi54ICsgMSkgKyAoZHJjdG4ueSArIDEpICogMyArIChkcmN0bi56ICsgMSkgKiA5KTtcbn07XG5leHBvcnQgY29uc3QgaW5kZXhUb0xheWVyID0gKGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0geyB4OiBpbmRleCAlIDMsIHk6IE1hdGguZmxvb3IoaW5kZXggLyAzKSAlIDMsIHo6IE1hdGguZmxvb3IoaW5kZXggLyA5KSB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGNvbnN0IHdvcmxkVG9JbmRleCA9IChwb2ludCkgPT4ge1xuICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuY29weShwb2ludCk7XG4gICAgdmVjdG9yLmFkZChuZXcgVmVjdG9yMygpLnNldFNjYWxhcihjdWJlX3NpemUgLyAyKSk7XG4gICAgdmVjdG9yLmRpdmlkZVNjYWxhcihjdWJlX3NpemUpLm11bHRpcGx5U2NhbGFyKDMpLmZsb29yKCk7XG4gICAgdmVjdG9yLm1heChuZXcgVmVjdG9yMygpLnNldFNjYWxhcigwKSk7XG4gICAgdmVjdG9yLm1pbihuZXcgVmVjdG9yMygpLnNldFNjYWxhcigyKSk7XG4gICAgcmV0dXJuIHZlY3Rvci54ICsgdmVjdG9yLnkgKiAzICsgdmVjdG9yLnogKiA5O1xufTtcbmV4cG9ydCBjb25zdCBmYWNlUG9zdGlvbkJpbmRpbmdzID0gW1xuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5MLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuUixcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuRCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLlUsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLkIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSlcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5GLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSlcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBzdHJpbmdUb1R3aXN0UGFyYW1zID0ge1xuICAgIFwiTFwiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkwnXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJMMlwiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiAtTWF0aC5QSSB9LFxuICAgIFwiUlwiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiUidcIjogeyBheGlzOiAneCcsIGxheWVyczogWzJdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJSMlwiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJGXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsyXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJGJ1wiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkYyXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsyXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcIkJcIjogeyBheGlzOiAneicsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJCJ1wiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiQjJcIjogeyBheGlzOiAneicsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIlVcIjogeyBheGlzOiAneScsIGxheWVyczogWzJdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIlUnXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsyXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiVTJcIjogeyBheGlzOiAneScsIGxheWVyczogWzJdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwiRFwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIkQnXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFswXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJEMlwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiAtTWF0aC5QSSB9LFxuICAgIFwiflwiOiB7IGF4aXM6ICdhJywgbGF5ZXJzOiBbXSwgYW5nbGU6IDAgfSxcbiAgICBcInhcIjogeyBheGlzOiAneCcsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIngnXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwieDJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwieVwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwieSdcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJ5MlwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJ6XCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJ6J1wiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcInoyXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcImxcIjogeyBheGlzOiAneCcsIGxheWVyczogWzAsIDFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJsJ1wiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMCwgMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwibDJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzAsIDFdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcInJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzIsIDFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcInInXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwicjJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzIsIDFdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwiZlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiZidcIjogeyBheGlzOiAneicsIGxheWVyczogWzIsIDFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJmMlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJiXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiYidcIjogeyBheGlzOiAneicsIGxheWVyczogWzAsIDFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcImIyXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJ1XCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJ1J1wiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcInUyXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcImRcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJkJ1wiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMCwgMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiZDJcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDFdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIkVcIjogeyBheGlzOiAneScsIGxheWVyczogWzFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJFJ1wiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiRTJcIjogeyBheGlzOiAneScsIGxheWVyczogWzFdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIk1cIjogeyBheGlzOiAneCcsIGxheWVyczogWzFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJNJ1wiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiTTJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzFdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIlNcIjogeyBheGlzOiAneicsIGxheWVyczogWzFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIlMnXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiUzJcIjogeyBheGlzOiAneicsIGxheWVyczogWzFdLCBhbmdsZTogTWF0aC5QSSB9LFxufTtcbmV4cG9ydCBjb25zdCBsYmxPcmRlck1hcHBpbmcgPSB7XG4gICAgXCJVXCI6IFwiVVwiLFxuICAgIFwidVwiOiBcIlUnXCIsXG4gICAgXCJEXCI6IFwiRFwiLFxuICAgIFwiZFwiOiBcIkQnXCIsXG4gICAgXCJGXCI6IFwiRlwiLFxuICAgIFwiZlwiOiBcIkYnXCIsXG4gICAgXCJMXCI6IFwiTFwiLFxuICAgIFwibFwiOiBcIkwnXCIsXG4gICAgXCJSXCI6IFwiUlwiLFxuICAgIFwiclwiOiBcIlInXCIsXG4gICAgXCJCXCI6IFwiQlwiLFxuICAgIFwiYlwiOiBcIkInXCIsXG4gICAgXCJZXCI6IFwieVwiLFxuICAgIFwieVwiOiBcInknXCJcbn07XG5leHBvcnQgY29uc3QgZmFjZVRvQ29sb3IgPSB7XG4gICAgXCJVXCI6IFwieVwiLFxuICAgIFwiRlwiOiBcImJcIixcbiAgICBcIlJcIjogXCJyXCIsXG4gICAgXCJCXCI6IFwiZ1wiLFxuICAgIFwiRFwiOiBcIndcIixcbiAgICBcIkxcIjogXCJvXCJcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCB2YXIgRmFjZTtcbihmdW5jdGlvbiAoRmFjZSkge1xuICAgIEZhY2VbRmFjZVtcIkxcIl0gPSAwXSA9IFwiTFwiO1xuICAgIEZhY2VbRmFjZVtcIlJcIl0gPSAxXSA9IFwiUlwiO1xuICAgIEZhY2VbRmFjZVtcIkRcIl0gPSAyXSA9IFwiRFwiO1xuICAgIEZhY2VbRmFjZVtcIlVcIl0gPSAzXSA9IFwiVVwiO1xuICAgIEZhY2VbRmFjZVtcIkJcIl0gPSA0XSA9IFwiQlwiO1xuICAgIEZhY2VbRmFjZVtcIkZcIl0gPSA1XSA9IFwiRlwiO1xufSkoRmFjZSB8fCAoRmFjZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBUSFJFRS5CdWZmZXJHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgYm9yZGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IG8gPSBzaXplIC8gMjtcbiAgICAgICAgY29uc3QgaSA9IG8gLSBib3JkZXI7XG4gICAgICAgIGNvbnN0IF92ZXJ0cyA9IFtcbiAgICAgICAgICAgIC1pLCAraSwgK28sXG4gICAgICAgICAgICAraSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksIC1pLCArbyxcbiAgICAgICAgICAgIC1pLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgK28sIC1pLFxuICAgICAgICAgICAgK2ksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgK2ksXG4gICAgICAgICAgICAtaSwgK28sICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAtaSxcbiAgICAgICAgICAgIC1vLCAraSwgLWksXG4gICAgICAgICAgICAtbywgK2ksICtpLFxuICAgICAgICAgICAgLW8sIC1pLCAraSxcbiAgICAgICAgICAgICtpLCAraSwgLW8sXG4gICAgICAgICAgICAtaSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksIC1pLCAtbyxcbiAgICAgICAgICAgICtpLCAtaSwgLW8sXG4gICAgICAgICAgICAtaSwgLW8sICtpLFxuICAgICAgICAgICAgK2ksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgLWksXG4gICAgICAgICAgICAtaSwgLW8sIC1pLFxuICAgICAgICAgICAgK28sICtpLCAraSxcbiAgICAgICAgICAgICtvLCAraSwgLWksXG4gICAgICAgICAgICArbywgLWksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAraSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShfdmVydHMsIDMpKTtcbiAgICAgICAgdGhpcy5zZXRJbmRleChGcmFtZS5faW5kaWNlcyk7XG4gICAgICAgIHRoaXMuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcbiAgICB9XG59XG5GcmFtZS5faW5kaWNlcyA9IFtcbiAgICAwLCAyLCAxLFxuICAgIDAsIDMsIDIsXG4gICAgNCwgNiwgNSxcbiAgICA0LCA3LCA2LFxuICAgIDgsIDEwLCA5LFxuICAgIDgsIDExLCAxMCxcbiAgICAxMiwgMTQsIDEzLFxuICAgIDEyLCAxNSwgMTQsXG4gICAgMTYsIDE4LCAxNyxcbiAgICAxNiwgMTksIDE4LFxuICAgIDIwLCAyMiwgMjEsXG4gICAgMjAsIDIzLCAyMixcbiAgICAxLCA2LCA3LFxuICAgIDAsIDEsIDcsXG4gICAgMywgMCwgMTAsXG4gICAgMTEsIDMsIDEwLFxuICAgIDE3LCAyLCAzLFxuICAgIDE2LCAxNywgMyxcbiAgICAyMywgMjAsIDEsXG4gICAgMiwgMjMsIDEsXG4gICAgNSwgMTIsIDEzLFxuICAgIDQsIDUsIDEzLFxuICAgIDksIDEzLCAxNCxcbiAgICA4LCA5LCAxNCxcbiAgICAyMiwgMTUsIDEyLFxuICAgIDIxLCAyMiwgMTIsXG4gICAgMTksIDE0LCAxNSxcbiAgICAxOCwgMTksIDE1LFxuICAgIDcsIDQsIDksXG4gICAgMTAsIDcsIDksXG4gICAgMTEsIDgsIDE5LFxuICAgIDE2LCAxMSwgMTksXG4gICAgMjMsIDE3LCAxOCxcbiAgICAyMiwgMjMsIDE4LFxuICAgIDIwLCAyMSwgNSxcbiAgICA2LCAyMCwgNSxcbiAgICAyMCwgNiwgMSxcbiAgICAxMCwgMCwgNyxcbiAgICAyMSwgMTIsIDUsXG4gICAgMTMsIDksIDQsXG4gICAgMjMsIDIsIDE3LFxuICAgIDExLCAxNiwgMyxcbiAgICAyMiwgMTgsIDE1LFxuICAgIDgsIDE0LCAxOSxcbl07XG5leHBvcnQgY2xhc3MgU3RpY2tlciBleHRlbmRzIFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgZGVwdGgpIHtcbiAgICAgICAgc2l6ZSA9IHNpemUgLyAyO1xuICAgICAgICBjb25zdCBsZWZ0ID0gLXNpemU7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHNpemU7XG4gICAgICAgIGNvbnN0IHRvcCA9IC1zaXplO1xuICAgICAgICBjb25zdCByaWdodCA9IHNpemU7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHNpemUgLyA0O1xuICAgICAgICBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICAgICAgICBzaGFwZS5tb3ZlVG8obGVmdCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgYm90dG9tLCBsZWZ0ICsgcmFkaXVzLCBib3R0b20pO1xuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQgLSByYWRpdXMsIGJvdHRvbSk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8ocmlnaHQsIGJvdHRvbSwgcmlnaHQsIGJvdHRvbSAtIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhyaWdodCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUucXVhZHJhdGljQ3VydmVUbyhyaWdodCwgdG9wLCByaWdodCAtIHJhZGl1cywgdG9wKTtcbiAgICAgICAgc2hhcGUubGluZVRvKGxlZnQgKyByYWRpdXMsIHRvcCk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8obGVmdCwgdG9wLCBsZWZ0LCB0b3AgKyByYWRpdXMpO1xuICAgICAgICBzaGFwZS5jbG9zZVBhdGgoKTtcbiAgICAgICAgc3VwZXIoc2hhcGUsIHsgYmV2ZWxFbmFibGVkOiBmYWxzZSwgZGVwdGg6IGRlcHRoIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IEN1YmUgZnJvbSBcIi4vY3ViZVwiO1xuaW1wb3J0IHsgY3ViZWxldF9kZWZzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLnNjZW5lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2VuZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDY7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gNCArIE1hdGguUEkgLyAxNjtcbiAgICAgICAgdGhpcy5hbWJpZW50ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMC45KTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAwLjEpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsLnBvc2l0aW9uLnNldChjdWJlbGV0X2RlZnMuc2l6ZSwgY3ViZWxldF9kZWZzLnNpemUgKiAzLCBjdWJlbGV0X2RlZnMuc2l6ZSAqIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmRpcmVjdGlvbmFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodGhpcyk7XG4gICAgICAgIHRoaXMuY3ViZSA9IG5ldyBDdWJlKCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY3ViZSk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZSA9IDk7XG4gICAgfVxuICAgIHNldCBkaXJ0eSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmN1YmUuZGlydHkgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpcnR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlLmRpcnR5O1xuICAgIH1cbiAgICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xuICAgIH1cbiAgICB1cGRhdGVDYW1lcmEoKSB7XG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuaGVpZ2h0IC8gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gdGhpcy5zY2FsZSAvIHRoaXMucGVyc3BlY3RpdmU7XG4gICAgICAgIGNvbnN0IGZvdiA9ICgyICogTWF0aC5hdGFuKG1pbikgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDMgKiB0aGlzLnBlcnNwZWN0aXZlICogMC45O1xuICAgICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IGRpc3RhbmNlO1xuICAgICAgICB0aGlzLmNhbWVyYS5uZWFyID0gZGlzdGFuY2UgLSBjdWJlbGV0X2RlZnMuc2l6ZSAqIDM7XG4gICAgICAgIHRoaXMuY2FtZXJhLmZhciA9IGRpc3RhbmNlICsgY3ViZWxldF9kZWZzLnNpemUgKiA4O1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQobmV3IFZlY3RvcjMoMCwgMCwgMzApKTtcbiAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZXRpZnkgZnJvbSBcInZ1ZXRpZnlcIjtcbmltcG9ydCBcInZ1ZXRpZnkvZGlzdC92dWV0aWZ5Lm1pbi5jc3NcIjtcbmltcG9ydCBcIm1hdGVyaWFsLWRlc2lnbi1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3NcIjtcbmltcG9ydCBQbGF5Z3JvdW5kIGZyb20gXCIuL3Z1ZWFwcC9wbGF5Z3JvdW5kXCI7XG5WdWUudXNlKFZ1ZXRpZnkpO1xuY29uc3Qgb3B0cyA9IHt9O1xuY29uc3QgdnVldGlmeSA9IG5ldyBWdWV0aWZ5KG9wdHMpO1xuVnVlLnByb3RvdHlwZS52dWV0aWZ5ID0gdnVldGlmeTtcbmxldCBhcHAgPSBQbGF5Z3JvdW5kO1xuY29uc3Qgdm0gPSBuZXcgVnVlKHtcbiAgICB2dWV0aWZ5LFxuICAgIGVsOiBcIiNhcHBcIixcbiAgICByZW5kZXI6IChoKSA9PiBoKGFwcCksXG59KTtcbiIsImltcG9ydCB7IF9fZGVjb3JhdGUsIF9fbWV0YWRhdGEgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBQcm92aWRlLCBSZWYsIFdhdGNoIH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCBWaWV3cG9ydCBmcm9tIFwiLi4vdmlld3BvcnRcIjtcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vY3ViZS93b3JsZFwiO1xuaW1wb3J0IFNldHRpbmcgZnJvbSBcIi4uL3NldHRpbmdcIjtcbmltcG9ydCB7IGN1YmVfY29uZmlnLCBmYWNlVG9Db2xvciwgbGJsT3JkZXJNYXBwaW5nLCBzdHJpbmdUb1R3aXN0UGFyYW1zIH0gZnJvbSBcIi4uLy4uL2N1YmUvdXRpbHNcIjtcbmltcG9ydCB7IFR3aXN0LCB0d2lzdGVyIH0gZnJvbSBcIi4uLy4uL2N1YmUvdHdpc3RlclwiO1xuaW1wb3J0IEludGVyYWN0b3IgZnJvbSBcIi4uLy4uL2N1YmUvaW50ZXJhY3RvclwiO1xuaW1wb3J0IENhcHR1cmVyIGZyb20gXCIuLi8uLi9jdWJlL2NhcHR1cmVcIjtcbmltcG9ydCBzb2x2ZVdpdGhMQkwgZnJvbSBcIi4vbGJsXCI7XG5sZXQgUGxheWdyb3VuZCA9IGNsYXNzIFBsYXlncm91bmQgZXh0ZW5kcyBWdWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndvcmxkID0gbmV3IFdvcmxkKCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuc29sdXRpb24gPSBbXTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJNb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMua2V5ID0gMDtcbiAgICAgICAgdGhpcy5pbml0U3RhdGUgPSBbXTtcbiAgICAgICAgdGhpcy5jdWJlanNDdWJlID0gcmVxdWlyZSgnY3ViZWpzJyk7XG4gICAgICAgIHRoaXMuZWxhcHNlZGZyYW1lcyA9IDA7XG4gICAgICAgIHRoaXMubGlzdGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYXB0dXJlciA9IG5ldyBDYXB0dXJlcigpO1xuICAgICAgICB0aGlzLmRlbW9EYXRhID0gcmVxdWlyZSgnLi9kZW1vcy5qc29uJyk7XG4gICAgICAgIHRoaXMuZGVtb0ltYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLmRlbW9HcmlkV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmRlbW9CYWNrdXBTdGF0ZSA9IFtdO1xuICAgICAgICB0aGlzLmlzRGVtb01vZGUgPSBmYWxzZTtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5jdWJlanNDdWJlLmluaXRTb2x2ZXIoKTtcbiAgICAgICAgdGhpcy5pbnRlcmFjdG9yID0gbmV3IEludGVyYWN0b3IoW1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5jYW52YXNFbGVtLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3AtZmxleFwiKSxcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90dG9tLWZsZXhcIilcbiAgICAgICAgXSwgdGhpcy53b3JsZC5jb250cm9sbGVyLmludGVyYWN0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRlbW9EYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRlbW9JbWFnZXMucHVzaCh0aGlzLmNhcHR1cmVyLmdlbmVyYXRlKHRoaXMuZGVtb0RhdGFbaV0uc3RhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRuZXh0VGljayh0aGlzLnJlc2l6ZSk7XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnZpZXdwb3J0LmRyYXcoKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgIH1cbiAgICByZXNpemUoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy5zaXplID0gTWF0aC5jZWlsKE1hdGgubWluKHRoaXMud2lkdGggLyA2LCB0aGlzLmhlaWdodCAvIDEyKSk7XG4gICAgICAgIHRoaXMuZGVtb0dyaWRXaWR0aCA9IH5+KE1hdGgubWluKHRoaXMuc2l6ZSAqIDIsIHRoaXMud2lkdGggLyA0KSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIHRoaXMudmlld3BvcnQucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0IC0gdGhpcy5zaXplICogMy41KTtcbiAgICAgICAgdGhpcy53b3JsZC5jdWJlLmRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgc2NyYW1ibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy53b3JsZC5jdWJlLnNjcmFtYmxlKCk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzZXQoKTtcbiAgICB9XG4gICAgaWRsZSh2YWx1ZSkge1xuICAgICAgICB0d2lzdGVyLnR3aXN0cy5wdXNoKG5ldyBUd2lzdCgwLCBNYXRoLlBJLCBjdWJlX2NvbmZpZy5mcmFtZXMgKiB2YWx1ZSwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModmFsdWUgLSBNYXRoLlBJKSA8IDFlLTY7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgc29sdmUoKSB7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0U3RhdGUgPSB0aGlzLndvcmxkLmN1YmUuc2VyaWFsaXplKCk7XG4gICAgICAgIGNvbnN0IHNvbHZlcklkID0gY3ViZV9jb25maWcuc29sdmVySWQ7XG4gICAgICAgIGlmIChzb2x2ZXJJZCA9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBsYmxTdGF0ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmYWNlU3RhdGUgb2YgdGhpcy5pbml0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBsYmxTdGF0ZS5wdXNoKGZhY2VUb0NvbG9yW2ZhY2VTdGF0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGJsU29sdXRpb24gPSBzb2x2ZVdpdGhMQkwobGJsU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsYmxQaGFzZSBvZiBsYmxTb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxibE9yZGVycyA9IGxibFBoYXNlLnNwbGl0KFwiXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIGxibE9yZGVycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gbGJsT3JkZXJNYXBwaW5nW29yZGVyXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29sdXRpb24ucHVzaChzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzb2x2ZXJJZCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbiA9IHRoaXMuY3ViZWpzQ3ViZVxuICAgICAgICAgICAgICAgIC5mcm9tU3RyaW5nKHRoaXMuaW5pdFN0YXRlKVxuICAgICAgICAgICAgICAgIC5zb2x2ZSgpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJykuXG4gICAgICAgICAgICAgICAgZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29sdXRpb24ucHVzaChcIn5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdFN0YXRlLmpvaW4oXCJcIikpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvbHV0aW9uLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcbiAgICAgICAgdGhpcy5pZGxlKDAuNSk7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgb25QbGF5ZXJNb2RlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLndvcmxkLmNvbnRyb2xsZXIubG9jayA9IHRoaXMuaXNQbGF5ZXJNb2RlO1xuICAgIH1cbiAgICBvblBsYXlpbmdDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMud29ybGQuY29udHJvbGxlci5kaXNhYmxlID0gdGhpcy5pc1BsYXlpbmc7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5pc1BsYXllck1vZGUgJiYgdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzID09IHRoaXMuc29sdXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzIDwgdGhpcy5zb2x1dGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXR3aXN0ZXIuaXNUd2lzdGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHN0cmluZ1RvVHdpc3RQYXJhbXNbdGhpcy5zb2x1dGlvblt0aGlzLnByb2dyZXNzXV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgcGFyYW1zLmxheWVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1twYXJhbXMuYXhpc11bbGF5ZXJdLnR3aXN0KHBhcmFtcy5hbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZGZyYW1lcyA8IGN1YmVfY29uZmlnLmZyYW1lcykge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkZnJhbWVzKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPT0gdGhpcy5zb2x1dGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgICB0aGlzLmlkbGUoMS41KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgfVxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBxdWl0KCkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc0RlbW9Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmlzRGVtb01vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud29ybGQuY3ViZS5yZXN0b3JlKHRoaXMuZGVtb0JhY2t1cFN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRQcm9ncmVzcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzdG9yZSh0aGlzLmluaXRTdGF0ZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gc3RyaW5nVG9Ud2lzdFBhcmFtc1t0aGlzLnNvbHV0aW9uW2ldXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgcGFyYW1zLmxheWVycykge1xuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbcGFyYW1zLmF4aXNdW2xheWVyXS50d2lzdChwYXJhbXMuYW5nbGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ3JlZW5CdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXllck1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NyYW1ibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJsdWVCdXR0b24oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXllck1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWRCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWRmcmFtZXMgPCBjdWJlX2NvbmZpZy5mcmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnF1aXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsYXBzZWRmcmFtZXMgPSAwO1xuICAgIH1cbiAgICBzZWxlY3REZW1vKGlkeCkge1xuICAgICAgICB0aGlzLmxpc3RkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5pc0RlbW9Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmRlbW9CYWNrdXBTdGF0ZSA9IHRoaXMud29ybGQuY3ViZS5zZXJpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRGVtb01vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVtb05hbWUgPSB0aGlzLmRlbW9EYXRhW2lkeF0ubmFtZTtcbiAgICAgICAgdGhpcy5pbml0U3RhdGUgPSB0aGlzLmRlbW9EYXRhW2lkeF0uc3RhdGUuc3BsaXQoXCJcIik7XG4gICAgICAgIHRoaXMuc29sdXRpb24gPSB0aGlzLmRlbW9EYXRhW2lkeF0uc29sdXRpb24uc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIHRoaXMuc29sdXRpb24ucHVzaChcIn5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdFN0YXRlLmpvaW4oXCJcIikpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvbHV0aW9uLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgUHJvdmlkZShcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwidmlld3BvcnRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwidmlld3BvcnRcIiwgdm9pZCAwKTtcbl9fZGVjb3JhdGUoW1xuICAgIFdhdGNoKFwiaXNQbGF5ZXJNb2RlXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBGdW5jdGlvbiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnJldHVybnR5cGVcIiwgdm9pZCAwKVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwib25QbGF5ZXJNb2RlQ2hhbmdlXCIsIG51bGwpO1xuX19kZWNvcmF0ZShbXG4gICAgV2F0Y2goXCJpc1BsYXlpbmdcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJvblBsYXlpbmdDaGFuZ2VcIiwgbnVsbCk7XG5QbGF5Z3JvdW5kID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIHZpZXdwb3J0OiBWaWV3cG9ydCxcbiAgICAgICAgICAgIHNldHRpbmc6IFNldHRpbmcsXG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiaW1wb3J0IHsgX19kZWNvcmF0ZSwgX19tZXRhZGF0YSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuaW1wb3J0IHsgY3ViZV9jb25maWcgfSBmcm9tIFwiLi4vLi4vY3ViZS91dGlsc1wiO1xuaW1wb3J0IFZ1ZVNsaWRlciBmcm9tICd2dWUtc2xpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgJ3Z1ZS1zbGlkZXItY29tcG9uZW50L3RoZW1lL2RlZmF1bHQuY3NzJztcbmxldCBTZXR0aW5nID0gY2xhc3MgU2V0dGluZyBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9XG4gICAgcmVzaXplKCkge1xuICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGguY2VpbChNYXRoLm1pbih0aGlzLndpZHRoIC8gNiwgdGhpcy5oZWlnaHQgLyAxMikpO1xuICAgIH1cbiAgICBnZXQgc2Vuc2liaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSAqIDFlNDtcbiAgICB9XG4gICAgc2V0IHNlbnNpYmlsaXR5KHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLnNlbnNpYmlsaXR5ID0gdmFsdWUgKiAxZS00O1xuICAgIH1cbiAgICBnZXQgZnJhbWVzKCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuZnJhbWVzO1xuICAgIH1cbiAgICBzZXQgZnJhbWVzKHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLmZyYW1lcyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgc2NyYW1ibGVfc3RlcHMoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zY3JhbWJsZV9zdGVwcztcbiAgICB9XG4gICAgc2V0IHNjcmFtYmxlX3N0ZXBzKHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLnNjcmFtYmxlX3N0ZXBzID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBzb2x2ZXJfaWQoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zb2x2ZXJJZDtcbiAgICB9XG4gICAgc2V0IHNvbHZlcl9pZCh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zb2x2ZXJJZCA9IHZhbHVlO1xuICAgIH1cbn07XG5TZXR0aW5nID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFZ1ZVNsaWRlclxuICAgICAgICB9XG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgU2V0dGluZyk7XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xuIiwiaW1wb3J0IHsgX19kZWNvcmF0ZSwgX19tZXRhZGF0YSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgUmVmIH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi8uLi9jdWJlL3dvcmxkXCI7XG5sZXQgVmlld3BvcnQgPSBjbGFzcyBWaWV3cG9ydCBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhc0VsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXNFbGVtLnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgICAgICAgIGNhbnZhczogY2FudmFzRWxlbSxcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgICAgIGFscGhhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIHRoaXMuY2FudmFzRWxlbSA9IGNhbnZhc0VsZW07XG4gICAgfVxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud29ybGQucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCwgdHJ1ZSk7XG4gICAgfVxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcmxkLmRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLndvcmxkLnNjZW5lLCB0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICB0aGlzLndvcmxkLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgSW5qZWN0KFwid29ybGRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFdvcmxkKVxuXSwgVmlld3BvcnQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICBSZWYoXCJjYW52YXNcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEhUTUxFbGVtZW50KVxuXSwgVmlld3BvcnQucHJvdG90eXBlLCBcImNhbnZhc1wiLCB2b2lkIDApO1xuVmlld3BvcnQgPSBfX2RlY29yYXRlKFtcbiAgICBDb21wb25lbnQoe1xuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaW5kZXguaHRtbFwiKSxcbiAgICAgICAgY29tcG9uZW50czoge30sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgVmlld3BvcnQpO1xuZXhwb3J0IGRlZmF1bHQgVmlld3BvcnQ7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb2x2ZVdpdGhMQkwoc3RhdGUpIHtcblxuICAgIHZhciBjdWJlU3RhdGUgPSB7fTtcblxuICAgIHZhciBuZXh0Q29sb3IgPSB7fTtcbiAgICB2YXIgbmV4dEZhY2UgPSB7IGw6IFwiZlwiLCBmOiBcInJcIiwgcjogXCJiXCIsIGI6IFwibFwiIH07XG4gICAgdmFyIHByZXZGYWNlID0geyBsOiBcImJcIiwgYjogXCJyXCIsIHI6IFwiZlwiLCBmOiBcImxcIiB9O1xuXG4gICAgLypcbiAgICAgICAgdmFyIHN0ZXBOYW1lID0ge1xuICAgICAgICAgICAgMDogXCJGaXJzdCBsYXllciBlZGdlc1wiLFxuICAgICAgICAgICAgMTogXCJGaXJzdCBsYXllciBjb3JuZXJzXCIsXG4gICAgICAgICAgICAyOiBcIlNlY29uZCBsYXllclwiLFxuICAgICAgICAgICAgMzogXCJUb3AgY3Jvc3NcIixcbiAgICAgICAgICAgIDQ6IFwiVGhpcmQgbGF5ZXIgY29ybmVycyAocG9zKVwiLFxuICAgICAgICAgICAgNTogXCJUaGlyZCBsYXllciBjb3JuZXJzIChvcmkpXCIsXG4gICAgICAgICAgICA2OiBcIlRoaXJkIGxheWVyIGVkZ2VzXCJcbiAgICAgICAgfTtcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0Q3ViZVN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGN1YmVTdGF0ZSA9IHtcbiAgICAgICAgICAgIGI6IHN0YXRlWzQ5XSxcbiAgICAgICAgICAgIGJsOiBzdGF0ZVs1MF0uY29uY2F0KHN0YXRlWzM5XSksXG4gICAgICAgICAgICBkOiBzdGF0ZVszMV0sXG4gICAgICAgICAgICBkYjogc3RhdGVbMzRdLmNvbmNhdChzdGF0ZVs1Ml0pLFxuICAgICAgICAgICAgZGJsOiBzdGF0ZVszM10uY29uY2F0KHN0YXRlWzUzXSkuY29uY2F0KHN0YXRlWzQyXSksXG4gICAgICAgICAgICBkZjogc3RhdGVbMjhdLmNvbmNhdChzdGF0ZVsyNV0pLFxuICAgICAgICAgICAgZGZyOiBzdGF0ZVsyOV0uY29uY2F0KHN0YXRlWzI2XSkuY29uY2F0KHN0YXRlWzE1XSksXG4gICAgICAgICAgICBkbDogc3RhdGVbMzBdLmNvbmNhdChzdGF0ZVs0M10pLFxuICAgICAgICAgICAgZGxmOiBzdGF0ZVsyN10uY29uY2F0KHN0YXRlWzQ0XSkuY29uY2F0KHN0YXRlWzI0XSksXG4gICAgICAgICAgICBkcjogc3RhdGVbMzJdLmNvbmNhdChzdGF0ZVsxNl0pLFxuICAgICAgICAgICAgZHJiOiBzdGF0ZVszNV0uY29uY2F0KHN0YXRlWzE3XSkuY29uY2F0KHN0YXRlWzUxXSksXG4gICAgICAgICAgICBmOiBzdGF0ZVsyMl0sXG4gICAgICAgICAgICBmcjogc3RhdGVbMjNdLmNvbmNhdChzdGF0ZVsxMl0pLFxuICAgICAgICAgICAgbDogc3RhdGVbNDBdLFxuICAgICAgICAgICAgbGY6IHN0YXRlWzQxXS5jb25jYXQoc3RhdGVbMjFdKSxcbiAgICAgICAgICAgIHI6IHN0YXRlWzEzXSxcbiAgICAgICAgICAgIHJiOiBzdGF0ZVsxNF0uY29uY2F0KHN0YXRlWzQ4XSksXG4gICAgICAgICAgICB1OiBzdGF0ZVs0XSxcbiAgICAgICAgICAgIHViOiBzdGF0ZVsxXS5jb25jYXQoc3RhdGVbNDZdKSxcbiAgICAgICAgICAgIHVibDogc3RhdGVbMF0uY29uY2F0KHN0YXRlWzQ3XSkuY29uY2F0KHN0YXRlWzM2XSksXG4gICAgICAgICAgICB1Zjogc3RhdGVbN10uY29uY2F0KHN0YXRlWzE5XSksXG4gICAgICAgICAgICB1ZnI6IHN0YXRlWzhdLmNvbmNhdChzdGF0ZVsyMF0pLmNvbmNhdChzdGF0ZVs5XSksXG4gICAgICAgICAgICB1bDogc3RhdGVbM10uY29uY2F0KHN0YXRlWzM3XSksXG4gICAgICAgICAgICB1bGY6IHN0YXRlWzZdLmNvbmNhdChzdGF0ZVszOF0pLmNvbmNhdChzdGF0ZVsxOF0pLFxuICAgICAgICAgICAgdXI6IHN0YXRlWzVdLmNvbmNhdChzdGF0ZVsxMF0pLFxuICAgICAgICAgICAgdXJiOiBzdGF0ZVsyXS5jb25jYXQoc3RhdGVbMTFdKS5jb25jYXQoc3RhdGVbNDVdKSxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb2xvcl9sID0gY3ViZVN0YXRlW1wibFwiXSwgY29sb3JfciA9IGN1YmVTdGF0ZVtcInJcIl0sXG4gICAgICAgICAgICBjb2xvcl9mID0gY3ViZVN0YXRlW1wiZlwiXSwgY29sb3JfYiA9IGN1YmVTdGF0ZVtcImJcIl07XG4gICAgICAgIG5leHRDb2xvcltjb2xvcl9sXSA9IGNvbG9yX2Y7XG4gICAgICAgIG5leHRDb2xvcltjb2xvcl9mXSA9IGNvbG9yX3I7XG4gICAgICAgIG5leHRDb2xvcltjb2xvcl9yXSA9IGNvbG9yX2I7XG4gICAgICAgIG5leHRDb2xvcltjb2xvcl9iXSA9IGNvbG9yX2w7XG5cbiAgICAgICAgY29uc29sZS5sb2coY3ViZVN0YXRlKTtcbiAgICAgICAgY29uc29sZS5sb2cobmV4dENvbG9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBUd2lzdF9CKCkge1xuXG4gICAgICAgIHZhciB0bXAgPSBjdWJlU3RhdGUudWI7XG4gICAgICAgIGN1YmVTdGF0ZS51YiA9IGN1YmVTdGF0ZS5yYjtcbiAgICAgICAgY3ViZVN0YXRlLnJiID0gY3ViZVN0YXRlLmRiO1xuICAgICAgICBjdWJlU3RhdGUuZGIgPSBjdWJlU3RhdGUuYmxbMV0gKyBjdWJlU3RhdGUuYmxbMF07XG4gICAgICAgIGN1YmVTdGF0ZS5ibCA9IHRtcFsxXSArIHRtcFswXTtcblxuXG4gICAgICAgIHRtcCA9IGN1YmVTdGF0ZS51Ymw7XG4gICAgICAgIGN1YmVTdGF0ZS51YmwgPSBjdWJlU3RhdGUudXJiWzFdICsgY3ViZVN0YXRlLnVyYlsyXSArIGN1YmVTdGF0ZS51cmJbMF07XG4gICAgICAgIGN1YmVTdGF0ZS51cmIgPSBjdWJlU3RhdGUuZHJiWzFdICsgY3ViZVN0YXRlLmRyYlswXSArIGN1YmVTdGF0ZS5kcmJbMl07XG4gICAgICAgIGN1YmVTdGF0ZS5kcmIgPSBjdWJlU3RhdGUuZGJsWzJdICsgY3ViZVN0YXRlLmRibFswXSArIGN1YmVTdGF0ZS5kYmxbMV07XG4gICAgICAgIGN1YmVTdGF0ZS5kYmwgPSB0bXBbMl0gKyB0bXBbMV0gKyB0bXBbMF07XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBUd2lzdF9SKCkge1xuXG4gICAgICAgIHZhciB0bXAgPSBjdWJlU3RhdGUudXI7XG4gICAgICAgIGN1YmVTdGF0ZS51ciA9IGN1YmVTdGF0ZS5mcjtcbiAgICAgICAgY3ViZVN0YXRlLmZyID0gY3ViZVN0YXRlLmRyO1xuICAgICAgICBjdWJlU3RhdGUuZHIgPSBjdWJlU3RhdGUucmJbMV0gKyBjdWJlU3RhdGUucmJbMF07XG4gICAgICAgIGN1YmVTdGF0ZS5yYiA9IHRtcFsxXSArIHRtcFswXTtcblxuICAgICAgICB0bXAgPSBjdWJlU3RhdGUudXJiO1xuICAgICAgICBjdWJlU3RhdGUudXJiID0gY3ViZVN0YXRlLnVmclsxXSArIGN1YmVTdGF0ZS51ZnJbMl0gKyBjdWJlU3RhdGUudWZyWzBdO1xuICAgICAgICBjdWJlU3RhdGUudWZyID0gY3ViZVN0YXRlLmRmclsxXSArIGN1YmVTdGF0ZS5kZnJbMF0gKyBjdWJlU3RhdGUuZGZyWzJdO1xuICAgICAgICBjdWJlU3RhdGUuZGZyID0gY3ViZVN0YXRlLmRyYlsyXSArIGN1YmVTdGF0ZS5kcmJbMF0gKyBjdWJlU3RhdGUuZHJiWzFdO1xuICAgICAgICBjdWJlU3RhdGUuZHJiID0gdG1wWzJdICsgdG1wWzFdICsgdG1wWzBdO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBUd2lzdF9GKCkge1xuXG4gICAgICAgIHZhciB0bXAgPSBjdWJlU3RhdGUudWY7XG4gICAgICAgIGN1YmVTdGF0ZS51ZiA9IGN1YmVTdGF0ZS5sZjtcbiAgICAgICAgY3ViZVN0YXRlLmxmID0gY3ViZVN0YXRlLmRmO1xuICAgICAgICBjdWJlU3RhdGUuZGYgPSBjdWJlU3RhdGUuZnJbMV0gKyBjdWJlU3RhdGUuZnJbMF07XG4gICAgICAgIGN1YmVTdGF0ZS5mciA9IHRtcFsxXSArIHRtcFswXTtcblxuXG4gICAgICAgIHRtcCA9IGN1YmVTdGF0ZS51ZnI7XG4gICAgICAgIGN1YmVTdGF0ZS51ZnIgPSBjdWJlU3RhdGUudWxmWzFdICsgY3ViZVN0YXRlLnVsZlsyXSArIGN1YmVTdGF0ZS51bGZbMF07XG4gICAgICAgIGN1YmVTdGF0ZS51bGYgPSBjdWJlU3RhdGUuZGxmWzFdICsgY3ViZVN0YXRlLmRsZlswXSArIGN1YmVTdGF0ZS5kbGZbMl07XG4gICAgICAgIGN1YmVTdGF0ZS5kbGYgPSBjdWJlU3RhdGUuZGZyWzJdICsgY3ViZVN0YXRlLmRmclswXSArIGN1YmVTdGF0ZS5kZnJbMV07XG4gICAgICAgIGN1YmVTdGF0ZS5kZnIgPSB0bXBbMl0gKyB0bXBbMV0gKyB0bXBbMF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gVHdpc3RfTCgpIHtcblxuICAgICAgICB2YXIgdG1wID0gY3ViZVN0YXRlLnVsO1xuICAgICAgICBjdWJlU3RhdGUudWwgPSBjdWJlU3RhdGUuYmw7XG4gICAgICAgIGN1YmVTdGF0ZS5ibCA9IGN1YmVTdGF0ZS5kbDtcbiAgICAgICAgY3ViZVN0YXRlLmRsID0gY3ViZVN0YXRlLmxmWzFdICsgY3ViZVN0YXRlLmxmWzBdO1xuICAgICAgICBjdWJlU3RhdGUubGYgPSB0bXBbMV0gKyB0bXBbMF07XG5cblxuICAgICAgICB0bXAgPSBjdWJlU3RhdGUudWxmO1xuICAgICAgICBjdWJlU3RhdGUudWxmID0gY3ViZVN0YXRlLnVibFsxXSArIGN1YmVTdGF0ZS51YmxbMl0gKyBjdWJlU3RhdGUudWJsWzBdO1xuICAgICAgICBjdWJlU3RhdGUudWJsID0gY3ViZVN0YXRlLmRibFsxXSArIGN1YmVTdGF0ZS5kYmxbMF0gKyBjdWJlU3RhdGUuZGJsWzJdO1xuICAgICAgICBjdWJlU3RhdGUuZGJsID0gY3ViZVN0YXRlLmRsZlsyXSArIGN1YmVTdGF0ZS5kbGZbMF0gKyBjdWJlU3RhdGUuZGxmWzFdO1xuICAgICAgICBjdWJlU3RhdGUuZGxmID0gdG1wWzJdICsgdG1wWzFdICsgdG1wWzBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFR3aXN0X1UoKSB7XG5cbiAgICAgICAgdmFyIHRtcCA9IGN1YmVTdGF0ZS51bDtcbiAgICAgICAgY3ViZVN0YXRlLnVsID0gY3ViZVN0YXRlLnVmO1xuICAgICAgICBjdWJlU3RhdGUudWYgPSBjdWJlU3RhdGUudXI7XG4gICAgICAgIGN1YmVTdGF0ZS51ciA9IGN1YmVTdGF0ZS51YjtcbiAgICAgICAgY3ViZVN0YXRlLnViID0gdG1wO1xuXG5cbiAgICAgICAgdG1wID0gY3ViZVN0YXRlLnVsZjtcbiAgICAgICAgY3ViZVN0YXRlLnVsZiA9IGN1YmVTdGF0ZS51ZnI7XG4gICAgICAgIGN1YmVTdGF0ZS51ZnIgPSBjdWJlU3RhdGUudXJiO1xuICAgICAgICBjdWJlU3RhdGUudXJiID0gY3ViZVN0YXRlLnVibDtcbiAgICAgICAgY3ViZVN0YXRlLnVibCA9IHRtcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBUd2lzdF9EKCkge1xuXG4gICAgICAgIHZhciB0bXAgPSBjdWJlU3RhdGUuZGw7XG4gICAgICAgIGN1YmVTdGF0ZS5kbCA9IGN1YmVTdGF0ZS5kYjtcbiAgICAgICAgY3ViZVN0YXRlLmRiID0gY3ViZVN0YXRlLmRyO1xuICAgICAgICBjdWJlU3RhdGUuZHIgPSBjdWJlU3RhdGUuZGY7XG4gICAgICAgIGN1YmVTdGF0ZS5kZiA9IHRtcDtcblxuXG4gICAgICAgIHRtcCA9IGN1YmVTdGF0ZS5kbGY7XG4gICAgICAgIGN1YmVTdGF0ZS5kbGYgPSBjdWJlU3RhdGUuZGJsO1xuICAgICAgICBjdWJlU3RhdGUuZGJsID0gY3ViZVN0YXRlLmRyYjtcbiAgICAgICAgY3ViZVN0YXRlLmRyYiA9IGN1YmVTdGF0ZS5kZnI7XG4gICAgICAgIGN1YmVTdGF0ZS5kZnIgPSB0bXA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gVHdpc3RfWSgpIHtcblxuICAgICAgICBUd2lzdF9VKCk7XG5cbiAgICAgICAgbGV0IHRtcCA9IGN1YmVTdGF0ZS5sZjtcbiAgICAgICAgY3ViZVN0YXRlLmxmID0gY3ViZVN0YXRlLmZyO1xuICAgICAgICBjdWJlU3RhdGUuZnIgPSBjdWJlU3RhdGUucmI7XG4gICAgICAgIGN1YmVTdGF0ZS5yYiA9IGN1YmVTdGF0ZS5ibDtcbiAgICAgICAgY3ViZVN0YXRlLmJsID0gdG1wO1xuXG4gICAgICAgIHRtcCA9IGN1YmVTdGF0ZS5mO1xuICAgICAgICBjdWJlU3RhdGUuZiA9IGN1YmVTdGF0ZS5yO1xuICAgICAgICBjdWJlU3RhdGUuciA9IGN1YmVTdGF0ZS5iO1xuICAgICAgICBjdWJlU3RhdGUuYiA9IGN1YmVTdGF0ZS5sO1xuICAgICAgICBjdWJlU3RhdGUubCA9IHRtcDtcblxuXG4gICAgICAgIFR3aXN0X0QoKSwgVHdpc3RfRCgpLCBUd2lzdF9EKCk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTdGF0ZShvcmRlcl9saXN0KSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJfbGlzdCkge1xuICAgICAgICAgICAgc3dpdGNoIChvcmRlcikge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgICAgIFR3aXN0X0QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRcIjogXHQvL1xuICAgICAgICAgICAgICAgICAgICBUd2lzdF9EKCk7IFR3aXN0X0QoKTsgVHdpc3RfRCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiVVwiOlxuICAgICAgICAgICAgICAgICAgICBUd2lzdF9VKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgICAgICAgICAgIFR3aXN0X1UoKTsgVHdpc3RfVSgpOyBUd2lzdF9VKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgICAgICAgICAgIFR3aXN0X0woKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxcIjpcbiAgICAgICAgICAgICAgICAgICAgVHdpc3RfTCgpOyBUd2lzdF9MKCk7IFR3aXN0X0woKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkZcIjpcbiAgICAgICAgICAgICAgICAgICAgVHdpc3RfRigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZlwiOlxuICAgICAgICAgICAgICAgICAgICBUd2lzdF9GKCk7IFR3aXN0X0YoKTsgVHdpc3RfRigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiUlwiOlxuICAgICAgICAgICAgICAgICAgICBUd2lzdF9SKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyXCI6XG4gICAgICAgICAgICAgICAgICAgIFR3aXN0X1IoKTsgVHdpc3RfUigpOyBUd2lzdF9SKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJCXCI6XG4gICAgICAgICAgICAgICAgICAgIFR3aXN0X0IoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgICAgICAgICAgICAgVHdpc3RfQigpOyBUd2lzdF9CKCk7IFR3aXN0X0IoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIllcIjpcbiAgICAgICAgICAgICAgICAgICAgVHdpc3RfWSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgICAgICBUd2lzdF9ZKCk7IFR3aXN0X1koKTsgVHdpc3RfWSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0QmxvY2tQb3MoYmxvY2spIHtcbiAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChcIltcIiArIGJsb2NrICsgXCJde1wiICsgYmxvY2subGVuZ3RoICsgXCJ9XCIpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHJlZylcbiAgICAgICAgZm9yIChsZXQgayBpbiBjdWJlU3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChjdWJlU3RhdGVba10ubWF0Y2gocmVnKSkgcmV0dXJuIHsgazogaywgdjogY3ViZVN0YXRlW2tdIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBGSVJTVF9MQVlFUl9FREdFU19TSU5HTEUoYmxvY2tfcG9zLCBibG9ja19jb2xvcikge1xuICAgICAgICB2YXIgZXhwID0gXCJcIiwgZXhwX2xvZyA9IFwiXCIsIHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBzID0gZ2V0QmxvY2tQb3MoYmxvY2tfY29sb3IpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzKVxuICAgICAgICAgICAgaWYgKHMuay5pbmRleE9mKFwiZFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChzLnZbMF0gPT0gYmxvY2tfY29sb3JbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuayA9PSBibG9ja19wb3MpIHJldHVybiBleHBfbG9nO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGV4cCA9IHMua1sxXS50b1VwcGVyQ2FzZSgpICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzLmsuaW5kZXhPZihcInVcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5rWzFdID09IGJsb2NrX3Bvc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy52WzBdID09IGJsb2NrX2NvbG9yWzBdKSBleHAgPSBzLmtbMV0udG9VcHBlckNhc2UoKSArIHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjdWJlU3RhdGVbYmxvY2tfcG9zWzBdICsgbmV4dEZhY2Vbcy5rWzFdXV0gIT0gY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXV0gKyBjdWJlU3RhdGVbbmV4dEZhY2Vbcy5rWzFdXV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBcInVcIiArIG5leHRGYWNlW3Mua1sxXV0gKyBzLmtbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBleHAgPSBcInVcIiArIG5leHRGYWNlW3Mua1sxXV0gKyBzLmtbMV0udG9VcHBlckNhc2UoKSArIG5leHRGYWNlW3Mua1sxXV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBleHAgPSBcIlVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzLnZbMF0gPT0gYmxvY2tfY29sb3JbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMua1sxXSA9PSBibG9ja19wb3NbMV0pIGV4cCA9IHMua1sxXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXSArIHMua1sxXV0gIT0gY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXV0gKyBjdWJlU3RhdGVbcy5rWzFdXSkgZXhwID0gcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gcy5rWzFdLnRvVXBwZXJDYXNlKCkgKyBcIlVcIiArIHMua1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmtbMF0gPT0gYmxvY2tfcG9zWzFdKSBleHAgPSBzLmtbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXSArIHMua1swXV0gIT0gY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXV0gKyBjdWJlU3RhdGVbcy5rWzBdXSkgZXhwID0gcy5rWzBdO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGV4cCA9IHMua1swXSArIFwiVVwiICsgcy5rWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwX2xvZyArPSBleHA7XG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZShleHApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlyc3QgTGF5ZXIgQ3Jvc3MgU2luZ2xlIEVycm9yOiBcIiwgZXhwX2xvZyk7XG4gICAgICAgIHJldHVybiBcIkZpcnN0IExheWVyIENyb3NzIFNpbmdsZSBFcnJvcjogXCIgKyBleHBfbG9nO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoYmxvY2tfcG9zLCBibG9ja19jb2xvcikge1xuICAgICAgICB2YXIgZXhwID0gXCJcIiwgZXhwX2xvZyA9IFwiXCIsIHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgcyA9IGdldEJsb2NrUG9zKGJsb2NrX2NvbG9yKTtcbiAgICAgICAgICAgIGlmIChzLmsuaW5kZXhPZihcImRcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAocy52WzBdID09IGN1YmVTdGF0ZVtcImRcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuayA9PSBibG9ja19wb3MpIHJldHVybiBleHBfbG9nO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGV4cCA9IHMua1sxXSArIFwiVVwiICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMudlsxXSA9PSBjdWJlU3RhdGVbXCJkXCJdKSBleHAgPSBzLmtbMV0gKyBcInVcIiArIHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gcy5rWzJdLnRvVXBwZXJDYXNlKCkgKyBcIlVcIiArIHMua1syXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHMuayA9PSBcInVcIiArIGJsb2NrX3Bvc1sxXSArIGJsb2NrX3Bvc1syXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy52WzBdID09IGN1YmVTdGF0ZVtcImRcIl0pIGV4cCA9IHMua1syXS50b1VwcGVyQ2FzZSgpICsgXCJ1XCIgKyBzLmtbMl07XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMudlsxXSA9PSBjdWJlU3RhdGVbXCJkXCJdKSBleHAgPSBzLmtbMV0gKyBcInVcIiArIHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGV4cCA9IHMua1syXS50b1VwcGVyQ2FzZSgpICsgXCJVXCIgKyBzLmtbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gXCJVXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBfbG9nICs9IGV4cDtcbiAgICAgICAgICAgIGNoYW5nZVN0YXRlKGV4cCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJGaXJzdCBMYXllciBDb3JuZXJzIFNpbmdsZSBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJGaXJzdCBMYXllciBDb3JuZXJzIFNpbmdsZSBFcnJvcjogXCIgKyBleHBfbG9nO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBTRUNPTkRfTEFZRVJfU0lOR0xFKGJsb2NrX3BvcywgYmxvY2tfY29sb3IpIHtcbiAgICAgICAgdmFyIGV4cCA9IFwiXCIsIGV4cF9sb2cgPSBcIlwiLCBzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgcyA9IGdldEJsb2NrUG9zKGJsb2NrX2NvbG9yKTtcbiAgICAgICAgICAgIGlmIChzLmsuaW5kZXhPZihcInVcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbG9yW3MudlswXV0gPT0gcy52WzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnZbMV0gPT0gY3ViZVN0YXRlW3Mua1sxXV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBcInVcIiArIHByZXZGYWNlW3Mua1sxXV0gKyBcIlVcIiArIHByZXZGYWNlW3Mua1sxXV0udG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJVXCIgKyBzLmtbMV0udG9VcHBlckNhc2UoKSArIFwidVwiICsgcy5rWzFdO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGV4cCA9IFwiVVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudlsxXSA9PSBjdWJlU3RhdGVbcy5rWzFdXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IFwiVVwiICsgbmV4dEZhY2Vbcy5rWzFdXS50b1VwcGVyQ2FzZSgpICsgXCJ1XCIgKyBuZXh0RmFjZVtzLmtbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcInVcIiArIHMua1sxXSArIFwiVVwiICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gXCJVXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHMudlswXSA9PSBjdWJlU3RhdGVbcy5rWzBdXSAmJiBzLnZbMV0gPT0gY3ViZVN0YXRlW3Mua1sxXV0pIHJldHVybiBleHBfbG9nO1xuICAgICAgICAgICAgICAgIGVsc2UgZXhwID0gXCJ1XCIgKyBzLmtbMF0gKyBcIlVcIiArIHMua1swXS50b1VwcGVyQ2FzZSgpICsgXCJVXCIgKyBzLmtbMV0udG9VcHBlckNhc2UoKSArIFwidVwiICsgcy5rWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwX2xvZyArPSBleHA7XG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZShleHApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2Vjb25kIExheWVyIFNpbmdsZSBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJTZWNvbmQgTGF5ZXIgU2luZ2xlIEVycm9yOiBcIiArIGV4cF9sb2c7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBGSVJTVCBMQVlFUiBFREdFUyAtLS0tLS0tLS0tLS0tLS1cbiAgICBmdW5jdGlvbiBGSVJTVF9MQVlFUl9FREdFUygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIEZJUlNUIExBWUVSIEVER0VTIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgbGV0IG9yZGVyID0gXCJcIjtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfRURHRVNfU0lOR0xFKFwiZGxcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcImxcIl0pO1xuICAgICAgICBvcmRlciArPSBGSVJTVF9MQVlFUl9FREdFU19TSU5HTEUoXCJkZlwiLCBjdWJlU3RhdGVbXCJkXCJdICsgY3ViZVN0YXRlW1wiZlwiXSk7XG4gICAgICAgIG9yZGVyICs9IEZJUlNUX0xBWUVSX0VER0VTX1NJTkdMRShcImRyXCIsIGN1YmVTdGF0ZVtcImRcIl0gKyBjdWJlU3RhdGVbXCJyXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfRURHRVNfU0lOR0xFKFwiZGJcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcImJcIl0pO1xuICAgICAgICByZXR1cm4gY29tcHJlc3Mob3JkZXIpO1xuICAgICAgICAvL0V4ZWN1dGUob3JkZXIsIFwiRmlyc3QgbGF5ZXIgZWRnZXNcIik7XG4gICAgfTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tICBDT01QTEVURSBUSEUgRklSU1QgTEFZRVIgQ09STkVSUyAtLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIEZJUlNUX0xBWUVSX0NPUk5FUlMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBGSVJTVCBMQVlFUiBDT1JORVJTIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgbGV0IG9yZGVyID0gXCJcIjtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkbGZcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcImxcIl0gKyBjdWJlU3RhdGVbXCJmXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkZnJcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcImZcIl0gKyBjdWJlU3RhdGVbXCJyXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkcmJcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcInJcIl0gKyBjdWJlU3RhdGVbXCJiXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkYmxcIiwgY3ViZVN0YXRlW1wiZFwiXSArIGN1YmVTdGF0ZVtcImJcIl0gKyBjdWJlU3RhdGVbXCJsXCJdKTtcbiAgICAgICAgcmV0dXJuIGNvbXByZXNzKG9yZGVyKTtcbiAgICAgICAgLy9FeGVjdXRlKG9yZGVyLCBcIkZpcnN0IGxheWVyIGNvcm5lcnNcIik7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tICBDT01QTEVURSBUSEUgU0VDT05EIExBWUVSIC0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIFNFQ09ORF9MQVlFUigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIFNFQ09ORCBMQVlFUiAtLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIGxldCBvcmRlciA9IFwiXCI7XG4gICAgICAgIG9yZGVyICs9IFNFQ09ORF9MQVlFUl9TSU5HTEUoXCJsZlwiLCBjdWJlU3RhdGVbXCJsXCJdICsgY3ViZVN0YXRlW1wiZlwiXSk7XG4gICAgICAgIG9yZGVyICs9IFNFQ09ORF9MQVlFUl9TSU5HTEUoXCJmclwiLCBjdWJlU3RhdGVbXCJmXCJdICsgY3ViZVN0YXRlW1wiclwiXSk7XG4gICAgICAgIG9yZGVyICs9IFNFQ09ORF9MQVlFUl9TSU5HTEUoXCJyYlwiLCBjdWJlU3RhdGVbXCJyXCJdICsgY3ViZVN0YXRlW1wiYlwiXSk7XG4gICAgICAgIG9yZGVyICs9IFNFQ09ORF9MQVlFUl9TSU5HTEUoXCJibFwiLCBjdWJlU3RhdGVbXCJiXCJdICsgY3ViZVN0YXRlW1wibFwiXSk7XG4gICAgICAgIHJldHVybiBjb21wcmVzcyhvcmRlcik7XG4gICAgfTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBDT01QTEVURSBUSEUgVE9QIENST1NTIC0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uIFRPUF9DUk9TUygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIFRPUCBDUk9TUyAtLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIHZhciBleHAgPSBcIlwiLCBleHBfbG9nID0gXCJcIjtcbiAgICAgICAgdmFyIHVjID0gY3ViZVN0YXRlW1widVwiXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKGN1YmVTdGF0ZS51bFswXSA9PSB1YyAmJiBjdWJlU3RhdGUudXJbMF0gPT0gdWNcbiAgICAgICAgICAgICAgICAmJiBjdWJlU3RhdGUudWZbMF0gPT0gdWMgJiYgY3ViZVN0YXRlLnViWzBdID09IHVjKVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wcmVzcyhleHBfbG9nKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1YmVTdGF0ZS51bFswXSA9PSB1YyAmJiBjdWJlU3RhdGUudXJbMF0gPT0gdWMpIGV4cCA9IFwiRlJVcnVmXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChjdWJlU3RhdGUudWZbMF0gPT0gdWMgJiYgY3ViZVN0YXRlLnViWzBdID09IHVjKSBleHAgPSBcIlJCVWJ1clwiO1xuICAgICAgICAgICAgZWxzZSBpZiAoY3ViZVN0YXRlLnVmWzBdID09IHVjICYmIGN1YmVTdGF0ZS51clswXSA9PSB1YykgZXhwID0gXCJGUlVydWZcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1YmVTdGF0ZS51clswXSA9PSB1YyAmJiBjdWJlU3RhdGUudWJbMF0gPT0gdWMpIGV4cCA9IFwiUkJVYnVyXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChjdWJlU3RhdGUudWJbMF0gPT0gdWMgJiYgY3ViZVN0YXRlLnVsWzBdID09IHVjKSBleHAgPSBcIkJMVWx1YlwiO1xuICAgICAgICAgICAgZWxzZSBpZiAoY3ViZVN0YXRlLnVsWzBdID09IHVjICYmIGN1YmVTdGF0ZS51ZlswXSA9PSB1YykgZXhwID0gXCJMRlVmdWxcIjtcbiAgICAgICAgICAgIGVsc2UgZXhwID0gXCJGUlVydWZcIjtcbiAgICAgICAgICAgIGV4cF9sb2cgKz0gZXhwO1xuICAgICAgICAgICAgY2hhbmdlU3RhdGUoZXhwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvcCBDcm9zcyBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJUb3AgQ3Jvc3MgRXJyb3I6IFwiICsgZXhwX2xvZztcbiAgICB9O1xuXG4gICAgLy8gLS0tLS0gQ09NUExFVEUgVEhFIFRISVJEIExBWUVSIENPUk5FUlMgKFBPU0lUSU9OKSAtLS0tLVxuICAgIGZ1bmN0aW9uIFRISVJEX0xBWUVSX0NPUk5FUlNfUE9TKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLSBDT01QTEVURSBUSEUgVEhJUkQgTEFZRVIgQ09STkVSUyAoUE9TSVRJT04pIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IFwickxVbHVSVUx1bFwiLCBibG9ja3MgPSBbXCJ1bGZcIiwgXCJ1ZnJcIiwgXCJ1cmJcIiwgXCJ1YmxcIl0sIHVjID0gY3ViZVN0YXRlW1widVwiXTtcbiAgICAgICAgdmFyIGV4cF9sb2cgPSBcIlwiO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IGk7XG4gICAgICAgICAgICB2YXIgdGltZXMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaSArIDQ7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBqICUgNDtcblxuXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RjID0gY3ViZVN0YXRlW2Jsb2Nrc1tsYXN0XV0ucmVwbGFjZSh1YywgXCJcIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dGMgPSBjdWJlU3RhdGVbYmxvY2tzW25leHRdXS5yZXBsYWNlKHVjLCBcIlwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sb3JbbGFzdGNbMF1dID09IGxhc3RjWzFdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRjLmluZGV4T2YobGFzdGNbMV0pICE9IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBuZXh0Yy5pbmRleE9mKG5leHRDb2xvcltsYXN0Y1sxXV0pICE9IC0xKSB0aW1lcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRjLmluZGV4T2YobGFzdGNbMF0pICE9IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBuZXh0Yy5pbmRleE9mKG5leHRDb2xvcltsYXN0Y1swXV0pICE9IC0xKSB0aW1lcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3QgPSBuZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGltZXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxhc3QgPSAobGFzdCAtIDEgKyA0KSAlIDQ7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgPT0gMCkgZXhwX2xvZyA9IFwidVwiICsgc3RlcCwgY2hhbmdlU3RhdGUoZXhwX2xvZyk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdCA9PSAxKSBleHBfbG9nID0gc3RlcCwgY2hhbmdlU3RhdGUoZXhwX2xvZyk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdCA9PSAyKSBleHBfbG9nID0gXCJVXCIgKyBzdGVwLCBjaGFuZ2VTdGF0ZShleHBfbG9nKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0ID09IDMpIGV4cF9sb2cgPSBcIlVVXCIgKyBzdGVwLCBjaGFuZ2VTdGF0ZShleHBfbG9nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHJlc3MoZXhwX2xvZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHRpbWVzID4gMSkgcmV0dXJuIGNvbXByZXNzKGV4cF9sb2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhwX2xvZyA9IHN0ZXAgKyBcIlVcIiArIHN0ZXA7XG4gICAgICAgIGNoYW5nZVN0YXRlKGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gY29tcHJlc3MoZXhwX2xvZyk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0gQ09NUExFVEUgVEhFIFRISVJEIExBWUVSIENPUk5FUlMgKE9SSUVOVCkgLS0tLS1cbiAgICBmdW5jdGlvbiBUSElSRF9MQVlFUl9DT1JORVJTX09SSSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIFRISVJEIExBWUVSIENPUk5FUlMgKE9SSUVOVCkgLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICBjb25zdCBzdGVwMSA9IFwicnVSdXJ1dVJ1dVwiLCBzdGVwMiA9IFwiRlVmVUZVVWZVVVwiO1xuICAgICAgICBjb25zdCBibG9ja3MgPSBbXCJ1bGZcIiwgXCJ1ZnJcIiwgXCJ1cmJcIiwgXCJ1YmxcIl0sIHVjID0gY3ViZVN0YXRlW1widVwiXTtcbiAgICAgICAgdmFyIGV4cF9sb2cgPSBcIlwiLCBzID0gXCJcIjtcblxuICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2NrcykgcyArPSBjdWJlU3RhdGVbYmxvY2tdLmluZGV4T2YodWMpO1xuXG4gICAgICAgIGlmIChzLm1hdGNoKC8yMjIwfDAyMjJ8MjAyMnwyMjAyLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMDIyMlwiKSBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjIwMjJcIikgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMjIwMlwiKSBleHBfbG9nICs9IFwidVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzLm1hdGNoKC8xMTEwfDAxMTF8MTAxMXwxMTAxLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMDExMVwiKSBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjEwMTFcIikgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMTEwMVwiKSBleHBfbG9nICs9IFwidVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzLm1hdGNoKC8yMDAxfDEyMDB8MDEyMHwwMDEyLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMTIwMFwiKSBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjAxMjBcIikgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMDAxMlwiKSBleHBfbG9nICs9IFwidVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMSArIFwiVVwiICsgc3RlcDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5tYXRjaCgvMTAwMnwyMTAwfDAyMTB8MDAyMS8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjIxMDBcIikgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gXCIwMjEwXCIpIGV4cF9sb2cgKz0gXCJVVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjAwMjFcIikgZXhwX2xvZyArPSBcInVcIjtcbiAgICAgICAgICAgIGV4cF9sb2cgKz0gc3RlcDIgKyBcIlVcIiArIHN0ZXAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzIxMjF8MTIxMi8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjEyMTJcIikgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGV4cF9sb2cgKz0gc3RlcDIgKyBcIlVVXCIgKyBzdGVwMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzLm1hdGNoKC8yMTEyfDIyMTF8MTIyMXwxMTIyLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMjIxMVwiKSBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjEyMjFcIikgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMTEyMlwiKSBleHBfbG9nICs9IFwidVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMSArIFwiVVwiICsgc3RlcDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5tYXRjaCgvMDIwMXwxMDIwLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMTAyMFwiKSBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMSArIFwiVVVcIiArIHN0ZXAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzAxMDJ8MjAxMC8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjIwMTBcIikgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGV4cF9sb2cgKz0gc3RlcDIgKyBcIlVVXCIgKyBzdGVwMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoYW5nZVN0YXRlKGV4cF9sb2cpO1xuICAgICAgICBjb25zb2xlLmxvZyhleHBfbG9nKVxuICAgICAgICByZXR1cm4gY29tcHJlc3MoZXhwX2xvZyk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBUSElSRCBMQVlFUiBFREdFUyAtLS0tLS0tLS0tLS0tLS1cbiAgICBmdW5jdGlvbiBUSElSRF9MQVlFUl9FREdFUygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIFRISVJEIExBWUVSIEVER0VTIC0tLS0tLS0tLS0tLVwiKVxuICAgICAgICBjb25zdCBzdGVwMSA9IFwicnVSdXJ1dVJ1dVwiLCBzdGVwMiA9IFwiRlVmVUZVVWZVVVwiO1xuICAgICAgICB2YXIgZXhwX2xvZyA9IFwiXCI7XG5cblxuICAgICAgICB3aGlsZSAoY3ViZVN0YXRlLnVsZlsyXSAhPSBjdWJlU3RhdGUuZikge1xuICAgICAgICAgICAgY2hhbmdlU3RhdGUoXCJVXCIpO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZXhwID0gXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBjdWJlU3RhdGUudWZbMV0gKyBjdWJlU3RhdGUudXJbMV0gKyBjdWJlU3RhdGUudWJbMV0gKyBjdWJlU3RhdGUudWxbMV07XG4gICAgICAgICAgICBjb25zdCBjID0gY3ViZVN0YXRlLmYgKyBjdWJlU3RhdGUuciArIGN1YmVTdGF0ZS5iICsgY3ViZVN0YXRlLmw7XG5cbiAgICAgICAgICAgIGxldCB0aW1lcyA9IDAsIHBvcyA9IC0xO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tqXSA9PSBjW2pdKSB0aW1lcysrLCBwb3MgPSBqO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzLCBjKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGltZXMsIHBvcylcblxuXG4gICAgICAgICAgICBpZiAodGltZXMgPiAxKSByZXR1cm4gY29tcHJlc3MoZXhwX2xvZylcbiAgICAgICAgICAgIGVsc2UgaWYgKHRpbWVzID09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09IDEpIGV4cCArPSBcIllcIjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3MgPT0gMikgZXhwICs9IFwiWVlcIjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3MgPT0gMykgZXhwICs9IFwieVwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNbKHBvcyArIDEpICUgNF0gPT0gbmV4dENvbG9yW25leHRDb2xvcltzW3Bvc11dXSlcbiAgICAgICAgICAgICAgICAgICAgZXhwICs9IHN0ZXAxICsgc3RlcDI7XG4gICAgICAgICAgICAgICAgZWxzZSBleHAgKz0gXCJ5XCIgKyBzdGVwMiArIHN0ZXAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBleHAgKz0gc3RlcDEgKyBzdGVwMjtcblxuICAgICAgICAgICAgZXhwX2xvZyArPSBleHA7XG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZShleHApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJUaGlyZCBMYXllciBFZGdlcyBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJUaGlyZCBMYXllciBFZGdlcyBFcnJvcjogXCIgKyBleHBfbG9nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvbHZlQ3ViZSgpIHtcbiAgICAgICAgbGV0IHN0ZXBzID0gW107XG4gICAgICAgIHN0ZXBzLnB1c2goRklSU1RfTEFZRVJfRURHRVMoKSk7XG4gICAgICAgIHN0ZXBzLnB1c2goRklSU1RfTEFZRVJfQ09STkVSUygpKTtcbiAgICAgICAgc3RlcHMucHVzaChTRUNPTkRfTEFZRVIoKSk7XG4gICAgICAgIHN0ZXBzLnB1c2goVE9QX0NST1NTKCkpO1xuICAgICAgICBzdGVwcy5wdXNoKFRISVJEX0xBWUVSX0NPUk5FUlNfUE9TKCkpO1xuICAgICAgICBzdGVwcy5wdXNoKFRISVJEX0xBWUVSX0NPUk5FUlNfT1JJKCkpO1xuICAgICAgICBzdGVwcy5wdXNoKFRISVJEX0xBWUVSX0VER0VTKCkpO1xuICAgICAgICByZXR1cm4gc3RlcHM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbXByZXNzKG9yZGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgb3JkZXIgPSBvcmRlci5yZXBsYWNlKC91VXxVdXxkRHxEZHxsTHxMbHxmRnxGZnxyUnxScnxiQnxCYnx5WXxZeXx1dXV1fGRkZGR8bGxsbHxmZmZmfHJycnJ8YmJiYnx5eXl5fFVVVVV8RERERHxMTExMfEZGRkZ8UlJSUnxCQkJCfFlZWVkvZywgXCJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3V1dS9nLCBcIlVcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2RkZC9nLCBcIkRcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2xsbC9nLCBcIkxcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2ZmZi9nLCBcIkZcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3Jyci9nLCBcIlJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2JiYi9nLCBcIkJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3l5eS9nLCBcIllcIik7XG5cbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvVVVVL2csIFwidVwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvREREL2csIFwiZFwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvTExML2csIFwibFwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvRkZGL2csIFwiZlwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvUlJSL2csIFwiclwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvQkJCL2csIFwiYlwiKTtcbiAgICAgICAgICAgIG9yZGVyID0gb3JkZXIucmVwbGFjZSgvWVlZL2csIFwieVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgfVxuXG4gICAgZ2V0Q3ViZVN0YXRlKHN0YXRlKTtcbiAgICByZXR1cm4gc29sdmVDdWJlKCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtydWJpa3NjdWJlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9