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

    const getByPeriod = async (period: string) => {
        return await api.get(`${baseUrl}/${period}`);
    };

    const getForEdit = async (id: string) => {
        return await api.get(`${baseUrl}/${id}/edit`);
    };

    const getForView = async (id: string) => {
        return await api.get(`${baseUrl}/${id}/view`);
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
        getByPeriod,
        getForEdit,
        getForView,
        getFromEvent,
        pushContent,
    };
};

export { useAppointmentsRoute };
