import useSecureAPI from '../hooks/use-secure-api';

const useEventsRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/events';

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
        getAll,
        updateDate,
        getByCalendar,
    };
};

export default useEventsRoute;
