<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 15:17:19
 * @LastEditTime: 2022-03-19 15:54:43
-->
<template>
  <div class="EnterMobile">
    <h2>进入私密空间~~</h2>
    <ul>
      <li><DynamicIText v-model:value="loginUser.email" title="请输入您的邮箱" @blur="valiBlur" :warnText='warnText'/></li>
      <li :style="{display:`flex`,width:`100%`}">
        <DynamicIText v-model:value="loginUser.code" :width="11" title="验证码" @blur="valiCodeBlur" :warnText='codeWarnText'/>
        <DynamicButton class="valiableBT" :width="9" @click="getCode">{{CodeMessage}}</DynamicButton>
      </li>
      <li><DynamicButton class="loginBT" :width="14" @click="login">确认登录</DynamicButton></li>
    </ul>
  </div>
</template>

<script>
import { emailCodeAPI } from '@/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { valiEmail } from './valiabel'

import DyAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook'
export default {
  name: 'EnterEmail',
  props: {
    secondFlag: {
      type: Boolean
    },
    vNum: {
      type: Number
    },
    sEmail: {
      type: [Boolean, String]
    }
  },
  setup (props, { emit }) {
    const loginUser = reactive({
      email: '',
      code: ''
    })

    const store = useStore()
    const router = useRouter()

    const getCodeMessage = ref('发送验证码')
    const warnText = ref('')
    const codeWarnText = ref('')
    const timer = ref(null)
    const flag = ref(true)
    const loginFlag = ref(true)
    let CodeMessage = null

    if (!props.secondFlag) {
      if (props.sEmail) {
        loginUser.email = (function () {
          return props.sEmail
        }())
      }
      CodeMessage = computed({
        get () {
          return props.vNum === 60 ? '发送验证码' : `${props.vNum}s`
        }
      })
    } else {
      CodeMessage = computed({
        get () {
          const reg = /^\d+$/
          const re = new RegExp(reg)
          return re.test(getCodeMessage.value) ? `${getCodeMessage.value}s` : getCodeMessage.value
        },
        set (value) {}
      })
    }

    const valiBlur = () => {
      if (!valiEmail(loginUser.email)) {
        warnText.value = '请输入正确的邮箱！'
      } else {
        warnText.value = ''
        loginFlag.value = true
      }
    }

    const valiCodeBlur = () => {
      if (loginUser.code.length === 0) {
        codeWarnText.value = '短信验证码为空！'
      } else {
        codeWarnText.value = ''
        loginFlag.value = true
      }
    }

    const getCode = (e) => {
      if (valiEmail(loginUser.email)) {
        if (flag.value) {
          if (props.secondFlag) {
            loginFlag.value = true
            warnText.value = ''
            flag.value = false
            getCodeMessage.value = 60

            emailCodeAPI({
              email: loginUser.email
            }).then((value) => {
            })

            emit('valiCodeTimer', loginUser.email)
            timer.value = setInterval(() => {
              getCodeMessage.value -= 1
              if (getCodeMessage.value === -1) {
                flag.value = true
                getCodeMessage.value = '发送验证码'
                clearInterval(timer.value)
              }
            }, 1000)
          }
        }
      } else {
        warnText.value = '请输入正确的邮箱！'
      }
    }

    const login = async () => {
      if (loginFlag.value) {
        valiBlur()
        valiCodeBlur()
        if (valiEmail(loginUser.email) && loginUser.code.length !== 0) {
          loginFlag.value = false
          codeWarnText.value = ''

          const { msg, status } = await store.dispatch('user/emailLogin', loginUser)

          if (status === 1) {
            router.push('/center')
          } else {
            loginUser.code = ''
            DyAlert({ title: '警告！', context: msg })
          }
        }
      }
    }

    return {
      loginUser,
      getCode,
      CodeMessage,
      flag,
      warnText,
      valiBlur,
      login,
      codeWarnText,
      valiCodeBlur
    }
  }
}
</script>

<style scoped lang="less">
.EnterMobile {
  height: 100%;
  h2 {
    padding: 4px 4px 12px;
  }
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginBT {
      margin: 30px 0px 0px;
    }
    .valiableBT {
      margin: 6px 0px;
    }
  }
}
</style>
