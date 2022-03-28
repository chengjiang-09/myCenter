<template>
  <div class="EnterPassword">
    <h2>前往主页~~</h2>
    <ul>
      <li><DynamicIText v-model:value="registerUser.mobile" title="请输入手机号"/></li>
      <li><DynamicIText v-model:value="registerUser.password" title="请输入密码"/></li>
      <li>
        <DynamicButton class="loginBT" :width="14">确认登录</DynamicButton>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'EnterPassword',
  setup () {
    const registerUser = reactive({
      mobile: '',
      password: ''
    })

    return {
      registerUser
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
