import http from "@/api/request";

export default {
  // 博客信息
  fetchBlogInfo() {
    return http.POST('/web/api/blogInfo');
  },
  // 博客数据
  fetchBlogCount() {
    return http.GET('/web/api/user/count');
  },
};
