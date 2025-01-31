import UnauthorisedError from "@/features/errors/unauthorized-error";
import { FetchUserAttributesOutput } from "aws-amplify/auth";
import { createContext, useContext } from "react";

const UserProfileContext = createContext<FetchUserAttributesOutput | null>(null);

export function UserProfileProvider({ children, user }: { children: React.ReactNode; user?: FetchUserAttributesOutput | null }) {
  return (
    user ? <UserProfileContext.Provider value={user}>{children}</UserProfileContext.Provider> : <UnauthorisedError />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserProfile = () => {
  const userProfile = useContext(UserProfileContext)

  if (!userProfile) {
    throw new Error('useUserProfile has to be used within <UserProfileContext.Provider>')
  }

  return userProfile
}