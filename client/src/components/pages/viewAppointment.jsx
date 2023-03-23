import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import PatientMetadata from '../appointment/patientMetadata';
import Anamnesis from '../appointment/anamnesis';
import Conclusion from '../appointment/conclusion';
import Metadata from "../appointment/metadata";

function ViewAppointment(props) {
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

    return (
        <div>
            <h1>Appointment READONLY</h1>
            <Metadata appointment={data} />
            <PatientMetadata patient={data} />
            <Anamnesis appointment={data} handler={setAnamnesis} />
            <Conclusion appointment={data} handler={setConclusion} />
            {/* <Button variant="primary" onClick={handleClick}>
                Valid Appointment
            </Button> */}
        </div>
    );
};

export default ViewAppointment;