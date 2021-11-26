/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/vueapp/playground/index.html":
/*!******************************************!*\
  !*** ./src/vueapp/playground/index.html ***!
  \******************************************/
/***/ ((module) => {

module.exports = "<v-app>\n    <div v-resize=\"resize\" style=\"user-select: none; touch-action: none;\">\n        <v-flex xs12 :style=\"{\n                'height':size + 'px'\n            }\" id=\"top-flex\"></v-flex>\n\n        <v-btn fixed right top fab color=\"primary\" style=\"user-select: none;\" :style=\"{\n        width: size * 0.9 + 'px', \n        height: size * 0.9 + 'px', \n        'margin-right': width / 2 - Math.min(size * 4, width / 2) + size * 1.1 + 'px'}\" @click=\"listd=!listd\">\n            <v-icon :size=\"size * 0.6\">\n                school\n            </v-icon>\n        </v-btn>\n\n        <v-btn fixed left top text color=\"primary\" style=\"user-select: none; margin: 0%; padding: 0%;\"\n            :style=\"{height: size+'px', 'margin-left': width / 2 - Math.min(size * 4, width / 2 - size / 4) + 'px'}\"\n            @click=\"listd=true\" v-if=\"isDemoMode\">\n            <div :style=\"{'font-size':(size * 0.4)+'px'}\" style=\"text-transform: none;\">{{ demoName }}</div>\n        </v-btn>\n\n        <v-bottom-sheet v-model=\"listd\">\n            <v-card text style=\"margin: 0%; padding: 0%;\">\n                <v-container fluid grid-list-md text-xs-center style=\"padding: 0%;\"\n                    :style=\"{width: Math.min(size * 10, width) + 'px'}\">\n                    <v-layout row wrap\n                        style=\"margin: 0%; padding: 0%; min-width: 0%; min-height: 0%; align-items: stretch;\">\n                        <v-card style=\"margin: 0%; padding: 0%;\" :style=\"{'width': demoGridWidth  + 'px'}\"\n                            v-for=\"(demoImage, i) in demoImages\" :key=\"i\">\n                            <v-btn block text color=\"primary\" :style=\"{\n                                'font-size': size * 0.3 + 'px',\n                                'height': size * 0.35 + 'px'\n                            }\" style=\"text-transform: none;\n                            text-align: center;\n                            margin: 0%;\n                            padding: 0%;\" @click=\"selectDemo(i)\">\n                                {{ demoData[i].name }}\n                            </v-btn>\n                            <img :src=\"demoImage\" style=\"margin: 0%; padding: 0%;\"\n                                :style=\"{'width':demoGridWidth  + 'px'}\" @click=\"selectDemo(i)\">\n                        </v-card>\n                    </v-layout>\n                </v-container>\n            </v-card>\n        </v-bottom-sheet>\n\n        <setting ref=\"setting\"></setting>\n        <viewport ref=\"viewport\"></viewport>\n        <v-flex xs12 :style=\"{\n                'height':size + 'px',\n                'padding': 'none',\n                'margin': 'none'\n            }\" id=\"bottom-flex\" v-show=\"!isPlayerMode\">\n        </v-flex>\n        <v-card flat style=\"margin: auto; touch-action: none; user-select: none;\">\n            <v-container fluid grid-list-md text-xs-center\n                :style=\"{width: Math.min(size * 8, width) + 'px', height: size * 4 + 'px'}\">\n                <v-layout row wrap>\n                    <v-flex xs12 :style=\"{\n                    'height': size + 'px'\n                }\" v-if=\"isPlayerMode\">\n                        <v-slider :value=\"progress\" style=\"margin: 0%; padding: 0%;\" :max=\"solution.length\"\n                            :tick-size=\"3\" thumb-label=\"always\" :ticks=\"showTicks\" hide-details v-on:input=\"setProgress\">\n                            <template v-slot:thumb-label>\n                                {{ progress == 0 ? '#' : solution[progress - 1] }}\n                            </template>\n                        </v-slider>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"greenButton\" block text color=\"green\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Scramble' : (progress == solution.length ? 'Replay' : 'Play') }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"blueButton\" block text color=\"blue\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Reset' : 'Pause' }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                    <v-flex xs4 :style=\"{padding: size * 0.06 + 'px'}\">\n                        <v-btn @click=\"redButton\" block text color=\"red\"\n                            style=\"min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;\" :height=\"size\">\n                            <div :style=\"{'font-size': size * 0.3 +'px'}\">\n                                {{ !isPlayerMode ? 'Solve' : 'Quit' }}\n                            </div>\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </v-card>\n    </div>\n</v-app>"

/***/ }),

/***/ "./src/vueapp/setting/index.html":
/*!***************************************!*\
  !*** ./src/vueapp/setting/index.html ***!
  \***************************************/
