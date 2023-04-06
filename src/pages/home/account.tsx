import { useEffect, useState } from 'react';
import { Button, Title, TextInput, Card, Center } from '@mantine/core';
import ChangePassword from './changePassword';
import axios from 'axios';
import { IUsers } from '../../interfaces';

const Account = ({ id }: { id: string }): JSX.Element => {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const [user, setUser] = useState<IUsers>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/users/${id}`);
                setUser(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center>
                    <Title order={2}>Account</Title>
                </Center>
                <TextInput label="Account ID" value={user?.uid} readOnly />
                <TextInput label="Name" value={user?.name} readOnly />
                <TextInput label="Last Name" value={user?.lastName} readOnly />
                <TextInput label="Role" value={user?.role} readOnly />
                <TextInput label="Status" value={user?.state} readOnly />
                <TextInput label="Last Connection" value={user?.lastActive} readOnly />
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={toggleModal}>
                    Change Password
                </Button>
            </Card>
            <ChangePassword show={show} toggleModal={toggleModal} />
        </div>
    );
};

export default Account;
