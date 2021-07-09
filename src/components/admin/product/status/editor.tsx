import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input } from 'antd'
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
        >
            <Form
                className="modalForm"
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
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
