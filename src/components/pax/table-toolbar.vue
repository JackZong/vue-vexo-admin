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
