import { Tabs } from 'antd'
import { AdminWolesalerList } from './wholesaler'

export const AdminCustomer = () => {
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1" tabPosition="left" >
      <TabPane tab="Gremio" key="1">
        <AdminWolesalerList />
      </TabPane>
    </Tabs>
  );
};
