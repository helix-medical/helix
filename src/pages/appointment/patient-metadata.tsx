import React from 'react';
import { Textarea, Title, Tabs, Button, Badge, Center, Paper, TextInput } from '@mantine/core';
import { Biodatas } from './biodatas';
import { IconCalendarCheck, IconDna, IconAlertTriangle } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form';
import { IAppointmentData } from './types';
import { useAppointmentPatient } from './patient.logic';
import GrantAccess from '../../components/auth/grant-access';

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
