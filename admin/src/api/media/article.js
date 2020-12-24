import http from "@/api/request";

export default {
  // 文章详情
  fetchArticle(params) {
    return http.GET("/admin/api/reset/article/detail", params);
  },
  // 文章列表
  fetchArticleList(params) {
    return http.GET("/admin/api/reset/article", params);
  },
  // 编辑文章
  editArticle(params) {
    return http.POST("/admin/api/reset/article/edit", params);
  },
  // 新增文章
  addArticle(params) {
    return http.POST("/admin/api/reset/article/add", params);
  },
  // 删除文章
  deleteArticle(params) {
    return http.POST("/admin/api/reset/article/delete", params);
  },
  // 评价列表
  fetchEvaluation(params) {
    return http.GET("/admin/api/reset/evaluation", params);
  },
  // 删除评价
  deleteEvaluation(params) {
    return http.POST("/admin/api/reset/evaluation/delete", params);
  },
};
