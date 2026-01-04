

import { t } from '@/i18n'

export const merchantMenu: Array<MenuConfig> = [
  {
    component: 'dashboard/index',
    icon: 'el-icon-Monitor',
    keepAlive: true,
    hidden: false,
    title: t('menu.dashboard'),
    params: '',
    path: 'dashboard',
    perms: 'menu_1',
    selected: ''
  }
]
