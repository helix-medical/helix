import React from 'react';
import { useState } from 'react';
import {
    Button,
    Modal,
    TextInput,
    Group,
    Grid,
    Textarea,
    Text,
    Badge,
    useMantineTheme,
    UnstyledButton,
} from '@mantine/core';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { IPatient } from '../../types/interfaces';
import setNotification from '../../components/errors/feedback-notif';
import { IconPhone, IconSend } from '@tabler/icons-react';
import IdBadge from '../../components/customBadges/id';
import useSecureAPI from '../../hooks/use-secure-api';
import GrantAccess from '../../components/auth/grant-access';

interface IProps {
    show: boolean;
    toggleModal: () => void;
    patientInput: IPatient;
    handleDelete: (id: string | undefined) => void;
}

function ModalViewPatient({ show, toggleModal, patientInput, handleDelete }: IProps): JSX.Element {
    const api = useSecureAPI();
    const handleClose = () => toggleModal();
    const passif = JSON.parse(patientInput.passif);
    const theme = useMantineTheme();

    const [update, setUpdate] = useState(false);

    const handleUpdate = async (e: { preventDefault: () => void }) => {
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
                address: form.values.address,
                phone: form.values.phone,
                doctor: form.values.doctor,
                job: form.values.job,
                passif: JSON.stringify({
                    medicalIssues: form.values.medicalIssues,
                    lastAppointments: passif.lastAppointments,
                }),
            };
            try {
                const res = await api.put(`/patients/${patientInput.id}`, finalPatient);
                setNotification(false, res.data.message);
            } catch (err: any) {
                if (!err?.response) setNotification(true, 'Network error');
                else setNotification(true, `${err.message}: ${err.response.data.message}`);
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
            address: patientInput.address,
            phone: patientInput.phone,
            doctor: patientInput.doctor,
            job: patientInput.job,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            birthDate: (value) => (value.length !== 10 ? 'Birth date must be at `DD/MM/YYYY` format' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            email: isEmail('Email must be valid'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
            address: isNotEmpty('Address is required'),
            phone: (value) => (value.length < 10 ? 'Phone must be at least 10 chars' : null),
            job: isNotEmpty('Job is required'),
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
                        <Group position="apart">
                            <Text size="xl" weight={700}>
                                Patient Details
                            </Text>
                            <IdBadge id={patientInput.id} color="fr-yellow.4" />
                        </Group>
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
                                    label="Sex"
                                    placeholder="Sex"
                                    {...form.getInputProps('sex')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <TextInput
                                    label="Address"
                                    placeholder="Address"
                                    {...form.getInputProps('address')}
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
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Phone"
                                    placeholder="Phone"
                                    {...form.getInputProps('phone')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                    rightSection={
                                        <Button
                                            component="a"
                                            href={`tel:${patientInput.phone}`}
                                            color="fr-yellow.3"
                                            m="xs"
                                            p="xs"
                                            variant="subtle"
                                        >
                                            <IconPhone size="1rem" />
                                        </Button>
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <TextInput
                                    label="Email"
                                    placeholder="Email"
                                    {...form.getInputProps('email')}
                                    readOnly={!update}
                                    withAsterisk={update}
                                    rightSection={
                                        <Button
                                            component="a"
                                            href={`mailto:${patientInput.email}`}
                                            color="fr-yellow.3"
                                            m="xs"
                                            p="xs"
                                            variant="subtle"
                                        >
                                            <IconSend size="1rem" />
                                        </Button>
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Médecin traitant"
                                    placeholder="Médecin traitant"
                                    defaultValue={patientInput.doctor}
                                    readOnly
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text>Last Appointments</Text>
                                <UnstyledButton mt="xs" ml="md">
                                    <Badge color="fr-yellow.4" variant="dot" size="lg">
                                        {passif.lastAppointments.length - 1}
                                    </Badge>
                                </UnstyledButton>
                            </Grid.Col>
                            <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                                <Grid.Col span={12}>
                                    <Textarea
                                        label="Antécédents médicaux"
                                        maxRows={4}
                                        placeholder="Antécédents"
                                        {...form.getInputProps('medicalIssues')}
                                        readOnly={!update}
                                    />
                                </Grid.Col>
                            </GrantAccess>
                        </Grid>
                    </Modal.Body>
                    <Group position="right" p="md">
                        <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                            <Button variant="light" color="red" onClick={() => handleDelete(patientInput.id)}>
                                Delete
                            </Button>
                            <Button variant="light" onClick={handleUpdate}>
                                {update ? 'Save' : 'Edit'}
                            </Button>
                        </GrantAccess>
                        <Button color="gray" type="submit">
                            Close
                        </Button>
                    </Group>
                </form>
            </Modal.Content>
        </Modal.Root>
    );
}

export default ModalViewPatient;
