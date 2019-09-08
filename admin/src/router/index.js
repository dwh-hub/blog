import Vue from 'vue'
import Router from 'vue-router'

import Menu from 'VIEWS/menu'
import AddTag from 'VIEWS/addTag'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
      children: [
        {
          path: '/tag/add',
          component: AddTag,
        }
      ]
    }
  ]
})