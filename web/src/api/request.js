import Axios from "axios";
import apiConfig from "./api.config";

// 默认请求地址
Axios.defaults.baseURL = apiConfig.getBaseUrl();
// 超时时间
Axios.defaults.timeout = 5000;

// 请求拦截器
Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
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
