import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ProductStore, { IProductStore } from 'stores/product'
import { FilterForm } from './filter'
import { PaginationForm } from './paginator'
import { TableForm } from './tableForm'

export const ProductSelect = observer(() => {
    const productStore = useContext<IProductStore>(ProductStore)

    return (
        <Modal
            title="Seleccionar producto"
            visible={productStore.openEditor}
            onOk={() => (productStore.openEditor = false)}
            onCancel={() => (productStore.openEditor = false)}
            okText="Agregar"
            cancelText="Cerrar"
            width={1000}
            maskStyle={{ backgroundColor: 'orange', opacity: 0.3 }}
            style={{
                top: 20,
                left: '25%',
                right: '25%',
                position: 'absolute',
            }}
        >
            <FilterForm />
            <TableForm selector />
            <PaginationForm />
        </Modal>
    )
})
