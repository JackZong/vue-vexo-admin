
<template>
  <div class="w-[300px]">
    <div class="mb-5 text-2xl font-medium">{{ $t('forgetPassword.step.sendEmail') }}</div>
    <el-form
      ref="formRef"
      :model="formData"
      label-width="84px"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item :label="$t('forgetPassword.step1.email')" prop="email">
        <el-input v-model="formData.email" :placeholder="$t('enter')" clearable />
      </el-form-item>
      <el-form-item prop="code">
        <div class="flex justify-between w-full">
          <el-input v-model="formData.code" :placeholder="$t('enter')" clearable />
          <img class="ml-5 cursor-pointer" :src="codeImg" @click.stop="refreshAuthcode" />
        </div>
      </el-form-item>
    </el-form>
    <div class="flex justify-end mt-5">
      <el-button type="primary" @click="handleSubmit">
        {{ $t('forgetPassword.step1.getCode') }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import type { FormInstance } from 'element-plus'

import { captcha, getAccountEmailCode } from '@/api/user'
import { t } from '@/i18n'
export default defineComponent({
  props: {
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['next'],
  setup(props, { emit }) {
    const codeImg = ref('')
    const formRef = shallowRef<FormInstance>()
    const formData = reactive({
      email: '',
      code: '',
      codeToken: ''
    })
    const formRules = {
      email: [
        {
          required: true,
          message: t('enter'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: t('emailFormatError'),
          trigger: ['blur', 'change']
        }
      ],
      code: [
        {
          required: true,
          message: t('enter'),
          trigger: 'blur'
        }
      ]
    }

    // 获取验证码
    const refreshAuthcode = async () => {
      // const params = {
      //     height: 36,
      //     width: 100
      // }
      const res = await captcha({ width: 100, height: 36 })
      // 将 Blob 转换为可显示的图片 URL
      const blobUrl = URL.createObjectURL(res.data)
      codeImg.value = blobUrl
      // const { codeToken, img } = await getVerifyCode(params)
      // codeImg.value = img
      // formData.codeToken = codeToken
      formData.code = ''
    }
    const handleSubmit = async () => {
      await formRef.value?.validate()
      const { codeToken } = await getAccountEmailCode(formData.email, formData.code)
      console.log(codeToken)
      if (codeToken) {
        emit('next', formData.email, codeToken)
      }
    }
    refreshAuthcode()
    return {
      codeImg,
      formRef,
      formData,
      formRules,
      refreshAuthcode,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss"></style>
