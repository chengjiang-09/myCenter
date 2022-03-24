/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:14:21
 * @LastEditTime: 2022-03-19 16:00:59
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const EnterPage = () => import('@/views/enterPage')
const EnterFulLayout = () => import('@/views/enterPage/EnterFulLayout.vue')

const CenterLayout = () => import('@/layout')

const routes = [
  {
    path: '/',
    component: EnterPage,
    children: [
      {
        path: '',
        component: EnterFulLayout

      }
    ]
  }, {
    path: '/center/:id',
    component: CenterLayout,
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
