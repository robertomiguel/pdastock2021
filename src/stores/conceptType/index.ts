import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface IConceptType {
    _id: string
    name: string
    isCredit: boolean
    detail: string
    created: Date
}

export interface IConceptTypeStore {
    list: Partial<IConceptType>[]
    getList: (filter?: Partial<IConceptType>) => Promise<IConceptType[]>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IConceptType | {} | any
    createUpdate: (data: Partial<IConceptType>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
}

const ConceptTypeStore = () =>
    observable<IConceptTypeStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        async getList(filter) {
            this.isLoading = true
            const list: IConceptType[] = await connection.conceptType(
                { filter: filter ? filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            this.isLoading = false
            this.list = list
            return list
        },
        async getById(id) {
            const data: IConceptType[] = await connection.conceptType(
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

            const data = await connection.conceptType(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.conceptType({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(ConceptTypeStore())
