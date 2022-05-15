<template>
  <li class="sendToSendOne">
    <p>
      <span class="author">{{ author }} </span
      ><span class="time">{{ date }}</span>
    </p>
    <p class="sendToSendData">
      <span>ta说：{{ context }}</span
      ><span
        ><button type="button" class="button" @click="sendTa">
          回复
        </button></span
      >
    </p>
  </li>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'sendOneVNode',
  props: {
    author: {
      type: String,
      default: '作者'
    },
    date: {
      type: [String, Date],
      default: '时间'
    },
    master: {
      type: String,
      default: '原作者'
    },
    context: {
      type: String,
      default: '内容区域'
    }
  },
  setup () {
    const sendTaFlag = ref(false)

    const sendTa = () => {
      sendTaFlag.value = true
    }

    return {
      sendTa
    }
  }
}
</script>

<style scoped lang="less">
.sendToSendOne {
  margin-top: 1.5vh;
  padding-bottom: 1vh;
  border-bottom: 1px dashed #fff;
  .sendToSendData {
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    .button {
      display: block;
    }
  }
  .author,
  .time {
    opacity: 0.6;
  }

  .buttonMaster,
  .button {
    cursor: pointer;
    display: none;
  }
  .sendToSend {
    padding: 2vh 0 0 3vw;
  }
}
</style>
