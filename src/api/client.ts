

import request from '@/utils/request'

// 客户下拉选
export function clientAll() {
  return request.get({ url: '/client/all' })
}

// 客户列表
export function clientLists(params?: Record<string, any>) {
  return request.get({ url: '/table/list', params })
}

// 客户详情
export function clientDetail(id: number) {
  return request.get({ url: `/client/${id}` })
}

// 客户新增
export function clientAdd(params: Record<string, any>) {
  return request.post({ url: '/client', params })
}

// 客户编辑
export function clientEdit(data: Record<string, any>) {
  return request.put({ url: `/client/${data.id}`, data })
}

// 客户删除
export function clientDelete(id: number) {
  return request.delete({ url: `/client/${id}` })
}

// 客户禁用
export function clientLock(id: number) {
  return request.patch({ url: `/client/${id}/lock` })
}

// 客户启用
export function clientUnlock(id: number) {
  return request.patch({ url: `/client/${id}/unlock` })
}
