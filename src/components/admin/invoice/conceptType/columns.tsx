import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IConceptType } from 'stores/conceptType'
import moment from 'moment'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IConceptType>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Operación',
        dataIndex: 'isCredit',
        key: generateId(),
        sorter: true,
        render: (o) => (o ? 'Cobro' : 'Pago'),
    },
    {
        title: 'Descripción',
        dataIndex: 'detail',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Creación',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        render: (d) => (d ? moment(d).format('DD-MM-YYYY') : ''),
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
