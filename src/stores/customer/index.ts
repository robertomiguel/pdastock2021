import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
import {IDocumentType} from '../documentType'
import {IFiscalCategoryType} from '../fiscalCategory'
import {IUser} from '../user'

export interface ICustomer {
    _id: string
    firstname: string
    lastname: string
    fullname: string
    address: string
    phone: string
    email: string
    isOrganization: boolean
    organizationName: string
    documentType: IDocumentType
    documentNumber: string
    fiscalCategory: IFiscalCategoryType
    created: Date
    updated: Date
    userCreated: IUser
    userModified: IUser
}

export interface ICustomerStore {
    list: Partial<ICustomer>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: ICustomer | {} | any
    createUpdate: (data: Partial<ICustomer>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const CustomerStore = () =>
    observable<ICustomerStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: ICustomer[] = await connection.customer(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: ICustomer[] = await connection.customer(
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

            const data = await connection.customer(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.customer({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(CustomerStore())
