import './assets/vite.css'
import Minze from 'minze'
import * as Elements from './module'

Minze.defineAll(Elements)

// component define method
import { MinzeDefine } from './lib/minze-define'
MinzeDefine.define()
