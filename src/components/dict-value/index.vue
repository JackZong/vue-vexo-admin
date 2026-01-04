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
  <div>
    <template v-for="(item, index) in getOptions" :key="index">
      <span>{{ index != 0 ? '、' : '' }}{{ item[config.label] }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    options: any[]
    value: any
    config: Record<string, string>
  }>(),
  {
    options: () => [],
    config: () => ({
      label: 'name',
      value: 'value'
    })
  }
)

const values = computed(() => {
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : String(props.value).split(',')
  } else {
    return []
  }
})

const getOptions = computed(() => {
  return props.options.filter((item) => values.value.includes(item[props.config.value]))
})
</script>
