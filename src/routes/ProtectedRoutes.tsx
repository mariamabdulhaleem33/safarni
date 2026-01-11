import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem("authToken")
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
