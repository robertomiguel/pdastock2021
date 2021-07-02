import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UserStore from '../../../../stores/user'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const userStore = useContext(UserStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await userStore.getById(props.id)
                    userStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    userStore.isLoading = true
                    await userStore.deleteById(props.id)
                    await userStore.getList()
                    userStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
