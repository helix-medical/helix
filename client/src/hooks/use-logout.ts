import useAuth from './use-auth';
import setNotification from '../components/errors/feedback-notification';
import api from '../api/api';

const useLogout = () => {
    const { setAuth, setPersist } = useAuth();

    const logout = async () => {
        setAuth({});
        setPersist(false);
        try {
            const res = await api.get('/auth/logout', { withCredentials: true });
            setNotification(false, res.data.message);
        } catch (err: any) {
            console.log(err);
            setNotification(true, err.response.data.message);
        }
    };

    return logout;
};

export default useLogout;
