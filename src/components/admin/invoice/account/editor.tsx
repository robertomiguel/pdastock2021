import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Select, DatePicker } from 'antd'
import InvoiceAccountStore from '../../../../stores/invoiceAccount'
import FiscalCategoryStore from '../../../../stores/fiscalCategory'
import _ from 'lodash'
import moment from 'moment'

export const EditorForm = observer(() => {
    const componentStore = useContext(InvoiceAccountStore)
    const fiscalCategoryStore = useContext(FiscalCategoryStore)
    const formRef = useRef<FormInstance>(null)

    const { Option } = Select

    const getList = useCallback(async () => {
        await fiscalCategoryStore.getList()
    }, [fiscalCategoryStore])

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
                    fiscalCategory: _.get(
                        componentStore.item,
                        'fiscalCategory._id',
                        undefined
                    ),
                    cuit: componentStore.item.cuit,
                    iibb: componentStore.item.iibb,
                    fantasyName: componentStore.item.fantasyName,
                    activityStartDate: moment(
                        componentStore.item.activityStartDate
                    ),
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Dirección">
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
                <Form.Item name="cuit" label="CUIT">
                    <Input />
                </Form.Item>
                <Form.Item name="iibb" label="Número de IIBB">
                    <Input />
                </Form.Item>
                <Form.Item name="fantasyName" label="Nombre de fantasía">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="activityStartDate"
                    label="Inicio de actividades"
                >
                    <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
            </Form>
        </Modal>
    )
})
