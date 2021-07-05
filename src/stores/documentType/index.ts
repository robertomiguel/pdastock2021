import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface IDocumentType {
    _id: string
    name: string
    shortname: string
}

export interface IDocumentTypeStore {
    list: Partial<IDocumentType>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IDocumentType | {} | any
    createUpdate: (data: Partial<IDocumentType>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const DocumentTypeStore = () =>
    observable<IDocumentTypeStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList() {
            this.isLoading = true
            const list: IDocumentType[] = await connection.documentType(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('product storage ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IDocumentType[] = await connection.documentType(
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

            const data = await connection.documentType(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.documentType({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(DocumentTypeStore())
