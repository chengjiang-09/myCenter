<template>
  <ul class="center">
    <img
      src="~@/assets/images/2.jpg"
      alt=""
      class="BG"
      ref="BG"
      :class="{ oneClose: oneBGFlag }"
    />
    <li class="one">
      <BalloonLayout @oneClose="oneClose" />
      <DynamicNowWeather
        @onMouseMove="onMouseMove"
        @onMouseLeave="onMouseLeave"
      />
    </li>
    <li class="two">
      <BlogsListLayout />
    </li>
    <li class="three">
      <BottomCommentLayout />
    </li>
  </ul>
</template>

<script>
import BalloonLayout from '@/layout/components/balloonLayout.vue'
import BlogsListLayout from '@/layout/components/blogsListLayout.vue'
import BottomCommentLayout from '@/layout/components/bottomCommentLayout.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'
export default {
  name: 'centerPage',
  components: {
    // AppSider
    BalloonLayout,
    BlogsListLayout,
    BottomCommentLayout
  },
  setup () {
    const oneBGFlag = ref(false)
    const BG = ref(null)

    const onMouseMove = () => {
      oneBGFlag.value = true
    }

    const onMouseLeave = () => {
      oneBGFlag.value = false
    }

    const BGChange = () => {
      switch (true) {
        case window.scrollY > 0 && window.scrollY <= 50:
          BG.value.style.opacity = '1'
          BG.value.style.transform = 'translate(0%,-3%)'
          break
        case window.scrollY > 100 && window.scrollY <= 150:
          BG.value.style.opacity = '0.85'
          BG.value.style.transform = 'translate(0%,-6%)'
          break
        case window.scrollY > 200 && window.scrollY <= 250:
          BG.value.style.opacity = '0.75'
          BG.value.style.transform = 'translate(0%,-12%)'
          break
        case window.scrollY >= 300 && window.scrollY <= 350:
          BG.value.style.opacity = '0.65'
          BG.value.style.transform = 'translate(0%,-18%)'
          break
        case window.scrollY >= 350 && window.scrollY <= 400:
          BG.value.style.opacity = '0.5'
          BG.value.style.transform = 'translate(0%,-24%)'
          break
        case window.scrollY >= 450 && window.scrollY <= 500:
          BG.value.style.opacity = '0.25'
          break
        case window.scrollY >= 500 && window.scrollY <= 1000:
          BG.value.style.opacity = '0'
          break
        case window.scrollY >= 3660:
          BG.value.style.opacity = '1'
          BG.value.style.transform = 'translate(0%,-3%)'
          break
        case window.scrollY < 3610 && window.scrollY >= 3560:
          BG.value.style.opacity = '0.85'
          BG.value.style.transform = 'translate(0%,-6%)'
          break
        case window.scrollY < 3510 && window.scrollY >= 3460:
          BG.value.style.opacity = '0.75'
          BG.value.style.transform = 'translate(0%,-12%)'
          break
        case window.scrollY <= 3410 && window.scrollY >= 3360:
          BG.value.style.opacity = '0.65'
          BG.value.style.transform = 'translate(0%,-18%)'
          break
        case window.scrollY <= 3360 && window.scrollY >= 3310:
          BG.value.style.opacity = '0.5'
          BG.value.style.transform = 'translate(0%,-24%)'
          break
        case window.scrollY <= 3260 && window.scrollY >= 3210:
          BG.value.style.opacity = '0.25'
          break
        case window.scrollY <= 3210 && window.scrollY >= 2000:
          BG.value.style.opacity = '0'
          break
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', BGChange)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', BGChange)
    })

    const oneClose = (flag) => {
      oneBGFlag.value = flag
    }

    return {
      onMouseMove,
      onMouseLeave,
      oneBGFlag,
      BG,
      oneClose
    }
  }
}
</script>

<style scoped lang="less">
.center {
  user-select: none;
  background-color: #000;
  .BG {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transform: translate(0%, 0%);
    transition: clip-path 0.5s, transform 0.8s, opacity 0.8s;
  }
  .oneClose {
    clip-path: polygon(50% 10%, 60% 50%, 50% 90%, 40% 50%);
  }
  .one {
    display: block;
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .two {
    position: relative;
    display: block;
    width: 100%;
    height: 250vh;
  }
  .three {
    position: relative;
    display: block;
    width: 100%;
    height: 250vh;
  }
}
</style>
