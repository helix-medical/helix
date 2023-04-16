import React from 'react';
import { Card, Grid, Title } from '@mantine/core';
import useAuth from '../../hooks/useAuth';
// import Account from './account';
import Admin from '../admin/admin';
import HomeCalendar from './calendar';
import AccountingTile from './accounting';

const Home = () => {
    const { auth } = useAuth();
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
                    <AccountingTile period="month" />
                    <AccountingTile period="week" />
                    {/* <Account id={auth.id} /> */}
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Home;
