import useSecureAPI from '../hooks/use-secure-api';

const useUsersRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/users';

    const getPractitioners = async () => {
        return await api.get(`${baseUrl}/practitioners`);
    };

    return {
        getPractitioners,
    };
};

export { useUsersRoute };
