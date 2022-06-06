<template>
  <DynamicFooterPrompt :show="showFooterFlag" />
  <div class="appFooter" :class="[{ appFooterShow: showFooterFlag }]">
    <i class="appFooter-style"></i>
    <ul class="appFooter-body">
      <li>
        <Message class="icon" /><DynamicA class="email">chengjiang_09@163.com</DynamicA>
      </li>
      <li>Copyright © 2022-2022 chengjiang_09</li>
    </ul>
  </div>
</template>

<script>
import { Message } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
export default {
  name: 'appFooter',
  components: {
    Message
  },
  setup () {
    const showFooterFlag = ref(false)
    const showFooter = () => {
      if (window.scrollY >= 3500) {
        showFooterFlag.value = true
      } else {
        showFooterFlag.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', showFooter)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', showFooter)
    })

    return {
      showFooterFlag
    }
  }
}
</script>

<style scoped lang="less">
.appFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30vh;
  backdrop-filter: blur(6px);
  background-color: transparent;
  transform: translate(0, 100%);
  opacity: 0;
  transition: transform 1s, opacity 1s;

  &-style {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 97vw;
    height: 4vh;
    border-top: 1px solid rgba(245, 238, 230, 0.5);
  }

  &-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 2vh;
      .icon {
        width: 3vw;
      }
    }
  }
}

.appFooterShow {
  transform: translate(0, 0%);
  opacity: 1;
}
</style>
