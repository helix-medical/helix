// import axios from "axios";
import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Modal, TextInput, Select, Group, Grid } from '@mantine/core';
import { DateInput, DateTimePicker } from '@mantine/dates';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

function ModalAddPatient({ show, toggleModal }: IProps): JSX.Element {
    const handleClose = () => toggleModal();

    // const handleClick = async (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`/api/patients/add`, patient);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     toggleModal();
    //     window.location.reload();
    // };

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
                lastAppointments: [0],
            }),
        },

        validate: {
            name: (value) => (value ? null : 'Name is required'),
            lastName: (value) => (value ? null : 'Last name is required'),
            birthDate: (value) => (value ? null : 'Birth date is required'),
            sex: (value) => (value ? null : 'Sex is required'),
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            city: (value) => (value ? null : 'City is required'),
            nextApp: (value) => (value ? null : 'Next appointment is required'),
        },
    });

    return (
        <Modal.Root opened={show} onClose={handleClose} size="lg" padding={12}>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Add Patient</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Modal.Body>
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
                                <TextInput
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    defaultValue="+33 (0)"
                                />
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
                    </Modal.Body>
                    <Group position="right" p="md">
                        <Button
                            variant="light"
                            color="red"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button color="green" type="submit">
                            Add
                        </Button>
                    </Group>
                </form>
            </Modal.Content>
        </Modal.Root>
    );
}

export default ModalAddPatient;
