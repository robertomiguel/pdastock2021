import { ColumnsType } from 'antd/lib/table'
import { FormAction } from './action'
import { IFiscalCategoryType } from '../../../../stores/fiscalCategory'
import { generateId } from 'common/generateId'

export const columnsForm: ColumnsType<Partial<IFiscalCategoryType>> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: generateId(),
        sorter: true,
    },
    {
        title: 'Nombre abreviado',
        dataIndex: 'shortname',
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
