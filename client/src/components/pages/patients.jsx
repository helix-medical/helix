import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Icon } from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import CardGroup from "react-bootstrap/esm/CardGroup";

import PatientItemGrid from "../patientItemGrid";
import ModalAddPatient from "./add";
import PatientsTableView from "../patientsTableView";
import Badge from "react-bootstrap/esm/Badge";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get('http://172.16.183.69:3001/patients');
                setPatients(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPatients()
    }, []);

    const nbPatients = patients.length;

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://172.16.183.69:3001/patients/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand><h2>## Patients <Badge pill bg='secondary' size='xs'>{nbPatients}</Badge></h2></Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }><Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}</Button>
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