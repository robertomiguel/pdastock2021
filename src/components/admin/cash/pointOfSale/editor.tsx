import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Select } from 'antd'
import PointOfSaleStore from '../../../../stores/pointOfSale'
import InvoiceAccountStore from '../../../../stores/invoiceAccount'
import UserStore from '../../../../stores/user'
import _ from 'lodash'

export const EditorForm = observer(() => {
    const componentStore = useContext(PointOfSaleStore)
    const userStore = useContext(UserStore)
    const invoiceAccountStore = useContext(InvoiceAccountStore)

    const { Option } = Select

    const formRef = useRef<FormInstance>(null)

    const getList = useCallback(async () => {
        await invoiceAccountStore.getList()
        await userStore.getList()
    }, [invoiceAccountStore, userStore])

    useEffect(() => {
        getList()
    }, [getList])

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
                    defaultInvoiceAccount: _.get(
                        componentStore.item,
                        'defaultInvoiceAccount._id',
                        undefined
                    ),
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
                <Form.Item
                    name="defaultInvoiceAccount"
                    label="Cuenta de facturación por defecto"
                >
                    <Select loading={invoiceAccountStore.isLoading}>
                        {invoiceAccountStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
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
