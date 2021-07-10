import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IPointOfSale } from '../../../../stores/pointOfSale'
import { IUser } from '../../../../stores/user'
import { Tag } from 'antd'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IPointOfSale>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Cuenta de facturación por defecto',
        dataIndex: 'defaultInvoiceAccount',
        key: generateId(),
        sorter: true,
        render: (a) => a.name,
    },
    {
        title: 'Usuarios',
        dataIndex: 'users',
        key: generateId(),
        sorter: true,
        render: (u) =>
            u.length > 0 ? (
                u.map((user: IUser) => <Tag>{user.name}</Tag>)
            ) : (
                <></>
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
