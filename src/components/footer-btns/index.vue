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
  <div class="footer-btns">
    <div class="footer-btns__content" :style="fixed ? 'position: fixed' : ''">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  fixed: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/tailwind.css' as *;
.footer-btns {
  height: 60px;
  &__content {
    bottom: 0;
    height: 60px;
    right: 0;
    left: 0;
    z-index: 99;
    @apply flex justify-center items-center shadow bg-body;
  }
}
</style>
