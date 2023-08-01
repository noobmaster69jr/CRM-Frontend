import { Outlet, Navigate, useLocation } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  return (
    // getItem("property name") === first value in the array
    localStorage.getItem("userTypes") === allowedRoles[0] ? (
      <Outlet />
    ) : 
    localStorage.getItem("userTypes") ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
}

export default RequireAuth;
