<template>
  <div class="DynamicCommentBall">
    <p class="comment" @click="downNav" :class="[{ commentOpen: donwNavFlag }]">
      {{ data.context }}
    </p>
    <div class="downNav" :class="[{ downNavShow: donwNavFlag }]">
      <div class="send">
        <input type="text" class="input" placeholder="回复TA" />
        <button type="button" class="button">回复ta</button>
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
                ><button type="button" class="buttonMaster" @click="sendTa(obj.id, obj.author)">
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
                      @click="sendTa(obj.id, grandSonObj.author, grandSonObj.id)"
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
              @blur="allSendOnBlur(obj.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import sendOneChildVNode from './sendOneChildVNode.vue'
// import sendOneVNode from './sendOneVNode.vue'
import { ref } from 'vue'
// import { useStore } from 'vuex'
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
    const donwNavFlag = ref(false)
    const child = ref(props.data.children)
    const grandSon = ref([])
    const grandSonObjAll = ref({})
    const sendTarget = ref('')

    const downNav = () => {
      donwNavFlag.value = !donwNavFlag.value
    }

    const sendTa = (id, sendTargetName, otherID) => {
      sendTarget.value = sendTargetName
      child.value.forEach((obj) => {
        if (obj.id === id) {
          obj.sendBtnFlag = true
        } else {
          obj.sendBtnFlag = false
        }
      })
      if (otherID) {
        console.log(otherID)
      }
    }

    const allSendOnBlur = (id) => {
      child.value.forEach((obj) => {
        if (obj.id === id) {
          obj.sendBtnFlag = false
        }
      })
    }

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
          grandSonObjAll.value[obj.id] = grandSon.value
        }
      })
    }

    // const comment = ref(null)

    // const sendToSend = ref(null)

    // onMounted(() => {
    //   const commentList = store.state.center.commentList
    //   const VNodeList = []

    //   const createCommentVNode = (commentChildList) => {
    //     if (commentChildList) {
    //       commentChildList.forEach(obj => {
    //         if (obj.children) {
    //           createCommentVNode(obj.children)
    //         }
    //         VNodeList.push(createVNode(sendOneChildVNode, { author: obj.author, date: obj.date, master: obj.masterName, context: obj.context }))
    //       })
    //     }
    //   }

    //   commentList.forEach(obj => {
    //     createCommentVNode(obj.children)
    //   })

    //   const defaultVNode = createVNode('ul', { class: 'sendToSendList' }, VNodeList)

    //   render(defaultVNode, sendToSend.value)
    // })

    return {
      downNav,
      sendTa,
      donwNavFlag,
      allSendOnBlur,
      child,
      grandSonObjAll,
      sendTarget
    }
  }
}
</script>

<style scoped lang="less">
.DynamicCommentBall {
  position: relative;
  .comment {
    position: relative;
    cursor: pointer;
    font-size: 2vw;
    color: #fff;
    width: 45vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .commentAuthor {
      display: block;
      position: absolute;
      bottom: 3vh;
      right: 3vw;
      width: 4vw;
      height: 2vh;
    }
  }
  .commentOpen {
    overflow: initial;
    text-overflow: initial;
    white-space: initial;
  }
  .downNav {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    background-color: #000;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: 41vw;
    transition: transform 0.6s, opacity 0.6s;
    .send {
      display: flex;
      justify-content: space-between;
      .input {
        width: 35vw;
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
    transform: translate(0, 6vh);
    opacity: 1;
    user-select: initial;
    pointer-events: initial;
  }
}
</style>
