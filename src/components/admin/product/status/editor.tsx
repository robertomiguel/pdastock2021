import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, Switch } from 'antd'
import ProductStatusStore from '../../../../stores/productStatus'

export const EditorForm = observer(() => {
    const prodStatusStore = useContext(ProductStatusStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={prodStatusStore.openEditor}
            destroyOnClose
            onCancel={() => {
                prodStatusStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={prodStatusStore.isLoading}
            width={400}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await prodStatusStore.createUpdate(value)
                    prodStatusStore.isLoading = false
                    prodStatusStore.openEditor = false
                    await prodStatusStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: prodStatusStore.item.name,
                    isAvailableForSale: prodStatusStore.item.isAvailableForSale,
                    isRMA: prodStatusStore.item.isRMA,
                    isSold: prodStatusStore.item.isSold,
                    isInitialStatus: prodStatusStore.item.isInitialStatus,
                    isDeleted: prodStatusStore.item.isDeleted,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isAvailableForSale"
                    label="Disponible para venta"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item name="isRMA" label="Es RMA" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isSold"
                    label="Vendido"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isInitialStatus"
                    label="Estado disponible en carga de producto"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isDeleted"
                    label="Eliminado / No disponible"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
})
