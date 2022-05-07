import request from '@/utils/request'

// 校验token，并获取用户信息
export const tokenToUserInfo = (data) => {
  return request(
    '/my/getuserinfo',
    'post',
    data
  )
}
