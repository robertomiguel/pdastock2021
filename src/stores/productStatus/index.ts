import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
export interface IProductStatus {
    _id: string
    name: string
}

export interface IProductStore {
    list: Partial<IProductStatus>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IProductStatus | {} | any
}

const ProductStatusStore = () =>
    observable<IProductStore>({
        list: [],
        isLoading: false,
        item: {},
        async getList() {
            this.isLoading = true
            const list: IProductStatus[] = await connection.productStatus(
                {},
                'POST'
            )
            console.log('product status ', list)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            return true
        },
    })

export default createContext(ProductStatusStore())
