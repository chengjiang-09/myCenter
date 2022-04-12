import request from '@/utils/request'

export const mobileLogin = (data) => {
  return request(
    '/mobile/login',
    'post',
    data
  )
}
