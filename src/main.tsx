import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { handleServerError } from '@/utils/handle-server-error'
import { toast } from '@/hooks/use-toast'
import { ThemeProvider } from './context/theme-context'
import './index.css'
// Generated Routes
import { routeTree } from './routeTree.gen'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'

const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID
const USER_POOL_CLIENT_ID = import.meta.env.VITE_USER_POOL_CLIENT_ID
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN

Amplify.configure({
  Auth: {
    Cognito: {
      userAttributes: {
        email: {
          required: true,
        },
        nickname: {
          required: false,
        },
        picture: {
          required: false,
        },
      },
      userPoolId: USER_POOL_ID!,
      userPoolClientId: USER_POOL_CLIENT_ID!,
      loginWith: {
        email: true,
        oauth: {
          domain: `${VITE_AUTH_DOMAIN}`,
          providers: ['Google'],
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [`${VITE_BASE_URL}/sign-in`],
          redirectSignOut: [`${VITE_BASE_URL}/sign-out`],
          responseType: 'code'
        }
      }
    },
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast({
              variant: 'destructive',
              title: 'Content not modified!',
            })
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Session expired!',
          })
          useAuthStore.getState().auth.reset()
          const redirect = `${router.history.location.href}`
          router.navigate({ to: '/sign-in', search: { redirect } })
        }
        if (error.response?.status === 500) {
          toast({
            variant: 'destructive',
            title: 'Internal Server Error!',
          })
          router.navigate({ to: '/500' })
        }
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
      }
    },
  }),
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <Authenticator.Provider>
            <RouterProvider router={router} />
          </Authenticator.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
