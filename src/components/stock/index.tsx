
export interface IProduct {
    id: string
    category: string
    name: string
    details: {
        [index:string]: any
    }    
    status: string
    supplier: string
    store: string
    registerDate: Date

    // General
    delete: boolean
    create: Date
    modify: Date
    userCreate: string
    userModify: string
}

export const Stock = () => {
    return <div>
        PRODUCTOS - STOCK - RMA
    </div>
}