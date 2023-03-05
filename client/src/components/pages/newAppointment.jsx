import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';
import axios from "axios";

function NewAppointment(props) {
    // the address of this page is /appointments/new/id. 
    const id = window.location.href.split("/").pop();
    console.log(id);

    const patientExample = {
        id: id,
        name: id,
        lastName: id,
        sex: id,
        birthDate: "1990-01-01",
        email: "mich.dal@gmail.com",
        city: "Buenos Aires",
        lastApp: "2021-01-01",
        nextApp: "2023-01-01",
        lastIssues: "Covid"
    };

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
            date: "2021-01-01 12:00:00",
            reasons: anamnesis.reasons,
            anamnesis: JSON.stringify(anamnesis),
            conclusion: JSON.stringify(conclusion)
        }
        try {
            await axios.post(`http://${process.env.REACT_APP_BACKEND_API}/appointments/new`, appointment);
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

    return (
        <div>
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

export default NewAppointment;