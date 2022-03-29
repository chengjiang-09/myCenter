import request from '@/utils/request'

export const mobileCode = () => {
  return request(
    '/mobile/code',
    'get'
  )
}
