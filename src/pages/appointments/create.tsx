import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Select, Group, Text, Grid, useMantineTheme } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';
import setNotification from '../system/errors/feedbackNotif';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalCreateApp = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => {
        form.reset();
        toggleModal();
    };
    const theme = useMantineTheme();
    const [patients, setPatients] = useState([]);
    const [practitioners, setPractitioners] = useState([]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        let index;
        const appointment = {
            ...form.values,
            date: dayjs(form.values.date).format('YYYY-MM-DD HH:mm'),
        };
        try {
            index = await axios.post(`/api/appointments/new`, appointment);
            setNotification(false, index.data.message);
            const res = await axios.put(`/api/patients/${appointment.patientId}/add_appointment`, {
                id: index.data.id,
            });
            setNotification(false, res.data.message);
            handleClose();
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const getPatients = async () => {
        try {
            const response = await axios.get('/api/patients/appointments');
            setPatients(
                response.data.map((patient: any) => ({
                    label: `${patient.name} ${patient.lastName}`,
                    value: patient.id,
                }))
            );
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const getPractitioners = async () => {
        try {
            const response = await axios.get('/api/users/practitioners');
            setPractitioners(
                response.data.map((practitioner: any) => ({
                    label: `${practitioner.name} ${practitioner.lastName}`,
                    value: practitioner.uid,
                }))
            );
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    useEffect(() => {
        getPatients();
        getPractitioners();
    }, []);

    const form = useForm({
        initialValues: {
            patientId: '',
            date: '',
            practitioner: '',
            kind: '',
        },

        validate: {
            patientId: isNotEmpty('Patient is required'),
            date: isNotEmpty('Date is required'),
            practitioner: isNotEmpty('Practitioner is required'),
            kind: isNotEmpty('Kind is required'),
        },
    });

    return (
        <Modal.Root opened={show} onClose={handleClose}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text size="xl" weight={700}>
                            Add Patient
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleClick}>
                        <Grid columns={12}>
                            <Grid.Col span={12}>
                                <DateTimePicker
                                    label="Date"
                                    placeholder="Date"
                                    withAsterisk
                                    {...form.getInputProps('date')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Patient"
                                    placeholder="Patient"
                                    withAsterisk
                                    {...form.getInputProps('patientId')}
                                    data={patients}
                                    searchable
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Kind"
                                    placeholder="Kind"
                                    withAsterisk
                                    data={['first-visit', 'follow-up', 'pediatrics', 'maternity', 'emergency']}
                                    searchable
                                    dropdownPosition="bottom"
                                    {...form.getInputProps('kind')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Practitioner"
                                    placeholder="Practitioner"
                                    withAsterisk
                                    {...form.getInputProps('practitioner')}
                                    data={practitioners}
                                    searchable
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
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

export default ModalCreateApp;
