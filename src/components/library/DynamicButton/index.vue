<template>
  <button
    type="button"
    class="DynamicButton"
    :style="{
      width: `${width}vw`,
      height: `${height}vh`,
      borderColor: borderColor,
      fontSize: `${fontSize}px`,
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'DynamicButton',
  props: {
    width: {
      type: Number,
      default: 12
    },
    height: {
      type: Number,
      default: 5
    },
    borderColor: {
      type: String,
      default: '#666666'
    },
    fontSize: {
      type: Number,
      default: 16
    }
  }
}
</script>

<style scoped lang="less">
.DynamicButton {
  min-width: 80px;
  min-height: 38px;
  transition: all 0.3s;
  cursor: pointer;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-left: .5vh solid;
  border-right: .5vh solid;
  border-radius: 2.5vh;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    border-left: 1.5vh solid;
    border-right: 1.5vh solid;
  }

  &:active {
    transition: all 0.1s;
    border-left: .5vh solid;
    border-right: .5vh solid;
  }
}
</style>
