import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch, Radio } from 'antd'
import InvoiceTypeStore from '../../../../stores/invoiceType'

export const EditorForm = observer(() => {
    const componentStore = useContext(InvoiceTypeStore)

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
                    shortname: componentStore.item.shortname,
                    symbol: componentStore.item.symbol,
                    isCredit: componentStore.item.isCredit,
                    isEInvoice: componentStore.item.isEInvoice,
                    lastNumber: componentStore.item.lastNumber,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="shortname" label="Nombre corto">
                    <Input />
                </Form.Item>
                <Form.Item name="symbol" label="Letra">
                    <Input />
                </Form.Item>
                <Form.Item name="isCredit" label="Cobro/Pago">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={true}>Cobro</Radio.Button>
                        <Radio.Button value={false}>Pago</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="isEInvoice"
                    label="Comp. Electrónico"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item name="lastNumber" label="Último nro. de Comprobante">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
