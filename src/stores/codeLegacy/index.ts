import { createContext } from 'react'
import { observable } from 'mobx'
import { connection } from '../connection'

export interface ICodeLegacy {
    _id: string
    code: string
    name: string
    model: string
    color: string
}

export interface ICodeLegacyStore {
    getByCode: (code: string) => Promise<ICodeLegacy>
    isLoading: boolean
}

const CodeLegacyStore = () =>
    observable<ICodeLegacyStore>({
        isLoading: false,
        async getByCode(code) {
            const data: ICodeLegacy = await connection.codeLegacy(
                {
                    code
                },
                'POST'
            )
            return data
        },
    })

export default createContext(CodeLegacyStore())
