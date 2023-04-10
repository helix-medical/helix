import { useState, useEffect } from 'react';
import axios from 'axios';
import Biodatas from './biodatas';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { Paper, Title } from '@mantine/core';
import { useAppForm, AppFormProvider } from './formContext';
import setNotification from '../system/errors/feedbackNotif';
import Secretary from './secretary';

const ViewAppointment = () => {
    const id = window.location.href.split('/').slice(-2)[0];
    const form = useAppForm();

    const [data, setData] = useState({
        appID: id,
        date: '',
        kind: '',
        content: JSON.stringify({
            reasons: '',
            symptoms: '',
            knownDiseases: '',
            knownMedications: '',
            diagnosis: '',
            treatment: '',
            observations: '',
        }),
        amount: '',
        method: '',
        patientId: '',
        status: '',
        pName: '',
        pLastName: '',
        email: '',
        birthDate: '',
        sex: '',
        city: '',
        passif: JSON.stringify({
            medicalIssues: '',
            lastAppointments: [],
        }),
        name: '',
        lastName: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/appointments/${id}/view`);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
    }, [id]);

    const content = JSON.parse(data.content);
    const payment = {
        amount: data.amount as any,
        method: data.method,
    };

    return (
        <>
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <AppFormProvider form={form}>
                <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                    <Title order={2}>Patient Data</Title>
                    <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} />
                </Paper>
                <Anamnesis anamnesis={content} view={true} />
                <Conclusion conclusion={content} view={true} />
                <Secretary secretary={payment} view={true} />
            </AppFormProvider>
        </>
    );
};

export default ViewAppointment;
