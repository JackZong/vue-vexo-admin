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
  <label
    class="flt-input-field"
    :class="[
      { 'is-value': isNotEmpty },
      { 'is-focus': isFocused },
      { 'has-suplabel': labelText } /* 如果有标题，添加 has-suplabel 类 */,
      { 'flt-disabled': disabled } /* 适配禁用状态类 */,
      $attrs.class /* 允许父组件添加额外的 class */
    ]"
    :style="{ width: inputWidth }"
  >
    <div v-if="ifFieldTooltip" class="flt-suplabel-sup flt-suplabel-sup__tooltip">
      <span class="flt-suplabel-border" />
      <span class="flt-suplabel-sup-border">
        <el-tooltip effect="dark" :content="labelText" placement="top">
          <span class="flt-suplabel-sup-text">
            {{ labelText }}
          </span>
        </el-tooltip>
      </span>
      <span class="flt-suplabel-border" />
    </div>

    <div class="flt-suplabel-sup">
      <span class="flt-suplabel-border" />
      <span class="flt-suplabel-sup-border">
        <span class="flt-suplabel-sup-text">
          {{ labelText }}
        </span>
      </span>
      <span class="flt-suplabel-border" />
    </div>

    <div class="flt-input">
      <el-input
        ref="inputRef"
        v-model="innerValue"
        v-bind="$attrs"
        :type="type"
        placeholder=""
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @change="handleChange"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData || {}" />
        </template>
      </el-input>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { computed, ref } from 'vue'

defineOptions({
  inheritAttrs: false // 禁用默认属性继承，手动控制 class 和 style
})

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null | undefined
    supLabel?: string // 对应代码中的 label 文本
    width?: string | number // 对应 style="width: 120px;"
    disabled?: boolean
    trim?: boolean // 是否自动去除首尾空格
    type?: string
    placeholder?: string
    ifFieldTooltip?: boolean
  }>(),
  {
    width: '100%',
    trim: true,
    type: 'text',
    placeholder: '',
    ifFieldTooltip: false
  }
)

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])
const inputRef = ref()

const isFocused = ref(false)

const isNotEmpty = computed(() => {
  return innerValue.value !== null && innerValue.value !== undefined && innerValue.value !== ''
})

// --- 计算宽度 ---
const inputWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})

const labelText = computed(() => {
  return props.supLabel || props.placeholder
})

// --- v-model 处理 (包含 trim 逻辑) ---
const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    let finalVal = val
    if (props.trim && typeof finalVal === 'string') {
      finalVal = finalVal.trim()
    }
    emit('update:modelValue', finalVal)
  }
})

const handleChange = (val: string | number) => emit('change', val)

// 暴露 el-input 实例方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  ref: inputRef
})
</script>
