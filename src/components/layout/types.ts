import { LinkProps } from '@tanstack/react-router'

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  navGroups: NavGroup[]
}

interface UserData {
  email: string
  email_verified: boolean
  nickname?: string
  picture?: string
  sub: string
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink, UserData }
