import axios from 'axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth, setPersist } = useAuth();

    const logout = async () => {
        setAuth({});
        setPersist(false);
        try {
            await axios.get('/api/auth/logout', { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    };

    return logout;
};

export default useLogout;
