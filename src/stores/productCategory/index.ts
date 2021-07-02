import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface IProductCategory {
    _id: string
    name: string
}

export interface IProductCategoryStore {
    list: Partial<IProductCategory>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IProductCategory | {} | any
    createUpdate: (data: Partial<IProductCategory>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const ProductCategoryStore = () =>
    observable<IProductCategoryStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 },
        async getList() {
            this.isLoading = true
            const list: IProductCategory[] = await connection.productCategory(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product category ', list)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IProductCategory[] = await connection.productCategory(
                {
                    filter: { _id: id },
                    options: {
                        limit: 1,
                    },
                },
                'POST'
            )

            if (data) this.item = data[0]
            return true
        },
        async createUpdate(value) {
            const data = await connection.productCategory(
                {
                    filter: { _id: this.item._id },
                    data: value,
                },
                'PUT'
            )
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            return true
        },
    })

export default createContext(ProductCategoryStore())
