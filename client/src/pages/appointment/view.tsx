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
import { useAppForm, AppFormProvider } from './formContext';

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
    console.log(data);

    interface IFormValues {
        anamnesis: {
            reasons: string;
            symptoms: string;
            knownDiseases: string;
            knownMedications: string;
        };
        conclusion: {
            diagnosis: string;
            treatment: string;
            observations: string;
        };
    }

    const form = useAppForm({
        initialValues: {
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

    console.log(form.values);

    return (
        <>
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <Title order={2}>Patient Data</Title>
            <AppFormProvider form={form}>
                <form>
                    {/* <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} form={undefined} /> */}
                    <Anamnesis appointment={data} view={true} form={form} />
                    <Conclusion appointment={data} view={true} form={form} />
                </form>
            </AppFormProvider>
        </>
    );
};

export default ViewAppointment;
