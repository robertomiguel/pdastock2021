import { Tabs } from 'antd'
import { AdminUserList } from './list'

export const AdminUser = () => {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1" tabPosition="left" >
      <TabPane tab="Listado" key="1">
        <AdminUserList />
      </TabPane>
      <TabPane tab="Roles" key="2">
        Lista / Crea / Modifica Roles de Usuarios
      </TabPane>
      <TabPane tab="Permisos" key="3">
        Configura permisos de usuarios
      </TabPane>
    </Tabs>
  );
};
