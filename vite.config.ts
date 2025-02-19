import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This enables network access
    port: 3000,  // Optional: specify a port
    strictPort: true, // Optional: fail if port is already in use
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  }
})
