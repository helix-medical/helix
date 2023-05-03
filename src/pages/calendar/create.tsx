import React from 'react';
import { Text, Select, Modal, useMantineTheme, SegmentedControl, TextInput, Paper, Group, Button } from '@mantine/core';
import cnf from '../../config/config';
import moment from 'moment';
import useComponentLogic from './create.logic';

interface IAppointment {
    range: any;
    form: any;
    data: {
        patients: { label: string; value: string }[];
        practitioners: { label: string; value: string }[];
    };
}

const Appointment = ({ range, form, data }: IAppointment) => {
    return (
        <>
            <Select
                label="Patient"
                placeholder="Choose Patient"
                withAsterisk
                data={data.patients}
                searchable
                nothingFound="No patients found, ensure you have created a patient first"
                {...form.getInputProps('patientId')}
            />
            <Select
                label="Kind of Appointment"
                placeholder="Choose Kind"
                withAsterisk
                data={['first-visit', 'follow-up', 'pediatrics', 'maternity', 'emergency']}
                searchable
                dropdownPosition="bottom"
                my="xs"
                {...form.getInputProps('kind')}
            />
            <Select
                label="Practitioner"
                placeholder="Choose Practitioner"
                withAsterisk
                data={data.practitioners}
                searchable
                nothingFound="No practitioners found, ensure you have created a practitioner first"
                {...form.getInputProps('practitioner')}
            />
            <TextInput
                label="Date of the Appointment"
                readOnly
                mt="xs"
                value={`${moment(range.start).format('dddd DD MMMM YYYY, HH:mm')} - ${moment(range.start)
                    .add(cnf.durationAppointment, 'minute')
                    .format('HH:mm')}`}
            />
        </>
    );
};

const Event = ({ range }: { range: any }) => {
    return (
        <>
            <TextInput label="Event Title" placeholder="Event Title" />
            <Text>Event Start</Text>
            <Text>{moment(range.start).format(cnf.formatDateTimePretty)}</Text>
            <Text>Event End</Text>
            <Text>{moment(range.end).format(cnf.formatDateTimePretty)}</Text>
        </>
    );
};

const CreateEvent = ({ opened, handler, range }: { opened: boolean; handler: () => void; range: any }) => {
    const { form, patients, practitioners, handleSubmit } = useComponentLogic(handler);
    const theme = useMantineTheme();
    form.values.date = moment(range.start).format(cnf.formatDateTime);

    return (
        <Modal.Root opened={opened} onClose={handler} radius="md">
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text size="xl" weight={700}>
                            Create Event
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <SegmentedControl
                            fullWidth
                            color="fr-cyan.5"
                            data={[
                                { value: 'appointment', label: 'Appointment' },
                                { value: 'event', label: 'Personal Event' },
                            ]}
                            {...form.getInputProps('type')}
                        />
                        <Paper shadow="sm" radius="md" p="sm" withBorder mt="md">
                            <Text fz="md" fw={700}>
                                Create {form.values.type === 'appointment' ? 'Appointment' : 'Personal Event'}
                            </Text>
                            {form.values.type === 'appointment' ? (
                                <Appointment range={range} form={form} data={{ patients, practitioners }} />
                            ) : (
                                <Event range={range} />
                            )}
                        </Paper>
                        <Group position="right" mt="sm">
                            <Button variant="light" color="red" onClick={handler}>
                                Cancel
                            </Button>
                            <Button color="green" type="submit">
                                Submit
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default CreateEvent;
