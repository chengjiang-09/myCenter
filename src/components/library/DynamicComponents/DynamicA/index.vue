<template>
  <div
    class="DynamicA-container"
    @mouseenter="flag = !flag"
    @mouseleave="flag = !flag"
  >
    <a :href="href" @click="onClick" :style="{ fontSize: `${fontSize}vw` }">
      <slot />
      <i
        class="decorateA"
        :class="[{ decorateAY: flag }, { decorateAN: !flag }]"
      ></i>
      <i
        class="decorateA"
        :class="[{ decorateAY: flag }, { decorateAN: !flag }]"
      ></i>
      <i
        class="decorateA"
        :class="[{ decorateAY: flag }, { decorateAN: !flag }]"
      ></i>
    </a>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'DynamicA',
  props: {
    href: {
      type: String,
      default: 'javascript:;'
    },
    path: {
      type: String,
      default: ''
    },
    fontSize: {
      type: [String, Number],
      default: 2
    }
  },
  setup (props, { emit }) {
    const flag = ref(false)
    const router = useRouter()

    const onClick = (e) => {
      emit('onClick', e)
      if (props.path.length !== 0) {
        router.push(props.path)
      }
    }

    return {
      onClick,
      flag
    }
  }
}
</script>

<style scoped lang="less">
.DynamicA-container {
  cursor: pointer;
  user-select: none;
  position: relative;
  .decorateA {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1px;
    background-color: #fff;
    transition: width 0.2s;
  }
  .decorateAY {
    width: 120%;
  }
  .decorateAN {
    width: 0%;
  }
  a {
    color: #fff;
    font-family: myFont;
    i:nth-of-type(2) {
      top: 0%;
      left: 50%;
      transform: translate(-50%, 0%);
    }
    i:nth-of-type(3) {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0%);
    }
  }
}
</style>
