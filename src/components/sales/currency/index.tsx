import { Select } from 'antd'
import { ISelectProp } from 'common/types'
import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect } from 'react'
import CurrencyStore from 'stores/currency'

export const CurrencySelect = observer((props: ISelectProp) => {
    const componentStore = useContext(CurrencyStore)

    const { Option } = Select

    const getList = useCallback(async () => {
        await componentStore.getList()
    }, [componentStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <Select
            onChange={(value: string) => {
                console.log('currency: ', value)

                props.onChange(value)
            }}
        >
            {componentStore.list.map((value: any) => (
                <Option key={value._id} value={value}>
                    {value.name}
                </Option>
            ))}
        </Select>
    )
})
