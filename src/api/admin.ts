

import request from '@/utils/request'

// 列表
export function userLists(params?: Record<string, any>) {
  return request.get({ url: '/user', params })
}

// 详情
export function userDetail(id: number) {
  return request.get({ url: `/user/${id}` })
}

// 新增
export function userAdd(params: Record<string, any>) {
  return request.post({ url: '/user', params })
}

// 编辑
export function userEdit(data: Record<string, any>) {
  return request.put({ url: `/user/${data.userId}`, data })
}

// 删除
export function userDelete(id: number) {
  return request.post({ url: `/user/${id}` })
}

// 禁用
export function userLock(id: number) {
  return request.patch({ url: `/user/${id}/lock` })
}

// 启用
export function userUnlock(id: number) {
  return request.patch({ url: `/user/${id}/unlock` })
}
