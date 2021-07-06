import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CurrencyStore from '../../../../stores/currency'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const currencyStore = useContext(CurrencyStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await currencyStore.getById(props.id)
                    currencyStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    currencyStore.isLoading = true
                    await currencyStore.deleteById(props.id)
                    await currencyStore.getList()
                    currencyStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
