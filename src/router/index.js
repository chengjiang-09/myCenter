/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:14:21
 * @LastEditTime: 2022-03-19 16:00:59
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { tokenCookie } from '@/utils/auth'
import store from '@/store'

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
    path: '/center',
    component: CenterLayout,
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const TokenHasList = []

router.beforeEach(async (to, from) => {
  let token = tokenCookie.getToken()
  const id = store.state.user.userInfo.id
  if (token) {
    if (!id) {
      await store.dispatch('user/getUserInfoToToken', token)
      token = tokenCookie.getToken()
    }
  }

  if (token) {
    if (to.path === '/') {
      return {
        path: '/center'
      }
    } else {
      return true
    }
  } else {
    store.commit('user/setUserInfo', {})
    if (TokenHasList.indexOf(to.path) > -1) {
      return {
        path: `/?redirectURL=${to.fullPath}`
      }
    } else {
      return true
    }
  }
})

export default router
