import { createContext, useContext } from "react";

interface Routes {
  app: "/app";
  creatorHub: "/app/creator-hub";
}

const RoutesContext = createContext<Routes | undefined>(undefined);

const ROUTES: Routes = {
  app: "/app",
  creatorHub: "/app/creator-hub",
};

interface Props {
  children: React.ReactNode;
}

export function RoutesContextProvider({ children }: Props) {
  return (
    <RoutesContext.Provider value={ROUTES}>{children}</RoutesContext.Provider>
  );
}

export const useRoutesContext = () => {
  const ctx = useContext(RoutesContext);

  if (!ctx)
    throw new Error(
      "useRoutesContext must be used within a RoutesContextProvider!",
    );

  return ctx;
};
