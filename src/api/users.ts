import useSecureAPI from '../hooks/use-secure-api';

const useUsersRoute = () => {
    const api = useSecureAPI();

    const getPractitioners = async () => {
        return await api.get('/users/practitioners');
    };

    return {
        getPractitioners,
    };
};

export { useUsersRoute };
