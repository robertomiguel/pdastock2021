import { createContext } from 'react'
import { observable } from 'mobx'
import { TablePaginationConfig } from 'antd'
import { connection } from '../connection'
import { IUser } from 'stores/user'
import { ICurrency } from 'stores/currency'
import { IProductCategory } from 'stores/productCategory'
import { ISupplier } from 'stores/supplier'
export interface IProductStatus {
    _id: string
    name: string
}
export interface IProduct {
    _id: string
    name: string
    model: string
    ncm: string
    price: {
        buyRate: number
        buy: number
        public: number
        special: number
    }
    currency: ICurrency
    code: string
    status: IProductStatus
    category: IProductCategory
    supplier: ISupplier
    storage: string
    deleted: boolean
    created: Date
    updated: Date
    userCreated: IUser
    userModified: IUser
    details: {
        imei: string
        color: string
        capacity: string
    }
}

export interface IProductStore {
    list: Partial<IProduct>[]
    pagination: TablePaginationConfig
    select: string
    sort: { field: string; sorted: number }
    filter: any
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    createUpdate: (data: Partial<IProduct>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    isLoading: boolean
    openEditor: boolean
    item: IProduct | {} | any
}

interface IGetList {
    docs: IProduct[]
    totalDocs: number
}

const ProductStore = () =>
    observable<IProductStore>({
        list: [],
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        },
        filter: {},
        sort: { field: 'name', sorted: 1 },
        select: '',
        isLoading: false,
        openEditor: false,
        item: {},
        async getList() {
            this.isLoading = true
            const list: IGetList = await connection.product(
                {
                    filter: this.filter,
                    limit: this.pagination.pageSize,
                    page: this.pagination.current,
                    select: this.select,
                    sort: { [this.sort.field]: this.sort.sorted },
                },
                'POST'
            )
            this.pagination.total = list.totalDocs
            this.list = list.docs
            this.isLoading = false
            return true
        },
        async getById(id) {
            this.isLoading = true
            const data: IGetList = await connection.product(
                {
                    filter: { _id: id },
                    limit: 1,
                    page: 1,
                    select: '',
                    sort: { [this.sort.field]: this.sort.sorted },
                },
                'POST'
            )
            if (data.docs) this.item = data.docs[0]
            this.isLoading = false
            return true
        },
        async createUpdate(data: Partial<IProduct>) {
            const res = await connection.product(
                { filter: { _id: this.item._id }, data },
                'PUT'
            )
            console.log('res: ', res)
            return true
        },
        async deleteById(id) {
            const res = await connection.product({ id }, 'DELETE')
            console.log('res: ', res)
            return true
        },
    })

export default createContext(ProductStore())
