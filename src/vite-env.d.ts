/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_USER_POOL_CLIENT_ID: string
  readonly VITE_USER_POOL_ID: string
  readonly VITE_BASE_URL: string
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_API_BEARER: string
  readonly VITE_API_HOST: string
  readonly VITE_CLOUDFLARE_ACCOUNT_ID: string
  readonly VITE_CLOUDFLARE_ACCESS_KEY_ID: string
  readonly VITE_CLOUDFLARE_SECRET_ACCESS_KEY: string
  readonly VITE_CLOUDFLARE_BUCKET: string
  readonly VITE_CLOUDFLARE_PUBLIC_URL: string
  readonly VITE_CLOUDFLARE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}