import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  define: {
    global: 'window',
  },
  server: {

    cors: {
      //https://karasu-lab-storage.dc4a5b8ffc2d999e39e9f9509bb4f9af.r2.cloudflarestorage.com/karasu-lab-storage/
      origin: 'https://karasu-lab-storage.dc4a5b8ffc2d999e39e9f9509bb4f9af.r2.cloudflarestorage.com',
      allowedHeaders: 'Authorization, Content-Type, Access-Control-Allow-Origin',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
  }
})
