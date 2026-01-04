

import { t } from '@/i18n'

// 授权方式
export enum AuthMethodEnum {
  SESSION_COOKIE = 'Session + Cookie',
  JWT = 'jwt'
}

//菜单主题类型
export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

//菜单主题类型
export enum LayoutEnum {
  SIDEBAR_NAV = 'sidebar-nav', // 垂直：侧边垂直菜单模式
  HEADER_SIDEBAR_NAV = 'header-sidebar-nav' // 侧边导航：顶部通栏，侧边导航模式
}

// 菜单类型
export enum MenuEnum {
  CATALOGUE = 'M', // 目录
  MENU = 'C', // 菜单
  BUTTON = 'A' // 按钮
}

// 屏幕
export enum ScreenEnum {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  '2XL' = 1536
}

// 客户端类型
export enum ClientEnum {
  MP_WEIXIN = 1, // 微信-小程序
  OA_WEIXIN = 2, // 微信-公众号
  H5 = 3, // H5
  PC = 4, // PC
  IOS = 5, //苹果
  ANDROID = 6 //安卓
}

export const ClientMap = {
  [ClientEnum.MP_WEIXIN]: '微信小程序',
  [ClientEnum.OA_WEIXIN]: '微信公众号',
  [ClientEnum.H5]: '手机H5',
  [ClientEnum.PC]: '电脑PC',
  [ClientEnum.IOS]: '苹果APP',
  [ClientEnum.ANDROID]: '安卓APP'
}

//视图类型
export enum ViewEnum {
  TABLE = 'table',
  LIST = 'list'
}

//角色
export enum RoleEnum {
  PLATFORM_ADMIN = 1,
  CLIENT_ADMIN = 2,
  CLIENT_USER = 3
}
export const RoleMap = {
  [RoleEnum.PLATFORM_ADMIN]: t('platformAdmin'),
  [RoleEnum.CLIENT_ADMIN]: t('clientAdmin'),
  [RoleEnum.CLIENT_USER]: t('clientUser')
}
