import React from 'react';
import { Alert, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const { auth } = useAuth();
    return (
        <>
            <Title order={1}>Welcome {auth.name}</Title>
            <Alert icon={<IconHeart size="1rem" />} title="Important" color="yellow" radius="lg">
                <Title order={2}>WORK IN PROGRESS</Title>
            </Alert>
        </>
    );
};

export default Home;
