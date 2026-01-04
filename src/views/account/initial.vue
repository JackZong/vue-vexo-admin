
<template>
  <basic-layout>
    <div class="w-full h-full flex flex-col justify-center items-center pb-[100px]">
      <div class="w-[554px]">
        <div class="text-3xl font-medium text-white">{{ $t('changeInitialPassword') }}</div>
        <div class="text-xl font-medium text-white">
          {{ $t('changeInitialPassword.desc', { title: config.title }) }}
        </div>
        <div class="bg-white rounded-[12px] p-[60px] mt-6">
          <el-form
            ref="formRef"
            :model="pwdData"
            label-width="84px"
            :rules="formRules"
            label-position="top"
          >
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
          <div class="mt-5 text-sm text-primary">
            <p>1. {{ $t('user.changePwd.tip1') }}</p>
            <p>2. {{ $t('user.changePwd.tip2') }}</p>
            <p>3. {{ $t('user.changePwd.tip3') }}</p>
            <p>4. {{ $t('user.changePwd.tip4') }}</p>
          </div>
          <div class="flex justify-center mt-10">
            <el-button type="primary" class="w-44" @click="handleSubmit">
              {{ $t('confirm') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </basic-layout>
</template>
<script lang="ts" setup>
import { changeInitPassword } from '@/api/user'
import config from '@/config'
import { usePassword } from '@/hooks/usePassword'
import { t } from '@/i18n'
import BasicLayout from '@/layout/basic-layout/index.vue'
import useUserStore from '@/stores/modules/user'
import { getParam } from '@/utils/util'

console.log(config)

const { eyeCloseIcon, eyeOpenIcon, formRef, pwdData, validateNewPass, validateConfirmPass } =
  usePassword()

const userStore = useUserStore()

const formRules = {
  newPass: [{ validator: validateNewPass, trigger: 'blur' }],
  confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  await changeInitPassword({
    authCode: getParam('code'),
    newPassword: pwdData.newPass
  })
  // 退出登录，返回登录页(让修改成功提示显示3秒)
  setTimeout(() => {
    userStore.logout()
  }, 3000)
}
</script>
