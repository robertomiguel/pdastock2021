import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { generateId } from 'common/generateId'
import { IConceptInvoice } from 'stores/invoice'

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
                {c.name} {c.isCredit ? '[Cobro]' : '[Pago]'}
            </div>
        ),
    },
    {
        title: 'Importe',
        dataIndex: 'amount',
        key: generateId(),
        width: '7em',
        align: 'right',
    },
    {
        title: '',
        dataIndex: '_id',
        key: generateId(),
        width: '7em',
        align: 'right',
        render: (id: string) => <FormAction id={id} />,
    },
]
