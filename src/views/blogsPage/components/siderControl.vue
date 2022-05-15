<template>
  <div class="goBack">
    <DynamicA path="/center" :fontSize="1.5">
      <span class="goBackIcon"><ArrowUp /></span>
      <span class="goBackTitle">主页</span>
    </DynamicA>
  </div>
  <div class="goTop" :class="[{ goTopShow: goTopShowFlag }]">
    <DynamicA :fontSize="1.5" @click="goTop">
      <span class="goTopTitle">顶部</span>
    </DynamicA>
  </div>
  <div class="goWrite" :class="[{ goWriteMove: goTopShowFlag }]">
    <DynamicA :fontSize="1.5" @click="goWrite">
      <span class="goWriteTitle">评论</span>
      <span class="goWriteIcon"><ArrowDown /></span>
    </DynamicA>
  </div>
</template>

<script>
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
export default {
  name: 'siderControl',
  components: {
    ArrowUp,
    ArrowDown
  },
  setup () {
    const goTopShowFlag = ref(false)

    const goTopShow = () => {
      if (window.scrollY >= 300) {
        goTopShowFlag.value = true
      } else {
        goTopShowFlag.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', goTopShow)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', goTopShow)
    })

    const goTop = () => {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }

    const goWrite = () => {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight
    }

    return {
      goTopShowFlag,
      goTop,
      goWrite
    }
  }
}
</script>

<style scoped lang="less">
.goBack {
  position: fixed;
  top: 13vh;
  left: 1vw;
  .goBackTitle {
    font-size: 1.5vw;
  }
}

.goTopShow {
  opacity: 1 !important;
  pointer-events: all !important;
}
.goTop {
  position: fixed;
  top: 30vh;
  left: 1vw;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1s;
  .goTopTitle {
    font-size: 1.5vw;
  }
}

.goWriteMove {
  transform: translate(0, 0) !important;
}
.goWrite {
  position: fixed;
  top: 39vh;
  left: 1vw;
  transform: translate(0, -9vh);
  transition: transform 1s;
  .goWriteTitle {
    font-size: 1.5vw;
  }
}
</style>
