import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/use-refresh-token';
import useAuth from '../../hooks/use-auth';
import { LoadingOverlay } from '@mantine/core';

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
    // eslint-disable-next-line
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} /> :
      <Outlet />}</>
  );
};

export default PersistentLogin;
