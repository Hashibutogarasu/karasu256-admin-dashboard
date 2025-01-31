import { CognitoUser } from "amazon-cognito-identity-js";
import { createContext } from "react";

const userContext = createContext<CognitoUser | null>(null);

export function UserContext({ children, user }: { children: React.ReactNode; user: CognitoUser | null }) {
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
}