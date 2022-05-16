<template>
  <div class="DynamicCommentBall">
    <p class="comment" @click="downNav">
      {{ data.context }}
    </p>
    <div class="downNav" :class="[{ downNavShow: donwNavFlag }]">
      <div class="send">
        <input
          type="text"
          class="input"
          placeholder="回复TA"
          v-model="sendMasterText"
          @keydown.enter="sendMaster(data.id, data.author)"
        />
        <button
          type="button"
          class="button"
          @click="sendMaster(data.id, data.author)"
        >
          回复ta
        </button>
      </div>
      <ul class="otherComment">
        <li class="otherCommentOne" v-for="obj in child" :key="obj.id">
          <div class="otherCommentOneData">
            <p>
              <span class="author">{{ obj.author }} </span>
              <span class="time"> {{ obj.date }}</span>
            </p>
            <p class="commentData">
              <span>ta说：{{ obj.context }}</span
              ><span
                ><button
                  type="button"
                  class="buttonMaster"
                  @click="sendTa(obj.id, obj.author)"
                >
                  回复
                </button></span
              >
            </p>
          </div>
          <div class="sendToSend" ref="sendToSend">
            <ul class="sendToSendList" ref="sendToSendList">
              <li
                class="sendToSendOne"
                v-for="grandSonObj in grandSonObjAll[obj.id]"
                :key="grandSonObj.id"
              >
                <p>
                  <span class="author">{{ grandSonObj.author }}</span>
                  <span class="time"> {{ grandSonObj.date }}</span>
                </p>
                <p class="sendToSendData">
                  <span v-if="grandSonObj.masterName">
                    <span
                      >回复
                      <span class="author">{{ grandSonObj.masterName }}</span
                      >：{{ grandSonObj.context }}</span
                    >
                  </span>
                  <span v-else
                    ><span>ta说：{{ grandSonObj.context }}</span></span
                  >
                  <span>
                    <button
                      type="button"
                      class="button"
                      @click="
                        sendTa(obj.id, grandSonObj.author, grandSonObj.id)
                      "
                    >
                      回复
                    </button></span
                  >
                </p>
              </li>
            </ul>
          </div>
          <div class="allSend" :class="[{ allSendShow: obj.sendBtnFlag }]">
            <span>@{{ sendTarget }}</span
            ><input
              type="text"
              class="allSendInput"
              placeholder="回复TA"
              v-model="sendText"
              @keyup.enter="goSend"
              @blur="allSendOnBlur(obj.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { tokenCookie } from '@/utils/auth.js'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import myAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook.js'
export default {
  name: 'DynamicCommentBall',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const donwNavFlag = ref(true)
    const child = computed({
      get () {
        return props.data.children
      }
    })
    const grandSon = ref([])
    const grandSonObjAll = reactive({})
    const sendTarget = ref('')
    const sendText = ref('')
    const sendMasterText = ref('')
    const sendCommentObj = {}
    const nowDate = ref(null)

    const router = useRouter()
    const store = useStore()

    const userInfo = store.state.user.userInfo

    const downNav = () => {
      donwNavFlag.value = !donwNavFlag.value
    }

    const goSend = async () => {
      if (sendText.value.trim() !== '') {
        nowDate.value = new Date()
        sendCommentObj.id = parseInt(
          `${userInfo.id}${nowDate.value.getFullYear()}${
            nowDate.value.getMonth() + 1
          }${nowDate.value.getDate()}${nowDate.value.getHours()}${nowDate.value.getMinutes()}${nowDate.value.getSeconds()}`
        )
        sendCommentObj.context = sendText.value
        sendCommentObj.date = (function () {
          return `${nowDate.value.getFullYear()}-${
            nowDate.value.getMonth() + 1
          }-${nowDate.value.getDate()}`
        })()
        await store.dispatch('center/updateCommentList', sendCommentObj)
        initCommentList()
        sendText.value = ''
      } else {
        myAlert({
          title: '提示',
          context: '评论内容不能为空！'
        })
      }
    }

    const sendMaster = async (id, sendTargetName) => {
      if (tokenCookie.getToken()) {
        sendCommentObj.masterName = sendTargetName
        sendCommentObj.masterID = id
        sendCommentObj.author = userInfo.name

        if (sendMasterText.value.trim() !== '') {
          nowDate.value = new Date()
          sendCommentObj.id = parseInt(
            `${userInfo.id}${nowDate.value.getFullYear()}${
              nowDate.value.getMonth() + 1
            }${nowDate.value.getDate()}${nowDate.value.getHours()}${nowDate.value.getMinutes()}${nowDate.value.getSeconds()}`
          )
          sendCommentObj.context = sendMasterText.value
          sendCommentObj.date = (function () {
            return `${nowDate.value.getFullYear()}-${
              nowDate.value.getMonth() + 1
            }-${nowDate.value.getDate()}`
          })()
          await store.dispatch('center/updateCommentList', sendCommentObj)
          initCommentList()
          sendMasterText.value = ''
        } else {
          myAlert({
            title: '提示',
            context: '评论内容不能为空！'
          })
        }

        goSend()
      } else {
        myAlert({
          title: '提示',
          context: '请登陆后再发布您的评论，是否前往登录页面？',
          callback: (flag) => {
            if (flag) {
              router.push('/')
            }
          }
        })
      }
    }

    const sendTa = (id, sendTargetName, otherID) => {
      if (tokenCookie.getToken()) {
        sendTarget.value = sendTargetName
        child.value.forEach((obj) => {
          if (obj.id === id) {
            obj.sendBtnFlag = true
          } else {
            obj.sendBtnFlag = false
          }
        })

        sendCommentObj.masterName = sendTargetName
        sendCommentObj.masterID = otherID || id
        sendCommentObj.author = userInfo.name
      } else {
        myAlert({
          title: '提示',
          context: '请登陆后再发布您的评论，是否前往登录页面？',
          callback: (flag) => {
            if (flag) {
              router.push('/')
            }
          }
        })
      }
    }

    const allSendOnBlur = (id) => {
      child.value.forEach((obj) => {
        if (obj.id === id) {
          obj.sendBtnFlag = false
        }
      })
    }

    const initCommentList = () => {
      if (child.value.length !== 0) {
        const createGrandSonList = (grandSonData) => {
          grandSonData.forEach((obj) => {
            if (obj.children) {
              createGrandSonList(obj.children)
            }
            grandSon.value.push(obj)
          })
        }
        child.value.forEach((obj) => {
          obj.sendBtnFlag = false
          grandSon.value = []
          if (obj.children) {
            createGrandSonList(obj.children)
          }
          if (grandSon.value.length !== 0) {
            grandSonObjAll[obj.id] = grandSon.value
          }
        })
      }
    }

    initCommentList()

    return {
      downNav,
      sendTa,
      donwNavFlag,
      allSendOnBlur,
      child,
      grandSonObjAll,
      sendTarget,
      sendText,
      goSend,
      sendMaster,
      sendMasterText
    }
  }
}
</script>

