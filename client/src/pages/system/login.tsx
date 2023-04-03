import React, { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { PasswordInput, Anchor, Paper, Title, Container, Group, Button, Select } from '@mantine/core';
import { IconLock, IconUserSearch, IconSelector } from '@tabler/icons-react';
import WrongAuth from './errors/wrongAuth';

const Login = () => {
    const form = useForm({
        initialValues: {
            id: '',
            password: '',
        },
        validate: {
            id: isNotEmpty('Account is required'), // validate onBlur
            password: isNotEmpty('Password is required'), // define regex for password validation
        },
    });

    const handleSubmit = () => {
        // activate the button only when the form is valid
        console.log(form.values);
        setLoading(true);
    };

    const [loading, setLoading] = useState(false);

    return (
        <Container size={420} my={40}>
            <Title align="center">Welcome to Helix</Title>
            {/* <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text> */}

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Select
                        label="Select your Account"
                        placeholder="Maivy"
                        withAsterisk
                        {...form.getInputProps('id')}
                        icon={<IconUserSearch size="1rem" />}
                        data={[
                            { label: 'Maivy Ostéo', value: '4678019b' },
                            { label: 'Pichou Admin', value: 'b2abc37b' },
                            { label: 'Rachel Compta', value: 'fbf0141a' },
                        ]}
                        searchable
                        nothingFound="No Account found, contact administrator"
                        rightSection={<IconSelector size="1rem" />}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Je t'aime"
                        withAsterisk
                        mt="md"
                        icon={<IconLock size="1rem" />}
                        {...form.getInputProps('password')}
                    />
                    <Group position="center" mt="lg">
                        <Anchor component="a" size="sm" href="mailto:admin@helix.dev">
                            Contact administrator
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" type="submit" loading={loading} loaderPosition="center">
                        {loading ? '' : 'Sign in'}
                    </Button>
                </form>
            </Paper>
            <WrongAuth />
        </Container>
    );
};

export default Login;
