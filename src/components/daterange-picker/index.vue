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
  <el-date-picker
    v-model="content"
    type="datetimerange"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    value-format="YYYY-MM-DD HH:mm:ss"
    clearable
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/* Props S */
const props = withDefaults(
  defineProps<{
    startTime?: string
    endTime?: string
  }>(),
  {
    startTime: '',
    endTime: ''
  }
)
const emit = defineEmits(['update:startTime', 'update:endTime'])

const content = computed<any>({
  get: () => {
    return [props.startTime, props.endTime]
  },
  set: (value: Event | any) => {
    if (value === null) {
      emit('update:startTime', '')
      emit('update:endTime', '')
    } else {
      emit('update:startTime', value[0])
      emit('update:endTime', value[1])
    }
  }
})
</script>
