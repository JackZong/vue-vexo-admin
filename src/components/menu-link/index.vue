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
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts" setup>
/**
 * @description 兼容第三方页面的跳转
 */
import { isExternal } from '@/utils/validate'

interface Props {
  to: string | Record<string, string>
  replace?: boolean
}
const props = defineProps<Props>()

const isExternalLink = computed(() => {
  return typeof props.to !== 'object' && isExternal(props.to)
})

const type = computed(() => {
  if (isExternalLink.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = computed(() => {
  if (isExternalLink.value) {
    return {
      href: props.to,
      target: '_blank'
    }
  }
  return props
})
</script>
