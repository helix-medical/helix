import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import CardGroup from "react-bootstrap/esm/CardGroup";
import PatientItem from "../patientItem";

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Patients</h1>
            <CardGroup>
                {patients.map((patient) => (
                    <PatientItem key={patient.id} patient={patient} handleDelete={handleDelete} />
                ))}
            </CardGroup>
            <Button variant="primary" href="/add" size="lg">Add a Patient</Button>
        </div>
    )
};

export default Patients;