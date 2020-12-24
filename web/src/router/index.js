import Vue from "vue";
import Router from "vue-router";
import ArticleList from "COMPS/business/articleList";

Vue.use(Router);

// 处理router连续点击多次路由报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  routes: [
    {
      path: "/",
      component: (resolve) => import("PAGES/index.vue"),
      children: [
        {
          path: "/",
          component: ArticleList,
        },
        {
          path: "/tag/:id?",
          component: ArticleList,
        },
        {
          path: "/article/:id",
          component: (resolve) => import("PAGES/articlePage.vue"),
          props: true,
        },
      ],
    },
  ],
});
