<template>
  <div class="status-tag-wrapper" :style="styles">
    <span :style="`background: ${color}`" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

import { addUnit } from '@/utils/util'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  showBorder: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'var(--el-color-primary)'
  },
  radius: {
    type: [String, Number],
    default: 14
  }
})

const styles = computed<CSSProperties>(() => {
  return {
    width: addUnit(props.width),
    height: addUnit(props.height),
    color: props.showBorder ? props.color : 'var(--el-text-color-regular)',
    borderColor: props.color,
    borderRadius: addUnit(props.radius),
    border: props.showBorder ? '1px solid' : 0,
    fontSize: props.showBorder ? '12px' : ''
  }
})
</script>

<style lang="scss" scoped>
.status-tag-wrapper {
  padding: 2px 8px;
  // border: 1px solid var(--el-color-primary);
  // border-width: 1px;
  // font-size: 12px;
  span:first-child {
    display: inline-block;
    width: 6px;
    height: 6px;
    // background: var(--el-color-danger);
    border-radius: 50%;
    margin-right: 8px;
    margin-bottom: 1px;
  }
}
</style>
