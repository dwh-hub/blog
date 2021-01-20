import Vue from "vue";
import Router from "vue-router";
import ArticleList from "COMPS/blog/article_list";

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
      component: (resolve) => import("PAGES/blog/index.vue"),
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
          component: (resolve) => import("PAGES/blog/article_page.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/animation",
      component: (resolve) => import("PAGES/animation/index.vue"),
    }
  ],
});
