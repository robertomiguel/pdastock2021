import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch } from 'antd'
import ProductStorageStore from '../../../../stores/productStorage'

export const EditorForm = observer(() => {
    const prodStorageStore = useContext(ProductStorageStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={prodStorageStore.openEditor}
            destroyOnClose
            onCancel={() => {
                prodStorageStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={prodStorageStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await prodStorageStore.createUpdate(value)
                    prodStorageStore.isLoading = false
                    prodStorageStore.openEditor = false
                    await prodStorageStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: prodStorageStore.item.name,
                    address: prodStorageStore.item.address,
                    phone: prodStorageStore.item.phone,
                    isMain: prodStorageStore.item.isMain,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Dirección">
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Teléfono">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isMain"
                    label="Principal"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
})
