<template>
  <p class="DynamicBalloon">
    <span>《{{ str1 }}》</span
    ><span> · </span><span>{{ str2 }}</span>
  </p>
</template>

<script>
export default {
  name: 'DynamicBalloon',
  props: {
    str1: {
      type: String,
      default: 'demo1'
    },
    str2: {
      type: String,
      default: 'demo2'
    }
  }
}
</script>

<style scoped lang="less">
.DynamicBalloon {
  height: 5vh;
  width: auto;
  margin: 1vh 1vw;
  display: flex;
  align-content: center;
  cursor: pointer;
  transition: margin .4s ;
  // animation: move2 3s linear 0s infinite;

  // @keyframes move2 {
  //   0% {
  //     opacity: 1;
  //   }
  //   50% {
  //     opacity: 0;
  //   }
  //   100%{
  //     opacity: 1;
  //   }
  // }

  &:hover {
    margin:1.5vh 1vw 2vh 1vw;
  }
  span {
    color: #fff;
  }

  span:nth-of-type(1) {
    box-sizing: border-box;
    display: inline-block;
    height: 5vh;
    padding: 0vh 1vw;
    line-height: 4.5vh;
    border: 2px solid #fff;
    border-radius: 5vh 3.5vh 3.5vh 5vh;
  }

  span:nth-of-type(2) {
    display: block;
    height: 5vh;
    font-size: 34px;
    line-height: 3vh;
    padding: 1vh 0.2vw;
  }

  span:nth-of-type(3) {
    box-sizing: border-box;
    display: block;
    height: 5vh;
    line-height: 4.5vh;
    padding: 0vh 1vw;
    border: 2px solid #fff;
    border-radius: 3.5vh 5vh 5vh 3.5vh;
  }
}
</style>
