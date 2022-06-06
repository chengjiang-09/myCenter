<template>
    <div class="DynamicFooterPrompt" :class="[{DynamicFooterPromptShow:showFlag}]">
        <h4 class="prompt"><p>感谢您的浏览！</p><p>暂时只有这么多了~~</p></h4>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'DynamicFooterPrompt',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const showFlag = computed({
      get () {
        return props.show
      }
    })

    return {
      showFlag
    }
  }
}
</script>

<style scoped lang="less">
.DynamicFooterPrompt {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-60%, -50%);
    opacity: 0;
    transition: transform 1s, opacity 1s;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    pointer-events: none;

    .prompt {
        text-align: center;
        color: #fff;
        p {
            font-size: 5vw;
        }
    }
}

.DynamicFooterPromptShow {
    transform: translate(-50%, -50%);
    opacity: 1;
}
</style>
