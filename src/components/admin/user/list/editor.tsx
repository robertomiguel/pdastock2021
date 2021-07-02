import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch } from 'antd'
import UserStore from '../../../../stores/user'

export const EditorForm = observer(() => {
    const userStore = useContext(UserStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={userStore.openEditor}
            destroyOnClose
            onCancel={() => {
                userStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={userStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await userStore.createUpdate(value)
                    userStore.isLoading = false
                    userStore.openEditor = false
                    await userStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    username: userStore.item.username,
                    name: userStore.item.name,
                    group: userStore.item.group,
                    isActive: userStore.item.isActive,
                }}
            >
                <Form.Item name="username" label="Usuario">
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Contraseña">
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="group" label="Grupo">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isActive"
                    label="Activo"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
})
