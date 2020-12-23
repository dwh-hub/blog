import http from "@/api/request";

export default {
  // 标签列表
  fetchTagList(params) {
    return http.GET("/admin/api/reset/tag", params);
  },
  // 标签
  fetchTag(params) {
    return http.GET("/admin/api/reset/tag/detail", params);
  },
  // 编辑标签
  editTag(params) {
    return http.POST("/admin/api/reset/tag/edit", params);
  },
  // 新增标签
  addTag(params) {
    return http.POST("/admin/api/reset/tag/add", params);
  },
  // 删除标签
  deleteTag(params) {
    return http.POST("/admin/api/reset/tag/delete", params);
  },
};
