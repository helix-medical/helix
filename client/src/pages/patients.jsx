import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Patients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get('http://localhost:3001/patients');
                setPatients(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPatients()
    }, []);


    return (
        <div>
            <h1>Patients</h1>
            <div className="form">
                {patients.map((patient) => (
                    <div className="form" key={patient.id}>
                        <h2>{patient.name} {patient.lastName} ({patient.sex})</h2>
                        <h3>{patient.birthDate}</h3>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add a Patient</Link></button>
        </div>
    )
};

export default Patients;