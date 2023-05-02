export interface IApiResponse {
    fail: boolean;
    content: any;
}

// const GetAllPatients = async (): Promise<IApiResponse> => {
//     const api = useSecureAPI();
//     try {
//         const res = await api.get(`/patients`);
//         return { fail: false, content: res.data };
//     } catch (error: any) {
//         if (!error?.response) setNotification(true, 'Network error');
//         else if (error.response.status !== 404)
//             setNotification(true, `${error.message}: ${error.response.data.message}`);
//         return { fail: true, content: error.response.data.message };
//     }
// };

const getAll = (api: any) => {
    return api.get('/patients');
}

const patientsAPI = {
    getAll
};

export default patientsAPI;
