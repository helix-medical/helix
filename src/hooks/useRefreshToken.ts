import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh-token', {
            withCredentials: true,
        });
        setAuth((prev: any) => {
            return {
                ...prev,
                id: response.data.id,
                name: response.data.name,
                accessToken: response.data.token,
            };
        });
        return response.data.token;
    };
    return refresh;
};

export default useRefreshToken;
