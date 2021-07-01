import axios, { Method } from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1'

const BASE_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
}

/* export const connection = async (data: object, method: Method) =>
    (
        await axios({
            method,
            url: BASE_URL,
            data: data,
            headers: BASE_HEADER,
        })
    ).data
 */

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
}
