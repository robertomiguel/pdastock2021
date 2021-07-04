import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Switch, Select } from 'antd'
import UserStore from '../../../../stores/user'
import UserGroupStore from '../../../../stores/userGroup'
import { useCallback } from 'react'
import _ from 'lodash'

export const EditorForm = observer(() => {
    const userStore = useContext(UserStore)
    const userGroupStore = useContext(UserGroupStore)

    const formRef = useRef<FormInstance>(null)

    const { Option } = Select

    const getUserGroupList = useCallback(async () => {
        await userGroupStore.getList()
    }, [userGroupStore])

    useEffect(() => {
        getUserGroupList()
    }, [getUserGroupList])

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
                    group: _.get(userStore.item, 'group._id', undefined),
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
                    <Select loading={userGroupStore.isLoading}>
                        {userGroupStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
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
