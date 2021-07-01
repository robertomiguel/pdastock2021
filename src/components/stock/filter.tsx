import { Form, Input, Button, FormInstance, DatePicker } from 'antd'
import { memo, useContext, useRef } from 'react'
import _, { pickBy } from 'lodash'
import ProductStore from '../../stores/product'

export const FilterForm = memo(() => {
    const prodStore = useContext(ProductStore)
    const filterRef = useRef<FormInstance>(null)

    const getList = async () => {
        prodStore.isLoading = true
        await prodStore.getList()
        prodStore.isLoading = false
    }

    const { RangePicker } = DatePicker

    return (
        <Form
            ref={filterRef}
            layout="inline"
            onKeyPress={(k) => {
                if (k.code === 'Enter') filterRef.current?.submit()
            }}
            initialValues={prodStore.filter}
            onReset={async () => {
                prodStore.pagination.current = 1
                prodStore.filter = {}
                await getList()
            }}
            onFinish={async (value) => {
                console.log('valores de filtro: ', value)

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
                        else if (type === 'date') {
                            const dateFrom = v[0]
                            const dateTo = v[1]
                            result[key.trim()] = {
                                $gte: dateFrom,
                                $lte: dateTo,
                            }
                        } else result[key.trim()] = { $regex: v, $options: 'i' }
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
            <Form.Item label="Modelo" name="model.string">
                <Input allowClear />
            </Form.Item>
            <Form.Item label="Estado" name="state.string">
                <Input allowClear />
            </Form.Item>
            <Form.Item label="IMEI" name="details.imei.string">
                <Input allowClear />
            </Form.Item>
            <Form.Item label="Precio" name="price.number">
                <Input allowClear />
            </Form.Item>
            <Form.Item label="Ingreso" name="created.date">
                <RangePicker />
            </Form.Item>

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
