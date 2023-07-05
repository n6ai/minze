import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

// component define method
import { MinzeDefine } from './lib/minze-define'
MinzeDefine.define()
