import path from 'path'
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
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
      proxy: {
        '/api': {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api-json': {
          target: `${env.VITE_API_HOST}/api-json`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-json/, ''),
          headers: {
            accept: 'application/json',
          },
        },
      }
    },
  })
}
