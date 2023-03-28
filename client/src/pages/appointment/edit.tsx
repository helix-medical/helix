import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mantine/core";
import PatientMetadata from './patientMetadata';
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from "./metadata";
import NavBarAppointment from "./navbar";

const EditAppointment = (): JSX.Element => {
    const id = window.location.href.split("/").slice(-2)[0];

    const [data, setData] = useState(
        {
            id: id,
            date: "",
            reasons: "",
            anamnesis: "{}",
            conclusion: "{}",
            patientId: "",
            status: "",
            name: "",
            lastName: "",
            email: "",
            birthDate: "",
            sex: "",
            city: "",
            passif: JSON.stringify({
                medicalIssues: "",
                lastAppointments: []
            })
        }
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/appointments/${id}/appointment`);
                setData(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    const [anamnesis, setAnamnesis] = useState({
        reasons: "",
        symptoms: "",
        knownDiseases: "",
        knownMedications: ""
    });

    const [conclusion, setConclusion] = useState({
        diagnosis: "",
        treatment: "",
        observations: ""
    });

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const appointmentFinal = {
            anamnesis: JSON.stringify(anamnesis),
            conclusion: JSON.stringify(conclusion)
        };

        try {
            await axios.put(`/api/appointments/${id}/update`, appointmentFinal);
        } catch (error) {
            console.log(error);
        }
        window.location.href = '/appointments';
    };

    return (
        <>
            <NavBarAppointment view={false} />
            <Metadata appointment={data} />
            <PatientMetadata patientInput={data} />
            <Anamnesis appointment={data} handler={setAnamnesis} view={false} />
            <Conclusion appointment={data} handler={setConclusion} view={false} />
            <Button onClick={handleClick}>
                Valid Appointment
            </Button>
        </>
    );
};

export default EditAppointment;