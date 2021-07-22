import { Button, DatePicker, Form, Input, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect } from 'react'
import ProductStore, { IProductStore } from 'stores/product'
import ProductCategory, { IProductCategoryStore } from 'stores/productCategory'
import moment from 'moment'

export const FilterForm = observer(() => {
    const componentStore = useContext<IProductStore>(ProductStore)
    const prodCategoryStore = useContext<IProductCategoryStore>(ProductCategory)
    const formItemStyle = { width: '20%', display: 'inline-block' }
    const { Option } = Select

    const getStatusList = useCallback(async () => {
        await prodCategoryStore.getList()
    }, [prodCategoryStore])

    useEffect(() => {
        getStatusList()
    }, [getStatusList])

    return (
        <Form
            layout="vertical"
            onFinish={async (value) => {
                const currentStatusFilter = componentStore.filter.status
                const filter = { status: currentStatusFilter, ...value }
                if (value.nameModel) {
                    const filterNameModel = {
                        $or: [
                            {
                                name: {
                                    $regex: value.nameModel,
                                    $options: 'i',
                                },
                            },
                            {
                                model: {
                                    $regex: value.nameModel,
                                    $options: 'i',
                                },
                            },
                        ],
                    }
                    Object.assign(
                        filter,
                        { nameModel: undefined },
                        filterNameModel
                    )
                }
                if (value.created) {
                    Object.assign(filter, {created: {
                        $gte: moment(value.created).format('YYYY-MM-DD 00:00:00'),
                        $lte: moment(value.created).format('YYYY-MM-DD 23:59:59'),
                    }})
                }
                await componentStore.getList(filter)
                componentStore.filter = filter
            }}
            onReset={async () => {
                await componentStore.getList({
                    status: componentStore.filter.status,
                })
            }}
        >
            <div
                style={{
                    marginTop: 0,
                    paddingTop: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                }}
            >
                <Form.Item name="code" label="Código" style={formItemStyle}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="nameModel"
                    label="Nombre / Modelo"
                    style={formItemStyle}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Categoría"
                    style={{ width: '30%', display: 'inline-block' }}
                >
                    <Select loading={prodCategoryStore.isLoading}>
                        {prodCategoryStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="created" label="Ingreso" style={formItemStyle}>
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
            </div>
            <div
                style={{ width: '100%', display: 'block', textAlign: 'right' }}
            >
                <Form.Item style={{ margin: 0, padding: 0 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={componentStore.isLoading}
                    >
                        Aplicar
                    </Button>
                    <Button
                        type="link"
                        htmlType="reset"
                        loading={componentStore.isLoading}
                    >
                        Limpiar
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
})
