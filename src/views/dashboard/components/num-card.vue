
<template>
  <div class="h-35 p-3 rounded-(--radius-10)" :style="{ backgroundColor: color }">
    <div>
      {{ title }}
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title: string
  num: string
  icon: string
  color: string
}
defineProps<Props>()
</script>
<style scoped lang="sass"></style>
