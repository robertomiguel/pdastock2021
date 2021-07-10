import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import moment from 'moment'
import { generateId } from 'common/generateId'
import { IInvoice } from 'stores/invoice'

export const dateTimeES = (d: Date | undefined) =>
    d ? moment(d).format('DD-MM-YYYY HH:ss') : ''

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
