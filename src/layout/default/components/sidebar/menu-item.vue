<template>
  <template v-if="!route.meta?.hidden">
    <menu-link v-if="!hasShowChild" :to="`${routePath}?${queryStr}`">
      <el-menu-item :index="routePath">
        <icon v-if="routeMeta?.icon" class="menu-item-icon" :size="16" :name="routeMeta?.icon" />
        <img
          v-if="routeMeta?.img"
          class="menu-item-img"
          :src="routeMeta?.img"
          :alt="routeMeta?.img"
        />
        <template #title>
          <overflow-tooltip v-if="!isCollapsed" class="w-40" :content="routeMeta?.title" />
          <span v-else>{{ routeMeta?.title }}</span>
        </template>
      </el-menu-item>
    </menu-link>
    <el-sub-menu
      v-else
      :index="routePath"
      :popper-class="popperClass"
      :expand-close-icon="ArrowRightBold"
      :expand-open-icon="ArrowDownBold"
      class="app-sub-menu"
    >
      <template #title>
        <icon v-if="routeMeta?.icon" class="menu-item-icon" :size="16" :name="routeMeta?.icon" />
        <overflow-tooltip v-if="!isCollapsed" class="w-40" :content="routeMeta?.title" />
        <span v-else>{{ routeMeta?.title }}</span>
      </template>
      <menu-item
        v-for="item in route?.children"
        :key="resolvePath(item.path)"
        :route="item"
        :route-path="resolvePath(item.path)"
        :popper-class="popperClass"
      />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { ArrowDownBold, ArrowRightBold } from '@element-plus/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

import useAppStore from '@/stores/modules/app'
import { getNormalPath, objectToQuery } from '@/utils/util'
import { isExternal } from '@/utils/validate'

const appStore = useAppStore()
const isCollapsed = computed(() => appStore.isCollapsed)

interface Props {
  route: RouteRecordRaw
  routePath: string
  popperClass: string
}

const props = defineProps<Props>()

const hasShowChild = computed(() => {
  const children: RouteRecordRaw[] = props.route.children ?? []
  return !!children.filter((item) => !item.meta?.hidden).length
})

const routeMeta = computed(() => {
  return props.route.meta
})

const resolvePath = (path: string) => {
  if (isExternal(path)) {
    return path
  }
  const newPath = getNormalPath(`${props.routePath}/${path}`)
  return newPath
}
const queryStr = computed<string>(() => {
  const query = props.route.meta?.query as string
  if (!query) return ''
  try {
    const queryObj = JSON.parse(query)
    return objectToQuery(queryObj)
  } catch (error) {
    // console.log(error)

    return query
  }
})

const getMenuImg = (name: string, active: boolean) => {
  const imgName = active ? `${name}_on` : name
  return new URL(`@/assets/images/menu/${imgName}.png`, import.meta.url).href
}
</script>
<style lang="scss" scoped>
.el-menu-item,
.el-sub-menu__title {
  .menu-item-icon {
    margin-right: 8px;
    width: var(--el-menu-icon-width);
    text-align: center;
    vertical-align: middle;
  }
  .menu-item-img {
    margin-right: 8px;
    width: var(--el-menu-icon-width);
    text-align: center;
    vertical-align: middle;
  }
}
.el-menu-item {
  padding: 0 12px !important;
}
</style>
<style lang="scss">
.app-sub-menu.el-sub-menu {
  .el-menu-item {
    margin-left: 36px;
    &::before {
      content: '';
      position: absolute;
      left: -16px; /* 与垂直线对齐 */
      top: 30%;
      width: 15px; /* 水平线的长度 */
      height: 100%;
      border-left: 1px solid #dcdfe6; /* 垂直线 (其实是主干线的一部分，可以忽略) */
      border-bottom: 1px solid #dcdfe6; /* 水平线 */

      /* 核心：绘制圆弧 */
      border-bottom-left-radius: 8px;

      /* 调整定位，让连接线居中 */
      transform: translateY(-50%);

      /* 隐藏圆弧上方多余的垂直线 */
      height: 50%;
      z-index: 2;
    }
  }
  & > .el-menu {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20px; /* 控制垂直线的位置 */
      bottom: 30px;
      width: 1px;
      background-color: #dcdfe6; /* 线的颜色 */
      z-index: 1; /* 确保线在背景之下 */
    }
  }
}
</style>
