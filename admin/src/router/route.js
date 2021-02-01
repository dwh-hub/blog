import Login from 'VIEWS/login'
import Menu from 'VIEWS/menu'

let route = [
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
        { path: '/tag/add', component: resolve => import('VIEWS/media/tag/add_tag') },
        { path: '/tag/edit/:id', component: resolve => import('VIEWS/media/tag/add_tag'), props: true },
        { path: '/tag/list', component: resolve => import('VIEWS/media/tag/tag_list') },
        { path: '/article/list', component: resolve => import('VIEWS/media/article/article_list') },
        { path: '/article/add', component: resolve => import('VIEWS/media/article/article_edit') },
        { path: '/article/edit/:id', component: resolve => import('VIEWS/media/article/article_edit'), props: true },
        { path: '/user/list', component: resolve => import('VIEWS/user/user_list') },
        { path: '/user/add', component: resolve => import('VIEWS/user/user_edit') },
        { path: '/user/edit/:id', component: resolve => import('VIEWS/user/user_edit'), props: true },
        { path: '/blog/info', component: resolve => import('VIEWS/setting/blog_info') },
        { path: '/evaluation/:id?', component: resolve => import('VIEWS/media/article/evaluation_list'), props: true }
      ]
    }
  ]

export default route;