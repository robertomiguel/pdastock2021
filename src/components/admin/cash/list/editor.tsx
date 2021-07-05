import { observer } from 'mobx-react-lite'
import { useContext, useRef } from 'react'
import { Form, Input, FormInstance, Modal } from 'antd'
import CurrencyStore from '../../../../stores/currency'
import _ from 'lodash'

export const EditorForm = observer(() => {
    const currencyStore = useContext(CurrencyStore)

    const formRef = useRef<FormInstance>(null)

    return (
        <Modal
            visible={currencyStore.openEditor}
            destroyOnClose
            onCancel={() => {
                currencyStore.openEditor = false
            }}
            title="Editor/New"
            onOk={() => formRef.current?.submit()}
            confirmLoading={currencyStore.isLoading}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={async (value) => {
                    console.log('finish: ', value)
                    await currencyStore.createUpdate(value)
                    currencyStore.isLoading = false
                    currencyStore.openEditor = false
                    await currencyStore.getList()
                }}
                style={{ maxHeight: '500px' }}
                initialValues={{
                    name: currencyStore.item.name,
                    symbol: currencyStore.item.symbol,
                    'rate.buy': _.get(currencyStore.item, 'rate.buy', undefined),
                    'rate.sale': _.get(currencyStore.item, 'rate.sale', undefined),
                }}
            >
                <Form.Item name="name" label="Nombre">
                    <Input />
                </Form.Item>
                <Form.Item name="symbol" label="Símbolo">
                    <Input />
                </Form.Item>
                <Form.Item name="rate.buy" label="Precio de compra">
                    <Input />
                </Form.Item>
                <Form.Item name="rate.sale" label="Precio de venta">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
})
