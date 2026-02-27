<template>
  <div class="flex items-center justify-between w-full pagination">
    <div class="pagination-total">
      <span class="text-sm pagination-total-text text-tx-secondary">
        {{ $t('pager.total', { total: pager.count }) }}
      </span>
    </div>
    <el-pagination
      v-bind="props"
      v-model:current-page="pager.page"
      v-model:page-size="pager.size"
      :pager-count="5"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="pager.count"
      :hide-on-single-page="false"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue?: Record<string, any>
  pageSizes?: number[]
  layout?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  pageSizes: () => [10, 20, 30, 40],
  layout: 'sizes, prev, pager, next, jumper'
})

const emit = defineEmits<{
  (event: 'change'): void
  (event: 'update:modelValue', value: any): void
}>()

const pager = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const sizeChange = () => {
  pager.value.page = 1
  emit('change')
}
const pageChange = () => {
  emit('change')
}
</script>
