import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect } from 'react'
import CurrencyStore from 'stores/currency'

export const CurrencySelect = observer(() => {
    const componentStore = useContext(CurrencyStore)

    const { Option } = Select

    const getList = useCallback(async () => {
        await componentStore.getList()
    }, [componentStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <Select>
            {componentStore.list.map((value: any) => (
                <Option key={value._id} value={value._id}>
                    {value.name}
                </Option>
            ))}
        </Select>
    )
})
