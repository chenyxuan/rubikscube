import Vue from "vue";
import { Component, Inject, Provide, Ref, Watch } from "vue-property-decorator";
import Viewport from "../viewport";
import World from "../../cube/world";
import Setting from "../setting";
import { cubelet_frame, cube_config, stringToTwistParams } from "../../cube/utils";
import { Twist, twister } from "../../cube/twister";

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

    Cube = require('cubejs');

    elapsedframes: number = 0;

    constructor() {
        super();
    }

    mounted(): void {
        this.Cube.initSolver();
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
        this.viewport.resize(this.width, this.height - this.size * 2.5);
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
        if (this.elapsedframes < cube_config.frames) {
            return;
        }

        this.isPlayerMode = true;
        const state = this.world.cube.serialize();
        const cube = this.Cube.fromString(state);
        this.solution = cube.solve().split(' ').filter(Boolean);
        this.solution.push("~");
        console.log(this.solution);
        this.set_progress(0);
        this.idle(0.5);
        this.isPlaying = true;

        this.elapsedframes = 0;
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
            this.set_progress(0);
            this.idle(1.5);
        }
        this.isPlaying = true;
    }

    pause(): void {
        this.isPlaying = false;
    }

    quit(): void {
        if (this.elapsedframes < cube_config.frames) {
            return;
        }

        this.isPlayerMode = false;

        this.elapsedframes = 0;
    }

    set_progress(value: number) {
        this.isPlaying = false;

        this.world.cube.restore();
        for (let i = 0; i < value; i++) {
            const params = stringToTwistParams[this.solution[i]];
            for (const layer of params.layers) {
                this.world.cube.table.groups[params.axis][layer].twist(params.angle, true);
            }
        }

        this.progress = value;
    }
}