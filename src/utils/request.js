/*
 * @Author: chengjiang_09
 * @Date: 2022-03-19 16:26:56
 * @LastEditTime: 2022-03-19 16:26:58
 */

import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { tokenCookie, tokenTimeOutCookie } from '@/utils/auth'

export const baseURL = ''

const request = axios.create({
  baseURL,
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 查询是否存在Token，修改请求头
  const token = tokenCookie.getToken()

  if (token) {
    config.headers.Authorization = `chengjiang ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(res => {
  if (res.status === 401) {
    // 401 Token过期
    store.commit('user/setUserInfo', {})
    tokenCookie.removeToken()
    tokenTimeOutCookie.removeTimeOutStamp()

    return router.push('/')
  }
  return res.data
}, error => {
  if (error.response && error.response.status === 401) {
    // 清空Token,或储存的用户信息
    store.commit('user/setUserInfo', {})
    tokenCookie.removeToken()
    tokenTimeOutCookie.removeTimeOutStamp()

    router.push('/')
  }

  return Promise.reject(error)
})

export default (url, method, requestData) => {
  return request({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: requestData
  })
}
