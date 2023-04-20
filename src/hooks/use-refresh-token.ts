import api from '../config/api';
import useAuth from './use-auth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await api.get('/auth/refresh-token', {
            withCredentials: true,
        });
        setAuth((prev: any) => {
            return {
                ...prev,
                id: response.data.id,
                role: response.data.role,
                name: response.data.name,
                accessToken: response.data.token,
            };
        });
        return response.data.token;
    };
    return refresh;
};

export default useRefreshToken;
