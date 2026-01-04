<template>
  <div>
    <el-card header="json demo" shadow="never" class="border-none!">
      <el-form>
        <el-form-item label="name">
          <el-input v-model="formData.name" @change="handeChange" />
        </el-form-item>
        <el-form-item label="name">
          <el-input-number v-model="formData.age" @change="handeChange" />
        </el-form-item>
      </el-form>
      <a
        :href="downloadUrl"
        class="el-button el-button--primary"
        download="form-data.json"
        target="_blank"
        >下载</a
      >
    </el-card>

    <el-card header="Blob demo" shadow="never" class="border-none! mt-4">
      <a
        :href="downloadBlob"
        class="el-button el-button--primary"
        download="form-data.text"
        target="_blank"
        >下载</a
      >
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useDataDownload } from '@/hooks/useDataDownload'
const { downloadUrl, downloadFileName, updateData, cleanup } = useDataDownload()

const { downloadUrl: downloadBlob, updateData: updateBlob } = useDataDownload()

const formData = ref({
  name: 'Name',
  age: 20,
  tags: ['a', 'b', 'c']
})

function handeChange() {
  updateData(formData.value)
}

function handleJsonDemo() {
  updateData(formData.value)
}

updateData(formData.value)

updateBlob(new Blob(['blob text blob text\nblob text']))
</script>
