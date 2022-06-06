import ancientPoetry from '@/mock/ancientPoetry.json'
import blogsObj from '@/mock/blogs.json'
import commentList from '@/mock/comment.json'

import { getPoetryAPI, getBlogAPI } from '@/api'

import vuexStoreKey from '@/utils/vuexStoreKey'

let globolFlag = true

const objIsEmpty = (obj, key) => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return false
  }
  return true
}

const state = () => {
  return {
    ancientPoetry: JSON.parse(localStorage.getItem(vuexStoreKey.ANCIENT_POETRY)) || [],
    blogs: JSON.parse(localStorage.getItem(vuexStoreKey.BLOGS)) || {},
    blogsShowList: [],
    blogsPageNumberMax: JSON.parse(localStorage.getItem(vuexStoreKey.BLOGS_PAGE_NUMBER_MAX)) || 0,
    commentList: JSON.parse(localStorage.getItem(vuexStoreKey.COMMENTLIST)) || [],
    pageList: JSON.parse(localStorage.getItem(vuexStoreKey.PAGELIST)) || []
  }
}

const mutations = {
  setAncientPoetry (state, payload) {
    state.ancientPoetry = payload
    localStorage.setItem(vuexStoreKey.ANCIENT_POETRY, JSON.stringify(state.ancientPoetry))
  },
  setBlogs (state, obj) {
    state.blogs[obj.pageNumber] = obj.blogsList
    localStorage.setItem(vuexStoreKey.BLOGS, JSON.stringify(state.blogs))
  },
  setBlogsShowList (state, blogsShowList) {
    state.blogsShowList = blogsShowList
  },
  setBlogsPageNumberMax (state, num) {
    state.blogsPageNumberMax = num
    localStorage.setItem(vuexStoreKey.BLOGS_PAGE_NUMBER_MAX, JSON.stringify(state.blogsPageNumberMax))
  },
  setCommentList (state, List) {
    state.commentList = List
    localStorage.setItem(vuexStoreKey.COMMENTLIST, JSON.stringify(state.commentList))
  },
  setPageList (state, list) {
    state.pageList = list
    localStorage.setItem(vuexStoreKey.PAGELIST, JSON.stringify(state.pageList))
  }
}

const actions = {
  async updateAncientPoetry (context) {
    if (context.state.ancientPoetry.length === 0) {
      try {
        // Poetry.value = ancientPoetry
        const { status, msg, result } = await getPoetryAPI()

        if (status === 1) {
          console.log(msg)
          context.commit('setAncientPoetry', result.data)
        } else {
          console.log(msg)
          throw new Error('诗词接口出错')
        }

        // throw new Error('诗词列表暂无接口')
      } catch (e) {
        console.log(e.message, ',将使用默认静态数据')
        context.commit('setAncientPoetry', ancientPoetry.poetry)
      }
    }
  },
  async updateBlogs (context, pageNumber) {
    if (objIsEmpty(context.state.blogs, pageNumber)) {
      try {
        const { status, msg, result } = await getBlogAPI(pageNumber)

        if (status === 1) {
          console.log(msg)

          if (globolFlag) {
            globolFlag = false

            const saveList = []
            let id = 0
            let flag = false
            for (let i = 0; i < result.maxPageNum; i++) {
              id = i
              flag = false
              if (i === 0) {
                flag = true
              }
              saveList.push({
                id: id + 1,
                flag
              })
            }
            context.commit('setPageList', saveList)
            context.commit('setBlogsPageNumberMax', result.maxPageNum)
          }

          result.data.forEach(obj => {
            obj.context = obj.context.split('//')
          })

          context.commit('setBlogs', {
            pageNumber,
            blogsList: result.data
          })
          context.commit('setBlogsShowList', result.data)
        } else {
          console.log(msg)
          throw new Error('博客文章列表接口出错了')
        }

        // blogsList.value = "数据"
        // throw new Error('博客文章列表暂无接口')
      } catch (e) {
        console.log(e.message, ',将使用默认静态数据')
        let num = 0
        const blogsKeyList = Object.keys(blogsObj)
        blogsKeyList.forEach(key => {
          num += 1
          if (num === pageNumber) {
            blogsObj[key].forEach(obj => {
              obj.context = obj.context.split('//')
            })

            context.commit('setBlogs', {
              pageNumber,
              blogsList: blogsObj[key]
            })
          }
        })

        context.commit('setBlogsPageNumberMax', blogsKeyList.length)
      }
    }
  },
  updateCommentList (context, sendData) {
    if (sendData) {
      // 更新评论列表数据
      context.commit('setCommentList', [])
      console.log(sendData)
    }
    if (context.state.commentList.length === 0) {
      try {
        // commnetList = "数据"
        throw new Error('评论列表暂无接口')
      } catch (e) {
        console.log(e.message, ',将使用默认静态数据')

        const comments = commentList.commentList

        const initCommentList = (comments, base = 0) => {
          const list = []
          comments.forEach(obj => {
            if (obj.masterID === base) {
              obj.children = initCommentList(comments, obj.id)
              list.push(obj)
            }
          })
          return list
        }

        context.commit('setCommentList', initCommentList(comments))
      }
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
