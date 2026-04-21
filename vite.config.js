import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: Change 'Portfolio' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
