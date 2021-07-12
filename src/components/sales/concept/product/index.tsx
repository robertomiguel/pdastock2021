import { Modal } from 'antd'
import { Stock } from 'components/stock'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import ProductStore, { IProductStore } from 'stores/product'

export const ProductSelect = observer(() => {
    const productStore = useContext<IProductStore>(ProductStore)

    return (
        <Modal
            title="Modal 1000px width"
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
            <Stock selector />
        </Modal>
    )
})
