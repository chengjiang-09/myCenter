<!--
 * @Author: chengjiang_09
 * @Date: 2022-03-17 10:57:12
 * @LastEditTime: 2022-03-19 16:04:34
-->
<template>
  <DynamicMouseFullow />
  <div class="MyLayout-container">
    <!-- <AppSider /> -->
    <ScreenProtection class="SP" />
    <RouterView />
    <div class="layout">
      <AppHeader />
      <AppFooter />
    </div>
  </div>
</template>

<script>
// import AppSider from '@/layout/components/appSider.vue'
import AppHeader from '@/layout/appHeader.vue'
import AppFooter from '@/layout/appFooter.vue'
export default {
  name: 'MyLayout',
  components: {
    // AppSider
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped lang="less">
.MyLayout-container {
  position: relative;
  overflow-x: hidden;
}
</style>
