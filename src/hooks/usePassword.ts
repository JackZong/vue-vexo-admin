

import type { FormInstance } from 'element-plus'
import { reactive } from 'vue'

import eyeCloseIcon from '@/assets/images/ic_eye_close.png'
import eyeOpenIcon from '@/assets/images/ic_eye_open.png'
import { t } from '@/i18n'

/**
 * 修改密码钩子
 * 有三处在使用该钩子：用户中心修改密码、忘记密码、修改初始密码
 * @returns Object
 */
export function usePassword() {
  const formRef = shallowRef<FormInstance>()
  const pwdData = reactive({
    code: '',
    oldPass: '',
    newPassHide: true,
    confirmPassHide: true,
    newPass: '',
    confirmPass: ''
  })

  // 密码校验规则
  const reg =
    /^(((?=.*\d)(?=.*[a-zA-Z]))|((?=.*\d)(?=.*[~#@!~%^&*_$]))|((?=.*[~#@!~%^&*_$])(?=.*[a-zA-Z])))[\da-zA-Z~#@!~%^&*_$]{8,16}$/

  // 校验新密码
  const validateNewPass = (rule: any, value: any, callback: any) => {
    console.log('validateNewPass:', value)
    if (value === '') {
      callback(new Error(t('enter')))
    } else {
      if (!reg.test(value)) {
        callback(new Error(t('wrong_format')))
      }
      if (pwdData.confirmPass !== '') {
        if (!formRef.value) return
        formRef.value.validateField('confirmPass')
      }
      callback()
    }
  }
  // 校验确认密码
  const validateConfirmPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error(t('enter')))
    } else if (value !== pwdData.newPass) {
      callback(new Error(t('twice_inconsistent')))
    } else {
      callback()
    }
  }

  const pwdFormRules = {
    newPass: [{ validator: validateNewPass, trigger: 'blur' }],
    confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }]
  }

  return {
    eyeCloseIcon,
    eyeOpenIcon,
    formRef,
    pwdData,
    pwdFormRules,
    validateNewPass,
    validateConfirmPass
  }
}
