<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="key"></component>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped></style>
