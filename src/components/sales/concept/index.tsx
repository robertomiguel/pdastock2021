import { Button, Collapse } from 'antd'
import { ConceptInvoiceList } from './list'
import { ProductSelect } from './product'
import ProductStore, { IProductStore } from 'stores/product'
import { useContext } from 'react'

export const InvoiceConcept = () => {
    const productStore = useContext<IProductStore>(ProductStore)
    const { Panel } = Collapse

    return (
        <Collapse activeKey={['1-12']}>
            <Panel
                header={
                    <Button onClick={() => (productStore.openEditor = true)}>
                        Agregar producto
                    </Button>
                }
                key="1-12"
            >
                <ProductSelect />
                <ConceptInvoiceList />
            </Panel>
        </Collapse>
    )
}
