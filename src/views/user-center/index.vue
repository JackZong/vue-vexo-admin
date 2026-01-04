
<template>
  <div class="user-setting">
    <div class="p-5 center-wrapper">
      <img
        class="back-btn"
        src="@/assets/images/circle_back.png"
        alt="Back"
        @click="$router.back()"
      />
      <div class="h-full flex rounded-[8px]">
        <div class="bg-white w-[277px] rounded-tl-[8px] rounded-bl-[8px] p-5 text-center">
          <el-avatar class="mt-6 bg-transparent" :size="92" :src="defaultAvatar" />
          <div class="mt-4 font-medium">{{ userInfo.nickName }}</div>
          <!-- 角色 -->
          <div class="flex flex-wrap justify-center gap-2 mt-5">
            <div
              v-for="item in userInfo.roleNames"
              :key="item"
              class="border-solid border border-primary rounded-xs text-primary px-2 py-1"
            >
              {{ $t(item) }}
            </div>
          </div>
          <!-- 菜单 -->
          <div class="mt-5">
            <div
              v-for="item in menu"
              :key="item.value"
              class="h-14 mb-2 font-medium rounded-md text-center leading-14 cursor-pointer"
              :class="{ 'bg-[#F1F6FF]': activeMenu === item.value }"
              @click="handleMenuClick(item.value)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="bg-[#F7F7F7] flex-1 rounded-tr-[8px] rounded-br-[8px] p-5">
          <!-- <div>
                        <div class="mb-2 font-medium">{{ $t('user.basic') }}</div>
                        <div class="flex justify-between p-4 bg-white rounded-md">
                            <div class="font-medium">{{ $t('user.email') }}</div>
                            <div class="font-medium">{{ formData.email }}</div>
                        </div>
                    </div> -->
          <component :is="activeMenu === 'info' ? Info : Security" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="userSetting">
import defaultAvatar from '@/assets/images/default_avatar.png'
import { t } from '@/i18n'
import useUserStore from '@/stores/modules/user'

import Info from './components/info.vue'
import Security from './components/security.vue'
const userStore = useUserStore()
const userInfo = userStore.userInfo

const activeMenu = ref('info')
const menu = [
  { title: t('accountInfo'), value: 'info' },
  { title: t('accountAndSecurity'), value: 'security' }
]

const handleMenuClick = (val: string) => {
  activeMenu.value = val
}
</script>

<style lang="scss" scoped>
.user-setting {
  height: calc(100vh - var(--navbar-height));
  background: linear-gradient(180deg, #2f54eb 0%, #72c4ff 100%);
  display: flex;
  justify-content: center;
  .center-wrapper {
    width: 960px;
    // height: calc(100vh - 100px);
    .back-btn {
      width: 36px;
      height: 36px;
      position: relative;
      top: 0;
      left: -20px;
      cursor: pointer;
      float: left;
    }
  }
}
</style>
