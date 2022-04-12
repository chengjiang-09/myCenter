<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 11:11:19
 * @LastEditTime: 2022-03-17 17:03:12
-->
<template>
  <div class="ScreenProtection">
  </div>
</template>

<script>
export default {
  name: 'ScreenProtection'
}
</script>

<style scoped lang="less">
    .ScreenProtection {
      width: 100%;
      height: 100%;
    &::before {
      z-index: -1;
      content: "";
      position: absolute;
      top: 0;
      width: 200%;
      height: 100%;
      animation: moveBG1 1.5s linear 0s infinite;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.349) 0,
        rgba(0, 0, 0, 0.473) 50%,
        rgba(0, 0, 0, 0.349) 100%
      );
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 200%;
      height: 100%;
      animation: moveBG2 1.5s linear 0s infinite;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.349) 0,
        rgba(0, 0, 0, 0.473) 50%,
        rgba(0, 0, 0, 0.349) 100%
      );
    }
    @keyframes moveBG1 {
      0% {
        left: -300%;
      }

      100% {
        left: -100%;
      }
    }
    @keyframes moveBG2 {
      0% {
        left: -100%;
      }

      100% {
        left: 100%;
      }
    }
  }
</style>
