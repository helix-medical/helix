import React, { useState } from 'react';
import { Textarea, Title, Tabs, Button, Badge, Center, Paper, TextInput } from '@mantine/core';
import PreviousAppointments from './previous-appointments';
import Biodatas from './biodatas';
import { IAppointmentDataView, IAppointmentDataEdit } from '../../types/interfaces';
import { IconCalendarCheck, IconDna, IconAlertTriangle } from '@tabler/icons-react';
import setNotification from '../system/errors/feedback-notif';
import useSecureAPI from '../../hooks/use-secure-api';

interface IProps {
    patientInput: IAppointmentDataView | IAppointmentDataEdit;
    color: string;
}

const PatientMetadata = ({ patientInput, color }: IProps): JSX.Element => {
    const api = useSecureAPI();
    const passif = JSON.parse(patientInput.passif);
    const id = patientInput.patientId;

    const [patient, setPatient] = useState({
        name: patientInput.pName,
        lastName: patientInput.pLastName,
        birthDate: patientInput.birthDate,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
        doctor: patientInput.doctor,
        job: patientInput.job,
        address: patientInput.address,
        phone: patientInput.phone,
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
        if (patient.city === '') {
            patient.city = patientInput.city;
        }
        if (patient.medicalIssues === '') {
            patient.medicalIssues = passif.medicalIssues;
        }
        if (patient.doctor === '') {
            patient.doctor = patientInput.doctor;
        }
        if (patient.job === '') {
            patient.job = patientInput.job;
        }
        if (patient.address === '') {
            patient.address = patientInput.address;
        }
        if (patient.phone === '') {
            patient.phone = patientInput.phone;
        }
        const finalPatient = {
            name: patient.name,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            sex: patientInput.sex,
            email: patient.email,
            city: patient.city,
            doctor: patient.doctor,
            job: patient.job,
            address: patient.address,
            phone: patient.phone,
            passif: JSON.stringify({
                medicalIssues: patient.medicalIssues,
                lastAppointments: passif.lastAppointments,
            }),
        };

        console.log(finalPatient);

        try {
            const res = await api.put(`/patients/${id}`, finalPatient);
            setNotification(false, res.data.message);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Patient Data</Title>
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
                                {passif.lastAppointments.length - 1}
                            </Badge>
                        }
                    >
                        Previous Appointments
                    </Tabs.Tab>
                </Tabs.List>
                <form>
                    <Tabs.Panel value="data">
                        <Biodatas patient={patientInput} view={false} passif={passif} handler={handleChange} />
                    </Tabs.Panel>
                    <Tabs.Panel value="medical">
                        <Title order={3}>Antécédents Médicaux</Title>
                        <Textarea
                            maxRows={10}
                            defaultValue={passif.medicalIssues}
                            onChange={handleChange}
                            name="medicalIssues"
                        />
                        <TextInput
                            label="Médecin traitant"
                            name="doctor"
                            value={patient.doctor}
                            onChange={handleChange}
                            placeholder="Médecin traitant"
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="appointments">
                        <PreviousAppointments passif={passif} color={color} />
                    </Tabs.Panel>
                </form>
            </Tabs>
            <Center>
                <Button variant="light" onClick={handleClick} mt="lg" color="fr-orange.4">
                    Update Patient Data
                </Button>
            </Center>
        </Paper>
    );
};

export default PatientMetadata;
