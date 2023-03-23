import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { Icon } from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import Badge from "react-bootstrap/Badge";

import AppItemGrid from "../appItemGrid";
import AppTableView from "../appListView";
import ModalCreateApp from "../createAppointment";

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
        fetchAllAppointments()
    }, []);
    const nbAppointments = appointments.length;

    // Modal
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    // View Type
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <div className="container-fluid">
                    <Navbar.Brand><h2>## Appointments <Badge pill bg='secondary' size='xs'>{nbAppointments}</Badge></h2></Navbar.Brand>
                    <div className="buttons-nav">
                        <Button variant="outline-primary" onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }><Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}</Button>
                        <Button variant="primary" onClick={toggleModal}>Create Appointment</Button>
                    </div>
                </div>
            </Navbar>
            {isGrid ? (
                <CardGroup className="debug">
                    {appointments.map((appointment) => (
                        <AppItemGrid key={appointment.id} appointment={appointment} /* handleDelete={handleDelete} */ />
                    ))}
                </CardGroup>
            ) : (
                <AppTableView appointments={appointments} />
            )}
            {show && <ModalCreateApp show={show} toggleModal={toggleModal} />}
        </div>
    )
};

export default Patients;