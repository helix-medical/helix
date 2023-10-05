import useSecureAPI from '../hooks/use-secure-api';

interface IPatient {
    name: string;
    lastName: string;
    birthDate: string;
    sex: string;
    email: string;
    city: string;
    doctor: string;
    job: string;
    address: string;
    phone: string;
    passif: string;
}

const usePatientsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/patients';

    const create = async (data: IPatient) => {
        return await api.post(`${baseUrl}/add`, data);
    };

    const delete_ = async (id: string) => {
        return await api.delete(`${baseUrl}/${id}`);
    };

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const getForAppointment = async () => {
        return await api.get(`${baseUrl}/appointments`);
    };

    const getOne = async (id: string) => {
        return await api.get(`${baseUrl}/${id}`);
    };

    const update = async (id: string, data: IPatient) => {
        return await api.put(`${baseUrl}/${id}`, data);
    };

    return {
        create,
        delete: delete_,
        getAll,
        getForAppointment,
        getOne,
        update,
    };
};

export { usePatientsRoute };
