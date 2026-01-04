<template>
  <div>
    <el-card header="OTP" shadow="never" class="border-none!">
      <div class="mb-5">
        <h4 class="mb-2">Number</h4>
        <pax-otp v-model="otpCode" :length="6" placeholder="" @complete="handleOtpComplete" />
      </div>

      <div class="mb-5">
        <h4 class="mb-2">Text</h4>
        <pax-otp
          v-model="otpCode2"
          :length="6"
          placeholder=""
          input-type="text"
          @complete="handleOtpComplete"
        />
      </div>

      <div class="mb-5">
        <h4 class="mb-2">Disable</h4>
        <pax-otp v-model="otpCode" :length="6" placeholder="" disabled />
      </div>

      <div>
        <h4 class="mb-2">Error</h4>
        <el-form :model="form" :rules="rules">
          <el-form-item prop="otp">
            <pax-otp v-model="form.otp" :length="6" placeholder="" @complete="handleOtpComplete" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus'
import { ref } from 'vue'

const form = reactive({
  otp: ''
})

const rules = reactive({
  otp: [
    {
      required: true,
      message: '请输入 OTP',
      trigger: 'change'
    }
  ]
})

const otpCode = ref('')
const otpCode2 = ref('')

const handleOtpComplete = (code: string) => {
  ElMessage.success(`🎉 OTP 输入完成: ${code}`)
  console.log('OTP Code Completed:', code)
}

const submitOtp = () => {
  if (otpCode.value.length === 6) {
    ElMessage.success(`提交 OTP: ${otpCode.value}`)
  } else {
    ElMessage.warning('请输入完整的 OTP 码')
  }
}
</script>
