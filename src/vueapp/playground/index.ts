import Vue from "vue";
import { Component, Provide, Ref, Watch } from "vue-property-decorator";
import Viewport from "../viewport";
import World from "../../cube/world";
import Setting from "../setting";
import { cube_config, faceToColor, lblOrderMapping, stringToTwistParams } from "../../cube/utils";
import { Twist, twister } from "../../cube/twister";
import Interactor from "../../cube/interactor";
import Capturer from "../../cube/capture";
import LBLSolver from "../../cube/lbl";

@Component({
    template: require("./index.html"),
    components: {
        viewport: Viewport,
        setting: Setting,
    },
})

export default class Playground extends Vue {
    @Provide("world")
    world = new World();

    @Ref("viewport")
    viewport: Viewport;

    width: number = 0;
    height: number = 0;
    size: number = 0;

    solution: string[] = [];
    progress: number = 0;

    isPlayerMode: boolean = false;
    isPlaying: boolean = false;
    key: number = 0;
    initState: string[] = [];

    cubejsCube = require('cubejs');

    elapsedFrames: number = 0;
    elapsedFramesThreshold: number = 15;

    interactor: Interactor;

    listd: boolean = false;
    capturer: Capturer = new Capturer();
    demoData = require('./demos.json');
    demoImages: string[] = [];
    demoGridWidth: number = 0;
    demoName: string;
    isDemoMode: boolean = false;
    lblSolver = new LBLSolver();
    showTicks: Boolean | string = false;
    backupState: string[] = [];

    constructor() {
        super();
    }

    mounted(): void {
        this.cubejsCube.initSolver();
        this.interactor = new Interactor([
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

    loop(): void {
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
        this.callback();
    }

    resize(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
        this.demoGridWidth = ~~(Math.min(this.size * 2, this.width / 4) * 100) / 100;
        this.viewport.resize(this.width, this.height - this.size * 3.5);
        this.world.cube.dirty = true;
    }

    scramble(): void {
        this.reset();
        this.world.cube.scramble();
    }

    reset(): void {
        this.world.cube.reset();
    }

    idle(value: number): void {
        twister.twists.push(new Twist(0, Math.PI, cube_config.frames * value, (value: number) => {
            return Math.abs(value - Math.PI) < 1e-6;
        }));
    }

    solve(): void {
        if (!this.isPlayerMode) {
            this.backupState = this.world.cube.serialize();
        }
        this.isPlayerMode = true;
        this.initState = this.world.cube.serialize();

        const solverId = cube_config.solverId;
        if (solverId == 0) {
            const lblState: string[] = [];
            for (const faceState of this.initState) {
                lblState.push(faceToColor[faceState]);
            }
            const lblSolution = this.lblSolver.solve(lblState).filter(Boolean);
            this.solution = [];
            for (const lblPhase of lblSolution) {
                const lblOrders = lblPhase.split("").filter(Boolean);
                for (const order of lblOrders) {
                    const step = lblOrderMapping[order];
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
            } else {
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

    @Watch("isPlayerMode")
    onPlayerModeChange(): void {
        this.world.controller.lock = this.isPlayerMode;
    }

    @Watch("isPlaying")
    onPlayingChange(): void {
        this.world.controller.disable = this.isPlaying;
    }

    callback(): void {
        if (this.isPlayerMode && this.isPlaying) {
            if (this.progress == this.solution.length) {
                this.isPlaying = false;
            }
            if (this.progress < this.solution.length) {
                if (!twister.isTwisting()) {
                    const params = stringToTwistParams[this.solution[this.progress]];
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

    play(): void {
        if (this.progress == this.solution.length) {
            this.setProgress(0);
            this.idle(1.5);
        }
        this.isPlaying = true;
    }

    pause(): void {
        this.isPlaying = false;
    }

    quit(): void {
        this.isPlaying = false;
        this.isPlayerMode = false;
        if (this.isDemoMode) {
            this.isDemoMode = false;
        }
        this.world.cube.restore(this.backupState);
    }

    setProgress(value: number) {
        this.isPlaying = false;

        /*
        this.world.cube.restore(this.initState);
        for (let i = this.solution.length - 1; i >= value; i--) {
            const params = stringToTwistParams[this.solution[i]];
            for (const layer of params.layers) {
                this.world.cube.table.groups[params.axis][layer].twist(params.angle * -1, true);
            }
        }
        */

        this.world.cube.restore(this.initState);
        for (let i = 0; i < value; i++) {
            const params = stringToTwistParams[this.solution[i]];
            for (const layer of params.layers) {
                this.world.cube.table.groups[params.axis][layer].twist(params.angle, true);
            }
        }

        this.progress = value;
    }

    greenButton(): void {
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;

        if (!this.isPlayerMode) {
            this.scramble();
        } else {
            this.play();
        }
    }

    blueButton(): void {
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;

        if (!this.isPlayerMode) {
            this.reset();
        } else {
            this.pause();
        }
    }

    redButton(): void {
        if (this.elapsedFrames < this.elapsedFramesThreshold) {
            return;
        }
        this.elapsedFrames = 0;

        if (!this.isPlayerMode) {
            this.solve();
        } else {
            this.quit();
        }

    }

    selectDemo(idx: number): void {
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
}