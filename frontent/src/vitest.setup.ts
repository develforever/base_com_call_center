import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { ref } from 'vue'
import PrimeVue from 'primevue/config'
import { createTestingPinia } from '@pinia/testing'

export const mockRoute = {
  query: {},
  params: {},
  path: '/',
  fullPath: '/',
}

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  currentRoute: ref({
    path: '/',
    query: {},
    params: {},
    fullPath: '/',
  }),
}

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>()
  return {
    ...actual,
    useRoute: () => mockRoute,
    useRouter: () => mockRouter,
  }
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.stubGlobal('fetch', vi.fn())

beforeEach(() => {
  vi.clearAllMocks()
  mockRoute.query = {}
  mockRoute.params = {}
  mockRoute.path = '/'
  mockRouter.currentRoute.value.path = '/'

  vi.mocked(fetch).mockReset()
})

config.global.plugins = [
  PrimeVue,
  createTestingPinia({
    createSpy: vi.fn,
    stubActions: false,
  }),
]

config.global.components = {
  'router-link': { template: '<a><slot /></a>' },
  RouterLink: { template: '<a><slot /></a>' },
  'router-view': { template: '<slot />' },
  RouterView: { template: '<slot />' },
}

config.global.stubs = {
  // 'Menubar': { template: '<div><slot /></div>' },
  // 'DataTable': { template: '<div><slot /></div>' }
}

config.global.mocks = {}
