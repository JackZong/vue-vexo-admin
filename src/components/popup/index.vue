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
<template>
  <div class="dialog">
    <div class="dialog__trigger" @click="open">
      <!-- 触发弹窗 -->
      <slot name="trigger" />
    </div>
    <component
      :is="isDrawer ? ElDrawer : ElDialog"
      v-model="visible"
      :class="customClass"
      :center="center"
      :append-to-body="true"
      :width="width"
      :size="width"
      :show-close="false"
      :close-on-click-modal="clickModalClose"
      @closed="close"
    >
      <!-- 弹窗内容 -->
      <template v-if="title" #header
        ><span class="el-dialog__title">{{ title }}</span></template
      >

      <!-- 自定义内容 -->
      <slot>{{ content }}</slot>
      <!-- 底部弹窗页脚 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button v-if="cancelButtonText" @click="handleEvent('cancel')">
            {{ cancelButtonText }}
          </el-button>
          <el-button v-if="confirmButtonText" type="primary" @click="handleEvent('confirm')">
            {{ confirmButtonText }}
          </el-button>
        </div>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { ElDialog, ElDrawer } from 'element-plus'

import { t } from '@/i18n'
export default defineComponent({
  props: {
    isDrawer: {
      // 是否抽屉
      type: Boolean,
      default: false
    },
    title: {
      // 弹窗标题
      type: String,
      default: ''
    },
    content: {
      // 弹窗内容
      type: String,
      default: ''
    },
    confirmButtonText: {
      // 确认按钮内容
      type: [String, Boolean],
      default: t('ok')
    },
    cancelButtonText: {
      // 取消按钮内容
      type: [String, Boolean],
      default: t('cancel')
    },
    width: {
      // 弹窗的宽度
      type: String,
      default: '400px'
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    async: {
      // 是否开启异步关闭
      type: Boolean,
      default: false
    },
    clickModalClose: {
      // 点击遮罩层关闭对话窗口
      type: Boolean,
      default: false
    },
    center: {
      // 是否居中布局
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  emits: ['confirm', 'cancel', 'close', 'open'],
  setup(props, { emit }) {
    const visible = ref(false)

    const handleEvent = (type: 'confirm' | 'cancel') => {
      emit(type)
      if (!props.async || type === 'cancel') {
        close()
      }
    }

    const close = () => {
      visible.value = false
      nextTick(() => {
        emit('close')
      })
    }
    const open = () => {
      if (props.disabled) {
        return
      }
      emit('open')
      visible.value = true
    }
    provide('visible', visible)
    return {
      ElDialog,
      ElDrawer,
      visible,
      handleEvent,
      close,
      open
    }
  }
})
</script>

<style scoped lang="scss">
.dialog-body {
  white-space: pre-line;
}
</style>
