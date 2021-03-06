import { Select } from 'antd'
import { ISelectProp } from 'common/types'
import { useDelay } from 'common/useDelay'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useCallback, useContext } from 'react'
import CustomerStore, { ICustomerStore } from 'stores/customer'

export const CustomerSelect = observer((props: ISelectProp) => {
    const componentStore = useContext<ICustomerStore>(CustomerStore)
    const { Option } = Select

    const getDefault = useCallback(async () => {
        await componentStore.getById(props.defaultValue)
        componentStore.list = [componentStore.item]
    }, [componentStore, props.defaultValue])

    useEffect(() => {
        if (props.defaultValue) {
            getDefault()
        }
    }, [props.defaultValue, getDefault])

    const getList = useCallback(
        async (value) => {
            componentStore.filter = {
                $or: [
                    {
                        firstname: {
                            $regex: value,
                            $options: 'i',
                        },
                    },
                    {
                        lastname: {
                            $regex: value,
                            $options: 'i',
                        },
                    },
                    {
                        organizationName: {
                            $regex: value,
                            $options: 'i',
                        },
                    },
                ],
            }
            await componentStore.getList()
        },
        [componentStore]
    )

    const runSearch = useDelay(async (value: string) => {
        if (value && value.length > 2 && !componentStore.isLoading)
            await getList(value)
    })

    return (
        <Select
            loading={componentStore.isLoading}
            showSearch
            clearIcon
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={runSearch}
            defaultValue={props.defaultValue}
            onChange={(value: string) => {
                props.onChange(value)
            }}
        >
            {componentStore.list.map((customer) => (
                <Option value={`${customer._id}`} key={customer._id}>
                    {customer.fullname}
                </Option>
            ))}
        </Select>
    )
})
