import { Navigate, Outlet } from "react-router";

export default function AppRoute() {
    return true ? <Navigate to={"/"} /> : <Outlet />
}