import { ColumnsType } from 'antd/lib/table'
import { generateId } from 'common/generateId'
import { IProductStatus } from 'stores/productStatus'
import { FormAction } from './action'

export const columnsForm: ColumnsType<Partial<IProductStatus>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Disponible para venta',
        dataIndex: 'isAvailableForSale',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (s) => (s ? 'Si' : 'No'),
    },
    {
        title: 'Es RMA',
        dataIndex: 'isRMA',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (s) => (s ? 'Si' : 'No'),
    },
    {
        title: 'Vendido',
        dataIndex: 'isSold',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (s) => (s ? 'Si' : 'No'),
    },
    {
        title: 'Estado inicial',
        dataIndex: 'isInitialStatus',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (s) => (s ? 'Si' : 'No'),
    },
    {
        title: 'Eliminado/No disponible',
        dataIndex: 'isDeleted',
        key: generateId(),
        sorter: true,
        align: 'center',
        render: (s) => (s ? 'Si' : 'No'),
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
