import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: any): any => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest?.sent) {
                    previousRequest.sent = true;
                    const token = await refresh();
                    previousRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosPrivate(previousRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
