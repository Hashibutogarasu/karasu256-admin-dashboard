import { CognitoJwtVerifier } from "aws-jwt-verify";

export function useVerfier() {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: import.meta.env.VITE_USER_POOL_ID!,
    tokenUse: "access",
    clientId: import.meta.env.VITE_USER_POOL_CLIENT_ID!,
  })

  return verifier
}