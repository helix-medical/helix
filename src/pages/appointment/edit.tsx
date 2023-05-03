import React, { useState, useEffect } from 'react';
import { Button, Center, useMantineTheme } from '@mantine/core';
import PatientMetadata from './patient-metadata';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { isNotEmpty } from '@mantine/form';
import { useAppForm, AppFormProvider } from './form-context';
import setNotification from '../../components/errors/feedback-notification';
import { useNavigate } from 'react-router-dom';
import Secretary from './secretary';
import moment from 'moment';
import cnf from '../../config/config';
import useSecureAPI from '../../hooks/use-secure-api';

const EditAppointment = (): JSX.Element => {
    const api = useSecureAPI();
    const id = window.location.href.split('/').slice(-2)[0];
    const navigate = useNavigate();
    const [mainColor, setMainColor] = useState('fr-orange.4');
    const theme = useMantineTheme();
    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
    }, [theme.colorScheme]);

    const [data, setData] = useState({
        appID: id,
        date: '',
        kind: '',
        patientId: '',
        pName: '',
        pLastName: '',
        email: '',
        birthDate: '',
        sex: '',
        city: '',
        name: '',
        lastName: '',
        doctor: '',
        job: '',
        phone: '',
        address: '',
        passif: JSON.stringify({
            medicalIssues: '',
            lastAppointments: [],
        }),
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/appointments/${id}/edit`);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;

        try {
            let res = await api.post(`/accounting`, {
                amount: form.values.payment.amount,
                method: form.values.payment.method,
                appointment: id,
                date: moment().format(cnf.formatDateTime),
            });
            setNotification(false, res.data.message);
            const appointmentFinal = {
                content: JSON.stringify({
                    ...form.values.anamnesis,
                    ...form.values.conclusion,
                }),
                payment: res.data.id,
            };
            try {
                res = await api.put(`/appointments/${id}/content`, appointmentFinal);
                setNotification(false, res.data.message);
                navigate('/appointments');
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const form = useAppForm({
        initialValues: {
            anamnesis: {
                reasons: '',
                symptoms: '',
                knownDiseases: '',
            },
            conclusion: {
                diagnosis: '',
                treatment: '',
                observations: '',
            },
            payment: {
                amount: cnf.defaultAmount,
                method: '',
            },
        },

        validate: {
            anamnesis: {
                reasons: isNotEmpty('Reasons are required'),
                symptoms: isNotEmpty('Symptoms are required'),
                knownDiseases: isNotEmpty('Known diseases are required (if none, type `-`)'),
            },
            conclusion: {
                diagnosis: isNotEmpty('Diagnosis is required'),
                treatment: isNotEmpty('Treatment is required'),
                observations: isNotEmpty('Observations are required'),
            },
            payment: {
                amount: isNotEmpty('Amount is required'),
                method: isNotEmpty('Method is required'),
            },
        },
    });

    return (
        <>
            <NavBarAppointment view={false} color={mainColor} />
            <Metadata appointment={data} />
            <PatientMetadata patientInput={data} color={mainColor} />
            <AppFormProvider form={form}>
                <form onSubmit={handleClick}>
                    <Anamnesis anamnesis={form.values.anamnesis} />
                    <Conclusion conclusion={form.values.conclusion} />
                    <Secretary secretary={form.values.payment} />
                    <Center>
                        <Button type="submit" m="lg" color={mainColor}>
                            Valid Appointment
                        </Button>
                    </Center>
                </form>
            </AppFormProvider>
        </>
    );
};

export default EditAppointment;