/***/ ((module) => {

module.exports = "<div v-resize=\"resize\">\n    <v-btn fixed right top fab color=\"primary\" style=\"user-select: none;\"\n        :style=\"{width: size * 0.9 + 'px', height: size * 0.9 + 'px', 'margin-right': width / 2 - Math.min(size * 4, width / 2) + 'px'}\"\n        @click=\"state = !state\">\n        <v-icon :size=\"size * 0.6\">\n            settings\n        </v-icon>\n    </v-btn>\n    <v-bottom-sheet v-model=\"state\">\n        <v-card text style=\"margin: auto;\">\n            <v-container fluid grid-list-md text-xs-center :style=\"{width: Math.min(size * 8, width) + 'px'}\">\n                <v-subheader>\n                    SOLVING ALGORITHM\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                }\">\n                    <v-radio-group v-model=\"solver_id\">\n                        <v-radio label=\"Kociemba's Algorithm\" :value=\"1\" off-icon=\"radio_button_unchecked\"  on-icon=\"radio_button_checked\"></v-radio>\n                        <v-radio label=\"Layer By Layer Method\" :value=\"0\" off-icon=\"radio_button_unchecked\" on-icon=\"radio_button_checked\" :style=\"{ 'margin-top' : size * 0.2 + 'px'}\"></v-radio>\n                    </v-radio-group>\n                </v-flex>\n                <v-subheader>\n                    SCRAMBLE LENGTH\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"scramble_steps\" thumb-label=\"always\" :max=\"40\" :min=\"0\"\n                        :marks=\"[0,10,20,30,40]\"></vue-slider>\n                </v-flex>\n                <v-subheader>\n                    FRAMES PER TWIST\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"frames\" thumb-label=\"always\" :max=\"60\" :min=\"0\" :marks=\"[0,15,30,45,60]\">\n                    </vue-slider>\n                </v-flex>\n                <v-subheader>\n                    SENSITIVITY\n                </v-subheader>\n                <v-flex xs12 :style=\"{\n                    'padding-left': size / 2 + 'px',\n                    'padding-right': size / 2 + 'px',\n                    'padding-top': size * 0.2 + 'px',\n                    'font-size': (size * 0.3) + 'px',\n                    'height':size + 'px'\n                }\">\n                    <vue-slider v-model=\"sensibility\" thumb-label=\"always\" :max=\"100\" :min=\"0\"\n                        :marks=\"[0,25,50,75,100]\"></vue-slider>\n                </v-flex>\n            </v-container>\n        </v-card>\n    </v-bottom-sheet>\n</div>"

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

/***/ "./src/cube/lbl.ts":
/*!*************************!*\
  !*** ./src/cube/lbl.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LBLSolver)
/* harmony export */ });
class LBLSolver {
    constructor() {
        this.cubeState = {};
        this.nextColor = {};
        this.nextFace = { l: "f", f: "r", r: "b", b: "l" };
        this.prevFace = { l: "b", b: "r", r: "f", f: "l" };
    }
    getCubeState(state) {
        this.cubeState = {
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
        };
        const color_l = this.cubeState["l"];
        const color_r = this.cubeState["r"];
        const color_f = this.cubeState["f"];
        const color_b = this.cubeState["b"];
        this.nextColor[color_l] = color_f;
        this.nextColor[color_f] = color_r;
        this.nextColor[color_r] = color_b;
        this.nextColor[color_b] = color_l;
        console.log(this.cubeState);
        console.log(this.nextColor);
    }
    Twist_B() {
        let tmp = this.cubeState.ub;
        this.cubeState.ub = this.cubeState.rb;
        this.cubeState.rb = this.cubeState.db;
        this.cubeState.db = this.cubeState.bl[1] + this.cubeState.bl[0];
        this.cubeState.bl = tmp[1] + tmp[0];
        tmp = this.cubeState.ubl;
        this.cubeState.ubl = this.cubeState.urb[1] + this.cubeState.urb[2] + this.cubeState.urb[0];
        this.cubeState.urb = this.cubeState.drb[1] + this.cubeState.drb[0] + this.cubeState.drb[2];
        this.cubeState.drb = this.cubeState.dbl[2] + this.cubeState.dbl[0] + this.cubeState.dbl[1];
        this.cubeState.dbl = tmp[2] + tmp[1] + tmp[0];
    }
    Twist_R() {
        let tmp = this.cubeState.ur;
        this.cubeState.ur = this.cubeState.fr;
        this.cubeState.fr = this.cubeState.dr;
        this.cubeState.dr = this.cubeState.rb[1] + this.cubeState.rb[0];
        this.cubeState.rb = tmp[1] + tmp[0];
        tmp = this.cubeState.urb;
        this.cubeState.urb = this.cubeState.ufr[1] + this.cubeState.ufr[2] + this.cubeState.ufr[0];
        this.cubeState.ufr = this.cubeState.dfr[1] + this.cubeState.dfr[0] + this.cubeState.dfr[2];
        this.cubeState.dfr = this.cubeState.drb[2] + this.cubeState.drb[0] + this.cubeState.drb[1];
        this.cubeState.drb = tmp[2] + tmp[1] + tmp[0];
    }
    ;
    Twist_F() {
        let tmp = this.cubeState.uf;
        this.cubeState.uf = this.cubeState.lf;
        this.cubeState.lf = this.cubeState.df;
        this.cubeState.df = this.cubeState.fr[1] + this.cubeState.fr[0];
        this.cubeState.fr = tmp[1] + tmp[0];
        tmp = this.cubeState.ufr;
        this.cubeState.ufr = this.cubeState.ulf[1] + this.cubeState.ulf[2] + this.cubeState.ulf[0];
        this.cubeState.ulf = this.cubeState.dlf[1] + this.cubeState.dlf[0] + this.cubeState.dlf[2];
        this.cubeState.dlf = this.cubeState.dfr[2] + this.cubeState.dfr[0] + this.cubeState.dfr[1];
        this.cubeState.dfr = tmp[2] + tmp[1] + tmp[0];
    }
    Twist_L() {
        let tmp = this.cubeState.ul;
        this.cubeState.ul = this.cubeState.bl;
        this.cubeState.bl = this.cubeState.dl;
        this.cubeState.dl = this.cubeState.lf[1] + this.cubeState.lf[0];
        this.cubeState.lf = tmp[1] + tmp[0];
        tmp = this.cubeState.ulf;
        this.cubeState.ulf = this.cubeState.ubl[1] + this.cubeState.ubl[2] + this.cubeState.ubl[0];
        this.cubeState.ubl = this.cubeState.dbl[1] + this.cubeState.dbl[0] + this.cubeState.dbl[2];
        this.cubeState.dbl = this.cubeState.dlf[2] + this.cubeState.dlf[0] + this.cubeState.dlf[1];
        this.cubeState.dlf = tmp[2] + tmp[1] + tmp[0];
    }
    Twist_U() {
        let tmp = this.cubeState.ul;
        this.cubeState.ul = this.cubeState.uf;
        this.cubeState.uf = this.cubeState.ur;
        this.cubeState.ur = this.cubeState.ub;
        this.cubeState.ub = tmp;
        tmp = this.cubeState.ulf;
        this.cubeState.ulf = this.cubeState.ufr;
        this.cubeState.ufr = this.cubeState.urb;
        this.cubeState.urb = this.cubeState.ubl;
        this.cubeState.ubl = tmp;
    }
    Twist_D() {
        let tmp = this.cubeState.dl;
        this.cubeState.dl = this.cubeState.db;
        this.cubeState.db = this.cubeState.dr;
        this.cubeState.dr = this.cubeState.df;
        this.cubeState.df = tmp;
        tmp = this.cubeState.dlf;
        this.cubeState.dlf = this.cubeState.dbl;
        this.cubeState.dbl = this.cubeState.drb;
        this.cubeState.drb = this.cubeState.dfr;
        this.cubeState.dfr = tmp;
    }
    Twist_Y() {
        this.Twist_U();
        let tmp = this.cubeState.lf;
        this.cubeState.lf = this.cubeState.fr;
        this.cubeState.fr = this.cubeState.rb;
        this.cubeState.rb = this.cubeState.bl;
        this.cubeState.bl = tmp;
        tmp = this.cubeState.f;
        this.cubeState.f = this.cubeState.r;
        this.cubeState.r = this.cubeState.b;
        this.cubeState.b = this.cubeState.l;
        this.cubeState.l = tmp;
        this.Twist_D(), this.Twist_D(), this.Twist_D();
    }
    changeState(order_list) {
        for (const order of order_list) {
            switch (order) {
                case "D":
                    this.Twist_D();
                    break;
                case "d":
                    this.Twist_D();
                    this.Twist_D();
                    this.Twist_D();
                    break;
                case "U":
                    this.Twist_U();
                    break;
                case "u":
                    this.Twist_U();
                    this.Twist_U();
                    this.Twist_U();
                    break;
                case "L":
                    this.Twist_L();
                    break;
                case "l":
                    this.Twist_L();
                    this.Twist_L();
                    this.Twist_L();
                    break;
                case "F":
                    this.Twist_F();
                    break;
                case "f":
                    this.Twist_F();
                    this.Twist_F();
                    this.Twist_F();
                    break;
                case "R":
                    this.Twist_R();
                    break;
                case "r":
                    this.Twist_R();
                    this.Twist_R();
                    this.Twist_R();
                    break;
                case "B":
                    this.Twist_B();
                    break;
                case "b":
                    this.Twist_B();
                    this.Twist_B();
                    this.Twist_B();
                    break;
                case "Y":
                    this.Twist_Y();
                    break;
                case "y":
                    this.Twist_Y();
                    this.Twist_Y();
                    this.Twist_Y();
                    break;
            }
        }
    }
    getBlockPos(block) {
        const reg = new RegExp("^[" + block + "]{" + block.length + "}$");
        const result = {};
        for (let k in this.cubeState) {
            if (this.cubeState[k].match(reg)) {
                result["k"] = k;
                result["v"] = this.cubeState[k];
                return result;
            }
        }
        return result;
    }
    FIRST_LAYER_EDGES_SINGLE(block_pos, block_color) {
        let exp = "", exp_log = "";
        let s;
        for (let i = 0; i < 7; i++) {
            s = this.getBlockPos(block_color);
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == block_color[0]) {
                    if (s.k == block_pos)
                        return exp_log;
                    else
                        exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                }
                else
                    exp = s.k[1].toUpperCase();
            }
            else if (s.k.indexOf("u") != -1) {
                if (s.k[1] == block_pos[1]) {
                    if (s.v[0] == block_color[0])
                        exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                    else if (this.cubeState[block_pos[0] + this.nextFace[s.k[1]]] !=
                        this.cubeState[block_pos[0]] + this.cubeState[this.nextFace[s.k[1]]])
                        exp = "u" + this.nextFace[s.k[1]] + s.k[1].toUpperCase();
                    else
                        exp = "u" + this.nextFace[s.k[1]] + s.k[1].toUpperCase() + this.nextFace[s.k[1]].toUpperCase();
                }
                else
                    exp = "U";
            }
            else {
                if (s.v[0] == block_color[0]) {
                    if (s.k[1] == block_pos[1])
                        exp = s.k[1];
                    else if (this.cubeState[block_pos[0] + s.k[1]] != this.cubeState[block_pos[0]] + this.cubeState[s.k[1]])
                        exp = s.k[1].toUpperCase();
                    else
                        exp = s.k[1].toUpperCase() + "U" + s.k[1];
                }
                else {
                    if (s.k[0] == block_pos[1])
                        exp = s.k[0].toUpperCase();
                    else if (this.cubeState[block_pos[0] + s.k[0]] != this.cubeState[block_pos[0]] + this.cubeState[s.k[0]])
                        exp = s.k[0];
                    else
                        exp = s.k[0] + "U" + s.k[0].toUpperCase();
                }
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("First Layer Cross Single Error: ", exp_log);
        return "First Layer Cross Single Error: " + exp_log;
    }
    FIRST_LAYER_CORNERS_SINGLE(block_pos, block_color) {
        let exp = "", exp_log = "", s;
        for (let i = 0; i < 10; i++) {
            s = this.getBlockPos(block_color);
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == this.cubeState["d"]) {
                    if (s.k == block_pos)
                        return exp_log;
                    else
                        exp = s.k[1] + "U" + s.k[1].toUpperCase();
                }
                else if (s.v[1] == this.cubeState["d"])
                    exp = s.k[1] + "u" + s.k[1].toUpperCase();
                else
                    exp = s.k[2].toUpperCase() + "U" + s.k[2];
            }
            else {
                if (s.k == "u" + block_pos[1] + block_pos[2]) {
                    if (s.v[0] == this.cubeState["d"])
                        exp = s.k[2].toUpperCase() + "u" + s.k[2];
                    else if (s.v[1] == this.cubeState["d"])
                        exp = s.k[1] + "u" + s.k[1].toUpperCase();
                    else
                        exp = s.k[2].toUpperCase() + "U" + s.k[2];
                }
                else
                    exp = "U";
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("First Layer Corners Single Error: ", exp_log);
        return "First Layer Corners Single Error: " + exp_log;
    }
    ;
    SECOND_LAYER_SINGLE(block_pos, block_color) {
        let exp = "", exp_log = "", s;
        for (let i = 0; i < 6; i++) {
            s = this.getBlockPos(block_color);
            if (s.k.indexOf("u") != -1) {
                if (this.nextColor[s.v[0]] == s.v[1]) {
                    if (s.v[1] == this.cubeState[s.k[1]])
                        exp = "u" + this.prevFace[s.k[1]] + "U" + this.prevFace[s.k[1]].toUpperCase()
                            + "U" + s.k[1].toUpperCase() + "u" + s.k[1];
                    else
                        exp = "U";
                }
                else {
                    if (s.v[1] == this.cubeState[s.k[1]])
                        exp = "U" + this.nextFace[s.k[1]].toUpperCase() + "u" + this.nextFace[s.k[1]]
                            + "u" + s.k[1] + "U" + s.k[1].toUpperCase();
                    else
                        exp = "U";
                }
            }
            else {
                if (s.v[0] == this.cubeState[s.k[0]] && s.v[1] == this.cubeState[s.k[1]])
                    return exp_log;
                else
                    exp = "u" + s.k[0] + "U" + s.k[0].toUpperCase() + "U" + s.k[1].toUpperCase() + "u" + s.k[1];
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("Second Layer Single Error: ", exp_log);
        return "Second Layer Single Error: " + exp_log;
    }
    FIRST_LAYER_EDGES() {
        console.log("------------ COMPLETE THE FIRST LAYER EDGES ------------");
        let order = "";
        order += this.FIRST_LAYER_EDGES_SINGLE("dl", this.cubeState["d"] + this.cubeState["l"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("df", this.cubeState["d"] + this.cubeState["f"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("dr", this.cubeState["d"] + this.cubeState["r"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("db", this.cubeState["d"] + this.cubeState["b"]);
        return this.compress(order);
    }
    ;
    FIRST_LAYER_CORNERS() {
        console.log("------------ COMPLETE THE FIRST LAYER CORNERS ------------");
        let order = "";
        order += this.FIRST_LAYER_CORNERS_SINGLE("dlf", this.cubeState["d"] + this.cubeState["l"] + this.cubeState["f"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("dfr", this.cubeState["d"] + this.cubeState["f"] + this.cubeState["r"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("drb", this.cubeState["d"] + this.cubeState["r"] + this.cubeState["b"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("dbl", this.cubeState["d"] + this.cubeState["b"] + this.cubeState["l"]);
        return this.compress(order);
    }
    SECOND_LAYER() {
        console.log("------------ COMPLETE THE SECOND LAYER ------------");
        let order = "";
        order += this.SECOND_LAYER_SINGLE("lf", this.cubeState["l"] + this.cubeState["f"]);
        order += this.SECOND_LAYER_SINGLE("fr", this.cubeState["f"] + this.cubeState["r"]);
        order += this.SECOND_LAYER_SINGLE("rb", this.cubeState["r"] + this.cubeState["b"]);
        order += this.SECOND_LAYER_SINGLE("bl", this.cubeState["b"] + this.cubeState["l"]);
        return this.compress(order);
    }
    ;
    TOP_CROSS() {
        console.log("------------ COMPLETE THE TOP CROSS ------------");
        let exp = "", exp_log = "";
        let uc = this.cubeState["u"];
        for (let i = 0; i < 4; i++) {
            if (this.cubeState.ul[0] == uc && this.cubeState.ur[0] == uc
                && this.cubeState.uf[0] == uc && this.cubeState.ub[0] == uc)
                return this.compress(exp_log);
            else if (this.cubeState.ul[0] == uc && this.cubeState.ur[0] == uc)
                exp = "FRUruf";
            else if (this.cubeState.uf[0] == uc && this.cubeState.ub[0] == uc)
                exp = "RBUbur";
            else if (this.cubeState.uf[0] == uc && this.cubeState.ur[0] == uc)
                exp = "FRUruf";
            else if (this.cubeState.ur[0] == uc && this.cubeState.ub[0] == uc)
                exp = "RBUbur";
            else if (this.cubeState.ub[0] == uc && this.cubeState.ul[0] == uc)
                exp = "BLUlub";
            else if (this.cubeState.ul[0] == uc && this.cubeState.uf[0] == uc)
                exp = "LFUful";
            else
                exp = "FRUruf";
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("Top Cross Error: ", exp_log);
        return "Top Cross Error: " + exp_log;
    }
    ;
    THIRD_LAYER_CORNERS_POS() {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (POSITION) ------------");
        const step = "rLUluRULul", blocks = ["ulf", "ufr", "urb", "ubl"], uc = this.cubeState["u"];
        let exp_log = "";
        for (let i = 0; i < 4; i++) {
            let last = i;
            let times = 0;
            for (let j = i + 1; j < i + 4; j++) {
                const next = j % 4;
                let lastc = this.cubeState[blocks[last]].replace(uc, "");
                let nextc = this.cubeState[blocks[next]].replace(uc, "");
                if (this.nextColor[lastc[0]] == lastc[1]) {
                    if (nextc.indexOf(lastc[1]) != -1
                        && nextc.indexOf(this.nextColor[lastc[1]]) != -1)
                        times += 1;
                    else
                        break;
                }
                else {
                    if (nextc.indexOf(lastc[0]) != -1
                        && nextc.indexOf(this.nextColor[lastc[0]]) != -1)
                        times += 1;
                    else
                        break;
                }
                last = next;
            }
            if (times == 1) {
                last = (last - 1 + 4) % 4;
                if (last == 0)
                    exp_log = "u" + step, this.changeState(exp_log);
                else if (last == 1)
                    exp_log = step, this.changeState(exp_log);
                else if (last == 2)
                    exp_log = "U" + step, this.changeState(exp_log);
                else if (last == 3)
                    exp_log = "UU" + step, this.changeState(exp_log);
                return this.compress(exp_log);
            }
            else if (times > 1)
                return this.compress(exp_log);
        }
        exp_log = step + "U" + step;
        this.changeState(exp_log);
        return this.compress(exp_log);
    }
    THIRD_LAYER_CORNERS_ORI() {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (ORIENT) ------------");
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        const blocks = ["ulf", "ufr", "urb", "ubl"], uc = this.cubeState["u"];
        let exp_log = "", s = "";
        for (const block of blocks)
            s += this.cubeState[block].indexOf(uc);
        if (s.match(/2220|0222|2022|2202/)) {
            if (s == "0222")
                exp_log += "U";
            else if (s == "2022")
                exp_log += "UU";
            else if (s == "2202")
                exp_log += "u";
            exp_log += step1;
        }
        else if (s.match(/1110|0111|1011|1101/)) {
            if (s == "0111")
                exp_log += "U";
            else if (s == "1011")
                exp_log += "UU";
            else if (s == "1101")
                exp_log += "u";
            exp_log += step2;
        }
        else if (s.match(/2001|1200|0120|0012/)) {
            if (s == "1200")
                exp_log += "U";
            else if (s == "0120")
                exp_log += "UU";
            else if (s == "0012")
                exp_log += "u";
            exp_log += step1 + "U" + step2;
        }
        else if (s.match(/1002|2100|0210|0021/)) {
            if (s == "2100")
                exp_log += "U";
            else if (s == "0210")
                exp_log += "UU";
            else if (s == "0021")
                exp_log += "u";
            exp_log += step2 + "U" + step1;
        }
        else if (s.match(/2121|1212/)) {
            if (s == "1212")
                exp_log += "U";
            exp_log += step2 + "UU" + step2;
        }
        else if (s.match(/2112|2211|1221|1122/)) {
            if (s == "2211")
                exp_log += "U";
            else if (s == "1221")
                exp_log += "UU";
            else if (s == "1122")
                exp_log += "u";
            exp_log += step1 + "U" + step1;
        }
        else if (s.match(/0201|1020/)) {
            if (s == "1020")
                exp_log += "U";
            exp_log += step1 + "UU" + step2;
        }
        else if (s.match(/0102|2010/)) {
            if (s == "2010")
                exp_log += "U";
            exp_log += step2 + "UU" + step1;
        }
        this.changeState(exp_log);
        return this.compress(exp_log);
    }
    THIRD_LAYER_EDGES() {
        console.log("------------ COMPLETE THE THIRD LAYER EDGES ------------");
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        let exp_log = "";
        while (this.cubeState.ulf[2] != this.cubeState.f) {
            this.changeState("U");
            exp_log += "U";
        }
        for (let i = 0; i < 3; i++) {
            let exp = "";
            const s = this.cubeState.uf[1] + this.cubeState.ur[1] + this.cubeState.ub[1] + this.cubeState.ul[1];
            const c = this.cubeState.f + this.cubeState.r + this.cubeState.b + this.cubeState.l;
            let times = 0, pos = -1;
            for (let j = 0; j < 4; j++) {
                if (s[j] == c[j])
                    times++, pos = j;
            }
            if (times > 1)
                return this.compress(exp_log);
            else if (times == 1) {
                if (pos == 1)
                    exp += "Y";
                else if (pos == 2)
                    exp += "YY";
                else if (pos == 3)
                    exp += "y";
                if (s[(pos + 1) % 4] == this.nextColor[this.nextColor[s[pos]]])
                    exp += step1 + step2;
                else
                    exp += "y" + step2 + step1;
            }
            else
                exp += step1 + step2;
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("Third Layer Edges Error: ", exp_log);
        return "Third Layer Edges Error: " + exp_log;
    }
    solveCube() {
        let steps = [];
        steps.push(this.FIRST_LAYER_EDGES());
        steps.push(this.FIRST_LAYER_CORNERS());
        steps.push(this.SECOND_LAYER());
        steps.push(this.TOP_CROSS());
        steps.push(this.THIRD_LAYER_CORNERS_POS());
        steps.push(this.THIRD_LAYER_CORNERS_ORI());
        steps.push(this.THIRD_LAYER_EDGES());
        return steps;
    }
    ;
    compress(order) {
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
    solve(state) {
        this.getCubeState(state);
        return this.solveCube();
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
    solverId: 1,
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
    "U": "w",
    "F": "g",
    "R": "r",
    "B": "b",
    "D": "y",
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
/* harmony import */ var _cube_lbl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../cube/lbl */ "./src/cube/lbl.ts");











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
        this.elapsedFrames = 0;
        this.elapsedFramesThreshold = 15;
        this.listd = false;
        this.capturer = new _cube_capture__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.demoData = __webpack_require__(/*! ./demos.json */ "./src/vueapp/playground/demos.json");
        this.demoImages = [];
        this.demoGridWidth = 0;
        this.isDemoMode = false;
        this.lblSolver = new _cube_lbl__WEBPACK_IMPORTED_MODULE_8__["default"]();
        this.showTicks = false;
        this.backupState = [];
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
        if (!this.isPlayerMode) {
            this.backupState = this.world.cube.serialize();
        }
        this.isPlayerMode = true;
        this.initState = this.world.cube.serialize();
        const solverId = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.cube_config.solverId;
        if (solverId == 0) {
            const lblState = [];
            for (const faceState of this.initState) {
                lblState.push(_cube_utils__WEBPACK_IMPORTED_MODULE_4__.faceToColor[faceState]);
            }
            const lblSolution = this.lblSolver.solve(lblState).filter(Boolean);
            this.solution = [];
            for (const lblPhase of lblSolution) {
                const lblOrders = lblPhase.split("").filter(Boolean);
                for (const order of lblOrders) {
                    const step = _cube_utils__WEBPACK_IMPORTED_MODULE_4__.lblOrderMapping[order];
                    if (step) {
                        this.solution.push(step);
                    }
                }
                this.solution.push("~");
            }
            if (this.solution.length == 0) {
                this.solution.push("~");
            }
            if (lblSolution.length <= 3) {
                this.showTicks = "always";
            }
            else {
                this.showTicks = false;
            }
        }
        else if (solverId === 1) {
            this.solution = this.cubejsCube
                .fromString(this.initState)
                .solve()
                .split(' ').
                filter(Boolean);
            this.solution.push("~");
            this.showTicks = "always";
        }
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
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            this.elapsedFrames++;
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
        }
        this.world.cube.restore(this.backupState);
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
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;
        if (!this.isPlayerMode) {
            this.scramble();
        }
        else {
            this.play();
        }
    }
    blueButton() {
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;
        if (!this.isPlayerMode) {
            this.reset();
        }
        else {
            this.pause();
        }
    }
    redButton() {
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;
        if (!this.isPlayerMode) {
            this.solve();
        }
        else {
            this.quit();
        }
    }
    selectDemo(idx) {
        this.listd = false;
        if (!this.isPlayerMode) {
            this.backupState = this.world.cube.serialize();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvc2V0dGluZy9pbmRleC5odG1sIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3ZpZXdwb3J0L2luZGV4Lmh0bWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2NhcHR1cmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmUudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2N1YmVsZXQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL2dyb3VwLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9pbnRlcmFjdG9yLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS9sYmwudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3R3aXN0ZXIudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9jdWJlL3V0aWxzLnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvY3ViZS91dGlsc19pbnRlcm5hbC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL2N1YmUvd29ybGQudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2luZGV4LnRzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvdnVlYXBwL3NldHRpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL3NyYy92dWVhcHAvdmlld3BvcnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3J1Ymlrc2N1YmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPHYtYXBwPlxcbiAgICA8ZGl2IHYtcmVzaXplPVxcXCJyZXNpemVcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTsgdG91Y2gtYWN0aW9uOiBub25lO1xcXCI+XFxuICAgICAgICA8di1mbGV4IHhzMTIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICdoZWlnaHQnOnNpemUgKyAncHgnXFxuICAgICAgICAgICAgfVxcXCIgaWQ9XFxcInRvcC1mbGV4XFxcIj48L3YtZmxleD5cXG5cXG4gICAgICAgIDx2LWJ0biBmaXhlZCByaWdodCB0b3AgZmFiIGNvbG9yPVxcXCJwcmltYXJ5XFxcIiBzdHlsZT1cXFwidXNlci1zZWxlY3Q6IG5vbmU7XFxcIiA6c3R5bGU9XFxcIntcXG4gICAgICAgIHdpZHRoOiBzaXplICogMC45ICsgJ3B4JywgXFxuICAgICAgICBoZWlnaHQ6IHNpemUgKiAwLjkgKyAncHgnLCBcXG4gICAgICAgICdtYXJnaW4tcmlnaHQnOiB3aWR0aCAvIDIgLSBNYXRoLm1pbihzaXplICogNCwgd2lkdGggLyAyKSArIHNpemUgKiAxLjEgKyAncHgnfVxcXCIgQGNsaWNrPVxcXCJsaXN0ZD0hbGlzdGRcXFwiPlxcbiAgICAgICAgICAgIDx2LWljb24gOnNpemU9XFxcInNpemUgKiAwLjZcXFwiPlxcbiAgICAgICAgICAgICAgICBzY2hvb2xcXG4gICAgICAgICAgICA8L3YtaWNvbj5cXG4gICAgICAgIDwvdi1idG4+XFxuXFxuICAgICAgICA8di1idG4gZml4ZWQgbGVmdCB0b3AgdGV4dCBjb2xvcj1cXFwicHJpbWFyeVxcXCIgc3R5bGU9XFxcInVzZXItc2VsZWN0OiBub25lOyBtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiXFxuICAgICAgICAgICAgOnN0eWxlPVxcXCJ7aGVpZ2h0OiBzaXplKydweCcsICdtYXJnaW4tbGVmdCc6IHdpZHRoIC8gMiAtIE1hdGgubWluKHNpemUgKiA0LCB3aWR0aCAvIDIgLSBzaXplIC8gNCkgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICBAY2xpY2s9XFxcImxpc3RkPXRydWVcXFwiIHYtaWY9XFxcImlzRGVtb01vZGVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6KHNpemUgKiAwLjQpKydweCd9XFxcIiBzdHlsZT1cXFwidGV4dC10cmFuc2Zvcm06IG5vbmU7XFxcIj57eyBkZW1vTmFtZSB9fTwvZGl2PlxcbiAgICAgICAgPC92LWJ0bj5cXG5cXG4gICAgICAgIDx2LWJvdHRvbS1zaGVldCB2LW1vZGVsPVxcXCJsaXN0ZFxcXCI+XFxuICAgICAgICAgICAgPHYtY2FyZCB0ZXh0IHN0eWxlPVxcXCJtYXJnaW46IDAlOyBwYWRkaW5nOiAwJTtcXFwiPlxcbiAgICAgICAgICAgICAgICA8di1jb250YWluZXIgZmx1aWQgZ3JpZC1saXN0LW1kIHRleHQteHMtY2VudGVyIHN0eWxlPVxcXCJwYWRkaW5nOiAwJTtcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogTWF0aC5taW4oc2l6ZSAqIDEwLCB3aWR0aCkgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXBcXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWFyZ2luOiAwJTsgcGFkZGluZzogMCU7IG1pbi13aWR0aDogMCU7IG1pbi1oZWlnaHQ6IDAlOyBhbGlnbi1pdGVtczogc3RyZXRjaDtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQgc3R5bGU9XFxcIm1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOnN0eWxlPVxcXCJ7J3dpZHRoJzogZGVtb0dyaWRXaWR0aCAgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XFxcIihkZW1vSW1hZ2UsIGkpIGluIGRlbW9JbWFnZXNcXFwiIDprZXk9XFxcImlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gYmxvY2sgdGV4dCBjb2xvcj1cXFwicHJpbWFyeVxcXCIgOnN0eWxlPVxcXCJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0Jzogc2l6ZSAqIDAuMzUgKyAncHgnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cXFwiIHN0eWxlPVxcXCJ0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAlO1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwJTtcXFwiIEBjbGljaz1cXFwic2VsZWN0RGVtbyhpKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkZW1vRGF0YVtpXS5uYW1lIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgOnNyYz1cXFwiZGVtb0ltYWdlXFxcIiBzdHlsZT1cXFwibWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnN0eWxlPVxcXCJ7J3dpZHRoJzpkZW1vR3JpZFdpZHRoICArICdweCd9XFxcIiBAY2xpY2s9XFxcInNlbGVjdERlbW8oaSlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cXG4gICAgICAgICAgICA8L3YtY2FyZD5cXG4gICAgICAgIDwvdi1ib3R0b20tc2hlZXQ+XFxuXFxuICAgICAgICA8c2V0dGluZyByZWY9XFxcInNldHRpbmdcXFwiPjwvc2V0dGluZz5cXG4gICAgICAgIDx2aWV3cG9ydCByZWY9XFxcInZpZXdwb3J0XFxcIj48L3ZpZXdwb3J0PlxcbiAgICAgICAgPHYtZmxleCB4czEyIDpzdHlsZT1cXFwie1xcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnOiAnbm9uZScsXFxuICAgICAgICAgICAgICAgICdtYXJnaW4nOiAnbm9uZSdcXG4gICAgICAgICAgICB9XFxcIiBpZD1cXFwiYm90dG9tLWZsZXhcXFwiIHYtc2hvdz1cXFwiIWlzUGxheWVyTW9kZVxcXCI+XFxuICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgIDx2LWNhcmQgZmxhdCBzdHlsZT1cXFwibWFyZ2luOiBhdXRvOyB0b3VjaC1hY3Rpb246IG5vbmU7IHVzZXItc2VsZWN0OiBub25lO1xcXCI+XFxuICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkIGdyaWQtbGlzdC1tZCB0ZXh0LXhzLWNlbnRlclxcbiAgICAgICAgICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogTWF0aC5taW4oc2l6ZSAqIDgsIHdpZHRoKSArICdweCcsIGhlaWdodDogc2l6ZSAqIDQgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOiBzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIiB2LWlmPVxcXCJpc1BsYXllck1vZGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNsaWRlciA6dmFsdWU9XFxcInByb2dyZXNzXFxcIiBzdHlsZT1cXFwibWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6bWF4PVxcXCJzb2x1dGlvbi5sZW5ndGhcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0aWNrLXNpemU9XFxcIjNcXFwiIHRodW1iLWxhYmVsPVxcXCJhbHdheXNcXFwiIDp0aWNrcz1cXFwic2hvd1RpY2tzXFxcIiBoaWRlLWRldGFpbHMgdi1vbjppbnB1dD1cXFwic2V0UHJvZ3Jlc3NcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnRodW1iLWxhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcHJvZ3Jlc3MgPT0gMCA/ICcjJyA6IHNvbHV0aW9uW3Byb2dyZXNzIC0gMV0gfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Ytc2xpZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNCA6c3R5bGU9XFxcIntwYWRkaW5nOiBzaXplICogMC4wNiArICdweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVxcXCJncmVlbkJ1dHRvblxcXCIgYmxvY2sgdGV4dCBjb2xvcj1cXFwiZ3JlZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgIWlzUGxheWVyTW9kZSA/ICdTY3JhbWJsZScgOiAocHJvZ3Jlc3MgPT0gc29sdXRpb24ubGVuZ3RoID8gJ1JlcGxheScgOiAnUGxheScpIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcImJsdWVCdXR0b25cXFwiIGJsb2NrIHRleHQgY29sb3I9XFxcImJsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJtaW4td2lkdGg6IDAlOyBtaW4taGVpZ2h0OiAwJTsgbWFyZ2luOiAwJTsgcGFkZGluZzogMCU7XFxcIiA6aGVpZ2h0PVxcXCJzaXplXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6c3R5bGU9XFxcInsnZm9udC1zaXplJzogc2l6ZSAqIDAuMyArJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgIWlzUGxheWVyTW9kZSA/ICdSZXNldCcgOiAnUGF1c2UnIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM0IDpzdHlsZT1cXFwie3BhZGRpbmc6IHNpemUgKiAwLjA2ICsgJ3B4J31cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XFxcInJlZEJ1dHRvblxcXCIgYmxvY2sgdGV4dCBjb2xvcj1cXFwicmVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cXFwibWluLXdpZHRoOiAwJTsgbWluLWhlaWdodDogMCU7IG1hcmdpbjogMCU7IHBhZGRpbmc6IDAlO1xcXCIgOmhlaWdodD1cXFwic2l6ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgOnN0eWxlPVxcXCJ7J2ZvbnQtc2l6ZSc6IHNpemUgKiAwLjMgKydweCd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICFpc1BsYXllck1vZGUgPyAnU29sdmUnIDogJ1F1aXQnIH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgPC92LWNhcmQ+XFxuICAgIDwvZGl2Plxcbjwvdi1hcHA+XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiB2LXJlc2l6ZT1cXFwicmVzaXplXFxcIj5cXG4gICAgPHYtYnRuIGZpeGVkIHJpZ2h0IHRvcCBmYWIgY29sb3I9XFxcInByaW1hcnlcXFwiIHN0eWxlPVxcXCJ1c2VyLXNlbGVjdDogbm9uZTtcXFwiXFxuICAgICAgICA6c3R5bGU9XFxcInt3aWR0aDogc2l6ZSAqIDAuOSArICdweCcsIGhlaWdodDogc2l6ZSAqIDAuOSArICdweCcsICdtYXJnaW4tcmlnaHQnOiB3aWR0aCAvIDIgLSBNYXRoLm1pbihzaXplICogNCwgd2lkdGggLyAyKSArICdweCd9XFxcIlxcbiAgICAgICAgQGNsaWNrPVxcXCJzdGF0ZSA9ICFzdGF0ZVxcXCI+XFxuICAgICAgICA8di1pY29uIDpzaXplPVxcXCJzaXplICogMC42XFxcIj5cXG4gICAgICAgICAgICBzZXR0aW5nc1xcbiAgICAgICAgPC92LWljb24+XFxuICAgIDwvdi1idG4+XFxuICAgIDx2LWJvdHRvbS1zaGVldCB2LW1vZGVsPVxcXCJzdGF0ZVxcXCI+XFxuICAgICAgICA8di1jYXJkIHRleHQgc3R5bGU9XFxcIm1hcmdpbjogYXV0bztcXFwiPlxcbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZCBncmlkLWxpc3QtbWQgdGV4dC14cy1jZW50ZXIgOnN0eWxlPVxcXCJ7d2lkdGg6IE1hdGgubWluKHNpemUgKiA4LCB3aWR0aCkgKyAncHgnfVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNPTFZJTkcgQUxHT1JJVEhNXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgIH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtcmFkaW8tZ3JvdXAgdi1tb2RlbD1cXFwic29sdmVyX2lkXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1yYWRpbyBsYWJlbD1cXFwiS29jaWVtYmEncyBBbGdvcml0aG1cXFwiIDp2YWx1ZT1cXFwiMVxcXCIgb2ZmLWljb249XFxcInJhZGlvX2J1dHRvbl91bmNoZWNrZWRcXFwiICBvbi1pY29uPVxcXCJyYWRpb19idXR0b25fY2hlY2tlZFxcXCI+PC92LXJhZGlvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXJhZGlvIGxhYmVsPVxcXCJMYXllciBCeSBMYXllciBNZXRob2RcXFwiIDp2YWx1ZT1cXFwiMFxcXCIgb2ZmLWljb249XFxcInJhZGlvX2J1dHRvbl91bmNoZWNrZWRcXFwiIG9uLWljb249XFxcInJhZGlvX2J1dHRvbl9jaGVja2VkXFxcIiA6c3R5bGU9XFxcInsgJ21hcmdpbi10b3AnIDogc2l6ZSAqIDAuMiArICdweCd9XFxcIj48L3YtcmFkaW8+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtcmFkaW8tZ3JvdXA+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBTQ1JBTUJMRSBMRU5HVEhcXG4gICAgICAgICAgICAgICAgPC92LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIDpzdHlsZT1cXFwie1xcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0Jzogc2l6ZSAvIDIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctdG9wJzogc2l6ZSAqIDAuMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogKHNpemUgKiAwLjMpICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOnNpemUgKyAncHgnXFxuICAgICAgICAgICAgICAgIH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHZ1ZS1zbGlkZXIgdi1tb2RlbD1cXFwic2NyYW1ibGVfc3RlcHNcXFwiIHRodW1iLWxhYmVsPVxcXCJhbHdheXNcXFwiIDptYXg9XFxcIjQwXFxcIiA6bWluPVxcXCIwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDptYXJrcz1cXFwiWzAsMTAsMjAsMzAsNDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8di1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgICAgICBGUkFNRVMgUEVSIFRXSVNUXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcImZyYW1lc1xcXCIgdGh1bWItbGFiZWw9XFxcImFsd2F5c1xcXCIgOm1heD1cXFwiNjBcXFwiIDptaW49XFxcIjBcXFwiIDptYXJrcz1cXFwiWzAsMTUsMzAsNDUsNjBdXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdnVlLXNsaWRlcj5cXG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgIDx2LXN1YmhlYWRlcj5cXG4gICAgICAgICAgICAgICAgICAgIFNFTlNJVElWSVRZXFxuICAgICAgICAgICAgICAgIDwvdi1zdWJoZWFkZXI+XFxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiA6c3R5bGU9XFxcIntcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBzaXplIC8gMiArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHNpemUgLyAyICsgJ3B4JyxcXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLXRvcCc6IHNpemUgKiAwLjIgKyAncHgnLFxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IChzaXplICogMC4zKSArICdweCcsXFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzpzaXplICsgJ3B4J1xcbiAgICAgICAgICAgICAgICB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2xpZGVyIHYtbW9kZWw9XFxcInNlbnNpYmlsaXR5XFxcIiB0aHVtYi1sYWJlbD1cXFwiYWx3YXlzXFxcIiA6bWF4PVxcXCIxMDBcXFwiIDptaW49XFxcIjBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOm1hcmtzPVxcXCJbMCwyNSw1MCw3NSwxMDBdXFxcIj48L3Z1ZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICA8L3YtY2FyZD5cXG4gICAgPC92LWJvdHRvbS1zaGVldD5cXG48L2Rpdj5cIiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IHJlZj1cXFwiY2FudmFzXFxcIj48L2Rpdj5cIiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuL3dvcmxkXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXB0dXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgICAgIGFscGhhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbygxKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKDI1NiwgMjU2LCB0cnVlKTtcbiAgICAgICAgdGhpcy53b3JsZC5yZXNpemUoMjU2LCAyNTYpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKFwiPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/XCIpO1xuICAgIH1cbiAgICBnZW5lcmF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzdG9yZShzdGF0ZS5zcGxpdChcIlwiKSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMud29ybGQuc2NlbmUsIHRoaXMud29ybGQuY2FtZXJhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBheGlzX3BsYW5lcywgYXhpc192ZWN0b3JzLCBjdWJlX2NvbmZpZywgY3ViZV9zaXplLCBpbmRleFRvTGF5ZXIsIHdvcmxkVG9JbmRleCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBCb3gzLCBWZWN0b3IzIH0gZnJvbSBcInRocmVlXCI7XG5leHBvcnQgY2xhc3MgSG9sZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuYXhpcyA9IFwiXCI7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3Iod29ybGQpIHtcbiAgICAgICAgdGhpcy5pbnRlcmFjdCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hzdGFydFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnggPSBhY3Rpb24ueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLnkgPSBhY3Rpb24ueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duX3RpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVEb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW1vdmVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS54ID0gYWN0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZS55ID0gYWN0aW9uLnk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hjYW5jZWxcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3VzZW91dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9sb2NrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm90YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5heGlzID0gXCJcIjtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY29udGluZ2xlID0gMDtcbiAgICAgICAgdGhpcy5kb3duID0gbmV3IFRIUkVFLlZlY3RvcjIoMCwgMCk7XG4gICAgICAgIHRoaXMubW92ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDAsIDApO1xuICAgICAgICB0aGlzLmRvd25fdGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmhvbGRlciA9IG5ldyBIb2xkZXIoKTtcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBzZXQgbG9jayh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2xvY2sgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NrO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVVwKCk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRpc2FibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5jb250aW5nbGUgKyB0aGlzLmFuZ2xlO1xuICAgICAgICBpZiAodGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cC5hbmdsZSAhPSBhbmdsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIHRoaXMuZ3JvdXAuYW5nbGUpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3RoaXMuYXhpc107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLmFuZ2xlICE9IGFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IChhbmdsZSAtIGdyb3VwLmFuZ2xlKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hbmdsZSArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaCgpIHtcbiAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgY29uc3QgZmluZ2VyID0gdGhpcy5ob2xkZXIudmVjdG9yO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaG9sZGVyLmluZGV4O1xuICAgICAgICBjb25zdCBpbGF5ZXIgPSBpbmRleFRvTGF5ZXIoaW5kZXgpO1xuICAgICAgICBmb3IgKGNvbnN0IGF4aXMgb2YgW1wieFwiLCBcInlcIiwgXCJ6XCJdKSB7XG4gICAgICAgICAgICBjb25zdCB2ZWN0b3IgPSBheGlzX3ZlY3RvcnNbYXhpc107XG4gICAgICAgICAgICBpZiAodmVjdG9yLmRvdChwbGFuZS5ub3JtYWwpID09PSAwICYmIHZlY3Rvci5kb3QoZmluZ2VyKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW2F4aXNdW2lsYXllcltheGlzXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGludGVyc2VjdChwb2ludCwgcGxhbmUpIHtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgY29uc3QgcmF5ID0gbmV3IFRIUkVFLlJheSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCB4ID0gKHBvaW50LnggLyB0aGlzLndvcmxkLndpZHRoKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCB5ID0gLShwb2ludC55IC8gdGhpcy53b3JsZC5oZWlnaHQpICogMiArIDE7XG4gICAgICAgIG1hdHJpeC5jb3B5KHRoaXMud29ybGQuc2NlbmUubWF0cml4KTtcbiAgICAgICAgbWF0cml4LmludmVydCgpO1xuICAgICAgICByYXkub3JpZ2luLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHJheS5kaXJlY3Rpb24uc2V0KHgsIHksIDAuNSkudW5wcm9qZWN0KHRoaXMud29ybGQuY2FtZXJhKS5zdWIocmF5Lm9yaWdpbikubm9ybWFsaXplKCk7XG4gICAgICAgIHJheS5hcHBseU1hdHJpeDQobWF0cml4KTtcbiAgICAgICAgcmF5LmludGVyc2VjdFBsYW5lKHBsYW5lLCByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYW5kbGVEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgfHwgdGhpcy5yb3RhdGluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVVcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvbGRlci5pbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWluX2Rpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1theGlzXTtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5pbnRlcnNlY3QodGhpcy5kb3duLCBwbGFuZSk7XG4gICAgICAgICAgICBpZiAocG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlX21hcmdpbiA9IGN1YmVfc2l6ZSAvIDIgKyAwLjAwMTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3hNaW4gPSBuZXcgVmVjdG9yMygpLnNldFNjYWxhcigtY3ViZV9tYXJnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveE1heCA9IG5ldyBWZWN0b3IzKCkuc2V0U2NhbGFyKGN1YmVfbWFyZ2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBuZXcgQm94Myhib3hNaW4sIGJveE1heCk7XG4gICAgICAgICAgICAgICAgaWYgKGJveC5jb250YWluc1BvaW50KHBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW4gPSBuZXcgVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLndvcmxkLmNhbWVyYS5tYXRyaXhXb3JsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5kaXN0YW5jZVRvKG9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVyLmF4aXMgPSBheGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSB3b3JsZFRvSW5kZXgocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgZHggPSB0aGlzLm1vdmUueCAtIHRoaXMuZG93bi54O1xuICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xuICAgICAgICAgICAgY29uc3QgZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoTWF0aC5taW4odGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQpIC8gZCA+IDEyOCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucm90YXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZGVyLmluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ5XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3duLnggPCB0aGlzLndvcmxkLndpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5heGlzID0gXCJ4XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF4aXMgPSBcInpcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5nbGVfc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy53b3JsZC5jdWJlLnRhYmxlLmdyb3Vwc1t0aGlzLmF4aXNdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3aXN0ZXIuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbmdsZV9zZXQuYWRkKGdyb3VwLmFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRpbmdsZV9zZXQuc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29udGluZ2xlX3NldC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250aW5nbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubWF4KG5ldyBWZWN0b3IzKCkuc3ViKHZlY3RvcikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm0gPSBNYXRoLm1heCh2ZWN0b3IueCwgdmVjdG9yLnksIHZlY3Rvci56KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRlci52ZWN0b3IuY29weShub3JtID09IHZlY3Rvci54ID8gbmV3IFZlY3RvcjMoMSwgMCwgMCkgOiAobm9ybSA9PSB2ZWN0b3IueSA/IG5ldyBWZWN0b3IzKDAsIDEsIDApIDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoMCwgMCwgMSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gdGhpcy5tYXRjaCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0aGlzLmdyb3VwLmRyYWcoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHRoaXMuZ3JvdXAuZHJhZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbmdsZSA9IHRoaXMuZ3JvdXAuYW5nbGU7XG4gICAgICAgICAgICAgICAgdmVjdG9yLmNyb3NzVmVjdG9ycyh0aGlzLmhvbGRlci52ZWN0b3IsIHBsYW5lLm5vcm1hbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkZXIudmVjdG9yLm11bHRpcGx5U2NhbGFyKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3Iueik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBheGlzX3BsYW5lc1t0aGlzLmhvbGRlci5heGlzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMuZG93biwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHRoaXMuaW50ZXJzZWN0KHRoaXMubW92ZSwgcGxhbmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKCkuc3ViVmVjdG9ycyhlbmQsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2ZWN0b3IubXVsdGlwbHkodGhpcy5ob2xkZXIudmVjdG9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID1cbiAgICAgICAgICAgICAgICAgICAgKHZlY3Rvci54ICsgdmVjdG9yLnkgKyB2ZWN0b3IueikgKlxuICAgICAgICAgICAgICAgICAgICAgICAgY3ViZV9jb25maWcuc2Vuc2liaWxpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IHRoaXMubW92ZS54IC0gdGhpcy5kb3duLng7XG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSB0aGlzLm1vdmUueSAtIHRoaXMuZG93bi55O1xuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSAqICh0aGlzLmF4aXMgPT0gXCJ5XCIgPyAtZHggOlxuICAgICAgICAgICAgICAgICAgICAodGhpcy5heGlzID09IFwieFwiID8gLWR5IDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChkeSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpbmcpIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHRoaXMuYW5nbGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMubG9jaykge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgPCBNYXRoLlBJIC8gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IChNYXRoLmFicyhhbmdsZSkgLyAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmRvd25fdGljaykpICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkID4gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlID09IDAgPyAwIDogKChhbmdsZSAvIE1hdGguYWJzKGFuZ2xlKSkgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jb250aW5nbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAudHdpc3QoYW5nbGUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbdGhpcy5heGlzXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGdyb3Vwcykge1xuICAgICAgICAgICAgICAgICAgICBncm91cC50d2lzdChhbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgICAgdGhpcy5ob2xkZXIuaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdGF0aW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgQ3ViZWxldCBmcm9tIFwiLi9jdWJlbGV0XCI7XG5pbXBvcnQgeyBHcm91cFRhYmxlIH0gZnJvbSBcIi4vZ3JvdXBcIjtcbmltcG9ydCB7IHR3aXN0ZXIgfSBmcm9tIFwiLi90d2lzdGVyXCI7XG5pbXBvcnQgeyBjdWJlbGV0X2ZhY2VfYXR0cnMsIGN1YmVsZXRfbGFtYmVycywgY3ViZWxldF9zdGlja2VyLCBjdWJlX2NvbmZpZyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBGYWNlIH0gZnJvbSBcIi4vdXRpbHNfaW50ZXJuYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmUgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY3ViZWxldHMgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gbmV3IEN1YmVsZXQoaSk7XG4gICAgICAgICAgICB0aGlzLmN1YmVsZXRzLnB1c2goY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmFkZChjdWJlbGV0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvY2tzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcInhcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5sb2Nrcy5zZXQoXCJ5XCIsIG5ldyBTZXQoKSk7XG4gICAgICAgIHRoaXMubG9ja3Muc2V0KFwielwiLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLmxvY2tzLnNldChcImFcIiwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBHcm91cFRhYmxlKHRoaXMpO1xuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGNhbGxiYWNrKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGxvY2sgb2YgdGhpcy5sb2Nrcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKGxvY2suc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2NrKGF4aXMsIGxheWVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKChfYSA9IHRoaXMubG9ja3MuZ2V0KFwiYVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhcygxKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF4aXNfbG9ja3NldCA9IHRoaXMubG9ja3MuZ2V0KGF4aXMpO1xuICAgICAgICBpZiAoYXhpc19sb2Nrc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxvY2tzZXQgb2YgdGhpcy5sb2Nrcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKGxvY2tzZXQgIT0gYXhpc19sb2Nrc2V0ICYmIGxvY2tzZXQuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXhpc19sb2Nrc2V0LmFkZChsYXllcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB1bmxvY2soYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgYXhpc19sb2Nrc2V0ID0gdGhpcy5sb2Nrcy5nZXQoYXhpcyk7XG4gICAgICAgIGF4aXNfbG9ja3NldCA9PT0gbnVsbCB8fCBheGlzX2xvY2tzZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGF4aXNfbG9ja3NldC5kZWxldGUobGF5ZXIpO1xuICAgIH1cbiAgICByYW5kb20zKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyksIDApLCAyKTtcbiAgICB9XG4gICAgc2NyYW1ibGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3ViZV9jb25maWcuc2NyYW1ibGVfc3RlcHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXhpcyA9IFtcInhcIiwgXCJ5XCIsIFwielwiXVt0aGlzLnJhbmRvbTMoKV07XG4gICAgICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMucmFuZG9tMygpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAodGhpcy5yYW5kb20zKCkgLSAxKSAqIChNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLmdyb3Vwc1theGlzXVtsZXZlbF0udHdpc3QoYW5nbGUgPT09IDAgPyBNYXRoLlBJIDogYW5nbGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0d2lzdGVyLmZpbmlzaCgpO1xuICAgICAgICBmb3IgKGNvbnN0IGN1YmVsZXQgb2YgdGhpcy5jdWJlbGV0cykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdWJlbGV0cy5zcGxpY2UoMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjc7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IG5ldyBDdWJlbGV0KGkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5hZGQoY3ViZWxldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWJsZSA9IG5ldyBHcm91cFRhYmxlKHRoaXMpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgeCwgeSwgejtcbiAgICAgICAgdHdpc3Rlci5maW5pc2goKTtcbiAgICAgICAgeSA9IDI7XG4gICAgICAgIGZvciAoeiA9IDA7IHogPCAzOyB6KyspIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5VKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDI7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHogPSAyOyB6ID49IDA7IHotLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLlIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB6ID0gMjtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3ViZWxldHNbaW5kZXhdLmdldENvbG9yT2YoRmFjZS5GKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeSA9IDA7XG4gICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgMzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuRCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHggPSAwO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh6ID0gMDsgeiA8IDM7IHorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jdWJlbGV0c1tpbmRleF0uZ2V0Q29sb3JPZihGYWNlLkwpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB6ID0gMDtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDI7IHggPj0gMDsgeC0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmN1YmVsZXRzW2luZGV4XS5nZXRDb2xvck9mKEZhY2UuQik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3RvcmUoc3RhdGUpIHtcbiAgICAgICAgbGV0IHgsIHksIHo7XG4gICAgICAgIGxldCBjdXIgPSAwO1xuICAgICAgICBsZXQgZmFjZTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB5ID0gMjtcbiAgICAgICAgZmFjZSA9IEZhY2UuVTtcbiAgICAgICAgZm9yICh6ID0gMDsgeiA8IDM7IHorKykge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gc3RhdGVbY3VyKytdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gbmV3IE1lc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB4ID0gMjtcbiAgICAgICAgZmFjZSA9IEZhY2UuUjtcbiAgICAgICAgZm9yICh5ID0gMjsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAoeiA9IDI7IHogPj0gMDsgei0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQucmVtb3ZlKGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBuZXcgTWVzaCgpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbZmFjZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbGFtYmVyc1tjb2xvcl0pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHogPSAyO1xuICAgICAgICBmYWNlID0gRmFjZS5GO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0geiAqIDMgKiAzICsgeSAqIDMgKyB4O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gc3RhdGVbY3VyKytdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnJlbW92ZShjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdKTtcbiAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gbmV3IE1lc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgIT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZV9hdHRyID0gY3ViZWxldF9mYWNlX2F0dHJzW2ZhY2VdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlja2VyID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9zdGlja2VyLCBjdWJlbGV0X2xhbWJlcnNbY29sb3JdKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhmYWNlX2F0dHIucm90YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnBvc2l0aW9uLmNvcHkoZmFjZV9hdHRyLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5ID0gMDtcbiAgICAgICAgZmFjZSA9IEZhY2UuRDtcbiAgICAgICAgZm9yICh6ID0gMjsgeiA+PSAwOyB6LS0pIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCAzOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXRlW2N1cisrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY3ViZWxldC5yZW1vdmUoY3ViZWxldC5zdGlja2Vyc1tmYWNlXSk7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IG5ldyBNZXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tmYWNlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9sYW1iZXJzW2NvbG9yXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeCA9IDA7XG4gICAgICAgIGZhY2UgPSBGYWNlLkw7XG4gICAgICAgIGZvciAoeSA9IDI7IHkgPj0gMDsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHogPSAwOyB6IDwgMzsgeisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB6ICogMyAqIDMgKyB5ICogMyArIHg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBzdGF0ZVtjdXIrK107XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZWxldCA9IHRoaXMuY3ViZWxldHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQucmVtb3ZlKGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0pO1xuICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBuZXcgTWVzaCgpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPSBcIj9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbZmFjZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGN1YmVsZXRfbGFtYmVyc1tjb2xvcl0pO1xuICAgICAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucG9zaXRpb24uY29weShmYWNlX2F0dHIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LnN0aWNrZXJzW2ZhY2VdID0gc3RpY2tlcjtcbiAgICAgICAgICAgICAgICAgICAgY3ViZWxldC5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHogPSAwO1xuICAgICAgICBmYWNlID0gRmFjZS5CO1xuICAgICAgICBmb3IgKHkgPSAyOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMjsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHogKiAzICogMyArIHkgKiAzICsgeDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXRlW2N1cisrXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlbGV0c1tpbmRleF07XG4gICAgICAgICAgICAgICAgY3ViZWxldC5yZW1vdmUoY3ViZWxldC5zdGlja2Vyc1tmYWNlXSk7XG4gICAgICAgICAgICAgICAgY3ViZWxldC5zdGlja2Vyc1tmYWNlXSA9IG5ldyBNZXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yICE9IFwiP1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VfYXR0ciA9IGN1YmVsZXRfZmFjZV9hdHRyc1tmYWNlXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBUSFJFRS5NZXNoKGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9sYW1iZXJzW2NvbG9yXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0aWNrZXIucm90YXRpb24uc2V0RnJvbVZlY3RvcjMoZmFjZV9hdHRyLnJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGN1YmVsZXQuc3RpY2tlcnNbZmFjZV0gPSBzdGlja2VyO1xuICAgICAgICAgICAgICAgICAgICBjdWJlbGV0LmFkZChzdGlja2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3ViZWxldF9kZWZzLCBjdWJlbGV0X2NvcmUsIGN1YmVsZXRfZnJhbWUsIGN1YmVsZXRfc3RpY2tlciwgY3ViZWxldF9mYWNlX2F0dHJzLCBkaXJlY3Rpb25Ub0luZGV4LCBmYWNlUG9zdGlvbkJpbmRpbmdzLCBjdWJlbGV0X2xhbWJlcnMgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBpbmRleFRvRGlyZWN0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1YmVsZXQgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBjb25zdCBkcmN0biA9IGluZGV4VG9EaXJlY3Rpb24oaW5kZXgpO1xuICAgICAgICB0aGlzLnZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKGRyY3RuLngsIGRyY3RuLnksIGRyY3RuLnopO1xuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFRIUkVFLk1lc2goY3ViZWxldF9mcmFtZSwgY3ViZWxldF9jb3JlKTtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5mcmFtZSk7XG4gICAgICAgIHRoaXMuc3RpY2tlcnMgPSBuZXcgQXJyYXkoNik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmYWNlX2F0dHIgPSBjdWJlbGV0X2ZhY2VfYXR0cnNbaV07XG4gICAgICAgICAgICBpZiAoZmFjZV9hdHRyLm1hdGNoKHRoaXMudmVjdG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNrZXIgPSBuZXcgVEhSRUUuTWVzaChjdWJlbGV0X3N0aWNrZXIsIGZhY2VfYXR0ci5sYW1iZXJ0KTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnJvdGF0aW9uLnNldEZyb21WZWN0b3IzKGZhY2VfYXR0ci5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5wb3NpdGlvbi5jb3B5KGZhY2VfYXR0ci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja2Vyc1tpXSA9IHN0aWNrZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3RpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuICAgIHNldCB2ZWN0b3IodmVjdG9yKSB7XG4gICAgICAgIHRoaXMuX3ZlY3Rvci5jb3B5KHZlY3Rvcik7XG4gICAgICAgIHRoaXMuaW5kZXggPSBkaXJlY3Rpb25Ub0luZGV4KHZlY3Rvcik7XG4gICAgICAgIHRoaXMucG9zaXRpb24uY29weSh2ZWN0b3IpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKGN1YmVsZXRfZGVmcy5zaXplKTtcbiAgICB9XG4gICAgZ2V0IHZlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY3RvcjtcbiAgICB9XG4gICAgY29udmVydEZhY2UoZmFjZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBxdWF0ZXJuaW9uID0gbmV3IFF1YXRlcm5pb24oKS5jb3B5KHRoaXMucXVhdGVybmlvbik7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZyBvZiBmYWNlUG9zdGlvbkJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5mYWNlID09PSBmYWNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24uY29weShiaW5kaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbi5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbi5pbnZlcnQoKSk7XG4gICAgICAgIGNvbnN0IHZlY3RvciA9IG5ldyBWZWN0b3IzKE1hdGgucm91bmQocG9zaXRpb24ueCksIE1hdGgucm91bmQocG9zaXRpb24ueSksIE1hdGgucm91bmQocG9zaXRpb24ueikpO1xuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmcgb2YgZmFjZVBvc3Rpb25CaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcucG9zaXRpb24uZXF1YWxzKHZlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5mYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZ2V0Q29sb3JPZihmYWNlKSB7XG4gICAgICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLnN0aWNrZXJzW3RoaXMuY29udmVydEZhY2UoZmFjZSldO1xuICAgICAgICBzd2l0Y2ggKHN0aWNrZXIubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTFwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5GOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkZcIjtcbiAgICAgICAgICAgIGNhc2UgY3ViZWxldF9sYW1iZXJzLkI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiO1xuICAgICAgICAgICAgY2FzZSBjdWJlbGV0X2xhbWJlcnMuVTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJVXCI7XG4gICAgICAgICAgICBjYXNlIGN1YmVsZXRfbGFtYmVycy5EOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCI/XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBUd2lzdCwgdHdpc3RlciB9IGZyb20gXCIuL3R3aXN0ZXJcIjtcbmltcG9ydCB7IGF4aXNfdmVjdG9ycywgY3ViZV9jb25maWcsIGluZGV4VG9MYXllciB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdWJlR3JvdXAgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gICAgY29uc3RydWN0b3IoY3ViZSwgYXhpcywgbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdWJlID0gY3ViZTtcbiAgICAgICAgdGhpcy5heGlzID0gYXhpcztcbiAgICAgICAgdGhpcy5sYXllciA9IGxheWVyO1xuICAgICAgICB0aGlzLmN1YmVsZXRzID0gW107XG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGlsYXllciA9IGluZGV4VG9MYXllcihpKTtcbiAgICAgICAgICAgIGlmIChheGlzID09IFwieFwiICYmIGlsYXllci54ID09IGxheWVyXG4gICAgICAgICAgICAgICAgfHwgYXhpcyA9PSBcInlcIiAmJiBpbGF5ZXIueSA9PSBsYXllclxuICAgICAgICAgICAgICAgIHx8IGF4aXMgPT0gXCJ6XCIgJiYgaWxheWVyLnogPT0gbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG4gICAgc2V0IGFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRoaXMuc2V0Um90YXRpb25Gcm9tQXhpc0FuZ2xlKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCBhbmdsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ2xlO1xuICAgIH1cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbDtcbiAgICAgICAgICAgIHR3aXN0ZXIuY2FuY2VsKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlIC8gKE1hdGguUEkgLyAyKSkgKiAoTWF0aC5QSSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnR3aXN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMudHdpc3RpbmcuYXJyaXZhbCAtIHRoaXMuYW5nbGU7XG4gICAgICAgICAgICB0d2lzdGVyLmZpbmlzaCh0aGlzLnR3aXN0aW5nKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGhvbGQoKSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmN1YmUubG9jayh0aGlzLmF4aXMsIHRoaXMubGF5ZXIpO1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvbGRpbmcgPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5pbmRpY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBjdWJlbGV0ID0gdGhpcy5jdWJlLmN1YmVsZXRzW2ldO1xuICAgICAgICAgICAgdGhpcy5jdWJlbGV0cy5wdXNoKGN1YmVsZXQpO1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuYWRkKGN1YmVsZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5hZGQodGhpcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkcmFnKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gLXRoaXMuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaG9sZCgpO1xuICAgIH1cbiAgICBkcm9wKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50d2lzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVsZXQgPSB0aGlzLmN1YmVsZXRzLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gY3ViZWxldCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShjdWJlbGV0KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5hZGQoY3ViZWxldCk7XG4gICAgICAgICAgICB0aGlzLmN1YmUuY3ViZWxldHNbY3ViZWxldC5pbmRleF0gPSBjdWJlbGV0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3ViZS5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuY3ViZS5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmN1YmUudW5sb2NrKHRoaXMuYXhpcywgdGhpcy5sYXllcik7XG4gICAgICAgIHRoaXMuY3ViZS5jYWxsYmFjaygpO1xuICAgIH1cbiAgICB0d2lzdChhbmdsZSwgZmFzdCkge1xuICAgICAgICBpZiAodGhpcy5ob2xkaW5nKSB7XG4gICAgICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmhvbGQoKTtcbiAgICAgICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGFuZ2xlID0gTWF0aC5yb3VuZChhbmdsZSAvIChNYXRoLlBJIC8gMikpICogKE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGZhc3QpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5hbmdsZSAtIGFuZ2xlKSA8IDFlLTYpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnJhYyA9IE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgLyAoTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjdWJlX2NvbmZpZy5mcmFtZXMgKiAoMiAtIDIgLyAoZnJhYyArIDEpKTtcbiAgICAgICAgICAgIHRoaXMudHdpc3RpbmcgPSBuZXcgVHdpc3QodGhpcy5hbmdsZSwgYW5nbGUsIGR1cmF0aW9uLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYW5nbGUgLSBhbmdsZSkgPCAxZS02KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0d2lzdGVyLnR3aXN0cy5wdXNoKHRoaXMudHdpc3RpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByb3RhdGUoY3ViZWxldCkge1xuICAgICAgICBjdWJlbGV0LnJvdGF0ZU9uV29ybGRBeGlzKGF4aXNfdmVjdG9yc1t0aGlzLmF4aXNdLCB0aGlzLmFuZ2xlKTtcbiAgICAgICAgY3ViZWxldC52ZWN0b3IgPSBjdWJlbGV0LnZlY3Rvci5hcHBseUF4aXNBbmdsZShheGlzX3ZlY3RvcnNbdGhpcy5heGlzXSwgdGhpcy5hbmdsZSk7XG4gICAgICAgIGN1YmVsZXQudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEdyb3VwVGFibGUge1xuICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBheGlzIG9mIFtcInhcIiwgXCJ5XCIsIFwielwiXSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV3IEN1YmVHcm91cChjdWJlLCBheGlzLCBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1theGlzXSA9IGxpc3Q7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW50ZXJhY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIHgsIHkpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb21zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmRvbXMgPSBbXTtcbiAgICAgICAgdGhpcy50b3VjaCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoc3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKFwidG91Y2hlbmRcIiwgdGhpcy5sYXN0LmNsaWVudFggLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgdGhpcy5sYXN0LmNsaWVudFkgLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3QgPSBmaXJzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGluKCkgfHwgKChfYSA9IHRoaXMubGFzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkZW50aWZpZXIpICE9IGZpcnN0LmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJhY3Rpb24oZXZlbnQudHlwZSwgZmlyc3QuY2xpZW50WCAtIHRoaXMuZG9tc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LCBmaXJzdC5jbGllbnRZIC0gdGhpcy5kb21zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGFjdGlvbik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNoY2FuY2VsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb3VzZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGluKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbihldmVudC50eXBlLCBldmVudC5jbGllbnRYIC0gdGhpcy5kb21zWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsIGV2ZW50LmNsaWVudFkgLSB0aGlzLmRvbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soYWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNldXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBkb20gb2YgZG9tcykge1xuICAgICAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tcy5wdXNoKGRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy50b3VjaCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGZ1bmN0aW9uIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgfSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB9XG4gICAgbm90aW4oKSB7XG4gICAgICAgIGZvciAoY29uc3QgZG9tIG9mIHRoaXMuZG9tcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0ID09PSBkb20pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTEJMU29sdmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5uZXh0Q29sb3IgPSB7fTtcbiAgICAgICAgdGhpcy5uZXh0RmFjZSA9IHsgbDogXCJmXCIsIGY6IFwiclwiLCByOiBcImJcIiwgYjogXCJsXCIgfTtcbiAgICAgICAgdGhpcy5wcmV2RmFjZSA9IHsgbDogXCJiXCIsIGI6IFwiclwiLCByOiBcImZcIiwgZjogXCJsXCIgfTtcbiAgICB9XG4gICAgZ2V0Q3ViZVN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlID0ge1xuICAgICAgICAgICAgYjogc3RhdGVbNDldLFxuICAgICAgICAgICAgYmw6IHN0YXRlWzUwXS5jb25jYXQoc3RhdGVbMzldKSxcbiAgICAgICAgICAgIGQ6IHN0YXRlWzMxXSxcbiAgICAgICAgICAgIGRiOiBzdGF0ZVszNF0uY29uY2F0KHN0YXRlWzUyXSksXG4gICAgICAgICAgICBkYmw6IHN0YXRlWzMzXS5jb25jYXQoc3RhdGVbNTNdKS5jb25jYXQoc3RhdGVbNDJdKSxcbiAgICAgICAgICAgIGRmOiBzdGF0ZVsyOF0uY29uY2F0KHN0YXRlWzI1XSksXG4gICAgICAgICAgICBkZnI6IHN0YXRlWzI5XS5jb25jYXQoc3RhdGVbMjZdKS5jb25jYXQoc3RhdGVbMTVdKSxcbiAgICAgICAgICAgIGRsOiBzdGF0ZVszMF0uY29uY2F0KHN0YXRlWzQzXSksXG4gICAgICAgICAgICBkbGY6IHN0YXRlWzI3XS5jb25jYXQoc3RhdGVbNDRdKS5jb25jYXQoc3RhdGVbMjRdKSxcbiAgICAgICAgICAgIGRyOiBzdGF0ZVszMl0uY29uY2F0KHN0YXRlWzE2XSksXG4gICAgICAgICAgICBkcmI6IHN0YXRlWzM1XS5jb25jYXQoc3RhdGVbMTddKS5jb25jYXQoc3RhdGVbNTFdKSxcbiAgICAgICAgICAgIGY6IHN0YXRlWzIyXSxcbiAgICAgICAgICAgIGZyOiBzdGF0ZVsyM10uY29uY2F0KHN0YXRlWzEyXSksXG4gICAgICAgICAgICBsOiBzdGF0ZVs0MF0sXG4gICAgICAgICAgICBsZjogc3RhdGVbNDFdLmNvbmNhdChzdGF0ZVsyMV0pLFxuICAgICAgICAgICAgcjogc3RhdGVbMTNdLFxuICAgICAgICAgICAgcmI6IHN0YXRlWzE0XS5jb25jYXQoc3RhdGVbNDhdKSxcbiAgICAgICAgICAgIHU6IHN0YXRlWzRdLFxuICAgICAgICAgICAgdWI6IHN0YXRlWzFdLmNvbmNhdChzdGF0ZVs0Nl0pLFxuICAgICAgICAgICAgdWJsOiBzdGF0ZVswXS5jb25jYXQoc3RhdGVbNDddKS5jb25jYXQoc3RhdGVbMzZdKSxcbiAgICAgICAgICAgIHVmOiBzdGF0ZVs3XS5jb25jYXQoc3RhdGVbMTldKSxcbiAgICAgICAgICAgIHVmcjogc3RhdGVbOF0uY29uY2F0KHN0YXRlWzIwXSkuY29uY2F0KHN0YXRlWzldKSxcbiAgICAgICAgICAgIHVsOiBzdGF0ZVszXS5jb25jYXQoc3RhdGVbMzddKSxcbiAgICAgICAgICAgIHVsZjogc3RhdGVbNl0uY29uY2F0KHN0YXRlWzM4XSkuY29uY2F0KHN0YXRlWzE4XSksXG4gICAgICAgICAgICB1cjogc3RhdGVbNV0uY29uY2F0KHN0YXRlWzEwXSksXG4gICAgICAgICAgICB1cmI6IHN0YXRlWzJdLmNvbmNhdChzdGF0ZVsxMV0pLmNvbmNhdChzdGF0ZVs0NV0pLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb2xvcl9sID0gdGhpcy5jdWJlU3RhdGVbXCJsXCJdO1xuICAgICAgICBjb25zdCBjb2xvcl9yID0gdGhpcy5jdWJlU3RhdGVbXCJyXCJdO1xuICAgICAgICBjb25zdCBjb2xvcl9mID0gdGhpcy5jdWJlU3RhdGVbXCJmXCJdO1xuICAgICAgICBjb25zdCBjb2xvcl9iID0gdGhpcy5jdWJlU3RhdGVbXCJiXCJdO1xuICAgICAgICB0aGlzLm5leHRDb2xvcltjb2xvcl9sXSA9IGNvbG9yX2Y7XG4gICAgICAgIHRoaXMubmV4dENvbG9yW2NvbG9yX2ZdID0gY29sb3JfcjtcbiAgICAgICAgdGhpcy5uZXh0Q29sb3JbY29sb3Jfcl0gPSBjb2xvcl9iO1xuICAgICAgICB0aGlzLm5leHRDb2xvcltjb2xvcl9iXSA9IGNvbG9yX2w7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3ViZVN0YXRlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uZXh0Q29sb3IpO1xuICAgIH1cbiAgICBUd2lzdF9CKCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5jdWJlU3RhdGUudWI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnViID0gdGhpcy5jdWJlU3RhdGUucmI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnJiID0gdGhpcy5jdWJlU3RhdGUuZGI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRiID0gdGhpcy5jdWJlU3RhdGUuYmxbMV0gKyB0aGlzLmN1YmVTdGF0ZS5ibFswXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuYmwgPSB0bXBbMV0gKyB0bXBbMF07XG4gICAgICAgIHRtcCA9IHRoaXMuY3ViZVN0YXRlLnVibDtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUudWJsID0gdGhpcy5jdWJlU3RhdGUudXJiWzFdICsgdGhpcy5jdWJlU3RhdGUudXJiWzJdICsgdGhpcy5jdWJlU3RhdGUudXJiWzBdO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51cmIgPSB0aGlzLmN1YmVTdGF0ZS5kcmJbMV0gKyB0aGlzLmN1YmVTdGF0ZS5kcmJbMF0gKyB0aGlzLmN1YmVTdGF0ZS5kcmJbMl07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRyYiA9IHRoaXMuY3ViZVN0YXRlLmRibFsyXSArIHRoaXMuY3ViZVN0YXRlLmRibFswXSArIHRoaXMuY3ViZVN0YXRlLmRibFsxXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGJsID0gdG1wWzJdICsgdG1wWzFdICsgdG1wWzBdO1xuICAgIH1cbiAgICBUd2lzdF9SKCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5jdWJlU3RhdGUudXI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnVyID0gdGhpcy5jdWJlU3RhdGUuZnI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmZyID0gdGhpcy5jdWJlU3RhdGUuZHI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRyID0gdGhpcy5jdWJlU3RhdGUucmJbMV0gKyB0aGlzLmN1YmVTdGF0ZS5yYlswXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUucmIgPSB0bXBbMV0gKyB0bXBbMF07XG4gICAgICAgIHRtcCA9IHRoaXMuY3ViZVN0YXRlLnVyYjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUudXJiID0gdGhpcy5jdWJlU3RhdGUudWZyWzFdICsgdGhpcy5jdWJlU3RhdGUudWZyWzJdICsgdGhpcy5jdWJlU3RhdGUudWZyWzBdO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51ZnIgPSB0aGlzLmN1YmVTdGF0ZS5kZnJbMV0gKyB0aGlzLmN1YmVTdGF0ZS5kZnJbMF0gKyB0aGlzLmN1YmVTdGF0ZS5kZnJbMl07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRmciA9IHRoaXMuY3ViZVN0YXRlLmRyYlsyXSArIHRoaXMuY3ViZVN0YXRlLmRyYlswXSArIHRoaXMuY3ViZVN0YXRlLmRyYlsxXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZHJiID0gdG1wWzJdICsgdG1wWzFdICsgdG1wWzBdO1xuICAgIH1cbiAgICA7XG4gICAgVHdpc3RfRigpIHtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuY3ViZVN0YXRlLnVmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51ZiA9IHRoaXMuY3ViZVN0YXRlLmxmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5sZiA9IHRoaXMuY3ViZVN0YXRlLmRmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5kZiA9IHRoaXMuY3ViZVN0YXRlLmZyWzFdICsgdGhpcy5jdWJlU3RhdGUuZnJbMF07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmZyID0gdG1wWzFdICsgdG1wWzBdO1xuICAgICAgICB0bXAgPSB0aGlzLmN1YmVTdGF0ZS51ZnI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnVmciA9IHRoaXMuY3ViZVN0YXRlLnVsZlsxXSArIHRoaXMuY3ViZVN0YXRlLnVsZlsyXSArIHRoaXMuY3ViZVN0YXRlLnVsZlswXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUudWxmID0gdGhpcy5jdWJlU3RhdGUuZGxmWzFdICsgdGhpcy5jdWJlU3RhdGUuZGxmWzBdICsgdGhpcy5jdWJlU3RhdGUuZGxmWzJdO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5kbGYgPSB0aGlzLmN1YmVTdGF0ZS5kZnJbMl0gKyB0aGlzLmN1YmVTdGF0ZS5kZnJbMF0gKyB0aGlzLmN1YmVTdGF0ZS5kZnJbMV07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRmciA9IHRtcFsyXSArIHRtcFsxXSArIHRtcFswXTtcbiAgICB9XG4gICAgVHdpc3RfTCgpIHtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuY3ViZVN0YXRlLnVsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51bCA9IHRoaXMuY3ViZVN0YXRlLmJsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5ibCA9IHRoaXMuY3ViZVN0YXRlLmRsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5kbCA9IHRoaXMuY3ViZVN0YXRlLmxmWzFdICsgdGhpcy5jdWJlU3RhdGUubGZbMF07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmxmID0gdG1wWzFdICsgdG1wWzBdO1xuICAgICAgICB0bXAgPSB0aGlzLmN1YmVTdGF0ZS51bGY7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnVsZiA9IHRoaXMuY3ViZVN0YXRlLnVibFsxXSArIHRoaXMuY3ViZVN0YXRlLnVibFsyXSArIHRoaXMuY3ViZVN0YXRlLnVibFswXTtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUudWJsID0gdGhpcy5jdWJlU3RhdGUuZGJsWzFdICsgdGhpcy5jdWJlU3RhdGUuZGJsWzBdICsgdGhpcy5jdWJlU3RhdGUuZGJsWzJdO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5kYmwgPSB0aGlzLmN1YmVTdGF0ZS5kbGZbMl0gKyB0aGlzLmN1YmVTdGF0ZS5kbGZbMF0gKyB0aGlzLmN1YmVTdGF0ZS5kbGZbMV07XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRsZiA9IHRtcFsyXSArIHRtcFsxXSArIHRtcFswXTtcbiAgICB9XG4gICAgVHdpc3RfVSgpIHtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuY3ViZVN0YXRlLnVsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51bCA9IHRoaXMuY3ViZVN0YXRlLnVmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51ZiA9IHRoaXMuY3ViZVN0YXRlLnVyO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51ciA9IHRoaXMuY3ViZVN0YXRlLnViO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51YiA9IHRtcDtcbiAgICAgICAgdG1wID0gdGhpcy5jdWJlU3RhdGUudWxmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51bGYgPSB0aGlzLmN1YmVTdGF0ZS51ZnI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnVmciA9IHRoaXMuY3ViZVN0YXRlLnVyYjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUudXJiID0gdGhpcy5jdWJlU3RhdGUudWJsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS51YmwgPSB0bXA7XG4gICAgfVxuICAgIFR3aXN0X0QoKSB7XG4gICAgICAgIGxldCB0bXAgPSB0aGlzLmN1YmVTdGF0ZS5kbDtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGwgPSB0aGlzLmN1YmVTdGF0ZS5kYjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGIgPSB0aGlzLmN1YmVTdGF0ZS5kcjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZHIgPSB0aGlzLmN1YmVTdGF0ZS5kZjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGYgPSB0bXA7XG4gICAgICAgIHRtcCA9IHRoaXMuY3ViZVN0YXRlLmRsZjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGxmID0gdGhpcy5jdWJlU3RhdGUuZGJsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5kYmwgPSB0aGlzLmN1YmVTdGF0ZS5kcmI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLmRyYiA9IHRoaXMuY3ViZVN0YXRlLmRmcjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZGZyID0gdG1wO1xuICAgIH1cbiAgICBUd2lzdF9ZKCkge1xuICAgICAgICB0aGlzLlR3aXN0X1UoKTtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuY3ViZVN0YXRlLmxmO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5sZiA9IHRoaXMuY3ViZVN0YXRlLmZyO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5mciA9IHRoaXMuY3ViZVN0YXRlLnJiO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5yYiA9IHRoaXMuY3ViZVN0YXRlLmJsO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5ibCA9IHRtcDtcbiAgICAgICAgdG1wID0gdGhpcy5jdWJlU3RhdGUuZjtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUuZiA9IHRoaXMuY3ViZVN0YXRlLnI7XG4gICAgICAgIHRoaXMuY3ViZVN0YXRlLnIgPSB0aGlzLmN1YmVTdGF0ZS5iO1xuICAgICAgICB0aGlzLmN1YmVTdGF0ZS5iID0gdGhpcy5jdWJlU3RhdGUubDtcbiAgICAgICAgdGhpcy5jdWJlU3RhdGUubCA9IHRtcDtcbiAgICAgICAgdGhpcy5Ud2lzdF9EKCksIHRoaXMuVHdpc3RfRCgpLCB0aGlzLlR3aXN0X0QoKTtcbiAgICB9XG4gICAgY2hhbmdlU3RhdGUob3JkZXJfbGlzdCkge1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVyX2xpc3QpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3JkZXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9EKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfRCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9VKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfVSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X1UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9VKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfTCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0woKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9MKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfTCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRlwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0YoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9GKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfRigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0YoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlJcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9SKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfUigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X1IoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9SKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJCXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfQigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYlwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X0IoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9CKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfQigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiWVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X1koKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ud2lzdF9ZKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHdpc3RfWSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlR3aXN0X1koKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QmxvY2tQb3MoYmxvY2spIHtcbiAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChcIl5bXCIgKyBibG9jayArIFwiXXtcIiArIGJsb2NrLmxlbmd0aCArIFwifSRcIik7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuY3ViZVN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdWJlU3RhdGVba10ubWF0Y2gocmVnKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtcImtcIl0gPSBrO1xuICAgICAgICAgICAgICAgIHJlc3VsdFtcInZcIl0gPSB0aGlzLmN1YmVTdGF0ZVtrXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIEZJUlNUX0xBWUVSX0VER0VTX1NJTkdMRShibG9ja19wb3MsIGJsb2NrX2NvbG9yKSB7XG4gICAgICAgIGxldCBleHAgPSBcIlwiLCBleHBfbG9nID0gXCJcIjtcbiAgICAgICAgbGV0IHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBzID0gdGhpcy5nZXRCbG9ja1BvcyhibG9ja19jb2xvcik7XG4gICAgICAgICAgICBpZiAocy5rLmluZGV4T2YoXCJkXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMudlswXSA9PSBibG9ja19jb2xvclswXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5rID09IGJsb2NrX3BvcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHBfbG9nO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMV0udG9VcHBlckNhc2UoKSArIHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocy5rLmluZGV4T2YoXCJ1XCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMua1sxXSA9PSBibG9ja19wb3NbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudlswXSA9PSBibG9ja19jb2xvclswXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXS50b1VwcGVyQ2FzZSgpICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXSArIHRoaXMubmV4dEZhY2Vbcy5rWzFdXV0gIT1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3ViZVN0YXRlW2Jsb2NrX3Bvc1swXV0gKyB0aGlzLmN1YmVTdGF0ZVt0aGlzLm5leHRGYWNlW3Mua1sxXV1dKVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwID0gXCJ1XCIgKyB0aGlzLm5leHRGYWNlW3Mua1sxXV0gKyBzLmtbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwID0gXCJ1XCIgKyB0aGlzLm5leHRGYWNlW3Mua1sxXV0gKyBzLmtbMV0udG9VcHBlckNhc2UoKSArIHRoaXMubmV4dEZhY2Vbcy5rWzFdXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV4cCA9IFwiVVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHMudlswXSA9PSBibG9ja19jb2xvclswXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5rWzFdID09IGJsb2NrX3Bvc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jdWJlU3RhdGVbYmxvY2tfcG9zWzBdICsgcy5rWzFdXSAhPSB0aGlzLmN1YmVTdGF0ZVtibG9ja19wb3NbMF1dICsgdGhpcy5jdWJlU3RhdGVbcy5rWzFdXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMV0udG9VcHBlckNhc2UoKSArIFwiVVwiICsgcy5rWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMua1swXSA9PSBibG9ja19wb3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jdWJlU3RhdGVbYmxvY2tfcG9zWzBdICsgcy5rWzBdXSAhPSB0aGlzLmN1YmVTdGF0ZVtibG9ja19wb3NbMF1dICsgdGhpcy5jdWJlU3RhdGVbcy5rWzBdXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1swXTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwID0gcy5rWzBdICsgXCJVXCIgKyBzLmtbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBfbG9nICs9IGV4cDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoZXhwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpcnN0IExheWVyIENyb3NzIFNpbmdsZSBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJGaXJzdCBMYXllciBDcm9zcyBTaW5nbGUgRXJyb3I6IFwiICsgZXhwX2xvZztcbiAgICB9XG4gICAgRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoYmxvY2tfcG9zLCBibG9ja19jb2xvcikge1xuICAgICAgICBsZXQgZXhwID0gXCJcIiwgZXhwX2xvZyA9IFwiXCIsIHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgcyA9IHRoaXMuZ2V0QmxvY2tQb3MoYmxvY2tfY29sb3IpO1xuICAgICAgICAgICAgaWYgKHMuay5pbmRleE9mKFwiZFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChzLnZbMF0gPT0gdGhpcy5jdWJlU3RhdGVbXCJkXCJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmsgPT0gYmxvY2tfcG9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cF9sb2c7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXSArIFwiVVwiICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMudlsxXSA9PSB0aGlzLmN1YmVTdGF0ZVtcImRcIl0pXG4gICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1sxXSArIFwidVwiICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMl0udG9VcHBlckNhc2UoKSArIFwiVVwiICsgcy5rWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuayA9PSBcInVcIiArIGJsb2NrX3Bvc1sxXSArIGJsb2NrX3Bvc1syXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy52WzBdID09IHRoaXMuY3ViZVN0YXRlW1wiZFwiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IHMua1syXS50b1VwcGVyQ2FzZSgpICsgXCJ1XCIgKyBzLmtbMl07XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMudlsxXSA9PSB0aGlzLmN1YmVTdGF0ZVtcImRcIl0pXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMV0gKyBcInVcIiArIHMua1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBleHAgPSBzLmtbMl0udG9VcHBlckNhc2UoKSArIFwiVVwiICsgcy5rWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV4cCA9IFwiVVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwX2xvZyArPSBleHA7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKGV4cCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJGaXJzdCBMYXllciBDb3JuZXJzIFNpbmdsZSBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJGaXJzdCBMYXllciBDb3JuZXJzIFNpbmdsZSBFcnJvcjogXCIgKyBleHBfbG9nO1xuICAgIH1cbiAgICA7XG4gICAgU0VDT05EX0xBWUVSX1NJTkdMRShibG9ja19wb3MsIGJsb2NrX2NvbG9yKSB7XG4gICAgICAgIGxldCBleHAgPSBcIlwiLCBleHBfbG9nID0gXCJcIiwgcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIHMgPSB0aGlzLmdldEJsb2NrUG9zKGJsb2NrX2NvbG9yKTtcbiAgICAgICAgICAgIGlmIChzLmsuaW5kZXhPZihcInVcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0Q29sb3Jbcy52WzBdXSA9PSBzLnZbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudlsxXSA9PSB0aGlzLmN1YmVTdGF0ZVtzLmtbMV1dKVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwID0gXCJ1XCIgKyB0aGlzLnByZXZGYWNlW3Mua1sxXV0gKyBcIlVcIiArIHRoaXMucHJldkZhY2Vbcy5rWzFdXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIlVcIiArIHMua1sxXS50b1VwcGVyQ2FzZSgpICsgXCJ1XCIgKyBzLmtbMV07XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IFwiVVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudlsxXSA9PSB0aGlzLmN1YmVTdGF0ZVtzLmtbMV1dKVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwID0gXCJVXCIgKyB0aGlzLm5leHRGYWNlW3Mua1sxXV0udG9VcHBlckNhc2UoKSArIFwidVwiICsgdGhpcy5uZXh0RmFjZVtzLmtbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcInVcIiArIHMua1sxXSArIFwiVVwiICsgcy5rWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cCA9IFwiVVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzLnZbMF0gPT0gdGhpcy5jdWJlU3RhdGVbcy5rWzBdXSAmJiBzLnZbMV0gPT0gdGhpcy5jdWJlU3RhdGVbcy5rWzFdXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cF9sb2c7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBleHAgPSBcInVcIiArIHMua1swXSArIFwiVVwiICsgcy5rWzBdLnRvVXBwZXJDYXNlKCkgKyBcIlVcIiArIHMua1sxXS50b1VwcGVyQ2FzZSgpICsgXCJ1XCIgKyBzLmtbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBfbG9nICs9IGV4cDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoZXhwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZCBMYXllciBTaW5nbGUgRXJyb3I6IFwiLCBleHBfbG9nKTtcbiAgICAgICAgcmV0dXJuIFwiU2Vjb25kIExheWVyIFNpbmdsZSBFcnJvcjogXCIgKyBleHBfbG9nO1xuICAgIH1cbiAgICBGSVJTVF9MQVlFUl9FREdFUygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIEZJUlNUIExBWUVSIEVER0VTIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgbGV0IG9yZGVyID0gXCJcIjtcbiAgICAgICAgb3JkZXIgKz0gdGhpcy5GSVJTVF9MQVlFUl9FREdFU19TSU5HTEUoXCJkbFwiLCB0aGlzLmN1YmVTdGF0ZVtcImRcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImxcIl0pO1xuICAgICAgICBvcmRlciArPSB0aGlzLkZJUlNUX0xBWUVSX0VER0VTX1NJTkdMRShcImRmXCIsIHRoaXMuY3ViZVN0YXRlW1wiZFwiXSArIHRoaXMuY3ViZVN0YXRlW1wiZlwiXSk7XG4gICAgICAgIG9yZGVyICs9IHRoaXMuRklSU1RfTEFZRVJfRURHRVNfU0lOR0xFKFwiZHJcIiwgdGhpcy5jdWJlU3RhdGVbXCJkXCJdICsgdGhpcy5jdWJlU3RhdGVbXCJyXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gdGhpcy5GSVJTVF9MQVlFUl9FREdFU19TSU5HTEUoXCJkYlwiLCB0aGlzLmN1YmVTdGF0ZVtcImRcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImJcIl0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wcmVzcyhvcmRlcik7XG4gICAgfVxuICAgIDtcbiAgICBGSVJTVF9MQVlFUl9DT1JORVJTKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLSBDT01QTEVURSBUSEUgRklSU1QgTEFZRVIgQ09STkVSUyAtLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIGxldCBvcmRlciA9IFwiXCI7XG4gICAgICAgIG9yZGVyICs9IHRoaXMuRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkbGZcIiwgdGhpcy5jdWJlU3RhdGVbXCJkXCJdICsgdGhpcy5jdWJlU3RhdGVbXCJsXCJdICsgdGhpcy5jdWJlU3RhdGVbXCJmXCJdKTtcbiAgICAgICAgb3JkZXIgKz0gdGhpcy5GSVJTVF9MQVlFUl9DT1JORVJTX1NJTkdMRShcImRmclwiLCB0aGlzLmN1YmVTdGF0ZVtcImRcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImZcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcInJcIl0pO1xuICAgICAgICBvcmRlciArPSB0aGlzLkZJUlNUX0xBWUVSX0NPUk5FUlNfU0lOR0xFKFwiZHJiXCIsIHRoaXMuY3ViZVN0YXRlW1wiZFwiXSArIHRoaXMuY3ViZVN0YXRlW1wiclwiXSArIHRoaXMuY3ViZVN0YXRlW1wiYlwiXSk7XG4gICAgICAgIG9yZGVyICs9IHRoaXMuRklSU1RfTEFZRVJfQ09STkVSU19TSU5HTEUoXCJkYmxcIiwgdGhpcy5jdWJlU3RhdGVbXCJkXCJdICsgdGhpcy5jdWJlU3RhdGVbXCJiXCJdICsgdGhpcy5jdWJlU3RhdGVbXCJsXCJdKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHJlc3Mob3JkZXIpO1xuICAgIH1cbiAgICBTRUNPTkRfTEFZRVIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBTRUNPTkQgTEFZRVIgLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICBsZXQgb3JkZXIgPSBcIlwiO1xuICAgICAgICBvcmRlciArPSB0aGlzLlNFQ09ORF9MQVlFUl9TSU5HTEUoXCJsZlwiLCB0aGlzLmN1YmVTdGF0ZVtcImxcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImZcIl0pO1xuICAgICAgICBvcmRlciArPSB0aGlzLlNFQ09ORF9MQVlFUl9TSU5HTEUoXCJmclwiLCB0aGlzLmN1YmVTdGF0ZVtcImZcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcInJcIl0pO1xuICAgICAgICBvcmRlciArPSB0aGlzLlNFQ09ORF9MQVlFUl9TSU5HTEUoXCJyYlwiLCB0aGlzLmN1YmVTdGF0ZVtcInJcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImJcIl0pO1xuICAgICAgICBvcmRlciArPSB0aGlzLlNFQ09ORF9MQVlFUl9TSU5HTEUoXCJibFwiLCB0aGlzLmN1YmVTdGF0ZVtcImJcIl0gKyB0aGlzLmN1YmVTdGF0ZVtcImxcIl0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wcmVzcyhvcmRlcik7XG4gICAgfVxuICAgIDtcbiAgICBUT1BfQ1JPU1MoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBUT1AgQ1JPU1MgLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICBsZXQgZXhwID0gXCJcIiwgZXhwX2xvZyA9IFwiXCI7XG4gICAgICAgIGxldCB1YyA9IHRoaXMuY3ViZVN0YXRlW1widVwiXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1YmVTdGF0ZS51bFswXSA9PSB1YyAmJiB0aGlzLmN1YmVTdGF0ZS51clswXSA9PSB1Y1xuICAgICAgICAgICAgICAgICYmIHRoaXMuY3ViZVN0YXRlLnVmWzBdID09IHVjICYmIHRoaXMuY3ViZVN0YXRlLnViWzBdID09IHVjKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXByZXNzKGV4cF9sb2cpO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jdWJlU3RhdGUudWxbMF0gPT0gdWMgJiYgdGhpcy5jdWJlU3RhdGUudXJbMF0gPT0gdWMpXG4gICAgICAgICAgICAgICAgZXhwID0gXCJGUlVydWZcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY3ViZVN0YXRlLnVmWzBdID09IHVjICYmIHRoaXMuY3ViZVN0YXRlLnViWzBdID09IHVjKVxuICAgICAgICAgICAgICAgIGV4cCA9IFwiUkJVYnVyXCI7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmN1YmVTdGF0ZS51ZlswXSA9PSB1YyAmJiB0aGlzLmN1YmVTdGF0ZS51clswXSA9PSB1YylcbiAgICAgICAgICAgICAgICBleHAgPSBcIkZSVXJ1ZlwiO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jdWJlU3RhdGUudXJbMF0gPT0gdWMgJiYgdGhpcy5jdWJlU3RhdGUudWJbMF0gPT0gdWMpXG4gICAgICAgICAgICAgICAgZXhwID0gXCJSQlVidXJcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY3ViZVN0YXRlLnViWzBdID09IHVjICYmIHRoaXMuY3ViZVN0YXRlLnVsWzBdID09IHVjKVxuICAgICAgICAgICAgICAgIGV4cCA9IFwiQkxVbHViXCI7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmN1YmVTdGF0ZS51bFswXSA9PSB1YyAmJiB0aGlzLmN1YmVTdGF0ZS51ZlswXSA9PSB1YylcbiAgICAgICAgICAgICAgICBleHAgPSBcIkxGVWZ1bFwiO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGV4cCA9IFwiRlJVcnVmXCI7XG4gICAgICAgICAgICBleHBfbG9nICs9IGV4cDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoZXhwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvcCBDcm9zcyBFcnJvcjogXCIsIGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gXCJUb3AgQ3Jvc3MgRXJyb3I6IFwiICsgZXhwX2xvZztcbiAgICB9XG4gICAgO1xuICAgIFRISVJEX0xBWUVSX0NPUk5FUlNfUE9TKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLSBDT01QTEVURSBUSEUgVEhJUkQgTEFZRVIgQ09STkVSUyAoUE9TSVRJT04pIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IFwickxVbHVSVUx1bFwiLCBibG9ja3MgPSBbXCJ1bGZcIiwgXCJ1ZnJcIiwgXCJ1cmJcIiwgXCJ1YmxcIl0sIHVjID0gdGhpcy5jdWJlU3RhdGVbXCJ1XCJdO1xuICAgICAgICBsZXQgZXhwX2xvZyA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IGk7XG4gICAgICAgICAgICBsZXQgdGltZXMgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaSArIDQ7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBqICUgNDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGMgPSB0aGlzLmN1YmVTdGF0ZVtibG9ja3NbbGFzdF1dLnJlcGxhY2UodWMsIFwiXCIpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0YyA9IHRoaXMuY3ViZVN0YXRlW2Jsb2Nrc1tuZXh0XV0ucmVwbGFjZSh1YywgXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dENvbG9yW2xhc3RjWzBdXSA9PSBsYXN0Y1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dGMuaW5kZXhPZihsYXN0Y1sxXSkgIT0gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIG5leHRjLmluZGV4T2YodGhpcy5uZXh0Q29sb3JbbGFzdGNbMV1dKSAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRjLmluZGV4T2YobGFzdGNbMF0pICE9IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBuZXh0Yy5pbmRleE9mKHRoaXMubmV4dENvbG9yW2xhc3RjWzBdXSkgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdCA9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGltZXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxhc3QgPSAobGFzdCAtIDEgKyA0KSAlIDQ7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgZXhwX2xvZyA9IFwidVwiICsgc3RlcCwgdGhpcy5jaGFuZ2VTdGF0ZShleHBfbG9nKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0ID09IDEpXG4gICAgICAgICAgICAgICAgICAgIGV4cF9sb2cgPSBzdGVwLCB0aGlzLmNoYW5nZVN0YXRlKGV4cF9sb2cpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhc3QgPT0gMilcbiAgICAgICAgICAgICAgICAgICAgZXhwX2xvZyA9IFwiVVwiICsgc3RlcCwgdGhpcy5jaGFuZ2VTdGF0ZShleHBfbG9nKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0ID09IDMpXG4gICAgICAgICAgICAgICAgICAgIGV4cF9sb2cgPSBcIlVVXCIgKyBzdGVwLCB0aGlzLmNoYW5nZVN0YXRlKGV4cF9sb2cpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXByZXNzKGV4cF9sb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGltZXMgPiAxKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXByZXNzKGV4cF9sb2cpO1xuICAgICAgICB9XG4gICAgICAgIGV4cF9sb2cgPSBzdGVwICsgXCJVXCIgKyBzdGVwO1xuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKGV4cF9sb2cpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wcmVzcyhleHBfbG9nKTtcbiAgICB9XG4gICAgVEhJUkRfTEFZRVJfQ09STkVSU19PUkkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tIENPTVBMRVRFIFRIRSBUSElSRCBMQVlFUiBDT1JORVJTIChPUklFTlQpIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgY29uc3Qgc3RlcDEgPSBcInJ1UnVydXVSdXVcIiwgc3RlcDIgPSBcIkZVZlVGVVVmVVVcIjtcbiAgICAgICAgY29uc3QgYmxvY2tzID0gW1widWxmXCIsIFwidWZyXCIsIFwidXJiXCIsIFwidWJsXCJdLCB1YyA9IHRoaXMuY3ViZVN0YXRlW1widVwiXTtcbiAgICAgICAgbGV0IGV4cF9sb2cgPSBcIlwiLCBzID0gXCJcIjtcbiAgICAgICAgZm9yIChjb25zdCBibG9jayBvZiBibG9ja3MpXG4gICAgICAgICAgICBzICs9IHRoaXMuY3ViZVN0YXRlW2Jsb2NrXS5pbmRleE9mKHVjKTtcbiAgICAgICAgaWYgKHMubWF0Y2goLzIyMjB8MDIyMnwyMDIyfDIyMDIvKSkge1xuICAgICAgICAgICAgaWYgKHMgPT0gXCIwMjIyXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gXCIyMDIyXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMjIwMlwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJ1XCI7XG4gICAgICAgICAgICBleHBfbG9nICs9IHN0ZXAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzExMTB8MDExMXwxMDExfDExMDEvKSkge1xuICAgICAgICAgICAgaWYgKHMgPT0gXCIwMTExXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gXCIxMDExXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMTEwMVwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJ1XCI7XG4gICAgICAgICAgICBleHBfbG9nICs9IHN0ZXAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzIwMDF8MTIwMHwwMTIwfDAwMTIvKSkge1xuICAgICAgICAgICAgaWYgKHMgPT0gXCIxMjAwXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gXCIwMTIwXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMDAxMlwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJ1XCI7XG4gICAgICAgICAgICBleHBfbG9nICs9IHN0ZXAxICsgXCJVXCIgKyBzdGVwMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzLm1hdGNoKC8xMDAyfDIxMDB8MDIxMHwwMDIxLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMjEwMFwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJVXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChzID09IFwiMDIxMFwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJVVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjAwMjFcIilcbiAgICAgICAgICAgICAgICBleHBfbG9nICs9IFwidVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMiArIFwiVVwiICsgc3RlcDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5tYXRjaCgvMjEyMXwxMjEyLykpIHtcbiAgICAgICAgICAgIGlmIChzID09IFwiMTIxMlwiKVxuICAgICAgICAgICAgICAgIGV4cF9sb2cgKz0gXCJVXCI7XG4gICAgICAgICAgICBleHBfbG9nICs9IHN0ZXAyICsgXCJVVVwiICsgc3RlcDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5tYXRjaCgvMjExMnwyMjExfDEyMjF8MTEyMi8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjIyMTFcIilcbiAgICAgICAgICAgICAgICBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAocyA9PSBcIjEyMjFcIilcbiAgICAgICAgICAgICAgICBleHBfbG9nICs9IFwiVVVcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gXCIxMTIyXCIpXG4gICAgICAgICAgICAgICAgZXhwX2xvZyArPSBcInVcIjtcbiAgICAgICAgICAgIGV4cF9sb2cgKz0gc3RlcDEgKyBcIlVcIiArIHN0ZXAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzAyMDF8MTAyMC8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjEwMjBcIilcbiAgICAgICAgICAgICAgICBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMSArIFwiVVVcIiArIHN0ZXAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMubWF0Y2goLzAxMDJ8MjAxMC8pKSB7XG4gICAgICAgICAgICBpZiAocyA9PSBcIjIwMTBcIilcbiAgICAgICAgICAgICAgICBleHBfbG9nICs9IFwiVVwiO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBzdGVwMiArIFwiVVVcIiArIHN0ZXAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoZXhwX2xvZyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXByZXNzKGV4cF9sb2cpO1xuICAgIH1cbiAgICBUSElSRF9MQVlFUl9FREdFUygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0gQ09NUExFVEUgVEhFIFRISVJEIExBWUVSIEVER0VTIC0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgY29uc3Qgc3RlcDEgPSBcInJ1UnVydXVSdXVcIiwgc3RlcDIgPSBcIkZVZlVGVVVmVVVcIjtcbiAgICAgICAgbGV0IGV4cF9sb2cgPSBcIlwiO1xuICAgICAgICB3aGlsZSAodGhpcy5jdWJlU3RhdGUudWxmWzJdICE9IHRoaXMuY3ViZVN0YXRlLmYpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXCJVXCIpO1xuICAgICAgICAgICAgZXhwX2xvZyArPSBcIlVcIjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGV4cCA9IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5jdWJlU3RhdGUudWZbMV0gKyB0aGlzLmN1YmVTdGF0ZS51clsxXSArIHRoaXMuY3ViZVN0YXRlLnViWzFdICsgdGhpcy5jdWJlU3RhdGUudWxbMV07XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5jdWJlU3RhdGUuZiArIHRoaXMuY3ViZVN0YXRlLnIgKyB0aGlzLmN1YmVTdGF0ZS5iICsgdGhpcy5jdWJlU3RhdGUubDtcbiAgICAgICAgICAgIGxldCB0aW1lcyA9IDAsIHBvcyA9IC0xO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tqXSA9PSBjW2pdKVxuICAgICAgICAgICAgICAgICAgICB0aW1lcysrLCBwb3MgPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVzID4gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wcmVzcyhleHBfbG9nKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRpbWVzID09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09IDEpXG4gICAgICAgICAgICAgICAgICAgIGV4cCArPSBcIllcIjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3MgPT0gMilcbiAgICAgICAgICAgICAgICAgICAgZXhwICs9IFwiWVlcIjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3MgPT0gMylcbiAgICAgICAgICAgICAgICAgICAgZXhwICs9IFwieVwiO1xuICAgICAgICAgICAgICAgIGlmIChzWyhwb3MgKyAxKSAlIDRdID09IHRoaXMubmV4dENvbG9yW3RoaXMubmV4dENvbG9yW3NbcG9zXV1dKVxuICAgICAgICAgICAgICAgICAgICBleHAgKz0gc3RlcDEgKyBzdGVwMjtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGV4cCArPSBcInlcIiArIHN0ZXAyICsgc3RlcDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXhwICs9IHN0ZXAxICsgc3RlcDI7XG4gICAgICAgICAgICBleHBfbG9nICs9IGV4cDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoZXhwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXJkIExheWVyIEVkZ2VzIEVycm9yOiBcIiwgZXhwX2xvZyk7XG4gICAgICAgIHJldHVybiBcIlRoaXJkIExheWVyIEVkZ2VzIEVycm9yOiBcIiArIGV4cF9sb2c7XG4gICAgfVxuICAgIHNvbHZlQ3ViZSgpIHtcbiAgICAgICAgbGV0IHN0ZXBzID0gW107XG4gICAgICAgIHN0ZXBzLnB1c2godGhpcy5GSVJTVF9MQVlFUl9FREdFUygpKTtcbiAgICAgICAgc3RlcHMucHVzaCh0aGlzLkZJUlNUX0xBWUVSX0NPUk5FUlMoKSk7XG4gICAgICAgIHN0ZXBzLnB1c2godGhpcy5TRUNPTkRfTEFZRVIoKSk7XG4gICAgICAgIHN0ZXBzLnB1c2godGhpcy5UT1BfQ1JPU1MoKSk7XG4gICAgICAgIHN0ZXBzLnB1c2godGhpcy5USElSRF9MQVlFUl9DT1JORVJTX1BPUygpKTtcbiAgICAgICAgc3RlcHMucHVzaCh0aGlzLlRISVJEX0xBWUVSX0NPUk5FUlNfT1JJKCkpO1xuICAgICAgICBzdGVwcy5wdXNoKHRoaXMuVEhJUkRfTEFZRVJfRURHRVMoKSk7XG4gICAgICAgIHJldHVybiBzdGVwcztcbiAgICB9XG4gICAgO1xuICAgIGNvbXByZXNzKG9yZGVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgb3JkZXIgPSBvcmRlci5yZXBsYWNlKC91VXxVdXxkRHxEZHxsTHxMbHxmRnxGZnxyUnxScnxiQnxCYnx5WXxZeXx1dXV1fGRkZGR8bGxsbHxmZmZmfHJycnJ8YmJiYnx5eXl5fFVVVVV8RERERHxMTExMfEZGRkZ8UlJSUnxCQkJCfFlZWVkvZywgXCJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3V1dS9nLCBcIlVcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2RkZC9nLCBcIkRcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2xsbC9nLCBcIkxcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2ZmZi9nLCBcIkZcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3Jyci9nLCBcIlJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL2JiYi9nLCBcIkJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL3l5eS9nLCBcIllcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL1VVVS9nLCBcInVcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL0RERC9nLCBcImRcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL0xMTC9nLCBcImxcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL0ZGRi9nLCBcImZcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL1JSUi9nLCBcInJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL0JCQi9nLCBcImJcIik7XG4gICAgICAgICAgICBvcmRlciA9IG9yZGVyLnJlcGxhY2UoL1lZWS9nLCBcInlcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cbiAgICBzb2x2ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLmdldEN1YmVTdGF0ZShzdGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNvbHZlQ3ViZSgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUd2lzdCB7XG4gICAgY29uc3RydWN0b3IoZGVwYXR1cmUsIGFycml2YWwsIGR1cmF0aW9uLCBjYWxsYmFja19mdW5jKSB7XG4gICAgICAgIHRoaXMuZGVwYXJ0dXJlID0gZGVwYXR1cmU7XG4gICAgICAgIHRoaXMuYXJyaXZhbCA9IGFycml2YWw7XG4gICAgICAgIHRoaXMuZHVyYW50aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuY2FsbGJhY2tfZnVuYyA9IGNhbGxiYWNrX2Z1bmM7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gdGhpcy5kdXJhbnRpb247XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuYXJyaXZhbDtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCsrO1xuICAgICAgICBjb25zdCBmcmFjID0gTWF0aC5taW4oTWF0aC5tYXgodGhpcy5lbGFwc2VkIC8gdGhpcy5kdXJhbnRpb24sIDApLCAxKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gZnJhYyA9PSAxID8gdGhpcy5hcnJpdmFsIDogKHRoaXMuZGVwYXJ0dXJlICsgKHRoaXMuYXJyaXZhbCAtIHRoaXMuZGVwYXJ0dXJlKSAqICgxIC0gKDEgLSBmcmFjKSAqICgxIC0gZnJhYykpKTtcbiAgICB9XG4gICAgY2FsbGJhY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrX2Z1bmModGhpcy5jdXJyZW50KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgVHdpc3RlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHdpc3RzID0gW107XG4gICAgICAgIHRoaXMubG9vcCgpO1xuICAgIH1cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGxldCBjdXIgPSAwO1xuICAgICAgICBsZXQgZW5kID0gdGhpcy50d2lzdHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoY3VyIDwgZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnR3aXN0c1tjdXJdLnVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMudHdpc3RzW2N1cl0uY2FsbGJhY2soKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHdpc3RzLnNwbGljZShjdXIsIDEpO1xuICAgICAgICAgICAgICAgIGVuZC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluaXNoKHR3aXN0ID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0d2lzdCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR3aXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR3aXN0c1tpXSA9PSB0d2lzdCkge1xuICAgICAgICAgICAgICAgICAgICB0d2lzdC5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d2lzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0d2lzdHMgPSB0aGlzLnR3aXN0cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHR3aXN0IG9mIHR3aXN0cykge1xuICAgICAgICAgICAgICAgIHR3aXN0LmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhbmNlbCh0d2lzdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHdpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50d2lzdHNbaV0gPT0gdHdpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3aXN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNUd2lzdGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHdpc3RzLmxlbmd0aCAhPSAwO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCB0d2lzdGVyID0gbmV3IFR3aXN0ZXIoKTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgRmFjZSwgRnJhbWUsIFN0aWNrZXIgfSBmcm9tIFwiLi91dGlsc19pbnRlcm5hbFwiO1xuZXhwb3J0IGNvbnN0IGN1YmVfY29uZmlnID0ge1xuICAgIGZyYW1lczogMzAsXG4gICAgc2Vuc2liaWxpdHk6IDI1ICogMWUtNCxcbiAgICBzY3JhbWJsZV9zdGVwczogMjAsXG4gICAgc29sdmVySWQ6IDEsXG59O1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29sb3JzID0ge1xuICAgIFI6IFwiI0I3MUMxQ1wiLFxuICAgIEw6IFwiI0ZGNkQwMFwiLFxuICAgIFU6IFwiI0YwRjBGMFwiLFxuICAgIEQ6IFwiI0ZGRDYwMFwiLFxuICAgIEY6IFwiIzAwQTAyMFwiLFxuICAgIEI6IFwiIzBENDdBMVwiLFxuICAgIGNvcmU6IFwiIzIwMjAyMFwiLFxuICAgIGdyYXk6IFwiIzgwODA4MFwiLFxuICAgIGhpZ2g6IFwiI0ZGMDA4MFwiLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2RlZnMgPSB7XG4gICAgc2l6ZTogNjQsXG4gICAgX2JvcmRlcl93aWR0aDogMyxcbiAgICBfZWRnZV93aWR0aDogMixcbiAgICBfc3RpY2tlcl9kZXB0aDogMC4xLFxufTtcbmV4cG9ydCBjb25zdCBjdWJlbGV0X2ZyYW1lID0gbmV3IEZyYW1lKGN1YmVsZXRfZGVmcy5zaXplLCBjdWJlbGV0X2RlZnMuX2JvcmRlcl93aWR0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9sYW1iZXJzID0gKCgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjdWJlbGV0X2NvbG9ycykge1xuICAgICAgICByZXN1bHRba2V5XSA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGN1YmVsZXRfY29sb3JzW2tleV0gfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGN1YmVsZXRfY29yZSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7XG4gICAgY29sb3I6IGN1YmVsZXRfY29sb3JzLmNvcmUsXG4gICAgc3BlY3VsYXI6IGN1YmVsZXRfY29sb3JzLmdyYXksXG4gICAgc2hpbmluZXNzOiAyLFxufSk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9zdGlja2VyID0gbmV3IFN0aWNrZXIoY3ViZWxldF9kZWZzLnNpemUgLSAyICogY3ViZWxldF9kZWZzLl9ib3JkZXJfd2lkdGggLSBjdWJlbGV0X2RlZnMuX2VkZ2Vfd2lkdGgsIGN1YmVsZXRfZGVmcy5fc3RpY2tlcl9kZXB0aCk7XG5leHBvcnQgY29uc3QgY3ViZWxldF9mYWNlX2F0dHJzID0gW1xuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci54ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuTCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDAsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoMCwgLU1hdGguUEkgLyAyLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci54ID09IDE7IH0sXG4gICAgICAgIGxhbWJlcnQ6IGN1YmVsZXRfbGFtYmVycy5SLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoY3ViZWxldF9kZWZzLnNpemUgLyAyLCAwLCAwKSxcbiAgICAgICAgcm90YXRpb246IG5ldyBWZWN0b3IzKDAsIE1hdGguUEkgLyAyLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci55ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuRCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoTWF0aC5QSSAvIDIsIDAsIDApLFxuICAgIH0sXG4gICAge1xuICAgICAgICBtYXRjaDogKHZlY3RvcikgPT4geyByZXR1cm4gdmVjdG9yLnkgPT0gMTsgfSxcbiAgICAgICAgbGFtYmVydDogY3ViZWxldF9sYW1iZXJzLlUsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMygwLCBjdWJlbGV0X2RlZnMuc2l6ZSAvIDIsIDApLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoLU1hdGguUEkgLyAyLCAwLCAwKSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbWF0Y2g6ICh2ZWN0b3IpID0+IHsgcmV0dXJuIHZlY3Rvci56ID09IC0xOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuQixcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIDAsIC1jdWJlbGV0X2RlZnMuc2l6ZSAvIDIpLFxuICAgICAgICByb3RhdGlvbjogbmV3IFZlY3RvcjMoTWF0aC5QSSwgMCwgMCksXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG1hdGNoOiAodmVjdG9yKSA9PiB7IHJldHVybiB2ZWN0b3IueiA9PSAxOyB9LFxuICAgICAgICBsYW1iZXJ0OiBjdWJlbGV0X2xhbWJlcnMuRixcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIDAsIGN1YmVsZXRfZGVmcy5zaXplIC8gMiksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgVmVjdG9yMygyICogTWF0aC5QSSwgMCwgMCksXG4gICAgfSxcbl07XG5leHBvcnQgY29uc3QgY3ViZV9zaXplID0gY3ViZWxldF9kZWZzLnNpemUgKiAzO1xuZXhwb3J0IGNvbnN0IGF4aXNfdmVjdG9ycyA9IHtcbiAgICBhOiBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKSxcbiAgICB4OiBuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksXG4gICAgeTogbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLFxuICAgIHo6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcbn07XG5leHBvcnQgY29uc3QgYXhpc19wbGFuZXMgPSB7XG4gICAgeDogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAtY3ViZV9zaXplIC8gMiksXG4gICAgeTogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCAtY3ViZV9zaXplIC8gMiksXG4gICAgejogbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAtY3ViZV9zaXplIC8gMilcbn07XG5leHBvcnQgY29uc3QgaW5kZXhUb0RpcmVjdGlvbiA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyhpbmRleCAlIDMgLSAxLCBNYXRoLmZsb29yKGluZGV4IC8gMykgJSAzIC0gMSwgTWF0aC5mbG9vcihpbmRleCAvIDkpIC0gMSk7XG59O1xuZXhwb3J0IGNvbnN0IGRpcmVjdGlvblRvSW5kZXggPSAoZHJjdG4pID0+IHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoZHJjdG4ueCArIDEpICsgKGRyY3RuLnkgKyAxKSAqIDMgKyAoZHJjdG4ueiArIDEpICogOSk7XG59O1xuZXhwb3J0IGNvbnN0IGluZGV4VG9MYXllciA9IChpbmRleCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgeDogaW5kZXggJSAzLCB5OiBNYXRoLmZsb29yKGluZGV4IC8gMykgJSAzLCB6OiBNYXRoLmZsb29yKGluZGV4IC8gOSkgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydCBjb25zdCB3b3JsZFRvSW5kZXggPSAocG9pbnQpID0+IHtcbiAgICBjb25zdCB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLmNvcHkocG9pbnQpO1xuICAgIHZlY3Rvci5hZGQobmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoY3ViZV9zaXplIC8gMikpO1xuICAgIHZlY3Rvci5kaXZpZGVTY2FsYXIoY3ViZV9zaXplKS5tdWx0aXBseVNjYWxhcigzKS5mbG9vcigpO1xuICAgIHZlY3Rvci5tYXgobmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoMCkpO1xuICAgIHZlY3Rvci5taW4obmV3IFZlY3RvcjMoKS5zZXRTY2FsYXIoMikpO1xuICAgIHJldHVybiB2ZWN0b3IueCArIHZlY3Rvci55ICogMyArIHZlY3Rvci56ICogOTtcbn07XG5leHBvcnQgY29uc3QgZmFjZVBvc3Rpb25CaW5kaW5ncyA9IFtcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuTCxcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLlIsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKVxuICAgIH0sXG4gICAge1xuICAgICAgICBmYWNlOiBGYWNlLkQsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMClcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5VLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMClcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZmFjZTogRmFjZS5CLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZhY2U6IEZhY2UuRixcbiAgICAgICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpXG4gICAgfSxcbl07XG5leHBvcnQgY29uc3Qgc3RyaW5nVG9Ud2lzdFBhcmFtcyA9IHtcbiAgICBcIkxcIjogeyBheGlzOiAneCcsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJMJ1wiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiTDJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIlJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzJdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIlInXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsyXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiUjJcIjogeyBheGlzOiAneCcsIGxheWVyczogWzJdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwiRlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiRidcIjogeyBheGlzOiAneicsIGxheWVyczogWzJdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJGMlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJCXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiQidcIjogeyBheGlzOiAneicsIGxheWVyczogWzBdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIkIyXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJVXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsyXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJVJ1wiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMl0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIlUyXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsyXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcIkRcIjogeyBheGlzOiAneScsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJEJ1wiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMF0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwiRDJcIjogeyBheGlzOiAneScsIGxheWVyczogWzBdLCBhbmdsZTogLU1hdGguUEkgfSxcbiAgICBcIn5cIjogeyBheGlzOiAnYScsIGxheWVyczogW10sIGFuZ2xlOiAwIH0sXG4gICAgXCJ4XCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJ4J1wiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIngyXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcInlcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcInknXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFswLCAxLCAyXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwieTJcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwielwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwieidcIjogeyBheGlzOiAneicsIGxheWVyczogWzAsIDEsIDJdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJ6MlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMCwgMSwgMl0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJsXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwibCdcIjogeyBheGlzOiAneCcsIGxheWVyczogWzAsIDFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcImwyXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJyXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJyJ1wiOiB7IGF4aXM6ICd4JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcInIyXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IE1hdGguUEkgfSxcbiAgICBcImZcIjogeyBheGlzOiAneicsIGxheWVyczogWzIsIDFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcImYnXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsyLCAxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiZjJcIjogeyBheGlzOiAneicsIGxheWVyczogWzIsIDFdLCBhbmdsZTogTWF0aC5QSSB9LFxuICAgIFwiYlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMCwgMV0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcImInXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJiMlwiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMCwgMV0sIGFuZ2xlOiAtTWF0aC5QSSB9LFxuICAgIFwidVwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiBNYXRoLlBJIC8gMiB9LFxuICAgIFwidSdcIjogeyBheGlzOiAneScsIGxheWVyczogWzIsIDFdLCBhbmdsZTogLU1hdGguUEkgLyAyIH0sXG4gICAgXCJ1MlwiOiB7IGF4aXM6ICd5JywgbGF5ZXJzOiBbMiwgMV0sIGFuZ2xlOiBNYXRoLlBJIH0sXG4gICAgXCJkXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiZCdcIjogeyBheGlzOiAneScsIGxheWVyczogWzAsIDFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcImQyXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFswLCAxXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJFXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiRSdcIjogeyBheGlzOiAneScsIGxheWVyczogWzFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIkUyXCI6IHsgYXhpczogJ3knLCBsYXllcnM6IFsxXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJNXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsxXSwgYW5nbGU6IC1NYXRoLlBJIC8gMiB9LFxuICAgIFwiTSdcIjogeyBheGlzOiAneCcsIGxheWVyczogWzFdLCBhbmdsZTogTWF0aC5QSSAvIDIgfSxcbiAgICBcIk0yXCI6IHsgYXhpczogJ3gnLCBsYXllcnM6IFsxXSwgYW5nbGU6IC1NYXRoLlBJIH0sXG4gICAgXCJTXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsxXSwgYW5nbGU6IE1hdGguUEkgLyAyIH0sXG4gICAgXCJTJ1wiOiB7IGF4aXM6ICd6JywgbGF5ZXJzOiBbMV0sIGFuZ2xlOiAtTWF0aC5QSSAvIDIgfSxcbiAgICBcIlMyXCI6IHsgYXhpczogJ3onLCBsYXllcnM6IFsxXSwgYW5nbGU6IE1hdGguUEkgfSxcbn07XG5leHBvcnQgY29uc3QgbGJsT3JkZXJNYXBwaW5nID0ge1xuICAgIFwiVVwiOiBcIlVcIixcbiAgICBcInVcIjogXCJVJ1wiLFxuICAgIFwiRFwiOiBcIkRcIixcbiAgICBcImRcIjogXCJEJ1wiLFxuICAgIFwiRlwiOiBcIkZcIixcbiAgICBcImZcIjogXCJGJ1wiLFxuICAgIFwiTFwiOiBcIkxcIixcbiAgICBcImxcIjogXCJMJ1wiLFxuICAgIFwiUlwiOiBcIlJcIixcbiAgICBcInJcIjogXCJSJ1wiLFxuICAgIFwiQlwiOiBcIkJcIixcbiAgICBcImJcIjogXCJCJ1wiLFxuICAgIFwiWVwiOiBcInlcIixcbiAgICBcInlcIjogXCJ5J1wiXG59O1xuZXhwb3J0IGNvbnN0IGZhY2VUb0NvbG9yID0ge1xuICAgIFwiVVwiOiBcIndcIixcbiAgICBcIkZcIjogXCJnXCIsXG4gICAgXCJSXCI6IFwiclwiLFxuICAgIFwiQlwiOiBcImJcIixcbiAgICBcIkRcIjogXCJ5XCIsXG4gICAgXCJMXCI6IFwib1wiXG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5leHBvcnQgdmFyIEZhY2U7XG4oZnVuY3Rpb24gKEZhY2UpIHtcbiAgICBGYWNlW0ZhY2VbXCJMXCJdID0gMF0gPSBcIkxcIjtcbiAgICBGYWNlW0ZhY2VbXCJSXCJdID0gMV0gPSBcIlJcIjtcbiAgICBGYWNlW0ZhY2VbXCJEXCJdID0gMl0gPSBcIkRcIjtcbiAgICBGYWNlW0ZhY2VbXCJVXCJdID0gM10gPSBcIlVcIjtcbiAgICBGYWNlW0ZhY2VbXCJCXCJdID0gNF0gPSBcIkJcIjtcbiAgICBGYWNlW0ZhY2VbXCJGXCJdID0gNV0gPSBcIkZcIjtcbn0pKEZhY2UgfHwgKEZhY2UgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIEZyYW1lIGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGJvcmRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBvID0gc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IGkgPSBvIC0gYm9yZGVyO1xuICAgICAgICBjb25zdCBfdmVydHMgPSBbXG4gICAgICAgICAgICAtaSwgK2ksICtvLFxuICAgICAgICAgICAgK2ksICtpLCArbyxcbiAgICAgICAgICAgICtpLCAtaSwgK28sXG4gICAgICAgICAgICAtaSwgLWksICtvLFxuICAgICAgICAgICAgLWksICtvLCAtaSxcbiAgICAgICAgICAgICtpLCArbywgLWksXG4gICAgICAgICAgICAraSwgK28sICtpLFxuICAgICAgICAgICAgLWksICtvLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgLWksXG4gICAgICAgICAgICAtbywgK2ksIC1pLFxuICAgICAgICAgICAgLW8sICtpLCAraSxcbiAgICAgICAgICAgIC1vLCAtaSwgK2ksXG4gICAgICAgICAgICAraSwgK2ksIC1vLFxuICAgICAgICAgICAgLWksICtpLCAtbyxcbiAgICAgICAgICAgIC1pLCAtaSwgLW8sXG4gICAgICAgICAgICAraSwgLWksIC1vLFxuICAgICAgICAgICAgLWksIC1vLCAraSxcbiAgICAgICAgICAgICtpLCAtbywgK2ksXG4gICAgICAgICAgICAraSwgLW8sIC1pLFxuICAgICAgICAgICAgLWksIC1vLCAtaSxcbiAgICAgICAgICAgICtvLCAraSwgK2ksXG4gICAgICAgICAgICArbywgK2ksIC1pLFxuICAgICAgICAgICAgK28sIC1pLCAtaSxcbiAgICAgICAgICAgICtvLCAtaSwgK2ksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwicG9zaXRpb25cIiwgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoX3ZlcnRzLCAzKSk7XG4gICAgICAgIHRoaXMuc2V0SW5kZXgoRnJhbWUuX2luZGljZXMpO1xuICAgICAgICB0aGlzLmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG4gICAgfVxufVxuRnJhbWUuX2luZGljZXMgPSBbXG4gICAgMCwgMiwgMSxcbiAgICAwLCAzLCAyLFxuICAgIDQsIDYsIDUsXG4gICAgNCwgNywgNixcbiAgICA4LCAxMCwgOSxcbiAgICA4LCAxMSwgMTAsXG4gICAgMTIsIDE0LCAxMyxcbiAgICAxMiwgMTUsIDE0LFxuICAgIDE2LCAxOCwgMTcsXG4gICAgMTYsIDE5LCAxOCxcbiAgICAyMCwgMjIsIDIxLFxuICAgIDIwLCAyMywgMjIsXG4gICAgMSwgNiwgNyxcbiAgICAwLCAxLCA3LFxuICAgIDMsIDAsIDEwLFxuICAgIDExLCAzLCAxMCxcbiAgICAxNywgMiwgMyxcbiAgICAxNiwgMTcsIDMsXG4gICAgMjMsIDIwLCAxLFxuICAgIDIsIDIzLCAxLFxuICAgIDUsIDEyLCAxMyxcbiAgICA0LCA1LCAxMyxcbiAgICA5LCAxMywgMTQsXG4gICAgOCwgOSwgMTQsXG4gICAgMjIsIDE1LCAxMixcbiAgICAyMSwgMjIsIDEyLFxuICAgIDE5LCAxNCwgMTUsXG4gICAgMTgsIDE5LCAxNSxcbiAgICA3LCA0LCA5LFxuICAgIDEwLCA3LCA5LFxuICAgIDExLCA4LCAxOSxcbiAgICAxNiwgMTEsIDE5LFxuICAgIDIzLCAxNywgMTgsXG4gICAgMjIsIDIzLCAxOCxcbiAgICAyMCwgMjEsIDUsXG4gICAgNiwgMjAsIDUsXG4gICAgMjAsIDYsIDEsXG4gICAgMTAsIDAsIDcsXG4gICAgMjEsIDEyLCA1LFxuICAgIDEzLCA5LCA0LFxuICAgIDIzLCAyLCAxNyxcbiAgICAxMSwgMTYsIDMsXG4gICAgMjIsIDE4LCAxNSxcbiAgICA4LCAxNCwgMTksXG5dO1xuZXhwb3J0IGNsYXNzIFN0aWNrZXIgZXh0ZW5kcyBUSFJFRS5FeHRydWRlR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIGRlcHRoKSB7XG4gICAgICAgIHNpemUgPSBzaXplIC8gMjtcbiAgICAgICAgY29uc3QgbGVmdCA9IC1zaXplO1xuICAgICAgICBjb25zdCBib3R0b20gPSBzaXplO1xuICAgICAgICBjb25zdCB0b3AgPSAtc2l6ZTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBzaXplO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBzaXplIC8gNDtcbiAgICAgICAgY29uc3Qgc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcbiAgICAgICAgc2hhcGUubW92ZVRvKGxlZnQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhsZWZ0LCBib3R0b20gLSByYWRpdXMpO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIGJvdHRvbSwgbGVmdCArIHJhZGl1cywgYm90dG9tKTtcbiAgICAgICAgc2hhcGUubGluZVRvKHJpZ2h0IC0gcmFkaXVzLCBib3R0b20pO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKHJpZ2h0LCBib3R0b20sIHJpZ2h0LCBib3R0b20gLSByYWRpdXMpO1xuICAgICAgICBzaGFwZS5saW5lVG8ocmlnaHQsIHRvcCArIHJhZGl1cyk7XG4gICAgICAgIHNoYXBlLnF1YWRyYXRpY0N1cnZlVG8ocmlnaHQsIHRvcCwgcmlnaHQgLSByYWRpdXMsIHRvcCk7XG4gICAgICAgIHNoYXBlLmxpbmVUbyhsZWZ0ICsgcmFkaXVzLCB0b3ApO1xuICAgICAgICBzaGFwZS5xdWFkcmF0aWNDdXJ2ZVRvKGxlZnQsIHRvcCwgbGVmdCwgdG9wICsgcmFkaXVzKTtcbiAgICAgICAgc2hhcGUuY2xvc2VQYXRoKCk7XG4gICAgICAgIHN1cGVyKHNoYXBlLCB7IGJldmVsRW5hYmxlZDogZmFsc2UsIGRlcHRoOiBkZXB0aCB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBDdWJlIGZyb20gXCIuL2N1YmVcIjtcbmltcG9ydCB7IGN1YmVsZXRfZGVmcyB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zY2VuZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NlbmUucm90YXRpb24ueCA9IE1hdGguUEkgLyA2O1xuICAgICAgICB0aGlzLnNjZW5lLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMTY7XG4gICAgICAgIHRoaXMuYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDAuOSk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uYWwgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC4xKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbC5wb3NpdGlvbi5zZXQoY3ViZWxldF9kZWZzLnNpemUsIGN1YmVsZXRfZGVmcy5zaXplICogMywgY3ViZWxldF9kZWZzLnNpemUgKiAyKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5hbWJpZW50KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5kaXJlY3Rpb25hbCk7XG4gICAgICAgIHRoaXMuc2NlbmUudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmN1YmUgPSBuZXcgQ3ViZSgpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmN1YmUpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmUgPSA5O1xuICAgIH1cbiAgICBzZXQgZGlydHkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jdWJlLmRpcnR5ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkaXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3ViZS5kaXJ0eTtcbiAgICB9XG4gICAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcbiAgICB9XG4gICAgdXBkYXRlQ2FtZXJhKCkge1xuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLmhlaWdodCAvIE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIHRoaXMuc2NhbGUgLyB0aGlzLnBlcnNwZWN0aXZlO1xuICAgICAgICBjb25zdCBmb3YgPSAoMiAqIE1hdGguYXRhbihtaW4pICogMTgwKSAvIE1hdGguUEk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gY3ViZWxldF9kZWZzLnNpemUgKiAzICogdGhpcy5wZXJzcGVjdGl2ZSAqIDAuOTtcbiAgICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbWVyYS5mb3YgPSBmb3Y7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSBkaXN0YW5jZTtcbiAgICAgICAgdGhpcy5jYW1lcmEubmVhciA9IGRpc3RhbmNlIC0gY3ViZWxldF9kZWZzLnNpemUgKiAzO1xuICAgICAgICB0aGlzLmNhbWVyYS5mYXIgPSBkaXN0YW5jZSArIGN1YmVsZXRfZGVmcy5zaXplICogODtcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBWZWN0b3IzKDAsIDAsIDMwKSk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWV0aWZ5IGZyb20gXCJ2dWV0aWZ5XCI7XG5pbXBvcnQgXCJ2dWV0aWZ5L2Rpc3QvdnVldGlmeS5taW4uY3NzXCI7XG5pbXBvcnQgXCJtYXRlcmlhbC1kZXNpZ24taWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCI7XG5pbXBvcnQgUGxheWdyb3VuZCBmcm9tIFwiLi92dWVhcHAvcGxheWdyb3VuZFwiO1xuVnVlLnVzZShWdWV0aWZ5KTtcbmNvbnN0IG9wdHMgPSB7fTtcbmNvbnN0IHZ1ZXRpZnkgPSBuZXcgVnVldGlmeShvcHRzKTtcblZ1ZS5wcm90b3R5cGUudnVldGlmeSA9IHZ1ZXRpZnk7XG5sZXQgYXBwID0gUGxheWdyb3VuZDtcbmNvbnN0IHZtID0gbmV3IFZ1ZSh7XG4gICAgdnVldGlmeSxcbiAgICBlbDogXCIjYXBwXCIsXG4gICAgcmVuZGVyOiAoaCkgPT4gaChhcHApLFxufSk7XG4iLCJpbXBvcnQgeyBfX2RlY29yYXRlLCBfX21ldGFkYXRhIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgUHJvdmlkZSwgUmVmLCBXYXRjaCB9IGZyb20gXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uL3ZpZXdwb3J0XCI7XG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uL2N1YmUvd29ybGRcIjtcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi9zZXR0aW5nXCI7XG5pbXBvcnQgeyBjdWJlX2NvbmZpZywgZmFjZVRvQ29sb3IsIGxibE9yZGVyTWFwcGluZywgc3RyaW5nVG9Ud2lzdFBhcmFtcyB9IGZyb20gXCIuLi8uLi9jdWJlL3V0aWxzXCI7XG5pbXBvcnQgeyBUd2lzdCwgdHdpc3RlciB9IGZyb20gXCIuLi8uLi9jdWJlL3R3aXN0ZXJcIjtcbmltcG9ydCBJbnRlcmFjdG9yIGZyb20gXCIuLi8uLi9jdWJlL2ludGVyYWN0b3JcIjtcbmltcG9ydCBDYXB0dXJlciBmcm9tIFwiLi4vLi4vY3ViZS9jYXB0dXJlXCI7XG5pbXBvcnQgTEJMU29sdmVyIGZyb20gXCIuLi8uLi9jdWJlL2xibFwiO1xubGV0IFBsYXlncm91bmQgPSBjbGFzcyBQbGF5Z3JvdW5kIGV4dGVuZHMgVnVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLnNvbHV0aW9uID0gW107XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleSA9IDA7XG4gICAgICAgIHRoaXMuaW5pdFN0YXRlID0gW107XG4gICAgICAgIHRoaXMuY3ViZWpzQ3ViZSA9IHJlcXVpcmUoJ2N1YmVqcycpO1xuICAgICAgICB0aGlzLmVsYXBzZWRGcmFtZXMgPSAwO1xuICAgICAgICB0aGlzLmVsYXBzZWRGcmFtZXNUaHJlc2hvbGQgPSAxNTtcbiAgICAgICAgdGhpcy5saXN0ZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhcHR1cmVyID0gbmV3IENhcHR1cmVyKCk7XG4gICAgICAgIHRoaXMuZGVtb0RhdGEgPSByZXF1aXJlKCcuL2RlbW9zLmpzb24nKTtcbiAgICAgICAgdGhpcy5kZW1vSW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMuZGVtb0dyaWRXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaXNEZW1vTW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxibFNvbHZlciA9IG5ldyBMQkxTb2x2ZXIoKTtcbiAgICAgICAgdGhpcy5zaG93VGlja3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrdXBTdGF0ZSA9IFtdO1xuICAgIH1cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmN1YmVqc0N1YmUuaW5pdFNvbHZlcigpO1xuICAgICAgICB0aGlzLmludGVyYWN0b3IgPSBuZXcgSW50ZXJhY3RvcihbXG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LmNhbnZhc0VsZW0sXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvcC1mbGV4XCIpLFxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3R0b20tZmxleFwiKVxuICAgICAgICBdLCB0aGlzLndvcmxkLmNvbnRyb2xsZXIuaW50ZXJhY3QpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGVtb0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGVtb0ltYWdlcy5wdXNoKHRoaXMuY2FwdHVyZXIuZ2VuZXJhdGUodGhpcy5kZW1vRGF0YVtpXS5zdGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKHRoaXMucmVzaXplKTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudmlld3BvcnQuZHJhdygpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnNpemUgPSBNYXRoLmNlaWwoTWF0aC5taW4odGhpcy53aWR0aCAvIDYsIHRoaXMuaGVpZ2h0IC8gMTIpKTtcbiAgICAgICAgdGhpcy5kZW1vR3JpZFdpZHRoID0gfn4oTWF0aC5taW4odGhpcy5zaXplICogMiwgdGhpcy53aWR0aCAvIDQpICogMTAwKSAvIDEwMDtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5yZXNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgLSB0aGlzLnNpemUgKiAzLjUpO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBzY3JhbWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUuc2NyYW1ibGUoKTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMud29ybGQuY3ViZS5yZXNldCgpO1xuICAgIH1cbiAgICBpZGxlKHZhbHVlKSB7XG4gICAgICAgIHR3aXN0ZXIudHdpc3RzLnB1c2gobmV3IFR3aXN0KDAsIE1hdGguUEksIGN1YmVfY29uZmlnLmZyYW1lcyAqIHZhbHVlLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh2YWx1ZSAtIE1hdGguUEkpIDwgMWUtNjtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBzb2x2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVyTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5iYWNrdXBTdGF0ZSA9IHRoaXMud29ybGQuY3ViZS5zZXJpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdFN0YXRlID0gdGhpcy53b3JsZC5jdWJlLnNlcmlhbGl6ZSgpO1xuICAgICAgICBjb25zdCBzb2x2ZXJJZCA9IGN1YmVfY29uZmlnLnNvbHZlcklkO1xuICAgICAgICBpZiAoc29sdmVySWQgPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgbGJsU3RhdGUgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmFjZVN0YXRlIG9mIHRoaXMuaW5pdFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgbGJsU3RhdGUucHVzaChmYWNlVG9Db2xvcltmYWNlU3RhdGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxibFNvbHV0aW9uID0gdGhpcy5sYmxTb2x2ZXIuc29sdmUobGJsU3RhdGUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb24gPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGJsUGhhc2Ugb2YgbGJsU29sdXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYmxPcmRlcnMgPSBsYmxQaGFzZS5zcGxpdChcIlwiKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBvZiBsYmxPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGxibE9yZGVyTWFwcGluZ1tvcmRlcl07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvbHV0aW9uLnB1c2goc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zb2x1dGlvbi5wdXNoKFwiflwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNvbHV0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2x1dGlvbi5wdXNoKFwiflwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYmxTb2x1dGlvbi5sZW5ndGggPD0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpY2tzID0gXCJhbHdheXNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpY2tzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc29sdmVySWQgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb24gPSB0aGlzLmN1YmVqc0N1YmVcbiAgICAgICAgICAgICAgICAuZnJvbVN0cmluZyh0aGlzLmluaXRTdGF0ZSlcbiAgICAgICAgICAgICAgICAuc29sdmUoKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpLlxuICAgICAgICAgICAgICAgIGZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb24ucHVzaChcIn5cIik7XG4gICAgICAgICAgICB0aGlzLnNob3dUaWNrcyA9IFwiYWx3YXlzXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbml0U3RhdGUuam9pbihcIlwiKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc29sdXRpb24uam9pbihcIiBcIikpO1xuICAgICAgICB0aGlzLnNldFByb2dyZXNzKDApO1xuICAgICAgICB0aGlzLmlkbGUoMC41KTtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBvblBsYXllck1vZGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMud29ybGQuY29udHJvbGxlci5sb2NrID0gdGhpcy5pc1BsYXllck1vZGU7XG4gICAgfVxuICAgIG9uUGxheWluZ0NoYW5nZSgpIHtcbiAgICAgICAgdGhpcy53b3JsZC5jb250cm9sbGVyLmRpc2FibGUgPSB0aGlzLmlzUGxheWluZztcbiAgICB9XG4gICAgY2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGxheWVyTW9kZSAmJiB0aGlzLmlzUGxheWluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPT0gdGhpcy5zb2x1dGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPCB0aGlzLnNvbHV0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICghdHdpc3Rlci5pc1R3aXN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gc3RyaW5nVG9Ud2lzdFBhcmFtc1t0aGlzLnNvbHV0aW9uW3RoaXMucHJvZ3Jlc3NdXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBsYXllciBvZiBwYXJhbXMubGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmN1YmUudGFibGUuZ3JvdXBzW3BhcmFtcy5heGlzXVtsYXllcl0udHdpc3QocGFyYW1zLmFuZ2xlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkRnJhbWVzIDwgdGhpcy5lbGFwc2VkRnJhbWVzVGhyZXNob2xkKSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWRGcmFtZXMrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA9PSB0aGlzLnNvbHV0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcbiAgICAgICAgICAgIHRoaXMuaWRsZSgxLjUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHF1aXQoKSB7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJNb2RlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzRGVtb01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEZW1vTW9kZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud29ybGQuY3ViZS5yZXN0b3JlKHRoaXMuYmFja3VwU3RhdGUpO1xuICAgIH1cbiAgICBzZXRQcm9ncmVzcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLndvcmxkLmN1YmUucmVzdG9yZSh0aGlzLmluaXRTdGF0ZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gc3RyaW5nVG9Ud2lzdFBhcmFtc1t0aGlzLnNvbHV0aW9uW2ldXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgcGFyYW1zLmxheWVycykge1xuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuY3ViZS50YWJsZS5ncm91cHNbcGFyYW1zLmF4aXNdW2xheWVyXS50d2lzdChwYXJhbXMuYW5nbGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ3JlZW5CdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWRGcmFtZXMgPCB0aGlzLmVsYXBzZWRGcmFtZXNUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsYXBzZWRGcmFtZXMgPSAwO1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNjcmFtYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBibHVlQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5lbGFwc2VkRnJhbWVzIDwgdGhpcy5lbGFwc2VkRnJhbWVzVGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGFwc2VkRnJhbWVzID0gMDtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVyTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZEJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZEZyYW1lcyA8IHRoaXMuZWxhcHNlZEZyYW1lc1RocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxhcHNlZEZyYW1lcyA9IDA7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXllck1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucXVpdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdERlbW8oaWR4KSB7XG4gICAgICAgIHRoaXMubGlzdGQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVyTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5iYWNrdXBTdGF0ZSA9IHRoaXMud29ybGQuY3ViZS5zZXJpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRGVtb01vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGxheWVyTW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVtb05hbWUgPSB0aGlzLmRlbW9EYXRhW2lkeF0ubmFtZTtcbiAgICAgICAgdGhpcy5pbml0U3RhdGUgPSB0aGlzLmRlbW9EYXRhW2lkeF0uc3RhdGUuc3BsaXQoXCJcIik7XG4gICAgICAgIHRoaXMuc29sdXRpb24gPSB0aGlzLmRlbW9EYXRhW2lkeF0uc29sdXRpb24uc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIHRoaXMuc29sdXRpb24ucHVzaChcIn5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdFN0YXRlLmpvaW4oXCJcIikpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvbHV0aW9uLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgUHJvdmlkZShcIndvcmxkXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJ3b3JsZFwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgUmVmKFwidmlld3BvcnRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFZpZXdwb3J0KVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwidmlld3BvcnRcIiwgdm9pZCAwKTtcbl9fZGVjb3JhdGUoW1xuICAgIFdhdGNoKFwiaXNQbGF5ZXJNb2RlXCIpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBGdW5jdGlvbiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnJldHVybnR5cGVcIiwgdm9pZCAwKVxuXSwgUGxheWdyb3VuZC5wcm90b3R5cGUsIFwib25QbGF5ZXJNb2RlQ2hhbmdlXCIsIG51bGwpO1xuX19kZWNvcmF0ZShbXG4gICAgV2F0Y2goXCJpc1BsYXlpbmdcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXG5dLCBQbGF5Z3JvdW5kLnByb3RvdHlwZSwgXCJvblBsYXlpbmdDaGFuZ2VcIiwgbnVsbCk7XG5QbGF5Z3JvdW5kID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIHZpZXdwb3J0OiBWaWV3cG9ydCxcbiAgICAgICAgICAgIHNldHRpbmc6IFNldHRpbmcsXG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgUGxheWdyb3VuZCk7XG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiaW1wb3J0IHsgX19kZWNvcmF0ZSwgX19tZXRhZGF0YSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwidnVlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuaW1wb3J0IHsgY3ViZV9jb25maWcgfSBmcm9tIFwiLi4vLi4vY3ViZS91dGlsc1wiO1xuaW1wb3J0IFZ1ZVNsaWRlciBmcm9tICd2dWUtc2xpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgJ3Z1ZS1zbGlkZXItY29tcG9uZW50L3RoZW1lL2RlZmF1bHQuY3NzJztcbmxldCBTZXR0aW5nID0gY2xhc3MgU2V0dGluZyBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcbiAgICB9XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9XG4gICAgcmVzaXplKCkge1xuICAgICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IE1hdGguY2VpbChNYXRoLm1pbih0aGlzLndpZHRoIC8gNiwgdGhpcy5oZWlnaHQgLyAxMikpO1xuICAgIH1cbiAgICBnZXQgc2Vuc2liaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zZW5zaWJpbGl0eSAqIDFlNDtcbiAgICB9XG4gICAgc2V0IHNlbnNpYmlsaXR5KHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLnNlbnNpYmlsaXR5ID0gdmFsdWUgKiAxZS00O1xuICAgIH1cbiAgICBnZXQgZnJhbWVzKCkge1xuICAgICAgICByZXR1cm4gY3ViZV9jb25maWcuZnJhbWVzO1xuICAgIH1cbiAgICBzZXQgZnJhbWVzKHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLmZyYW1lcyA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgc2NyYW1ibGVfc3RlcHMoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zY3JhbWJsZV9zdGVwcztcbiAgICB9XG4gICAgc2V0IHNjcmFtYmxlX3N0ZXBzKHZhbHVlKSB7XG4gICAgICAgIGN1YmVfY29uZmlnLnNjcmFtYmxlX3N0ZXBzID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBzb2x2ZXJfaWQoKSB7XG4gICAgICAgIHJldHVybiBjdWJlX2NvbmZpZy5zb2x2ZXJJZDtcbiAgICB9XG4gICAgc2V0IHNvbHZlcl9pZCh2YWx1ZSkge1xuICAgICAgICBjdWJlX2NvbmZpZy5zb2x2ZXJJZCA9IHZhbHVlO1xuICAgIH1cbn07XG5TZXR0aW5nID0gX19kZWNvcmF0ZShbXG4gICAgQ29tcG9uZW50KHtcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFZ1ZVNsaWRlclxuICAgICAgICB9XG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgU2V0dGluZyk7XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xuIiwiaW1wb3J0IHsgX19kZWNvcmF0ZSwgX19tZXRhZGF0YSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgUmVmIH0gZnJvbSBcInZ1ZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi8uLi9jdWJlL3dvcmxkXCI7XG5sZXQgVmlld3BvcnQgPSBjbGFzcyBWaWV3cG9ydCBleHRlbmRzIFZ1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhc0VsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXNFbGVtLnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgICAgICAgIGNhbnZhczogY2FudmFzRWxlbSxcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgICAgIGFscGhhOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICAgIHRoaXMuY2FudmFzRWxlbSA9IGNhbnZhc0VsZW07XG4gICAgfVxuICAgIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud29ybGQucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCwgdHJ1ZSk7XG4gICAgfVxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcmxkLmRpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLndvcmxkLnNjZW5lLCB0aGlzLndvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICB0aGlzLndvcmxkLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgSW5qZWN0KFwid29ybGRcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIFdvcmxkKVxuXSwgVmlld3BvcnQucHJvdG90eXBlLCBcIndvcmxkXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICBSZWYoXCJjYW52YXNcIiksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEhUTUxFbGVtZW50KVxuXSwgVmlld3BvcnQucHJvdG90eXBlLCBcImNhbnZhc1wiLCB2b2lkIDApO1xuVmlld3BvcnQgPSBfX2RlY29yYXRlKFtcbiAgICBDb21wb25lbnQoe1xuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaW5kZXguaHRtbFwiKSxcbiAgICAgICAgY29tcG9uZW50czoge30sXG4gICAgfSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjpwYXJhbXR5cGVzXCIsIFtdKVxuXSwgVmlld3BvcnQpO1xuZXhwb3J0IGRlZmF1bHQgVmlld3BvcnQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3J1Ymlrc2N1YmVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rcnViaWtzY3ViZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=