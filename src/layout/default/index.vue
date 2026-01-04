<template>
  <div>
    <div
      v-if="settingStore.layout === LayoutEnum.SIDEBAR_NAV"
      class="layout-default flex h-screen w-full"
    >
      <div class="app-aside">
        <layout-sidebar />
      </div>

      <div class="flex-1 flex flex-col min-w-0">
        <div class="app-header">
          <layout-header />
        </div>
        <div class="app-main flex-1 min-h-0">
          <layout-main />
        </div>
      </div>
    </div>

    <div
      v-if="settingStore.layout === LayoutEnum.HEADER_SIDEBAR_NAV"
      class="layout-default h-screen w-full"
    >
      <div class="app-header">
        <layout-header />
      </div>

      <div class="app-main-container flex-1 flex min-w-0">
        <div class="app-aside">
          <layout-sidebar />
        </div>
        <div class="app-main flex-1 min-h-0">
          <layout-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/appEnums'
import useSettingStore from '@/stores/modules/setting'

import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main.vue'
import LayoutSidebar from './components/sidebar/index.vue'

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.app-main-container {
  height: calc(100vh - var(--navbar-height));
}
</style>
