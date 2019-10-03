import Vue from 'vue'
import Router from 'vue-router'

import Login from 'VIEWS/login'
import Menu from 'VIEWS/menu'
import AddTag from 'VIEWS/addTag'
import AddList from 'VIEWS/tagList'
import ArticleList from 'VIEWS/articleList'
import ArticleEdit from 'VIEWS/articleEdit'
import UserleList from 'VIEWS/userList'
import UserEdit from 'VIEWS/userEdit'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isPublic: true
      }
    },
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
        { path: '/article/edit/:id', component: ArticleEdit, props: true },
        { path: '/user/list', component: UserleList },
        { path: '/user/add', component: UserEdit },
        { path: '/user/edit/:id', component: UserEdit, props: true }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.admin_token) {
    return next('/login')
  }
  next()
})

export default router