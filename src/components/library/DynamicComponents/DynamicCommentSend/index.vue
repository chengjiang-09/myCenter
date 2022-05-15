<template>
  <div class="DynamicCommentSend">
    <textarea
      cols="2"
      rows="10"
      class="DynamicCommentSend-text"
      v-model="comment"
      placeholder="在这写下祝福！"
    ></textarea>
    <a
      href="javascript:;"
      class="DynamicCommentSend-a"
      :class="[{ aHover: aHoverFlag }]"
      @click="aClick"
      ><div class="DynamicCommentSend-btn">留下足迹</div
    ></a>
  </div>
</template>

<script>
import { ref } from 'vue'
import myAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook.js'
export default {
  name: 'DynamicCommentSend',
  setup () {
    const comment = ref('')

    const aClick = () => {
      if (comment.value.trim() === '') {
        myAlert({ title: '警告', context: '输入信息为空！' })
      }
    }

    return {
      comment,
      aClick
    }
  }
}
</script>

<style scoped lang="less">
.DynamicCommentSend {
  &-text {
    position: absolute;
    left: 44%;
    top: 5%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 10vh;
    padding: 1.5vh 1vw;
    resize: none;
    border-radius: 3vh;
    font-family: "myFont";
    font-size: 22px;
    overflow: hidden;
    background-color: transparent;
    color: #fff;
  }
  &-a {
    position: absolute;
    left: 70%;
    top: 5%;
    transform: translate(-50%, -50%);
    .DynamicCommentSend-btn {
      width: 10vw;
      height: 10vh;
      border: 2px solid #fff;
      border-radius: 5vh;
      line-height: 9.5vh;
      text-align: center;
      color: #fff;
      font-size: 2vw;
      font-family: "myFont";
    }
  }
}
</style>
