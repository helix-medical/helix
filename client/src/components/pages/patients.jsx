import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import CardGroup from "react-bootstrap/esm/CardGroup";
import PatientItemGrid from "../patientItemGrid";
import ModalAddPatient from "./add";
import Navbar from "react-bootstrap/Navbar";
import PatientsTableView from "../patientsTableView";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

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
            <Navbar bg="light" expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand href="/">List of Patients</Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }>{isGrid ? "Table" : "Grid"}</Button>
                        <Button variant="primary" onClick={toggleModal}>Add a Patient</Button>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <CardGroup className="debug">
                    {patients.map((patient) => (
                        <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                    ))}
                </CardGroup>
            ) : (
                <PatientsTableView patients={patients} />
            )}
            {show && <ModalAddPatient show={show} toggleModal={toggleModal} />}
        </div>
    )
};

export default Patients;