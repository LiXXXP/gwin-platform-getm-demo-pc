<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
// import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue-demi'
defineComponent({
  zhCn
})
</script>

<style lang="scss" scoped></style>
