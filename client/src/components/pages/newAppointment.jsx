import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import PatientData from '../patientData';
import Anamnesis from '../anamnesis';
import ConclusionApp from '../conclusionApp';
import AppointmentData from "../appointmentData";

function NewAppointment(props) {
    const id = window.location.href.split("/").pop();

    const [data, setData] = useState(
        {
            // id: id,
            // date: "",
            // reasons: "",
            // anamnesis: "{}",
            // conclusion: "{}",
            // patientId: "",
            // name: "",
            // lastName: "",
            // birthDate: "",
            // sex: "",
            // passif: "{}"
        }
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_API}/appointments/use/${id}`);
                setData(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);

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
            patientId: data.patientId,
            date: "2021-01-01 12:00:00",
            reasons: anamnesis.reasons,
            anamnesis: JSON.stringify(anamnesis),
            conclusion: JSON.stringify(conclusion)
        }
        try {
            await axios.post(`http://${process.env.REACT_APP_BACKEND_API}/appointments/new`, appointmentFinal);
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

    return (
        <div>
            <h1>Appointment</h1>
            <AppointmentData appointment={data} />
            <PatientData patient={data} />
            <Anamnesis handler={setAnamnesis} />
            <ConclusionApp handler={setConclusion} />
            <Button variant="primary" onClick={handleClick}>
                Valid Appointment
            </Button>
        </div>
    );
}

export default NewAppointment;