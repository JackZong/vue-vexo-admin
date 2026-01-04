<template>
  <footer class="layout-footer">
    <div class="text-center p-2 text-xs text-white max-w-[900px] mx-auto mb-4">
      Copyright © {{ year }} PAX All Rights Reserved.
      <!-- <a
                class="mx-1 hover:underline"
                :href="item.value"
                target="_blank"
                v-for="item in copyright"
                :key="item.key"
            >
                {{ item.key }}
            </a> -->
    </div>
  </footer>
</template>

<script setup lang="ts">
// import useAppStore from '@/stores/modules/app'

// const appStore = useAppStore()
// const copyright = computed(() => appStore.config.copyright_config || [])

const startYear = 2025
const year = computed(() =>
  new Date().getFullYear() == startYear ? startYear : `${startYear} - ${new Date().getFullYear()}`
)
</script>
