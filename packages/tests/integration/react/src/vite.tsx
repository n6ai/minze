import ReactDOM from 'react-dom'
import App from './App'

import { modules, defineAll } from './main'
defineAll(modules)

ReactDOM.render(<App />, document.getElementById('app'))
