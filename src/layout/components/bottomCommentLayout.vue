<template>
  <div class="bottomCommentLayout">
    <DynamicCommentSend />
    <div v-if="commentListNumMax !== 0" class="commentBox" :class="[{ commentBoxShow:commentBoxFlag }]" ref="commentBox">
      <div  class="commentBox-conatiner">
        <DynamicCommentBall v-for="obj in commentList" :key="obj.id" :data="obj"/>
      </div>
    </div>
    <h1 class="warning" v-else>暂无评论数据！</h1>
    <DynamicPaging class="paging" @pageNum="pageNum" @updatePageList="updatePageList" :pageListVuex="pageList" :updateFlag="updateFlag"/>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
export default {
  name: 'bottomCommentLayout',
  setup () {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('center/updateCommentPageNumberMax')
      store.dispatch('center/updateCommentList')
    })

    const updateFlag = ref(true)

    watch(() => store.state.center.commentList, () => {
      updateFlag.value = !updateFlag.value
    })

    const commentList = computed({
      get () {
        // console.log(store.state.center.commentList)
        return store.state.center.commentShowList
      }
    })

    const commentListNumMax = computed({
      get () {
        return store.state.center.commentPageNumberMax
      }
    })

    const updatePageList = (id) => {
      pageList.value.forEach(obj => {
        obj.flag = false
        if (obj.id === id) {
          obj.flag = true
        }
      })
      store.commit('center/setCommentPageList', pageList.value)
    }

    const pageList = computed({
      get () {
        return store.state.center.commentPageList
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

    const pageNum = async (value) => {
      await store.dispatch('center/updateCommentList', value)
      store.commit('center/setCommentShowList', store.state.center.commentList[value])
    }

    return {
      commentList, commentBox, commentBoxFlag, pageNum, pageList, updatePageList, commentListNumMax, updateFlag
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

  .warning {
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 5vw;
  }

  .paging {
    position: absolute;
    left: 50%;
    top: 125vh;
    transform: translate(-50%,0);
  }

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
