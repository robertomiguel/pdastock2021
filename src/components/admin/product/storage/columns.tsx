import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IProductStorage } from '../../../../stores/productStorage'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IProductStorage>> = [
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
        title: 'Teléfono',
        dataIndex: 'phone',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Principal',
        dataIndex: 'isMain',
        key: generateId(),
        sorter: true,
        render: (main) => (main ? 'Si' : 'No'),
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
