import { feature as ticketsFeature } from '@/features/tickets/feature'
import type { RouteRecordRaw } from 'vue-router'

export interface Feature {
  name: string
  routes: RouteRecordRaw[]
}

const features: Feature[] = []

features.push(ticketsFeature)

export { features }
