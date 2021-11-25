import Vue from "vue";
import { Component } from "vue-property-decorator";


@Component({
    template: require("./index.html"),
    components: {
    }
})

export default class Method extends Vue {
    width: number = 0;
    height: number = 0;
    size: number = 0;

    constructor() {
        super();
    }

    mounted(): void {
        this.$nextTick(this.resize);
    }

    resize(): void {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
    }

}
