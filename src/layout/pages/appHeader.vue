<template>
  <div class="app-header">
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { tokenCookie } from '@/utils/auth'
import DynamicAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook.js'
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

    return {
      loginOut, token, userInfo
    }
  }
}
</script>

<style scoped lang="less">
.app-header {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 10vh;
  backdrop-filter: blur(6px);
  background-color: transparent;

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
