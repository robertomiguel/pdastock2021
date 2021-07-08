import { generateId } from '../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { ICustomer } from '../../stores/customer'

export const columnsForm: ColumnsType<Partial<ICustomer>> = [
    {
        title: 'Nombre',
        dataIndex: 'fullName',
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
