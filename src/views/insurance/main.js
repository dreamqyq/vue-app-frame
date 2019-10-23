import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "reset.css";
import "@/plugins/style.css";
import "@/plugins/rem";
import "@/plugins/vant-componts.js";
import "@/plugins/nutui-componts.js";
import "babel-polyfill";

Vue.config.productionTip = false; //阻止启动生产消息

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
