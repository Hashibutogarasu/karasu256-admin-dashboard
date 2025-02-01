import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'
import { UserProfileLayout } from '@/components/layout/user-profile'

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  return <UserProfileLayout>
    <Dashboard />
  </UserProfileLayout>
}