import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // Comment out base for local testing
  // base: '/TechRelay/',  
  plugins: [react()],
  assetsInclude: ['**/*.mp4'],
  publicDir: 'public',
  server: {
    host: true, // Add this to expose to all network interfaces
    port: 5173  // Default port, you can change if needed
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // ... other existing config ...
}) 