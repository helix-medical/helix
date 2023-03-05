import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';
import axios from "axios";

function NewAppointment(props) {
    // the address of this page is /appointments/new/id. 
    const id = window.location.href.split("/").pop();

    const [appointment, setAppointment] = useState([]);
    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_API}/appointments/${id}`);
                setAppointment(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppointment()
    }, []);

    const patientId = appointment[0].patientId;

    const [patient, setPatient] = useState([]);
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_API}/patients/${patientId}`);
                setPatient(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPatient()
    }, []);

    console.log(patient[0]);

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
        passif: "Covid"
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