<style scoped lang="less">
.DynamicCommentBall {
  position: relative;
  padding: 3vh 1vw;
  border-left: 1px dashed #fff;
  border-right: 1px dashed #fff;
  margin: 0 1vw 3vh 1vw;
  border-radius: 0 50% 50% 0;
  .comment {
    &:hover {
      animation: hover 1s linear 0s infinite;

      @keyframes hover {
        0% {
          opacity: 1;
        }

        50% {
          opacity: 0.2;
        }

        100% {
          opacity: 1;
        }
      }
    }
    position: relative;
    cursor: pointer;
    font-size: 2vw;
    color: #fff;
    max-width: 45vw;
    .commentAuthor {
      display: block;
      position: absolute;
      bottom: 3vh;
      right: 3vw;
      width: 4vw;
      height: 2vh;
    }
  }
  .downNav {
    // position: absolute;
    // z-index: 10;
    // top: 0%;
    // left: 50%;
    // transform: translate(-50%, 0);
    height: 0;
    background-color: transparent;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: 41vw;
    transition: opacity 0.6s, height 0.6s;
    .send {
      display: flex;
      justify-content: space-between;
      .input {
        padding: 3vh 1vw 1vh;
        width: 35vw;
        font-size: 1.2vw;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #fff;
        background-color: transparent;
        outline: none;
        color: #fff;
        font-family: "myFont";
      }
      .button {
        cursor: pointer;
      }
    }
    .otherComment {
      .otherCommentOne {
        padding: 1vh 2vw;
        .otherCommentOneData {
          &:hover {
            .buttonMaster {
              display: block;
            }
          }
        }
        .allSendShow {
          display: block !important;
        }
        .allSend {
          display: none;
          margin-top: 2vh;
          width: 41vw;
          .allSendInput {
            margin-top: 2vh;
            width: 35vw;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #fff;
            background-color: transparent;
            outline: none;
            color: #fff;
            font-family: "myFont";
            padding-left: 1vw;
          }
        }
        margin: 3vh 0vh;
        color: #fff;
        width: 41vw;
        border-bottom: 1px solid #fff;
        padding-bottom: 2vh;
        .commentData,
        .sendToSendData {
          display: flex;
          justify-content: space-between;
        }
        .sendToSendOne {
          margin-top: 1.5vh;
          padding-bottom: 1vh;
          border-bottom: 1px dashed #fff;
          &:hover {
            .button {
              display: block;
            }
          }
        }
        .author,
        .time {
          opacity: 0.6;
        }
        .author {
          margin-right: 1vw;
        }
        .buttonMaster,
        .button {
          cursor: pointer;
          display: none;
        }
        .sendToSend {
          padding: 2vh 0 0 3vw;
        }
      }
    }
  }

  .downNavShow {
    height: 100%;
    // top: 100%;
    opacity: 1;
    user-select: initial;
    pointer-events: initial;
  }
}
</style>
