import { useEffect, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { PasswordInput, Anchor, Paper, Title, Container, Group, Button, Select, Checkbox } from '@mantine/core';
import { IconLock, IconUserSearch, IconSelector } from '@tabler/icons-react';
import WrongAuth from './errors/wrongAuth';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname ?? '/';
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/users/connexion');
            setUsers(response.data.map((user: any) => ({ label: `${user.name} ${user.lastName}`, value: user.uid })));
        } catch (error: any) {
            console.log(error);
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
            const response = await axios.post('/api/auth/login', form.values, {
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
            navigate(from, { replace: true });
        } catch (error: any) {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data.message ?? 'Unknown error');
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center">Welcome to Helix</Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit}>
                    <Select
                        label="Select your Account"
                        placeholder="Maivy"
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
                        label="Password"
                        placeholder="Je t'aime"
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
                    <Group position="apart" mt="lg">
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
