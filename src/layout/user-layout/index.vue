<template>
  <div class="w-full h-screen layout-default">
    <div class="app-header">
      <layout-header :show-breadcrumb="false" :show-logo="true" />
    </div>

    <div class="flex flex-1 min-w-0 app-main-container">
      <div class="flex-1 min-h-0 app-main">
        <layout-main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/layout/default/components/header/index.vue'

import LayoutMain from './components/main.vue'
</script>

<style lang="scss">
.app-main-container {
  height: calc(100vh - var(--navbar-height));
}
</style>
