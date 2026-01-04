
<template>
  <div class="edit-popup">
    <popup
      ref="popupRef"
      :title="$t('user.changePwd')"
      :async="true"
      width="420px"
      @confirm="handleSubmit"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="pwdData"
        label-width="84px"
        :rules="formRules"
        label-position="top"
      >
        <el-form-item :label="$t('user.changePwd.oldPwd')" prop="oldPass">
          <el-input
            v-model="pwdData.oldPass"
            :type="oldPassHide ? 'password' : 'text'"
            :placeholder="$t('enter')"
          >
            <template #suffix>
              <img
                class="w-5 cursor-pointer"
                :src="oldPassHide ? eyeCloseIcon : eyeOpenIcon"
                @click="oldPassHide = !oldPassHide"
              />
            </template>
          </el-input>
        </el-form-item>
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
      <div class="change-password-tips">
        <p>{{ $t('user.changePwd.tip1') }}</p>
        <p>{{ $t('user.changePwd.tip2') }}</p>
        <p>{{ $t('user.changePwd.tip3') }}</p>
        <p>{{ $t('user.changePwd.tip4') }}</p>
      </div>
    </popup>
  </div>
</template>
<script lang="ts" setup name="changePasswordPopup">
import { useI18n } from 'vue-i18n'

import { changePassword } from '@/api/user'
import type Popup from '@/components/popup/index.vue'
import { usePassword } from '@/hooks/usePassword'

const emit = defineEmits(['success', 'close'])
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const { t } = useI18n()

const { eyeCloseIcon, eyeOpenIcon, formRef, pwdData, pwdFormRules } = usePassword()
const oldPassHide = ref(true)
const formRules = {
  oldPass: [
    {
      required: true,
      message: t('enter'),
      trigger: 'blur'
    }
  ],
  ...pwdFormRules
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  await changePassword({
    newPassword: pwdData.newPass,
    oldPassword: pwdData.oldPass
  })
  popupRef.value?.close()
  emit('success')
}

const open = () => {
  popupRef.value?.open()
}

const handleClose = () => {
  emit('close')
}

defineExpose({
  open
})
</script>
<style lang="scss" scoped>
.change-password-tips {
  margin-top: 20px;
  p {
    font-size: 12px;
    color: #85a5ff;
    margin: 0 !important;
  }
}
</style>
