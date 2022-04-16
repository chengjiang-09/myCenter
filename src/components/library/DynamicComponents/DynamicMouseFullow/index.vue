<template>
  <div class="mouseBG" ref="move"></div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'DynamicMouseFullow',
  setup () {
    const move = ref(null)

    window.onmousemove = (e) => {
      const left = e.clientX - 50
      const top = e.clientY - 50

      move.value.style.transform = `translate3d(${left}px,${top}px,0px)`
    }

    return {
      move
    }
  }
}
</script>

<style scoped lang="less">
.mouseBG {
  pointer-events: none;
  position: fixed;
  z-index: 999;
  transition: transform 0.3s ease-out;

  ::before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: transparent;
    border: 3px solid #888888;
    border-radius: 100px;
  }
}
</style>
