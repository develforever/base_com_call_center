import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/_globals.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,         // Pozwala na dostęp spoza kontenera
    port: 5173,         // Port wewnątrz kontenera
    watch: {
      usePolling: true, // Niezbędne, jeśli Docker działa na Windows/macOS (problemy z eventami systemu plików)
    },
    hmr: {
      clientPort: 8080, // Przeglądarka łączy się przez Nginx na tym porcie
    },
  },
})
