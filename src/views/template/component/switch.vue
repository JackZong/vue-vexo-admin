<template>
  <div>
    <el-card header="Switch开关" shadow="never" class="border-none!">
      <h4>Normal</h4>
      <pax-switch v-model="value" />
      <pax-switch v-model="value2" />

      <h4>Disabled</h4>
      <pax-switch v-model="value" disabled />
      <pax-switch v-model="value2" disabled />

      <h4>Loading</h4>
      <pax-switch v-model="value" loading />
      <pax-switch v-model="value2" loading />
    </el-card>
  </div>
</template>
<script setup lang="ts">
const value = ref(true)
const value2 = ref(false)
</script>
