import { secureAPI } from '../config/api';
import { useEffect } from 'react';
import useRefreshToken from './use-refresh-token';
import useAuth from './use-auth';

const useSecureAPI = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = secureAPI.interceptors.request.use(
            (config: any): any => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = secureAPI.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest?.sent) {
                    previousRequest.sent = true;
                    const token = await refresh();
                    previousRequest.headers['Authorization'] = `Bearer ${token}`;
                    return secureAPI(previousRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            secureAPI.interceptors.response.eject(responseIntercept);
            secureAPI.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return secureAPI;
};

export default useSecureAPI;
