import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'
import { IUserGroup } from '../userGroup'

export interface IUser {
    _id: string
    username: string
    password: string
    name: string
    group: IUserGroup
    isActive: boolean
    lastAccessDate: Date
    lastIpAccess: Date
    created: Date
    updated: Date
    userCreated: IUser
    userModified: IUser
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
    isLogged: boolean
    login: () => Promise<boolean>
    logout: () => Promise<boolean>
    user: Partial<IUser>
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
        user: {},
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
        async login() {
            const user = await connection.login({
                username: 'admin',
                password: 'asd123',
            })

            console.log('login: ', user)

            if (user) {
                this.user = user
                this.isLogged = true
            } else {
                this.isLogged = false
            }

            return true
        },
        async logout() {
            const user = await connection.logout()

            console.log('login ', user)

            return true
        },
    })

export default createContext(UserStore())
