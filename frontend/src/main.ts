import { createApp, type Plugin } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import App from '@/App.vue'
import router from '@/router'
import authPlugin from './router/authPlugin'

import 'primeicons/primeicons.css'
import '@/assets/tailwind.css'
import '@/assets/main.scss'
import { ConfirmationService } from 'primevue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ConfirmationService);
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.use(authPlugin, { router });

app.mount('#call-center')
