import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch } from 'antd'
import InvoiceStatusStore from '../../../../stores/invoiceStatus'

export const EditorForm = observer(() => {
    const componentStore = useContext(InvoiceStatusStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={componentStore.openEditor}
            destroyOnClose
            onCancel={() => {
                componentStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={componentStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await componentStore.createUpdate(value)
                    componentStore.isLoading = false
                    componentStore.openEditor = false
                    await componentStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: componentStore.item.name,
                    isCollected: componentStore.item.isCollected,
                    isPaid: componentStore.item.isPaid,
                    isPending: componentStore.item.isPending,
                    isCancelled: componentStore.item.isCancelled,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="isPaid" label="Pagado" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isCollected"
                    label="Cobrado"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isPending"
                    label="Pendiente"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isCanceled"
                    label="Anulado"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
})
