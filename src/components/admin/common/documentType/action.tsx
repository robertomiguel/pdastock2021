import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import DocumentTypeStore from '../../../../stores/documentType'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const documentTypeStore = useContext(DocumentTypeStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await documentTypeStore.getById(props.id)
                    documentTypeStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    documentTypeStore.isLoading = true
                    await documentTypeStore.deleteById(props.id)
                    await documentTypeStore.getList()
                    documentTypeStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
