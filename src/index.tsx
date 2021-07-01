import ReactDOM from 'react-dom'
import { App } from './components'
// import 'antd/dist/antd.css'
import { configure } from 'mobx'
import './index.less'

configure({
    enforceActions: 'never',
})
ReactDOM.render(<App />, document.getElementById('root'))
