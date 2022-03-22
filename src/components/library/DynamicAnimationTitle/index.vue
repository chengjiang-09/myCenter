<template>
  <h2 class="DynamicATitle">
    标题
    <i class="underLineRight"></i>
  </h2>
</template>

<script>
export default {
  name: 'DynamicATitle'
}
</script>

<style scoped lang="less">
@width: 12vw;
.DynamicATitle {
  cursor: pointer;
  position: relative;
  width: 12vw;
  height: 8vh;
  border-bottom: 1px solid #000;
  text-align: center;
  padding-top: 4vh;
  // line-height: 4vw;
  .underLineRight {
    transition: width 0.8s linear,transform 0.8s linear;
    // transition: transform 0.8s linear;
    display: block;
    position: absolute;
    width: 0;
    height: 0.2vh;
    left: 40%;
    bottom: -1vh;
    transform: translate(5%, 100%);
    border-bottom: 1px dashed #000;
  }

  &:hover {
    .underLineRight {
      transform: translate(-40%, 0%);
      width: 90%;
    }
  }
}
</style>
