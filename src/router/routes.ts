

/**
 * Note: 路由配置项
 *
 * path: '/path'                    // 路由路径
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
	title: 'title'                  // 设置该路由在侧边栏的名字
	icon: 'icon-name'                // 设置该路由的图标
	activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
	query: '{"id": 1}'             // 访问路由的默认传递参数
	hidden: true                   // 当设置 true 的时候该路由不会在侧边栏出现 
    hideTab: true                   //当设置 true 的时候该路由不会在多标签tab栏出现
  }
 */

import type { RouteRecordRaw } from 'vue-router'

import { MenuEnum } from '@/enums/appEnums'
import { PageEnum } from '@/enums/pageEnum'
import { t } from '@/i18n'
import Layout from '@/layout/default/index.vue'
import UserLayout from '@/layout/user-layout/index.vue'

export const LAYOUT = () => Promise.resolve(Layout)
export const USER_LAYOUT = () => Promise.resolve(UserLayout)

export const INDEX_ROUTE_NAME = Symbol()

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: PageEnum.ERROR_403,
    component: () => import('@/views/error/403.vue')
  },
  {
    path: PageEnum.LOGIN,
    component: () => import('@/views/account/login.vue')
  },
  {
    path: PageEnum.FORGET,
    component: () => import('@/views/account/forget.vue')
  },
  {
    path: PageEnum.MODIFY_INIT_PWD,
    component: () => import('@/views/account/initial.vue')
  },
  // 用户中心
  {
    path: '/user-center',
    component: USER_LAYOUT,
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-center/index.vue'),
        name: Symbol(),
        meta: {
          title: t('userCenter')
        }
      }
    ]
  }
  // {
  //     path: '/dev_tools',
  //     component: LAYOUT,
  //     children: [
  //         {
  //             path: 'code/edit',
  //             component: () => import('@/views/dev_tools/code/edit.vue'),
  //             meta: {
  //                 title: '编辑数据表',
  //                 activeMenu: '/dev_tools/code'
  //             }
  //         }
  //     ]
  // },
  // {
  //     path: '/setting',
  //     component: LAYOUT,
  //     children: [
  //         {
  //             path: 'dict/data',
  //             component: () => import('@/views/setting/dict/data/index.vue'),
  //             meta: {
  //                 title: '数据管理',
  //                 activeMenu: '/setting/dict'
  //             }
  //         }
  //     ]
  // }
]

export const INDEX_ROUTE: RouteRecordRaw = {
  path: PageEnum.INDEX,
  component: LAYOUT,
  name: INDEX_ROUTE_NAME
}

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      hidden: false,
      title: t('menu.dashboard'),
      icon: 'el-icon-Monitor',
      perms: 'menu_1',
      type: MenuEnum.MENU,
      query: ''
    },
    component: () => import('@/views/dashboard/index.vue')
  },
  {
    path: '/client',
    name: 'Client',
    meta: {
      hidden: false,
      title: t('menu.client'),
      icon: 'local-icon-company',
      perms: 'menu_1',
      type: MenuEnum.MENU,
      query: ''
    },
    component: () => import('@/views/client/index.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      hidden: false,
      title: t('menu.user'),
      icon: 'local-icon-user',
      perms: 'menu_3',
      type: MenuEnum.MENU,
      query: ''
    },
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/permission',
    name: 'Permission',
    meta: {
      hidden: false,
      title: '系统与账号管理',
      icon: 'local-icon-user',
      perms: 'menu_3',
      type: MenuEnum.MENU,
      query: ''
    },
    children: [
      {
        path: 'user',
        name: 'AdminUser',
        meta: {
          hidden: false,
          title: '运营用户',
          perms: 'menu_3_1',
          type: MenuEnum.MENU,
          query: ''
        },
        component: () => import('@/views/permission/admin/index.vue')
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          hidden: false,
          title: '运营角色',
          perms: 'menu_3_1',
          type: MenuEnum.MENU,
          query: ''
        },
        component: () => import('@/views/permission/role/index.vue')
      }
    ]
  },
  // 示例代码
  {
    path: '/template',
    name: 'Template',
    meta: {
      hidden: false,
      title: '模板示例',
      icon: 'local-icon-apps',
      perms: 'menu_3',
      type: MenuEnum.MENU,
      query: ''
    },
    children: [
      {
        path: 'components',
        name: 'Components',
        meta: {
          hidden: false,
          title: '组件示例',
          icon: '',
          perms: '',
          type: MenuEnum.MENU,
          query: ''
        },
        children: [
          {
            path: 'icon',
            name: 'Icon',
            meta: {
              hidden: false,
              title: '图标',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/icon.vue')
          },
          {
            path: 'rich_text',
            name: 'RichText',
            meta: {
              hidden: false,
              title: '富文本',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/rich_text.vue')
          },
          {
            path: 'upload',
            name: 'Upload',
            meta: {
              hidden: false,
              title: '上传文件',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/upload.vue')
          },
          // {
          //     path: 'popover_input',
          //     name: 'PopoverInput',
          //     meta: {
          //         hidden: false,
          //         title: '悬浮input',
          //         icon: '',
          //         perms: '',
          //         type: MenuEnum.MENU,
          //         query: ''
          //     },
          //     component: () => import('@/views/template/component/popover_input.vue')
          // },
          // {
          //     path: 'link',
          //     name: 'Link',
          //     meta: {
          //         hidden: false,
          //         title: '连接选择器',
          //         icon: '',
          //         perms: '',
          //         type: MenuEnum.MENU,
          //         query: ''
          //     },
          //     component: () => import('@/views/template/component/link.vue')
          // },
          {
            path: 'overflow',
            name: 'Overflow',
            meta: {
              hidden: false,
              title: '超出自动打点',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/overflow.vue')
          },
          {
            path: 'app_link',
            name: 'AppLink',
            meta: {
              hidden: false,
              title: 'App Link',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/app_link.vue')
          },
          {
            path: 'pax-switch',
            name: 'PAXSwitch',
            meta: {
              hidden: false,
              title: 'switch开关',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/switch.vue')
          },
          {
            path: 'otp',
            name: 'OTP',
            meta: {
              hidden: false,
              title: 'OTP',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/otp_demo.vue')
          },
          {
            path: 'input-field',
            name: 'InputField',
            meta: {
              hidden: false,
              title: 'Input Field',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/input-field.vue')
          },
          {
            path: 'form',
            name: 'PAXForm',
            meta: {
              hidden: false,
              title: 'Form表单',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/component/form.vue')
          }
        ]
      },
      {
        path: 'hook',
        name: 'Hook',
        meta: {
          hidden: false,
          title: 'Hook示例',
          icon: '',
          perms: '',
          type: MenuEnum.MENU,
          query: ''
        },
        children: [
          {
            path: 'data_download',
            name: 'DataDownload',
            meta: {
              hidden: false,
              title: 'useDataDownload',
              icon: '',
              perms: '',
              type: MenuEnum.MENU,
              query: ''
            },
            component: () => import('@/views/template/hook/data_download.vue')
          }
          // {
          //     path: 'page_leave',
          //     name: 'Paging',
          //     meta: {
          //         hidden: false,
          //         title: 'usePageLeave',
          //         icon: '',
          //         perms: '',
          //         type: MenuEnum.MENU,
          //         query: ''
          //     },
          //     component: () => import('@/views/template/hook/page_leave.vue')
          // }
        ]
      }
    ]
  }
]
