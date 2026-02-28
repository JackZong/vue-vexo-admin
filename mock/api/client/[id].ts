import { eventHandler, getRouterParam } from 'h3'

import { verifyAccessToken } from '~/utils/jwt-utils'
import { sleep, unAuthorizedResponse, useResponseError, useResponseSuccess } from '~/utils/response'

import { mockClients } from './list'

export default eventHandler(async (event) => {
    const userinfo = verifyAccessToken(event)
    if (!userinfo) {
        return unAuthorizedResponse(event)
    }

    await sleep(300)

    const id = getRouterParam(event, 'id')
    const client = mockClients.find((item) => item.id === id)

    if (!client) {
        return useResponseError('Client not found')
    }

    return useResponseSuccess(client)
})
