import { type IdTokenClaims, useLogto, UserInfoResponse } from '@logto/react';
import { useEffect, useState } from 'react';

/**
 * Contains more info than `useLogtoAuth` so we'll use this for the orgs data.
 * @returns the user info and the user claims.
 */
const useLogtoUserInfo = () => {
  const { isAuthenticated, fetchUserInfo, signOut, getIdTokenClaims } = useLogto();
  const [fullUserInfo, setFullUserInfo] = useState<UserInfoResponse>();
  const [user, setUser] = useState<IdTokenClaims>();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const data = await fetchUserInfo();
        setFullUserInfo(data);
      }
    })();
  }, [isAuthenticated, fetchUserInfo]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUser(claims);
      }
    })();
  }, [getIdTokenClaims, isAuthenticated]);

  return { isAuthenticated, fullUserInfo, signOut, user };
};

export default useLogtoUserInfo;
