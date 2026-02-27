import { useLogto } from '@logto/react';
import { secureAPI } from '../api/api';
import { useEffect } from 'react';

const useSecureAPI = () => {
  const { getAccessToken, isAuthenticated } = useLogto();

  useEffect(() => {
    const reqId = secureAPI.interceptors.request.use(
      async (config) => {
        if (isAuthenticated) {
          const token = await getAccessToken('http://localhost:3001/api');
          // @ts-expect-error i know
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = secureAPI.interceptors.response.use(
      (res) => res,
      async (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      secureAPI.interceptors.request.eject(reqId);
      secureAPI.interceptors.response.eject(resId);
    };
  }, [getAccessToken, isAuthenticated]);

  return secureAPI;
};

export default useSecureAPI;
