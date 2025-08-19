/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router";
export const ProtectedRoute = ({ isAllowed, children, redirectTo = '/' }) => {
    if(!isAllowed) {
        return <Navigate to={redirectTo}/>
    }
  return children ? children : <Outlet/>;
};


