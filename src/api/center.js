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

export const sendFootprint = (commentConfig) => {
  return request(
    '/my/footprint',
    'post',
    commentConfig
  )
}

export const getCommentPageNumberMax = () => {
  return request(
    '/my/commentsMaxNum',
    'get'
  )
}

export const getComments = (pageNum) => {
  return request(
    '/my/comments',
    'get',
    {
      pageNum
    }
  )
}

export const sendComment = (commentConfig) => {
  return request(
    '/my/sendcomment',
    'post',
    commentConfig
  )
}
