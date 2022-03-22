<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 15:16:27
 * @LastEditTime: 2022-03-17 18:25:44
-->
<template>
  <div class="EnterFulLayout">
    <div class="bg"></div>
    <div class="enterFulSP">
      <ScreenProtection />
    </div>
    <div class="body">
      <DynamicATitle></DynamicATitle>
      <div class="loginBtn">
        <DynamicButton :width="14">登 录</DynamicButton>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ScreenProtection from './components/screenProtection.vue'
export default {
  name: 'EnterFulLayout',
  components: {
    ScreenProtection
  }
}
</script>

<style scoped lang="less">
.EnterFulLayout {
  width: 100%;
  height: 100%;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/bian.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.1;
  }
  .enterFulSP {
    opacity: 0.2;
  }
  .body {
    z-index: 100;
    position: absolute;
    left: 50%;
    width: 100%;
    height: 100%;
    top: 0;
    transform: translateX(-50%);
    padding: 4vh 6vw;
    .loginBtn {
      position: absolute;
      left: 50%;
      bottom: 20%;
      transform: translateX(-50%);
    }
  }
}
</style>
