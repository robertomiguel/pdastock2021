import { Pagination } from 'antd'
import { formatNumber } from 'common/formatNumber'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ProductStore, { IProductStore } from 'stores/product'

export const PaginationForm = observer(() => {
    const componentStore = useContext<IProductStore>(ProductStore)

    return (
        <Pagination
            {...componentStore.pagination}
            disabled={componentStore.isLoading}
            onChange={async (pag) => {
                componentStore.pagination.current = pag
                componentStore.isLoading = true
                await componentStore.getList(componentStore.filter)
                componentStore.isLoading = false
            }}
            showTotal={(total) => (
                <span style={{ fontWeight: 'bold' }}>
                    Total: {formatNumber(total)}
                </span>
            )}
            showSizeChanger={false}
            style={{ textAlign: 'center' }}
        />
    )
})
