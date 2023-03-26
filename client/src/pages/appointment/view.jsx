import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Biodatas from "./biodatas";
import Anamnesis from './anamnesis';
import Conclusion from './conclusion';
import Metadata from "./metadata";
import NavBarAppointment from "./navbar";

const ViewAppointment = () => {
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
            <NavBarAppointment view={true} />
            <Metadata appointment={data} />
            <h2>Patient Data</h2>
            <Biodatas view={true} patient={data} passif={JSON.parse(data.passif)} />
            <Anamnesis appointment={data} view={true} />
            <Conclusion appointment={data} view={true} />
        </div>
    );
};

export default ViewAppointment;