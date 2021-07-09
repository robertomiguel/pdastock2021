import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal } from 'antd'
import DocumentTypeStore from '../../../../stores/documentType'

export const EditorForm = observer(() => {
    const documentTypeStore = useContext(DocumentTypeStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={documentTypeStore.openEditor}
            destroyOnClose
            onCancel={() => {
                documentTypeStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={documentTypeStore.isLoading}
        >
            <Form
                className="modalForm"
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await documentTypeStore.createUpdate(value)
                    documentTypeStore.isLoading = false
                    documentTypeStore.openEditor = false
                    await documentTypeStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: documentTypeStore.item.name,
                    shortname: documentTypeStore.item.shortname,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="shortname" label="Nombre abreviado">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
