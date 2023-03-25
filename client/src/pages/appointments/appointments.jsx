import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Icon } from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";

import AppItemGrid from './itemGrid';
import AppTableView from "./listView";
import ModalCreateApp from "./create";

const Patients = () => {
    // fetch all appointments
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            try {
                const res = await axios.get('/api/appointments');
                setAppointments(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAppointments();
    }, []);
    const nbAppointments = appointments.length;

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === "grid") return "table";
            else return "grid";
        });
    };

    // Modal
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (
        <>
            <Navbar expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand>
                        <h2>Appointments <Badge pill bg='primary'>{nbAppointments}</Badge></h2>
                    </Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={changeView}>
                            <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                        </Button>
                        <Button variant="primary" onClick={toggleModal}>New Appointment</Button>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <CardGroup className="debug">
                    {appointments.map((appointment) => (
                        <AppItemGrid key={appointment.id} appointment={appointment} />
                    ))}
                </CardGroup>
            ) : (
                <AppTableView appointments={appointments} />
            )}
            {show && <ModalCreateApp show={show} toggleModal={toggleModal} />}
        </>
    );
};

export default Patients;