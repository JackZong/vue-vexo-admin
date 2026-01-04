

import { t } from '@/i18n'

// 客户状态
export enum ClientStatusEnum {
  Disabled = '0', //禁用
  Enabled = '1' //已启用
}

// 状态映射
export const ClientStatusMap: Record<string, string> = {
  [ClientStatusEnum.Disabled]: t('status.disabled'),
  [ClientStatusEnum.Enabled]: t('action.enable')
}
