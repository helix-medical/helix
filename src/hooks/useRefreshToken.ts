import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    // console.log('auth =>', auth);
    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh-token', {
            withCredentials: true,
        });
        setAuth((prev: any) => {
            return {
                ...prev,
                id: response.data.id,
                name: response.data.name,
                role: response.data.role,
                accessToken: response.data.token,
            };
        });
        return response.data.token;
    };
    return refresh;
};

export default useRefreshToken;
