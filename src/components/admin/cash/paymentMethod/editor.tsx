import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch } from 'antd'
import PaymentMethodStore from '../../../../stores/paymentMethod'

export const EditorForm = observer(() => {
    const componentStore = useContext(PaymentMethodStore)

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
                className="modalForm"
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
                    useForCollect: componentStore.item.useForCollect,
                    useForPayment: componentStore.item.useForPayment,
                    isCheck: componentStore.item.isCheck,
                    isBank: componentStore.item.isBank,
                    isMoney: componentStore.item.isMoney,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="useForCollect"
                    label="Para cobro"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    name="useForPayment"
                    label="Para pago"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    name="isCheck"
                    label="Cheque"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="isMoney"
                    label="Efectivo"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item name="isBank" label="Banco" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
})
