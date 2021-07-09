import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
import { IUser } from '../user'
import { IInvoiceAccount } from '../invoiceAccount'

export interface IPointOfSale {
    _id: string
    name: string
    address: string
    defaultInvoiceAccount: IInvoiceAccount
    users: Partial<IUser>[]
}

export interface IPointOfSaleStore {
    list: Partial<IPointOfSale>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IPointOfSale | {} | any
    createUpdate: (data: Partial<IPointOfSale>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const PointOfSaleStore = () =>
    observable<IPointOfSaleStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: IPointOfSale[] = await connection.pointOfSale(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IPointOfSale[] = await connection.pointOfSale(
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

            const data = await connection.pointOfSale(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.pointOfSale({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(PointOfSaleStore())
