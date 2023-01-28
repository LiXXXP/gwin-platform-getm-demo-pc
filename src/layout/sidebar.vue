<template>
  <div>
    <console-menu :menu-list="data"></console-menu>
  </div>
</template>

<script setup lang="ts">
import { ConsoleMenu } from '@gwin/platform-menu-pc'
import { computed } from 'vue-demi'
import { useRouter } from 'vue-router'
import { RouteConfig } from '#/global'

const router = useRouter()

interface MenuItem {
  title: string
  icon?: string
  router?: string
  child?: MenuItem[]
}

const data = computed(() => {
  const menuList: MenuItem[] = []
  router.options.routes.forEach((route) => {
    const menuItem: MenuItem | undefined = generateMenuItem(route as RouteConfig)
    if (menuItem) {
      menuList.push(menuItem)
    }
  })
  return menuList
})

function generateMenuItem(route: RouteConfig): MenuItem | undefined {
  if (!route.hidden && route.meta) {
    const menuItem: MenuItem = route.meta
    menuItem.router = route.path
    if (route.children) {
      menuItem.child = []
      route.children.forEach((r) => {
        const subMenuItem: MenuItem | undefined = generateMenuItem(r as RouteConfig)
        if (subMenuItem) {
          subMenuItem.router = menuItem.router + '/' + subMenuItem.router
          menuItem.child?.push(subMenuItem)
        }
      })
    }
    return menuItem
  }
  return undefined
}
</script>

<style lang="scss" scoped>
.console-menu-container {
  height: 100%;
}
</style>
