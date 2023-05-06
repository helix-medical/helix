import useSecureAPI from '../hooks/use-secure-api';

const useEventsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/events';

    const addAppointment = async (id: string, data: { appId: string; patientId: string }) => {
        return await api.put(`${baseUrl}/${id}/add_appointment`, data);
    };

    const create = async (data: { title: string; start: string; end: string; calendar: string }) => {
        return await api.post(baseUrl, data);
    };

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const getByCalendar = async (calendar: string) => {
        return await api.get(`${baseUrl}/calendar/${calendar}`);
    };

    const updateDate = async (id: string, data: { start: string; end: string }) => {
        return await api.put(`${baseUrl}/${id}/date`, data);
    };

    return {
        addAppointment,
        create,
        getAll,
        getByCalendar,
        updateDate,
    };
};

export { useEventsRoute };
