import { Switch, Route } from 'react-router-dom'
import { Admin } from './admin'
import { Customer } from './customer'
import { Dashboard } from './dashboard'
import { Login } from './login'
import { PrivateRouter } from './privateRouter'
import { Sales } from './sales'
import { Stock } from './stock'
import { Supplier } from './supplier'

export const AppRouters = () => {
    return (
        <div>
            <Switch>
                <PrivateRouter exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <PrivateRouter exact path="/sales" component={Sales} />
                <PrivateRouter exact path="/sales" component={Sales} />
                <PrivateRouter exact path="/stock" component={Stock} />
                <PrivateRouter exact path="/stock" component={Stock} />
                <PrivateRouter exact path="/customer" component={Customer} />
                <PrivateRouter exact path="/customer" component={Customer} />
                <PrivateRouter exact path="/supplier" component={Supplier} />
                <PrivateRouter exact path="/supplier" component={Supplier} />
                <PrivateRouter exact path="/admin" component={Admin} />
                <Route path="*" component={Dashboard} />
            </Switch>
        </div>
    )
}
