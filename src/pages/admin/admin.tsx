import { useEffect, useState } from 'react';
import { Divider, Title } from '@mantine/core';
import ListUsers from './listUsers';
import axios from 'axios';

const Admin = (): JSX.Element => {
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

    return (
        <>
            <Title order={1}>Administrator Panel</Title>
            <Divider my="lg" />
            <ListUsers users={users} />
            <Divider my="lg" />
        </>
    );
};

export default Admin;
