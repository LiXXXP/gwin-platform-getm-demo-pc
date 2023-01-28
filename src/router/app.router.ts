import Layout from '@/layout/index.vue'
import { RouteConfig } from '#/global'

const appRoutes: Array<RouteConfig> = [
  {
    path: '',
    component: Layout,
    name: 'Order',
    meta: { title: '鲸眼轨迹监控', icon: 'gwin-getm' },
    children: [
      {
        path: '',
        name: 'OrderList',
        component: () => import('@/views/order/index.vue'),
        meta: { title: '订货单' }
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '大屏监控' }
      }
    ]
  }
]

export default appRoutes
