import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Textarea, Title, Tabs, Button, Badge } from '@mantine/core';
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
        name: patientInput.name,
        lastName: patientInput.lastName,
        birthDate: patientInput.birthDate,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e: { preventDefault: () => void }) => {
        if (patient.name === '') {
            patient.name = patientInput.name;
        }
        if (patient.lastName === '') {
            patient.lastName = patientInput.lastName;
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
        console.log(finalPatient);
        e.preventDefault();
        try {
            const res = await axios.put(`/api/patients/${id}/update`, finalPatient);
            console.log(res);
            setNotification(false, res.data.message)
        } catch (error: any) {
            console.log(error);
            setNotification(true, error.response.data.message)
        }
    };

    return (
        <div className="debug">
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
                                {passif.lastAppointments.length}
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
            <Button variant="light" onClick={handleClick} m="lg">
                Update Patient Data
            </Button>
        </div>
    );
}

export default PatientMetadata;
