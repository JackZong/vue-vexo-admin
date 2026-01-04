<!-- /*
  * ===========================================================================================
  * = COPYRIGHT
  *          PAX Computer Technology (Shenzhen) Co., Ltd. PROPRIETARY INFORMATION
  *   This software is supplied under the terms of a license agreement or nondisclosure
  *   agreement with PAX Computer Technology (Shenzhen) Co., Ltd. and may not be copied or
  *   disclosed except in accordance with the terms in that agreement.
  *     Copyright (C) 2022-2023 PAX Computer Technology (Shenzhen) Co., Ltd. All rights reserved.
  * Description: // Detail description about the function of this module,
  *             // interfaces with the other modules, and dependencies.
  * Revision History:
  * Date                  Author                 Action
  * 2025/12/11            PAX                    Create
  * ===========================================================================================
*/
 -->
<script setup lang="ts">
import { computed } from 'vue' // 移除 PropType 导入，增强兼容性

// ----------------------------------------------------
// 属性定义 (Props Definition) - 使用最兼容的运行时声明
// ----------------------------------------------------
// 采用最简化的对象声明，以避免解析错误
const props = defineProps({
  /** 链接跳转地址 (URL 或路由路径) */
  to: {
    type: String,
    required: true
  },
  /** 是否显示下划线 */
  underline: {
    type: Boolean,
    default: false
  },
  /** 是否禁用链接 */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 链接类型: '200' (router-link) 或 '300' (a 标签)
   * 简化类型声明，确保编译通过
   */
  linkType: {
    type: String, // 简化为 String 类型
    default: '200'
  }
})

// ----------------------------------------------------
// 1. 动态判断渲染的组件标签
// ----------------------------------------------------
const componentTag = computed(() => {
  if (props.disabled) {
    return 'span' // 禁用时渲染为 span，不具备链接功能
  }

  // 1. 强制使用 a 标签 (linkType='300')
  // 2. 检查是否为外部链接 (以 http/https/mailto等开头)
  const isExternalLink = /^(https?:\/\/|mailto:|tel:)/i.test(props.to)

  if (props.linkType === '300' || isExternalLink) {
    return 'a'
  }

  // 默认使用 router-link
  return 'router-link'
})

// ----------------------------------------------------
// 2. 计算动态类名 (使用 Tailwind CSS)
// ----------------------------------------------------
const linkClasses = computed(() => [
  'inline-flex', // 确保内容对齐
  'items-center', // 垂直居中
  'transition-all', // 启用过渡效果
  'duration-200',

  // 基础样式
  {
    // 非禁用状态的默认颜色和悬停效果
    'text-blue-600 hover:text-blue-800 active:text-blue-900': !props.disabled,

    // 下划线控制
    underline: props.underline && !props.disabled, // 启用下划线
    'hover:underline': !props.underline && !props.disabled, // 默认悬停显示下划线

    // 禁用状态样式
    'text-gray-400 cursor-not-allowed pointer-events-none': props.disabled
  }
])

// ----------------------------------------------------
// 3. 计算组件需要绑定的属性
// ----------------------------------------------------
type ComponentAttrs = {
  [key: string]: any
}

const componentProps = computed((): ComponentAttrs => {
  if (props.disabled) {
    return { 'aria-disabled': 'true' }
  }

  if (componentTag.value === 'a') {
    // a 标签属性: href, target, rel
    return {
      href: props.to,
      // 外部链接默认在新窗口打开，并增加安全属性
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  } else if (componentTag.value === 'router-link') {
    // router-link 属性: to
    return {
      to: props.to
    }
  }
  return {}
})
</script>

<template>
  <!-- 
    使用 <component :is="..."> 实现动态渲染 
    注意: 
    1. router-link 需要在你的项目中正确配置 Vue Router 才能工作。
    2. 使用 v-bind 绑定计算出的属性 (href/to)。
  -->
  <component :is="componentTag" v-bind="componentProps" :class="linkClasses">
    <!-- 通过插槽 (slot) 传递链接内容 -->
    <slot />
  </component>
</template>

<style scoped>
/* 无需额外的 CSS，样式由 Tailwind CSS 类定义 */
</style>
