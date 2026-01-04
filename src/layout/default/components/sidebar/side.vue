<template>
  <div class="side" :style="sideStyle">
    <div class="top-logo">
      <fold v-if="settingStore.layout === LayoutEnum.SIDEBAR_NAV" />
      <side-logo
        v-show="!isCollapsed"
        :is-light="settingStore.sideTheme != 'light'"
        :show-title="!isCollapsed"
        :theme="sideTheme"
        :width="isCollapsed ? 50 : 130"
      />
    </div>
    <side-menu
      :routes="routes"
      :is-collapsed="isCollapsed"
      :width="settingStore.sideWidth"
      :unique-opened="settingStore.isUniqueOpened"
      :config="menuProp"
      :theme="sideTheme"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/appEnums'
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'

import Fold from './fold.vue'
import SideLogo from './logo.vue'
import SideMenu from './menu.vue'

const appStore = useAppStore()
const isCollapsed = computed(() => {
  if (appStore.isMobile) {
    return false
  } else {
    return appStore.isCollapsed
  }
})

const settingStore = useSettingStore()
const sideTheme = computed(() => settingStore.sideTheme)
const userStore = useUserStore()

const routes = computed(() => userStore.routes)

const sideStyle = computed(() => {
  return sideTheme.value == 'dark'
    ? {
        '--side-dark-color': settingStore.sideDarkColor
      }
    : ''
})
const menuProp = computed(() => {
  return {
    backgroundColor: sideTheme.value == 'dark' ? settingStore.sideDarkColor : '',
    textColor: sideTheme.value == 'dark' ? 'var(--el-color-white)' : '',
    activeTextColor: sideTheme.value == 'dark' ? 'var(--el-color-white)' : ''
  }
})
const handleSelect = () => {
  if (appStore.isMobile) {
    appStore.toggleCollapsed(true)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/tailwind.css' as *;
.side {
  position: relative;
  z-index: 999;
  // @apply border-r border-br-light h-full flex flex-col;
  @apply h-full flex flex-col;
  background-color: var(--flt-bg-secondary);
  // background-color: var(--side-dark-color, var(--el-bg-color));
  .top-logo {
    height: var(--navbar-height);
    @apply flex items-center p-3;
  }
}
</style>
