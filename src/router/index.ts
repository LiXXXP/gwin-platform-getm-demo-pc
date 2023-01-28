import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import appRoutes from './app.router'
import commonRoutes from './common.router'
import getPageTitle from '../utils/get-page-title'

const routes: Array<RouteRecordRaw> = [...commonRoutes, ...appRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = getPageTitle(title)
  }
  next()
})

export default router
