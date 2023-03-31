import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Biodatas from './biodatas';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { Title } from '@mantine/core';
import { useForm } from '@mantine/form';

const ViewAppointment = () => {
    const id = window.location.href.split('/').slice(-2)[0];

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
                const res = await axios.get(`/api/appointments/${id}/appointment`);
                setData(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const anamnesis = JSON.parse(data.anamnesis);
    const conclusion = JSON.parse(data.conclusion);

    const form = useForm({
        initialValues: {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            birthDate: data.birthDate,
            sex: data.sex,
            city: data.city,
            // passif: JSON.parse(data.passif),
            anamnesis: {
                reasons: anamnesis.reasons,
                symptoms: anamnesis.symptoms,
                knownDiseases: anamnesis.knownDiseases,
                knownMedications: anamnesis.knownMedications,
            },
            conclusion: {
                diagnosis: conclusion.diagnosis,
                treatment: conclusion.treatment,
                observations: conclusion.observations,
            },
        },
    });

    return (
        <>
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <Title order={2}>Patient Data</Title>
            <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} form={form} />
            <form>
                <Anamnesis appointment={data} view={true} form={form} />
                <Conclusion appointment={data} view={true} form={form} />
            </form>
        </>
    );
};

export default ViewAppointment;
