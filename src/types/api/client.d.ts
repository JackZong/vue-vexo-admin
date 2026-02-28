interface ClientItem {
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

interface ClientForm {
    id?: string
    clientName: string
    clientCode: string
    contactPerson: string
    contactNumber: string
    timeZone: string
}

interface ClientOption {
    id: string
    clientName: string
    clientCode: string
}
