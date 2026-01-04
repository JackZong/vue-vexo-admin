

import request from '@/utils/request'

// 获取token
export function getTokenApi(params: any) {
  return request.post(
    {
      url: '/oauth/token',
      params
    },
    {
      withToken: false
    }
  )
}

// 刷新token
export function refreshTokenApi(params: any) {
  return request.post(
    {
      url: '/oauth/refresh_token',
      params
    },
    {
      withToken: false
    }
  )
}

// 授权中心-心跳接口
export function keepAliveApi() {
  return request.get(
    {
      baseURL: import.meta.env.VITE_AUTH_CENTER,
      url: '/alive'
    },
    {
      withToken: false
    }
  )
}

// 获取用户权限等用户信息
export function currentApi() {
  return request.get({
    baseURL: import.meta.env.VITE_USER_CENTER,
    url: `/users/current`
  })
}

// 退出登录
export function logoutApi() {
  return request.get({
    withCredentials: true,
    baseURL: import.meta.env.VITE_AUTH_CENTER,
    url: '/oauth/logout'
  })
}
