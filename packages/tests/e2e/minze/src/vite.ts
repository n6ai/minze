import { modules } from './main'

Object.values(modules).forEach((m) => {
  // prettier-ignore
  (m as Record<string, () => void>).run()
})
