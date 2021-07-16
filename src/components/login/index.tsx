import { Button, Input, Form } from "antd"
import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Redirect } from "react-router"
import UserStore, { ILoginCredential, IUserStore } from "stores/user"

export const Login = () => {
    const userStore = useContext<IUserStore>(UserStore)
    const [isLogged, setIsLogger] = useState<boolean>(false)

    const checkSession = useCallback(async ()=>{
        const status = await userStore.checkSession()
        setIsLogger(()=>status)
    },[userStore])
        useEffect(()=>{
        checkSession()
    },[checkSession])

    const ruleRequire = [{required: true}, {message: 'Requerido'}]

    return isLogged ? <div>
        <Form layout="vertical" style={{width:'400px'}}
            onFinish={async (value: ILoginCredential) => {
                await userStore.login(value)
            }}
        
        >
            <Form.Item name="username" label="Usuario" rules={ruleRequire} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="password" >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" >Iniciar sesión</Button>
            </Form.Item>
        </Form>
    </div>: <Redirect to="/dashboard" />
}