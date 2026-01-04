<template>
    <div class="index-lists">
        <el-card class="border-none!" shadow="never">
            <el-form
                ref="formRef"
                class="default-query-form mb-4 pb-4 border-b border-[#F2F3F5] grid grid-cols-4 gap-5"
                :model="queryParams"
                label-position="top"
            >
                <el-form-item :label="$t('clientName')" prop="clientName">
                    <el-input v-model="queryParams.clientName" />
                </el-form-item>
                <el-form-item>
                    <div class="search-btn-group">
                        <el-button @click="resetParams">{{ $t('reset') }}</el-button>
                        <el-button type="primary" @click="resetPage">{{ $t('search') }}</el-button>
                    </div>
                </el-form-item>
            </el-form>

            <div>
                <el-button v-perms="['client.create']" type="primary" @click="handleAdd()">
                    <template #icon>
                        <icon name="el-icon-Plus" />
                    </template>
                    {{ $t('new') }}
                </el-button>
            </div>

            <el-table class="mt-4" size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column :label="$t('clientName')" prop="clientName" min-width="100" />
                <el-table-column :label="$t('clientId')" prop="clientCode" min-width="100" />
                <el-table-column :label="$t('contactName')" prop="contactPerson" min-width="100" />
                <el-table-column :label="$t('contactPhone')" prop="contactNumber" min-width="100" />
                <el-table-column :label="$t('createTime')" prop="gmtCreate" min-width="100" />
                <el-table-column :label="$t('updateTime')" prop="gmtModified" min-width="100" />
                <el-table-column :label="$t('status')" prop="status" min-width="100">
                    <template #default="{ row }">
                        <pax-status
                            :show-border="false"
                            :text="ClientStatusMap[row.status]"
                            :color="
                                row.status === '1'
                                    ? 'var(--el-color-success)'
                                    : 'var(--el-color-danger)'
                            "
                        ></pax-status>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column :label="$t('operation')" width="120" fixed="right">
                    <template #default="{ row }">
                        <!-- <el-button
                            v-perms="['client.edit']"
                            type="primary"
                            link
                            @click="handleEdit(row)"
                            >编辑</el-button
                        >
                        <el-button
                            v-perms="['client.delete']"
                            type="danger"
                            link
                            @click="handleDelete(row.id)"
                            >删除</el-button
                        > -->
                        <div class="flex">
                            <!-- 编辑 -->
                            <icon-button
                                @click="handleEdit(row)"
                                name="local-icon-edit"
                                :content="$t('edit')"
                            />
                            <!-- 启用 -->
                            <icon-button
                                v-if="row.status === ClientStatusEnum.Disabled"
                                class="ml-3"
                                @click="handleEnable(row.id)"
                                name="local-icon-enable"
                                :content="$t('action.enable')"
                            />
                            <!-- 禁用 -->
                            <icon-button
                                v-if="row.status === ClientStatusEnum.Enabled"
                                class="ml-3"
                                @click="handleDisable(row.id)"
                                name="local-icon-disable"
                                color="var(--el-color-danger)"
                                :content="$t('action.disable')"
                            />
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>

        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" @close="showEdit = false" />
    </div>
</template>

<script lang="ts" setup name="client">
import { clientDelete, clientLists, clientLock, clientUnlock } from '@/api/client'
import { ClientStatusEnum, ClientStatusMap } from '@/enums/clientEnums'
import { usePaging } from '@/hooks/usePaging'
import { t } from '@/i18n'
import feedback from '@/utils/feedback'

import EditPopup from './edit.vue'

const editRef = shallowRef<InstanceType<typeof EditPopup>>()
const showEdit = ref(false)
const queryParams = reactive({
    clientName: '',
    clientCode: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: clientLists,
    params: queryParams
})

const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.getDetail(data)
}

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await clientDelete(id)
    feedback.msgSuccess('删除成功')
    getLists()
}

const handleDisable = async (id: number) => {
    await feedback.confirm(t('admin.disable.tip'), t('action.disable'))
    await clientLock(id)
    getLists()
}

const handleEnable = async (id: number) => {
    await feedback.confirm(t('admin.enable.tip'), t('action.enable'))
    await clientUnlock(id)
    getLists()
}

getLists()
</script>
