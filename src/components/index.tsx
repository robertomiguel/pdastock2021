import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin } from "./admin";
import { Customer } from "./customer";
import { Dashboard } from "./dashboard";
import { Login } from "./login";
import { Sales } from "./sales";
import { Stock } from "./stock";
import { Supplier } from "./supplier";

import { Layout } from "antd";
import { Menu } from "./menu";

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
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/sales" component={Sales} />
              <Route exact path="/sales/:id" component={Sales} />
              <Route exact path="/stock" component={Stock} />
              <Route exact path="/stock/:id" component={Stock} />
              <Route exact path="/customer" component={Customer} />
              <Route exact path="/customer/:id" component={Customer} />
              <Route exact path="/supplier" component={Supplier} />
              <Route exact path="/supplier/:id" component={Supplier} />
              <Route exact path="/admin" component={Admin} />
              <Route path="*" component={Dashboard} />
            </Switch>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>PDA Argentina 2021</Footer>
      </Layout>
    </Router>
  );
};
