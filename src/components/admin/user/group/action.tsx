import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UserGroupStore from '../../../../stores/userGroup'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const userGroupStore = useContext(UserGroupStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await userGroupStore.getById(props.id)
                    userGroupStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    userGroupStore.isLoading = true
                    await userGroupStore.deleteById(props.id)
                    await userGroupStore.getList()
                    userGroupStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
