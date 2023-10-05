import useSecureAPI from '../hooks/use-secure-api';

interface IContent {
    content: string;
    payment: string;
}

interface ICreate {
    patientId: string;
    kind: string;
    event: string;
}

const useAppointmentsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/appointments';

    const create = async (data: ICreate) => {
        return await api.post(`${baseUrl}/new`, data);
    };

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const getByPatient = async (id: string) => {
        return await api.get(`${baseUrl}/patient/${id}`);
    };

    const getByPeriod = async (period: string) => {
        return await api.get(`${baseUrl}/${period}`);
    };

    const getOne = async (id: string) => {
        return await api.get(`${baseUrl}/read/${id}`);
    };

    const getFromEvent = async (id: string) => {
        return await api.get(`${baseUrl}/${id}/get-minimal`);
    };

    const pushContent = async (id: string, data: IContent) => {
        return await api.put(`${baseUrl}/${id}/content`, data);
    };

    return {
        create,
        getAll,
        getByPatient,
        getByPeriod,
        getOne,
        getFromEvent,
        pushContent,
    };
};

export { useAppointmentsRoute };
