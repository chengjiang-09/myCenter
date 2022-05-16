<template>
  <div class="bottomCommentLayout">
    <DynamicCommentSend />
    <div class="commentBox" :class="[{ commentBoxShow:commentBoxFlag }]" ref="commentBox">
      <div class="commentBox-conatiner">
        <DynamicCommentBall v-for="obj in commentList" :key="obj.id" :data="obj"/>
      </div>
      <DynamicPaging @pageNum="pageNum" :pageNums="1"/>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
export default {
  name: 'bottomCommentLayout',
  setup () {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('center/updateCommentList')
    })

    const commentList = computed({
      get () {
        // console.log(store.state.center.commentList)
        return store.state.center.commentList
      }
    })

    const commentBox = ref(null)
    const commentBoxFlag = ref(false)

    onMounted(() => {
      const commentBoxObserver = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          commentBoxObserver.unobserve(commentBox.value)
          setTimeout(() => {
            commentBoxFlag.value = true
          }, 400)
        }
      }, {
        threshold: 0.2
      })
      commentBoxObserver.observe(commentBox.value)
    })

    const pageNum = (value) => {
      console.log(value)
    }

    return {
      commentList, commentBox, commentBoxFlag, pageNum
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
    left: 0;
    top: 14vh;
    height: 120vh;
    opacity: 0;
    transform: rotateZ(-320deg);
    transition: transform 1s, opacity .5s;
    // overflow-y: hidden;

    &-conatiner {
      height: 100vh;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

  .commentBoxShow {
    opacity: 1;
    transform: rotateZ(0deg);
  }
}
</style>
