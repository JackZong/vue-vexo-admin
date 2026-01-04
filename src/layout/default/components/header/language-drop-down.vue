<template>
  <el-dropdown class="px-2" trigger="click" @command="handleCommand">
    <div class="flex items-center">
      <icon
        name="local-icon-earth"
        :size="showSelectText ? 24 : 22"
        :color="showSelectText ? 'white' : 'var(--el-color-info)'"
      />
      <div v-if="showSelectText" class="text-white ml-2">{{ $t($i18n.locale) }}</div>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
          :command="locale"
          :class="{ 'text-primary': $i18n.locale === locale }"
        >
          {{ $t(locale) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import earthIcon from '@/assets/images/ic_earth.png'
import whiteEarthIcon from '@/assets/images/ic_earth_white.png'
import { setI18nLanguage } from '@/i18n'

export default defineComponent({
  props: {
    showSelectText: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const handleCommand = async (command: any) => {
      setI18nLanguage(command)
      window.location.reload()
    }
    return {
      earthIcon,
      whiteEarthIcon,
      handleCommand
    }
  }
})
</script>
