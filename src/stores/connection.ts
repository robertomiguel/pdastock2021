import axios, { Method } from 'axios'

axios.defaults.withCredentials = true

const API_VERSION = '/api/v1'

const BASE_URL = 'http://localhost:3001'

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
                url: `${BASE_URL + API_VERSION}/product`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    productStatus: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/productStatus`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    productCategory: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/productCategory`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    productStorage: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/productStorage`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    user: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/user`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    userGroup: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/userGroup`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    login: async (data: object) =>
        (
            await axios({
                method: 'POST',
                url: `${BASE_URL}/login`,
                data,
                headers: BASE_HEADER,
            })
        ).data,
    logout: async () =>
        (
            await axios({
                method: 'DELETE',
                url: `${BASE_URL}/login`,
                headers: BASE_HEADER,
            })
        ).data,
    currency: async (data: object, method: Method) =>
        (
            await axios({
                method,
                url: `${BASE_URL + API_VERSION}/currency`,
                data: data,
                headers: BASE_HEADER,
            })
        ).data,
    documentType: async (data: object, method: Method) =>
    (
        await axios({
            method,
            url: `${BASE_URL + API_VERSION}/documentType`,
            data: data,
            headers: BASE_HEADER,
        })
    ).data,
    fiscalCategory: async (data: object, method: Method) =>
    (
        await axios({
            method,
            url: `${BASE_URL + API_VERSION}/fiscalCategory`,
            data: data,
            headers: BASE_HEADER,
        })
    ).data,
}
