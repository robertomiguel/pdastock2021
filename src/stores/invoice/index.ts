import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
import { IUser } from '../user'
import { IInvoiceType } from '../invoiceType'
import { IInvoiceStatus } from '../invoiceStatus'
import { IPointOfSale } from '../pointOfSale'
import { IInvoiceAccount } from '../invoiceAccount'
import { IPaymentMethod } from '../paymentMethod'
import { IConceptType } from '../conceptType'

export interface IInvoice {
    _id: string
    number: number
    invoiceType: IInvoiceType
    customer: {
        _id: string
        name: string
        fiscalCategory: string
        documentType: string
        documentNumber: number
        address: string
    }
    status: IInvoiceStatus
    date: Date
    pointOfSale: IPointOfSale
    invoiceAccount: IInvoiceAccount
    currency: {
        name: string
        symbol: string
        rate: number
    }
    totalAmount: number
    pendingAmount: number
    payAmount: number
    payment: {
        paymentMethod: IPaymentMethod
        amount: number
        currency: {
            name: string
            symbol: string
            rate: number
        }
    }[]

    concept: {
        conceptType: IConceptType
        detail: string
        amount: number
    }[]

    created: { type: Date }
    updated: { type: Date }
    userCreated: IUser
    userModified: IUser
}

export interface IInvoiceStore {
    list: Partial<IInvoice>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IInvoice | {} | any
    createUpdate: (data: Partial<IInvoice>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const InvoiceStore = () =>
    observable<IInvoiceStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: IInvoice[] = await connection.invoice(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IInvoice[] = await connection.invoice(
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

            const data = await connection.invoice(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.invoice({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(InvoiceStore())
