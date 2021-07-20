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
import InvoiceStore, { IInvoice, IInvoiceStore } from 'stores/invoice'
import _ from 'lodash'
import { CurrencySelect } from './currency'
import { InvoiceAccountSelect } from './invoiceAccount'
import { PointOfSaleSelect } from './pointOfSale'
import { InvoiceConcept } from './concept'
import moment from 'moment'
import { useState } from 'react'
import { DeepPartial } from 'common/types'

export const EditorForm = observer(() => {
    const componentStore = useContext<IInvoiceStore>(InvoiceStore)
    const [invoice, setInvoice] = useState<DeepPartial<IInvoice>>({})

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
                    onClick={() => {}}
                >
                    Dejar pendiente de pago
                </Button>,
                <Button
                    key="invoiceSubmit"
                    loading={componentStore.isLoading}
                    onClick={() => {
                        console.log('invoice: ', invoice)
                    }}
                >
                    Cobrado
                </Button>,
            ]}
        >
            <Form className="modalForm" ref={formRef} layout="vertical">
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
                        label="Cliente"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <CustomerSelect
                            onChange={(value: string) => {
                                console.log('customer ', value)
                                setInvoice(() => {
                                    return {
                                        ...invoice,
                                        customer: { _id: value },
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Fecha de inputación"
                        style={{
                            width: '30%',
                            textAlign: 'center',
                            display: 'inline-block',
                        }}
                    >
                        <DatePicker
                            format="DD-MM-YYYY"
                            onChange={(value) => {
                                console.log('date ', value)
                                setInvoice(() => {
                                    return {
                                        ...invoice,
                                        date: moment(value),
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="Tipo de moneda"
                        style={{ width: '30%', display: 'inline-block' }}
                    >
                        <CurrencySelect
                            onChange={(value) => {
                                console.log('date ', value)
                                /* setInvoice( () => {
                                return {
                                    ...invoice,
                                    currency: ,
                                }
                            }) */
                            }}
                        />
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
