

export interface ICustomer {
    // base
    id: string
    lastname: string
    firstname: string
    email: string
    phoneNumber: string
    address: string
    city: string
    country: string
    // fiscal
    customerType: string
    fiscalType: string // Cond. Fiscal
    documentType: string
    documentNumber: string
    fantasyName: string
    // General
    delete: boolean
    create: Date
    modify: Date
    userCreate: string
    userModify: string
}

export const Customer = () => {
    return <div>
    </div>
}