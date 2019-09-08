import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from "COMPS/business/articleList"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/articleList'
    },
    {
      path: '/articleList',
      component: ArticleList
    }
  ]
})