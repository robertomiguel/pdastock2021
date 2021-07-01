import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef, useState } from 'react'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import ProductStatusStore from '../../../../stores/productStatus'

export const EditorForm = observer(() => {
    const [open, setOpen] = useState(false)
    const prodStatusStore = useContext(ProductStatusStore)

    useEffect(() => {
        if (prodStatusStore.openEditor) {
            prodStatusStore.getList()
            setOpen(() => true)
        }
    }, [prodStatusStore, prodStatusStore.openEditor])

    const formRef = useRef<FormInstance>(null)

    return open ? (
        <Modal
            visible={true}
            destroyOnClose
            onCancel={() => {
                prodStatusStore.openEditor = false
                setOpen(() => false)
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={prodStatusStore.isLoading}
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
                    setOpen(() => false)
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
    ) : (
        <></>
    )
})
