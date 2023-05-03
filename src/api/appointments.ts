import useSecureAPI from '../hooks/use-secure-api';

const useAppointmentsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/appointments';

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const create = async (data: any) => {
        return await api.post(`${baseUrl}/new`, data);
    };

    return {
        getAll,
        create,
    };
};

export { useAppointmentsRoute };
