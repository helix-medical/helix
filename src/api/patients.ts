import useSecureAPI from '../hooks/use-secure-api';

const usePatientsRoute = () => {
    const api = useSecureAPI();

    const getAll = async () => {
        return await api.get('/patients');
    };

    const create = async (data: any) => {
        return await api.post('/patients/add', data);
    };

    const delete_ = async (id: string) => {
        return await api.delete(`/patients/${id}`);
    };

    return {
        getAll,
        create,
        delete: delete_,
    };
};

export default usePatientsRoute;
