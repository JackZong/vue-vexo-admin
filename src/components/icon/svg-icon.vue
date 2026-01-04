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
  <svg aria-hidden="true" :style="styles">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { addUnit } from '@/utils/util'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    color: {
      type: String,
      default: 'inherit'
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.name}`)
    const styles = computed<CSSProperties>(() => {
      return {
        width: addUnit(props.size),
        height: addUnit(props.size),
        color: props.color
      }
    })
    return { symbolId, styles }
  }
})
</script>
