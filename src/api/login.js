import request from '@/utils/request'

// 手机验证码API
export const emailCode = (data) => {
  return request(
    '/my/email/code',
    'get',
    data
  )
}

// 验证码登录API
export const emailLogin = (data) => {
  return request(
    '/my/email/login',
    'post',
    data
  )
}

// 手机号密码登录API
export const passwordLogin = (data) => {
  return request(
    '/my/login',
    'post',
    data
  )
}
