import { tokenCookie, tokenTimeOutCookie } from '@/utils/auth'
import { passwordLoginAPI, tokenToUserInfoAPI, mobileLoginAPI } from '@/api'

const state = () => {
  return {
    userInfo: {}
  }
}
const mutations = {
  setUserInfo (state, userInfo) {
    if (!userInfo.token) {
      state.userInfo = userInfo
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
  }
}

const actions = {
  async getUserInfoToToken (context, token) {
    try {
      const { result, msg } = await tokenToUserInfoAPI({ token })

      if (result.status === 0) {
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
      const { result, msg } = await passwordLoginAPI(loginUser)
      context.commit('setUserInfo', result)
      return msg
    } catch (e) {
      Promise.reject(e)
      return '出错啦！'
    }
  },
  async mobileLogin (context, loginUser) {
    try {
      const { result, msg } = await mobileLoginAPI(loginUser)
      context.commit('setUserInfo', result)
      return msg
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
