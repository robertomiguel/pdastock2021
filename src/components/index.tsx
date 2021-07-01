import { Layout } from 'antd'
import { MainMenu } from './menu'
import { AppRouters } from './routers'
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'

export const App = () => {
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
