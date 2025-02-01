import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsDevelopment from '@/features/settings/development'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/use-user'
import UnauthorisedError from '@/features/errors/unauthorized-error'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const Route = createLazyFileRoute('/_authenticated/settings/developer')({
  component: SettingsDevelopmentComponent,
})

function SettingsDevelopmentComponent() {
  const { user, userProfile, error } = useUser()
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsError(error!)
    setLoading(user === null || userProfile === null)
  }, [user, userProfile, error])

  if (!loading && !isError) {
    return <SettingsDevelopment user={userProfile!} />
  }
  else if (isError) {
    return <UnauthorisedError />
  }
  else {
    return <LoadingSpinner />
  }
}