import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import UserStore from '../stores/user'

export const PrivateRouter = observer((props: RouteProps) => {
    const userStore = useContext(UserStore)

    if (!userStore.isLogged) return <Redirect to="/login" />

    return <Route {...props} />
})
