import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IUser } from '../../../../stores/user'
import moment from 'moment'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IUser>> = [
    {
        title: 'Usuario',
        dataIndex: 'username',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Grupo',
        dataIndex: 'group',
        key: generateId(),
        sorter: true,
        render: (g) => g.name,
    },
    {
        title: 'Activo',
        dataIndex: 'isActive',
        key: generateId(),
        sorter: true,
        render: (main) => (main ? 'Si' : 'No'),
    },
    {
        title: 'Creación',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => (d ? moment(d).format('DD-MM-YYYY HH:ss') : ''),
    },
    {
        title: 'Modificación',
        dataIndex: 'updated',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => (d ? moment(d).format('DD-MM-YYYY HH:ss') : ''),
    },
    {
        title: 'Últ. Acceso',
        dataIndex: 'lastAccessDate',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => (d ? moment(d).format('DD-MM-YYYY HH:ss') : ''),
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
