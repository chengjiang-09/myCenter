<template>
  <div class="EnterPassword">
    <h2>前往主页~~</h2>
    <ul>
      <li>
        <DynamicIText
          v-model:value="registerUser.mobile"
          title="请输入手机号"
          :warnText="warnText"
          @blur="valiBlur"
        />
      </li>
      <li>
        <DynamicIText
          v-model:value="registerUser.password"
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
export default {
  name: 'EnterPassword',
  setup () {
    const registerUser = reactive({
      mobile: '',
      password: ''
    })

    let loginFlag = true

    const warnText = ref('')
    const warnPwText = ref('')

    const valiBlur = () => {
      if (!valiMobile(registerUser.mobile)) {
        warnText.value = '请输入正确的手机号码！'
      } else {
        warnText.value = ''
        loginFlag = true
      }
    }

    const valiPasswordBlur = () => {
      if (registerUser.password.length === 0) {
        warnPwText.value = '密码为空！'
      } else {
        warnPwText.value = ''
        loginFlag = true
      }
    }

    const passwordLogin = () => {
      valiBlur()
      valiPasswordBlur()
      if (loginFlag) {
        if (valiMobile(registerUser.mobile) && registerUser.password.length !== 0) {
          loginFlag = false
          console.log('登录！')
        }
      }
    }

    return {
      registerUser, passwordLogin, valiPasswordBlur, valiBlur, warnText, warnPwText
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
