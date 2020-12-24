import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store";
import api from "./api"

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
