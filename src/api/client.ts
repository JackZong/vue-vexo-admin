import request from '@/utils/request'

// 客户下拉选
export function clientAll() {
    return request.get<ClientOption[]>({ url: '/client/all' })
}

// 客户列表
export function clientLists(params?: Record<string, any>) {
    return request.get<{ items: ClientItem[]; total: number }>({ url: '/client/list', params })
}

// 客户详情
export function clientDetail(id: string) {
    return request.get<ClientItem>({ url: `/client/${id}` })
}

// 客户新增
export function clientAdd(data: ClientForm) {
    return request.post({ url: '/client', data })
}

// 客户编辑
export function clientEdit(data: ClientForm) {
    return request.put({ url: `/client/${data.id}`, data })
}

// 客户删除
export function clientDelete(id: string) {
    return request.delete({ url: `/client/${id}` })
}

// 客户禁用
export function clientLock(id: string) {
    return request.patch({ url: `/client/${id}/lock` })
}

// 客户启用
export function clientUnlock(id: string) {
    return request.patch({ url: `/client/${id}/unlock` })
}
