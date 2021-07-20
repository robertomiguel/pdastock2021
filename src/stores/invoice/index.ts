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
import { IProduct } from 'stores/product'
import { Moment } from 'moment'
export interface ICustomerInvoice {
    _id: string
    name: string
    fiscalCategory: string
    documentType: string
    documentNumber: number
    address: string
}

export interface ICurrencyInvoice {
    name: string
    symbol: string
    rate: number
}

export interface IPaymentInvoice {
    paymentMethod: IPaymentMethod
    amount: number
    currency: ICurrencyInvoice
}

export interface IConceptInvoice {
    conceptType: IConceptType
    detail: string
    amount: number
    currency: {
        symbol: string
        rate: number
    }
    product: IProduct
}

export interface IInvoice {
    _id: string
    number: number
    invoiceType: IInvoiceType
    customer: ICustomerInvoice
    status: IInvoiceStatus
    date: Moment
    pointOfSale: IPointOfSale
    invoiceAccount: IInvoiceAccount
    currency: ICurrencyInvoice
    totalAmount: number
    pendingAmount: number
    payAmount: number
    payment: IPaymentInvoice[]
    concept: IConceptInvoice[]
    created: Date
    updated: Date
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
