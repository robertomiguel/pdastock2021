import { generateId } from '../../../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IPaymentMethod } from '../../../../stores/paymentMethod'

export const columnsForm: ColumnsType<Partial<IPaymentMethod>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Disponible para Pagos',
        dataIndex: 'useForPayment',
        key: generateId(),
        sorter: true,
        render: (p) => (p ? 'Si' : 'No'),
    },
    {
        title: 'Disponible para Cobros',
        dataIndex: 'useForCollect',
        key: generateId(),
        sorter: true,
        render: (p) => (p ? 'Si' : 'No'),
    },
    {
        title: 'Efectivo',
        dataIndex: 'isMoney',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },
    {
        title: 'Cheque',
        dataIndex: 'isCheck',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },
    {
        title: 'Banco',
        dataIndex: 'isBank',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
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
