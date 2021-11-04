import Vue, { VNode } from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { VueConstructor } from "vue/types/umd";
import Playground from "./vueapp/playground";

Vue.use(Vuetify);
const opts = {};
const vuetify = new Vuetify(opts);
Vue.prototype.vuetify = vuetify;

let app: VueConstructor = Playground;

const vm = new Vue({
  vuetify,
  el: "#app",
  render: (h): VNode => h(app),
});