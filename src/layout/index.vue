<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:57:12
 * @LastEditTime: 2022-03-19 16:04:34
-->
<template>
  <DynamicMouseFullow />
  <div class="container">
    <!-- <AppSider /> -->
    <ScreenProtection class="SP" />
    <ul class="BGimg">
      <li class="one">
        <img
          src="~@/assets/images/2.jpg"
          alt=""
          :class="{ oneClose: oneBGFlag }"
        />
        <DynamicNowWeather
          @onMouseMove="onMouseMove"
          @onMouseLeave="onMouseLeave"
        />
      </li>
      <li class="one">
        <img
          src="~@/assets/images/2.jpg"
          alt=""
        />
      </li>
      <li class="one">
        <img
          src="~@/assets/images/2.jpg"
          alt=""
        />
      </li>
    </ul>
    <div class="layout">
      <AppHeader />
    </div>
  </div>
</template>

<script>
// import AppSider from '@/layout/components/appSider.vue'
import AppHeader from '@/layout/pages/appHeader.vue'
import { ref } from 'vue'

export default {
  name: 'MyLayout',
  components: {
    // AppSider
    AppHeader
  },
  setup () {
    const oneBGFlag = ref(false)

    const onMouseMove = () => {
      oneBGFlag.value = true
    }

    const onMouseLeave = () => {
      oneBGFlag.value = false
    }

    return {
      onMouseMove,
      onMouseLeave,
      oneBGFlag
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: auto;
  .BGimg {
    user-select: none;
    .one {
      display: block;
      position: relative;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      img {
        width: 100vw;
        height: auto;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        transition: clip-path 0.5s;
      }

      .oneClose {
        clip-path: polygon(50% 10%, 60% 50%, 50% 90%, 40% 50%);
      }
    }
  }
}
</style>
