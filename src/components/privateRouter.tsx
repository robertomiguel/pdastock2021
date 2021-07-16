import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import UserStore from '../stores/user'

export const PrivateRouter = observer((props: RouteProps) => {
    const userStore = useContext(UserStore)

    return userStore.isLogged ? <Route {...props} />: <Redirect to="/login" />
})
