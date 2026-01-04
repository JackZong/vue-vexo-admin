<template>
  <div>
    <el-button>返回</el-button>
  </div>
</template>
<script lang="ts" setup>
import { usePageLeave } from '@vueuse/core'

const value = ref('')

const isLeft = usePageLeave()
console.log('isLeft:', isLeft.value)
</script>
