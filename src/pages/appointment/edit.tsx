import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Center } from '@mantine/core';
import PatientMetadata from './patientMetadata';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { isNotEmpty } from '@mantine/form';
import { useAppForm, AppFormProvider } from './formContext';
import setNotification from '../system/errors/feedbackNotif';
import { useNavigate } from 'react-router-dom';
import Secretary from './secretary';
import moment from 'moment';

const EditAppointment = (): JSX.Element => {
    const id = window.location.href.split('/').slice(-2)[0];
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: id,
        date: '',
        reasons: '',
        patientId: '',
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
                const res = await axios.get(`/api/appointments/${id}/edit`);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
    }, [id]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        const appointmentFinal = {
            anamnesis: JSON.stringify(form.values.anamnesis),
            conclusion: JSON.stringify(form.values.conclusion),
            payment: JSON.stringify(form.values.payment),
        };

        try {
            let res = await axios.put(`/api/appointments/${id}`, appointmentFinal);
            setNotification(false, res.data.message);
            try {
                res = await axios.post(`/api/accounting`, {
                    amount: form.values.payment.amount,
                    method: form.values.payment.method,
                    appId: id,
                    patientId: data.patientId,
                    date: moment().format('YYYY-MM-DD'),
                });
                setNotification(false, res.data.message);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
            navigate('/appointments');
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
                knownMedications: '',
            },
            conclusion: {
                diagnosis: '',
                treatment: '',
                observations: '',
            },
            payment: {
                amount: 33,
                method: '',
            },
        },

        validate: {
            anamnesis: {
                reasons: isNotEmpty('Reasons are required'),
                symptoms: isNotEmpty('Symptoms are required'),
                knownDiseases: isNotEmpty('Known diseases are required (if none, type `-`)'),
                knownMedications: isNotEmpty('Known medications are required (if none, type `-`)'),
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
            <NavBarAppointment view={false} />
            <Metadata appointment={data} />
            <PatientMetadata patientInput={data} />
            <AppFormProvider form={form}>
                <form onSubmit={handleClick}>
                    <Anamnesis anamnesis={form.values.anamnesis} />
                    <Conclusion conclusion={form.values.conclusion} />
                    <Secretary secretary={form.values.payment} />
                    <Center>
                        <Button type="submit" m="lg">
                            Valid Appointment
                        </Button>
                    </Center>
                </form>
            </AppFormProvider>
        </>
    );
};

export default EditAppointment;
