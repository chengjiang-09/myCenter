<template>
  <div class="bottomCommentLayout">
    <DynamicCommentSend />
    <div class="commentBox">
      <DynamicCommentBall v-for="obj in commentList" :key="obj.id" :data="obj"/>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onBeforeMount, onMounted, ref } from 'vue'
export default {
  name: 'bottomCommentLayout',
  setup () {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('center/updateCommentList')
    })

    const commentList = ref(null)

    onMounted(() => {
      commentList.value = store.state.center.commentList

      console.log(commentList.value)
    })

    return {
      commentList
    }
  }
}
</script>

<style scoped lang="less">
.bottomCommentLayout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: transparent;

  .commentBox {
    position: absolute;
    left: 44%;
    top: 10%;
  }
}
</style>
