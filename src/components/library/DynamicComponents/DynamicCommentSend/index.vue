<template>
  <div class="DynamicCommentSend">
    <textarea
      cols="2"
      rows="10"
      class="DynamicCommentSend-text"
      v-model="comment"
      placeholder="在这写下祝福！"
      @keydown.enter="aClick"
    ></textarea>
    <a
      href="javascript:;"
      class="DynamicCommentSend-a"
      @click="aClick"
      ><div class="DynamicCommentSend-btn">留下足迹</div
    ></a>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { tokenCookie } from '@/utils/auth'
import { sendFootprintAPI } from '@/api'
import { getTime } from './normalizeTime.js'
import myAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook.js'
export default {
  name: 'DynamicCommentSend',
  setup () {
    const comment = ref('')
    const router = useRouter()

    const store = useStore()

    const commentConfig = reactive({
      masterName: '',
      masterID: 0,
      author: null,
      date: '',
      context: ''
    })

    const aClick = async () => {
      if (tokenCookie.getToken()) {
        if (comment.value.trim() === '') {
          myAlert({ title: '警告', context: '输入信息为空！' })
        } else {
          commentConfig.author = store.state.user.userInfo.name
          commentConfig.context = comment.value
          commentConfig.date = getTime()

          const { status, msg } = await sendFootprintAPI(commentConfig)

          if (status === 1) {
            store.commit('center/clearCommentList')
            await store.dispatch('center/updateCommentPageNumberMax')
            await store.dispatch('center/updateCommentList')
            store.commit('center/setCommentShowList', store.state.center.commentList[1])
            myAlert({
              title: '提示',
              context: msg
            })
          } else if (status === 2) {
            myAlert({
              title: '提示',
              context: msg,
              contextSize: 20
            })
          }
        }
      } else {
        myAlert({
          title: '提示',
          context: '请登录后再发布您的评论，是否前往登录页面？',
          callback: (flag) => {
            if (flag) {
              router.push('/')
            }
          }
        })
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
