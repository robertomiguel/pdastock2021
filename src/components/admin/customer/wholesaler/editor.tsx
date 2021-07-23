import { Modal, FormInstance, Switch, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import WholesalerStore, { IWholesalerStore } from 'stores/wholesaler'
import { useEffect } from 'react'
import _ from 'lodash'
import { useCallback } from 'react'
import { CustomerSelect } from 'components/sales/customer'

export const EditorForm = observer(() => {
    const componentStore = useContext<IWholesalerStore>(WholesalerStore)

    const getList = useCallback(async () => {
   
    }, [])

    useEffect(() => {
        getList()
    }, [getList])

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={componentStore.openEditor}
            destroyOnClose
            onCancel={() => {
                componentStore.item = {}
                componentStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={componentStore.isLoading}
            width={800}
            okText="Guardar"
            cancelText="Cancelar"
        >
            <Form
                className="modalForm"
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    await componentStore.createUpdate(value)
                    componentStore.isLoading = false
                    componentStore.openEditor = false
                    await componentStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                
                initialValues={{
                    customer: _.get(
                        componentStore.item,
                        'customer._id',
                        undefined
                    ),
                    isActive: componentStore.item.isActive,
                }}
            >
                    <Form.Item
                        name="customer"
                        label="Cliente"
                    >
                        <CustomerSelect defaultValue={componentStore.item && componentStore.item.customer && componentStore.item.customer._id} onChange={()=>{}} />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="Puede comprar mayorista"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

            </Form>
        </Modal>
    )
})
