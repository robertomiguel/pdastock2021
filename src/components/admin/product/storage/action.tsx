import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductStorageStore from '../../../../stores/productStorage'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const prodStorageStore = useContext(ProductStorageStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await prodStorageStore.getById(props.id)
                    prodStorageStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    prodStorageStore.isLoading = true
                    await prodStorageStore.deleteById(props.id)
                    await prodStorageStore.getList()
                    prodStorageStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
