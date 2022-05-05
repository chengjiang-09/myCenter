<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:57:12
 * @LastEditTime: 2022-03-19 16:04:34
-->
<template>
  <DynamicMouseFullow />
  <div class="container">
    <!-- <AppSider /> -->
    <ScreenProtection class="SP"/>
    <ul class="BGimg">
      <li><img src="~@/assets/images/2.jpg" alt="" /></li>
    </ul>
    <div class="layout">
      <AppHeader />
    </div>
  </div>
</template>

<script>
// import AppSider from '@/layout/components/appSider.vue'
import AppHeader from '@/layout/pages/appHeader.vue'

export default {
  name: 'MyLayout',
  components: {
    // AppSider
    AppHeader
  }
}
</script>

<style scoped lang="less">
.container {
  position: relative;
  overflow: hidden;
  .BGimg {
    user-select: none;
    li {
      img {
        width: 100vw;
        height: auto;
      }
    }
  }
}
</style>
