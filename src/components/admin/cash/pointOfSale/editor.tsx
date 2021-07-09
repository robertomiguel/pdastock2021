import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Select } from 'antd'
import PointOfSaleStore from '../../../../stores/pointOfSale'
import UserStore from '../../../../stores/user'

export const EditorForm = observer(() => {
    const componentStore = useContext(PointOfSaleStore)
    const userStore = useContext(UserStore)

    const { Option } = Select

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
                    address: componentStore.item.address,
                    users: componentStore.item.users
                        ? componentStore.item.users.map((u: any) => u._id)
                        : undefined,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Dirección">
                    <Input />
                </Form.Item>
                <Form.Item name="users" label="Usuarios">
                    <Select loading={userStore.isLoading} mode="multiple">
                        {userStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})
