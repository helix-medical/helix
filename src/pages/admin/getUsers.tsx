import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const axios = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('/api/users', { signal: controller.signal });
                console.log(res.data);
                isMounted ?? setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    });

    return users;
};

export default GetUsers;
