import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthRoute() {
  const location = useLocation();

  const isBadUrl: boolean =
    location.pathname.endsWith("auth") || location.pathname.endsWith("auth/");

  return isBadUrl ? <Navigate to={"/"} /> : <Outlet />;
}
