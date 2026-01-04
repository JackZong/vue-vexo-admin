
<template>
  <div class="edit-popup">
    <popup
      ref="popupRef"
      :title="$t('user.changeEmail')"
      :async="true"
      width="366px"
      custom-class="change-email-popup"
      :confirm-button-text="currentStep === 1 ? $t('user.changeEmail.next') : $t('ok')"
      @confirm="handleSubmit"
      @close="handleClose"
    >
      <!-- Steps -->
      <ol class="flex items-center w-full mb-5 text-sm font-medium text-gray-500 sm:text-base">
        <li
          class="flex flex-1 items-center sm:after:content-[''] text-primary after:w-full after:h-[1px] after:border-b after:border-gray-200 after:border after:hidden sm:after:inline-block after:mx-2"
          :class="[currentStep === 2 ? 'after:border-primary' : 'after:border-gray-200']"
        >
          <div
            class="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2"
          >
            <span
              class="flex items-center justify-center w-6 h-6 mr-3 text-sm text-white rounded-full lg:w-[26px] lg:h-[26px]"
              :class="[1 === 1 ? 'bg-primary' : 'bg-[#C9CDD3]']"
              >1</span
            >
            {{ $t('user.changeEmail.step1') }}
          </div>
        </li>
        <li
          class="flex items-center"
          :class="[currentStep === 2 ? 'text-primary' : 'text-gray-600']"
        >
          <div class="flex items-center">
            <span
              class="flex items-center justify-center w-6 h-6 mr-3 text-sm text-white rounded-full lg:w-[26px] lg:h-[26px]"
              :class="[currentStep === 2 ? 'bg-primary' : 'bg-[#C9CDD3]']"
              >2</span
            >
            {{ $t('user.changeEmail.step2') }}
          </div>
        </li>
      </ol>

      <el-form
        ref="formRef"
        :model="formData"
        label-width="84px"
        :rules="formRules"
        label-position="top"
      >
        <el-form-item :label="$t('user.changeEmail.email')" prop="email">
          <el-input v-if="currentStep === 1" v-model="oldEmail" disabled />
          <el-input v-else v-model="formData.email" :placeholder="$t('enter')" />
        </el-form-item>
        <el-form-item :label="$t('user.changeEmail.emailCode')" prop="code">
          <el-input
            v-model="formData.code"
            :placeholder="$t('enter')"
            class="email-code-input"
            :class="{ disabled: sendingCode }"
          >
            <template #append>
              <el-button :disabled="sendingCode" @click="sendVerificationCode">
                {{ sendingCode ? `${countdown}s` : $t('send') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="text-center">
                <el-button @click="handlePrevious">{{ $t('previous') }}</el-button>
                <el-button type="primary" @click="handleNext">{{ $t('nextStep') }}</el-button>
            </div> -->
    </popup>
  </div>
</template>

<script lang="ts" setup name="changeEmailPopup">
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { checkEmailCode, sendEmailCode, sendNewEmailCode, updateEmail } from '@/api/user'
import type Popup from '@/components/popup/index.vue'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const userInfo = userStore.userInfo

const formRef = shallowRef<FormInstance>()
const emit = defineEmits(['success', 'close'])
const popupRef = shallowRef<InstanceType<typeof Popup>>()

const { t } = useI18n()

const oldEmail = ref(userInfo.email)
const oldCodeToken = ref('')
const newCodeToken = ref('')
// 表单数据
const formData = reactive({
  email: '',
  code: ''
})

// 当前步骤（1: 验证旧邮箱, 2: 绑定新邮箱）
const currentStep = ref(1)

// 发送验证码按钮状态
const sendingCode = ref(false)
const timer = ref()
const countdown = ref(60) // 倒计时秒数

// 表单规则
const formRules = {
  email: [
    { required: true, message: t('enter'), trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  code: [{ required: true, message: t('enter'), trigger: 'blur' }]
}

// 发送验证码
const sendVerificationCode = async () => {
  if (currentStep.value === 1) {
    const { codeToken } = await sendEmailCode()
    oldCodeToken.value = codeToken
  } else {
    await formRef.value?.validateField(['email'])
    const { codeToken } = await sendNewEmailCode(formData.email)
    newCodeToken.value = codeToken
  }
  sendingCode.value = true
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearTimer()
    }
  }, 1000)
}

const clearTimer = () => {
  timer.value && clearInterval(timer.value)
  timer.value = null
  sendingCode.value = false
  countdown.value = 60
}

// 提交表单
const handleSubmit = async () => {
  if (currentStep.value === 1) {
    await formRef.value?.validateField(['code'])
    // 检查code
    await checkEmailCode({
      codeToken: oldCodeToken.value,
      code: formData.code
    })
    currentStep.value = 2
    formData.code = ''
    clearTimer()
  } else if (currentStep.value === 2) {
    await formRef.value?.validate()
    await updateEmail({
      email: formData.email,
      code: formData.code,
      codeToken: newCodeToken.value
    })
    popupRef.value?.close()
    emit('success')
  }
}

// 打开弹窗
const open = () => {
  popupRef.value?.open()
}

// 关闭弹窗
const handleClose = () => {
  emit('close')
}

defineExpose({
  open
})
</script>
<style lang="scss">
.change-email-popup {
  .email-code-input {
    .el-input-group__append .el-button {
      width: 72px;
    }
    &.disabled {
      .el-input-group__append {
        background-color: #c9cdd3;
        box-shadow: 0 1px 0 0 #c9cdd3 inset, 0 -1px 0 0 #c9cdd3 inset, -1px 0 0 0 #c9cdd3 inset;
      }
    }
    .el-input-group__append {
      color: #ffffff;
      background-color: var(--el-color-primary);
      box-shadow: 0 1px 0 0 var(--el-color-primary) inset, 0 -1px 0 0 var(--el-color-primary) inset,
        -1px 0 0 0 var(--el-color-primary) inset;
    }
  }
}
</style>
