

import request from '@/utils/request'

// 获取图形验证码
export function captcha(params: Record<string, any>) {
  return request.get(
    { responseType: 'blob', url: '/captcha', params },
    { isReturnDefaultResponse: true, isTransformResponse: false }
  )
}

// 登录
export function login(params: LoginRequest): Promise<ApiResponse> {
  return request.post({ url: '/login', params }, { isParamsToData: false })
}

// 退出登录
export function logout() {
  return request.post({ url: '/logout' })
}

// 用户信息
export function getUserInfo() {
  return request.get({ url: '/user/current' })
}

// 编辑管理员信息
export function setUserInfo(params: any) {
  return request.post({ url: '/auth.admin/editSelf', params })
}

// 修改密码
export function changePassword(data: any) {
  return request.patch({ url: '/user/change-password', data }, { successTip: true })
}

// 修改邮箱，接口1
// 获取邮箱验证码，验证当前邮箱
export function sendEmailCode() {
  return request.post({ url: '/user/email-code/send' }, { successTip: true })
}

// 修改邮箱，接口2
// 通过邮箱验证码验证当前邮箱
export function checkEmailCode(params: any) {
  return request.post({ url: '/user/email-code/check', params })
}

// 修改邮箱，接口3
// 获取邮箱验证码，验证新邮箱
export function sendNewEmailCode(email: string) {
  return request.post({ url: '/user/email-code/send-new', data: { email } }, { successTip: true })
}

// 修改邮箱，接口4
// 修改邮箱
export function updateEmail(data: any) {
  return request.patch({ url: '/user/email', data }, { successTip: true })
}

// 账户密码找回(通过邮箱或手机找回)
export function passwordRecover(data: Record<string, any>) {
  return request.post({ url: '/user/password-recover', data })
}

// 发送邮箱验证码，找回密码使用
export function getAccountEmailCode(email: string, captcha: string) {
  return request.post({ url: '/user/email-code', data: { email }, params: { captcha } })
}

// 修改初始密码
export function changeInitPassword(data: Record<string, any>) {
  return request.post({ url: '/user/password-recover', data })
}
