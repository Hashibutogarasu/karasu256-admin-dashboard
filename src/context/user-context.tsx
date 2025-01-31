import { CognitoUser } from "amazon-cognito-identity-js";
import { createContext } from "react";

const userContext = createContext<CognitoUser | undefined>(undefined);

export function UserContext({ children, user }: { children: React.ReactNode; user: CognitoUser }) {
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
}