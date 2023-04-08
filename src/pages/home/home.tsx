import { Button, Card, Center, Grid, Group, Title } from '@mantine/core';
import useAuth from '../../hooks/useAuth';
import Account from './account';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <Title order={1}>Welcome {auth.name}</Title>
            <Button onClick={() => navigate('/admin')}>Go to Admin Panel</Button>
            <Grid columns={12} p="xl">
                <Grid.Col span={8}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Center>
                            <Title order={2}>Next Events</Title>
                        </Center>
                        <Group position="apart" my="lg">
                            <Card withBorder mx="md">
                                <Title order={3}>Event 1</Title>
                            </Card>
                            <Card withBorder mx="md">
                                <Title order={3}>Event 2</Title>
                            </Card>
                            <Card withBorder mx="md">
                                <Title order={3}>Event 3</Title>
                            </Card>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Account id={auth.id} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Home;
