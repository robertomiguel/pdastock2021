import { generateId } from '../../../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IUser } from '../../../../stores/user'

export const columnsForm: ColumnsType<Partial<IUser>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Nivel',
        dataIndex: 'level',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Activo',
        dataIndex: 'isActive',
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
