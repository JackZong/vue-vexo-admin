<template>
  <div
    class="flex-1 min-h-0 menu"
    :class="themeClass"
    :style="isCollapsed ? '' : `--aside-width: ${width}px`"
  >
    <el-scrollbar>
      <el-menu
        v-bind="config"
        :default-active="activeMenu"
        :collapse="isCollapsed"
        mode="vertical"
        :unique-opened="uniqueOpened"
        class="flex flex-col gap-2"
        @select="$emit('select')"
      >
        <menu-item
          v-for="route in routes"
          :key="route.path"
          :route="route"
          :route-path="route.path"
          :popper-class="themeClass"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import Fold from './fold.vue'
import MenuItem from './menu-item.vue'

const props = defineProps({
  routes: {
    type: Object as PropType<RouteRecordRaw[]>
  },
  config: {
    type: Object
  },
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  isCollapsed: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String
  },
  width: {
    type: Number,
    default: 200
  }
})

defineEmits(['select'])

const route = useRoute()
const activeMenu = computed<string>(() => route.meta?.activeMenu || route.path)
const themeClass = computed(() => `theme-${props.theme}`)
</script>

<style lang="scss" scoped>
@use '@/styles/tailwind.css' as *;
.menu {
  @apply p-2;
  &.theme-dark {
    .el-menu {
      :deep(.el-menu-item) {
        &.is-active {
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10px;
            height: 26px;
            width: 3px;
            background-color: var(--el-color-white);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          background-color: #5376ff;
          // @apply bg-primary;
          // @apply bg-primary border-primary;
        }
      }
    }
    :deep(.el-menu--collapse) {
      .el-sub-menu.is-active .el-sub-menu__title {
        @apply bg-primary;
      }
    }
  }
  &.theme-light {
    :deep(.el-menu) {
      .el-menu-item {
        border-color: transparent;
        &.is-active {
          // &::before {
          //     content: '';
          //     position: absolute;
          //     left: 0;
          //     top: 10px;
          //     height: 26px;
          //     width: 3px;
          //     background-color: var(--el-color-primary);
          //     border-top-right-radius: 4px;
          //     border-bottom-right-radius: 4px;
          // }
          @apply bg-white;
          // @apply bg-primary-light-9 border-r-2 border-primary;
        }
      }
      .el-menu-item,
      .el-sub-menu__title {
        border-radius: 8px;
      }
      .el-menu-item:hover,
      .el-sub-menu__title:hover {
        color: var(--el-color-primary);
        // @apply bg-white;
      }
    }
  }
  .el-menu {
    border-right: none;
    &:not(.el-menu--collapse) {
      width: var(--aside-width);
    }
  }
}
</style>
