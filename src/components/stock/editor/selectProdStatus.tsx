import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { useContext, useEffect } from 'react'
import ProductStatusStore, { IProductStore } from 'stores/productStatus'

export const SelectProductStatus = observer(() => {
    const prodStatusStore = useContext<IProductStore>(ProductStatusStore)

    const getList = useCallback(async () => {
        prodStatusStore.list = []
        prodStatusStore.getList({ isInitialStatus: true })
    }, [prodStatusStore])

    useEffect(() => {
        getList()
    }, [getList])

    const { Option } = Select

    return (
        <Select>
            {prodStatusStore.list.map((value: any) => (
                <Option key={value._id} value={value._id}>
                    {value.name}
                </Option>
            ))}
        </Select>
    )
})
