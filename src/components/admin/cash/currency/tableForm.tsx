import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import CurrencyStore from '../../../../stores/currency'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const currencyStore = useContext(CurrencyStore)

    const getList = useCallback(async () => {
        await currencyStore.getList()
    }, [currencyStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em', maxWidth: '1080px' }}>
            <EditorForm />
            <Button
                type="primary"
                onClick={async () => {
                    currencyStore.item = {}
                    currencyStore.openEditor = true
                }}
            >
                Nuevo
            </Button>
            <Table
                loading={currencyStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={currencyStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (currencyStore.sort.field === sorter.field)
                        currencyStore.sort.sorted =
                            currencyStore.sort.sorted * -1
                    else
                        currencyStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await currencyStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
