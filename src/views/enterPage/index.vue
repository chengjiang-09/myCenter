<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 15:11:34
 * @LastEditTime: 2022-03-19 17:59:09
-->
<template>
  <div class="EnterPage">
    <DynamicAlert />
    <div
      class="container"
      :class="[{ translatePage: tsFlag }, { translatePageClose: !tsFlag }]"
    >
      <ScreenProtection class="SP" />
      <div class="pageBox">
        <div class="enter">
          <div>
            <RouterLink to="/center"><span> E N T E R </span> </RouterLink>
          </div>
        </div>
        <div class="logo"></div>
        <div class="title">
          <h2>我是 chengjiang_09</h2>
          <h3>欢 迎 来 到 我 的 <span>主 页</span> ！</h3>
        </div>
        <div class="accept">
          <p @click="tsFlag = true">
            <span></span>
            <span></span>
            <span></span>
          </p>
        </div>
        <div class="DynamicVidoe">
          <DynamicVidoe />
        </div>
      </div>
    </div>
    <div
      class="FulLayout"
      :class="[
        { translatePageFullLayout: tsFlag },
        { translatePageFullLayoutClose: !tsFlag },
      ]"
    >
      <div class="Closeicon">
        <div @click="tsFlag = false">
          <close />
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import { ref } from 'vue'
export default {
  name: 'EnterPage',
  components: {
    Close
  },
  setup () {
    const tsFlag = ref(null)

    return {
      tsFlag
    }
  }
}
</script>

<style scoped lang="less">
.translatePage {
  transition: all 2s;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  transform: translate(-35%, 0%);

  .SP {
    &::before {
      animation: moveBG3 1.5s linear 0s infinite;
      z-index: 999 !important;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.637) 0,
        rgba(0, 0, 0, 0.829) 50%,
        rgba(0, 0, 0, 0.637) 100%
      ) !important;
    }
    &::after {
      animation: moveBG4 1.5s linear 0s infinite;
      z-index: 999 !important;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.637) 0,
        rgba(0, 0, 0, 0.829) 50%,
        rgba(0, 0, 0, 0.637) 100%
      ) !important;
    }
    @keyframes moveBG3 {
      0% {
        right: -300%;
      }

      100% {
        right: -100%;
      }
    }
    @keyframes moveBG4 {
      0% {
        right: -100%;
      }

      100% {
        right: 100%;
      }
    }
  }

  .accept {
    display: none;
  }

  .enter {
    div {
      span {
        &::before {
          animation: none !important;
        }
      }
    }
  }
}

.translatePageClose {
  transition: all 2s;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  transform: translate(0%, 0%);

  &::before {
    animation: moveBG1 1.5s linear 0s infinite;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.349) 0,
      rgba(0, 0, 0, 0.473) 50%,
      rgba(0, 0, 0, 0.349) 100%
    );
  }
  &::after {
    animation: moveBG2 1.5s linear 0s infinite;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.349) 0,
      rgba(0, 0, 0, 0.473) 50%,
      rgba(0, 0, 0, 0.349) 100%
    );
  }
}

.translatePageFullLayout {
  transition: all 2s;
  right: -8% !important;
  transform: translate(-25%, 0%);
}

.translatePageFullLayoutClose {
  transition: all 2s;
  transform: translate(0%, 0%);
}

.EnterPage {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  .container {
    .enter {
      z-index: 100;
      position: absolute;
      left: 50%;
      bottom: 20%;
      transform: translate(-50%, -50%);
      div {
        span {
          user-select: none;
          color: #fff;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            z-index: -1;
            top: -255%;
            left: -97%;
            width: 0;
            height: 0;
            animation: enterBG 2s linear 0s infinite;
            border-bottom: 90px solid rgb(182, 180, 180);
            border-left: 90px solid transparent;
            border-right: 90px solid transparent;
          }

          &:hover {
            // transition: all 1s;
            // color: rgb(182, 180, 180);
            &::before {
              animation: enterBG 0.6s linear 0s infinite;
            }
            @keyframes enterBG {
              0% {
                opacity: 1;
              }

              100% {
                opacity: 0.3;
              }
            }
          }
        }
      }
    }
    .logo {
      z-index: 100;
      position: absolute;
      width: 50%;
      height: 50%;
      left: 0;
      top: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      z-index: 100;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h2,
      h3 {
        user-select: none;
      }
      h2 {
        font-size: 40px;
        color: rgb(255, 255, 255) !important;
      }
      h3 {
        color: rgb(182, 180, 180) !important;
        padding-left: 40px;
        font-size: 50px;
        font-weight: 200;
        span {
          color: #fff;
          font-size: 50px;
        }
      }
    }
    .accept {
      position: absolute;
      right: 11%;
      top: 10%;
      z-index: 100;
      p {
        cursor: pointer;
        position: absolute;
        right: 6%;
        top: 7%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
          span {
            transform: translateY(200%);
            border: 2px solid rgb(146, 132, 132);
          }
        }
        span {
          display: block;
          margin-bottom: 7px;
          width: 40px;
          transition: all 0.5s;
          border: 2px solid #fff;
          &:nth-child(2) {
            width: 37px;
          }
          &:nth-child(3) {
            width: 37px;
          }
        }
      }
    }
    .DynamicVidoe {
      // z-index: 999;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .FulLayout {
    overflow: hidden;
    position: fixed;
    width: 34%;
    height: 100%;
    right: -100%;
    background-color: #fff;
    top: 0;
    .Closeicon {
      z-index: 999;
      position: relative;
      div {
        position: absolute;
        top: 1vw;
        right: 1vw;
        width: 3vw;
        height: 3vw;
        color: rgb(49, 49, 49);
        cursor: pointer;

        .flicker(0.7,0.1);
      }
    }
  }
}
@media (max-width: 1244px) {
  .FulLayout {
    opacity: 0;
    width: 0 !important;
  }
  .translatePage {
    transform: translate(0%, 0%);
  }
}
</style>
