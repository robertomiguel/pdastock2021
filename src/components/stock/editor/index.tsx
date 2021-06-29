import { Modal, InputNumber, FormInstance } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useRef, useState } from 'react'
import ProductStore from '../../../stores/product'
import { Form, Input } from 'antd'
import { generateId } from '../../common/generateId'
import { useEffect } from 'react'
import { SelectProductStatus } from './selectProdStatus'

// 'status model details.imei price'
const formModel = [
    {
        name: 'status._id',
        label: 'Estado',
        render: 'select',
    },
    {
        name: 'model',
        label: 'Modelo',
        render: 'text',
    },
    {
        name: 'details.imei',
        label: 'IMEI',
        render: 'text',
    },
    {
        name: 'price',
        label: 'Precio',
        render: 'number',
    },
]

export const EditorForm = observer(() => {
    const prodStore = useContext(ProductStore)
    const [defaultValue, setDefaultValue] = useState({})
    const [open, setOpen] = useState(false)

    const renders: { [index: string]: any } = {
        text: <Input />,
        number: <InputNumber />,
        select: <SelectProductStatus />,
    }

    useEffect(() => {
        if (prodStore.openEditor) {
            console.log('cargado de formulario edit/save')
            const defData = {}
            formModel.map((value: any) => {
                const v = value.name.split('.')
                if (v.length > 1)
                    return Object.assign(defData, {
                        [value.name]: prodStore.item[v[0]][v[1]],
                    })
                else
                    return Object.assign(defData, {
                        [value.name]: prodStore.item[value.name],
                    })
            })
            setDefaultValue(() => defData)
            setOpen(() => true)
        } else setOpen(() => false)
    }, [prodStore, prodStore.openEditor])

    const formRef = useRef<FormInstance>(null)

    return open ? (
        <Modal
            visible={true}
            destroyOnClose
            onCancel={() => (prodStore.openEditor = false)}
            title="Edior/New"
            onOk={() => formRef.current?.submit()}
        >
            <Form
                ref={formRef}
                layout="vertical"
                initialValues={defaultValue}
                onFinish={(value) => {
                    console.log('ok: ', value)
                }}
            >
                {formModel.map((item) => (
                    <Form.Item
                        key={generateId()}
                        label={item.label}
                        name={item.name}
                    >
                        {renders[item.render]}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    ) : (
        <></>
    )
})
