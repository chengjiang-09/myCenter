<template>
  <button
    type="button"
    class="DynamicButton"
    :style="{
      width: `${width}vw`,
      height: `${height}vh`,
      borderColor: borderColor,
      fontSize: `${fontSize}px`,
      borderRadius: `${borderRadius}vh`
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
      default: '#888888'
    },
    fontSize: {
      type: Number,
      default: 16
    },
    borderRadius: {
      type: Number,
      default: 2.5
    }
  }
}
</script>

<style scoped lang="less">
.DynamicButton {
  user-select: none;
  transform: translateZ(0);
  transition: border 0.3s;
  color: #000;
  font-weight:600;
  cursor: pointer;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-left: .5vh solid;
  border-right: .5vh solid;
  border-radius: 2.5vh;

  &:hover {
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
