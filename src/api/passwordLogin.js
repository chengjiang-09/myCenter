import request from '@/utils/request.js'

export const passwordLogin = (data) => {
  return request(
    '/login',
    'post',
    data
  )
}
