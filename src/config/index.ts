

import { AuthMethodEnum } from '@/enums/appEnums'

interface AppConfig {
  // 网站默认标题
  title: string
  // 项目版本
  version: string
  // 二级目录名称
  appBase: string
  // 后端API地址
  baseUrl: string
  // 请求默认前缀
  urlPrefix: string
  // 请求超时时长
  timeout: number
  // Client Id
  clientId: string
  // 授权中心
  authServiceUrl: string
  // 用户中心
  adminServiceUrl: string
  // 登录重定向地址
  redirectUri: string
  // 授权方式
  authMethod: string
  // 是否开启代理
  proxy: boolean
}

// 运维可以配置的
const publicConfig = window.__APP_CONFIG__
// 内部使用
const config: AppConfig = {
  title: import.meta.env.VITE_APP_TITLE,
  version: import.meta.env.VITE_APP_VERSION, //版本号
  appBase: import.meta.env.VITE_APP_BASE,
  urlPrefix: '', //请求默认前缀
  timeout: 60 * 1000, //请求超时时长
  clientId: import.meta.env.VITE_CLIENT_ID,
  baseUrl: publicConfig.API_URL, //请求接口域名
  authServiceUrl: publicConfig.AUTH_SERVICE_URL,
  adminServiceUrl: publicConfig.ADMIN_SERVICE_URL,
  redirectUri: publicConfig.REDIRECT_URI,
  authMethod: AuthMethodEnum.JWT,
  proxy: true
}

export default config
