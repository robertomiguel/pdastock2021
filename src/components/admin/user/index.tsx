import { Tabs } from 'antd'
import { AdminUserList } from './list'
import {AdminUserGroup} from './group'
export const AdminUser = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1" tabPosition="left" >
      <TabPane tab="Listado" key="1">
        <AdminUserList />
      </TabPane>
      <TabPane tab="Grupos" key="2">
        <AdminUserGroup />
      </TabPane>
    </Tabs>
  );
};
