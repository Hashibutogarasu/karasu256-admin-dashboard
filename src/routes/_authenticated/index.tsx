import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'
import { useUser } from '@/hooks/use-user'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const { userProfile } = useUser()

  return userProfile ? <Dashboard userProfile={userProfile} /> : <LoadingSpinner />
}