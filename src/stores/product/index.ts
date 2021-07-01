import { createContext } from 'react'
import { observable } from 'mobx'
import { TablePaginationConfig } from 'antd'
import { connection } from '../connection'

export interface IProductStatus {
    _id: string
    name: string
}

export interface IProduct {
    _id: string
    name: string
    model: string
    ncm: string
    price: number
    code: string
    status: IProductStatus
    category: string
    supplier: string
    storage: string
    deleted: boolean
    created: Date
    updated: Date
    userCreated: string
    userModified: string
    details: {
        imei: string
        color: string
        capacity: string
    }
}

export interface IPaginateData {
    docs: any[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}

export interface IPaginationTable {
    total: number
    current: number
    pageSize: number
}

export interface IProductStore {
    list: Partial<IProduct>[]
    pagination: TablePaginationConfig
    select: string
    populate: string // Temporal, mover al back
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
        populate: 'status',
        isLoading: false,
        openEditor: false,
        item: {},
        async getList() {
            const list: IPaginateData = await connection.product(
                {
                    filter: this.filter,
                    options: {
                        limit: this.pagination.pageSize,
                        page: this.pagination.current,
                        select: this.select,
                        populate: this.populate,
                        sort: { [this.sort.field]: this.sort.sorted },
                    },
                },
                'POST'
            )
            console.log('Lista: ', list)
            this.pagination.total = list.totalDocs
            this.list = list.docs
            return true
        },
        async getById(id) {
            const data: IPaginateData = await connection.product(
                {
                    filter: { _id: id },
                    options: {
                        limit: 1,
                        populate: this.populate,
                    },
                },
                'POST'
            )

            if (data.docs.length > 0) this.item = data.docs[0]

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
