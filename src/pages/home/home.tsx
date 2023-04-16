import React from 'react';
import { ActionIcon, Card, Grid, Group, Title } from '@mantine/core';
import useAuth from '../../hooks/useAuth';
// import Account from './account';
import Admin from '../admin/admin';
import HomeCalendar from './calendar';
import AccountingTile from './accounting';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Title order={1}>Welcome on Helix, {auth.name}!</Title>
            <Grid columns={12} p="xl">
                {auth.role === 2003 && <Admin />}
                <Grid.Col span={8}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <HomeCalendar />
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group position="apart" mb='md'>
                            <div></div>
                            <Title order={2}>Accounting</Title>
                            <ActionIcon color={'teal'} size="xl" onClick={() => navigate('/accounting')}>
                                <IconArrowUpRight size="1.5rem" />
                            </ActionIcon>
                        </Group>
                        <AccountingTile period="week" />
                        <AccountingTile period="month" />
                    </Card>
                    {/* <Account id={auth.id} /> */}
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Home;
