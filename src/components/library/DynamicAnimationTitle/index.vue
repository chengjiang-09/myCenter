<template>
  <h2 class="DynamicATitle">
    <span v-for="(value,index) in AnimationTitle" :key="index">
      {{ value }}
    </span>
  </h2>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'DynamicATitle',
  props: {
    title: {
      type: String,
      default: '标题标题标题标',
      validator: (title) => {
        console.log(title.length)
        return title.length < 8
      }
    }
  },
  setup (props, { $emit }) {
    const AnimationTitle = reactive(props.title.split(''))

    return {
      AnimationTitle
    }
  }
}
</script>

<style scoped lang="less">
@width: 12vw;
.DynamicATitle {
  cursor: pointer;
  position: relative;
  transition: color .6s;
  width: 12vw;
  height: 8vh;
  color: rgb(100, 100, 100);
  border-bottom: 1px solid #000;
  text-align: center;
  padding-top: 4vh;
  // line-height: 4vw;
  span {
    transition: margin .6s;
    margin: 0;
  }
  &::before {
    content: "";
    transition: all .6s;
    position: absolute;
    width: 90%;
    height: 1vh;
    left: 5%;
    bottom: -20%;
    transform: scale(0,0);

    border-bottom: 1px dashed #000;

  }

  &:hover {
    color: #000;
    span {
      margin: 0 4px;
    }
    &::before{
      transform: scale(1,1);
    }
  }
}
</style>
