import http from "@/api/request";

export default {
  // 博客信息
  fetchBlogInfo() {
    return http.POST('/web/api/blogInfo');
  },
  // 博客流量
  fetchBlogCount() {
    return http.GET('/web/api/user/count');
  },
};
