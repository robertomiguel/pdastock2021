import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import moment from 'moment'
import { generateId } from 'common/generateId'
import { ICustomer } from 'stores/customer'

export const dateTimeES = (d: Date | undefined) =>
    d ? moment(d).format('DD-MM-YYYY HH:ss') : ''

export const columnsForm: ColumnsType<Partial<ICustomer>> = [
    {
        title: 'Nombre',
        dataIndex: 'fullname',
        key: generateId(),
        sorter: true,
        render: (name, item) => (
            <div>
                <div>{name}</div>
                <div>
                    {item.documentType?.shortname} {item.documentNumber}
                </div>
                <div>{item.fiscalCategory?.name}</div>
            </div>
        ),
    },
    {
        title: 'Domicilio',
        dataIndex: 'address',
        key: generateId(),
        sorter: true,
        render: (address, item) => (
            <div>
                <div>Dir: {address}</div>
                <div>Tel: {item.phone}</div>
                <div>EMail: {item.email}</div>
            </div>
        ),
    },
    {
        title: 'Creado',
        dataIndex: 'created',
        key: generateId(),
        sorter: true,
        render: (created, item) => (
            <div>
                <div>
                    Creado: {dateTimeES(created)} por {item.userCreated?.name}{' '}
                </div>
                <div>
                    Actualizado: {dateTimeES(item.updated)} por{' '}
                    {item.userModified?.name}{' '}
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
