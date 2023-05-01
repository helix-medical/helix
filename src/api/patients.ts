import useSecureAPI from '../hooks/use-secure-api';
import setNotification from '../pages/system/errors/feedback-notif';

export interface IApiResponse {
    fail: boolean;
    content: any;
}

const GetAllPatients = async (): Promise<IApiResponse> => {
    const api = useSecureAPI();
    try {
        const res = await api.get(`/patients`);
        return { fail: false, content: res.data };
    } catch (error: any) {
        if (!error?.response) setNotification(true, 'Network error');
        else if (error.response.status !== 404)
            setNotification(true, `${error.message}: ${error.response.data.message}`);
        return { fail: true, content: error.response.data.message };
    }
};

export { GetAllPatients };
