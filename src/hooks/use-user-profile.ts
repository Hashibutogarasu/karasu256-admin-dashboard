import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export function useUserProfile() {
  const [user, setUser] = useState<FetchUserAttributesOutput>()

  useEffect(() => {
    fetchUserAttributes().then((user) => {
      setUser(user)
    })
  }, [])

  return user
}