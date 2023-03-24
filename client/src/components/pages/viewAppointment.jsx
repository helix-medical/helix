import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import PatientMetadata from '../appointment/readOnly/patientMetadata';
import Anamnesis from '../appointment/readOnly/anamnesis';
import Conclusion from '../appointment/readOnly/conclusion';
import Metadata from "../appointment/metadata";
import Badge from "react-bootstrap/Badge";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

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
            <Navbar expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand><h1>Appointment <Badge bg='danger'>READONLY</Badge></h1></Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="primary" disabled>Export to PDF</Button>
                    </div>
                </div>
            </Navbar>
            <Metadata appointment={data} />
            <PatientMetadata patient={data} />
            <Anamnesis appointment={data} />
            <Conclusion appointment={data} />
        </div>
    );
};

export default ViewAppointment;