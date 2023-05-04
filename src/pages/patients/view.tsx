import React from 'react';
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
import { IPatient } from '../../types/interfaces';
import { IconPhone, IconSend } from '@tabler/icons-react';
import IdBadge from '../../components/customBadges/id';
import GrantAccess from '../../components/auth/grant-access';
import { useComponentLogic } from './view.logic';

interface IProps {
    show: boolean;
    toggleModal: () => void;
    patient: IPatient;
    handleDelete: (id: string | undefined) => void;
}

function ModalViewPatient({ show, toggleModal, patient, handleDelete }: IProps): JSX.Element {
    const theme = useMantineTheme();
    const { handleClose, form, update, handleUpdate, passif } = useComponentLogic(patient, toggleModal);

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
                            <IdBadge id={patient.id} color="fr-yellow.4" />
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
                                            href={`tel:${patient.phone}`}
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
                                            href={`mailto:${patient.email}`}
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
                                    defaultValue={patient.doctor}
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
                            <Button variant="light" color="red" onClick={() => handleDelete(patient.id)}>
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
