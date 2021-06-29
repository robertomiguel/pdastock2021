import { Button } from 'antd'
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
                    console.log(props.id)
                }}
            >
                <EditOutlined />
            </Button>
            <Button type="link">
                <DeleteOutlined />
            </Button>
        </div>
    )
}
