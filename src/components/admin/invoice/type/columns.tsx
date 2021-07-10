import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import moment from 'moment'
import { generateId } from 'common/generateId'
import { IInvoiceType } from 'stores/invoiceType'

export const columnsForm: ColumnsType<Partial<IInvoiceType>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Nombre Corto',
        dataIndex: 'shortname',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Letra',
        dataIndex: 'symbol',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Operación',
        dataIndex: 'isCredit',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Cobro' : 'Pago'),
    },
    {
        title: 'Comprobante electrónico',
        dataIndex: 'isEInvoice',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },

    {
        title: 'Último número de Comprobante',
        dataIndex: 'lastNumber',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Fecha Últ. Comprobante',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        render: (d) => (d ? moment(d).format('DD-MM-YYYY HH:ss') : ''),
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
