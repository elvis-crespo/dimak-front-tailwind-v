/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router";
export const ProtectedRoute = ({ isAllowed, redirectTo = "/", children }) => {
  if (!isAllowed) 
    return <Navigate to={redirectTo} />;
  
  return children ? children : <Outlet />;
};


