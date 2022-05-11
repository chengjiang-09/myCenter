/*
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:14:21
 * @LastEditTime: 2022-03-17 10:21:15
 */
import { createStore } from 'vuex'
import getters from './getters'

import user from './modules/user'
import center from './modules/center'

export default createStore({
  state: () => {
    return {
    }
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    center
  }
})
