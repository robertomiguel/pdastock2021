import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductCategoryStore from '../../../../stores/productCategory'

import { useContext } from 'react'

interface IFormActionProps {
    id: string
}

export const FormAction = (props: IFormActionProps) => {
    const prodCategoryStore = useContext(ProductCategoryStore)

    return (
        <div>
            <Button
                type="link"
                onClick={async () => {
                    await prodCategoryStore.getById(props.id)
                    prodCategoryStore.openEditor = true
                    console.log(props.id)
                }}
            >
                <EditOutlined style={{ color: 'white' }} />
            </Button>

            <Popconfirm
                okText="Eliminar"
                cancelText="Cancelar"
                onConfirm={async () => {
                    prodCategoryStore.isLoading = true
                    await prodCategoryStore.deleteById(props.id)
                    await prodCategoryStore.getList()
                    prodCategoryStore.isLoading = false
                }}
                title="Confirmar eliminación"
            >
                <DeleteOutlined style={{ color: 'white' }} />
            </Popconfirm>
        </div>
    )
}
