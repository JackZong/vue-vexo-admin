<template>
  <div class="setting-drawer">
    <el-drawer v-model="showSetting" append-to-body direction="rtl" size="250px" title="主题设置">
      <div class="mb-5 setting-item">
        <span class="text-tx-secondary">布局设置</span>
        <div class="flex mt-4 cursor-pointer">
          <div
            v-for="item in layoutList"
            :key="item.type"
            class="relative flex mr-4"
            @click="layout = item.type"
          >
            <div class="">
              <img :src="item.image" width="52" height="36" />
              <!-- <icon
                                :name="`local-icon-${item.image}`"
                                :size="80"
                                :color="layout == item.type ? '#409EFF' : '#999999'"
                            /> -->
              <div
                :class="`text-${
                  layout == item.type ? 'primary' : 'tx-secondary'
                } text-xs text-center mt-2`"
              >
                {{ item.text }}
              </div>
            </div>
            <icon
              v-if="layout == item.type"
              class="icon-select text-primary"
              name="el-icon-Select"
            />
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-col justify-between mb-5 setting-item">
                <div class="text-tx-secondary">布局设置</div>
                <div>
                    <el-radio-group v-model="layout">
                        <el-radio label="sidebar-nav" value="sidebar-nav" />
                        <el-radio label="header-sidebar-nav" value="header-sidebar-nav" />
                    </el-radio-group>
                </div>
            </div> -->
      <div class="flex items-center justify-between mb-5 setting-item">
        <span class="text-tx-secondary">主题颜色</span>
        <div>
          <el-color-picker v-model="theme" :predefine="predefineColors" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <span class="text-tx-secondary">开启黑暗模式</span>
        <div>
          <el-switch :model-value="isDark" @change="toggleDark" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <span class="text-tx-secondary">深色侧边栏</span>
        <div>
          <el-switch v-model="sideTheme" active-value="dark" inactive-value="light" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <span class="text-tx-secondary">开启多页签栏</span>
        <div>
          <el-switch v-model="openMultipleTabs" :active-value="true" :inactive-value="false" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <span class="text-tx-secondary">只展开一个一级菜单</span>
        <div>
          <el-switch v-model="isUniqueOpened" :active-value="true" :inactive-value="false" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <div class="flex-none mr-3 text-tx-secondary">菜单栏宽度</div>
        <div>
          <el-input-number v-model="sideWidth" :min="180" :max="250" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <div class="flex-none mr-3 text-tx-secondary">显示LOGO</div>
        <div>
          <el-switch v-model="showLogo" :active-value="true" :inactive-value="false" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <div class="flex-none mr-3 text-tx-secondary">显示面包屑</div>
        <div>
          <el-switch v-model="showCrumb" :active-value="true" :inactive-value="false" />
        </div>
      </div>
      <div class="flex items-center justify-between mb-5 setting-item">
        <el-button @click="resetTheme">重置主题</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import theme_dark from '@/assets/images/theme_black.png'
import theme_light from '@/assets/images/theme_white.png'
import useSettingStore from '@/stores/modules/setting'

const settingStore = useSettingStore()
const predefineColors = ref(['#409EFF', '#28C76F', '#EA5455', '#FF9F43', '#01CFE8', '#4A5DFF'])
const layoutList = [
  {
    type: 'sidebar-nav',
    image: theme_dark,
    text: '侧边栏拉通'
  },
  {
    type: 'header-sidebar-nav',
    image: theme_light,
    text: '顶部拉通'
  }
]

const sideTheme = computed({
  get() {
    console.log('sideTheme: ', settingStore.sideTheme)
    return settingStore.sideTheme
  },
  set(value) {
    console.log('sideTheme: ', value)
    settingStore.setSetting({
      key: 'sideTheme',
      value
    })
  }
})

const layout = computed({
  get() {
    console.log('layout: ', settingStore.layout)
    return settingStore.layout
  },
  set(value) {
    settingStore.setSetting({
      key: 'layout',
      value
    })
  }
})

const openMultipleTabs = computed({
  get() {
    return settingStore.openMultipleTabs
  },
  set(value) {
    settingStore.setSetting({
      key: 'openMultipleTabs',
      value
    })
  }
})

const isUniqueOpened = computed({
  get() {
    return settingStore.isUniqueOpened
  },
  set(value) {
    settingStore.setSetting({
      key: 'isUniqueOpened',
      value
    })
  }
})

const sideWidth = computed({
  get() {
    return settingStore.sideWidth
  },
  set(value) {
    settingStore.setSetting({
      key: 'sideWidth',
      value
    })
  }
})
const showSetting = computed({
  get() {
    return settingStore.showDrawer
  },
  set(value) {
    settingStore.setSetting({
      key: 'showDrawer',
      value
    })
  }
})
const theme = computed({
  get() {
    return settingStore.theme
  },
  set(value) {
    settingStore.setSetting({
      key: 'theme',
      value
    })
    themeChange()
  }
})

const showLogo = computed({
  get() {
    return settingStore.showLogo
  },
  set(value) {
    settingStore.setSetting({
      key: 'showLogo',
      value
    })
  }
})

const showCrumb = computed({
  get() {
    return settingStore.showCrumb
  },
  set(value) {
    settingStore.setSetting({
      key: 'showCrumb',
      value
    })
  }
})

const isDark = useDark()
const themeChange = () => {
  settingStore.setTheme(isDark.value)
}

const toggleDark = () => {
  useToggle(isDark)()
  themeChange()
}
const resetTheme = () => {
  isDark.value = false
  settingStore.resetTheme()
  themeChange()
}
</script>

<style lang="scss" scoped>
@use '@/styles/tailwind.css' as *;
.icon-select {
  @apply absolute left-1/2 top-1/2;
  transform: translate(-50%, -150%);
}
</style>
