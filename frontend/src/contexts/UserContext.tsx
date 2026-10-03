import { createContext, useContext } from "react";

const UserContext = createContext<any | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: Props) {
  return <UserContext.Provider value={""}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx)
    throw new Error(
      "useUserContext must be used within a UseUserContextProvider!",
    );

  return ctx;
};
