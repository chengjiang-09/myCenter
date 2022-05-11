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
        <BalloonLayout @oneClose="oneClose"/>
        <DynamicNowWeather
          @onMouseMove="onMouseMove"
          @onMouseLeave="onMouseLeave"
        />
      </li>
      <li class="two">
        <BlogsListLayout />
      </li>
      <li class="three">
      </li>
    </ul>
</template>

<script>
import BalloonLayout from '@/layout/components/balloonLayout.vue'
import BlogsListLayout from '@/layout/components/blogsListLayout.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'
export default {
  name: 'centerPage',
  components: {
    // AppSider
    BalloonLayout,
    BlogsListLayout
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
      if (window.scrollY > 0 && window.scrollY <= 50) {
        BG.value.style.opacity = 1
        BG.value.style.transform = 'translate(0%,-0%)'
      } else if (window.scrollY > 100 && window.scrollY <= 150) {
        BG.value.style.opacity = 0.75
        BG.value.style.transform = 'translate(0%,-6%)'
      } else if (window.scrollY > 200 && window.scrollY <= 250) {
        BG.value.style.transform = 'translate(0%,-12%)'
      } else if (window.scrollY >= 300 && window.scrollY <= 350) {
        BG.value.style.opacity = 0.75
        BG.value.style.transform = 'translate(0%,-18%)'
      } else if (window.scrollY >= 350 && window.scrollY <= 400) {
        BG.value.style.opacity = 0.5
        BG.value.style.transform = 'translate(0%,-24%)'
      } else if (window.scrollY >= 450 && window.scrollY <= 500) {
        BG.value.style.opacity = 0.25
      } else if (window.scrollY >= 500) {
        BG.value.style.opacity = 0
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
    img {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: auto;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      transform: translate(0%,0%);
      transition: clip-path 0.5s,opacity .8s,transform .8s;
      // transition: opacity .1s;;
    }
    .oneClose {
      clip-path: polygon(50% 10%, 60% 50%, 50% 90%, 40% 50%);
    }
    .one {
      display: block;
      width: 100vw;
      height: 100vh;
      position: relative;
      // height: 100vh;
      // background-color: #000;
    }
    .two {
      position: relative;
      display: block;
      width: 100vw;
      height: 250vh;
      // background-color: #000;

      // &-body {
      //   width: 100vw;
      //   height: 100vh;
      //   background-color: #000;
      // }
    }
    .three {
      position: relative;
      display: block;
      width: 100vw;
      height: 250vh;
      // background-color: #000;
    }
  }
</style>
