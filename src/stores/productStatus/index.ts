import { createContext } from 'react'
import { observable } from 'mobx'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1/productStatus'
const BASE_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

export interface IProductStatus {
    _id: string
    name: string
}

export interface IProductStore {
    list: Partial<IProductStatus>[]
    getList: () => Promise<boolean>
    getById: (id: string) => Promise<boolean>
    isLoading: boolean
    item: IProductStatus | {} | any
}

const ProductStatusStore = () =>
    observable<IProductStore>({
        list: [],
        isLoading: false,
        item: {},
        async getList() {
            const list: IProductStatus[] = (
                await axios({
                    method: 'POST',
                    url: BASE_URL,
                    data: {},
                    headers: BASE_HEADER,
                })
            ).data
            console.log('product status ', list)
            this.list = list
            return true
        },
        async getById(id) {
            return true
        },
    })

export default createContext(ProductStatusStore())
