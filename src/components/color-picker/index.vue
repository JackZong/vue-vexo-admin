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
  <div class="color-select flex flex-1">
    <el-color-picker v-model="color" :predefine="predefineColors" />
    <el-input v-model="color" class="mx-2.5 flex-1" type="text" readonly />
    <el-button type="text" @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  resetColor: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const color = useVModel(props, 'modelValue', emit)
const predefineColors = ['#FF2C3C', '#f7971e', '#fa444d', '#e0a356', '#2f80ed', '#2ec840']

const reset = () => {
  color.value = props.resetColor
}
</script>
