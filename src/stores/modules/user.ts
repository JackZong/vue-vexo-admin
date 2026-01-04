

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

import { getUserInfo, login, logout } from '@/api/user'
import { adminMenu } from '@/config/menu/adminMenu'
import { TOKEN_KEY } from '@/enums/cacheEnums'
import { PageEnum } from '@/enums/pageEnum'
import { t } from '@/i18n'
import router, { filterAsyncRoutes } from '@/router'
import { asyncRoutes } from '@/router/routes'
import { clearAuthInfo, getToken } from '@/utils/auth'
import cache from '@/utils/cache'

export interface UserState {
  token: string
  userInfo: Record<string, any>
  routes: RouteRecordRaw[]
  perms: string[]
}

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken() || '',
    // 用户信息
    userInfo: {},
    // 路由
    routes: [],
    // 权限
    perms: []
  }),
  getters: {},
  actions: {
    resetState() {
      this.token = ''
      this.userInfo = {}
      this.perms = []
    },
    login(playload: any) {
      const { username, password, captcha } = playload
      return new Promise((resolve, reject) => {
        console.log(`${username}-${password}login: `, captcha)
        const data = {
          code: 20000,
          message: '请求成功',
          messageArgs: null,
          result: null,
          timestamp: 1765184152442
        }
        this.token = username
        cache.set(TOKEN_KEY, username)
        resolve(data)
        //   login({
        //     username: username.trim(),
        //     password,
        //     captcha
        //   })
        //     .then((data) => {
        //       this.token = username
        //       cache.set(TOKEN_KEY, username)
        //       resolve(data)
        //     })
        //     .catch((error) => {
        //       reject(error)
        //     })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(async (data) => {
            this.token = ''
            await router.push(PageEnum.LOGIN)
            clearAuthInfo()
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        const data = {
          userId: 1,
          username: 'admin',
          roleId: [1],
          roleNames: ['Platform Admin'],
          privileges: [
            'client.lock',
            'terminal.import.sn',
            'user.password.reset',
            'terminal.query',
            'user.detail',
            'client.detail',
            'terminal.import.excel',
            'user.unlock',
            'menu_3',
            'menu_2',
            'menu_1',
            'terminal.create',
            'client.unlock',
            'terminal.export',
            'user.delete',
            'user.update',
            'client.create',
            'user.lock',
            'client.query',
            'terminal.delete',
            'terminal.update',
            'user.create',
            'client.delete',
            'terminal.detail',
            'terminal.log',
            'user.query',
            'role_1',
            'client.update'
          ],
          email: 'zongjian@paxsz.com',
          fullName: 'Admin',
          clientId: 0,
          loginIp: '192.168.10.68',
          loginTime: '2025-12-08 16:59:26',
          admin: true
        }
        this.userInfo = {
          ...data
        }
        console.log('userInfo', this.userInfo)
        this.perms = data.privileges
        const asyncRoutes = adminMenu
        this.routes = filterAsyncRoutes(asyncRoutes, this.perms)
        resolve(data)

        // getUserInfo()
        //   .then((data) => {
        //     this.userInfo = {
        //       ...data
        //     }
        //     this.perms = data.privileges
        //     this.routes = filterAsyncRoutes(asyncRoutes, this.perms)
        //     // this.routes = filterAsyncRoutes([
        //     //     // {
        //     //     //     component: 'workbench/index',
        //     //     //     create_time: '2022-07-01 16:39:53',
        //     //     //     icon: 'el-icon-Monitor',
        //     //     //     id: 5,
        //     //     //     is_cache: 1,
        //     //     //     is_disable: 0,
        //     //     //     is_show: 1,
        //     //     //     name: '工作台',
        //     //     //     params: '',
        //     //     //     paths: 'workbench',
        //     //     //     perms: 'workbench/index',
        //     //     //     pid: 0,
        //     //     //     selected: '',
        //     //     //     sort: 1000,
        //     //     //     type: 'C',
        //     //     //     update_time: '2022-09-28 16:49:41'
        //     //     // },
        //     //     {
        //     //         component: 'client/index',
        //     //         create_time: '2022-07-01 16:39:53',
        //     //         icon: 'local-icon-rencaizhaopin',
        //     //         id: 1,
        //     //         is_cache: 1,
        //     //         is_disable: 0,
        //     //         is_show: 1,
        //     //         name: t('menu.client'),
        //     //         params: '',
        //     //         paths: 'client',
        //     //         perms: 'menu_1',
        //     //         pid: 0,
        //     //         selected: '',
        //     //         sort: 999,
        //     //         type: 'C',
        //     //         update_time: '2022-09-28 16:49:41'
        //     //     },
        //     //     {
        //     //         component: 'terminal/index',
        //     //         create_time: '2022-07-01 16:39:53',
        //     //         icon: 'el-icon-Monitor',
        //     //         id: 3,
        //     //         is_cache: 1,
        //     //         is_disable: 0,
        //     //         is_show: 1,
        //     //         name: t('menu.terminal'),
        //     //         params: '',
        //     //         paths: 'terminal',
        //     //         perms: 'menu_2',
        //     //         pid: 0,
        //     //         selected: '',
        //     //         sort: 999,
        //     //         type: 'C',
        //     //         update_time: '2022-09-28 16:49:41'
        //     //     },
        //     //     {
        //     //         component: 'user/index',
        //     //         create_time: '2022-07-01 16:39:53',
        //     //         icon: 'local-icon-user',
        //     //         id: 3,
        //     //         is_cache: 1,
        //     //         is_disable: 0,
        //     //         is_show: 1,
        //     //         name: t('menu.user'),
        //     //         params: '',
        //     //         paths: 'user',
        //     //         perms: 'menu_3',
        //     //         pid: 0,
        //     //         selected: '',
        //     //         sort: 999,
        //     //         type: 'C',
        //     //         update_time: '2022-09-28 16:49:41'
        //     //     }
        //     //     // {
        //     //     //     component: 'model/index',
        //     //     //     create_time: '2022-07-01 16:39:53',
        //     //     //     icon: 'el-icon-Monitor',
        //     //     //     id: 5,
        //     //     //     is_cache: 1,
        //     //     //     is_disable: 0,
        //     //     //     is_show: 1,
        //     //     //     name: t('menu.model'),
        //     //     //     params: '',
        //     //     //     paths: 'model',
        //     //     //     perms: 'model/index',
        //     //     //     pid: 0,
        //     //     //     selected: '',
        //     //     //     sort: 999,
        //     //     //     type: 'C',
        //     //     //     update_time: '2022-09-28 16:49:41'
        //     //     // },
        //     //     // {
        //     //     //     component: 'country/index',
        //     //     //     create_time: '2022-07-01 16:39:53',
        //     //     //     icon: 'el-icon-Monitor',
        //     //     //     id: 5,
        //     //     //     is_cache: 1,
        //     //     //     is_disable: 0,
        //     //     //     is_show: 1,
        //     //     //     name: t('menu.country'),
        //     //     //     params: '',
        //     //     //     paths: 'country',
        //     //     //     perms: 'country/index',
        //     //     //     pid: 0,
        //     //     //     selected: '',
        //     //     //     sort: 999,
        //     //     //     type: 'C',
        //     //     //     update_time: '2022-09-28 16:49:41'
        //     //     // }
        //     // ])
        //     resolve(data)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    }
  }
})

export default useUserStore
