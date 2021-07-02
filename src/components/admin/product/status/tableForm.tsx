import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductStatusStore from '../../../../stores/productStatus'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const prodStatusStore = useContext(ProductStatusStore)

    const getList = useCallback(async () => {
        await prodStatusStore.getList()
    }, [prodStatusStore])

    useEffect(() => {
        console.log('ejecuta getlist de status')
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '600px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    prodStatusStore.item = {}
                    prodStatusStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={prodStatusStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={prodStatusStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (prodStatusStore.sort.field === sorter.field)
                        prodStatusStore.sort.sorted =
                            prodStatusStore.sort.sorted * -1
                    else
                        prodStatusStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await prodStatusStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
