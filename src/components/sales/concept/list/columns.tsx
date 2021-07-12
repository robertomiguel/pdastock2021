import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import moment from 'moment'
import { generateId } from 'common/generateId'
import { IConceptInvoice } from 'stores/invoice'

export const dateTimeES = (d: Date | undefined) =>
    d ? moment(d).format('DD-MM-YYYY HH:ss') : ''

export const columnsForm: ColumnsType<Partial<IConceptInvoice>> = [
    {
        title: 'Detalle',
        dataIndex: 'detail',
        key: generateId(),
        width: '15em',
    },
    {
        title: 'Tipo de concepto',
        dataIndex: 'conceptType',
        key: generateId(),
        width: '5em',
        render: (c) => (
            <div>
                {c.name} {c.isCredir ? '[Cobro]' : '[Pago]'}
            </div>
        ),
    },
    {
        title: 'Importe',
        dataIndex: 'amount',
        key: generateId(),
    },
    {
        title: '',
        dataIndex: '_id',
        key: generateId(),
        width: '5em',
        align: 'right',
        render: (id: string) => <FormAction id={id} />,
    },
]
