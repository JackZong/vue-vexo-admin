<template>
  <a :href="settingStore.helpUrl" target="_blank">
    <icon
      class="cursor-pointer"
      name="local-icon-question"
      size="22"
      color="var(--el-color-info)"
    />
  </a>
</template>

<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'

const settingStore = useSettingStore()
</script>
