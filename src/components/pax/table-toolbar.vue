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
  <section class="table-toolbar">
    <span class="flex-1">
      <span class="flt-table__title">Account</span>
    </span>
    <div class="right">
      <div class="setting">
        <button
          aria-disabled="false"
          type="button"
          class="el-button el-button--secondary is-text el-tooltip__trigger"
          square=""
        >
          <!--v-if-->
          <span class=""> <span class="flt-icon icon-ic_line_refresh" /></span>
        </button>
      </div>
      <button aria-disabled="false" type="button" class="el-button el-button--primary">
        Create User
      </button>
    </div>
  </section>
</template>
