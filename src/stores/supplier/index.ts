import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface ISupplier {
    _id: string
    name: string
    created: Date
    updated: Date
    userCreated: { name: string }
    userModified: { name: string }
}

export interface ISupplierStore {
    list: Partial<ISupplier>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: ISupplier | {} | any
    createUpdate: (data: Partial<ISupplier>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const SupplierStore = () =>
    observable<ISupplierStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: ISupplier[] = await connection.supplier(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: ISupplier[] = await connection.supplier(
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
            const q = {
                filter: this.item._id ? { _id: this.item._id } : {},
                data: value,
            }
            console.log('se envía q: ', q)

            const data = await connection.supplier(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.supplier({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(SupplierStore())
