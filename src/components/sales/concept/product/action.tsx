import { Button } from 'antd'
import ProductStore, { IProduct, IProductStore } from 'stores/product'
import { useContext } from 'react'
import InvoiceStore, { IInvoiceStore } from 'stores/invoice'
import { DeepPartial } from 'common/types'

interface IFormActionProps {
    product: DeepPartial<IProduct>
}

export const FormAction = (props: IFormActionProps) => {
    const prodStore = useContext<IProductStore>(ProductStore)
    const invoiceStore = useContext<IInvoiceStore>(InvoiceStore)

    return (
        <div>
            <Button
                type="primary"
                onClick={async () => {
                    
                    if (invoiceStore.item && invoiceStore.item.concept) {
                        Object.assign(invoiceStore.item.concept, {
                            conceptType: undefined,
                            detail: 'detalle de la selecc',
                            amount: 1000,
                        })
                    } else {
                        Object.assign(invoiceStore.item, {concept: [{
                            conceptType: prodStore.concept,
                            detail: props.product.name,
                            amount: 1000,
                        }]})
                    }
                    console.log('concept item: ', invoiceStore.item);
                    prodStore.openEditor = false
                }}
            >
                Agregar
            </Button>
        </div>
    )
}
