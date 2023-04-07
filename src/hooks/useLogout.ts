import axios from 'axios';
import useAuth from './useAuth';
import setNotification from '../pages/system/errors/feedbackNotif';

const useLogout = () => {
    const { setAuth, setPersist } = useAuth();

    const logout = async () => {
        setAuth({});
        setPersist(false);
        try {
            const res = await axios.get('/api/auth/logout', { withCredentials: true });
            setNotification(false, res.data.message);
        } catch (err: any) {
            console.log(err);
            setNotification(true, err.response.data.message);
        }
    };

    return logout;
};

export default useLogout;
