import { useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useVerfier } from "./use-verfier"
import { useCognito } from "./use-cognito"
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js"
import { toast } from "./use-toast"
import { UserData } from "@/components/layout/types"

export function useUser() {
  const router = useRouter()
  const verfier = useVerfier()
  const cognito = useCognito()
  const [userProfile, setUserProfile] = useState<UserData | null>(null)
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const currentUser = cognito?.getCurrentUser()
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')

    if (!currentUser && !user && !authenticated && cognito && email && password) {
      const pool = new CognitoUserPool({
        UserPoolId: import.meta.env.VITE_USER_POOL_ID!,
        ClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID!,
      })

      const user = new CognitoUser({
        Username: email,
        Pool: pool,
        Storage: sessionStorage,
      })

      const authenticationDetails = new AuthenticationDetails({
        Username: user.getUsername(),
        Password: password,
      })

      user.authenticateUser(authenticationDetails, {
        onSuccess: async (session) => {
          const accessToken = session.getAccessToken().getJwtToken()
          const verify = await verfier.verify(accessToken);

          if (!verify['cognito:groups']?.includes('admin')) {
            toast({
              title: 'Error',
              description: 'You are not authorized to access this page',
            })
            router.navigate({ to: '/sign-in' })

            return
          }

          setUser(user)

          user.getUserAttributes((err, attributes) => {
            if (err) {
              toast({
                title: 'Error',
                description: 'Failed to fetch user attributes',
              })
              return
            }

            if (attributes) {
              const email = attributes.find((attr) => attr.Name === 'email')?.Value
              const email_verified = attributes.find((attr) => attr.Name === 'email_verified')?.Value
              const nickname = attributes.find((attr) => attr.Name === 'nickname')?.Value
              const picture = attributes.find((attr) => attr.Name === 'picture')?.Value
              const sub = attributes.find((attr) => attr.Name === 'sub')?.Value

              if (email && email_verified && sub) {
                setUserProfile({
                  email,
                  email_verified: email_verified === 'true',
                  nickname,
                  picture,
                  sub,
                })

                setUser(user)

                setAuthenticated(true)
              }
            }
          })
        },
        onFailure: () => {
          toast({
            title: 'Error',
            description: 'Failed to authenticate user',
          })
          router.navigate({ to: '/sign-in' })
        },
      })
    }

  }, [authenticated, cognito, router, user, verfier])

  return { user, userProfile, authenticated }
}