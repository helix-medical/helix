import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';
import axios from "axios";

function Appointment(props) {
    const patientExample = {
        id: 1,
        name: "Michelle",
        lastName: "Dalala",
        sex: "F",
        birthDate: "1990-01-01",
        email: "mich.dal@gmail.com",
        city: "Buenos Aires",
        lastApp: "2021-01-01",
        nextApp: "2023-01-01",
        lastIssues: "Covid"
    }

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
        const appointment = {
            patientId: patientExample.id,
            date: "2021-01-01",
            reasons: anamnesis.reasons,
            anamnesis: JSON.stringify(anamnesis),
            conclusion: JSON.stringify(conclusion)
        }
        try {
            await axios.post('http://172.16.183.69:3001/appointments', appointment);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="appointment">
            <h1>Appointment</h1>
            <PatientData patient={patientExample} />
            <Anamnesis handler={setAnamnesis} />
            <ConclusionApp handler={setConclusion} />
            <Button variant="primary" onClick={handleClick}>
                Valid Appointment
            </Button>
        </div>
    );
}

export default Appointment;