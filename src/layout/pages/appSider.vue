<template>
  <div class="app-sider" :class="[{ siderClose: flag }]">
    <div class="sider-body">
      <ScreenProtection />
    </div>
    <div class="open-close" @click="flag = !flag">
      <div class="open-flag-right"></div>
      <div class="open-flag-left" :class="[{ close: flag }]"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'appSider',
  setup () {
    const flag = ref(true)

    return {
      flag
    }
  }
}
</script>

<style scoped lang="less">
@baseColor: rgba(0, 0, 0, 0.2);
.app-sider {
  position: fixed;
  height: 100vh;
  width: 20vw;
  border-radius: 1vh;
  top: 0;
  left: 0;
  background-image: linear-gradient(#000, transparent);
  transform: translateX(0);
  transition: transform 1s;
  opacity: 0.7;

  .sider-body {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .open-close {
    cursor: pointer;
    .open-flag {
      &-right {
        transform: rotateZ(45deg);
        // width: 100px;
        // height: 100px;
        // background-color: transparent;
        border-top: 50px solid @baseColor;
        border-right: 50px solid @baseColor;
        border-bottom: 50px solid transparent;
        border-left: 50px solid transparent;
        border-radius: 50px;
        position: absolute;
        top: 40px;
        right: -50px;
        transition: transform 1s;
      }
      &-left {
        transform: rotateZ(45deg);
        width: 100px;
        height: 100px;
        background-color: transparent;
        background-image: linear-gradient(#a73535ee, #3a2f4b80);;
        // border-left: 50px solid #000;
        // border-bottom: 50px solid #000;
        // border-top: 50px solid transparent;
        // border-right: 50px solid transparent;
        // border-left: 5px solid transparent;
        // border-bottom: 5px solid transparent;
        // border-top: 5px solid transparent;
        // border-right: 5px solid transparent;
        border-radius: 50px;
        position: absolute;
        top: 40px;
        right: -50px;
        transition: transform 1s;
      }
    }
    .close {
      transform: rotateZ(-495deg);
    }
  }
}
.siderClose {
  transform: translateX(-100%);
}
</style>
