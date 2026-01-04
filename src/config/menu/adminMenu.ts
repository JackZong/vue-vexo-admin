

import { t } from '@/i18n'

export const adminMenu: Array<MenuConfig> = [
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
  },
  {
    component: 'client/index',
    icon: 'local-icon-company',
    keepAlive: true,
    hidden: false,
    title: t('menu.client'),
    params: '',
    path: 'client',
    perms: 'menu_1',
    selected: ''
  },
  {
    icon: 'local-icon-user',
    keepAlive: true,
    hidden: false,
    title: '系统与账号管理',
    params: '',
    path: 'permission',
    perms: 'menu_1',
    selected: 'permission/user',
    children: [
      {
        component: 'permission/admin/index',
        keepAlive: true,
        hidden: false,
        title: '运营用户',
        path: 'permission/user',
        perms: 'menu_1',
        params: ''
      },
      {
        component: 'permission/role/index',
        keepAlive: true,
        hidden: false,
        title: '运营角色',
        path: 'permission/role',
        perms: 'menu_1'
      }
    ]
  }
  // {
  //   path: '/permission',
  //   name: 'Permission',
  //   meta: {
  //     hidden: false,
  //     title: '系统与账号管理',
  //     icon: 'local-icon-user',
  //     perms: 'menu_3',
  //     type: MenuEnum.MENU,
  //     query: ''
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'AdminUser',
  //       meta: {
  //         hidden: false,
  //         title: '运营用户',
  //         perms: 'menu_3_1',
  //         type: MenuEnum.MENU,
  //         query: ''
  //       },
  //       component: () => import('@/views/permission/admin/index.vue')
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       meta: {
  //         hidden: false,
  //         title: '运营角色',
  //         perms: 'menu_3_1',
  //         type: MenuEnum.MENU,
  //         query: ''
  //       },
  //       component: () => import('@/views/permission/role/index.vue')
  //     }
  //   ]
  // }
]
