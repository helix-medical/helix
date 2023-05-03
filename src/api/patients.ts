import useSecureAPI from '../hooks/use-secure-api';

const usePatientsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/patients';

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const create = async (data: any) => {
        return await api.post(`${baseUrl}/add`, data);
    };

    const delete_ = async (id: string) => {
        return await api.delete(`${baseUrl}/${id}`);
    };

    const getForAppointment = async () => {
        return await api.get(`${baseUrl}/appointments`);
    };

    return {
        getAll,
        create,
        delete: delete_,
        getForAppointment,
    };
};

export default usePatientsRoute;
