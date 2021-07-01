import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductStatusStore from '../../../../stores/productStatus'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const prodStatusStore = useContext(ProductStatusStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await prodStatusStore.getById(props.id)
                    prodStatusStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    prodStatusStore.isLoading = true
                    await prodStatusStore.deleteById(props.id)
                    await prodStatusStore.getList()
                    prodStatusStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
