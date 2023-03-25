import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Icon } from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";

import PatientItemGrid from "../patientItemGrid";
import ModalAddPatient from "./create";
import PatientsTableView from "../patientListView";

const Patients = () => {
    // Fetch all patients
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get(`/api/patients`);
                setPatients(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPatients()
    }, []);
    const nbPatients = patients.length;

    // Delete a patient
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/patients/${id}/delete`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // Modal for create a patient
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (
        <div>
            <Navbar expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand><h2>Patients <Badge pill bg='primary'>{nbPatients}</Badge></h2></Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }><Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}</Button>
                        <Button variant="primary" onClick={toggleModal}>New Patient</Button>
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