import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    type: string;
    beLogged: boolean;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children,type,beLogged }) => {
    const context = useContext(AppContent);
    if (!context) {
        throw new Error("AppContent context is undefined");
    }
        
const { isLoggedin } = context;
    console.log(isLoggedin)
if (beLogged){
    if (!isLoggedin) {
        // Redirect to the login page if there's no token
        return <Navigate to={type} replace/>;
      }
}else{
    if (isLoggedin) {
        // Redirect to the login page if there's no token
        return <Navigate to={type} replace/>;
    }
}


  return children;
};

export default ProtectedRoute;