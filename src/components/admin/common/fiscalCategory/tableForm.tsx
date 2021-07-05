import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import FiscalCategoryStore from '../../../../stores/fiscalCategory'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const fiscalCategoryStore = useContext(FiscalCategoryStore)

    const getList = useCallback(async () => {
        await fiscalCategoryStore.getList()
    }, [fiscalCategoryStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '1080px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    fiscalCategoryStore.item = {}
                    fiscalCategoryStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={fiscalCategoryStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={fiscalCategoryStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (fiscalCategoryStore.sort.field === sorter.field)
                        fiscalCategoryStore.sort.sorted =
                            fiscalCategoryStore.sort.sorted * -1
                    else
                        fiscalCategoryStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await fiscalCategoryStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
