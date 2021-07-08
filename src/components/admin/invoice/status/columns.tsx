import { generateId } from '../../../common/generateId'
import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IConceptType } from '../../../../stores/conceptType'

export const columnsForm: ColumnsType<Partial<IConceptType>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Cobrado',
        dataIndex: 'isCollected',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },
    {
        title: 'Pagado',
        dataIndex: 'isPaid',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },
    {
        title: 'Pendiente',
        dataIndex: 'isPending',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
    },
    {
        title: 'Cancelado',
        dataIndex: 'isCanceled',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Si' : 'No'),
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
