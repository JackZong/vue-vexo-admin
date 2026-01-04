
<template>
  <div class="w-[300px] text-center">
    <img class="w-[120px] h-[90px] mx-auto mb-5" src="@/assets/images/success.png" />
    <div class="text-xl text-medium">{{ $t('forgetPassword.step3.tip1') }}</div>
    <div>{{ $t('forgetPassword.step3.tip2') }}</div>
    <el-button type="primary" class="mt-10" @click="handleLogin">
      {{ $t('forgetPassword.step3.btn') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import useUserStore from '@/stores/modules/user'
export default defineComponent({
  props: {
    showClose: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const userStore = useUserStore()
    const handleLogin = async () => {
      userStore.logout()
    }
    return {
      handleLogin
    }
  }
})
</script>
