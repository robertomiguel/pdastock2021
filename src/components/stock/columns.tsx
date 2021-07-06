import { IProduct } from '../../stores/product'
import { generateId } from '../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './render/action'
import moment from 'moment'
export const columnsForm: ColumnsType<Partial<IProduct>> = [
    {
        title: 'Model',
        dataIndex: 'model',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        align: 'center',
        sorter: true,
        key: generateId(),
        render: (s) => (s && s.name ? s.name : ''),
    },
    {
        title: 'IMEI',
        dataIndex: 'details',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (d) => d.imei,
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (p) =>
            p.toLocaleString('us-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }),
    },
    {
        title: 'Categoría',
        dataIndex: 'category',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => d,
    },
    {
        title: 'Fecha Ingreso',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => moment(d).format('DD-MM-YYYY HH:ss'),
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
