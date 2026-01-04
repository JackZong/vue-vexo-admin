

import { t } from '@/i18n'

// 用户状态
export enum UserStatusEnum {
  Disabled = '0', //禁用
  Locked = '1', //锁定
  Enabled = '2' //已启用
}

// 状态映射
export const UserStatusMap: Record<string, string> = {
  [UserStatusEnum.Disabled]: t('status.disabled'),
  [UserStatusEnum.Locked]: t('status.locked'),
  [UserStatusEnum.Enabled]: t('action.enable')
}

// 密码错误锁定状态
export enum LockedEnum {
  UnLocked = 0, //未锁定
  Locked = 1 //已锁定
}
