import Vue from "vue";
import { Component, Provide, Ref, Watch } from "vue-property-decorator";
import Viewport from "../viewport";
import World from "../../cube/world";
import Setting from "../setting";
import { cube_config, stringToTwistParams } from "../../cube/utils";
import { Twist, twister } from "../../cube/twister";
import Interactor from "../../cube/interactor";

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

    Cube = require('cubejs');

    elapsedframes: number = 0;
    interactor: Interactor;

    constructor() {
        super();
    }

    mounted(): void {
        this.Cube.initSolver();
        this.interactor = new Interactor([
            this.viewport.canvasElem,
            document.getElementById("top-flex"),
            document.getElementById("bottom-flex")
        ], this.world.controller.interact);
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
        this.isPlayerMode = true;
        this.initState = this.world.cube.serialize();
        this.solution = this.Cube
            .fromString(this.initState)
            .solve()
            .split(' ').
            filter(Boolean);
        this.solution.push("~");
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

        if (this.elapsedframes < cube_config.frames) {
            this.elapsedframes++;
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
    }

    setProgress(value: number) {
        this.isPlaying = false;

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
        if (!this.isPlayerMode) {
            this.scramble();
        } else {
            this.play();
        }
    }
    
    blueButton(): void {
        if (!this.isPlayerMode) {
            this.reset();
        } else {
            this.pause();
        }
    }

    redButton(): void {
        if (this.elapsedframes < cube_config.frames) {
            return;
        }

        if (!this.isPlayerMode) {
            this.solve();
        } else {
            this.quit();
        }

        this.elapsedframes = 0;
    }
}