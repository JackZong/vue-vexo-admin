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
  <div class="page-header">
    <span class="flex-1"
      ><span class="flt-table__title">{{ title }}</span></span
    >
    <div class="right">
      <el-button type="primary">{{ buttonText }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title: string
  buttonText: string
}>()
</script>
<style lang="scss" scoped>
.page-header {
  border-bottom: 1px solid var(--flt-bd-divider);
  box-sizing: content-box;
  order: -1;
  // border-bottom: 1px solid var(--flt-table-border-color);
  // height: auto;
  // min-height: 32px;
  padding-bottom: 8px;
  padding-top: 24px;

  --action-btn-space: 14px;
  display: flex;
  height: 64px;
  align-items: center;
  padding: 0 20px;

  .flt-table__title {
    font-size: 20px;
    color: var(--flt-fg-primary);
    font-weight: 600;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
