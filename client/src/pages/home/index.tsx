import { useState } from 'react';
import { ActionIcon, Card, Grid, Group, Title } from '@mantine/core';
import useAuth from '../../hooks/use-auth';
import Account from './account';
import AccountingTile from './accounting';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import NextAppointmentWrapper from './next-appointment-wrapper';
import ModalUserSettings from '../../components/user-settings';

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
      <Title order={1}>Bonjour {auth.name} !</Title>
      ajouter un composant de calendrier ici et aussi des stats sur combien de rendez-vous vous avez fait
      <Grid columns={12} p="lg">
        <Grid.Col span={4}>
          <NextAppointmentWrapper input={event} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Group align="apart" mb="md">
              <div></div>
              <Title order={2}>Accounting</Title>
              <ActionIcon color={'teal'} size="xl" onClick={() => navigate('/accounting')} variant="light">
                <IconArrowUpRight size="1.5rem" />
              </ActionIcon>
            </Group>
            <AccountingTile period="week" />
            <AccountingTile period="month" />
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Account id={auth.id} />
        </Grid.Col>
      </Grid>
      <ModalUserSettings />
    </>
  );
};

export default Home;
