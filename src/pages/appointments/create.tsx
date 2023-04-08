import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Select, Group, Text, Grid, useMantineTheme } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';
import setNotification from '../system/errors/feedbackNotif';
import { useNavigate } from 'react-router-dom';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalCreateApp = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => toggleModal();
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        if (form.validate().hasErrors) return;
        let index;
        const appointment = {
            ...form.values,
            date: dayjs(form.values.date).format('YYYY-MM-DD HH:mm'),
        };
        // console.log(form.values);
        try {
            index = await axios.post(`/api/appointments/new`, appointment);
            setNotification(false, index.data.message);
            const res = await axios.put(`/api/patients/${appointment.patientId}/add_appointment`, {
                id: index.data.id,
            });
            setNotification(false, res.data.message);
            toggleModal();
            navigate(`/appointments/${index.data.id}/edit`);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const getPatients = async () => {
        try {
            const response = await axios.get('/api/patients/appointments');
            setPatients(response.data.map((patient: any) => ({ label: `${patient.name} ${patient.lastName}`, value: patient.id })));
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    useEffect(() => {
        getPatients();
    }, []);

    const form = useForm({
        initialValues: {
            patientId: '',
            date: '',
            reasons: '',
            anamnesis: JSON.stringify({
                reasons: '',
                symptoms: '',
                knownDiseases: '',
                knownMedications: '',
            }),
            conclusion: JSON.stringify({
                diagnosis: '',
                treatment: '',
                observations: '',
            }),
        },

        validate: {
            patientId: isNotEmpty('Patient is required'),
            date: isNotEmpty('Date is required'),
            reasons: isNotEmpty('Kind is required'),
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
                    <form>
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
                                    {...form.getInputProps('reasons')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="green" onClick={handleClick}>
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
