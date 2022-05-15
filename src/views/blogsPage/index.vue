<template>
  <div class="blogsPage">
    <div
      class="blogsPage-container"
      v-if="blog.id"
      :class="[{ show: showFlag }]"
    >
      <div class="titleLayout">
        <h3 class="title">《{{ blog.title }}》</h3>
      </div>
      <div class="context">
        <p v-for="(oneLine, index) in blog.context" :key="index">
          {{ oneLine }}
        </p>
      </div>
    </div>
    <SiderControl />
  </div>
</template>

<script>
import SiderControl from './components/siderControl.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
export default {
  name: 'blogsPage',
  components: {
    SiderControl
  },
  setup () {
    const route = useRoute()
    const id = route.params.id

    const store = useStore()

    const blogsAll = store.state.center.blogs
    const blog = ref(null)

    Object.keys(blogsAll).forEach((key) => {
      for (let i = 0, len = blogsAll[key].length; i < len; i++) {
        if (blogsAll[key][i].id === Number(id)) {
          blog.value = blogsAll[key][i]
        }
      }
    })

    const showFlag = ref(false)

    onMounted(() => {
      setTimeout(() => {
        showFlag.value = true
      }, 500)
    })

    return {
      blog,
      showFlag
    }
  }
}
</script>

<style scoped lang="less">
.blogsPage {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  padding-top: 10vh;
  padding-bottom: 20vh;
  user-select: none;
  .show {
    opacity: 0.8 !important;
  }
  .blogsPage-container {
    opacity: 0;
    transition: opacity 0.8s;
    width: 100vw;
    .titleLayout {
      padding: 0 8vw;
      width: 100%;
      text-align: center;
      .title {
        margin-top: 5vh;
        margin-left: auto;
        margin-right: auto;
        color: #fff;
        font-size: 6vw;
      }
    }
    .context {
      padding: 0 5vw;
      width: 100%;
      p {
        margin-bottom: 2vh;
        color: #fff;
        font-size: 2vw;
        text-indent: 4vw;
      }
      p:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
