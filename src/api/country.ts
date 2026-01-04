

import request from '@/utils/request'

// 国家和地区下拉选
export function countryAll() {
  return request.get({ url: '/country/all' })
}

// 国家和地区列表
export function countryLists(params?: Record<string, any>) {
  return request.get({ url: '/country', params })
}

// 国家和地区详情
export function countryDetail(id: number) {
  return request.get({ url: `/country/${id}` })
}

// 国家和地区新增
export function countryAdd(params: Record<string, any>) {
  return request.post({ url: '/country/add', params })
}

// 国家和地区编辑
export function countryEdit(data: Record<string, any>) {
  return request.put({ url: `/country/${data.id}`, data })
}

// 国家和地区删除
export function countryDelete(id: number) {
  return request.post({ url: `/country/${id}` })
}
