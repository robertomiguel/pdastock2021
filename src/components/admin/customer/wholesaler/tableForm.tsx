import { Table, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import { observer } from 'mobx-react-lite'
import { EditorForm } from './editor'
import WholesalerStore, { IWholesalerStore } from 'stores/wholesaler'
import { useCallback } from 'react'

export const TableForm = observer(() => {
    const componentStore = useContext<IWholesalerStore>(WholesalerStore)

    const getList = useCallback(async ()=>{
        await componentStore.getList()
    },[componentStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em' }}>

                <div>
                    <EditorForm />
                    <Button
                        type="primary"
                        onClick={() => {
                            componentStore.item = {}
                            componentStore.openEditor = true
                        }}
                    >
                        Nuevo
                    </Button>
                </div>

            <Table
                loading={componentStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={componentStore.list}
                size="middle"
                pagination={false}
                onChange={async (pagination, filters, sorter: any) => {
                    if (componentStore.sort.field === sorter.field)
                        componentStore.sort.sorted = componentStore.sort.sorted * -1
                    else
                        componentStore.sort = {
                            field: sorter.field,
                            sorted: 1,
                        }
                    await componentStore.getList()
                }}
                showSorterTooltip={false}
            />
        </div>
    )
})
