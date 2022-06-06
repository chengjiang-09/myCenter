import request from '@/utils/request.js'

export const getPoetry = () => {
  return request(
    '/my/poetry',
    'get'
  )
}

export const getBlog = (pageNum) => {
  return request(
    '/my/blog',
    'get',
    {
      pageNum
    }
  )
}
