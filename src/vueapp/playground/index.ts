import Vue from "vue";
import { Component, Inject, Provide, Ref, Watch } from "vue-property-decorator";
import Viewport from "../viewport";
import World from "../../cube/world";
import Setting from "../setting";
import Solver from "../../solver/Solver";

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

    isPlayerMode: boolean = false;
    isPlaying: boolean = false;
    solver: Solver = new Solver();
    solution: string[];
    _progress: number;

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
        this._progress = 0;
    }

    @Watch("isPlayerMode")
    onPlayingChange(): void {
        this.world.controller.disable = this.isPlayerMode;
    }

    play(): void {

    }

    pause(): void {

    }

    quit(): void {
        this.isPlayerMode = false;
    }

    set progress(value: number) {
        this._progress = value;
    }

    get progress(): number {
        return this._progress;
    }

    thumb_label_prop(): string | boolean {
        return this._progress !=0 ? 'always' : false;
    }

    thumb_label_slot(): string {
        return this._progress == 0 ? '#' : this.solution[this._progress - 1];
    }
}