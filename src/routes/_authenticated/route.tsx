import Cookies from 'js-cookie'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useEffect, useState } from 'react'
import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth'
import { toast } from '@/hooks/use-toast'
import { useVerfier } from '@/hooks/use-verfier'
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import UnauthorisedError from '@/features/errors/unauthorized-error'
import { useCognito } from '@/hooks/use-cognito'
import { UserContext } from '@/context/user-context'
import { UserProfileProvider } from '@/context/user-profile-context'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const [userProfile, setAttribute] = useState<FetchUserAttributesOutput>()
  const router = useRouter()
  const verfier = useVerfier()
  const cognito = useCognito()
  const [user, setUser] = useState<CognitoUser>()
  const [authenticated, setAuthenticated] = useState<boolean>(false)


  useEffect(() => {
    if (!user && !authenticated) {
      const user = cognito?.getCurrentUser()

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user.getSession((err: any, session: CognitoUserSession) => {
          if (!err) {
            const accessToken = session.getAccessToken().getJwtToken()
            verfier.verify(accessToken).then((result) => {
              if (!result['cognito:groups']?.includes('admin')) {
                toast({
                  title: 'Error',
                  description: 'You are not authorized to access this page',
                })
                router.navigate({ to: '/sign-in' })
              }
              else {
                setUser(user)
                fetchUserAttributes().then((result) => {
                  setAttribute(result)
                })

                setAuthenticated(true)
              }
            })
          }
        })
      }
    }
  }, [authenticated, cognito, router, user, verfier])

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  return authenticated && user ? (
    <UserContext user={user}>
      <UserProfileProvider user={userProfile}>
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
      </UserProfileProvider>
    </UserContext>
  ) : <UnauthorisedError />
}
