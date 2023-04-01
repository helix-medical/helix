import axios from 'axios';
import { useEffect, useState } from 'react';

const GetUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllUsers();
    }, []);

    return users;
};

export default GetUsers;
