import {
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import { useEffect, useState } from 'react'

export function useCognito() {
  const [userPool, setUserPool] = useState<CognitoUserPool>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      setUserPool(new CognitoUserPool({
        UserPoolId: import.meta.env.VITE_USER_POOL_ID!,
        ClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID!,
      }))

      setLoading(false)
    }
  }, [loading])

  return userPool
}