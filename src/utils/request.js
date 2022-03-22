/*
 * @Author: chengjiang_09
 * @Date: 2022-03-19 16:26:56
 * @LastEditTime: 2022-03-19 16:26:58
 */

import axios from 'axios'
import router from '@/router'

export const baseURL = ''

const request = axios.create({
  baseURL,
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 查询是否存在Token，修改请求头

  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(res => res.data, error => {
  if (error.response && error.response.status === 401) {
    // 清空Token,或储存的用户信息

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
