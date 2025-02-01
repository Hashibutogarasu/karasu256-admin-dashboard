import UnauthorisedError from "@/features/errors/unauthorized-error"
import { useUser } from "@/hooks/use-user"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "../ui/loading-spinner"
import { UserProfileProvider } from "@/context/user-profile-context"

export function UserProfileLayout({ children }: { children?: React.ReactNode }) {
  const { user, userProfile, error } = useUser()
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsError(error!)
    setLoading(user === null || userProfile === null)
  }, [user, userProfile, error])

  if (!loading && !isError && userProfile) {
    return <UserProfileProvider user={userProfile}>
      {children}
    </UserProfileProvider>
  }
  else if (isError) {
    return <UnauthorisedError />
  }
  else {
    return <LoadingSpinner />
  }
}