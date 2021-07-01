import { Tabs } from 'antd'
import { AdminUser } from './user'
import { AdminProduct } from './product'
import { generateId } from '../common/generateId'

export const Admin = () => {
    const { TabPane } = Tabs

    return (
        <Tabs>
            <TabPane key={generateId()} tab="Usuarios">
                <AdminUser />
            </TabPane>
            <TabPane key={generateId()} tab="Productos">
                <AdminProduct />
            </TabPane>
            <TabPane key={generateId()} tab="Caja">
                Caja
            </TabPane>
            <TabPane key={generateId()} tab="Dashboard">
                Dashboard
            </TabPane>
            <TabPane key={generateId()} tab="Generales">
                Generales
            </TabPane>
        </Tabs>
    )
}
