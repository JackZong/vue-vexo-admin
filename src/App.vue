
<script setup lang="ts">
import { useDark, useThrottleFn, useWindowSize } from '@vueuse/core'
import en from 'element-plus/es/locale/lang/en'
import ru from 'element-plus/es/locale/lang/ru'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import i18n from '@/i18n'

import { ScreenEnum } from './enums/appEnums'
import useAppStore from './stores/modules/app'
import useSettingStore from './stores/modules/setting'

const appStore = useAppStore()
const settingStore = useSettingStore()
const elConfig = {
  zIndex: 3000,
  locale:
    i18n.global.locale.value === 'zh_CN' ? zhCn : i18n.global.locale.value === 'ru_RU' ? ru : en
}
const isDark = useDark()
onMounted(async () => {
  //设置主题色
  settingStore.setTheme(isDark.value)
})

const { width } = useWindowSize()
watch(
  width,
  useThrottleFn((value) => {
    if (value > ScreenEnum.SM) {
      appStore.setMobile(false)
      appStore.toggleCollapsed(false)
    } else {
      appStore.setMobile(true)
      appStore.toggleCollapsed(true)
    }
    if (value < ScreenEnum.MD) {
      appStore.toggleCollapsed(true)
    }
  }),
  {
    immediate: true
  }
)
</script>

<template>
  <el-config-provider :locale="elConfig.locale" :z-index="elConfig.zIndex">
    <router-view />
  </el-config-provider>
</template>

<style></style>
