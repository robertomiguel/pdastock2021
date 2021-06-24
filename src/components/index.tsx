import { Layout } from "antd";
import { Menu } from "./menu";
import { AppRouters } from "./routers";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Router>
      <Layout>
        <Header style={{ backgroundColor: "AppWorkspace" }}>Header</Header>
        <Layout>
          <Sider style={{ backgroundColor: "AppWorkspace" }}>
            <Menu />
          </Sider>
          <Content>
            <AppRouters />
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>PDA Argentina 2021</Footer>
      </Layout>
    </Router>
  );
};
