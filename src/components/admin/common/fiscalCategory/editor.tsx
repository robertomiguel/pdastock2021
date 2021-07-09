import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal } from 'antd'
import FiscalCategoryStore from '../../../../stores/fiscalCategory'

export const EditorForm = observer(() => {
    const fiscalCategoryStore = useContext(FiscalCategoryStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={fiscalCategoryStore.openEditor}
            destroyOnClose
            onCancel={() => {
                fiscalCategoryStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={fiscalCategoryStore.isLoading}
        >
            <Form
                className="modalForm"
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await fiscalCategoryStore.createUpdate(value)
                    fiscalCategoryStore.isLoading = false
                    fiscalCategoryStore.openEditor = false
                    await fiscalCategoryStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: fiscalCategoryStore.item.name,
                    shortname: fiscalCategoryStore.item.shortname,
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
