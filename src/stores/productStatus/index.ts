import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
export interface IProductStatus {
    _id: string
    name: string
    isAvailableForSale: boolean
    isRMA: boolean
    isSold: boolean
    isInitialStatus: boolean
    isDeleted: boolean
}

export interface IProductStore {
    list: Partial<IProductStatus>[]
    getList: (filter?: Partial<IProductStatus>) => Promise<IProductStatus[]>
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
        sort: { field: 'name', sorted: 1 }, // order default
        async getList(filter) {
            this.isLoading = true
            const list: IProductStatus[] = await connection.productStatus(
                {
                    filter: filter ? filter : {},
                    sort: { [this.sort.field]: this.sort.sorted },
                },
                'POST'
            )
            console.log('product status ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return list
        },
        async getById(id) {
            this.isLoading = true
            const data: IProductStatus[] = await connection.productStatus(
                {
                    filter: { _id: id },
                    limit: 1,
                },
                'POST'
            )
            if (data) this.item = data[0]
            this.isLoading = false
            return true
        },
        async createUpdate(value) {
            const q = {
                filter: this.item._id ? { _id: this.item._id } : {},
                data: value,
            }
            console.log('se envía q: ', q)

            const data = await connection.productStatus(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.productStatus({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(ProductStatusStore())
