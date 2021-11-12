import Vue from "vue";
import { Component, Inject, Provide, Ref } from "vue-property-decorator";
import Viewport from "../../cube/viewport";
import World from "../../cube/world";


@Component({
    template: require("./index.html"),
    components: {
        viewport: Viewport
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
        this.viewport.resize(this.width, this.height - this.size * 2);
    }
    
}