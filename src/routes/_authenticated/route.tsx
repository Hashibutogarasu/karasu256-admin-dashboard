import Cookies from 'js-cookie'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth'
import { toast } from '@/hooks/use-toast'
import { useVerfier } from '@/hooks/use-verfier'
import useUser from '@/hooks/use-user'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [attribute, setAttribute] = useState<FetchUserAttributesOutput>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const verfier = useVerfier()
  const user = useUser()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?.getSession((err: any, session: CognitoUserSession) => {
      if (!err) {
        verfier.verify(session.getAccessToken().getJwtToken()).then((result) => {
          if (!result['cognito:groups']?.includes('admin')) {
            toast({
              title: 'Error',
              description: 'You are not authorized to access this page',
            })
            router.navigate({ to: '/sign-in' })
          }
          else {
            fetchUserAttributes().then((result) => {
              setAttribute(result)
            })
          }
        })
      }
    })

    setLoading(false)
  }, [router, user, verfier])

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  return loading ? <LoadingSpinner /> : (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
