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
    checkSession: async () =>
        (
            await axios({
                method: 'POST',
                url: `${BASE_URL}/login`,
                headers: BASE_HEADER,
            })
        ).data,
    product: (data: object, method: Method) =>
        getData(data, method, '/product'),
    productStatus: (data: object, method: Method) =>
        getData(data, method, '/productStatus'),
    productCategory: (data: object, method: Method) =>
        getData(data, method, '/productCategory'),
    productStorage: (data: object, method: Method) =>
        getData(data, method, '/productStorage'),
    user: (data: object, method: Method) => getData(data, method, '/user'),
    userGroup: (data: object, method: Method) =>
        getData(data, method, '/userGroup'),
    currency: (data: object, method: Method) =>
        getData(data, method, '/currency'),
    documentType: (data: object, method: Method) =>
        getData(data, method, '/documentType'),
    fiscalCategory: (data: object, method: Method) =>
        getData(data, method, '/fiscalCategory'),
    supplier: (data: object, method: Method) =>
        getData(data, method, '/supplier'),
    pointOfSale: (data: object, method: Method) =>
        getData(data, method, '/pointOfSale'),
    invoiceType: (data: object, method: Method) =>
        getData(data, method, '/invoiceType'),
    paymentMethod: (data: object, method: Method) =>
        getData(data, method, '/paymentMethod'),
    conceptType: (data: object, method: Method) =>
        getData(data, method, '/conceptType'),
    invoiceStatus: (data: object, method: Method) =>
        getData(data, method, '/invoiceStatus'),
    customer: (data: object, method: Method) =>
        getData(data, method, '/customer'),
    invoiceAccount: (data: object, method: Method) =>
        getData(data, method, '/invoiceAccount'),
    invoice: (data: object, method: Method) =>
        getData(data, method, '/invoice'),
}
