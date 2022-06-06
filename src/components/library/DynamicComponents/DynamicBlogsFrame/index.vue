<template>
  <div
    class="DynamicBlogsFrame"
    :class="[{ moveFrame: !showFlag }, { noMoveFrame: showFlag }]"
  >
    <RouterLink :to="path">
      <div class="img" :style="{ left: `${picLeft}%` }">
        <img class="pic" v-lazy="picPlace + picName" alt="图片" ref="pic" />
      </div>
    </RouterLink>
    <h2 class="title" :style="{ left: `${titleLeft}%` }">《{{ title }}》</h2>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'DynamicBlogsFrame',
  props: {
    picName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '文章名字'
    },
    path: {
      type: String,
      default: ''
    },
    picPlace: {
      type: String,
      default: 'http://localhost:8001'
    }
  },
  setup () {
    const getPlace = (max, min) => {
      const baseNum = Math.random() * (max - min)
      const picPlace = min + parseInt(baseNum)
      return picPlace
    }

    const picLeft = getPlace(120, 43)
    const titleLeft = picLeft - 30
    const pic = ref(null)
    const showFlag = ref(false)

    onMounted(() => {
      const observerMove = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observerMove.unobserve(pic.value)
          showFlag.value = true
        }
      }, {
        threshold: 0.1
      })

      observerMove.observe(pic.value)
    })

    return {
      picLeft,
      titleLeft,
      pic,
      showFlag
    }
  }
}
</script>

<style scoped lang="less">
.noMoveFrame {
  // transform: translate(0%, 0%);
  animation: move .8s linear 0s 1;
  opacity: 1;
}

@keyframes move {
  0% {
    transform: translate(-50%, 0%);
  }
  50% {
    transform: translate(50%, 0%);
  }
  100% {
    transform: translate(0%,0%);
  }
}

.moveFrame {
  // transform: translate(-200%, 0%);
  opacity: 0;
}
.DynamicBlogsFrame {
  position: relative;
  width: 45vw;
  height: 40vh;
  margin: 0 0 4vh 0;
  // transform: translate(-50%, 0%);
  transition: opacity .8s;
  .img {
    position: absolute;
    left: 80%;
    top: 0%;
    width: 35vw;
    height: 40vh;
    overflow: hidden;
    transform: scale(1, 1);
    opacity: 0.8;
    transition: transform 0.5s, opacity 0.5s;
    .pic {
      width: 35vw;
      height: auto;
      transition: transform 0.5s;
      transform: scale(1, 1);
      &:hover {
        transform: scale(1.22, 1.22);
      }
    }
    &:hover {
      transform: scale(0.95, 0.95);
      opacity: 1;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 10vw;
    height: 40vh;
    color: #fff;
    font-size: 1.4vw;
  }
}
</style>
