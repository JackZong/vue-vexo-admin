<template>
  <div class="logo" @click="handleClick">
    <image-contain
      :width="width"
      :height="height"
      :src="isLight ? config.web_logo_light : config.web_logo"
    />
  </div>
</template>

<script setup lang="ts">
import { LayoutEnum } from '@/enums/appEnums'
import useAppStore from '@/stores/modules/app'
import useSettingStore from '@/stores/modules/setting'

defineProps({
  // size: { type: Number, default: 34 },
  width: { type: Number, default: 130 },
  height: { type: Number, default: 29 },
  title: { type: String },
  theme: { type: String },
  showTitle: { type: Boolean, default: false },
  isLight: { type: Boolean, default: false }
})
const appStore = useAppStore()
const settingStore = useSettingStore()
const config = computed(() => appStore.config)
const router = useRouter()
const containerWidth = computed(() =>
  appStore.isCollapsed && settingStore.layout === LayoutEnum.SIDEBAR_NAV
    ? 50
    : settingStore.sideWidth
)

const handleClick = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
@use '@/styles/var.css' as *;
@use '@/styles/tailwind.css' as *;
.logo {
  // height: var(--navbar-height);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  @apply flex-1 flex justify-center items-center relative;
  .logo-title {
    width: 70%;
    position: absolute;
    @apply text-xl;
  }

  .title-width-enter-active {
    opacity: 0;
    transition: all 0.3s ease-out;
  }

  .title-width-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .title-width-enter-from,
  .title-width-leave-to {
    width: 0;
    opacity: 0;
  }
}
</style>
