import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
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
                style={{ padding: 0 }}
                type="link"
                onClick={async () => {
                    await prodStore.getById(props.id)
                    prodStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EyeOutlined style={{ color: 'white' }} />
            </Button>

            <Button
                type="link"
                onClick={async () => {
                    await prodStore.getById(props.id)
                    prodStore.openEditor = true
                    console.log(props.id)
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
