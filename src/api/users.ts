import useSecureAPI from '../hooks/use-secure-api';

interface ICreateUser {
    name: string;
    lastName: string;
    role: string;
    password: string;
}

const useUsersRoute = () => {
    const api = useSecureAPI();
    const baseUrl = '/users';

    const create = async (data: ICreateUser) => {
        return await api.post(`${baseUrl}/add`, data);
    };

    const disable = async (id: string) => {
        return api.delete(`${baseUrl}/${id}`);
    };

    const enable = async (id: string) => {
        return api.put(`${baseUrl}/${id}/enable`);
    };

    const getAll = async () => {
        return await api.get(baseUrl);
    };

    const getOne = async (id: string) => {
        return await api.get(`${baseUrl}/${id}`);
    };

    const getPractitioners = async () => {
        return await api.get(`${baseUrl}/practitioners`);
    };

    return {
        create,
        disable,
        enable,
        getAll,
        getOne,
        getPractitioners,
    };
};

export { useUsersRoute };
