import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";

Vue.use(ElementUI);

window.api = 'http://localhost:3000'

axios.defaults.baseURL = window.api

axios.interceptors.response.use(res => {
  return res.data
},error => {
  console.log(error)
  Vue.prototype.$message.error(error.message);
  return Promise.reject();
})

Vue.prototype.$axios = axios;

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
