<template>
  <header class="header">
    <div class="navbar">
      <side-logo
        v-if="
          (settingStore.showLogo && settingStore.layout === LayoutEnum.HEADER_SIDEBAR_NAV) ||
          showLogo
        "
        :show-title="!isCollapsed"
        :theme="sideTheme"
      />
      <div class="flex flex-1">
        <!-- <div class="navbar-item">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="isCollapsed ? '展开菜单' : '收起菜单'"
                        placement="bottom"
                    >
                        <fold />
                    </el-tooltip>
                </div> -->
        <!-- <div class="navbar-item">
                    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
                        <refresh />
                    </el-tooltip>
                </div> -->
        <div
          v-if="
            settingStore.layout === LayoutEnum.SIDEBAR_NAV &&
            showBreadcrumb &&
            !isMobile &&
            settingStore.showCrumb
          "
          class="flex items-center px-2"
        >
          <breadcrumb />
        </div>
      </div>
      <div class="flex">
        <!-- <div class="navbar-item" v-if="!isMobile">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="isFullscreen ? '退出全屏' : '全屏模式'"
                        placement="bottom"
                    >
                        <full-screen />
                    </el-tooltip>
                </div> -->
        <div v-if="settingStore.showHelp" class="navbar-item">
          <el-tooltip class="box-item" effect="dark" :content="$t('helpDoc')" placement="bottom">
            <help-link />
          </el-tooltip>
        </div>
        <div class="navbar-item">
          <language-drop-down />
        </div>
        <div class="navbar-item">
          <user-drop-down />
        </div>
        <!-- <div class="navbar-item" v-if="settingStore.showSetting">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="主题设置"
                        placement="bottom"
                    >
                        <setting />
                    </el-tooltip>
                </div> -->
      </div>
    </div>
    <multiple-tabs v-if="settingStore.openMultipleTabs" />
  </header>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

import { LayoutEnum } from '@/enums/appEnums'
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

import Setting from '../setting/index.vue'
import SideLogo from '../sidebar/logo.vue'
import Breadcrumb from './breadcrumb.vue'
import FullScreen from './full-screen.vue'
import HelpLink from './help-link.vue'
import LanguageDropDown from './language-drop-down.vue'
import MultipleTabs from './multiple-tabs.vue'
import Refresh from './refresh.vue'
import UserDropDown from './user-drop-down.vue'

defineProps({
  showLogo: { type: Boolean, default: false },
  showBreadcrumb: { type: Boolean, default: true }
})

const sideTheme = computed(() => settingStore.sideTheme)

const appStore = useAppStore()
const isMobile = computed(() => appStore.isMobile)
const isCollapsed = computed(() => appStore.isCollapsed)
const settingStore = useSettingStore()
const { isFullscreen } = useFullscreen()
</script>

<style lang="scss">
@use '@/styles/var.css' as *;
@use '@/styles/tailwind.css' as *;
.navbar {
  height: var(--navbar-height);
  @apply flex px-2;
  background-color: var(--flt-bg-secondary);
  .navbar-item {
    @apply h-full flex justify-center items-center hover:bg-page;
  }
}
</style>
