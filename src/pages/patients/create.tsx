import axios from 'axios';
import React from 'react';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { Button, Modal, TextInput, Select, Group, Grid, Text, useMantineTheme } from '@mantine/core';
import { DateInput, DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import setNotification from '../system/errors/feedbackNotif';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalAddPatient = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => toggleModal();
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            name: '',
            lastName: '',
            birthDate: '',
            sex: '',
            email: '',
            city: '',
            nextApp: '',
            passif: JSON.stringify({
                medicalIssues: '',
                lastAppointments: ['0'],
            }),
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            birthDate: isNotEmpty('Birth date is required'),
            email: isEmail('Invalid email'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
            nextApp: isNotEmpty('Next appointment is required'),
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        const patient = {
            ...form.values,
            birthDate: dayjs(form.values.birthDate).format('DD/MM/YYYY'),
            nextApp: dayjs(form.values.nextApp).format('YYYY-MM-DD HH:mm'),
        };
        // console.log(patient);
        try {
            const res = await axios.post(`/api/patients/add`, patient);
            setNotification(false, res.data.message);
            form.reset();
            toggleModal();
        } catch (error: any) {
            console.log(error);
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return (
        <Modal.Root opened={show} onClose={handleClose} size="lg" padding={12}>
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
                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Name"
                                    label="Name"
                                    withAsterisk
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Last Name"
                                    label="Last Name"
                                    withAsterisk
                                    {...form.getInputProps('lastName')}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Select
                                    label="Sex"
                                    placeholder="Sex"
                                    data={['F', 'M']}
                                    withAsterisk
                                    {...form.getInputProps('sex')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <DateInput
                                    label="Date of Birth"
                                    placeholder="Choose"
                                    withAsterisk
                                    {...form.getInputProps('birthDate')}
                                    valueFormat="DD/MM/YYYY"
                                    firstDayOfWeek={0}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="City"
                                    placeholder="City"
                                    withAsterisk
                                    {...form.getInputProps('city')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    placeholder="Email Address"
                                    label="Email Address"
                                    withAsterisk
                                    {...form.getInputProps('email')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput label="Phone Number" placeholder="Phone Number" defaultValue="+33 (0)" />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <DateTimePicker
                                    label="Next Appointment"
                                    placeholder="Choose"
                                    withAsterisk
                                    {...form.getInputProps('nextApp')}
                                    valueFormat="DD/MM/YYYY HH:mm"
                                    firstDayOfWeek={0}
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="green" type="submit">
                                Add
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalAddPatient;
