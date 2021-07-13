import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductStore from '../../../stores/product'
import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const prodStore = useContext(ProductStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await prodStore.getById(props.id)
                    prodStore.openEditor = true
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    prodStore.isLoading = true
                    await prodStore.deleteById(props.id)
                    await prodStore.getList()
                    prodStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
