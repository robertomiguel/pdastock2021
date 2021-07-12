import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect } from 'react'
import InvoiceAccountStore from 'stores/invoiceAccount'

export const InvoiceAccountSelect = observer(() => {
    const componentStore = useContext(InvoiceAccountStore)

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
