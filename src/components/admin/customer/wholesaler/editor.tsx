import { Modal, InputNumber, FormInstance, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import ProductStore from 'stores/product'
import CodeLegacyStore, { ICodeLegacy } from 'stores/codeLegacy'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import ProductStatusStore from 'stores/productStatus'
import ProductCategoryStore from 'stores/productCategory'
import SupplierStore from 'stores/supplier'
import ProductStorageStore from 'stores/productStorage'
import CurrencyStore, { ICurrency } from 'stores/currency'
import _ from 'lodash'
import { useCallback } from 'react'

export const EditorForm = observer(() => {
    const componentStore = useContext(ProductStore)
    const prodStatusStore = useContext(ProductStatusStore)
    const productCategoryStore = useContext(ProductCategoryStore)
    const supplierStore = useContext(SupplierStore)
    const productStorageStore = useContext(ProductStorageStore)
    const currencyStore = useContext(CurrencyStore)
    const codeLegacyStore = useContext(CodeLegacyStore)

    const getList = useCallback(async () => {
        await prodStatusStore.getList()
        await productCategoryStore.getList()
        await supplierStore.getList()
        await productStorageStore.getList()
        await currencyStore.getList()
    }, [
        prodStatusStore,
        productCategoryStore,
        productStorageStore,
        supplierStore,
        currencyStore,
    ])

    useEffect(() => {
        getList()
    }, [getList])

    const formRef = useRef<FormInstance>(null)

    const { Option } = Select

    return (
        <Modal
            visible={componentStore.openEditor}
            destroyOnClose
            onCancel={() => {
                componentStore.item = {}
                componentStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={componentStore.isLoading}
            width={800}
            okText="Guardar"
            cancelText="Cancelar"
        >
            <Form
                className="modalForm"
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    await componentStore.createUpdate(value)
                    componentStore.isLoading = false
                    componentStore.openEditor = false
                    await componentStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                onValuesChange={async (value) => {
                    if (value.code) {
                        const code: ICodeLegacy =
                            await codeLegacyStore.getByCode(value.code)
                        formRef.current?.setFieldsValue({
                            code: code.code,
                            name: code.name,
                            model: code.model,
                            'details.color': code.color,
                        })
                    }
                    if (value.currency) {
                        const currency: ICurrency = await currencyStore.getById(
                            value.currency
                        )
                        formRef.current?.setFieldsValue({
                            'price.buyRate': currency.rate.sale,
                        })
                    }
                }}
                initialValues={{
                    code: componentStore.item.code,
                    model: componentStore.item.model,
                    name: componentStore.item.name,
                    currency: _.get(
                        componentStore.item,
                        'currency._id',
                        undefined
                    ),
                    'price.buyRate': _.get(
                        componentStore.item,
                        'price.buyRate',
                        undefined
                    ),
                    'price.buy': _.get(
                        componentStore.item,
                        'price.buy',
                        undefined
                    ),
                    'price.public': _.get(
                        componentStore.item,
                        'price.public',
                        undefined
                    ),
                    'price.special': _.get(
                        componentStore.item,
                        'price.special',
                        undefined
                    ),
                    status: _.get(componentStore.item, 'status._id', undefined),
                    category: _.get(
                        componentStore.item,
                        'category._id',
                        undefined
                    ),
                    supplier: _.get(
                        componentStore.item,
                        'supplier._id',
                        undefined
                    ),
                    storage: _.get(
                        componentStore.item,
                        'storage._id',
                        undefined
                    ),
                    'details.imei': _.get(
                        componentStore.item,
                        'details.imei',
                        undefined
                    ),
                    'details.color': _.get(
                        componentStore.item,
                        'details.color',
                        undefined
                    ),
                    'details.capacity': _.get(
                        componentStore.item,
                        'details.capacity',
                        undefined
                    ),
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
                    <Form.Item
                        name="status"
                        label="Estado inicial"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <Select loading={prodStatusStore.isLoading}>
                            {prodStatusStore.list
                                .filter((f) => f.isInitialStatus)
                                .map((value: any) => (
                                    <Option key={value._id} value={value._id}>
                                        {value.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="code"
                        label="Código"
                        style={{ width: '50%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div
                    style={{
                        marginTop: 0,
                        paddingTop: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Nombre"
                        style={{ width: '45%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="model"
                        label="Modelo"
                        style={{ width: '45%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div
                    style={{
                        marginTop: 0,
                        paddingTop: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="currency"
                        label="Tipo de moneda"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <Select loading={currencyStore.isLoading}>
                            {currencyStore.list.map((value: any) => (
                                <Option key={value._id} value={value._id}>
                                    {value.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price.buyRate"
                        label="Cotización"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <InputNumber readOnly />
                    </Form.Item>
                    <Form.Item
                        name="price.buy"
                        label="Precio de compra"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="price.public"
                        label="Precio público"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="price.special"
                        label="Precio gremio"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <InputNumber />
                    </Form.Item>
                </div>

                <div
                    style={{
                        marginTop: 0,
                        paddingTop: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="category"
                        label="Categoría"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <Select loading={prodStatusStore.isLoading}>
                            {productCategoryStore.list.map((value: any) => (
                                <Option key={value._id} value={value._id}>
                                    {value.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="supplier"
                        label="Proveedor"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <Select loading={prodStatusStore.isLoading}>
                            {supplierStore.list.map((value: any) => (
                                <Option key={value._id} value={value._id}>
                                    {value.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="storage"
                        label="Almacén"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <Select loading={prodStatusStore.isLoading}>
                            {productStorageStore.list.map((value: any) => (
                                <Option key={value._id} value={value._id}>
                                    {value.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div
                    style={{
                        marginTop: 0,
                        paddingTop: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="details.imei"
                        label="IMEI"
                        style={{ width: '20%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="details.color"
                        label="Color"
                        style={{ width: '20%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="details.capacity"
                        label="Capacidad"
                        style={{ width: '20%', display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="details.capacity"
                        label="Capacidad [Básicos]"
                        style={{ width: '20%', display: 'inline-block' }}
                    >
                        <Select>
                            <Option key="1GB" value="1GB">
                                1GB
                            </Option>
                            <Option key="2GB" value="2GB">
                                2GB
                            </Option>
                            <Option key="4GB" value="4GB">
                                4GB
                            </Option>
                            <Option key="8GB" value="8GB">
                                8GB
                            </Option>
                            <Option key="16GB" value="16GB">
                                16GB
                            </Option>
                            <Option key="32GB" value="32GB">
                                32GB
                            </Option>
                            <Option key="64GB" value="64GB">
                                64GB
                            </Option>
                            <Option key="128GB" value="128GB">
                                128GB
                            </Option>
                            <Option key="256GB" value="256GB">
                                256GB
                            </Option>
                            <Option key="512GB" value="512GB">
                                512GB
                            </Option>
                            <Option key="1T" value="1T">
                                1T
                            </Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
})
