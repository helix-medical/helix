import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import PatientMetadata from './patientMetadata';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from './metadata';
import NavBarAppointment from './navbar';
import { isNotEmpty, useForm } from '@mantine/form';

const EditAppointment = (): JSX.Element => {
    const id = window.location.href.split('/').slice(-2)[0];

    const [data, setData] = useState({
        id: id,
        date: '',
        reasons: '',
        anamnesis: '{}',
        conclusion: '{}',
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

    const handleClick = async (e: { preventDefault: () => void }) => {
        console.log(form.values);
        console.log(form.validate());
        // e.preventDefault();
        // const appointmentFinal = {
        //     anamnesis: JSON.stringify(anamnesis),
        //     conclusion: JSON.stringify(conclusion),
        // };

        // try {
        //     await axios.put(`/api/appointments/${id}/update`, appointmentFinal);
        // } catch (error) {
        //     console.log(error);
        // }
        // window.location.href = '/appointments';
    };

    const form = useForm({
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
            <form>
                <Anamnesis appointment={data} view={false} form={form} />
                <Conclusion appointment={data} view={false} form={form} />
                <Button onClick={handleClick} m="lg">
                    Valid Appointment
                </Button>
            </form>
        </>
    );
};

export default EditAppointment;
