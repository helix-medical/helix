import React, { useState, useEffect } from 'react';
import Biodatas from './biodatas';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { Paper, Title, useMantineTheme } from '@mantine/core';
import { useAppForm, AppFormProvider } from './form-context';
import setNotification from '../system/errors/feedback-notif';
import Secretary from './secretary';
import useSecureAPI from '../../hooks/use-secure-api';
import GenerateReport from './generate-report';
import GrantAccess from '../../components/auth/grant-access';

const ViewAppointment = () => {
    const api = useSecureAPI();
    const id = window.location.href.split('/').slice(-2)[0];
    const form = useAppForm();
    const [mainColor, setMainColor] = useState('fr-orange.4');
    const [open, setOpen] = useState(false);
    const theme = useMantineTheme();
    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
    }, [theme.colorScheme]);

    const [data, setData] = useState({
        appID: id,
        date: '',
        kind: '',
        content: JSON.stringify({
            reasons: '',
            symptoms: '',
            knownDiseases: '',
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
        doctor: '',
        job: '',
        phone: '',
        address: '',
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
                const res = await api.get(`/appointments/${id}/view`);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const content = JSON.parse(data.content);
    const payment = {
        amount: data.amount as any,
        method: data.method,
    };

    return (
        <>
            <NavBarAppointment view={true} color={mainColor} handler={() => setOpen(true)} />
            <Metadata appointment={data} />
            <AppFormProvider form={form}>
                <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                    <Title order={2}>Patient Data</Title>
                    <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} />
                </Paper>
                <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
                    <Anamnesis anamnesis={content} view={true} />
                    <Conclusion conclusion={content} view={true} />
                </GrantAccess>
                <Secretary secretary={payment} view={true} />
            </AppFormProvider>
            <GenerateReport open={open} handler={() => setOpen(false)} data={data as any} />
        </>
    );
};

export default ViewAppointment;
