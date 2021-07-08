import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Select, Radio } from 'antd'
import CustomerStore from '../../stores/customer'
import FiscalCategoryStore from '../../stores/fiscalCategory'
import DocumentTypeStore from '../../stores/documentType'

export const EditorForm = observer(() => {
    const componentStore = useContext(CustomerStore)
    const fiscalCategoryStore = useContext(FiscalCategoryStore)
    const documentTypeStore = useContext(DocumentTypeStore)

    const { Option } = Select

    const formRef = useRef<FormInstance>(null)

    const getList = useCallback(async () => {
        await fiscalCategoryStore.getList()
        await documentTypeStore.getList()
    }, [fiscalCategoryStore, documentTypeStore])

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
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await componentStore.createUpdate(value)
                    componentStore.isLoading = false
                    componentStore.openEditor = false
                    await componentStore.getList()
                }}
                style={{ maxHeight: '500px', overflow: 'scroll' }}
                initialValues={{
                    firstname: componentStore.item.firstname,
                    lastname: componentStore.item.lastname,
                    address: componentStore.item.address,
                    phone: componentStore.item.phone,
                    email: componentStore.item.email,
                    isOrganization: componentStore.item.isOrganization,
                    organizationName: componentStore.item.organizationName,
                    documentType: componentStore.item.documentType,
                    documentNumber: componentStore.item.documentNumber,
                    fiscalCategory: componentStore.item.fiscalCategory,
                }}
            >
                <Form.Item name="firstname" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="lastname" label="Apellido">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Domicilio">
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Teléfono">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="EMail">
                    <Input />
                </Form.Item>
                <Form.Item name="isOrganization" label="Tipo de persona">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={true}>Fisica</Radio.Button>
                        <Radio.Button value={false}>Jurídica</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    hidden={!formRef.current?.getFieldValue('isOrganization')}
                    name="organizationName"
                    label="Nombre de fantasía"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="documentType" label="Tipo de documento">
                    <Select loading={documentTypeStore.isLoading}>
                        {documentTypeStore.list.map((value: any) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="documentNumber" label="Número de documento">
                    <Input />
                </Form.Item>
                <Form.Item name="fiscalCategory" label="Categoría fiscal">
                    <Select loading={fiscalCategoryStore.isLoading}>
                        {fiscalCategoryStore.list.map((value: any) => (
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
