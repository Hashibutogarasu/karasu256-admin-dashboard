import Cookies from 'js-cookie'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { UserContext } from '@/context/user-context'
import { UserProfileProvider } from '@/context/user-profile-context'
import { useUser } from '@/hooks/use-user'
import UnauthorisedError from '@/features/errors/unauthorized-error'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, userProfile, error } = useUser()

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  if (user && userProfile && !error) {
    return <UserContext user={user}>
      <UserProfileProvider user={userProfile}>
        <SearchProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <SkipToMain />
            <AppSidebar user={userProfile} />
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
  }
  else if (error) {
    return <UnauthorisedError />
  }
  else {
    return <LoadingSpinner />
  }
}
