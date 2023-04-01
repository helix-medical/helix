import React from 'react';
// import axios from 'axios';
import { Button, Modal, Select, Group, Text, Grid } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalCreateApp = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => toggleModal();

    const handleClick = async (e: { preventDefault: () => void }) => {
        // let index;
        console.log(form.validate());
        console.log(form.values);
        // e.preventDefault();
        // try {
        //     index = await axios.post(`/api/appointments/new`, form.values);
        //     console.log(index);
        //     const res = await axios.put(`/api/patients/${form.values.patientId}/add_appointment`, {
        //         id: index.data,
        //     });
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
        // toggleModal();
        // if (index) window.location.href = `/appointments/${index.data}/edit`;
    };

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
                                    data={[
                                        {
                                            value: '11',
                                            label: 'Marie Delbreuve',
                                        },
                                        {
                                            value: '21',
                                            label: 'Xavier de Place',
                                        },
                                        {
                                            value: '24',
                                            label: 'Marie de Place',
                                        },
                                    ]}
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
                            <Button
                                color="green"
                                onClick={handleClick}
                            >
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
