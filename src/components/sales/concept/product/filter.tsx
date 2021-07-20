import {Button, DatePicker, Form, Input, Select} from "antd"

export const FilterForm = () => {

    return <Form layout="vertical" >
    <div style={{
        marginTop: 0,
        paddingTop: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    }}>
            <Form.Item name="code" label="Código" style={{ width: '20%', display: 'inline-block' }}  >
                <Input />
            </Form.Item>
            
            <Form.Item name="nameModel" label="Nombre / Modelo" style={{ width: '20%', display: 'inline-block' }}  >
                <Input />
            </Form.Item>

            <Form.Item name="category" label="Categoría" style={{ width: '20%', display: 'inline-block' }}  >
                <Select />
            </Form.Item>

            <Form.Item name="created" label="created" style={{ width: '20%', display: 'inline-block' }}  >
                <DatePicker style={{width: '100%'}} />
            </Form.Item>
        </div>
            <div style={{width:'100%', display: 'block', textAlign:'right'}} >
            <Form.Item style={{margin: 0, padding: 0}} >
                <Button type="primary" htmlType="submit">Aplicar</Button>
                <Button type="link" htmlType="reset" >Limpiar</Button>
            </Form.Item>
            </div>
    </Form>
}