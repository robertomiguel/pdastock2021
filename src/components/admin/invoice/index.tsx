import { Tabs } from 'antd'
import { AdminInvoiceTypeList } from './type'
import { AdminConceptTypeList } from './conceptType'
import { AdminInvoiceStatusList } from './status'
import { AdminInvoiceAccountList } from './account'
import { generateId } from 'common/generateId'

export const AdminInvoice = () => {
    const { TabPane } = Tabs

    return (
        <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Tipos de comprobantes" key={generateId()}>
                <AdminInvoiceTypeList />
            </TabPane>
            <TabPane tab="Estados de comprobantes" key={generateId()}>
                <AdminInvoiceStatusList />
            </TabPane>
            <TabPane tab="Tipos de conceptos" key={generateId()}>
                <AdminConceptTypeList />
            </TabPane>
            <TabPane tab="Cuentas de facturación" key={generateId()}>
                <AdminInvoiceAccountList />
            </TabPane>
        </Tabs>
    )
}
