import Vue from "vue";
import { Component } from "vue-property-decorator";
import { cube_config } from "../../cube/utils";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'


@Component({
    template: require("./index.html"),
    components: {
        VueSlider
    }
})
export default class Setting extends Vue {
    width: number = 0;
    height: number = 0;
    size: number = 0;

    state: boolean = false;

    constructor() {
        super();
    }

    mounted(): void {
        this.resize();
    }

    resize(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
    }

    get sensibility(): number {
        return cube_config.sensibility * 1e4;
    }

    set sensibility(value: number) {
        cube_config.sensibility = value * 1e-4;
    }
    
    get frames(): number {
        return cube_config.frames;
    }

    set frames(value: number) {
        cube_config.frames = value;
    }

    get scramble_steps(): number {
        return cube_config.scramble_steps;
    }

    set scramble_steps(value: number) {
        cube_config.scramble_steps = value;
    }
}
