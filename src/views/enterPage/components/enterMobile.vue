<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 15:17:19
 * @LastEditTime: 2022-03-19 15:54:43
-->
<template>
  <div class="EnterMobile">
    <h2>进入私密空间~~</h2>
    <ul>
      <li><DynamicIText v-model:value="loginUser.mobile" title="请输入手机号"/></li>
      <li :style="{display:`flex`,width:`100%`}">
        <DynamicIText v-model:value="loginUser.password" :width="11" title="验证码"/>
        <DynamicButton class="valiableBT" :width="9" @click="getCode">{{CodeMessage}}</DynamicButton>
      </li>
      <li><DynamicButton class="loginBT" :width="14">确认登录</DynamicButton></li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
export default {
  name: 'EnterMobile',
  props: {
    secondFlag: {
      type: Boolean
    },
    vNum: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const loginUser = reactive({
      mobile: '',
      password: ''
    })

    const getCodeMessage = ref('发送验证码')
    const timer = ref(null)
    const flag = ref(true)
    let CodeMessage = null

    if (!props.secondFlag) {
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

    const getCode = (e) => {
      if (flag.value) {
        if (props.secondFlag) {
          flag.value = false
          getCodeMessage.value = 60
          emit('valiCodeTimer')
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
    }

    return {
      loginUser, getCode, CodeMessage, flag
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
