import request from '@/utils/request'

export const tokenToUserInfo = (data) => {
  return request.post(
    '/getuserinfo',
    'post',
    data
  )
}
