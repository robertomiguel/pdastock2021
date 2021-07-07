import { generateId } from '../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { ISupplier } from '../../stores/supplier'

export const columnsForm: ColumnsType<Partial<ISupplier>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
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
