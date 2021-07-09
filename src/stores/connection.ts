import axios, { Method } from 'axios'

axios.defaults.withCredentials = true

const API_VERSION = '/api/v1'

export const BASE_URL = 'http://localhost:3001'

const BASE_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

const getData = async (data: object, method: Method, routePath: string) =>
    (
        await axios({
            method,
            url: `${BASE_URL + API_VERSION + routePath}`,
            data: data,
            headers: BASE_HEADER,
        })
    ).data

export const connection = {
    product: async (data: object, method: Method) =>
        await getData(data, method, '/product'),
    productStatus: async (data: object, method: Method) =>
        await getData(data, method, '/productStatus'),
    productCategory: async (data: object, method: Method) =>
        await getData(data, method, '/productCategory'),
    productStorage: async (data: object, method: Method) =>
        await getData(data, method, '/productStorage'),
    user: async (data: object, method: Method) =>
        await getData(data, method, '/user'),
    userGroup: async (data: object, method: Method) =>
        await getData(data, method, '/userGroup'),
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
        await getData(data, method, '/currency'),
    documentType: async (data: object, method: Method) =>
        await getData(data, method, '/documentType'),
    fiscalCategory: async (data: object, method: Method) =>
        await getData(data, method, '/fiscalCategory'),
    supplier: async (data: object, method: Method) =>
        await getData(data, method, '/supplier'),
    checkSession: async () =>
        (
            await axios({
                method: 'POST',
                url: `${BASE_URL}/login`,
                headers: BASE_HEADER,
            })
        ).data,
    pointOfSale: async (data: object, method: Method) =>
        await getData(data, method, '/pointOfSale'),
    invoiceType: async (data: object, method: Method) =>
        await getData(data, method, '/invoiceType'),
    paymentMethod: async (data: object, method: Method) =>
        await getData(data, method, '/paymentMethod'),
    conceptType: async (data: object, method: Method) =>
        await getData(data, method, '/conceptType'),
    invoiceStatus: async (data: object, method: Method) =>
        await getData(data, method, '/invoiceStatus'),
    customer: async (data: object, method: Method) =>
        await getData(data, method, '/customer'),
    invoiceAccount: async (data: object, method: Method) =>
        await getData(data, method, '/invoiceAccount'),
}
