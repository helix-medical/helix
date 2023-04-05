import { useEffect, useState } from 'react';
import axios from 'axios';

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
