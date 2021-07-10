import { Tabs } from 'antd'
import { AdminUser } from './user'
import { AdminProduct } from './product'
import { AdminCash } from './cash'
import { AdminCommon } from './common'
import { AdminInvoice } from './invoice'
import { generateId } from 'common/generateId'
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
                <AdminCash />
            </TabPane>
            <TabPane key={generateId()} tab="Comprobantes">
                <AdminInvoice />
            </TabPane>
            <TabPane key={generateId()} tab="Dashboard">
                Dashboard
            </TabPane>
            <TabPane key={generateId()} tab="Generales">
                <AdminCommon />
            </TabPane>
        </Tabs>
    )
}
