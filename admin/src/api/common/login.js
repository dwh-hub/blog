import http from "@/api/request";

export default {
  // 登录
  login(params) {
    return http.POST('/admin/api/login"', params);
  },
};
