import { faker } from '@faker-js/faker'
import { eventHandler, getQuery } from 'h3'

import { verifyAccessToken } from '~/utils/jwt-utils'
import { sleep, unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response'

export interface ClientItem {
    id: string
    clientName: string
    clientCode: string
    contactPerson: string
    contactNumber: string
    timeZone: string
    status: string
    gmtCreate: string
    gmtModified: string
}

function generateMockClients(count: number): ClientItem[] {
    const list: ClientItem[] = []
    for (let i = 0; i < count; i++) {
        list.push({
            id: faker.string.uuid(),
            clientName: faker.company.name(),
            clientCode: `CLT-${faker.date.recent().toISOString().slice(0, 10).replace(/-/g, '')}-${String(i + 1).padStart(3, '0')}`,
            contactPerson: faker.person.fullName(),
            contactNumber: faker.phone.number(),
            timeZone: faker.helpers.arrayElement([
                'Asia/Shanghai',
                'America/New_York',
                'Europe/London',
                'Asia/Tokyo',
                'Asia/Seoul'
            ]),
            status: faker.helpers.arrayElement(['0', '1']),
            gmtCreate: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
            gmtModified: faker.date.recent().toISOString().slice(0, 19).replace('T', ' ')
        })
    }
    return list
}

export const mockClients = generateMockClients(50)

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event)
    if (!userinfo) {
        return unAuthorizedResponse(event)
    }

    await sleep(300)

    const { page, pageSize, clientName } = getQuery(event)

    let filtered = [...mockClients]

    // 按客户名称筛选
    if (clientName && typeof clientName === 'string') {
        filtered = filtered.filter((item) =>
            item.clientName.toLowerCase().includes(clientName.toLowerCase())
        )
    }

    const pageRaw = Array.isArray(page) ? page[0] : page
    const pageSizeRaw = Array.isArray(pageSize) ? pageSize[0] : pageSize
    const pageNumber = Math.max(1, Number.parseInt(String(pageRaw ?? '1'), 10) || 1)
    const pageSizeNumber = Math.min(
        100,
        Math.max(1, Number.parseInt(String(pageSizeRaw ?? '10'), 10) || 10)
    )

    return usePageResponseSuccess(String(pageNumber), String(pageSizeNumber), filtered)
})
