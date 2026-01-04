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
  <ul class="flt-input-cell flt-input-cell--border">
    <li
      v-for="(value, index) in internalOtpCode"
      :key="index"
      :class="`flt-input-cell__item flt-input-cell__item--${index}`"
    >
      <ElInput
        :ref="
          (el) => {
            inputRefs[index] = el
          }
        "
        v-model="internalOtpCode[index]"
        type="text"
        maxlength="1"
        :placeholder="placeholder"
        class="flt-input-cell__input"
        :style="inputStyle"
        :disabled="props.disabled"
        @input="handleInput($event, index)"
        @keydown="handleKeydown($event, index)"
        @paste="handlePaste"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ElInput } from 'element-plus'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// 定义输入类型，默认为 'number'
type OtpInputType = 'number' | 'text'

// --- Props ---
const props = withDefaults(
  defineProps<{
    // v-model 绑定值，完整的 OTP 字符串
    modelValue: string
    // OTP 码的长度
    length?: number
    // 每个输入框的占位符
    placeholder?: string
    // 额外的样式，用于自定义输入框大小等
    inputStyle?: object
    disabled?: boolean
    inputType?: OtpInputType
    autofocus?: boolean
  }>(),
  {
    length: 6,
    modelValue: '',
    placeholder: '',
    disabled: false, // 默认值为 false
    inputType: 'number',
    autofocus: false,
    inputStyle: () => ({ width: '40px', height: '48px', textAlign: 'center' })
  }
)

// --- Emits ---
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete', value: string): void
}>()

// --- 状态 ---
// 内部使用的数组，保存每个输入框的值
const internalOtpCode = ref<string[]>(Array(props.length).fill(''))
// 输入框的引用数组
const inputRefs = ref<(typeof ElInput | null)[]>([])

// --- 辅助函数: 过滤输入值 ---
const filterInput = (value: string, type: OtpInputType): string => {
  if (type === 'number') {
    // 仅保留数字
    return value.replace(/[^0-9]/g, '')
  } else if (type === 'text') {
    // 保留数字和字母（大小写），移除其他字符
    return value.replace(/[^0-9a-zA-Z]/g, '')
  }
  return value // 默认返回原值
}

// --- Watcher: 同步外部 modelValue 到内部状态 ---
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== internalOtpCode.value.join('')) {
      internalOtpCode.value = newVal
        .split('')
        .slice(0, props.length)
        .concat(Array(props.length - newVal.length).fill(''))
    }
  },
  { immediate: true }
)

// --- Computed: 将内部状态同步到外部 modelValue ---
const currentOtp = computed(() => internalOtpCode.value.join(''))

watch(currentOtp, (newVal) => {
  emit('update:modelValue', newVal)
  // 如果所有位都填满，则触发 complete 事件
  if (newVal.length === props.length && !newVal.includes('')) {
    emit('complete', newVal)
  }
})

// --- 核心方法: 输入处理 ---
const handleInput = (value: string, index: number) => {
  // 🚀 1. 根据 inputType 过滤字符
  const numericOrTextValue = filterInput(value, props.inputType)

  if (numericOrTextValue) {
    internalOtpCode.value[index] = numericOrTextValue
    // 2. 自动聚焦到下一个输入框
    if (index < props.length - 1) {
      nextTick(() => {
        // Element Plus 的 $el 包含原生 input 元素
        ;(inputRefs.value[index + 1] as any)?.$el.querySelector('input')?.focus()
      })
    }
  } else {
    // 如果输入被清空，则保持为空
    internalOtpCode.value[index] = ''
  }
}

// --- 核心方法: 键盘事件处理 (回退/删除) ---
const handleKeydown = (event: KeyboardEvent, index: number) => {
  // ... 逻辑与之前版本保持一致 ... (略)
  // const inputEl = event.target as HTMLInputElement

  // 1. Backspace (删除键)
  if (event.key === 'Backspace') {
    if (internalOtpCode.value[index] !== '') {
      internalOtpCode.value[index] = ''
      event.preventDefault()
    } else if (index > 0) {
      event.preventDefault()
      nextTick(() => {
        const prevInput = (inputRefs.value[index - 1] as any)?.$el.querySelector('input')
        if (prevInput) {
          internalOtpCode.value[index - 1] = ''
          prevInput.focus()
        }
      })
    }
  }

  // 2. Left Arrow (左箭头)
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    nextTick(() => {
      ;(inputRefs.value[index - 1] as any)?.$el.querySelector('input')?.focus()
    })
  }

  // 3. Right Arrow (右箭头)
  if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    nextTick(() => {
      ;(inputRefs.value[index + 1] as any)?.$el.querySelector('input')?.focus()
    })
  }
}

// --- 核心方法: 粘贴处理 ---
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text').trim() || ''

  // 🚀 1. 过滤并截取到指定长度
  const filteredCode = filterInput(pasteData, props.inputType)
  const code = filteredCode.slice(0, props.length)

  // 2. 更新内部状态
  for (let i = 0; i < props.length; i++) {
    internalOtpCode.value[i] = code[i] || ''
  }

  // 3. 聚焦到下一个空位或最后一个输入框
  const nextFocusIndex = Math.min(code.length, props.length - 1)
  nextTick(() => {
    ;(inputRefs.value[nextFocusIndex] as any)?.$el.querySelector('input')?.focus()
  })
}

// --- 初始化: 自动聚焦到第一个输入框 ---
onMounted(() => {
  // 确保 DOM 渲染完成
  nextTick(() => {
    if (inputRefs.value[0] && props.autofocus) {
      // Element Plus 的 ElInput 组件的真实输入框在 $el 下
      inputRefs.value[0].$el.querySelector('input')?.focus()
    }
  })
})
</script>
<style scoped>
.otp-input-container {
  display: flex;
  gap: 8px; /* 输入框之间的间距 */
  justify-content: center; /* 居中显示 */
}

/* 覆盖 Element Plus 的输入框样式 */
.otp-input-box {
  width: 40px; /* 默认宽度，可由 props.inputStyle 覆盖 */
}

/* 针对 ElInput 内部的输入框做样式调整 */
.otp-input-box :deep(.el-input__inner) {
  text-align: center !important; /* 文本居中 */
  font-size: 20px; /* 字体大一点，更明显 */
  font-weight: bold;
}
</style>
