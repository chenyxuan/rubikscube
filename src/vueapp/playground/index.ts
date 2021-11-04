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

    width: number;
    height: number;

    constructor() {
        super();
    }

    mounted(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.viewport.resize(this.width, this.calcuViewportHeight(this.width, this.height));
        this.loop();
    }

    loop(): void {
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
    }

    calcuViewportHeight(width: number, height: number) {
        return height - Math.ceil(Math.min(width / 6, height / 12)) * 1.5;
    }
}