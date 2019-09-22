import Vue from 'vue'
import Router from 'vue-router'

import Menu from 'VIEWS/menu'
import AddTag from 'VIEWS/addTag'
import AddList from 'VIEWS/tagList'
import ArticleList from 'VIEWS/articleList'
import ArticleEdit from 'VIEWS/articleEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
      children: [
        { path: '/tag/add', component: AddTag },
        { path: '/tag/edit/:id', component: AddTag, props: true },
        { path: '/tag/list', component: AddList },
        { path: '/article/list', component: ArticleList },
        { path: '/article/add', component: ArticleEdit },
        { path: '/article/edit/:id', component: ArticleEdit, props: true }
      ]
    }
  ]
})