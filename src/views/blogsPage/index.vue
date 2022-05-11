<template>
  <div class="">

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'blogsPage',
  setup () {
    const route = useRoute()
    const id = route.params.id

    const store = useStore()

    const blogsAll = store.state.center.blogs
    const blog = ref(null)

    Object.keys(blogsAll).forEach(key => {
      for (let i = 0, len = blogsAll[key].length; i < len; i++) {
        if (blogsAll[key][i].id === Number(id)) {
          blog.value = blogsAll[key][i]
        }
      }
    })

    console.log(blog.value)

    return {
      blog
    }
  }
}
</script>

<style>
</style>
