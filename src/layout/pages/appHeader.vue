<template>
  <div class="app-header">
    <i class="header-style"></i>
    <div class="app-logo">
      <h1>chengjiang_09的主页</h1>
    </div>
    <div class="app-nav">
      <div>
        <ul v-if="token && userInfo.id">
          <li><span>{{ userInfo.name }} </span><span>欢迎你！</span></li>
          <li><DynamicA @onClick="down">退 出</DynamicA></li>
        </ul>
        <ul v-else>
          <li><DynamicA @onClick="down">登 录</DynamicA></li>
          <li><DynamicA @onClick="down">注 册</DynamicA></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { tokenCookie } from '@/utils/auth'
export default {
  name: 'AppHeader',
  setup () {
    const store = useStore()

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

    const down = (e) => {
      console.log(e)
    }

    return {
      down, token, userInfo
    }
  }
}
</script>

<style scoped lang="less">
.app-header {
  position: fixed;
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
