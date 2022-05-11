import ancientPoetry from '@/mock/ancientPoetry.json'
import blogsObj from '@/mock/blogs.json'

import storageKey from '@/utils/storageKey'

const objIsEmpty = (obj, key) => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return false
  }
  return true
}

const state = () => {
  return {
    ancientPoetry: JSON.parse(localStorage.getItem(storageKey.ANCIENT_POETRY)) || [],
    blogs: JSON.parse(localStorage.getItem(storageKey.BLOGS)) || {},
    blogsPageNumberMax: JSON.parse(localStorage.getItem(storageKey.BLOGS_PAGE_NUMBER_MAX)) || 0
  }
}

const mutations = {
  setAncientPoetry (state, payload) {
    state.ancientPoetry = payload
    localStorage.setItem(storageKey.ANCIENT_POETRY, JSON.stringify(state.ancientPoetry))
  },
  setBlogs (state, obj) {
    state.blogs[obj.pageNumber] = obj.blogsList
    localStorage.setItem(storageKey.BLOGS, JSON.stringify(state.blogs))
  },
  setBlogsPageNumberMax (state, num) {
    state.blogsPageNumberMax = num
    localStorage.setItem(storageKey.BLOGS_PAGE_NUMBER_MAX, JSON.stringify(state.blogsPageNumberMax))
  }
}

const actions = {
  updateAncientPoetry (context) {
    if (context.state.ancientPoetry.length === 0) {
      try {
        // Poetry.value = ancientPoetry
        throw new Error('诗词列表暂无接口')
      } catch (e) {
        console.log(e.message, ',将使用默认静态数据')
        context.commit('setAncientPoetry', ancientPoetry.poetry)
      }
    }
  },
  updateBlogs (context, pageNumber) {
    if (objIsEmpty(context.state.blogs, pageNumber)) {
      try {
      // blogsList.value = "数据"
        throw new Error('博客文章列表暂无接口')
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
