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
  <section class="table-filter">
    <div class="filters">
      <div class="filters-container">
        <!---->
        <div class="flt-input">
          <el-input v-model="search" placeholder="Location" clearable style="width: 256px">
            <template #prefix>
              <i class="flt-icon icon-ic_line_search" />
            </template>
          </el-input>
          <!-- <div class="el-input el-input--prefix el-input--suffix" style="width: 256px;">
            <div class="el-input__wrapper" tabindex="-1">
              <span class="el-input__prefix"><span class="el-input__prefix-inner"><i class="flt-icon icon-ic_line_search"></i></span>
              </span>
              <input class="el-input__inner" sup-label="Loaction" teleported="false" maxlength="50" type="text" autocomplete="off" tabindex="0" placeholder="Loaction" id="el-id-3177-432">
            </div>
          </div> -->
        </div>
      </div>

      <div class="filters-controls">
        <button
          aria-disabled="false"
          type="button"
          class="el-button el-button--secondary is-text el-tooltip__trigger"
        >
          <i class="el-icon">
            <i class="flt-icon icon-ic_line_filter" />
          </i>
          <span class="">Filter</span>
        </button>

        <div class="setting">
          <button
            aria-disabled="false"
            type="button"
            class="el-button el-button--secondary is-text is-number el-tooltip__trigger el-tooltip__trigger"
          >
            <i class="el-icon"><i class="flt-icon icon-ic_line_eyeclose" /></i
            ><span class="">3</span>
          </button>
        </div>
        <div class="setting">
          <button
            aria-disabled="false"
            type="button"
            class="el-button el-button--secondary is-text el-tooltip__trigger"
            square=""
          >
            <!--v-if--><span class=""><i class="flt-icon icon-ic_line_density" /></span>
          </button>
        </div>

        <button
          aria-disabled="false"
          type="button"
          class="el-button el-button--secondary is-text"
          style="margin-left: auto"
        >
          <!--v-if--><span class="">Reset</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const search = ref('')
</script>
