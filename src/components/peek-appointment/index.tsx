import { Anchor, Button, Center, Divider, SimpleGrid, TextInput, Text } from '@mantine/core';
import { usePeekAppointment } from './logic';
import { IEvent } from '../../types/interfaces';
import { KindAppointment } from '../custom-badges';
import { IconPhone, IconSend } from '@tabler/icons-react';
import moment from 'moment';
import cnf from '../../config/config';
import GrantAccess from '../auth/grant-access';

const PeekAppointment = ({ input }: { input: IEvent }) => {
    const { navigate, event } = usePeekAppointment(input);
    return (
        <>
            <Center>
                <Text size="xl" weight={700}>
                    {input.title}
                </Text>
            </Center>
            <Center mt="xs" mb="sm">
                <KindAppointment kind={event.kind} />
            </Center>
            <Text fz="sm">
                <Text span fw={700}>
                    Date:
                </Text>{' '}
                {moment(input.start).format('dddd DD MMMM YYYY, HH:mm')} - {moment(input.end).format('HH:mm')}
                <div>
                    <Text span fw={700}>
                        Practitioner:
                    </Text>{' '}
                    {event.practitionerName} {event.practitionerLastName}
                </div>
            </Text>
            <Divider my="sm" />
            <Text fz="md" fw={700} mt="sm">
                Patient
                <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                    {' - '}
                    <Anchor
                        onClick={() => navigate(`/patients/${event.patientID}`)}
                        color="fr-yellow.3"
                        component="button"
                    >
                        <Text span fz="sm" fw={500}>
                            More details
                        </Text>
                    </Anchor>
                </GrantAccess>
            </Text>
            <Text fz="sm">
                <Text span fw={700}>
                    Name:
                </Text>{' '}
                {event.patientName}
                <div>
                    <Text span fw={700}>
                        Last Name:
                    </Text>{' '}
                    {event.patientLastName}
                </div>
                <Text span fw={700}>
                    Birth date:
                </Text>{' '}
                {moment(event.birthDate).format(cnf.formatDatePretty)}
            </Text>
            <Divider my="sm" />
            <Text fz="md" fw={700}>
                Contact
            </Text>
            <SimpleGrid cols={2} spacing="xs">
                <TextInput
                    label="Phone"
                    readOnly
                    defaultValue={event.phone}
                    rightSection={
                        <Button
                            component="a"
                            href={`tel:${event.phone}`}
                            color="fr-yellow.3"
                            m="xs"
                            p="xs"
                            variant="subtle"
                        >
                            <IconPhone size="1rem" />
                        </Button>
                    }
                />
                <TextInput
                    label="Email"
                    readOnly
                    defaultValue={event.email}
                    rightSection={
                        <Button
                            component="a"
                            href={`mailto:${event.email}`}
                            color="fr-yellow.3"
                            m="xs"
                            p="xs"
                            variant="subtle"
                        >
                            <IconSend size="1rem" />
                        </Button>
                    }
                />
            </SimpleGrid>
            <Button
                variant="light"
                color="fr-orange.4"
                fullWidth
                mt="lg"
                onClick={() => navigate(`/appointments/${event.appID}`)}
            >
                {event.status !== 'pending' ? 'View Appointment' : 'Start Appointment'}
            </Button>
        </>
    );
};

export default PeekAppointment;
