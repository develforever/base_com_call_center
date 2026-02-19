import type { Feature } from '../features'
import { routes } from './router'

const ticketsFeature: Feature = {
  name: 'tickets',
  routes,
}

export { ticketsFeature as feature }
