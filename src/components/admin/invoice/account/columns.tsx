import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IInvoiceAccount } from '../../../../stores/invoiceAccount'
import moment from 'moment'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IInvoiceAccount>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Categoría fiscal',
        dataIndex: 'fiscalCategory',
        key: generateId(),
        sorter: true,
        render: (c) => c.name,
    },
    {
        title: 'CUIT',
        dataIndex: 'cuit',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'IIBB',
        dataIndex: 'iibb',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Nombre de fantasía',
        dataIndex: 'fantasyName',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Inicio de actividades',
        dataIndex: 'activityStartDate',
        key: generateId(),
        sorter: true,
        render: (d) => (d ? moment(d).format('DD-MM-YYYY') : ''),
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
