import { Tabs } from 'antd';
import { AdminUser } from './user';

export const Admin = () => {
    const { TabPane } = Tabs;
    
    return <Tabs defaultActiveKey="1" >
    <TabPane tab="Usuarios" key="1">
        <AdminUser/>
    </TabPane>
    <TabPane tab="Conceptos" key="2">
        Tipos de conceptos que se pueden facturar
    </TabPane>
    <TabPane tab="Caja" key="3">
      punto de venta / operaciones
    </TabPane>
    <TabPane tab="Dashboard" key="4">
      Config para los paneles de info
    </TabPane>
    <TabPane tab="Generales" key="5">
      otras opciones
    </TabPane>

  </Tabs>
}