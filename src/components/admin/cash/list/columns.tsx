import { generateId } from '../../../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { ICurrency } from '../../../../stores/currency'
import moment from 'moment'

export const columnsForm: ColumnsType<Partial<ICurrency>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Símbolo',
        dataIndex: 'symbol',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Cotización',
        dataIndex: 'rate',
        key: generateId(),
        sorter: true,
        render: (r) => (
            <span>
                Compra: {r.buy} / Venta: {r.sale}
            </span>
        ),
    },
    {
        title: 'Últ. Actualización',
        dataIndex: 'updated',
        key: generateId(),
        sorter: true,
        render: (d) => (d ? moment(d).format('DD-MM-YYYY HH:ss') : ''),
    },
    {
        title: 'Act. por',
        dataIndex: 'userModified',
        key: generateId(),
        sorter: true,
        render: (u) => <span>{u.name}</span>,
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
