<template>
  <el-select
    v-model="modelValue"
    filterable
    placeholder="Select Time Zone"
    style="width: 100%"
    @change="$emit('update:modelValue', modelValue)"
  >
    <el-option
      v-for="zone in displayTimeZones"
      :key="zone.value"
      :label="zone.label"
      :value="zone.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { getTimeZones } from '@vvo/tzdb'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
}>()
defineEmits(['update:modelValue'])

const { locale } = useI18n()
const modelValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    modelValue.value = val
  }
)

function getIanaTimeZones(): string[] {
  const timeZones = getTimeZones()
  console.log(timeZones)
  return timeZones.map((z) => z.name)
}

function getDisplayTimeZoneName(tz: string, locale = 'en'): string {
  try {
    const formatter = new Intl.DisplayNames([locale], { type: 'timezone' })
    return formatter.of(tz) ?? tz
  } catch {
    return tz
  }
}

const displayTimeZones = computed(() => {
  return getIanaTimeZones().map((tz) => ({
    value: tz,
    label: getDisplayTimeZoneName(tz, locale.value)
  }))
})
</script>
