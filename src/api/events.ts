import useSecureAPI from '../hooks/use-secure-api';

const useEventsRoute = () => {
    const api = useSecureAPI();

    const getAll = async () => {
        return await api.get('/events');
    };

    const updateDate = async (id: string, data: { start: string; end: string }) => {
        return await api.put(`/events/${id}/date`, data);
    };

    return {
        getAll,
        updateDate,
    };
};

export default useEventsRoute;
