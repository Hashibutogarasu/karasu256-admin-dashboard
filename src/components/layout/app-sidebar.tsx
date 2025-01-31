import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { sidebarData } from './data/sidebar-data'
import { useEffect, useState } from 'react';
import { UserData } from './types';

type AppSidebarProps = {
  user: UserData;
  children?: React.ReactNode;
  props?: React.ComponentProps<typeof Sidebar>;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const [currentUser, setCurrentUser] = useState<UserData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      setCurrentUser(user)
      setLoading(false)
    }
  }, [user, loading])

  return loading ? null : (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {
          currentUser && (
            <NavUser user={{
              name: currentUser?.nickname ?? '',
              email: currentUser?.email ?? '',
              avatar: currentUser?.picture ?? '',
            }} />
          )
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
