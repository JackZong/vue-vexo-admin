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
  <el-image :style="styles" v-bind="props" />
</template>

<script lang="ts" setup>
import { imageProps } from 'element-plus'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

import { addUnit } from '@/utils/util'

const props = defineProps({
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  radius: {
    type: [String, Number],
    default: 0
  },
  ...imageProps
})

const styles = computed<CSSProperties>(() => {
  return {
    width: addUnit(props.width),
    height: addUnit(props.height),
    borderRadius: addUnit(props.radius)
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/tailwind.css' as *;
.el-image {
  display: block;
  .el-image__error {
    @apply text-xs;
  }
}
</style>
