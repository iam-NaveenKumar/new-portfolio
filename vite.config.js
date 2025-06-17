import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/new-portfolio/', // 👈 change this!
  plugins: [react()],
})
