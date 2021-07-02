import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductStorageStore from '../../../../stores/productStorage'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const prodStorageStore = useContext(ProductStorageStore)

    const getList = useCallback(async () => {
        await prodStorageStore.getList()
    }, [prodStorageStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '600px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    prodStorageStore.item = {}
                    prodStorageStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={prodStorageStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={prodStorageStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (prodStorageStore.sort.field === sorter.field)
                        prodStorageStore.sort.sorted =
                            prodStorageStore.sort.sorted * -1
                    else
                        prodStorageStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await prodStorageStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
