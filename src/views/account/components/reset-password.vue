
<template>
  <div class="w-[300px]">
    <div class="mb-5 text-2xl font-medium">{{ $t('forgetPassword.step.reset') }}</div>
    <el-form
      ref="formRef"
      :model="pwdData"
      label-width="84px"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item :label="$t('forgetPassword.step2.code')" prop="code">
        <el-input v-model="pwdData.code" :placeholder="$t('enter')" clearable />
      </el-form-item>
      <div class="cursor-pointer text-primary text-end" @click="handleReGetCode">
        {{ $t('forgetPassword.step2.getCode') }}
      </div>
      <el-form-item :label="$t('user.changePwd.newPwd')" prop="newPass">
        <el-input
          v-model="pwdData.newPass"
          :type="pwdData.newPassHide ? 'password' : 'text'"
          :placeholder="$t('enter')"
        >
          <template #suffix>
            <img
              class="w-5 cursor-pointer"
              :src="pwdData.newPassHide ? eyeCloseIcon : eyeOpenIcon"
              @click="pwdData.newPassHide = !pwdData.newPassHide"
            />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.changePwd.confirmPwd')" prop="confirmPass">
        <el-input
          v-model="pwdData.confirmPass"
          :type="pwdData.confirmPassHide ? 'password' : 'text'"
          :placeholder="$t('enter')"
        >
          <template #suffix>
            <img
              class="w-5 cursor-pointer"
              :src="pwdData.confirmPassHide ? eyeCloseIcon : eyeOpenIcon"
              @click="pwdData.confirmPassHide = !pwdData.confirmPassHide"
            />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="mt-5 text-sm text-tx-secondary">
      <p>{{ $t('forgetPassword.step2.specialNote') }}</p>
      <p>{{ $t('user.changePwd.tip1') }}</p>
      <p>{{ $t('user.changePwd.tip2') }}</p>
      <p>{{ $t('user.changePwd.tip3') }}</p>
      <p>{{ $t('user.changePwd.tip4') }}</p>
    </div>
    <div class="flex justify-end mt-5">
      <el-button @click="handleCancel">
        {{ $t('cancel') }}
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        {{ $t('ok') }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { passwordRecover } from '@/api/user'
import { usePassword } from '@/hooks/usePassword'
import { t } from '@/i18n'
export default defineComponent({
  props: {
    email: {
      type: String,
      default: ''
    },
    codeToken: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel', 'get-code', 'next'],
  setup(props, { emit }) {
    const { eyeCloseIcon, eyeOpenIcon, formRef, pwdData, pwdFormRules } = usePassword()

    const formRules = {
      code: [
        {
          required: true,
          message: t('enter'),
          trigger: 'blur'
        }
      ],
      ...pwdFormRules
    }

    const handleReGetCode = () => {
      emit('get-code')
    }
    const handleCancel = () => {
      emit('cancel')
    }
    const handleSubmit = async () => {
      await formRef.value?.validate()
      await passwordRecover({
        account: props.email,
        code: pwdData.code,
        codeToken: props.codeToken,
        findType: 'email',
        password: pwdData.newPass
      })
      emit('next')
    }
    return {
      eyeCloseIcon,
      eyeOpenIcon,
      formRef,
      pwdData,
      formRules,
      handleCancel,
      handleReGetCode,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss"></style>
