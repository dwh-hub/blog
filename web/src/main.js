import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";
import api from "./api"
import "./components/global/index"

import 'swiper/swiper-bundle.css';

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
