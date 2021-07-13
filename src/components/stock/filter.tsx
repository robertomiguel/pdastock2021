import { Form, Input, Button, FormInstance, DatePicker, Select } from 'antd'
import { CSSProperties, memo, useContext, useEffect, useRef } from 'react'
import _, { pickBy } from 'lodash'
import ProductStore from 'stores/product'
import ProductStatusStore from 'stores/productStatus'
import { useCallback } from 'react'

export const FilterForm = memo(() => {
    const componentStore = useContext(ProductStore)
    const statusStore = useContext(ProductStatusStore)
    const filterRef = useRef<FormInstance>(null)

    const { Option } = Select

    const getList = useCallback(async () => {
        await componentStore.getList()
    }, [componentStore])

    const getStatusList = useCallback(async () => {
        await statusStore.getList()
    }, [statusStore])

    useEffect(() => {
        getStatusList()
    }, [getStatusList])

    const { RangePicker } = DatePicker

    const inputStyle: CSSProperties = {
        border: '1px solid #929292',
        borderRadius: '5px',
        marginBottom: '5px',
    }

    return (
        <div style={{ padding: '1em' }}>
            <Form
                ref={filterRef}
                layout="inline"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                onKeyPress={(k) => {
                    if (k.code === 'Enter') filterRef.current?.submit()
                }}
                initialValues={componentStore.filter}
                onReset={async () => {
                    componentStore.pagination.current = 1
                    componentStore.filter = {}
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
                            }
                            if (type === 'equal') {
                                result[key.trim()] = v
                            } else
                                result[key.trim()] = {
                                    $regex: v,
                                    $options: 'i',
                                }
                            return result
                        },
                        {}
                    )

                    console.log('valid ', r)
                    componentStore.filter = r
                    componentStore.pagination.current = 1
                    await getList()
                }}
            >
                <Form.Item label="Estado" name="status.equal">
                    <Select style={{ width: 200 }}>
                        {statusStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Modelo" name="model.string">
                    <Input allowClear style={inputStyle} />
                </Form.Item>
                <Form.Item label="IMEI" name="details.imei.string">
                    <Input allowClear style={inputStyle} />
                </Form.Item>
                <Form.Item label="Precio" name="price.number">
                    <Input allowClear style={inputStyle} />
                </Form.Item>
                <Form.Item label="Ingreso" name="created.date">
                    <RangePicker style={inputStyle} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        loading={componentStore.isLoading}
                        htmlType="submit"
                    >
                        Aplicar
                    </Button>
                    <Button loading={componentStore.isLoading} htmlType="reset">
                        Borrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})
