import { ColumnsType } from 'antd/lib/table'
import { generateId } from 'common/generateId'
import { IProductStatus } from 'stores/productStatus'
import { FormAction } from './action'

export const columnsForm: ColumnsType<Partial<IProductStatus>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
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
