import { useContext } from 'react';
import AuthContext from '../components/auth/authProvider';

const useAuth = (): { setAuth: any; auth: any; persist: any; setPersist: any } => {
    return useContext<any>(AuthContext);
};

export default useAuth;
