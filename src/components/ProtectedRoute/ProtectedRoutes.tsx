import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const ProtectedRoutes = (props : any) => {    
    return   props.loggedIn  ? <Outlet/> : <Navigate to="/reg-log"/>  
}; 

export default ProtectedRoutes;
