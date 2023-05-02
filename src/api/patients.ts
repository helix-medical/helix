import useSecureAPI from '../hooks/use-secure-api';

const PatientsRoute = () => {
    const api = useSecureAPI();

    const getAll = () => {
        return api.get('/patients');
    };

    const create = (data: any) => {
        return api.post('/patients/add', data);
    };

    const delete_ = (id: string) => {
        return api.delete(`/patients/${id}`);
    };

    return {
        getAll,
        create,
        delete: delete_,
    };
};

export default PatientsRoute;
