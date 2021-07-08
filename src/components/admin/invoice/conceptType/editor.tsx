import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal, Radio } from 'antd'
import ConceptTypeStore from '../../../../stores/conceptType'

export const EditorForm = observer(() => {
    const componentStore = useContext(ConceptTypeStore)

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
                    isCredit: componentStore.item.isCredit,
                    detail: componentStore.item.detail,
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="isCredit" label="Cobro/Pago">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={true}>Cobro</Radio.Button>
                        <Radio.Button value={false}>Pago</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="detail" label="Descripción">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
