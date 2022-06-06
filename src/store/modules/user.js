import { tokenCookie, tokenTimeOutCookie } from '@/utils/auth'
import { passwordLoginAPI, tokenToUserInfoAPI, emailLoginAPI } from '@/api'
import vuexStoreKey from '@/utils/vuexStoreKey'

const state = () => {
  return {
    userInfo: JSON.parse(localStorage.getItem(vuexStoreKey.USER_INFO)) || {}
  }
}
const mutations = {
  setUserInfo (state, userInfo) {
    if (!userInfo.token) {
      state.userInfo = userInfo
      localStorage.setItem(vuexStoreKey.USER_INFO, JSON.stringify(state.userInfo))
      return
    }

    tokenCookie.setToken(userInfo.token)
    tokenTimeOutCookie.setTimeOutStamp()

    const newUserInfo = (function () {
      const newUserInfo = {}
      Object.keys(userInfo).forEach(key => {
        if (key !== 'token') {
          newUserInfo[key] = userInfo[key]
        }
      })
      return newUserInfo
    })()

    state.userInfo = newUserInfo
    localStorage.setItem(vuexStoreKey.USER_INFO, JSON.stringify(state.userInfo))
  }
}

const actions = {
  async getUserInfoToToken (context) {
    try {
      const { result, msg, status } = await tokenToUserInfoAPI()

      if (status === 0) {
        context.commit('setUserInfo', {})
        tokenCookie.removeToken()
        tokenTimeOutCookie.removeTimeOutStamp()
        return msg
      }

      context.commit('setUserInfo', result)
      return msg
    } catch (e) {
      Promise.reject(e)
      return '出错啦！'
    }
  },
  async passwordLogin (context, loginUser) {
    try {
      const { result, msg, status } = await passwordLoginAPI(loginUser)
      context.commit('setUserInfo', result)
      return {
        msg,
        status
      }
    } catch (e) {
      Promise.reject(e)
      return '出错啦！'
    }
  },
  async emailLogin (context, loginUser) {
    try {
      const { result, msg, status } = await emailLoginAPI(loginUser)
      context.commit('setUserInfo', result)
      return {
        msg,
        status
      }
    } catch (e) {
      Promise.reject(e)
      return '出错啦！'
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
