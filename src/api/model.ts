

import request from '@/utils/request'

// 机型下拉选
export function modelAll() {
  return request.get({ url: '/model/all' })
}

// 机型管理列表
export function modelLists(params?: Record<string, any>) {
  return request.get({ url: '/model', params })
}

// 机型管理详情
export function modelDetail(id: number) {
  return request.get({ url: `/model/${id}` })
}

// 机型管理新增
export function modelAdd(params: Record<string, any>) {
  return request.post({ url: '/model/add', params })
}

// 机型管理编辑
export function modelEdit(data: Record<string, any>) {
  return request.put({ url: `/model/${data.id}`, data })
}

// 机型管理删除
export function modelDelete(id: number) {
  return request.post({ url: `/model/${id}` })
}
