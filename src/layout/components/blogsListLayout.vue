<template>
  <div class="blogsListLayout">
    <DynamicBlogsFrame
      v-for="obj in blogsList"
      :key="obj.id"
      :picPlace="obj.picPlace"
      :picName="obj.picName"
      :title="obj.title"
      :path="`/center/blogs/${obj.id}`"
    />
    <!-- :class="[{moveFrame:moveFrameFlag},{noMoveFrame:!moveFrameFlag}]" -->
    <DynamicPaging @pageNum="pageNum" @updatePageList="updatePageList" :pageListVuex="pageList"/>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'blogsListLayout',
  setup () {
    const store = useStore()

    const blogsList = computed({
      get () {
        return store.state.center.blogsShowList
      }
    })
    const pageList = computed({
      get () {
        return store.state.center.pageList
      }
    })

    const updatePageList = (id) => {
      pageList.value.forEach(obj => {
        obj.flag = false
        if (obj.id === id) {
          obj.flag = true
        }
      })
      store.commit('center/setPageList', pageList.value)
    }

    store.dispatch('center/updateBlogs', 1)

    const pageNum = (pageNumber) => {
      store.dispatch('center/updateBlogs', pageNumber)
      store.commit('center/setBlogsShowList', store.state.center.blogs[pageNumber])
    }

    return {
      blogsList, pageNum, pageList, updatePageList
    }
  }
}
</script>

<style scoped lang="less">
.blogsListLayout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: transparent;
}
</style>
