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
    <DynamicPaging @pageNum="pageNum" :pageNums="pageNums"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'blogsListLayout',
  setup () {
    const store = useStore()

    const blogsList = ref(null)
    const pageNums = ref(store.state.center.blogsPageNumberMax)

    store.dispatch('center/updateBlogs', 1)

    const pageNum = (pageNumber) => {
      store.dispatch('center/updateBlogs', pageNumber)

      blogsList.value = store.state.center.blogs[pageNumber]
    }

    pageNums.value = store.state.center.blogsPageNumberMax

    return {
      blogsList, pageNum, pageNums
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
