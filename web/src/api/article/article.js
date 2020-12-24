import http from "@/api/request";

export default {
  // 文章详情
  fetchArticle(params) {
    return http.GET("/web/api/article/detail", params);
  },
  // 文章列表
  fetchArticleList(params) {
    return http.GET("/web/api/article/list", params);
  },
  // 文章评论
  fetchArticleEvalutaions(params) {
    return http.GET("/web/api/evaluate/list", params);
  },
  // 评论文章
  sendComments(params) {
    return http.POST("/web/api/evaluate", params);
  },
  // tag列表
  fetchTagList() {
    return http.GET("/web/api/tag/list");
  },
};
