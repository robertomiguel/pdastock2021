import { createContext } from 'react'
import { observable } from 'mobx'

export enum UserRole {
    GOD = 1000,
    ADMIN = 2,
    OPERATOR = 1,
    JUNIOR = 0,
}

export interface IUser {
    id: string
    name: string
    email: string
    address: string
    phone: string
    role: UserRole
    create: Date
}

export interface ILoginCredential {
    email: string
    password: string
    storeSession: boolean
}

export interface IUserStore {
    isLogged: boolean
    user: Partial<IUser>
    login: (credential: ILoginCredential) => Promise<boolean>
    logout: () => Promise<boolean>
    register: (user: Partial<IUser>) => Promise<boolean>
    update: (user: Partial<IUser>) => Promise<boolean>
}

const UserStore = () =>
    observable<IUserStore>({
        isLogged: true,
        user: { role: 1 },
        async login(credentials: ILoginCredential) {
            return true
        },
        async logout() {
            return true
        },
        async register() {
            return true
        },
        async update() {
            return true
        },
    })

export default createContext(UserStore())
