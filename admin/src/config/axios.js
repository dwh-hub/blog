import Vue from 'vue'
import axios from "axios";
import router from '../router/index.js'

// window.api = 'http://localhost:3000'

axios.defaults.baseURL = 'http://localhost:3000'

// 请求之前处理
axios.interceptors.request.use(function (config) {
  if(localStorage.admin_token) {
    config.headers.Authorization = 'Bearer ' + localStorage.admin_token
  }
  return config
}, function (error) {
  return Promise.reject(error);
})


// 响应拦截器 处理返回的请求数据
axios.interceptors.response.use(res => {
  if (res.data.code == 401) {
    return router.push('/login')
  }
  if (res.data.code != 200) {
    Vue.prototype.$message.error(res.data.message);
    return Promise.reject();
  }
  return res.data
}, error => {
  Vue.prototype.$message.error(error.message);
  return Promise.reject();
})

export default axios