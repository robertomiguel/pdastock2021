import { observer } from 'mobx-react-lite'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { CustomerSelect } from './customer'
import {
    Form,
    Input,
    FormInstance,
    Modal,
    Select,
    Radio,
    DatePicker,
    Divider,
    Collapse,
    Button,
} from 'antd'
import InvoiceStore, { IInvoiceStore } from '../../stores/invoice'
import _ from 'lodash'
import { CurrencySelect } from './currency'
import { InvoiceAccountSelect } from './invoiceAccount'
import { PointOfSaleSelect } from './pointOfSale'
import { InvoiceConcept } from './concept'

export const EditorForm = observer(() => {
    const componentStore = useContext<IInvoiceStore>(InvoiceStore)

    const { Option } = Select

    const { Panel } = Collapse

    const formRef = useRef<FormInstance>(null)

    const getList = useCallback(async () => {}, [])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <Modal
            visible={componentStore.openEditor}
            destroyOnClose
            title="Editor/New"
            confirmLoading={componentStore.isLoading}
            width={1000}
            maskClosable={false}
            footer={[
                <Button
                    key="invoiceCancel"
                    type="text"
                    onClick={() => {
                        componentStore.openEditor = false
                    }}
                >
                    Cancelar
                </Button>,
                <Button
                    key="invoicePending"
                    loading={componentStore.isLoading}
                    onClick={() => formRef.current?.submit()}
                >
                    Dejar pendiente de pago
                </Button>,
                <Button
                    key="invoiceSubmit"
                    loading={componentStore.isLoading}
                    onClick={() => formRef.current?.submit()}
                >
                    Cobrado
                </Button>,
            ]}
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
                initialValues={{
                    customer: componentStore.item.customer,
                    date: componentStore.item.date,
                    currency: componentStore.item.currency,
                    concept: componentStore.item.concept,
                    payment: componentStore.item.payAmount,
                }}
            >
                <div
                    style={{
                        marginTop: 0,
                        paddingTop: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="customer"
                        label="Cliente"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <CustomerSelect />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Fecha de inputación"
                        style={{
                            width: '30%',
                            textAlign: 'center',
                            display: 'inline-block',
                        }}
                    >
                        <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="Tipo de moneda"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <CurrencySelect />
                    </Form.Item>
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Form.Item
                        name="invoiceAccount"
                        label="Cuenta de facturación"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <InvoiceAccountSelect />
                    </Form.Item>
                    <Form.Item
                        name="pointOfSale"
                        label="Punto de venta"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <PointOfSaleSelect />
                    </Form.Item>
                </div>
                <Divider />
                <Form.Item>
                    <InvoiceConcept />
                </Form.Item>
                <Form.Item>
                    <Collapse activeKey={['1-12']}>
                        <Panel
                            header={<Button>+ Forma de pago</Button>}
                            key="1-12"
                        >
                            <p>+ Concepto</p>
                        </Panel>
                    </Collapse>
                </Form.Item>
            </Form>
        </Modal>
    )
})
