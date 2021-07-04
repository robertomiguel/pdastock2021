import { Layout, Button } from 'antd'
import { MainMenu } from './menu'
import { AppRouters } from './routers'
import { BrowserRouter as Router } from 'react-router-dom'
import { useContext, useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import UserStore from '../stores/user'

export const App = () => {
    const userStore = useContext(UserStore)
    const [collapsed, setCollapsed] = useState(false)
    const { Header, Footer, Sider, Content } = Layout

    return (
        <Router>
            <Layout>
                <Header style={{ height: '3em' }}>
                    <MenuOutlined
                        onClick={() => setCollapsed(() => !collapsed)}
                    />{' '}
                    PDA
                    <div style={{ float: 'right' }}>
                        <Button
                            onClick={async () => {
                                await userStore.login()
                            }}
                        >
                            Acceder
                        </Button>
                        <Button
                            onClick={async () => {
                                await userStore.logout()
                            }}
                        >
                            Desconectar
                        </Button>
                    </div>
                </Header>
                <Layout>
                    <Sider style={{}} collapsed={collapsed}>
                        <MainMenu />
                    </Sider>
                    <Content>
                        <AppRouters />
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    PDA Argentina 2021
                </Footer>
            </Layout>
        </Router>
    )
}
