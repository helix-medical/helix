import React from "react";
import { useState, useEffect } from "react";
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
            <div className="patients">
                {patients.map((patient) => (
                    <div className="patient" key={patient.id}>
                        <h2>{patient.name} {patient.lastName} ({patient.sex})</h2>
                        <button className="view">View</button>
                        <button className="edit"><Link to={`/update/${patient.id}`}>Edit</Link></button>
                        <button className="delete" onClick={() => handleDelete(patient.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add a Patient</Link></button>
        </div>
    )
};

export default Patients;