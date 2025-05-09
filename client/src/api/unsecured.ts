import api, { secureAPI } from './api';

const useUnsecuredRoute = () => {
  const getUsers = async () => {
    return await api.get('/unsecured/users');
  };

  const login = async (data: { id: string; password: string }) => {
    return await secureAPI.post('/auth/login', data);
  };

  return { getUsers, login };
};

export { useUnsecuredRoute };
