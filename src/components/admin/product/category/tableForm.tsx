import { Table, Button } from 'antd'
import { useCallback, useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductCategoryStore from '../../../../stores/productCategory'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'

export const TableForm = observer(() => {
    const prodCategoryStore = useContext(ProductCategoryStore)

    const getList = useCallback(async () => {
        await prodCategoryStore.getList()
    }, [prodCategoryStore])

    useEffect(() => {
        console.log('ejecuta getlist de status')
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '600px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={() => {
                    prodCategoryStore.item = {}
                    prodCategoryStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={prodCategoryStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={prodCategoryStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (prodCategoryStore.sort.field === sorter.field)
                        prodCategoryStore.sort.sorted =
                            prodCategoryStore.sort.sorted * -1
                    else
                        prodCategoryStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await prodCategoryStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
