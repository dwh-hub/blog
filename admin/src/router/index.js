import Vue from 'vue'
import Router from 'vue-router'

import Login from 'VIEWS/login'
import Menu from 'VIEWS/menu'

Vue.use(Router)

const router = new Router({
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
        { path: '/tag/add', component: resolve => import('VIEWS/addTag') },
        { path: '/tag/edit/:id', component: resolve => import('VIEWS/addTag'), props: true },
        { path: '/tag/list', component: resolve => import('VIEWS/tagList') },
        { path: '/article/list', component: resolve => import('VIEWS/articleList') },
        { path: '/article/add', component: resolve => import('VIEWS/articleEdit') },
        { path: '/article/edit/:id', component: resolve => import('VIEWS/articleEdit'), props: true },
        { path: '/user/list', component: resolve => import('VIEWS/userList') },
        { path: '/user/add', component: resolve => import('VIEWS/userEdit') },
        { path: '/user/edit/:id', component: resolve => import('VIEWS/userEdit'), props: true },
        { path: '/blog/info', component: resolve => import('VIEWS/blogInfo'), props: true },
        { path: '/evaluation/:id', component: resolve => import('VIEWS/evaluationList'), props: true }
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