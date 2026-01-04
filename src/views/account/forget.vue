
<template>
  <basic-layout>
    <div class="w-full h-full flex flex-col justify-center items-center pb-[60px]">
      <div class="">
        <img
          class="back-btn"
          src="@/assets/images/circle_back.png"
          alt="Back"
          @click="$router.back()"
        />
        <!-- 卡片 -->
        <div class="forget-card flex w-[760px] h-[550px] bg-white rounded-lg">
          <!-- 左侧步骤条 -->
          <div
            class="forget-card__left w-[200px] bg-linear-to-b from-[#DDE9FF] to-white rounded-tl-lg rounded-bl-lg p-6"
          >
            <div class="text-xl font-medium">{{ $t('forgetPassword') }}</div>
            <div class="h-[150px] mt-5">
              <el-steps direction="vertical" :active="activeStep">
                <el-step v-for="(item, index) in steps" :key="index" :title="item" />
              </el-steps>
            </div>
          </div>
          <!-- 右侧内容 -->
          <div class="flex items-center justify-center flex-1 w-full forget-card__right">
            <send-email v-if="activeStep === 1" @next="goStep2" />
            <reset-password
              v-if="activeStep === 2"
              :email="email"
              :code-token="codeToken"
              @get-code="goStep(1)"
              @cancel="goStep(1)"
              @next="goStep(3)"
            />
            <reset-successful v-if="activeStep === 3" />
          </div>
        </div>
      </div>
    </div>
  </basic-layout>
</template>
<script lang="ts" setup>
import { t } from '@/i18n'
import BasicLayout from '@/layout/basic-layout/index.vue'

import ResetPassword from './components/reset-password.vue'
import ResetSuccessful from './components/reset-successful.vue'
import SendEmail from './components/send-email.vue'

const steps = [
  t('forgetPassword.step.sendEmail'),
  t('forgetPassword.step.reset'),
  t('forgetPassword.step.success')
]
const activeStep = ref(1)
const codeToken = ref('')
const email = ref('')
const goStep = (val: number) => {
  activeStep.value = val
}
const goStep2 = (emailVal: string, codeTokenVal: string) => {
  codeToken.value = codeTokenVal
  email.value = emailVal
  activeStep.value = 2
}
</script>
<style lang="scss" scoped>
.back-btn {
  width: 36px;
  height: 36px;
  position: relative;
  top: 0;
  left: -20px;
  cursor: pointer;
  float: left;
}
.forget-card {
  &__left {
    :deep(.el-steps.el-steps--vertical) {
      .el-step {
        .el-step__head {
          .el-step__icon {
            color: var(--el-text-color-primary);
            background: #fff;
            border: 0;
            .el-step__icon-inner {
              font-weight: 400;
            }
          }
          .el-step__line {
            width: 1px;
            background-color: #c9cdd3;
          }
          &.is-finish {
            .el-step__icon {
              color: var(--el-color-white);
              background: var(--el-color-primary);
            }
            .el-step__line {
              width: 1px;
              background: var(--el-color-primary);
              .el-step__line-inner {
                display: none;
              }
            }
          }
        }
        .el-step__main {
          .el-step__title {
            color: var(--el-text-color-primary);
            font-weight: 400;
            font-size: var(--el-font-size-base);
          }
        }
      }
    }
  }
}
</style>
