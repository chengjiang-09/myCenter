import request from '@/utils/request'

export const valiableMobileCode = (data) => {
  return request(
    '/mobile/valiableode',
    'post',
    data
  )
}
