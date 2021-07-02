import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input } from 'antd'
import ProductCategoryStore from '../../../../stores/productCategory'

export const EditorForm = observer(() => {
    const prodCategoryStore = useContext(ProductCategoryStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={prodCategoryStore.openEditor}
            destroyOnClose
            onCancel={() => {
                prodCategoryStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={prodCategoryStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await prodCategoryStore.createUpdate(value)
                    prodCategoryStore.isLoading = false
                    prodCategoryStore.openEditor = false
                    await prodCategoryStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: prodCategoryStore.item.name,
                    stockMin: prodCategoryStore.item.stockMin,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="stockMin" label="Stock Min.">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
