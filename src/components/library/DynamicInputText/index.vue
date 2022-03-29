<template>
  <div>
    <input
      id="DyText"
      class="DynamicIText"
      type="text"
      @blur="blurFn"
      @focus="focusFn"
      :placeholder="title"
      @input="setValue"
      :value="value"

      :style="{width:`${width}vw`}"
    />
    <p class="warnText">{{ warnText }}</p>
  </div>
</template>

<script>
export default {
  name: 'DynamicIText',
  props: {
    title: {
      type: String,
      default: '手机号或邮箱'
    },
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 20
    },
    warnText: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const setValue = (e) => {
      emit('update:value', e.target.value)
    }

    const blurFn = (e) => {
      e.target.placeholder = props.title
      emit('blur')
    }

    const focusFn = (e) => {
      e.target.placeholder = ''
    }

    return {
      setValue,
      blurFn,
      focusFn
    }
  }
}
</script>

<style scoped lang="less">
.DynamicIText {
  box-sizing: border-box;
  background: #fff;
  border: 1px solid rgb(129, 129, 129);
  margin: 3px 2px;
  border-radius: 1vh;
  width: 20vw;
  height: 6vh;
  padding: 0.3vh 2vw;

  &:focus {
    outline: none;
    border: 2px solid rgb(129, 129, 129);
  }
}

.warnText {
  display: block;
  height: 2vh;
  font-size: 1.6vh;
  color: rgb(156, 25, 25);
}
</style>
