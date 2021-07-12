import { Table } from 'antd'
import { useContext, useEffect } from 'react'
import { columnsForm } from './columns'
import InvoiceStore, { IInvoiceStore } from 'stores/invoice'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
export const TableForm = observer(() => {
    const componentStore = useContext<IInvoiceStore>(InvoiceStore)

    const getList = useCallback(async () => {
        await componentStore.getList()
    }, [componentStore])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div>
            <Table
                loading={componentStore.isLoading}
                style={{ width: '100%' }}
                columns={columnsForm}
                dataSource={componentStore.item.concept}
                size="middle"
                pagination={false}
                showSorterTooltip={false}
            />
        </div>
    )
})
