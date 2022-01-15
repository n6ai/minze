import Minze from 'minze'
import * as Elements from './module'
import ReactDOM from 'react-dom'
import App from './App'

Minze.defineAll(Elements)

ReactDOM.render(<App />, document.getElementById('app'))
