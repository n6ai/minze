import { Minze } from 'minze'
const modules = import.meta.glob('./lib/**/*.js')
const defineAll = Minze.defineAll

export { modules as default, modules, defineAll }
