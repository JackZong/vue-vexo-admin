<template>
  <main class="main-wrap h-full bg-body">
    <el-scrollbar>
      <div class="">
        <div
          v-if="
            settingStore.layout === LayoutEnum.HEADER_SIDEBAR_NAV &&
            !isMobile &&
            settingStore.showCrumb
          "
          class="flex items-center px-2 mb-3"
        >
          <breadcrumb :show-home="true" />
        </div>
        <router-view v-if="isRouteShow" v-slot="{ Component, route }">
          <keep-alive :include="includeList" :max="20">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
    </el-scrollbar>
  </main>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/appEnums'
import useAppStore from '@/stores/modules/app'
import useTabsStore from '@/stores/modules/multipleTabs'
import useSettingStore from '@/stores/modules/setting'

import Breadcrumb from './header/breadcrumb.vue'

const isMobile = computed(() => appStore.isMobile)
const appStore = useAppStore()
const tabsStore = useTabsStore()
const settingStore = useSettingStore()
const isRouteShow = computed(() => appStore.isRouteShow)
const includeList = computed(() => (settingStore.openMultipleTabs ? tabsStore.getCacheTabList : []))
</script>

<style></style>
