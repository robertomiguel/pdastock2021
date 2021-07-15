import { Button } from 'antd'
import ProductStore, { IProductStore } from 'stores/product'
import { useContext } from 'react'
import InvoiceStore, { IInvoiceStore } from 'stores/invoice'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const prodStore = useContext<IProductStore>(ProductStore)
    const invoiceStore = useContext<IInvoiceStore>(InvoiceStore)

    return (
        <div>
            <Button
                type="primary"
                onClick={async () => {
                    Object.assign(invoiceStore.item.concept, {
                        conceptType: undefined,
                        detail: 'detalle de la selecc',
                        amount: 1000,
                    })
                    prodStore.openEditor = false
                }}
            >
                Agregar
            </Button>
        </div>
    )
}
