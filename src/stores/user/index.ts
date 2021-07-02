import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface IUser {
    _id: string
    username: string
    password: string
    name: string
    group: string,
    isActive: boolean
    lastAccessDate: Date
    lastIpAccess: Date
    created: Date
    updated: Date
    userCreated: string
    userModified: string
}

export interface IUserStore {
    list: Partial<IUser>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IUser | {} | any
    createUpdate: (data: Partial<IUser>) => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
    openEditor: boolean
    sort: { field: string; sorted: number }
    isLogged: true
}

const UserStore = () =>
    observable<IUserStore>({
        list: [],
        isLoading: false,
        item: {},
        openEditor: false,
        sort: { field: 'name', sorted: 1 }, // order default
        isLogged: true,
        async getList() {
            this.isLoading = true
            const list: IUser[] = await connection.user(
                { filter: {}, sort: { [this.sort.field]: this.sort.sorted } },
                'POST'
            )
            console.log('user ', list, ' orden ', this.sort)
            this.isLoading = false
            this.list = list
            return true
        },
        async getById(id) {
            const data: IUser[] = await connection.user(
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

            const data = await connection.user(q, 'PUT')
            return data.ok === 1 ? true : false
        },
        async deleteById(id) {
            const data = await connection.user({ _id: id }, 'DELETE')
            return data.ok === 1 ? true : false
        },
    })

export default createContext(UserStore())
