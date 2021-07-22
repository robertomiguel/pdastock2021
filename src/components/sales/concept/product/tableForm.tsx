import { Table } from 'antd'
import { useCallback, useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import ProductStore, { IProductStore } from 'stores/product'
import ProdStatusStore from 'stores/productStatus'
import { observer } from 'mobx-react-lite'

export const TableForm = observer((props: { selector: boolean }) => {
    const prodStore = useContext<IProductStore>(ProductStore)
    const prodStatusStore = useContext(ProdStatusStore)

    const getList = useCallback(async () => {
        const availableStatus = await prodStatusStore.getList({
            isAvailableForSale: true,
        })
        const status = {
            status: { $in: availableStatus.map((s) => s._id) },
        }
        prodStore.getList(status)
        prodStore.filter = status
    }, [prodStore, prodStatusStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div style={{ padding: '1em' }}>
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
