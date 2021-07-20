import { Layout, Button, notification } from 'antd'
import { MainMenu } from './menu'
import { AppRouters } from './routers'
import { BrowserRouter as Router } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import UserStore from 'stores/user'
import socketIoClient from 'socket.io-client'
import { BASE_URL } from 'stores/connection'
import { observer } from 'mobx-react-lite'
import { Login } from './login'

export const App = observer(() => {
    const userStore = useContext(UserStore)
    const [collapsed, setCollapsed] = useState(false)
    const { Header, Footer, Sider, Content } = Layout

    const serverNotification = (req: any) => {
        notification.open({
            message: 'Server',
            description: req.message,
        })
    }

    useEffect(() => {
        const socket = socketIoClient(BASE_URL)
        socket.on('NombreCanal', (req) => {
            serverNotification(req)
        })
        if (!userStore.isLogged) userStore.checkSession()
    }, [userStore])

    return (
        <Router>
            <Layout>
                <Header style={{ height: '3em' }}>
                    <MenuOutlined
                        onClick={() => setCollapsed(() => !collapsed)}
                    />{' '}
                    PDA
                    {userStore.isLogged && (
                        <div style={{ float: 'right' }}>
                            <Button
                                onClick={async () => {
                                    await userStore.logout()
                                }}
                            >
                                Desconectar
                            </Button>
                        </div>
                    )}
                </Header>
                <Layout>
                    {userStore.isLogged && (
                        <Sider style={{}} collapsed={collapsed}>
                            <MainMenu />
                        </Sider>
                    )}
                    <Content>
                        {userStore.isLogged && <AppRouters />}
                        {!userStore.isLogged && <Login />}
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    PDA Argentina 2021
                </Footer>
            </Layout>
        </Router>
    )
})
