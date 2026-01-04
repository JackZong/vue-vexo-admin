<template>
  <div class="h-screen basic-layout-bg">
    <div class="navbar">
      <side-logo :is-light="true" />
      <language-drop-down :show-select-text="true" />
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import LanguageDropDown from '@/layout/default/components/header/language-drop-down.vue'
import SideLogo from '@/layout/default/components/sidebar/logo.vue'
</script>
<style lang="scss" scoped>
@use '@/styles/var.css' as *;
@use '@/styles/tailwind.css' as *;
.basic-layout-bg {
  background-image: url('@/views/account/images/login_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
}
.navbar {
  height: var(--navbar-height);
  background-color: transparent;
  @apply flex justify-between items-center px-2;
}
</style>
