<template>
  <div class="EnterPassword">
    <h2>前往主页~~</h2>
    <ul>
      <li>
        <DynamicIText
          v-model:value="loginUser.mobile"
          title="请输入手机号"
          :warnText="warnText"
          @blur="valiBlur"
        />
      </li>
      <li>
        <DynamicIText
          v-model:value="loginUser.password"
          Dytype='password'
          title="请输入密码"
          :warnText="warnPwText"
          @blur="valiPasswordBlur"
        />
      </li>
      <li>
        <DynamicButton class="loginBT" :width="14" @click="passwordLogin"
          >确认登录</DynamicButton
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { valiMobile } from './valiabel'
import { reactive, ref } from 'vue'
import { passwordLoginAPI } from '@/api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import DyAlert from '@/components/library/DynamicComponents/DynamicAlert/DynamicAlertHook'
export default {
  name: 'EnterPassword',
  setup () {
    const loginUser = reactive({
      mobile: '',
      password: ''
    })

    const router = useRouter()
    const store = useStore()

    let loginFlag = true

    const warnText = ref('')
    const warnPwText = ref('')

    const valiBlur = () => {
      if (!valiMobile(loginUser.mobile)) {
        warnText.value = '请输入正确的手机号码！'
      } else {
        warnText.value = ''
        loginFlag = true
      }
    }

    const valiPasswordBlur = () => {
      if (loginUser.password.length === 0) {
        warnPwText.value = '密码为空！'
      } else {
        warnPwText.value = ''
        loginFlag = true
      }
    }

    const passwordLogin = async () => {
      valiBlur()
      valiPasswordBlur()
      if (loginFlag) {
        if (valiMobile(loginUser.mobile) && loginUser.password.length !== 0) {
          loginFlag = false
          const { result, msg } = await passwordLoginAPI(loginUser)

          if (result.status === 1) {
            store.commit('user/setUserInfo', result)
            router.push('/center')
          } else {
            loginUser.code = ''
            DyAlert({ title: '警告！', context: msg })
          }
        }
      }
    }

    return {
      loginUser, passwordLogin, valiPasswordBlur, valiBlur, warnText, warnPwText
    }
  }
}
</script>

<style scoped lang="less">
.EnterPassword {
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
  }
}
</style>
