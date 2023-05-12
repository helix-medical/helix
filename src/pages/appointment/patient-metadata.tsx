import React from 'react';
import { IAppointmentData } from './types';
import { IconCalendarCheck, IconDna, IconAlertTriangle } from '@tabler/icons-react';
import { params } from './utils';
import { Textarea, Title, Tabs, Button, Badge, Center, Paper, TextInput, Grid } from '@mantine/core';
import { useAppointmentPatient } from './patient.logic';
import { UseFormReturnType } from '@mantine/form';
import GrantAccess from '../../components/auth/grant-access';

const Biodatas = ({ data, view }: { data: UseFormReturnType<IAppointmentData>; view: boolean }): JSX.Element => (
    <Grid columns={12}>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Name" {...data.getInputProps('name')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Last Name" {...data.getInputProps('lastName')} {...params(view)} />
        </Grid.Col>
        <Grid.Col xs={4} sm={2} md={4}>
            <TextInput label="Sex" readOnly {...data.getInputProps('sex')} />
        </Grid.Col>
        <Grid.Col xs={8} sm={4} md={4}>
            <TextInput label="Birth Date" {...data.getInputProps('birthDate')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Email" {...data.getInputProps('email')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Phone" {...data.getInputProps('phone')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Address" {...data.getInputProps('address')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Job" {...data.getInputProps('job')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="City" {...data.getInputProps('city')} {...params(view)} />
        </Grid.Col>
    </Grid>
);

interface IProps {
    form: UseFormReturnType<IAppointmentData>;
    color: string;
    view: boolean;
}

const PatientMetadata = ({ form, color, view }: IProps): JSX.Element => {
    const { handleSubmit } = useAppointmentPatient(form);
    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Patient Data</Title>
            <form onSubmit={handleSubmit}>
                <Tabs defaultValue="data" radius="md" color={color}>
                    <Tabs.List>
                        <Tabs.Tab value="data" icon={<IconDna size="1rem" />}>
                            BioData
                        </Tabs.Tab>
                        <Tabs.Tab value="medical" icon={<IconAlertTriangle size="1rem" />}>
                            Antécédents
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="appointments"
                            icon={<IconCalendarCheck size="1rem" />}
                            disabled
                            rightSection={
                                <Badge
                                    w={16}
                                    h={16}
                                    sx={{ pointerEvents: 'none' }}
                                    variant="filled"
                                    size="xs"
                                    p={0}
                                    color={color}
                                >
                                    {form.values.lastAppointments.length - 1}
                                </Badge>
                            }
                        >
                            Previous Appointments
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="data">
                        <Biodatas data={form} view={view} />
                    </Tabs.Panel>
                    <Tabs.Panel value="medical">
                        <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                            <Title order={3}>Antécédents Médicaux</Title>
                            <Textarea
                                maxRows={10}
                                placeholder="Antécédents médicaux"
                                {...form.getInputProps('medicalIssues')}
                            />
                            <TextInput
                                label="Médecin traitant"
                                placeholder="Médecin traitant"
                                {...form.getInputProps('doctor')}
                            />
                        </GrantAccess>
                    </Tabs.Panel>
                    <Tabs.Panel value="appointments">
                        {/* <PreviousAppointments data={form} color={color} /> */}
                    </Tabs.Panel>
                </Tabs>
                {view ? null : (
                    <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                        <Center>
                            <Button variant="light" mt="lg" color="fr-orange.4" type="submit">
                                Update Patient Data
                            </Button>
                        </Center>
                    </GrantAccess>
                )}
            </form>
        </Paper>
    );
};

export { PatientMetadata };
