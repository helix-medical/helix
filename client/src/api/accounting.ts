import useSecureAPI from '../hooks/use-secure-api';

interface ICreateTransaction {
    amount: number;
    method: string;
    appointment: string;
    date: string;
}

const useAccountingRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/accounting';

    const create = async (data: ICreateTransaction) => {
        return await api.post(baseUrl, data);
    };

    const getByDates = async (start: string, end: string) => {
        return await api.get(`${baseUrl}/${start}/${end}`);
    };

    const getByPatient = async (id: string) => {
        return await api.get(`${baseUrl}/patient/${id}`);
    };

    const getFacture = async (id: string) => {
        return await api.get(`${baseUrl}/${id}/facture`);
    };

    const getSumByDates = async (start: string, end: string) => {
        return await api.get(`${baseUrl}/sum/${start}/${end}`);
    };

    return {
        create,
        getByDates,
        getByPatient,
        getFacture,
        getSumByDates,
    };
};

export { useAccountingRoute };
