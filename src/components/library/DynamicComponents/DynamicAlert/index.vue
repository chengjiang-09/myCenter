<template>
  <transition name="fade-alert" mode="out-in" appear>
    <div class="DynamicAlert" v-if="clear">
      <div class="DynamicAlert-container">
        <div class="top">
          <span :style="{ fontSize: `${titleSize}px` }">{{ title }}</span>
          <span
            class="close"
            :style="{ display: 'block', width: `${titleSize}px` }"
            @click="clear = false"
          >
            <Close />
          </span>
        </div>
        <div class="alertBody">
          <p>
            {{ context }}
          </p>
        </div>
        <div class="Nobtn">
          <DynamicButton :width="8" @click="closeClick(false)">
            取消
          </DynamicButton>
        </div>
        <div class="Yesbtn">
          <DynamicButton :width="8" @click="closeClick(true)">
            确定
          </DynamicButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import DynamicButton from '@/components/library/DynamicComponents/DynamicButton'
import { onMounted, ref } from 'vue'
import store from '@/store'
export default {
  name: 'DynamicAlert',
  components: {
    Close,
    DynamicButton
  },
  props: {
    title: {
      type: String,
      default: 'warning'
    },
    titleSize: {
      type: Number,
      default: 24
    },
    context: {
      type: String,
      default: '警告！'
    },
    callback: {
      type: Function,
      default: function (flag) {
        return flag
      }
    }
  },
  setup (props) {
    const clear = ref(false)

    onMounted(() => {
      clear.value = true
    })

    const closeClick = (flag) => {
      props.callback(flag)
      clear.value = false
      store.commit('setAlertFlag', flag)
    }

    return {
      clear, closeClick
    }
  }
}
</script>

<style scoped lang="less">
.fade-alert-enter-from,
.fade-alert-leave-to {
  opacity: 0!important;
}

.fade-alert-enter-active,
.fade-alert-leave-active {
  transition: opacity .6s;
}

.fade-alert-enter-to,
.fade-alert-leave-from {
  opacity: 0.9!important;
}

@baseColor: #666666;
.DynamicAlert {
  position: fixed;
  width: 30vw;
  height: 28vh;
  left: 50%;
  top: 20%;
  transform: translate(-50%, 0);
  z-index: 999;
  background-color: #fff;
  border: 1px solid @baseColor;
  border-radius: 1vw 1vw;
  opacity: 0.9;
  .DynamicAlert-container {
    width: 100%;
    height: 100%;
    position: relative;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 0 1vw;
      border-bottom: 1px solid @baseColor;
      user-select: none;

      .close {
        margin-top: 7px;
        transition: border 0.1s;
        border: transparent;
        cursor: pointer;
        &:active {
          border: 2px solid transparent;
        }
      }
    }
    .alertBody {
      padding: 3vh 2vw 5vh 2vw;
      width: 100%;
      height: 15vh;
      p {
        text-indent: 1vw;
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
    }

    .Nobtn {
      position: absolute;
      right: 1vw;
      bottom: 1vh;
    }
    .Yesbtn {
      position: absolute;
      left: 1vw;
      bottom: 1vh;
    }
  }
}

@media (max-width: 1024px), (max-height: 600px) {
  .DynamicAlert {
    display: none !important;
  }
}
</style>
