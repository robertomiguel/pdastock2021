import { Form, Input, Button, FormInstance } from 'antd'
import { memo, useContext, useRef } from 'react'
import _, { pickBy } from 'lodash'
import ProductStore from '../../stores/product'
import { generateId } from '../common/generateId'

export const FilterForm = memo(() => {
    const prodStore = useContext(ProductStore)
    const filterRef = useRef<FormInstance>(null)

    const getList = async () => {
        prodStore.isLoading = true
        await prodStore.getList()
        prodStore.isLoading = false
    }

    const filterData = [
        {
            name: 'model.string',
            label: 'Modelo',
        },
        {
            name: 'state.string',
            label: 'Estado',
        },
        {
            name: 'details.imei.string',
            label: 'IEMI',
        },
        {
            name: 'price.number',
            label: 'Precio',
        },
    ]

    return (
        <Form
            ref={filterRef}
            layout="inline"
            onKeyPress={(k) => {
                if (k.code === 'Enter') filterRef.current?.submit()
            }}
            onReset={async () => {
                prodStore.pagination.current = 1
                prodStore.filter = {}
                await getList()
            }}
            onFinish={async (value) => {
                const filter = pickBy(
                    pickBy(value, (v) => v !== undefined),
                    (v) => v !== ''
                )
                const r = _.reduce(
                    filter,
                    (result: any, v, k) => {
                        const pos = k.lastIndexOf('.')
                        const key = k.substr(0, pos)
                        const type = k.substr(pos + 1)
                        if (type === 'number') result[key.trim()] = v
                        else result[key.trim()] = { $regex: v, $options: 'i' }
                        return result
                    },
                    {}
                )

                console.log('valid ', r)
                prodStore.filter = r
                prodStore.pagination.current = 1
                await getList()
            }}
        >
            {filterData.map((filter) => (
                <Form.Item
                    key={generateId()}
                    label={filter.label}
                    name={filter.name}
                >
                    <Input allowClear />
                </Form.Item>
            ))}

            <Form.Item>
                <Button loading={prodStore.isLoading} htmlType="submit">
                    Aplicar
                </Button>
                <Button loading={prodStore.isLoading} htmlType="reset">
                    Borrar
                </Button>
            </Form.Item>
        </Form>
    )
})
