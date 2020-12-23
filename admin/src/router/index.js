import Vue from 'vue'
import Router from 'vue-router'
import route from "./route"

Vue.use(Router)

const router = new Router({
  routes: route
})

// 处理router连续点击多次路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.admin_token) {
    return next('/login')
  }
  next()
})

export default router