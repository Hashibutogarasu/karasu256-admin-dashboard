import {
  CognitoUserPool,
} from 'amazon-cognito-identity-js'

export function useCognito() {
  const userPool = new CognitoUserPool({
    UserPoolId: import.meta.env.VITE_USER_POOL_ID!,
    ClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID!,
  })

  return userPool
}