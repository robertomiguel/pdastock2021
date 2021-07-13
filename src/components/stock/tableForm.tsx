import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductStore from '../../stores/product'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor/index'

export const TableForm = observer((props: { selector: boolean }) => {
    const prodStore = useContext(ProductStore)
    useEffect(() => {
        prodStore.isLoading = true
        prodStore.select = ''
        prodStore.getList().then(() => (prodStore.isLoading = false))
    }, [prodStore])

    return (
        <div style={{ padding: '1em' }}>
            {!props.selector && (
                <div>
                    <EditorForm />
                    <Button
                        type="primary"
                        onClick={() => {
                            prodStore.item = {}
                            prodStore.openEditor = true
                        }}
                    >
                        Nuevo
                    </Button>
                </div>
            )}
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
                showSorterTooltip={false}
            />
        </div>
    )
})
