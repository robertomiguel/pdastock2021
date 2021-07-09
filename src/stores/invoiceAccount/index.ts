import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
import { IFiscalCategoryType } from '../fiscalCategory'

export interface IInvoiceAccount {
    _id: string
    name: string
    address: string
    fiscalCategory: IFiscalCategoryType
    cuit: string
    iibb: string
    fantasyName: string
    activityStartDate: Date
}

export interface IInvoiceAccountStore {
    list: Partial<IInvoiceAccount>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IInvoiceAccount | {} | any
    createUpdate: (data: Partial<IInvoiceAccount>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const InvoiceAccountStore = () =>
    observable<IInvoiceAccountStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: IInvoiceAccount[] = await connection.invoiceAccount(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IInvoiceAccount[] = await connection.invoiceAccount(
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

            const data = await connection.invoiceAccount(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.invoiceAccount({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(InvoiceAccountStore())
