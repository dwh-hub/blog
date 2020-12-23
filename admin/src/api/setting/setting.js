import http from "@/api/request";

export default {
  // 修改博客个人信息
  fetchBlogInfo(params) {
    return http.POST("/admin/api/blogInfo", params);
  },
  // 修改博客个人信息
  updateBlogInfo(params) {
    return http.POST("/admin/api/blogInfo/update", params);
  },
};
