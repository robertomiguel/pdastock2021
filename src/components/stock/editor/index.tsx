import { Modal, InputNumber, FormInstance, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import ProductStore from 'stores/product'
import CodeLegacyStore from 'stores/codeLegacy'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import ProductStatusStore from 'stores/productStatus'
import ProductCategoryStore from 'stores/productCategory'
import SupplierStore from 'stores/supplier'
import ProductStorageStore from 'stores/productStorage'
import _ from 'lodash'
import { useCallback } from 'react'

export const EditorForm = observer(() => {
    const componentStore = useContext(ProductStore)
    const prodStatusStore = useContext(ProductStatusStore)
    const productCategoryStore = useContext(ProductCategoryStore)
    const supplierStore = useContext(SupplierStore)
    const productStorageStore = useContext(ProductStorageStore)
    const codeLegacyStore = useContext(CodeLegacyStore)
    
    const getList = useCallback(async ()=>{
            await prodStatusStore.getList()
            await productCategoryStore.getList()
            await supplierStore.getList()
            await productStorageStore.getList()
    },[prodStatusStore, productCategoryStore, productStorageStore, supplierStore])
    
    useEffect(() => {
        getList()
    }, [getList])

    const formRef = useRef<FormInstance>(null)

    const { Option } = Select

    return <Modal
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
                onValuesChange={async (value)=>{
                    if (value.code) {
                        const w = await codeLegacyStore.getByCode(value.code)
                        console.log('code ', w);
                        
                    }
                }}
                initialValues={{
                    code: componentStore.item.code,
                    model: componentStore.item.model,
                    name: componentStore.item.name,
                    currency: _.get(componentStore.item, 'currency._id', undefined),
                    'price.buy': _.get(componentStore.item, 'price.buy', undefined),
                    'price.public': _.get(componentStore.item, 'price.public', undefined),
                    'price.special': _.get(componentStore.item, 'price.special', undefined),
                    status: _.get(componentStore.item, 'status._id', undefined),
                    category: _.get(componentStore.item,'category._id', undefined),
                    supplier: _.get(componentStore.item, 'supplier._id', undefined),
                    storage: _.get(componentStore.item, 'storage._id', undefined),
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
                <Form.Item name="status" label="Estado inicial">
                    <Select loading={prodStatusStore.isLoading}>
                        {prodStatusStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="code" label="Código">
                    <Input />
                </Form.Item>

                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="model" label="Modelo">
                    <Input />
                </Form.Item>
                
                <Form.Item name="price.buy" label="Precio de compra">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="price.public" label="Precio público">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="price.special" label="Precio gremio">
                    <InputNumber />
                </Form.Item>
                
                <Form.Item name="category" label="Categoría">
                <Select loading={prodStatusStore.isLoading}>
                        {productCategoryStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="supplier" label="Proveedor">
                <Select loading={prodStatusStore.isLoading}>
                        {supplierStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="storage" label="Almacén">
                <Select loading={prodStatusStore.isLoading}>
                        {productStorageStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="details.imei" label="IMEI">
                    <Input />
                </Form.Item>
                <Form.Item name="details.color" label="Color">
                    <Input />
                </Form.Item>
                <Form.Item name="details.capacity" label="Capacidad">
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
})
