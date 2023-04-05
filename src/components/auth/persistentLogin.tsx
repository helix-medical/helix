import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistentLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error: any) {
                console.log(error);
            } finally {
                isMounted && setLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

        return () => {
            isMounted = false;
        };
    }, []);

    return <>{!persist ? <Outlet /> : isLoading ? <p>loading...</p> : <Outlet />}</>;
};

export default PersistentLogin;
