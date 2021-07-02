import axios, { Method } from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1'

const BASE_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
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

export const connection = {
    product: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL}/product`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    productStatus: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL}/productStatus`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    productCategory: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL}/productCategory`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
}
