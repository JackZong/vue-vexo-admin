

import { defineStore } from 'pinia'

import { getConfig } from '@/api/app'

interface AppSate {
  config: Record<string, any>
  isMobile: boolean
  isCollapsed: boolean
  isRouteShow: boolean
}

const useAppStore = defineStore('app', {
  // id: 'app',
  state: (): AppSate => {
    return {
      config: {},
      isMobile: true,
      isCollapsed: false,
      isRouteShow: true
    }
  },
  actions: {
    getImageUrl(url: string) {
      return url.indexOf('http') ? `${this.config.oss_domain}${url}` : url
    },
    getConfig() {
      return new Promise((resolve, reject) => {
        const data = {
          oss_domain: 'https://java-admin.likeadmin.cn/',
          web_name: 'PAX ADMIN PRO',
          web_favicon: new URL(`@/assets/favicon.ico`, import.meta.url).href,
          web_logo: new URL(`@/assets/images/logo.png`, import.meta.url).href,
          web_logo_light: new URL(`@/assets/images/logo_light.png`, import.meta.url).href,
          login_image: new URL(`@/views/account/images/login_image.png`, import.meta.url).href,
          copyright_config: [
            {
              value: 'https://beian.miit.gov.cn/',
              key: 'likeadmin开源后台'
            },
            {
              value: 'https://www.likeshop.cn',
              key: 'likeshop开源电商'
            }
          ]
        }
        this.config = data
        resolve(data)
        // getConfig()
        //     .then((data) => {
        //         this.config = data
        //         resolve(data)
        //     })
        //     .catch((err) => {
        //         reject(err)
        //     })
      })
    },
    setMobile(value: boolean) {
      this.isMobile = value
    },
    toggleCollapsed(toggle?: boolean) {
      this.isCollapsed = toggle ?? !this.isCollapsed
    },
    refreshView() {
      this.isRouteShow = false
      nextTick(() => {
        this.isRouteShow = true
      })
    }
  }
})

export default useAppStore
