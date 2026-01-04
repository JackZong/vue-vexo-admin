
<template>
  <div class="edit-popup">
    <popup
      ref="popupRef"
      :title="popupTitle"
      :async="true"
      width="550px"
      :click-modal-close="true"
      @confirm="handleSubmit"
      @close="handleClose"
    >
      <el-form ref="formRef" :model="formData" label-width="84px" :rules="formRules">
        <el-form-item label="客户名称" prop="clientName">
          <el-input v-model="formData.clientName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户编码" prop="clientCode">
          <el-input
            v-model="formData.clientCode"
            placeholder="请输入客户编码，如 CLT-20250603-001"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="formData.contactPerson" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="formData.contactNumber" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="时区" prop="timeZone">
          <!-- <el-input v-model="formData.timeZone" placeholder="请输入时区" /> -->
          <time-zone-selector v-model="formData.timeZone" />
        </el-form-item>
      </el-form>
    </popup>
  </div>
</template>

<script lang="ts" setup>
// import { abbreviations, getTimeZones, rawTimeZones, timeZonesNames } from '@vvo/tzdb'
import type { FormInstance } from 'element-plus'

import { clientAdd, clientDetail, clientEdit } from '@/api/client'
import Popup from '@/components/popup/index.vue'
import feedback from '@/utils/feedback'

const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const mode = ref('add')
const popupTitle = computed(() => (mode.value === 'edit' ? '编辑客户' : '新增客户'))

// const timeZones = getTimeZones({ includeUtc: true })
// console.log(timeZones)

const formData = reactive({
  id: '',
  clientName: '',
  clientCode: '',
  contactPerson: '',
  contactNumber: '',
  timeZone: ''
})

const formRules = {
  clientName: [
    {
      required: true,
      message: '请输入客户名称',
      trigger: ['blur']
    }
  ],
  clientCode: [
    {
      required: true,
      message: '请输入客户编码，如 CLT-20250603-001',
      trigger: ['blur']
    }
  ],
  contactPerson: [
    {
      required: true,
      message: '请输入联系人',
      trigger: ['blur']
    }
  ],
  contactNumber: [
    {
      required: true,
      message: '请输入联系电话',
      trigger: ['blur']
    }
  ],
  timeZone: [
    {
      required: true,
      message: '请输入时区',
      trigger: ['blur']
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  const data: any = { ...formData }
  mode.value === 'edit' ? await clientEdit(data) : await clientAdd(data)
  popupRef.value?.close()
  feedback.msgSuccess('操作成功')
  emit('success')
}

const open = (type = 'add') => {
  mode.value = type
  popupRef.value?.open()
}

const getDetail = async (row: Record<string, any>) => {
  const data = await clientDetail(row.id)
  Object.assign(formData, data)
}

const handleClose = () => {
  emit('close')
}

defineExpose({ open, getDetail })
</script>
