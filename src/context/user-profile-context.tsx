import { UserData } from "@/components/layout/types";
import { createContext, useContext } from "react";

const UserProfileContext = createContext<UserData | null>(null);

export function UserProfileProvider({ children, user }: { children: React.ReactNode; user: UserData }) {
  return (
    <UserProfileContext.Provider value={user}>{children}</UserProfileContext.Provider>
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