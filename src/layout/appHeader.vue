<template>
  <div class="app-header" :class="{appheadershow:showFlag}">
    <i class="header-style"></i>
    <div class="app-logo">
      <h1>chengjiang_09的主页</h1>
    </div>
    <div class="app-nav">
      <div>
        <ul v-if="token && userInfo.id">
          <li><DynamicA><span>{{ userInfo.name }} </span><span> 欢迎你！</span></DynamicA></li>
          <li><DynamicA @onClick="loginOut">退 出</DynamicA></li>
        </ul>
        <ul v-else>
          <li><DynamicA path="/">登 录</DynamicA></li>
          <li><DynamicA path="/">注 册</DynamicA></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { tokenCookie } from '@/utils/auth'
import DynamicAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook.js'
import { COMPOMENT_SHOW_TIME } from '@/utils/keyWord.js'
export default {
  name: 'AppHeader',
  setup () {
    const store = useStore()
    const router = useRouter()

    const userInfo = computed({
      get () {
        return store.state.user.userInfo
      }
    })

    const token = computed({
      get () {
        return tokenCookie.getToken()
      }
    })

    const loginOut = (e) => {
      DynamicAlert({
        title: '通知',
        context: '是否确认退出？',
        callback: (flag) => {
          if (flag) {
            tokenCookie.removeToken()
            router.push('/')
          }
        }
      })
    }

    const showFlag = ref(false)

    onMounted(() => {
      setTimeout(() => {
        showFlag.value = true
      }, COMPOMENT_SHOW_TIME)
    })

    return {
      loginOut, token, userInfo, showFlag
    }
  }
}
</script>

<style scoped lang="less">
@COPONENT_SHOW_TIME: .7s;
.appheadershow {
  transform: translate(0%,0%) !important;
}

.app-header {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 10vh;
  backdrop-filter: blur(6px);
  background-color: transparent;
  transition: transform @COPONENT_SHOW_TIME;
  transform: translate(-200%,0%);

  .header-style {
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 97vw;
    height: 4vh;
    border-bottom: 1px solid rgba(245, 238, 230, 0.5);
  }
  .app-logo {
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(0%,-50%);
    user-select: none;
    h1{
      color: #fff;
    }
  }
  .app-nav {
    position:absolute;
    top: 50%;
    right: 1%;
    transform:translate(0,-50%);
    ul{
      display: flex;
      li {
        user-select: none;
        margin-right: 4vw;
        span {
          color: #fff;
        }
        a {
          font-family: myFont;
          color: #fff;
          border-bottom: 1px solid #fff;
          transition: transform 2s;
          transform:rotateZ(0deg)

          &:hover {
            transform:rotateZ(360deg)
          }
        }
      }
    }
  }
}
</style>
