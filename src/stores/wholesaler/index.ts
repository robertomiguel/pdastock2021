import { createContext } from 'react'
import { observable } from 'mobx'
import { TablePaginationConfig } from 'antd'
import { connection } from '../connection'
import { IUser } from 'stores/user'
import { IConceptType } from 'stores/conceptType'

export interface IWholesaler {
    _id: string
    customer: IUser
    isActive: boolean
    created: Date
    updated: Date
    userCreated: IUser
    userModified: IUser
}

export interface IWholesalerStore {
    list: Partial<IWholesaler>[]
    pagination: TablePaginationConfig
    select: string
    sort: { field: string; sorted: number }
    filter: any
    getList: (filter?: any) => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    createUpdate: (data: Partial<IWholesaler>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    isLoading: boolean
    openEditor: boolean
    item: IWholesaler | {} | any
    concept: IConceptType | {} | any
}

interface IGetList {
    docs: IWholesaler[]
    totalDocs: number
}

const ProductStore = () =>
    observable<IWholesalerStore>({
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
        concept: {},
        async getList(filter) {
            this.isLoading = true
            const list: IGetList = await connection.wholesaler(
                {
                    filter: filter ? filter : {},
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
            const data: IGetList = await connection.wholesaler(
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
        async createUpdate(data: Partial<IWholesaler>) {
            const res = await connection.wholesaler(
                { filter: { _id: this.item._id }, data },
                'PUT'
            )
            console.log('res: ', res)
            return true
        },
        async deleteById(id) {
            const res = await connection.wholesaler({ _id: id }, 'DELETE')
            console.log('res: ', res)
            return true
        },
    })

export default createContext(ProductStore())
