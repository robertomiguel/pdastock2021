import { Table } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductStore from '../../stores/product'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor/index'

export const TableForm = observer(() => {
    const prodStore = useContext(ProductStore)
    useEffect(() => {
        prodStore.isLoading = true
        prodStore.select = 'status model details.imei price'
        prodStore.getList().then(() => (prodStore.isLoading = false))
    }, [prodStore])

    return (
        <div>
            <EditorForm />
            <Table
                loading={prodStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={prodStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (prodStore.sort.field === sorter.field)
                        prodStore.sort.sorted = prodStore.sort.sorted * -1
                    else
                        prodStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await prodStore.getList()
                }}
            />
        </div>
    )
})
