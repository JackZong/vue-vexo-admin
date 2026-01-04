
<template>
  <div>
    <div>
      <div class="mb-2 font-medium">{{ $t('user.basic') }}</div>
      <div class="p-5 bg-white rounded-md">
        <div class="flex items-center justify-between pb-4 border-b border-[#F2F3F5]">
          <div class="text-tx-secondary">{{ $t('username') }}</div>
          <div class="mr-3">{{ userInfo.username }}</div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div class="text-tx-secondary">{{ $t('fullName') }}</div>
          <div class="mr-3">{{ userInfo.fullName }}</div>
        </div>
      </div>
    </div>

    <div>
      <div class="mt-[30px] mb-2 font-medium">{{ $t('loginInfo') }}</div>
      <div class="p-5 bg-white rounded-md">
        <div class="flex items-center justify-between pb-4 border-b border-[#F2F3F5]">
          <div class="text-tx-secondary">{{ $t('lastLoginIP') }}</div>
          <div class="mr-3">{{ userInfo.loginIp }}</div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div class="text-tx-secondary">{{ $t('lastLoginTime') }}</div>
          <div class="mr-3">{{ userInfo.loginTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="accountInfo">
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>
