import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Transpile to ES2015 so react-snap's old Chromium 69 can execute the bundle
    target: 'es2015',
    cssTarget: 'chrome61',
  },
})
