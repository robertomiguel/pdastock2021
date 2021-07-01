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
    createUpdate: (data: Partial<IProductStatus>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const ProductStatusStore = () =>
    observable<IProductStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 },
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
        async createUpdate() {
            return true
        },
        async deleteById(id) {
            return true
        },
    })

export default createContext(ProductStatusStore())
