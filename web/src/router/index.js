import Vue from "vue";
import Router from "vue-router";
import ArticleList from "COMPS/blog/article_list";

Vue.use(Router);

// 处理router连续点击多次路由报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  routes: [
    {
      path: "/",
      name: "blog",
      component: (resolve) => import("PAGES/blog/index.vue"),
      children: [
        {
          path: "/",
          name: "article-list",
          component: ArticleList,
        },
        {
          path: "/tag/:id?",
          name: "article-list-tag",
          component: ArticleList,
        },
        {
          path: "/article/:id",
          name: "article-detai",
          component: (resolve) => import("PAGES/blog/article_page.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/animation",
      name: "animation",
      component: (resolve) => import("PAGES/animation/index.vue")
    },
    {
      path: "/animation/detail/:id?",
      name: "animation-detail",
      component: (resolve) => import("PAGES/animation/animation_detail.vue")
    }
  ],
});


export default router;
