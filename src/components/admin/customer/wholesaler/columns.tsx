import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { generateId } from 'common/generateId'
import { dateTimeES } from 'common/dateTimeES'
import { IWholesaler } from 'stores/wholesaler'

export const columnsForm: ColumnsType<Partial<IWholesaler>> = [
    {
        title: 'Nombre',
        dataIndex: 'customer',
        key: generateId(),
        sorter: true,
        render: (c: any) => (
            <div>
                <div>{c.fullname}</div>
            </div>
        ),
    },
    {
        title: 'Activo',
        dataIndex: 'isActive',
        align: 'center',
        sorter: true,
        key: generateId(),
        render: (a) => a ? 'Si':'No'
    },
    {
        title: 'Creado',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        render: (created, item) => (
            <div>
                <div>
                    Creado: {dateTimeES(created)} por{' '}
                    {item.userCreated?.name
                        ? item.userCreated?.name
                        : '[no user]'}
                </div>
                <div>
                    Actualizado: {dateTimeES(item.updated)} por{' '}
                    {item.userModified?.name
                        ? item.userModified?.name
                        : '[no user]'}
                </div>
            </div>
        ),
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
