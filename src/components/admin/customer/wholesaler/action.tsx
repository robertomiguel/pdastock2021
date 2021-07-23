import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import WholesalerStore from 'stores/wholesaler'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const componentStore = useContext(WholesalerStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await componentStore.getById(props.id)
                    componentStore.list = [componentStore.item]
                    componentStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Quitar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    componentStore.isLoading = true
                    await componentStore.deleteById(props.id)
                    await componentStore.getList()
                    componentStore.isLoading = false
                }}
                title="Confirmar"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
