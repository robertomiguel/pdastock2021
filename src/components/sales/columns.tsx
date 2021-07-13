import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { generateId } from 'common/generateId'
import { IInvoice } from 'stores/invoice'

export const columnsForm: ColumnsType<Partial<IInvoice>> = [
    {
        title: 'Número',
        dataIndex: 'number',
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
