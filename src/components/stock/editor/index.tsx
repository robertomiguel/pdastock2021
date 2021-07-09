import { Modal, InputNumber, FormInstance, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef, useState } from 'react'
import ProductStore from '../../../stores/product'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import ProductStatusStore from '../../../stores/productStatus'
import _ from 'lodash'

// 'status model details.imei price'

export const EditorForm = observer(() => {
    const prodStore = useContext(ProductStore)
    const [open, setOpen] = useState(false)
    const prodStatusStore = useContext(ProductStatusStore)

    useEffect(() => {
        if (prodStore.openEditor) {
            prodStatusStore.getList()
            setOpen(() => true)
        }
    }, [prodStore.openEditor, prodStatusStore])

    /*     useEffect(() => {
        if (prodStore.openEditor) {
            console.log('cargado de formulario edit/save')
            const defData = {}
            formModel.map((value: any) => {
                const v = value.name.split('.')
                if (v.length > 1)
                    return Object.assign(defData, {
                        [value.name]: prodStore.item[v[0]][v[1]],
                    })
                else
                    return Object.assign(defData, {
                        [value.name]: prodStore.item[value.name],
                    })
            })
            console.log('def data: ', defData)

            setDefaultValue(() => defData)
            setOpen(() => true)
        } else setOpen(() => false)
    }, [prodStore, prodStore.openEditor])
*/
    const formRef = useRef<FormInstance>(null)
    const { Option } = Select

    return open ? (
        <Modal
            visible={true}
            destroyOnClose
            onCancel={() => {
                prodStore.openEditor = false
                setOpen(() => false)
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={prodStore.isLoading}
        >
            <Form
                className="modalForm"
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await prodStore.createUpdate(value)
                    prodStore.isLoading = false
                    prodStore.openEditor = false
                    await prodStore.getList()
                    setOpen(() => false)
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: prodStore.item.name,
                    model: prodStore.item.model,
                    ncm: prodStore.item.nmc,
                    price: prodStore.item.price,
                    code: prodStore.item.code,
                    status: _.get(prodStore.item, 'status._id', undefined),
                    category: prodStore.item.category,
                    supplier: prodStore.item.supplier,
                    storage: prodStore.item.storage,
                    'details.imei': _.get(
                        prodStore.item,
                        'details.imei',
                        undefined
                    ),
                    'details.color': _.get(
                        prodStore.item,
                        'details.color',
                        undefined
                    ),
                    'details.capacity': _.get(
                        prodStore.item,
                        'details.capacity',
                        undefined
                    ),
                }}
            >
                <Form.Item name="status" label="Estado">
                    <Select loading={prodStatusStore.isLoading}>
                        {prodStatusStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="model" label="Modelo">
                    <Input />
                </Form.Item>
                <Form.Item name="ncm" label="NCM">
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Precio">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="code" label="Código">
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="Categoría">
                    <Input />
                </Form.Item>
                <Form.Item name="supplier" label="Proveedor">
                    <Input />
                </Form.Item>
                <Form.Item name="storage" label="Almacén">
                    <Input />
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
    ) : (
        <></>
    )
})
