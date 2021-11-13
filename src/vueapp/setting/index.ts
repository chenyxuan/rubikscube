import Vue from "vue";
import { Component, Prop, Inject } from "vue-property-decorator";
import World from "../../cube/world";


@Component({
  template: require("./index.html"),
})
export default class Setting extends Vue {
  @Inject("world")
  world: World;


  @Prop({ required: true })
  value: boolean;

  width : number = 0;
  height : number  = 0;
  size : number  = 0;

  state : boolean = false;

  get show(): boolean {
    return this.value;
  }
  set show(value) {
    this.$emit("input", value);
  }

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
}
