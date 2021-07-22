import { Button, Collapse } from 'antd'
import { ConceptInvoiceList } from './list'
import { ProductSelect } from './product'
import ProductStore, { IProductStore } from 'stores/product'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import ConceptType, { IConceptTypeStore } from 'stores/conceptType'

export const InvoiceConcept = () => {
    const productStore = useContext<IProductStore>(ProductStore)
    const conceptTypeStore = useContext<IConceptTypeStore>(ConceptType)
    const { Panel } = Collapse

    const getProductConcept = useCallback(async () => {
        const conceptProduct = await conceptTypeStore.getList({name: 'Producto'})
        console.log('concept prod ', conceptProduct)
        
        productStore.concept = {}
    },[productStore, conceptTypeStore])
    
    useEffect(()=>{
        getProductConcept()
    },[getProductConcept])

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
