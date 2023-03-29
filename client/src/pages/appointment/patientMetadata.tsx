import React from "react";
import { useState } from "react";
import axios from "axios";
import {
    Textarea,
    Title,
    /* Grid, Group, */ Tabs,
    Button,
} from "@mantine/core";
import PreviousAppointments from "./previousAppointments";
import Biodatas from "./biodatas";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    patientInput: IAppointmentData;
}

function PatientMetadata({ patientInput }: IProps): JSX.Element {
    const passif = JSON.parse(patientInput.passif);
    const id = patientInput.patientId;

    const [patient, setPatient] = useState({
        name: patientInput.name,
        lastName: patientInput.lastName,
        birthDate: patientInput.birthDate,
        sex: patientInput.sex,
        email: patientInput.email,
        city: patientInput.city,
        medicalIssues: passif.medicalIssues,
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e: { preventDefault: () => void }) => {
        if (patient.name === "") {
            patient.name = patientInput.name;
        }
        if (patient.lastName === "") {
            patient.lastName = patientInput.lastName;
        }
        if (patient.birthDate === "") {
            patient.birthDate = patientInput.birthDate;
        }
        if (patient.sex === "") {
            patient.sex = patientInput.sex;
        }
        if (patient.email === "") {
            patient.email = patientInput.email;
        }
        if (patient.city === "" || patient.city === undefined) {
            patient.city = patientInput.city;
        }
        if (patient.medicalIssues === "") {
            patient.medicalIssues = passif.medicalIssues;
        }
        const finalPatient = {
            name: patient.name,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            sex: patient.sex,
            email: patient.email,
            city: patient.city,
            passif: JSON.stringify({
                medicalIssues: patient.medicalIssues,
                lastAppointments: passif.lastAppointments,
            }),
        };
        console.log(finalPatient);
        e.preventDefault();
        try {
            const res = await axios.put(
                `/api/patients/${id}/update`,
                finalPatient
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="debug">
            <h2>Patient Data</h2>
            <Tabs defaultValue="data" radius="md">
                <Tabs.List grow>
                    <Tabs.Tab value="data">BioData</Tabs.Tab>
                    <Tabs.Tab value="medical">Previous Medical Issues</Tabs.Tab>
                    <Tabs.Tab value="appointments">
                        Previous Appointments
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="data">
                    <Biodatas
                        patient={patientInput}
                        handler={setPatient}
                        view={false}
                        passif={passif}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="medical">
                    <Title order={3}>Previous Medical Issues</Title>
                    <Textarea
                        maxRows={10}
                        defaultValue={passif.medicalIssues}
                        name="medicalIssues"
                        onChange={handleChange}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="appointments">
                    <PreviousAppointments passif={passif} />
                </Tabs.Panel>
            </Tabs>
            <Button variant="light" onClick={handleClick}>
                Update Patient Data
            </Button>
        </div>
    );
}

export default PatientMetadata;
