

import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $formatTime: (time: string, format?: string) => string
  }
}

declare module 'css-color-function'

type PromiseFun = (...arg: any[]) => Promise<any>

// 声明全局变量 __APP_CONFIG__ 的类型
declare global {
  interface Window {
    __APP_CONFIG__: {
      API_URL: string
      AUTH_SERVICE_URL: string
      ADMIN_SERVICE_URL: string
      REDIRECT_URI: string
    }
  }
}
