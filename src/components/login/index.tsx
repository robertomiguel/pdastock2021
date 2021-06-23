import { Button, Input, Form } from "antd"

export const Login = () => {

    return <div>
        <Form layout="vertical" style={{width:'400px'}} >
            <Form.Item name="username" label="Usuario" >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="password" >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button>Iniciar sesión</Button>
            </Form.Item>
        </Form>
    </div>
}