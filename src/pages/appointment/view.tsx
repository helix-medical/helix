import React from 'react';
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
        id: id,
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
        payment: JSON.stringify({
            amount: '',
            method: '',
        }),
        patientId: '',
        status: '',
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
        sex: '',
        city: '',
        passif: JSON.stringify({
            medicalIssues: '',
            lastAppointments: [],
        }),
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

    const anamnesis = JSON.parse(data.anamnesis);
    const conclusion = JSON.parse(data.conclusion);
    const payment = JSON.parse(data.payment);

    return (
        <>
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <AppFormProvider form={form}>
                <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                    <Title order={2}>Patient Data</Title>
                    <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} />
                </Paper>
                <Anamnesis anamnesis={anamnesis} view={true} />
                <Conclusion conclusion={conclusion} view={true} />
                <Secretary secretary={payment} view={true} />
            </AppFormProvider>
        </>
    );
};

export default ViewAppointment;
