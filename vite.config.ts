import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/engine': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/garage': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/winners': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
