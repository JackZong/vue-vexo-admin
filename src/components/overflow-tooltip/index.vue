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
    <el-tooltip v-bind="props" :disabled="disabled" :append-to="'body'" :teleported="true">
      <div ref="textRef" class="overflow-text truncate" :style="{ textOverflow: overfloType }">
        {{ content }}
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { type Placement, useTooltipContentProps } from 'element-plus'
import type { PropType } from 'vue'

const props = defineProps({
  ...useTooltipContentProps,
  teleported: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top'
  },
  overfloType: {
    type: String as PropType<'ellipsis' | 'unset' | 'clip'>,
    default: 'ellipsis'
  }
})
const textRef = shallowRef<HTMLElement>()
const disabled = ref(false)

useEventListener(textRef, 'mouseenter', () => {
  if (textRef.value?.scrollWidth! > textRef.value?.offsetWidth!) {
    disabled.value = false
  } else {
    disabled.value = true
  }
})
</script>

<style></style>
