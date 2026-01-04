<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="isCollapsed ? '展开菜单' : '收起菜单'"
    placement="bottom"
  >
    <div class="fold h-full cursor-pointer flex items-center px-2" @click="toggleCollapsed">
      <icon
        :name="`local-icon-${isCollapsed ? 'expand' : 'collapse'}`"
        :size="16"
        :color="settingStore.sideTheme === 'dark' ? '#fff' : '#86909C'"
      />
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

const settingStore = useSettingStore()

const appStore = useAppStore()
const isCollapsed = computed(() => appStore.isCollapsed)
// 折叠展开菜单
const toggleCollapsed = () => {
  appStore.toggleCollapsed()
}
</script>
