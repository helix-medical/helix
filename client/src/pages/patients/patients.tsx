import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";

import { Button, Badge, Group, Grid, Title } from "@mantine/core";

import PatientItemGrid from "./itemGrid";
import ModalAddPatient from "./create";
import PatientsTableView from "./listView";
import { IPatient } from "../../interfaces";
// import NoPatients from "../system/errors/noPatients";

const Patients = (): JSX.Element => {
    // Fetch all patients
    const [patients, setPatients] = useState<IPatient[]>([]);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await axios.get(`/api/patients`);
                setPatients(res.data);
                console.log(res);
            } catch (error: any) {
                console.log(error);
                // setError(error.response.data);
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
            <Grid justify="space-between" align="center" bg='dark.6' p='md'>
                <Group position="left">
                    <Title order={2}>Patients <Badge size='lg' radius="lg" variant="filled">{nbPatients}</Badge></Title>
                </Group>
                <Group position="right">
                    <Button variant="outline" onClick={changeView}>
                        {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                    </Button>
                    <Button onClick={toggleModal}>New Patient</Button>
                </Group>
            </Grid>
            {/* { error && <NoPatients error={error} />} */}
            {isGrid ? (
                <Group className="debug">
                    {patients.map((patient: IPatient) => (
                        <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                    ))}
                </Group>
            ) : (
                <PatientsTableView patients={patients} />
            )}
            {show && <ModalAddPatient show={show} toggleModal={toggleModal} />}
        </>
    )
};

export default Patients;