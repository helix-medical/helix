import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Icon } from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";

import PatientItemGrid from "./itemGrid";
import ModalAddPatient from "./create";
import PatientsTableView from "./listView";
import { IPatient } from "../../interfaces";
// import NoPatients from "../system/errors/noPatients";

const Patients = (): JSX.Element => {
    // Fetch all patients
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get(`/api/patients`);
                setPatients(res.data);
                console.log(res);
            } catch (error: any) {
                console.log(error);
                setError(error.response.data);
            }
        }
        fetchAllPatients();
    }, []);
    const nbPatients = patients.length;

    // Delete a patient
    const handleDelete = async (id: number | undefined) => {
        if (!id)
            return console.error("No id");
        try {
            await axios.delete(`/api/patients/${id}/delete`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === "grid") return "table";
            else return "grid";
        });
    };


    // Modal for create a patient
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState("grid");
    const isGrid: boolean = viewType === "grid";

    return (
        <>
            <Navbar expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand>
                        <h2>Patients <Badge pill bg='primary'>{nbPatients}</Badge></h2>
                    </Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={changeView}>
                            <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                        </Button>
                        <Button variant="primary" onClick={toggleModal}>New Patient</Button>
                    </div>
                </div>
            </Navbar>
            {/* { error && <NoPatients error={error} />} */}
            {isGrid ? (
                <CardGroup className="debug">
                    {patients.map((patient: IPatient) => (
                        <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                    ))}
                </CardGroup>
            ) : (
                <PatientsTableView patients={patients} />
            )}
            {show && <ModalAddPatient show={show} toggleModal={toggleModal} />}
        </>
    )
};

export default Patients;