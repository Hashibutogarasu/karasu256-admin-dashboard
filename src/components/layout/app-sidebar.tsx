import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { sidebarData } from './data/sidebar-data'
import { useUserProfile } from '@/hooks/use-user-profile';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserProfile()

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {
          user && (
            <NavUser user={{
              name: user?.nickname ?? '',
              email: user?.email ?? '',
              avatar: user?.picture ?? '',
            }} />
          )
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
