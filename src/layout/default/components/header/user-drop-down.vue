<template>
  <el-dropdown class="px-2" @command="handleCommand">
    <div class="flex items-center">
      <el-avatar :size="34" :src="defaultAvatar" />
      <div class="ml-2 text-xl font-medium max-w-[150px] overflow-text truncate">
        {{ userInfo.fullName }}
      </div>
      <!-- <icon name="el-icon-ArrowDown" /> -->
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/user-center/index">
          <el-dropdown-item>
            <div class="flex items-center">
              <icon name="local-icon-user" size="18" />
              {{ $t('userCenter') }}
            </div>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item command="logout">
          <div class="flex items-center">
            <icon name="local-icon-logout" size="18" />
            {{ $t('logout') }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/images/default_avatar.png'
import { t } from '@/i18n'
import useUserStore from '@/stores/modules/user'
import feedback from '@/utils/feedback'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const handleCommand = async (command: string) => {
  switch (command) {
    case 'logout':
      await feedback.confirm(t('logout.tip'))
      userStore.logout()
      break
  }
}
</script>
