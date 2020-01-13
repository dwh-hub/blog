import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from "COMPS/business/articleList"

Vue.use(Router)

const articlePage = Vue.component('articlePage',
  () => import('PAGES/articlePage.vue')
)

export default new Router({
  routes: [
    // { path: '/', redirect: '/articleList' },
    { path: '/:id?', component: ArticleList },
    { path: '/article/:id', component: articlePage, props: true }
  ]
})