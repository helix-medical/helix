import React from 'react';
import {
    Anchor,
    Button,
    Center,
    Divider,
    Group,
    Modal,
    Paper,
    SimpleGrid,
    Text,
    TextInput,
    ThemeIcon,
} from '@mantine/core';
import { IEvent } from '../../types/interfaces';
import moment from 'moment';
import cnf from '../../config/config';
import { IconCalendar, IconPhone, IconReportMedical, IconSend } from '@tabler/icons-react';
import ModalOverlay from '../../components/modal-overlay';
import KindAppointment from '../../components/customBadges/kind-appointment';
import GrantAccess from '../../components/auth/grant-access';
import { useViewEvent, IViewEvent } from './view.logic';

const Header = ({ kind }: { kind: string }) => (
    <Group>
        <ThemeIcon variant="light" color={kind === 'app' ? 'fr-orange.4' : 'fr-cyan.4'} size="lg">
            {kind === 'app' ? <IconReportMedical size="1.2rem" /> : <IconCalendar size="1.2rem" />}
        </ThemeIcon>
        <Text fz="lg" fw={700}>
            {kind === 'app' ? 'Appointment' : 'Event'}
        </Text>
    </Group>
);
const Footer = ({ handleClose }: { handleClose: () => void }) => (
    // Add buttons to:
    // 1. Edit / View event
    // 2. Delete event
    <Group position="right" mt="sm">
        <Button variant="light" color="gray" onClick={handleClose}>
            Close
        </Button>
    </Group>
);

const Event = ({ input }: { input: IEvent }) => (
    <>
        <Text fz="sm">
            <Text span fw={700} fz="md">
                Start:
            </Text>{' '}
            {moment(input.start).format(cnf.formatDateTimePretty)}
        </Text>
        <Text fz="sm">
            <Text span fw={700} fz="md">
                End:
            </Text>{' '}
            {moment(input.end).format(cnf.formatDateTimePretty)}
        </Text>
        <Text fz="sm">
            <Text span fw={700} fz="md">
                Calendar:
            </Text>{' '}
            Calendar
        </Text>
    </>
);

const Appointment = ({
    input,
    event,
    navigate,
}: {
    input: IEvent;
    event: IViewEvent;
    navigate: (path: string) => any;
}) => (
    <>
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
                <Anchor onClick={() => navigate('/patients')} color="fr-yellow.3" component="button">
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
    </>
);

const ViewEvent = ({ input, opened, handleClose }: { input: IEvent; opened: boolean; handleClose: () => void }) => {
    const { navigate, event } = useViewEvent(input.id);
    return (
        <Modal.Root opened={opened} onClose={handleClose} radius="md">
            <Modal.Overlay {...ModalOverlay} />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Header kind={input.kind} />
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Paper shadow="sm" radius="md" p="sm" withBorder>
                        <Center>
                            <Text size="xl" weight={700}>
                                {input.title}
                            </Text>
                        </Center>
                        {input.kind === 'event' ? (
                            <Event input={input} />
                        ) : (
                            <Appointment event={event} input={input} navigate={navigate} />
                        )}
                    </Paper>
                    <Footer handleClose={handleClose} />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ViewEvent;
