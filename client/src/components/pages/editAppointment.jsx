import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';
import AppointmentData from "../appointmentData";

function EditAppointment(props) {
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

    const handleClick = async (e) => {
        e.preventDefault();
        const appointmentFinal = {
            anamnesis: JSON.stringify(anamnesis),
            conclusion: JSON.stringify(conclusion)
        };

        console.log(appointmentFinal);

        try {
            await axios.put(`/api/appointments/${id}/update`, appointmentFinal);
        } catch (error) {
            console.log(error);
        }
        window.location.href = `http://${process.env.REACT_APP_FRONTEND}/appointments`;
    }

    return (
        <div>
            <h1>Appointment</h1>
            <AppointmentData appointment={data} />
            <PatientData patient={data} />
            <Anamnesis appointment={data} handler={setAnamnesis} />
            <ConclusionApp appointment={data} handler={setConclusion} />
            <Button variant="primary" onClick={handleClick}>
                Valid Appointment
            </Button>
        </div>
    );
};

export default EditAppointment;