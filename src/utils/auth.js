import Cookies from 'js-cookie'

const tokenKey = 'vue_personCenter_token'
const tokenTimeOutKey = 'vue_personCenter_timeStamp'

// token操作对象
export const tokenCookie = {
  getToken: () => {
    return Cookies.get(tokenKey)
  },
  setToken (token) {
    return Cookies.set(tokenKey, token)
  },
  removeToken () {
    return Cookies.remove(tokenKey)
  }
}

// token过期时间操作对象
export const tokenTimeOutCookie = {
  getTimeOutStamp: () => {
    return Cookies.get(tokenTimeOutKey)
  },
  setTimeOutStamp: () => {
    return Cookies.set(tokenTimeOutKey, Date.now())
  },
  removeTimeOutStamp: () => {
    return Cookies.remove(tokenTimeOutKey)
  }
}
