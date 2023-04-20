import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import jwtDecode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded: any = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const role = [decoded?.userData.role];

    return role?.find((r: number) => allowedRoles.includes(r)) ? (
        <Outlet />
    ) : auth?.id ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
