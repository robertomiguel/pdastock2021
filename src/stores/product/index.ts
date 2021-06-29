import { createContext } from 'react'
import { observable } from 'mobx'
import axios from 'axios'
import { TablePaginationConfig } from 'antd'

const BASE_URL = 'http://localhost:3001/api/v1/product'

export interface IProductStatus {
    _id: string
    name: string
}

export interface IProduct {
    _id: string
    name: string
    model: string
    ncm: string
    created: Date
    updated: Date
    price: number
    code: string
    status: IProductStatus
    category: string
    supplier: string
    storage: string
    deleted: boolean
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
            const list: IPaginateData = (
                await axios({
                    method: 'POST',
                    url: BASE_URL,
                    data: {
                        filter: this.filter,
                        options: {
                            limit: this.pagination.pageSize,
                            page: this.pagination.current,
                            select: this.select,
                            populate: this.populate,
                            sort: { [this.sort.field]: this.sort.sorted },
                        },
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                    },
                })
            ).data
            console.log(list)
            this.pagination.total = list.totalDocs
            this.list = list.docs
            return true
        },
        async getById(id) {
            const data: IPaginateData = (
                await axios({
                    method: 'POST',
                    url: BASE_URL,
                    data: {
                        filter: { _id: id },
                        options: {
                            limit: 1,
                            populate: this.populate,
                        },
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                    },
                })
            ).data

            if (data.docs.length > 0) this.item = data.docs[0]

            return true
        },
    })

export default createContext(ProductStore())
