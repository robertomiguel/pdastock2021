import { IProduct } from '../../stores/product'
import { generateId } from '../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './render/action'

export const columnsForm: ColumnsType<Partial<IProduct>> = [
    {
        title: 'Model',
        dataIndex: 'model',
        key: generateId(),
        sorter: true,
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        align: 'center',
        sorter: true,
        key: generateId(),
        render: (s) => s.name,
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
