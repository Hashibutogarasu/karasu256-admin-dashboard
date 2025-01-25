import { Navigate } from '@tanstack/react-router'
import { useCognito } from './use-cognito'

export default function useUser() {
  const userPool = useCognito()
  const user = userPool.getCurrentUser()

  if (!user) {
    Navigate({ to: '/sign-in' })

    return null
  }

  return user
}
