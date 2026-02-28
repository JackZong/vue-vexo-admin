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
                <el-form-item :label="$t('clientName')" prop="clientName">
                    <el-input
                        v-model="formData.clientName"
                        :placeholder="$t('client.name.placeholder')"
                    />
                </el-form-item>
                <el-form-item :label="$t('clientId')" prop="clientCode">
                    <el-input
                        v-model="formData.clientCode"
                        :placeholder="$t('client.code.placeholder')"
                    />
                </el-form-item>
                <el-form-item :label="$t('contactName')" prop="contactPerson">
                    <el-input
                        v-model="formData.contactPerson"
                        :placeholder="$t('client.contact.placeholder')"
                    />
                </el-form-item>
                <el-form-item :label="$t('contactPhone')" prop="contactNumber">
                    <el-input
                        v-model="formData.contactNumber"
                        :placeholder="$t('client.phone.placeholder')"
                    />
                </el-form-item>
                <el-form-item :label="$t('timeZone')" prop="timeZone">
                    <time-zone-selector v-model="formData.timeZone" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import { clientAdd, clientDetail, clientEdit } from '@/api/client'
import Popup from '@/components/popup/index.vue'
import { t } from '@/i18n'
import feedback from '@/utils/feedback'

const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const mode = ref('add')
const popupTitle = computed(() =>
    mode.value === 'edit' ? t('client.edit.title') : t('client.add.title')
)

const formData = reactive<ClientForm>({
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
            message: t('client.name.required'),
            trigger: ['blur']
        }
    ],
    clientCode: [
        {
            required: true,
            message: t('client.code.required'),
            trigger: ['blur']
        }
    ],
    contactPerson: [
        {
            required: true,
            message: t('client.contact.required'),
            trigger: ['blur']
        }
    ],
    contactNumber: [
        {
            required: true,
            message: t('client.phone.required'),
            trigger: ['blur']
        }
    ],
    timeZone: [
        {
            required: true,
            message: t('client.timezone.required'),
            trigger: ['blur']
        }
    ]
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    const data: ClientForm = { ...formData }
    mode.value === 'edit' ? await clientEdit(data) : await clientAdd(data)
    popupRef.value?.close()
    feedback.msgSuccess(t('operateSuccess'))
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
