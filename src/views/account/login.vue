
<template>
  <div class="flex flex-col login">
    <div>
      <language-drop-down :show-select-text="true" class="float-right mt-5 mr-[50px]" />
    </div>
    <div class="flex items-center justify-center flex-1">
      <div class="flex rounded-md login-card">
        <div
          class="w-[460px] rounded-tl-md rounded-bl-md hidden h-full bg-[#f0F5ff] md:inline-block p-5"
        >
          <img class="h-9 mb-3" :src="config.web_logo" alt="Logo" />
          <div class="flex items-center justify-center flex-1">
            <img class="w-[360px] h-[340px]" :src="config.login_image" alt="Logo Image" />
          </div>
        </div>
        <div
          class="rounded-tr-md rounded-br-md login-form bg-body flex flex-col px-10 py-10 md:w-[400px] w-[375px] flex-none mx-auto"
        >
          <div class="mb-8 text-3xl font-medium">{{ $t('userLogin') }}</div>
          <el-form ref="formRef" :model="formData" size="large" :rules="rules">
            <el-form-item prop="username">
              <el-input
                v-model="formData.username"
                placeholder="请输入账号"
                @keyup.enter="handleEnter"
              >
                <template #prepend>
                  <icon name="el-icon-User" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                ref="passwordRef"
                v-model="formData.password"
                show-password
                placeholder="请输入密码"
                @keyup.enter="handleLogin"
              >
                <template #prepend>
                  <icon name="el-icon-Lock" />
                </template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="captcha">
              <el-input
                v-model="formData.captcha"
                clearable
                :placeholder="$t('请输入验证码')"
                maxlength="4"
                @keyup.enter="handleLogin"
              >
                <template #append>
                  <img class="w-[88px] h-9" :src="captchaSrc" @click="fetchCaptcha" />
                </template>
              </el-input>
            </el-form-item> -->
          </el-form>
          <!-- <div class="mb-5">
                        <el-checkbox v-model="remAccount" label="记住账号"></el-checkbox>
                    </div> -->
          <el-button class="mt-5" type="primary" size="large" :loading="isLock" @click="lockLogin">
            登录
          </el-button>
          <router-link to="/forget">
            <p class="mt-5 text-center text-primary">{{ $t('loginForgetPassword') }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, InputInstance } from 'element-plus'
import { computed, onMounted, reactive, ref, shallowRef } from 'vue'

import { captcha } from '@/api/user'
import { ACCOUNT_KEY } from '@/enums/cacheEnums'
import { PageEnum } from '@/enums/pageEnum'
import { useLockFn } from '@/hooks/useLockFn'
import { t } from '@/i18n'
import LayoutFooter from '@/layout/components/footer.vue'
import LanguageDropDown from '@/layout/default/components/header/language-drop-down.vue'
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import cache from '@/utils/cache'

const passwordRef = shallowRef<InputInstance>()
const formRef = shallowRef<FormInstance>()
const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const remAccount = ref(false)
const config = computed(() => appStore.config)
const captchaSrc = ref('')
const formData = reactive({
  username: '',
  password: '',
  captcha: ''
})
const rules = {
  username: [
    {
      required: true,
      message: t('enter'),
      trigger: ['blur']
    }
  ],
  password: [
    {
      required: true,
      message: t('enter'),
      trigger: ['blur']
    }
  ],
  captcha: [
    {
      required: true,
      message: t('enter'),
      trigger: 'blur'
    }
  ]
}

const fetchCaptcha = async () => {
  try {
    const res = await captcha({ width: 88, height: 36 })
    // 将 Blob 转换为可显示的图片 URL
    const blobUrl = URL.createObjectURL(res.data)
    captchaSrc.value = blobUrl
  } catch (err) {
    console.error('获取验证码失败:', err)
  }
}
// 回车按键监听
const handleEnter = () => {
  if (!formData.password) {
    return passwordRef.value?.focus()
  }
  handleLogin()
}
// 登录处理
const handleLogin = async () => {
  await formRef.value?.validate()
  // 记住账号，缓存
  cache.set(ACCOUNT_KEY, {
    remember: remAccount.value,
    username: remAccount.value ? formData.username : ''
  })
  await userStore.login(formData)
  // fetchCaptcha()
  const {
    query: { redirect }
  } = route
  const path = typeof redirect === 'string' ? redirect : PageEnum.INDEX
  console.log(path)
  router.push(path)
}
const { isLock, lockFn: lockLogin } = useLockFn(handleLogin)

onMounted(() => {
  // fetchCaptcha()
  // const value = cache.get(ACCOUNT_KEY)
  // if (value?.remember) {
  //     remAccount.value = value.remember
  //     formData.username = value.username
  // }
})
</script>

<style lang="scss" scoped>
@use '@/styles/tailwind.css' as *;
.login {
  background-image: url('./images/login_bg.png');
  @apply min-h-screen bg-no-repeat bg-center bg-cover;
  .login-card {
    height: 470px;
    :deep(.el-input-group__append) {
      padding: 0;
    }
  }
}
</style>
