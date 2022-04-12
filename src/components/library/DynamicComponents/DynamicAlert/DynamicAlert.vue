<template>
  <div class="DynamicAlert">
    <div class="container">
      <div class="top">
        <span :style="{ fontSize: `${titleSize}px` }">{{ title }}</span>
        <span
          class="close"
          :style="{ display: 'block', width: `${titleSize}px` }"
        >
          <Close />
        </span>
      </div>
      <div class="alertBody">
        <p>
          1231241DASEQWEQWAQ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
export default {
  name: 'DynamicAlert',
  components: {
    Close
  },
  props: {
    title: {
      type: String,
      default: 'warning'
    },
    titleSize: {
      type: Number,
      default: 24
    }
  }
}
</script>

<style scoped lang="less">
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
  .container {
    width: 100%;
    height: 100%;
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
  }
}
</style>
