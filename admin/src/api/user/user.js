import http from "@/api/request";

export default {
  // 账号列表
  fetchUserList(params) {
    return http.GET("/admin/api/reset/user", params);
  },
  // 账号
  fetchUser(params) {
    return http.GET("/admin/api/reset/user/detail", params);
  },
  // 编辑账号
  editUser(params) {
    return http.POST("/admin/api/reset/user/edit", params);
  },
  // 新增账号
  addUser(params) {
    return http.POST("/admin/api/reset/user/add", params);
  },
  // 删除账号
  deleteUser(params) {
    return http.POST("/admin/api/reset/user/delete", params);
  },
};
