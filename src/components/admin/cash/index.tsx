import { Tabs } from 'antd'
import { AdminCurrencyList } from './currency'
import { AdminPointOfSaleList } from './pointOfSale'

export const AdminCash = () => {
    const { TabPane } = Tabs

    return (
        <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Tipo de monedas" key="122">
                <AdminCurrencyList />
            </TabPane>
            <TabPane tab="Puesto de venta" key="121">
                <AdminPointOfSaleList />
            </TabPane>
        </Tabs>
    )
}
