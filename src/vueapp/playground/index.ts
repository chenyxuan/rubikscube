import Vue from "vue";
import { Component, Inject, Provide, Ref, Watch } from "vue-property-decorator";
import Viewport from "../viewport";
import World from "../../cube/world";
import Setting from "../setting";
import Solver from "../../solver/Solver";
import { cube_config, stringToTwistParams } from "../../cube/utils";
import { twister } from "../../cube/twister";

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
    solver: Solver = new Solver();
    key: number = 0;

    constructor() {
        super();
    }

    mounted(): void {
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

    solve(): void {
        this.isPlayerMode = true;
        const state = this.world.cube.serialize();
        this.solution = this.solver.solve(state).split(' ').filter(Boolean);
        this.solution.push("~");
        console.log(this.solution);
        this.progress = 0;
        this.isPlaying = true;
    }

    @Watch("isPlayerMode")
    onPlayerModeChange(): void {
        this.world.controller.disable = this.isPlayerMode;
    }

    callback(): void {
        if(this.isPlayerMode && this.isPlaying) {
            if(this.progress == this.solution.length) {
                this.isPlaying = false;
            }
            if(this.progress < this.solution.length) {
                if(!twister.isTwisting()) {
                    const params = stringToTwistParams[this.solution[this.progress]];
                    this.world.cube.table.groups[params.axis][params.layer].twist(params.angle, false);
                    this.progress++;
                }
            }
        }
    }

    play(): void {
        this.isPlaying = true;
    }

    pause(): void {
        this.isPlaying = false;
    }

    quit(): void {
        this.isPlayerMode = false;
    }

   set_progress(value: number) {
        this.isPlaying = false;

        this.world.cube.restore();
        for(let i = 0; i < value; i++) {
            const params = stringToTwistParams[this.solution[i]];
            this.world.cube.table.groups[params.axis][params.layer].twist(params.angle, true);
        }

        this.progress = value;
    }
}