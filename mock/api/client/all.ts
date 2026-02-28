import { eventHandler } from 'h3'

import { verifyAccessToken } from '~/utils/jwt-utils'
import { sleep, unAuthorizedResponse, useResponseSuccess } from '~/utils/response'

import { mockClients } from './list'

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event)
    if (!userinfo) {
        return unAuthorizedResponse(event)
    }

    await sleep(200)

    const allClients = mockClients.map((item) => ({
        id: item.id,
        clientName: item.clientName,
        clientCode: item.clientCode
    }))

    return useResponseSuccess(allClients)
})
