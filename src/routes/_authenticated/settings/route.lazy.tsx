import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@/features/settings'
import { useUser } from '@/hooks/use-user'
import { useEffect, useState } from 'react'
import UnauthorisedError from '@/features/errors/unauthorized-error'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const Route = createLazyFileRoute('/_authenticated/settings')({
  component: SettingsComponent,
})

function SettingsComponent() {
  const { user, userProfile, error } = useUser()
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsError(error!)
    setLoading(user === null || userProfile === null)
  }, [user, userProfile, error])

  if (!loading && !isError) {
    return <Settings user={userProfile!} />
  }
  else if (isError) {
    return <UnauthorisedError />
  }
  else {
    return <LoadingSpinner />
  }
}