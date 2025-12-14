import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Match GitHub repo slug for Pages so assets resolve correctly
  base: '/Dsa-playgroud/',
})