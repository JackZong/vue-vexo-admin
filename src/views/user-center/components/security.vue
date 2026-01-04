
<template>
  <div>
    <div class="mb-2 font-medium">{{ $t('user.security') }}</div>
    <div class="bg-white rounded-md">
      <div
        class="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
        @click="handleChangeEmail"
      >
        <div class="flex items-center justify-between flex-1">
          <div>
            <div class="font-medium">{{ $t('email') }}</div>
            <div class="text-xs text-tx-secondary">
              {{ $t('user.changeEmail.desc') }}
            </div>
          </div>
          <div class="mr-3 font-medium">{{ userInfo.email }}</div>
        </div>
        <el-icon><ArrowRight /></el-icon>
      </div>
      <div
        class="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
        @click="handleChangePassword"
      >
        <div>
          <div class="font-medium">{{ $t('user.changePwd') }}</div>
          <div class="text-xs text-tx-secondary">
            {{ $t('user.changePwd.desc') }}
          </div>
        </div>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>

    <change-email-popup
      v-if="showChangeEmail"
      ref="changeEmailPopupRef"
      @close="showChangeEmail = false"
      @success="onChangeEmailSuccess"
    />
    <change-password-popup
      v-if="showChangePassword"
      ref="changePasswordPopupRef"
      @close="showChangePassword = false"
    />
  </div>
</template>
<script setup lang="ts" name="userSetting">
import useUserStore from '@/stores/modules/user'

import ChangeEmailPopup from './change-email.vue'
import ChangePasswordPopup from './change-password.vue'
const changeEmailPopupRef = shallowRef<InstanceType<typeof ChangeEmailPopup>>()
const changePasswordPopupRef = shallowRef<InstanceType<typeof ChangePasswordPopup>>()

const showChangeEmail = ref(false)
const showChangePassword = ref(false)

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const handleChangeEmail = async () => {
  showChangeEmail.value = true
  await nextTick()
  changeEmailPopupRef.value?.open()
}

const handleChangePassword = async () => {
  showChangePassword.value = true
  await nextTick()
  changePasswordPopupRef.value?.open()
}

const onChangeEmailSuccess = () => {
  userStore.getUserInfo()
}
</script>
