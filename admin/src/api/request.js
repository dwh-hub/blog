import Axios from "axios";
import qs from "qs";
import apiConfig from "./api.config";
import Vue from "vue";

// 默认请求地址
Axios.defaults.baseURL = apiConfig.getBaseUrl();
// 超时时间
Axios.defaults.timeout = 5000;

// 请求拦截器
Axios.interceptors.request.use(
  (config) => {
    let _token = apiConfig.getSessionToken();
    if (_token) {
      config.headers["Authorization"] = "Bearer " + _token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    // 处理响应成功的数据
    if (response.data.code == 401) {
      return router.push("/login");
    }
    if (response.data.code != 200) {
      Vue.prototype.$message.error(response.data.message);
      return Promise.reject();
    }
    // 过滤第一层http状态码数据
    return response.data;
  },
  (error) => {
    // 全局处理错误提示弹窗
    Vue.prototype.$message.error(error.message);
    return Promise.reject(error);
  }
);

export default {
  GET(url, params) {
    return Axios.get(url, { params })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  },
  POST(url, params) {
    return Axios.post(url, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        Promise.reject(error);
      });
  },
  PUT(url, params) {
    return Axios.put(url, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        Promise.reject(error);
      });
  },
  DELETE(url, params) {
    return Axios.delete(url, { data: params })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        Promise.reject(error);
      });
  },
};
