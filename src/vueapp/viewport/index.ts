import Vue from "vue";
import { Component, Inject, Ref } from "vue-property-decorator";
import * as THREE from "three";
import Interactor from "../../cube/interactor";
import World from "../../cube/world";

@Component({
    template: require("./index.html"),
    components: {},
})

export default class Viewport extends Vue {
    @Inject("world")
    world: World;

    @Ref("canvas")
    canvas: HTMLElement;

    renderer: THREE.WebGLRenderer;

    interactor: Interactor;

    constructor() {
        super();
        const canvasElem = document.createElement("canvas");
        canvasElem.style.outline = "none"
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasElem,
            antialias: true,
            alpha: true
        });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(0, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.interactor = new Interactor(canvasElem, this.world.controller.interact);
    }

    resize(width: number, height: number): void {
        this.world.resize(width, height);
        this.renderer.setSize(width, height, true);
    }

    mounted(): void {
        this.canvas.appendChild(this.renderer.domElement);
    }

    draw(): void {
        if (this.world.dirty) {
            this.renderer.render(this.world.scene, this.world.camera);
            this.world.dirty = false;
        }
    }
}