import { generateId } from '../../../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IProductStatus } from '../../../../stores/productStatus'

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
