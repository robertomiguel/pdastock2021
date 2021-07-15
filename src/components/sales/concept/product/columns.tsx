import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { generateId } from 'common/generateId'
import { IProduct } from 'stores/product'
import { Tag } from 'antd'
import { dateTimeES } from 'common/dateTimeES'
import { formatNumber } from 'common/formatNumber'
export const columnsForm: ColumnsType<Partial<IProduct>> = [
    {
        title: 'Nombre / Modelo / Código',
        dataIndex: 'model',
        key: generateId(),
        sorter: true,
        render: (x: any, p: Partial<IProduct>) => (
            <div>
                <div>{p.name}</div>
                <div>{p.model}</div>
                <div style={{ fontSize: '.8em' }}>{p.code}</div>
            </div>
        ),
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        align: 'center',
        sorter: true,
        key: generateId(),
        render: (s) =>
            s && s.name ? (
                <div>
                    <Tag>{s.name}</Tag>
                    {s.isSold && <div>Cbte: 00000</div>}
                </div>
            ) : (
                ''
            ),
    },
    {
        title: 'Detalles',
        dataIndex: 'details',
        key: generateId(),
        sorter: true,
        align: 'left',
        render: (d) => (
            <div>
                <div>IMEI: {d.imei}</div>
                <div>Color: {d.color}</div>
                <div>Capacidad: {d.capacity}</div>
            </div>
        ),
    },
    {
        title: 'Precio de venta',
        dataIndex: 'price',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (p, prod: Partial<IProduct>) => (
            <div>
                <div>
                    Publico: {prod.currency?.symbol} {p.public} ($
                    {formatNumber(
                        p.public *
                            (prod.currency ? prod.currency?.rate.sale : 0)
                    )}
                    )
                </div>
                <div>
                    Gremio: {prod.currency?.symbol} {p.special} ($
                    {formatNumber(
                        p.special *
                            (prod.currency ? prod.currency?.rate.sale : 0)
                    )}
                    )
                </div>
            </div>
        ),
    },
    {
        title: 'Categoría',
        dataIndex: 'category',
        key: generateId(),
        sorter: true,
        align: 'right',
        render: (d) => d.name,
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
