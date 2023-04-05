import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('auth', auth);

    return auth?.role?.find((r: number) => allowedRoles.includes(r)) ? (
        <Outlet />
    ) : auth?.id ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
