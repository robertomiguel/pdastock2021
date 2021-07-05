import { Tabs } from 'antd'
import { AdminDocumentTypeList } from './documentType'
import {AdminFiscalCategoryList} from './fiscalCategory'
export const AdminCommon = () => {
    const { TabPane } = Tabs

    return (
        <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Tipo de documento" key="1322">
                <AdminDocumentTypeList />
            </TabPane>
            <TabPane tab="Condición Fiscal" key="1321">
                <AdminFiscalCategoryList />
            </TabPane>
        </Tabs>
    )
}
