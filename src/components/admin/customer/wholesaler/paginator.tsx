import { Pagination } from 'antd'
import { formatNumber } from 'common/formatNumber'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ProductStore from 'stores/product'

export const PaginationForm = observer(() => {
    const componentStore = useContext(ProductStore)

    return (
        <Pagination
            {...componentStore.pagination}
            disabled={componentStore.isLoading}
            onChange={async (pag) => {
                componentStore.pagination.current = pag
                componentStore.isLoading = true
                await componentStore.getList()
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
