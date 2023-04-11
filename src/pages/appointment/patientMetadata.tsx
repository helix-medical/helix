import { useState } from 'react';
import axios from 'axios';
import { Textarea, Title, Tabs, Button, Badge, Center, Paper } from '@mantine/core';
import PreviousAppointments from './previousAppointments';
import Biodatas from './biodatas';
import { IAppointmentDataView, IAppointmentDataEdit } from '../../interfaces';
import { IconCalendarCheck, IconDna, IconAlertTriangle } from '@tabler/icons-react';
import setNotification from '../system/errors/feedbackNotif';

interface IProps {
    patientInput: IAppointmentDataView | IAppointmentDataEdit;
}

function PatientMetadata({ patientInput }: IProps): JSX.Element {
    const passif = JSON.parse(patientInput.passif);
    const id = patientInput.patientId;

    const [patient, setPatient] = useState({
        name: patientInput.pName,
        lastName: patientInput.pLastName,
        birthDate: patientInput.birthDate,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (patient.name === '') {
            patient.name = patientInput.pName;
        }
        if (patient.lastName === '') {
            patient.lastName = patientInput.pLastName;
        }
        if (patient.birthDate === '') {
            patient.birthDate = patientInput.birthDate;
        }
        if (patient.email === '') {
            patient.email = patientInput.email;
        }
        if (patient.city === '' || patient.city === undefined) {
            patient.city = patientInput.city;
        }
        if (patient.medicalIssues === '') {
            patient.medicalIssues = passif.medicalIssues;
        }
        const finalPatient = {
            name: patient.name,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            sex: patientInput.sex,
            email: patient.email,
            city: patient.city,
            passif: JSON.stringify({
                medicalIssues: patient.medicalIssues,
                lastAppointments: passif.lastAppointments,
            }),
        };

        try {
            const res = await axios.put(`/api/patients/${id}`, finalPatient);
            setNotification(false, res.data.message);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Patient Data</Title>
            <Tabs defaultValue="data" radius="md">
                <Tabs.List>
                    <Tabs.Tab value="data" icon={<IconDna size="1rem" />}>
                        BioData
                    </Tabs.Tab>
                    <Tabs.Tab value="medical" icon={<IconAlertTriangle size="1rem" />}>
                        Previous Medical Issues
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="appointments"
                        icon={<IconCalendarCheck size="1rem" />}
                        disabled
                        rightSection={
                            <Badge w={16} h={16} sx={{ pointerEvents: 'none' }} variant="filled" size="xs" p={0}>
                                {passif.lastAppointments.length - 1}
                            </Badge>
                        }
                    >
                        Previous Appointments
                    </Tabs.Tab>
                </Tabs.List>
                <form>
                    <Tabs.Panel value="data">
                        <Biodatas
                            patient={patientInput}
                            view={false}
                            passif={passif}
                            handler={handleChange}
                            restricted={false}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="medical">
                        <Title order={3}>Previous Medical Issues</Title>
                        <Textarea
                            maxRows={10}
                            defaultValue={passif.medicalIssues}
                            onChange={handleChange}
                            name="medicalIssues"
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="appointments">
                        <PreviousAppointments passif={passif} />
                    </Tabs.Panel>
                </form>
            </Tabs>
            <Center>
                <Button variant="light" onClick={handleClick} mt="lg">
                    Update Patient Data
                </Button>
            </Center>
        </Paper>
    );
}

export default PatientMetadata;
