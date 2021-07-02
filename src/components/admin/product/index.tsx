import { Tabs } from 'antd'
import { AdminProductStatus } from './status'
import { AdminProductCategory } from './category'

export const AdminProduct = () => {
    const { TabPane } = Tabs

    return (
        <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Estados" key="1">
                <AdminProductStatus />
            </TabPane>
            <TabPane tab="Categorías" key="2">
                <AdminProductCategory />
            </TabPane>
            <TabPane tab="Almacenamiento" key="3">
                Galpones
            </TabPane>
        </Tabs>
    )
}
