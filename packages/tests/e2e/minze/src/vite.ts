import { modules } from './main'

Object.values(modules).forEach((m) => {
  (m as Record<string, () => void>).run()
})
