import { observer } from 'mobx-react-lite'
import { Route, RouteProps } from 'react-router-dom'

export const PrivateRouter = observer((props: RouteProps) => {
    return <Route {...props} />
})
