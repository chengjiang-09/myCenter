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
              title="短信登录"
              :actionStatus="actionStatus === 'login'"
              @click="actionPageFn('login')"
            ></DynamicATitle>
          </li>
          <li>
            <DynamicATitle
              title="密码登录"
              :actionStatus="actionStatus === 'register'"
              @click="actionPageFn('register')"
            ></DynamicATitle>
          </li>
        </ul>
      </div>
      <div class="form">
        <transition name="fada-ful" mode="out-in">
          <EnterMobile
            v-if="actionStatus === 'login'"
            :vNum="vNum"
            :secondFlag="flag"
            :sMobile="sMobile"
            @valiCodeTimer="valiTimer"
          />
          <EnterPassword v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import EnterMobile from './components/enterMobile.vue'
import EnterPassword from './components/enterPassword.vue'
export default {
  name: 'EnterFulLayout',
  components: {
    EnterMobile,
    EnterPassword
  },
  setup () {
    const componentIs = ref('EnterLogin')
    const actionPage = ref('login')

    const changeFlag = ref(true)
    const timer = ref(null)
    const actionPageFn = (name) => {
      if (changeFlag.value) {
        actionPage.value = name
        changeFlag.value = false

        timer.value = setTimeout(() => {
          changeFlag.value = true
        }, 2000)
      }
    }

    clearTimeout(timer.value)

    const actionStatus = computed({
      get () {
        return actionPage.value
      },
      set (value) {}
    })

    const flag = ref(true)
    const vNum = ref(60)
    const vTimer = ref(null)
    const sMobile = ref(null)
    const valiTimer = (mobile) => {
      sMobile.value = mobile
      flag.value = false
      vTimer.value = setInterval(() => {
        vNum.value -= 1
        if (vNum.value === -1) {
          flag.value = true
          vNum.value = 60
          clearInterval(vTimer.value)
        }
      }, 1000)
    }

    return {
      actionStatus,
      actionPage,
      componentIs,
      actionPageFn,
      valiTimer,
      flag,
      vNum,
      sMobile
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
    animation: bgmove 3s linear 0s infinite;

    @keyframes bgmove {
      0% {
        opacity:0.1;
      }

      50% {
        opacity:0.2;
      }

      0%{
        opacity:0.1;
      }
    }
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
      top: 40%;
      left: 50%;
      bottom: 15%;
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
  }
}
</style>
