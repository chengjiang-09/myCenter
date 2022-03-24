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
      <div class="title">
        <ul>
          <li>
            <DynamicATitle
              title="登录"
              :actionStatus="actionStatus === 'login'"
              @click="actionPageFn('login')"
            ></DynamicATitle>
          </li>
          <li>
            <DynamicATitle
              title="注册"
              :actionStatus="actionStatus === 'register'"
              @click="actionPageFn('register')"
            ></DynamicATitle>
          </li>
        </ul>
      </div>
      <div class="form">
        <transition name="fada-ful" mode="out-in">
          <EnterLogin v-if="actionStatus === 'login'" />
          <EnterRegister v-else />
        </transition>
      </div>
      <div class="loginBtn">
        <DynamicButton :width="14">登 录</DynamicButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import EnterLogin from './components/enter-login.vue'
import EnterRegister from './components/enter-register.vue'
export default {
  name: 'EnterFulLayout',
  components: {
    EnterLogin,
    EnterRegister
  },
  setup () {
    const componentIs = ref('EnterLogin')
    const actionPage = ref('login')

    const actionPageFn = (name) => {
      actionPage.value = name
    }

    const actionStatus = computed({
      get () {
        return actionPage.value
      },
      set (value) {}
    })

    return {
      actionStatus,
      actionPage,
      componentIs,
      actionPageFn
    }
  }
}
</script>

<style scoped lang="less">
.fada-ful-enter-from,
.fada-ful-leave-to {
  opacity: 0;
  transform: translateX(300%);
}

.fada-ful-enter-active,
.fada-ful-leave-active {
  transition: all 1s;
}

.fada-ful-enter-to,
.fada-ful-leave-from {
  opacity: 1;
  transform: none;
}

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
    .form {
      position: absolute;
      top: 35%;
      left: 50%;
      bottom: 30%;
      transform: translateX(-50%);
    }
    .title {
      user-select: none;
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      ul {
        display: flex;
        li {
          margin: 0 1vh;
        }
      }
    }
    .loginBtn {
      user-select: none;
      position: absolute;
      left: 50%;
      bottom: 20%;
      transform: translateX(-50%);
    }
  }
}
</style>
