import { ActionIcon, Card, Group, Title } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { IEvent } from '../../types/interfaces';
import PeekAppointment from '../../components/peek-appointment';
import { useNextAppointmentWrapper } from './next-appointment-wrapper.logic';

const NoUpcoming = () => <Title order={3}>No upcoming appointments</Title>;

const NextAppointmentWrapper = ({ input }: { input: IEvent }) => {
    const { navigate, event } = useNextAppointmentWrapper(input);
    return (
        <Card shadow="sm" radius="md" p="lg" withBorder mb="md">
            <Group position="apart" mb="md">
                <div></div>
                <Title order={2}>Next Appointment</Title>
                <ActionIcon color="fr-orange" size="xl" onClick={() => navigate('/appointments')}>
                    <IconArrowUpRight size="1.5rem" />
                </ActionIcon>
            </Group>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                {event.id === '00000000' ? <NoUpcoming /> : <PeekAppointment input={event} />}
            </Card>
        </Card>
    );
};

export default NextAppointmentWrapper;
