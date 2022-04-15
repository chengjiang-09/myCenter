import Cookies from 'js-cookie'

// token操作对象
const token = {
  _Key: 'vue_personCenter_token',
  getToken: () => {
    return Cookies.get(this._Key)
  },
  setToken (token) {
    return Cookies.set(this._Key, token)
  }
}

// token过期时间操作对象
const tokenTimeOut = {
  _Key: 'vue_personCenter_timeStamp',
  getTimeOutStamp: () => {
    return Cookies.get(this._Key)
  },
  setTimeOutStamp: () => {
    return Cookies.set(this._Key, Date.now())
  }
}

// Proxy实现数据私有和不可修改
function privateConversion (obj) {
  return new Proxy(obj, {
    get: function (target, key) {
      if (key[0] === '_') {
        return undefined
      }
      return target[key]
    },
    set: function (target, key, value) {
      throw new Error('当前属性不可修改！')
    }
  })
}

export const tokenCookie = privateConversion(token)
export const tokenTimeOutCookie = privateConversion(tokenTimeOut)
