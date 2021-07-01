import { Pagination } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ProductStore from '../../stores/product'

export const formatNumber = (num: any) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const PaginationForm = observer(() => {
    const prodStore = useContext(ProductStore)

    return (
        <Pagination
            {...prodStore.pagination}
            disabled={prodStore.isLoading}
            onChange={async (pag) => {
                prodStore.pagination.current = pag
                prodStore.isLoading = true
                await prodStore.getList()
                prodStore.isLoading = false
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
