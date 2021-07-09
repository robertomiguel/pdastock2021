import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import {
    BarChartOutlined,
    SettingOutlined,
    ShoppingOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    TabletOutlined,
    BookOutlined,
} from '@ant-design/icons'

export const MainMenu = () => {
    return (
        <Menu mode="inline" theme="dark" inlineCollapsed={true}>
            <Menu.Item icon={<BarChartOutlined />}>
                <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item icon={<ShoppingCartOutlined />}>
                <NavLink to="/sales">Caja</NavLink>
            </Menu.Item>
            <Menu.Item icon={<TabletOutlined />}>
                <NavLink to="/stock">Productos</NavLink>
            </Menu.Item>
            <Menu.Item icon={<TeamOutlined />}>
                <NavLink to="/customer">Clientes</NavLink>
            </Menu.Item>
            <Menu.Item icon={<ShoppingOutlined />}>
                <NavLink to="/supplier">Proveedores</NavLink>
            </Menu.Item>
            <Menu.Item icon={<BookOutlined />}>
                <NavLink to="/bookSale">Libro de ventas</NavLink>
            </Menu.Item>
            <Menu.Item icon={<SettingOutlined />}>
                <NavLink to="/admin">Configuración</NavLink>
            </Menu.Item>
        </Menu>
    )
}
