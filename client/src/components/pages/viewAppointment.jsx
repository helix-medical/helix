import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import PatientMetadata from '../appointment/readOnly/patientMetadata';
import Anamnesis from '../appointment/readOnly/anamnesis';
import Conclusion from '../appointment/readOnly/conclusion';
import Metadata from "../appointment/metadata";
import Badge from "react-bootstrap/Badge";

function ViewAppointment(props) {
    const id = window.location.href.split("/").slice(-2)[0];

    const [data, setData] = useState(
        {
            id: id,
            date: "",
            reasons: "",
            anamnesis: JSON.stringify({
                reasons: "",
                symptoms: "",
                knownDiseases: "",
                knownMedications: ""
            }),
            conclusion: JSON.stringify({
                diagnosis: "",
                treatment: "",
                observations: ""
            }),
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

    return (
        <div>
            <h1>Appointment <Badge bg='danger'>READONLY</Badge></h1>
            <Metadata appointment={data} />
            <PatientMetadata patient={data} />
            <Anamnesis appointment={data} />
            <Conclusion appointment={data} />
            {/* <Button variant="primary" onClick={handleClick}>
                Valid Appointment
            </Button> */}
        </div>
    );
};

export default ViewAppointment;