import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { generateId } from 'common/generateId'
import { ICustomerInvoice, IInvoice } from 'stores/invoice'
import { dateTimeES } from 'common/dateTimeES'
import { IInvoiceStatus } from 'stores/invoiceStatus'
/*
    number: number
    invoiceType: IInvoiceType
    customer: ICustomerInvoice
    status: IInvoiceStatus
    date: Date
    pointOfSale: IPointOfSale
    invoiceAccount: IInvoiceAccount
    currency: ICurrencyInvoice
    totalAmount: number
    pendingAmount: number
    payAmount: number
    payment: IPaymentInvoice[]
    concept: IConceptInvoice[]
    created: Date
    updated: Date
    userCreated: IUser
    userModified: IUser
*/
export const columnsForm: ColumnsType<Partial<IInvoice>> = [
    {
        title: 'Número',
        dataIndex: 'number',
        key: generateId(),
        sorter: true,
        render: (n, i) => (
            <div>
                <div>{n}</div>
                <div>{i.invoiceType?.name}</div>
            </div>
        ),
    },
    {
        title: 'Cliente',
        dataIndex: 'customer',
        key: generateId(),
        sorter: true,
        render: (c: ICustomerInvoice) => (
            <div>
                <div>{c.name}</div>
                <div>{c.fiscalCategory}</div>
            </div>
        ),
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        key: generateId(),
        sorter: true,
        render: (s: IInvoiceStatus) => (
            <div>
                <div>{s.name}</div>
            </div>
        ),
    },
    {
        title: 'Importe',
        dataIndex: 'totalAmount',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Creado',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        render: (created, item) => (
            <div>
                <div>
                    Creado: {dateTimeES(created)} por{' '}
                    {item.userCreated?.name
                        ? item.userCreated?.name
                        : '[no user]'}
                </div>
                <div>
                    Actualizado: {dateTimeES(item.updated)} por{' '}
                    {item.userModified?.name
                        ? item.userModified?.name
                        : '[no user]'}
                </div>
            </div>
        ),
    },
    {
        title: '',
        dataIndex: '_id',
        key: generateId(),
        width: '10em',
        align: 'right',
        render: (id: string) => <FormAction id={id} />,
    },
]
