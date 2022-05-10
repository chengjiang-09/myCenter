<template>
  <div class="blogsListLayout">
    <DynamicBlogsFrame
      v-for="obj in blogsList"
      :key="obj.id"
      :picPlace="obj.picPlace"
      :picName="obj.picName"
      :title="obj.title"
      :path="`/blogs/${obj.id}`"
    />
    <DynamicPaging @pageNum="pageNum"/>
  </div>
</template>

<script>
import blogsObj from '@/mock/blogs.json'
export default {
  name: 'blogsListLayout',
  setup () {
    const blogsList = blogsObj.blogs

    const pageNum = (pageID) => {
      console.log(pageID)
    }

    return {
      blogsList, pageNum
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
