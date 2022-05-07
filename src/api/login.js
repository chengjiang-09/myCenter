import request from '@/utils/request'

// 手机验证码API
export const mobileCode = () => {
  return request(
    '/my/mobile/code',
    'get'
  )
}

// 验证码登录API
export const mobileLogin = (data) => {
  return request(
    '/my/mobile/login',
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
