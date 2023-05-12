import React, { useState } from 'react';
import { ActionIcon, Card, Grid, Group, Title } from '@mantine/core';
import useAuth from '../../hooks/use-auth';
// import Account from './account';
import AdminPanel from '../admin';
import HomeCalendar from './calendar';
import AccountingTile from './accounting';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import GrantAccess from '../../components/auth/grant-access';
import NextAppointmentWrapper from './next-appointment-wrapper';

const Home = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        id: '',
        title: '',
        start: new Date(),
        end: new Date(),
        kind: '',
    });

    return (
        <>
            <Title order={1}>Welcome on Helix, {auth.name}!</Title>
            <Grid columns={12} p="lg">
                <GrantAccess levels={['ADMIN']}>
                    <AdminPanel />
                </GrantAccess>
                <Grid.Col span={8}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <HomeCalendar handler={setEvent} />
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <NextAppointmentWrapper input={event} />
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group position="apart" mb="md">
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
