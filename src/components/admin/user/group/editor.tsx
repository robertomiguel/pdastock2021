import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch } from 'antd'
import UserGroupStore from '../../../../stores/userGroup'

export const EditorForm = observer(() => {
    const userGroupStore = useContext(UserGroupStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={userGroupStore.openEditor}
            destroyOnClose
            onCancel={() => {
                userGroupStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={userGroupStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await userGroupStore.createUpdate(value)
                    userGroupStore.isLoading = false
                    userGroupStore.openEditor = false
                    await userGroupStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: userGroupStore.item.name,
                    level: userGroupStore.item.level,
                    isActive: userGroupStore.item.isActive,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="level" label="Nivel">
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
