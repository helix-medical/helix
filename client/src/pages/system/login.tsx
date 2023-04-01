import React, { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, PasswordInput, Anchor, Paper, Title, Container, Group, Button } from '@mantine/core';
import { IconLock, IconUserSearch } from '@tabler/icons-react';

const Login = () => {
    const form = useForm({
        initialValues: {
            account: '',
            password: '',
        },
        validate: {
            account: isNotEmpty('Account is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleSubmit = () => {
        console.log(form.values);
        setLoading(true);
    };

    const [loading, setLoading] = useState(false);

    return (
        <Container size={420} my={40}>
            <Title align="center">Log in to Helix</Title>
            {/* <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text> */}

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Account"
                        placeholder="Maivy"
                        withAsterisk
                        {...form.getInputProps('account')}
                        icon={<IconUserSearch size="1rem" />}
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
                    <Button fullWidth mt="xl" type="submit" loading={loading}>
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
