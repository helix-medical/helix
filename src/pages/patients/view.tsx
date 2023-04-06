import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, TextInput, Group, Grid, Textarea, Text, Badge, useMantineTheme } from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { IPatient } from '../../interfaces';
import dateToReadable from '../../tools/date';
import useAuth from '../../hooks/useAuth';

interface IProps {
    show: boolean;
    toggleModal: () => void;
    patientInput: IPatient;
    handleDelete: (id: string | undefined) => void;
}

function ModalViewPatient({ show, toggleModal, patientInput, handleDelete }: IProps): JSX.Element {
    const handleClose = () => toggleModal();
    const passif = JSON.parse(patientInput.passif);
    const theme = useMantineTheme();
    const { auth } = useAuth();
    const isRestricted = auth.role === 1515;

    const [update, setUpdate] = useState(false);

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (update) {
            if (form.validate().hasErrors) return;

            const finalPatient = {
                name: form.values.name,
                lastName: form.values.lastName,
                birthDate: form.values.birthDate,
                sex: form.values.sex,
                email: form.values.email,
                city: form.values.city,
                passif: JSON.stringify({
                    medicalIssues: form.values.medicalIssues,
                    lastAppointments: passif.lastAppointments,
                }),
            };
            try {
                await axios.put(`/api/patients/${patientInput.id}`, finalPatient);
            } catch (err) {
                console.log(err);
            }
        }
        setUpdate(!update);
    };

    const form = useForm({
        initialValues: {
            name: patientInput.name,
            lastName: patientInput.lastName,
            birthDate: patientInput.birthDate,
            sex: patientInput.sex,
            email: patientInput.email,
            city: patientInput.city,
            medicalIssues: passif.medicalIssues,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            birthDate: (value) => (value.length !== 10 ? 'Birth date must be at `DD/MM/YYYY` format' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            email: isEmail('Email must be valid'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
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
                            Patient Details
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <form onSubmit={handleClose}>
                    <Modal.Body>
                        <Grid columns={12}>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Name"
                                    placeholder="Name"
                                    {...form.getInputProps('name')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Last Name"
                                    placeholder="Last Name"
                                    {...form.getInputProps('lastName')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput label="ID" placeholder="ID" value={patientInput.id} readOnly />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Sex"
                                    placeholder="Sex"
                                    {...form.getInputProps('sex')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Birth Date"
                                    placeholder="Birth Date"
                                    {...form.getInputProps('birthDate')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="City"
                                    placeholder="City"
                                    {...form.getInputProps('city')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <TextInput
                                    label="Email"
                                    placeholder="Email"
                                    {...form.getInputProps('email')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text>Last Appointments</Text>
                                <Badge color="green" variant="dot" size="lg">
                                    {passif.lastAppointments.length}
                                </Badge>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Next Appointment"
                                    placeholder="Next Appointment"
                                    defaultValue={dateToReadable(patientInput.nextApp)}
                                    readOnly
                                />
                            </Grid.Col>
                            {!isRestricted && (
                                <Grid.Col span={12}>
                                    <Textarea
                                        label="Passif"
                                        maxRows={4}
                                        placeholder="Passif"
                                        {...form.getInputProps('medicalIssues')}
                                        readOnly={!update}
                                    />
                                </Grid.Col>
                            )}
                        </Grid>
                    </Modal.Body>
                    <Group position="right" p="md">
                        {!isRestricted && (
                            <>
                                <Button variant="light" color="red" onClick={() => handleDelete(patientInput.id)}>
                                    Delete
                                </Button>
                                <Button variant="light" onClick={handleUpdate}>
                                    {update ? 'Save' : 'Edit'}
                                </Button>
                            </>
                        )}
                        <Button color="gray" type='submit'>
                            Close
                        </Button>
                    </Group>
                </form>
            </Modal.Content>
        </Modal.Root>
    );
}

export default ModalViewPatient;
