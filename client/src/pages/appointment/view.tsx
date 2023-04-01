import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Biodatas from './biodatas';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { Title } from '@mantine/core';
import { useAppForm, AppFormProvider } from './formContext';

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
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const anamnesis = JSON.parse(data.anamnesis);
    const conclusion = JSON.parse(data.conclusion);

    return (
        <>
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <Title order={2}>Patient Data</Title>
            <AppFormProvider form={form}>
                <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} />
                <Anamnesis anamnesis={anamnesis} view={true} />
                <Conclusion conclusion={conclusion} view={true} />
            </AppFormProvider>
        </>
    );
};

export default ViewAppointment;
