import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import PatientMetadata from './patientMetadata';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { isNotEmpty } from '@mantine/form';
import { useAppForm, AppFormProvider } from './formContext';

const EditAppointment = (): JSX.Element => {
    const id = window.location.href.split('/').slice(-2)[0];

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
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const appointmentFinal = {
            anamnesis: JSON.stringify(form.values.anamnesis),
            conclusion: JSON.stringify(form.values.conclusion),
        };

        try {
            await axios.put(`/api/appointments/${id}/update`, appointmentFinal);
        } catch (error) {
            console.log(error);
        }
        window.location.href = '/appointments';
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
        },
    });

    return (
        <>
            <NavBarAppointment view={false} />
            <Metadata appointment={data} />
            <PatientMetadata patientInput={data} />
            <AppFormProvider form={form}>
                <form>
                    <Anamnesis anamnesis={form.values.anamnesis} />
                    <Conclusion conclusion={form.values.conclusion} />
                    <Button onClick={handleClick} m="lg">
                        Valid Appointment
                    </Button>
                </form>
            </AppFormProvider>
        </>
    );
};

export default EditAppointment;
