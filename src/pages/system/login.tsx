import React, { useEffect, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import {
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    Select,
    Checkbox,
    Image,
    Center,
} from '@mantine/core';
import { IconLock, IconUserSearch, IconSelector } from '@tabler/icons-react';
import WrongAuth from '../../components/errors/wrong-auth';
import useAuth from '../../hooks/use-auth';
import { useNavigate, useLocation } from 'react-router-dom';
import setNotification from '../../components/errors/feedback-notif';
import logo from '../../assets/logo.png';
import api from '../../api/api';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname ?? '/';
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await api.get('/unsecured/users');
            setUsers(response.data.map((user: any) => ({ label: `${user.name} ${user.lastName}`, value: user.uid })));
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    const [hasError, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrorMessage] = useState('');

    const form = useForm({
        initialValues: {
            id: '',
            password: '',
        },
        validate: {
            id: isNotEmpty('Account is required'), // validate onBlur
            password: isNotEmpty('Password is required'),
        },
    });

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        setLoading(true);
        try {
            const response = await api.post('/auth/login', form.values, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const accessToken = response?.data?.token;
            const name = response?.data?.name;
            const role = response?.data?.role;
            const { id } = form.values;
            setAuth({ id, name, role, accessToken });
            form.reset();
            setLoading(false);
            setNotification(false, response.data.message);
            navigate(from, { replace: true });
        } catch (error: any) {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data.message ?? 'Unknown error');
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={20}>
            <Center>
                <Image src={logo} alt="Helix" withPlaceholder width={200} height="auto" />
            </Center>
            <Title align="center">Welcome to Helix</Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit}>
                    <Select
                        label="Select your Account"
                        placeholder="Account"
                        withAsterisk
                        {...form.getInputProps('id')}
                        icon={<IconUserSearch size="1rem" />}
                        data={users}
                        searchable
                        nothingFound="No Account found, contact administrator"
                        rightSection={<IconSelector size="1rem" />}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        allowDeselect
                    />
                    <PasswordInput
                        label="Enter your Password"
                        placeholder="Password"
                        withAsterisk
                        mt="md"
                        icon={<IconLock size="1rem" />}
                        {...form.getInputProps('password')}
                    />
                    <Group position="left" mt="md">
                        <Checkbox
                            label="Stay logged in"
                            onChange={(e) => {
                                setPersist(e.currentTarget.checked);
                            }}
                        />
                    </Group>
                    <Button fullWidth mt="xl" type="submit" loading={loading} loaderPosition="center">
                        {loading ? '' : 'Sign in'}
                    </Button>
                    <Group position="center" mt="lg">
                        <Anchor component="a" size="sm" href="mailto:contact.helix@skiff.com">
                            Contact administrator
                        </Anchor>
                    </Group>
                </form>
            </Paper>
            <WrongAuth show={hasError} message={errMessage} />
        </Container>
    );
};

export default Login;
