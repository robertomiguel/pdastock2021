import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import ProductStatusStore from '../../../stores/productStatus'

export const SelectProductStatus = observer(() => {
    const prodStatusStore = useContext(ProductStatusStore)

    useEffect(() => {
        prodStatusStore.getList()
    }, [prodStatusStore])

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
