import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from "COMPS/business/articleList"

Vue.use(Router)

const articleContent = Vue.component('articleContent',
  () => import('PAGES/articleContent.vue')
)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/articleList'
    },
    {
      path: '/articleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      component: articleContent
    }
  ]
})