import { useEffect, useState } from 'react';
import { Button, Title, TextInput, Card, Center, Grid } from '@mantine/core';
import ChangePassword from './changePassword';
import axios from 'axios';
import { IUsers } from '../../interfaces';
import cnf from '../../config/config';
import moment from 'moment';

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
                <Grid columns={12} p="md">
                    <Grid.Col span={6}>
                        <TextInput label="Account ID" defaultValue={user?.uid} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Role" defaultValue={user?.role} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Name" defaultValue={user?.name} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Last Name" defaultValue={user?.lastName} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Status" defaultValue={user?.state} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last Connection"
                            defaultValue={moment(user?.lastActive).format(cnf.formatDateTimePretty)}
                            readOnly
                        />
                    </Grid.Col>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={toggleModal}>
                        Change Password
                    </Button>
                </Grid>
            </Card>
            <ChangePassword show={show} toggleModal={toggleModal} />
        </div>
    );
};

export default Account;
